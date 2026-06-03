"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
  /** Where this signup came from — 'hero', 'sticky', 'footer'. */
  source: string;
  /** "dark" = on a dark background (gold accents), "light" = on cream. */
  variant?: "dark" | "light";
  className?: string;
}

export default function WaitlistForm({
  source,
  variant = "dark",
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const dark = variant === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data?.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        className={`font-body text-[15px] font-semibold ${
          dark ? "text-[#F3E9DD]" : "text-[#1A0F08]"
        } ${className}`}
      >
        You&rsquo;re in 🤎 We&rsquo;ll see you at launch.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row gap-2.5 w-full">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          className={`flex-1 min-w-0 px-5 py-3.5 rounded-full font-body text-[14px] outline-none transition-all ${
            dark
              ? "bg-[#F3E9DD]/[0.06] border border-[#F3E9DD]/15 text-[#F3E9DD] placeholder:text-[#F3E9DD]/40 focus:border-[#D4A04A]"
              : "bg-white border border-[rgba(26,15,8,0.12)] text-[#1A0F08] placeholder:text-[#9E8C7A] focus:border-[#D4A04A]"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex-shrink-0 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-[13px] tracking-[1px] uppercase hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {status === "loading" ? "Joining…" : "Join the List"}
        </button>
      </div>
      {status === "error" && (
        <p className="font-body text-[12px] text-[#E0735C] mt-2 px-1">{error}</p>
      )}
    </form>
  );
}
