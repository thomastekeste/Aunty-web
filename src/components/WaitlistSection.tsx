"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

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
        // Treat "already on the list" as success
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

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-[#1A0F08]"
      style={{ borderTop: "1px solid rgba(201,144,58,0.35)" }}
    >
      {/* Gold gradient top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #C9903A, transparent)" }}
        aria-hidden
      />
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FDFCF8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative max-w-[680px] mx-auto px-5 sm:px-6 py-16 md:py-20 text-center">
        <p className="font-body text-[10px] md:text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
          The app is coming
        </p>
        <h2 className="font-display text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] font-bold text-[#FDFCF8] leading-[1.1] tracking-[-0.03em] mb-3">
          The aunties are almost
          <br className="sm:hidden" /> ready for you.
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-[#9E8C7A] leading-[1.7] max-w-md mx-auto mb-8">
          Join the list and get <span className="text-[#C9903A] font-semibold">20% off your first month</span> the
          moment the app drops.
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[rgba(201,144,58,0.12)] border border-[rgba(201,144,58,0.3)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12l5 5L20 7" />
            </svg>
            <span className="font-body text-[14px] font-semibold text-[#FDFCF8]">
              You&rsquo;re in 🤎 We&rsquo;ll see you at launch.
            </span>
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
              className="flex-1 min-w-0 px-5 py-3.5 rounded-full bg-[rgba(253,252,248,0.06)] border border-[rgba(253,252,248,0.15)] font-body text-[14px] text-[#FDFCF8] placeholder:text-[#9E8C7A]/60 outline-none focus:border-[#C9903A] transition-colors"
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

        <p className="font-body text-[11px] text-[#9E8C7A]/60 mt-5">
          No spam. One email when we launch, that&rsquo;s it.
        </p>
      </div>
    </section>
  );
}
