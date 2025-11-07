"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AssistantCopy } from "@/types/landing";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type AssistantWidgetProps = {
  copy: AssistantCopy;
};

type AssistantApiResponse = {
  answer?: string;
  conversationId?: string;
  error?: string;
  code?: string;
  limit?: number;
  remaining?: number;
  resetAt?: string;
};

function resolveReply(
  prompt: string,
  faqs: AssistantCopy["faqs"],
  fallbackReplies: AssistantCopy["fallbackReplies"]
): string {
  const lower = prompt.toLowerCase();
  const match = faqs.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword.toLowerCase()))
  );
  if (match) {
    return match.reply;
  }
  const index = Math.floor(Math.random() * fallbackReplies.length);
  return fallbackReplies[index];
}

export function AssistantWidget({ copy }: AssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      role: "assistant",
      content: copy.initialMessage,
    },
  ]);
  const [conversationId, setConversationId] = useState<string>();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const messageCounter = useRef(1);
  const sessionInitializer = useRef<Promise<void> | null>(null);
  const sessionReadyRef = useRef(false);

  const ensureAssistantSession = useCallback(async () => {
    if (sessionReadyRef.current) {
      return;
    }
    if (!sessionInitializer.current) {
      sessionInitializer.current = fetch("/api/assistant/session", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to initialize assistant session.");
          }
          sessionReadyRef.current = true;
        })
        .catch((error) => {
          sessionReadyRef.current = false;
          if (process.env.NODE_ENV !== "production") {
            console.error("Failed to initialize assistant session", error);
          }
          throw error;
        })
        .finally(() => {
          sessionInitializer.current = null;
        });
    }
    await sessionInitializer.current;
  }, []);

  const panelClassName = useMemo(() => {
    const base =
      "w-[28rem] max-w-[95vw] sm:w-[32rem] overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl transition-all duration-200 ease-out dark:border-zinc-700 dark:bg-zinc-900";
    const state = isOpen
      ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
      : "pointer-events-none opacity-0 translate-y-3 scale-95";
    return `${base} ${state}`;
  }, [isOpen]);

  const fallbackNotice =
    "Dify knowledge base is unavailable. Showing a local FAQ reply instead.";

  useEffect(() => {
    ensureAssistantSession().catch(() => undefined);
  }, [ensureAssistantSession]);

  useEffect(() => {
    if (!threadRef.current) return;
    threadRef.current.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  useEffect(() => {
    function handlePointer(event: MouseEvent) {
      if (!isOpen || !containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [isOpen]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const appendMessage = (role: ChatRole, content: string) => {
    const id = `msg-${messageCounter.current++}`;
    setMessages((prev) => [...prev, { id, role, content }]);
    return id;
  };

  const updateMessage = (id: string, content: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, content } : message
      )
    );
  };

  const handleConversation = async (
    prompt: string,
    fallbackReply?: string
  ) => {
    appendMessage("user", prompt);
    const placeholderId = appendMessage("assistant", "...");
    setIsSending(true);
    setErrorMessage(null);

    const fallback = () =>
      fallbackReply ?? resolveReply(prompt, copy.faqs, copy.fallbackReplies);

    const sendAssistantRequest = async (
      attempt = 0
    ): Promise<{
      response: Response;
      payload: AssistantApiResponse | undefined;
    }> => {
      await ensureAssistantSession().catch(() => undefined);
      const response = await fetch("/api/assistant", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          conversationId,
          locale:
            typeof navigator !== "undefined" ? navigator.language : undefined,
        }),
      });

      let payload: AssistantApiResponse | undefined;
      try {
        payload = (await response.json()) as AssistantApiResponse;
      } catch {
        throw new Error("Invalid response from assistant service.");
      }

      if (
        !response.ok &&
        response.status === 401 &&
        payload?.code === "SESSION_INVALID" &&
        attempt < 1
      ) {
        sessionReadyRef.current = false;
        return sendAssistantRequest(attempt + 1);
      }

      return { response, payload };
    };

    try {
      const { response, payload } = await sendAssistantRequest();

      if (!response.ok) {
        if (payload?.code === "DAILY_LIMIT_EXCEEDED") {
          const limitCount = payload.limit ?? 250;
          const limitMessage =
            payload.error ??
            `Daily conversation limit of ${limitCount} requests reached. Please try again tomorrow.`;
          updateMessage(placeholderId, limitMessage);
          setErrorMessage(limitMessage);
          return;
        }
        throw new Error(payload?.error ?? "Knowledge base request failed.");
      }

      if (!payload?.answer) {
        throw new Error(payload?.error ?? "Knowledge base request failed.");
      }

      updateMessage(placeholderId, payload.answer);
      if (payload.conversationId) {
        setConversationId(payload.conversationId);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Assistant request failed", error);
      }
      updateMessage(placeholderId, fallback());
      setErrorMessage(fallbackNotice);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputValue.trim();
    if (!value || isSending) return;

    void handleConversation(value);
    setInputValue("");
  };

  const handleSuggestionClick = (
    item: AssistantCopy["suggestions"][number]
  ) => {
    setIsOpen(true);
    if (isSending) return;
    void handleConversation(item.prompt, item.reply);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[2147483647] flex flex-col items-end gap-3"
    >
      <div
        id="assistant-panel"
        className={panelClassName}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center gap-3 border-b border-zinc-200 px-5 pb-3 pt-4 dark:border-zinc-700">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-lg text-white shadow-md">
            <span className="font-semibold">AI</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {copy.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {copy.tagline}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:hover:bg-zinc-800"
            aria-label={copy.closeAria}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path d="M18.3 5.71a1 1 0 0 0-1.41-1.42L12 9.17 7.11 4.29A1 1 0 1 0 5.7 5.7L10.59 10.6l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 12l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 10.6z" />
            </svg>
          </button>
        </div>

        <div
          ref={threadRef}
          className="scrollbar-thin flex max-h-[32rem] flex-col gap-3 overflow-y-auto px-5 pb-4 pt-4 text-sm"
          role="log"
          aria-live="polite"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "assistant"
                  ? "flex justify-start"
                  : "flex justify-end"
              }
            >
              <div
                className={[
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  message.role === "assistant"
                    ? "bg-indigo-50 text-indigo-950 dark:bg-indigo-500/20 dark:text-indigo-100"
                    : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
                ].join(" ")}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {copy.suggestions.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSuggestionClick(item)}
              disabled={isSending}
              className="rounded-full border border-indigo-200 px-3 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-indigo-500/50 dark:text-indigo-200 dark:hover:bg-indigo-500/10"
            >
              {item.label}
            </button>
          ))}
        </div>

        {errorMessage && (
          <p className="px-5 text-xs text-amber-600 dark:text-amber-400">
            {errorMessage}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          aria-busy={isSending}
          className="flex items-center gap-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-700"
        >
          <label htmlFor="assistant-input" className="sr-only">
            {copy.inputLabel}
          </label>
          <input
            id="assistant-input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={copy.inputPlaceholder}
            disabled={isSending}
            className="flex-1 rounded-full border border-transparent bg-zinc-100 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isSending}
            aria-disabled={isSending}
            className="grid h-9 w-9 place-items-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-indigo-100"
            aria-label={copy.submitAria}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="m5 4 15 8-15 8 3-8-3-8Zm3.91 8.91-1.27 3.37L16.49 12 7.64 7.72l1.27 3.37H13a1 1 0 0 1 0 2H8.91Z" />
            </svg>
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 text-white"
          fill="currentColor"
        >
          <path d="M12 2a10 10 0 0 0-7.07 17.07L3 21l1.93-.93A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.9-1.65l-.35-.26-.84.4.4-.84-.26-.35A8 8 0 1 1 12 20Zm-1-9h2v5h-2Zm0-4h2v2h-2Z" />
        </svg>
        <span>{copy.buttonLabel}</span>
      </button>
    </div>
  );
}
