"use client";

import { useState } from "react";
import { aunties, type Aunty } from "@/data/aunties";
import AuntyCharacterIcon from "./AuntyCharacterIcon";
import ScrollReveal from "./ScrollReveal";

/* ─── Decorative photo placeholder ─── */
function AuntyPortraitPlaceholder({ aunty, size = 200 }: { aunty: Aunty; size?: number }) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(155deg, ${aunty.gradient[0]} 0%, ${aunty.gradient[1]} 100%)`,
      }}
    >
      {/* Subtle pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        viewBox="0 0 200 240"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke={aunty.color} strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M10 30 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
          <path d="M10 60 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
          <path d="M10 90 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
          <path d="M10 120 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
          <path d="M10 150 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
          <path d="M10 180 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
          <path d="M10 210 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" />
        </g>
      </svg>

      {/* Avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full overflow-hidden ring-4"
          style={{
            background: aunty.bg,
            boxShadow: `0 12px 32px -8px ${aunty.color}55`,
            // @ts-expect-error -- TS doesn't know about ring-color CSS var
            "--tw-ring-color": "rgba(253,252,248,0.3)",
          }}
        >
          <AuntyCharacterIcon auntyId={aunty.id} size={size} />
        </div>
      </div>

      {/* Region badge */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1A0F08]/80 backdrop-blur-sm">
        <span className="font-body text-[9px] font-bold tracking-[1.5px] uppercase text-[#FDFCF8]">
          {aunty.region}
        </span>
      </div>
    </div>
  );
}

function AuntyCard({ aunty, expanded, onToggle }: { aunty: Aunty; expanded: boolean; onToggle: () => void }) {
  return (
    <article
      className="group relative bg-[#FDFCF8] rounded-3xl overflow-hidden border border-[rgba(26,15,8,0.06)] transition-all duration-500 hover:shadow-[0_22px_60px_-20px_rgba(26,15,8,0.18)] hover:-translate-y-1"
      style={{
        boxShadow: expanded
          ? `0 22px 60px -20px ${aunty.color}55`
          : "0 1px 3px rgba(26,15,8,0.04)",
      }}
    >
      {/* Top portrait area */}
      <div className="relative aspect-[4/3] p-3">
        <AuntyPortraitPlaceholder aunty={aunty} />
      </div>

      {/* Body */}
      <div className="p-6 pt-3 flex flex-col gap-3">
        {/* Name + title */}
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h3 className="font-display text-[1.4rem] font-bold text-[#1A0F08] leading-none tracking-[-0.02em]">
              {aunty.name}
            </h3>
            <p className="font-body text-[10px] font-bold tracking-[2px] uppercase mt-1.5" style={{ color: aunty.color }}>
              {aunty.title}
            </p>
          </div>
          <span className="font-body text-[10px] font-medium text-[#9E8C7A] flex-shrink-0">
            {aunty.dialect}
          </span>
        </div>

        {/* Specialty */}
        <p className="font-body text-[13px] text-[#3D2B1A] leading-[1.65]">
          {aunty.specialty}
        </p>

        {/* Quote — collapsible */}
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full text-left mt-1 pt-3 border-t border-[rgba(26,15,8,0.06)] group/btn"
        >
          <span className="font-body text-[10px] font-bold tracking-[2px] uppercase text-[#9E8C7A] group-hover/btn:text-[#1A0F08] transition-colors">
            {expanded ? "Hide" : "Hear"} her greeting
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            style={{ color: aunty.color }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {expanded && (
          <div
            className="mt-2 p-4 rounded-2xl"
            style={{ background: `${aunty.color}0F` }}
          >
            <p
              className="font-display text-[14px] italic font-semibold leading-snug"
              style={{ color: aunty.color }}
            >
              &ldquo;{aunty.greeting}&rdquo;
            </p>
            <p className="font-body text-[11px] text-[#6B5040] mt-2 leading-relaxed">
              {aunty.ingredient}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function MeetTheCouncil() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="council" className="py-20 md:py-28 bg-[#FDFCF8]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-14 md:mb-20">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              The Council
            </p>
            <h1 className="font-display text-[2.4rem] md:text-[4rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-6">
              Seven aunties.
              <br />
              <span className="italic font-light text-[#6B5040]">Seven perspectives.</span>
            </h1>
            <p className="font-body text-[15px] md:text-base text-[#3D2B1A] leading-[1.7] max-w-xl">
              Each aunty speaks a different dialect, swears by different ingredients, and brings
              a different eye to your hair. Together, they see the whole picture.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {aunties.map((aunty, i) => (
            <ScrollReveal key={aunty.id} delay={i * 80}>
              <AuntyCard
                aunty={aunty}
                expanded={expandedId === aunty.id}
                onToggle={() => setExpandedId(expandedId === aunty.id ? null : aunty.id)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA band */}
        <ScrollReveal delay={300}>
          <div className="mt-16 md:mt-20 relative rounded-3xl overflow-hidden bg-[#1A0F08] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div
              className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 70%)" }}
            />
            <div className="relative max-w-xl">
              <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-[#C9903A] mb-3">
                Your matchmakers
              </p>
              <h3 className="font-display text-[1.6rem] md:text-[2.2rem] font-bold text-[#FDFCF8] leading-[1.1] tracking-[-0.02em] mb-4">
                Take the consultation. See which aunties pick for you.
              </h3>
              <p className="font-body text-[14px] md:text-[15px] text-[#9E8C7A] leading-[1.7]">
                Two minutes. Seven perspectives. One routine that&apos;s actually built around your hair.
              </p>
            </div>
            <a
              href="/#quiz"
              className="cta-magnetic group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#C9903A] text-[#1A0F08] font-body font-bold text-[12px] tracking-[1.5px] uppercase hover:bg-[#E8C87A] flex-shrink-0 self-start md:self-auto"
            >
              Start consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
