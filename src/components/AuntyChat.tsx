"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useCallback } from "react";
import type { Aunty } from "@/data/aunties";
import type { UIMessage } from "ai";

interface Props {
  aunty: Aunty;
}

/** Extract plain text from a UIMessage's parts array */
function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function AuntyChat({ aunty }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    messages: [
      {
        id: `greeting-${aunty.id}`,
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: aunty.greeting }],
      },
    ],
  });

  // Local input state (v6 doesn't expose input/handleInputChange)
  const inputRef = useRef<HTMLInputElement>(null);

  const isStreaming = status === "streaming" || status === "submitted";

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const text = inputRef.current?.value.trim();
      if (!text || isStreaming) return;
      if (inputRef.current) inputRef.current.value = "";

      await sendMessage({
        text,
      }, {
        body: { auntyId: aunty.id },
      });
    },
    [sendMessage, isStreaming, aunty.id]
  );

  return (
    <div className="bg-[#FDFCF8]/[0.02] border border-[#FDFCF8]/8 rounded-2xl md:rounded-3xl overflow-hidden max-w-2xl mx-auto backdrop-blur-sm">
      {/* ── Chat header ──────────────────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-[#FDFCF8]/8 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ backgroundColor: aunty.color + "25", color: aunty.color }}
        >
          {aunty.name[0]}
        </div>
        <div className="min-w-0">
          <p className="font-display text-[14px] font-bold text-[#FDFCF8] truncate">
            {aunty.name}
          </p>
          <p className="font-body text-[11px] text-[#9E8C7A]">
            {aunty.title} &middot; {aunty.region}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: aunty.color }}
          />
          <span className="font-body text-[10px] text-[#9E8C7A]">Online</span>
        </div>
      </div>

      {/* ── Messages ─────────────────────────────────────────────────── */}
      <div className="h-[160px] md:h-[200px] overflow-y-auto px-4 md:px-5 py-4 space-y-3 scroll-smooth">
        {messages.map((m) => {
          const isUser = (m.role as string) === "user";
          const text = getMessageText(m);
          if (!text) return null;

          return (
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              {/* Aunty avatar for assistant messages */}
              {!isUser && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-1 mr-2"
                  style={{
                    backgroundColor: aunty.color + "18",
                    color: aunty.color,
                  }}
                >
                  {aunty.name[0]}
                </div>
              )}

              <div
                className={`max-w-[82%] px-4 py-2.5 font-body text-[14px] leading-[1.65] ${
                  isUser
                    ? "bg-[#C9903A]/15 text-[#FDFCF8] rounded-2xl rounded-br-md"
                    : "bg-[#FDFCF8]/[0.05] text-[#FDFCF8]/90 rounded-2xl rounded-bl-md"
                }`}
                style={
                  !isUser
                    ? { borderLeft: `2px solid ${aunty.color}35` }
                    : undefined
                }
              >
                {text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isStreaming && (messages[messages.length - 1]?.role as string) === "user" && (
          <div className="flex justify-start animate-fadeIn">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-1 mr-2"
              style={{
                backgroundColor: aunty.color + "18",
                color: aunty.color,
              }}
            >
              {aunty.name[0]}
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-md bg-[#FDFCF8]/[0.05]"
              style={{ borderLeft: `2px solid ${aunty.color}35` }}
            >
              <div className="flex gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#9E8C7A] animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#9E8C7A] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#9E8C7A] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex justify-center">
            <p className="font-body text-[13px] text-red-400/80 bg-red-400/10 px-4 py-2 rounded-xl">
              {error.message.includes("429")
                ? "Too many messages — give aunty a moment to breathe."
                : "Something went wrong. Try sending again."}
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="px-4 md:px-5 py-3 md:py-4 border-t border-[#FDFCF8]/8 flex gap-2 md:gap-3"
      >
        <input
          ref={inputRef}
          placeholder={`Ask ${aunty.name} about hair & skin...`}
          className="flex-1 min-w-0 bg-[#FDFCF8]/[0.05] border border-[#FDFCF8]/10 rounded-xl px-4 py-2.5 md:py-3 font-body text-[14px] text-[#FDFCF8] placeholder:text-[#9E8C7A]/50 focus:outline-none focus:border-[#C9903A]/40 focus:bg-[#FDFCF8]/[0.06] transition-all duration-200"
          disabled={isStreaming}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isStreaming}
          className="shrink-0 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-[#C9903A] text-[#1A0F08] font-body text-[12px] md:text-[13px] font-bold tracking-[0.5px] uppercase hover:bg-[#E8C87A] active:scale-[0.97] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#C9903A]"
        >
          <span className="hidden md:inline">Send</span>
          {/* Arrow icon on mobile */}
          <svg
            className="md:hidden w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}
