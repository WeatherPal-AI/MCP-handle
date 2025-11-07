import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  ASSISTANT_SESSION_COOKIE,
  isSessionSecretConfigured,
  verifySessionCookieValue,
} from "@/lib/assistantSession";

export const dynamic = "force-dynamic";

type AssistantRequest = {
  prompt?: string;
  conversationId?: string;
  locale?: string;
  inputs?: Record<string, unknown>;
};

type DifyMessage = {
  conversation_id?: string;
  answer?: string;
  output_text?: string;
  message?: {
    answer?: string;
    content?: string;
  };
  messages?: Array<{
    answer?: string;
    content?: string;
  }>;
  data?: {
    answer?: string;
    outputs?: Array<
      | {
          answer?: string;
        }
      | string
    >;
  };
};

type AssistantResponse = {
  answer?: string;
  conversationId?: string;
  event?: string;
};

const DEFAULT_API_BASE = "https://api.dify.ai/v1";
const DEFAULT_CHAT_PATH = "/chat-messages";

const difyApiKey = process.env.DIFY_API_KEY;
const difyApiBase =
  process.env.DIFY_API_BASE_URL?.replace(/\/$/, "") ?? DEFAULT_API_BASE;
const difyChatPath = process.env.DIFY_CHAT_PATH ?? DEFAULT_CHAT_PATH;
const difyResponseMode = process.env.DIFY_RESPONSE_MODE ?? "blocking";
const difyUserId = process.env.DIFY_USER_ID ?? "landing-page-visitor";
const allowedOrigins = (process.env.ASSISTANT_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim().toLowerCase())
  .filter(Boolean);
const isProduction = process.env.NODE_ENV === "production";

const DAILY_CONVERSATION_LIMIT = 250;
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const redisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redisClient =
  redisRestUrl && redisRestToken
    ? new Redis({
        url: redisRestUrl,
        token: redisRestToken,
      })
    : undefined;

const persistentRatelimit = redisClient
  ? new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.fixedWindow(DAILY_CONVERSATION_LIMIT, "24 h"),
      prefix: "assistant-proxy",
    })
  : undefined;

type RateLimitEntry = {
  expiresAt: number;
  count: number;
};

type RateLimitStatus = {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: string;
};

const memoryRateStore = new Map<string, RateLimitEntry>();

class RateLimitUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitUnavailableError";
  }
}

function buildRateLimitHeaders(status: RateLimitStatus) {
  return {
    "X-RateLimit-Limit": status.limit.toString(),
    "X-RateLimit-Remaining": Math.max(status.remaining, 0).toString(),
    "X-RateLimit-Reset": status.resetAt,
  };
}

function normalizeOrigin(value?: string | null) {
  if (!value) {
    return undefined;
  }
  try {
    const url = new URL(value);
    return url.origin.toLowerCase();
  } catch {
    return undefined;
  }
}

function getRequestOrigin(request: Request) {
  return (
    normalizeOrigin(request.headers.get("origin")) ??
    normalizeOrigin(request.headers.get("referer"))
  );
}

function validateOrigin(request: Request) {
  const origin = getRequestOrigin(request);
  if (allowedOrigins.length === 0) {
    return { allowed: true, origin };
  }
  if (origin && allowedOrigins.includes(origin)) {
    return { allowed: true, origin };
  }
  return { allowed: false, origin };
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }
  return request.headers.get("x-real-ip") ?? undefined;
}

function buildRateLimitKey(request: Request, origin?: string) {
  const ip = getClientIp(request) ?? "unknown-ip";
  return `${origin ?? "unknown-origin"}::${ip}`;
}

async function consumeAllowance(key: string): Promise<RateLimitStatus> {
  if (persistentRatelimit) {
    const result = await persistentRatelimit.limit(key);
    return {
      allowed: result.success,
      remaining: Math.max(result.remaining, 0),
      limit: result.limit,
      resetAt: new Date(result.reset).toISOString(),
    };
  }

  if (isProduction) {
    throw new RateLimitUnavailableError(
      "Persistent rate limiter is not configured.",
    );
  }

  const now = Date.now();
  const existing = memoryRateStore.get(key);
  const resetAt =
    existing?.expiresAt && existing.expiresAt > now
      ? existing.expiresAt
      : now + MILLISECONDS_IN_DAY;

  if (!existing || existing.expiresAt <= now) {
    memoryRateStore.set(key, { count: 1, expiresAt: resetAt });
    return {
      allowed: true,
      remaining: DAILY_CONVERSATION_LIMIT - 1,
      limit: DAILY_CONVERSATION_LIMIT,
      resetAt: new Date(resetAt).toISOString(),
    };
  }

  if (existing.count >= DAILY_CONVERSATION_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      limit: DAILY_CONVERSATION_LIMIT,
      resetAt: new Date(existing.expiresAt).toISOString(),
    };
  }

  existing.count += 1;
  memoryRateStore.set(key, existing);
  return {
    allowed: true,
    remaining: Math.max(DAILY_CONVERSATION_LIMIT - existing.count, 0),
    limit: DAILY_CONVERSATION_LIMIT,
    resetAt: new Date(existing.expiresAt).toISOString(),
  };
}

function buildDifyUrl() {
  if (difyChatPath.startsWith("http")) {
    return difyChatPath;
  }
  const normalizedPath = difyChatPath.startsWith("/")
    ? difyChatPath
    : `/${difyChatPath}`;
  return `${difyApiBase}${normalizedPath}`;
}

function logAssistantError(
  reason: string,
  meta?: Record<string, unknown>,
  error?: unknown
) {
  const timestamp = new Date().toISOString();
  const payload: Record<string, unknown> = {
    scope: "assistant-proxy",
    timestamp,
    reason,
    ...meta,
  };
  if (error instanceof Error) {
    payload.error = error.message;
    payload.stack = error.stack;
  } else if (typeof error === "string") {
    payload.error = error;
  }
  console.error("[assistant-proxy]", JSON.stringify(payload));
}

function extractAnswer(payload: DifyMessage): string | undefined {
  if (payload.answer) {
    return payload.answer;
  }
  if (payload.output_text) {
    return payload.output_text;
  }
  if (payload.message?.answer) {
    return payload.message.answer;
  }
  const firstMessageAnswer = payload.messages?.find(
    (message) => message.answer || message.content
  );
  if (firstMessageAnswer?.answer) {
    return firstMessageAnswer.answer;
  }
  if (typeof firstMessageAnswer?.content === "string") {
    return firstMessageAnswer.content;
  }
  if (payload.data?.answer) {
    return payload.data.answer;
  }
  if (payload.data?.outputs?.length) {
    const firstOutput = payload.data.outputs[0];
    if (typeof firstOutput === "string") {
      return firstOutput;
    }
    return firstOutput?.answer;
  }
  return undefined;
}

export async function POST(request: Request) {
  const originCheck = validateOrigin(request);
  if (!originCheck.allowed) {
    logAssistantError("origin-not-allowed", { origin: originCheck.origin });
    return NextResponse.json(
      {
        error: "Origin not allowed.",
        code: "ORIGIN_NOT_ALLOWED",
      },
      { status: 403 }
    );
  }

  if (!isSessionSecretConfigured()) {
    logAssistantError("session-secret-missing");
    return NextResponse.json(
      {
        error: "Assistant session is not configured.",
        code: "SESSION_NOT_CONFIGURED",
      },
      { status: 503 }
    );
  }

  const cookieStore = await cookies();
  const sessionCookieValue =
    cookieStore.get(ASSISTANT_SESSION_COOKIE)?.value ?? undefined;
  if (!verifySessionCookieValue(sessionCookieValue)) {
    logAssistantError("invalid-session-cookie", { origin: originCheck.origin });
    return NextResponse.json(
      {
        error: "Assistant session is missing or invalid.",
        code: "SESSION_INVALID",
      },
      { status: 401 }
    );
  }

  let body: AssistantRequest;
  try {
    body = (await request.json()) as AssistantRequest;
  } catch (error) {
    logAssistantError("invalid-json-body", undefined, error);
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  if (!body.prompt || typeof body.prompt !== "string") {
    logAssistantError("missing-prompt");
    return NextResponse.json(
      { error: "Prompt is required." },
      { status: 400 }
    );
  }

  if (!difyApiKey) {
    logAssistantError("dify-not-configured");
    return NextResponse.json(
      { error: "Dify is not configured.", code: "DIFY_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const rateLimitKey = buildRateLimitKey(request, originCheck.origin);
  let rateLimitStatus: RateLimitStatus;
  try {
    rateLimitStatus = await consumeAllowance(rateLimitKey);
  } catch (error) {
    if (error instanceof RateLimitUnavailableError) {
      logAssistantError("rate-limit-unavailable", { origin: originCheck.origin }, error);
      return NextResponse.json(
        {
          error: "Assistant rate limiting is not configured.",
          code: "RATE_LIMIT_UNAVAILABLE",
        },
        { status: 503 }
      );
    }
    throw error;
  }
  const rateLimitHeaders = buildRateLimitHeaders(rateLimitStatus);

  if (!rateLimitStatus.allowed) {
    logAssistantError("daily-limit-exceeded", {
      limit: DAILY_CONVERSATION_LIMIT,
      origin: originCheck.origin,
    });
    return NextResponse.json(
      {
        error: `Daily conversation limit of ${rateLimitStatus.limit} requests reached. Please try again after the reset.`,
        code: "DAILY_LIMIT_EXCEEDED",
        limit: rateLimitStatus.limit,
        remaining: rateLimitStatus.remaining,
        resetAt: rateLimitStatus.resetAt,
      },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const inputs: Record<string, unknown> = {
    ...(body.inputs ?? {}),
  };

  if (body.locale && !inputs.locale) {
    inputs.locale = body.locale;
  }

  const difyPayload = {
    inputs,
    query: body.prompt,
    response_mode: difyResponseMode,
    conversation_id: body.conversationId ?? "",
    user: difyUserId,
  };

  try {
    const difyResponse = await fetch(buildDifyUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${difyApiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify(difyPayload),
      cache: "no-store",
    });

    if (!difyResponse.ok) {
      const errorText = await difyResponse.text();
      logAssistantError("upstream-error", {
        status: difyResponse.status,
        statusText: difyResponse.statusText,
        responseBody: errorText.slice(0, 500),
      });
      const errorPayload: Record<string, string> = {
        error: "Dify request failed.",
        code: "DIFY_UPSTREAM_ERROR",
      };
      if (!isProduction) {
        errorPayload.details = errorText.slice(0, 500);
      }
      return NextResponse.json(
        errorPayload,
        { status: difyResponse.status, headers: rateLimitHeaders }
      );
    }

    const difyData = (await difyResponse.json()) as DifyMessage;
    const answer = extractAnswer(difyData);
    if (!answer) {
      logAssistantError("empty-answer", {
        conversationId: difyData.conversation_id,
      });
      return NextResponse.json(
        {
          error: "Dify response did not include an answer.",
          code: "DIFY_EMPTY_ANSWER",
        },
        { status: 502, headers: rateLimitHeaders }
      );
    }

    const payload: AssistantResponse = {
      answer,
      conversationId:
        difyData.conversation_id ?? body.conversationId ?? undefined,
      event: "message",
    };

    return NextResponse.json(payload, { headers: rateLimitHeaders });
  } catch (error) {
    logAssistantError(
      "network-error",
      { upstreamUrl: buildDifyUrl() },
      error
    );
    const networkPayload: Record<string, string> = {
      error: "Unable to reach Dify.",
      code: "DIFY_NETWORK_ERROR",
    };
    if (!isProduction) {
      networkPayload.details =
        error instanceof Error ? error.message : "Unknown network error";
    }
    return NextResponse.json(networkPayload, {
      status: 502,
      headers: rateLimitHeaders,
    });
  }
}
