import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ASSISTANT_SESSION_COOKIE,
  ASSISTANT_SESSION_TTL_SECONDS,
  generateSessionCookieValue,
  isSessionSecretConfigured,
  verifySessionCookieValue,
} from "@/lib/assistantSession";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!isSessionSecretConfigured()) {
    return NextResponse.json(
      { error: "Assistant session secret is not configured." },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const existingValue = cookieStore.get(ASSISTANT_SESSION_COOKIE)?.value;
  const response = NextResponse.json({ ok: true });

  const cookieConfig = {
    name: ASSISTANT_SESSION_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ASSISTANT_SESSION_TTL_SECONDS,
  };

  if (existingValue && verifySessionCookieValue(existingValue)) {
    response.cookies.set({ ...cookieConfig, value: existingValue });
    return response;
  }

  const newValue = generateSessionCookieValue();
  if (!newValue) {
    return NextResponse.json(
      { error: "Unable to initialize assistant session." },
      { status: 500 },
    );
  }

  response.cookies.set({ ...cookieConfig, value: newValue });
  return response;
}
