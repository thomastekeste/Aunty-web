"use client";

import { useState } from "react";
import AuntyPortrait from "@/components/AuntyPortrait";
import { aunties } from "@/data/aunties";

type Status = "idle" | "loading" | "success" | "error";

const STACK_IDS = ["ngozi", "marcia", "denise", "fatou", "carmen", "senayt", "salma"];

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok || res.status === 409) {
        setStatus("success");
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Something went wrong — try again");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong — try again");
      setStatus("error");
    }
  }

  const ngozi = aunties.find((a) => a.id === "ngozi")!;

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-[#F3E9DD]"
      style={{ borderTop: "1px solid rgba(201,144,58,0.35)" }}
    >
      {/* Gold gradient top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #C9903A, transparent)" }}
        aria-hidden
      />

      <div className="relative max-w-[680px] mx-auto px-5 sm:px-6 py-16 md:py-20 text-center">

        {/* Aunty portrait stack */}
        <div className="flex items-center justify-center mb-6">
          {STACK_IDS.map((id, i) => {
            const aunty = aunties.find((a) => a.id === id);
            return (
              <div
                key={id}
                className={`relative rounded-full border-[2.5px] border-[#F3E9DD] shadow-sm ${
                  i >= 5 ? "hidden sm:block" : ""
                }`}
                style={{
                  marginLeft: i === 0 ? 0 : -10,
                  zIndex: STACK_IDS.length - i,
                }}
              >
                <AuntyPortrait auntyId={id} size={60} bg={aunty?.bg ?? "#F5EBD5"} />
              </div>
            );
          })}
        </div>

        <p className="font-body text-[10px] md:text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
          The app is coming
        </p>
        <h2 className="font-display text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] font-bold text-[#1A0F08] leading-[1.1] tracking-[-0.03em] mb-3">
          The aunties are almost
          <br className="sm:hidden" /> ready for you.
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-[#6B5040] leading-[1.7] max-w-md mx-auto mb-8">
          Join the list and get <span className="text-[#C9903A] font-semibold">20% off your first month</span> the
          moment the app drops.
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[rgba(201,144,58,0.10)] border border-[rgba(201,144,58,0.25)]">
            <AuntyPortrait auntyId="ngozi" size={44} bg={ngozi.bg} />
            <div className="text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                <span className="font-body text-[14px] font-semibold text-[#1A0F08]">
                  You&rsquo;re in 🤎
                </span>
              </div>
              <p className="font-body text-[11px] text-[#6B5040]">
                {ngozi.greeting}
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
            noValidate
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@email.com"
              autoComplete="email"
              inputMode="email"
              required
              className="flex-1 min-w-0 px-5 py-3.5 rounded-full bg-white border border-[rgba(26,15,8,0.12)] font-body text-[14px] text-[#1A0F08] placeholder:text-[#9E8C7A]/60 outline-none focus:border-[#C9903A] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-shrink-0 px-7 py-3.5 rounded-full bg-[#C9903A] text-[#1A0F08] font-body text-[12px] font-bold tracking-[1.5px] uppercase hover:bg-[#D4A04A] transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Joining…" : "Join the list"}
            </button>
          </form>
        )}

        {status === "error" && error && (
          <p className="font-body text-[12px] text-[#E07A5F] mt-3" role="alert">
            {error}
          </p>
        )}

        <p className="font-body text-[11px] text-[#9E8C7A] mt-5">
          No spam. One email when we launch, that&rsquo;s it.
        </p>
      </div>
    </section>
  );
}
