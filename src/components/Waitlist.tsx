"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { aunties } from "@/data/aunties";
import WordReveal from "./WordReveal";

const scatterPositions = aunties.map((a, i) => ({
  color: a.color,
  x: `${Math.cos((i / 7) * Math.PI * 2) * 80}px`,
  y: `${Math.sin((i / 7) * Math.PI * 2) * 80}px`,
}));

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ref, inView] = useInView({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (res.status === 409) {
      setError("You're already on the waitlist.");
      return;
    }
    if (!res.ok) {
      setError("Something went wrong. Try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative py-24 md:py-32 bg-[#1A0F08] noise overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#D4A04A] opacity-[0.03] blur-[150px]" />

      <div
        className="relative max-w-2xl mx-auto px-6 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s ease-out",
        }}
      >
        <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
          Launching Soon
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FEF8EC] mb-4 leading-tight">
          Your Council Is <br className="hidden md:block" />Almost Ready
        </h2>
        <p className="font-body text-lg text-[rgba(254,248,236,0.55)] mb-4 max-w-lg mx-auto">
          Join 2,400+ women already on the waitlist. Be the first to meet your aunties
          when the app goes live.
        </p>

        {/* Urgency */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(212,160,74,0.2)] bg-[rgba(212,160,74,0.06)] mb-8">
          <div className="w-2 h-2 rounded-full bg-[#D4A04A] animate-pulse" />
          <p className="font-body text-xs text-[#D4A04A]">
            Early access members get their first month free
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="flex-1 px-5 py-4 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(254,248,236,0.1)] text-[#FEF8EC] font-body placeholder:text-[rgba(254,248,236,0.25)] focus:outline-none focus:border-[#D4A04A] focus:ring-1 focus:ring-[#D4A04A]/30 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg shadow-[#D4A04A]/20 disabled:opacity-60"
            >
              {loading ? "Notifying your aunties…" : "Get Early Access"}
            </button>
          </form>
          {error && (
            <p className="mt-3 font-body text-sm text-[#C75B2A]">{error}</p>
          )}
        ) : (
          <div className="relative">
            {/* Scatter confetti */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {scatterPositions.map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: pos.color,
                    "--scatter-x": pos.x,
                    "--scatter-y": pos.y,
                    animation: "scatter 1.2s ease-out forwards",
                    animationDelay: `${i * 60}ms`,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Success */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#D4A04A] mb-6 animate-fade-in-up">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13L10 18L19 7" stroke="#D4A04A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <WordReveal
              text="Your aunties have been notified. They're preparing your council."
              as="p"
              stagger={85}
              className="font-display text-2xl font-bold text-[#FEF8EC] mb-3"
              cursor
            />
            <WordReveal
              text="Check your inbox — we'll be in touch."
              as="p"
              stagger={85}
              startDelay={2500}
              className="font-body text-[rgba(254,248,236,0.6)]"
            />
          </div>
        )}

        {/* App store badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <div className="px-5 py-3 rounded-xl border border-[rgba(254,248,236,0.08)] bg-[rgba(255,255,255,0.02)] text-[rgba(254,248,236,0.35)] font-body text-sm flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83"/><path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/></svg>
            App Store — Coming Soon
          </div>
          <div className="px-5 py-3 rounded-xl border border-[rgba(254,248,236,0.08)] bg-[rgba(255,255,255,0.02)] text-[rgba(254,248,236,0.35)] font-body text-sm flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.793 12 3.609 22.186a.996.996 0 0 1-.609-.92V2.734a1 1 0 0 1 .609-.92zM14.835 13.042l2.86 1.66-2.86 1.66-1.042-1.66 1.042-1.66zm5.893-3.404L18.5 8.15l-2.623 1.523L14.835 12l1.042 2.327L18.5 15.85l2.228-1.488c.667-.445.667-1.466 0-1.911z"/></svg>
            Google Play — Coming Soon
          </div>
        </div>

        {/* Send-off */}
        <div className="mt-16 pt-12 border-t border-[rgba(254,248,236,0.06)]">
          <p className="font-display text-xl italic text-[rgba(254,248,236,0.35)]">
            &ldquo;Baby, I been doing this since before YouTube tutorials. Trust the process.&rdquo;
          </p>
          <p className="font-body text-sm text-[#D4A04A] mt-3">
            — Aunty Denise, The Wise One
          </p>
        </div>
      </div>
    </section>
  );
}
