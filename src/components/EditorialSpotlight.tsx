"use client";

/**
 * Editorial spotlight — featured aunty pick, single-quote at a time.
 * Pattern adapted from 21st.dev Editorial Testimonial component.
 * Uses our AuntyCharacterIcon (no external images) and brand styling.
 */

import { useState } from "react";
import AuntyCharacterIcon from "./AuntyCharacterIcon";
import { aunties } from "@/data/aunties";

interface Spotlight {
  id: number;
  quote: string;
  author: string;
  texture: string;
  auntyId: string;
}

const SPOTLIGHTS: Spotlight[] = [
  {
    id: 1,
    quote: "Wash day went from a 4-hour ordeal to a 2-hour ritual I actually look forward to.",
    author: "Khadija Mensah",
    texture: "4C / High porosity",
    auntyId: "ngozi",
  },
  {
    id: 2,
    quote: "My stylist asked what I'd been doing differently. Three months in, the changes are visible.",
    author: "Tasha Robinson",
    texture: "3C / Normal porosity",
    auntyId: "denise",
  },
  {
    id: 3,
    quote: "The aunty verdicts felt personal — like someone actually looked at MY hair, not a category.",
    author: "Nia Williams",
    texture: "High porosity / Dry",
    auntyId: "amara",
  },
  {
    id: 4,
    quote: "Finally a skincare line that doesn't leave a white cast. The PIH serum is a permanent staple.",
    author: "Brianna Carter",
    texture: "Combination / Melanin-rich",
    auntyId: "salma",
  },
];

export default function EditorialSpotlight() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const change = (index: number) => {
    if (index === active || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setTransitioning(false), 50);
    }, 280);
  };

  const prev = () => change(active === 0 ? SPOTLIGHTS.length - 1 : active - 1);
  const next = () => change(active === SPOTLIGHTS.length - 1 ? 0 : active + 1);

  const current = SPOTLIGHTS[active];
  const aunty = aunties.find((a) => a.id === current.auntyId);

  return (
    <section className="relative py-24 md:py-32 bg-[#FDFCF8] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1A0F08 0.7px, transparent 0.7px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Eyebrow */}
        <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-12 md:mb-16">
          Aunty spotlight
        </p>

        {/* Quote layout */}
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">

          {/* Massive index */}
          <span
            className="font-display font-light leading-none text-[#1A0F08]/8 select-none transition-all duration-500 tabular-nums"
            style={{
              fontSize: "clamp(6rem, 12vw, 10rem)",
              letterSpacing: "-0.06em",
              fontFeatureSettings: '"tnum"',
            }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 md:pt-6">

            {/* Quote */}
            <blockquote
              className={`font-display font-light text-[#1A0F08] leading-[1.25] tracking-[-0.02em] transition-all duration-300 ${
                transitioning ? "opacity-0 translate-x-3" : "opacity-100 translate-x-0"
              }`}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              <span className="font-display text-[#C9903A] italic mr-2">&ldquo;</span>
              {current.quote}
              <span className="font-display text-[#C9903A] italic ml-1">&rdquo;</span>
            </blockquote>

            {/* Author + aunty */}
            <div
              className={`mt-10 md:mt-12 group cursor-default transition-all duration-300 delay-100 ${
                transitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-5">

                {/* Reviewer avatar — letter monogram styled */}
                <div
                  className="w-14 h-14 rounded-full ring-2 ring-[#1A0F08]/10 group-hover:ring-[#C9903A]/40 transition-all duration-500 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: aunty
                      ? `linear-gradient(135deg, ${aunty.gradient[0]} 0%, ${aunty.gradient[1]} 100%)`
                      : "#F7F5F0",
                  }}
                >
                  <span className="font-display text-[18px] font-bold text-[#1A0F08]">
                    {current.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="font-display text-[16px] font-semibold text-[#1A0F08] leading-tight">
                    {current.author}
                  </p>
                  <p className="font-body text-[13px] text-[#9E8C7A] mt-1">
                    {current.texture}
                    <span className="mx-2 text-[#1A0F08]/15">/</span>
                    <span className="group-hover:text-[#1A0F08] transition-colors duration-300 inline-flex items-center gap-1.5">
                      <span
                        className="inline-block w-4 h-4 rounded-full overflow-hidden align-middle"
                        aria-hidden
                      >
                        <AuntyCharacterIcon auntyId={current.auntyId} size={16} />
                      </span>
                      {aunty?.name}&apos;s pick
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation rail */}
        <div className="mt-16 md:mt-20 flex items-center justify-between gap-6 pt-8 border-t border-[rgba(26,15,8,0.08)]">

          {/* Vertical line selectors */}
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-3">
              {SPOTLIGHTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => change(i)}
                  className="group relative py-4 px-1"
                  aria-label={`Show spotlight ${i + 1}`}
                >
                  <span
                    className={`block h-px transition-all duration-500 ease-out ${
                      i === active
                        ? "w-14 bg-[#1A0F08]"
                        : "w-6 bg-[#1A0F08]/20 group-hover:w-10 group-hover:bg-[#1A0F08]/40"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="font-body text-[11px] tracking-[2px] uppercase text-[#9E8C7A] tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(SPOTLIGHTS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Prev/Next */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              aria-label="Previous spotlight"
              className="w-11 h-11 rounded-full text-[#1A0F08]/40 hover:text-[#1A0F08] hover:bg-[#1A0F08]/5 transition-all duration-300 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next spotlight"
              className="w-11 h-11 rounded-full text-[#1A0F08]/40 hover:text-[#1A0F08] hover:bg-[#1A0F08]/5 transition-all duration-300 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
