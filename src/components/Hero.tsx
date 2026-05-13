"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PRODUCTS = [
  { name: "Moisture Seal Curl Crème", type: "Styler", icon: "✦" },
  { name: "Low-Poo Clarifying Shampoo", type: "Cleanser", icon: "◎" },
  { name: "Deep Repair Mask", type: "Treatment", icon: "◈" },
];

const SCORE_SEGMENTS = [
  { label: "Moisture", value: 82, color: "#C9903A" },
  { label: "Protein", value: 45, color: "#6B5040" },
  { label: "Scalp", value: 71, color: "#1A6B3A" },
];

function FormulaCard() {
  const [loaded, setLoaded] = useState(false);
  const [bars, setBars] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 200);
    const t2 = setTimeout(() => setBars(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="relative w-full max-w-[360px] mx-auto"
      style={{
        opacity: 0,
        animation: "introFade 700ms ease-out forwards",
        animationDelay: "500ms",
      }}
    >
      {/* Gold glow behind card */}
      <div
        className="absolute inset-0 -z-10 blur-[60px] opacity-20 rounded-full"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 70%)" }}
        aria-hidden
      />

      {/* Card */}
      <div
        className="relative rounded-[28px] bg-[#1A0F08] p-6 shadow-[0_32px_64px_-16px_rgba(26,15,8,0.35)]"
        style={{ animation: loaded ? "float 7s ease-in-out infinite" : "none" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-body text-[10px] font-bold tracking-[2.5px] uppercase text-[#C9903A] mb-1">
              Your Formula
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#C9903A]/15 border border-[#C9903A]/25 font-body text-[12px] font-bold text-[#E8C87A]">
                4C · High Porosity
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#C9903A]/12 border border-[#C9903A]/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#FDFCF8]/8 mb-5" />

        {/* Product slots */}
        <div className="flex flex-col gap-2.5 mb-5">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[#FDFCF8]/[0.04] border border-[#FDFCF8]/[0.07]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 400ms ease ${300 + i * 120}ms, transform 400ms ease ${300 + i * 120}ms`,
              }}
            >
              <span className="w-7 h-7 rounded-xl bg-[#C9903A]/12 flex items-center justify-center font-body text-[13px] text-[#C9903A]">
                {p.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-[12px] font-semibold text-[#FDFCF8] leading-snug truncate">
                  {p.name}
                </p>
                <p className="font-body text-[10px] text-[#B8A795] mt-0.5">{p.type}</p>
              </div>
              <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-[#1A6B3A]/20 border border-[#1A6B3A]/30 font-body text-[9px] font-bold tracking-[1px] uppercase text-[#4CAF50]">
                Match
              </span>
            </div>
          ))}
        </div>

        {/* Score bars */}
        <div className="flex flex-col gap-3">
          {SCORE_SEGMENTS.map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-body text-[11px] text-[#B8A795]">{s.label}</span>
                <span className="font-body text-[11px] font-semibold text-[#FDFCF8]">{s.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#FDFCF8]/8 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-[900ms] ease-out"
                  style={{
                    width: bars ? `${s.value}%` : "0%",
                    background: s.color,
                    transitionDelay: bars ? "0ms" : "0ms",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-[#FDFCF8]/8 flex items-center justify-between">
          <span className="font-body text-[10px] text-[#B8A795]/70">
            Based on your 7-question quiz
          </span>
          <span className="font-body text-[10px] font-bold tracking-[1px] uppercase text-[#C9903A]">
            Free ·&nbsp;2 min
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-[#FDFCF8] pt-[72px] overflow-hidden min-h-[88svh] flex items-center">
      {/* Gold glow — top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[600px] opacity-[0.08] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 55%)" }}
        aria-hidden
      />
      {/* Gold glow — bottom-left */}
      <div
        className="absolute bottom-0 left-[10%] w-[400px] h-[350px] opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 60%)" }}
        aria-hidden
      />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* ── Left: text ── */}
        <div
          style={{
            opacity: 0,
            animation: "introFade 700ms ease-out forwards",
            animationDelay: "300ms",
          }}
        >
          <h1
            className="font-display font-bold text-[#1A0F08] leading-[0.92] tracking-[-0.04em] mb-6"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}
          >
            Hair &amp; skin care
            <br />
            <span className="italic font-light text-[#6B5040]">
              that finally knows
            </span>
            <br />
            your texture.
          </h1>

          <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A]/70 max-w-md leading-[1.75] mb-8">
            One AI-powered consultation that understands 4C coils,
            melanin-rich skin, and what makes them thrive.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
            <a
              href="#quiz"
              className="group cta-magnetic inline-flex items-center justify-center gap-2.5 px-10 py-[18px] rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1.5px] uppercase hover:bg-[#2C1A0E] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.3)] transition-all"
            >
              Get your formula
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <Link
            href="/app"
            className="inline-flex items-center gap-2 font-body font-semibold text-[13px] tracking-[0.5px] text-[#C9903A] hover:text-[#1A0F08] transition-colors mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            Meet the app — 7 culturally-aware aunties tracking your hair daily
          </Link>
        </div>

        {/* ── Right: Formula card ── */}
        <div className="relative flex justify-center md:justify-end">
          <FormulaCard />
        </div>

      </div>
    </section>
  );
}
