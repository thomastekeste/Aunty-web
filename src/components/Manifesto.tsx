"use client";

import { useEffect, useRef } from "react";

/**
 * Brand manifesto section — bold opinionated statement that sets tone.
 * Words highlight progressively as the user scrolls past.
 */
export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when section enters bottom of viewport, 1 when it leaves the top
      const start = vh * 0.85;
      const end = vh * 0.15;
      const range = start - end;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / range));

      const words = wordsRef.current;
      const total = words.length;
      const reveal = progress * total;
      words.forEach((w, i) => {
        if (!w) return;
        const wp = Math.max(0, Math.min(1, reveal - i));
        // From muted to ink based on per-word progress
        w.style.color = `color-mix(in srgb, #1A0F08 ${wp * 100}%, #C9C0B0 ${(1 - wp) * 100}%)`;
        w.style.transform = `translateY(${(1 - wp) * 4}px)`;
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const lines = [
    "We don't believe in",
    "one-size-fits-most.",
    "We believe your",
    "4C coils, your dry",
    "scalp, your melanin —",
    "deserve a routine",
    "built by",
    "someone who knows.",
  ];

  let wordIndex = 0;

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 bg-[#FDFCF8] overflow-hidden"
    >
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10">
        <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-8">
          Our manifesto
        </p>

        <h2 className="font-display font-bold leading-[1.05] tracking-[-0.025em] text-[2rem] md:text-[3.6rem] flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 md:gap-y-2">
          {lines.map((line, li) => (
            <span key={li} className="block w-full">
              {line.split(" ").map((word, wi) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={`${li}-${wi}`}
                    ref={(el) => {
                      if (el) wordsRef.current[idx] = el;
                    }}
                    className="inline-block mr-3 md:mr-4 transition-all duration-200"
                    style={{ color: "#C9C0B0", transform: "translateY(4px)" }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        <div className="mt-12 md:mt-16 pt-8 border-t border-[rgba(26,15,8,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-body text-[14px] md:text-[15px] text-[#3D2B1A] leading-[1.7] max-w-md">
            Aunty Council was built so the texture you were born with is the texture
            your routine was made for.
          </p>
          <a
            href="#quiz"
            className="cta-magnetic group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-semibold text-[12px] tracking-[1.5px] uppercase hover:bg-[#0F0905] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.45)] flex-shrink-0 self-start md:self-auto"
          >
            Find your aunty
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
