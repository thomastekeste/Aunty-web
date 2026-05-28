"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { label: "Sleep & Protection", icon: "◈", href: "/products?cat=sleep" },
  { label: "Tools & Brushes", icon: "✦", href: "/products?cat=tools" },
  { label: "Skincare Devices", icon: "◎", href: "/products?cat=devices" },
];

function CategoryGrid() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
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
        <div className="mb-5">
          <p className="font-body text-[10px] font-bold tracking-[2.5px] uppercase text-[#C9903A] mb-2">
            Shop by category
          </p>
          <p className="font-body text-[13px] text-[#B8A795] leading-relaxed">
            Curated accessories for textured hair &amp; melanin-rich skin.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#FDFCF8]/8 mb-5" />

        {/* Category slots */}
        <div className="flex flex-col gap-2.5 mb-5">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.label}
              href={c.href}
              className="group flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[#FDFCF8]/[0.04] border border-[#FDFCF8]/[0.07] hover:bg-[#FDFCF8]/[0.08] hover:border-[#C9903A]/30 transition-all"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 400ms ease ${300 + i * 120}ms, transform 400ms ease ${300 + i * 120}ms`,
              }}
            >
              <span className="w-7 h-7 rounded-xl bg-[#C9903A]/12 flex items-center justify-center font-body text-[13px] text-[#C9903A]">
                {c.icon}
              </span>
              <span className="flex-1 font-body text-[13px] font-semibold text-[#FDFCF8] leading-snug">
                {c.label}
              </span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#C9903A" strokeWidth="2" strokeLinecap="round"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#FDFCF8]/8 flex items-center justify-between">
          <span className="font-body text-[10px] text-[#B8A795]/70">
            68+ vetted products
          </span>
          <span className="font-body text-[10px] font-bold tracking-[1px] uppercase text-[#C9903A]">
            Ships fast
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-[#FDFCF8] pt-[112px] overflow-hidden min-h-[88svh] flex items-center">
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
            The marketplace for
            <br />
            <span className="italic font-light text-[#6B5040]">
              textured hair
            </span>
            <br />
            &amp; melanin-rich skin.
          </h1>

          <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A]/70 max-w-md leading-[1.75] mb-8">
            Curated products from trusted brands — vetted for your texture,
            safe for your melanin. No guesswork, no drugstore roulette.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
            <Link
              href="/products"
              className="group cta-magnetic inline-flex items-center justify-center gap-2.5 px-10 py-[18px] rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1.5px] uppercase hover:bg-[#2C1A0E] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.3)] transition-all"
            >
              Shop now
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
            </Link>
          </div>

          <Link
            href="/app"
            className="inline-flex items-center gap-2 font-body font-semibold text-[13px] tracking-[0.5px] text-[#C9903A] hover:text-[#1A0F08] transition-colors mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            Download the app — daily coaching from 7 culturally-aware aunties
          </Link>
        </div>

        {/* ── Right: Category card ── */}
        <div className="relative flex justify-center md:justify-end">
          <CategoryGrid />
        </div>

      </div>
    </section>
  );
}
