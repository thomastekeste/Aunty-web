"use client";

import { useState } from "react";
import { aunties } from "@/data/aunties";
import AuntyCrown from "./AuntyCrown";
import AuntyChat from "./AuntyChat";

/**
 * Hero section — Aunty crown + AI chat + marketplace headline.
 * Replaces both the old Hero and old carousel section.
 */
export default function MeetTheAunties() {
  const [selected, setSelected] = useState(aunties[0]);

  return (
    <section className="relative pt-36 md:pt-40 pb-14 md:pb-20 overflow-hidden bg-[#1A0F08]">
      {/* ── Background decoration ──────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FDFCF8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      {/* Dynamic glow that follows selected aunty color */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${selected.color}50 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        {/* ── Headline ─────────────────────────────────────────────── */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-body text-[10px] md:text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
            The Aunty Council
          </p>
          <h1 className="font-display text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] font-bold text-[#FDFCF8] leading-[1.08] tracking-[-0.03em]">
            The marketplace for{" "}
            <span className="italic text-[#C9903A]">textured hair</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>&amp; melanin-rich skin.
          </h1>
          <p className="font-body text-[13px] md:text-[15px] text-[#9E8C7A] leading-[1.7] mt-4 max-w-lg mx-auto">
            Pick an aunty. Ask her anything. Then shop the products she
            recommends — curated &amp; vetted for your texture.
          </p>
        </div>

        {/* ── Crown of aunties ─────────────────────────────────────── */}
        <div className="mb-8 md:mb-10">
          <AuntyCrown
            aunties={aunties}
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        {/* ── Chat panel ───────────────────────────────────────────── */}
        <AuntyChat key={selected.id} aunty={selected} />

        {/* ── CTAs ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-10">
          <a
            href="/products"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C9903A] text-[#1A0F08] font-body text-[13px] font-bold tracking-[1px] uppercase hover:bg-[#E8C87A] active:scale-[0.97] transition-all duration-200"
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
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#FDFCF8]/15 text-[#FDFCF8]/80 font-body text-[12px] font-medium tracking-[0.5px] hover:border-[#FDFCF8]/30 hover:text-[#FDFCF8] transition-all duration-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            Download the app
          </a>
        </div>

        {/* ── Trust stats (inline) ─────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-10 text-[#9E8C7A]/50">
          <span className="font-body text-[11px] md:text-[12px]">
            68+ vetted products
          </span>
          <span className="w-1 h-1 rounded-full bg-[#9E8C7A]/30" />
          <span className="font-body text-[11px] md:text-[12px]">
            4.9★ avg rating
          </span>
          <span className="w-1 h-1 rounded-full bg-[#9E8C7A]/30" />
          <span className="font-body text-[11px] md:text-[12px]">
            15+ trusted brands
          </span>
        </div>
      </div>
    </section>
  );
}
