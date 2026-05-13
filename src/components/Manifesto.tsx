"use client";

import { useEffect, useRef } from "react";

/**
 * Brand manifesto — cream editorial statement with scroll-reveal.
 * Words fade from muted to ink as user scrolls, with italic emphasis on key words.
 */

type WordDef = { text: string; italic?: boolean };
type LineDef = WordDef[];

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
      const start = vh * 0.88;
      const end = vh * 0.08;
      const range = start - end;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / range));

      const words = wordsRef.current;
      const total = words.length;
      const reveal = progress * total;

      words.forEach((w, i) => {
        if (!w) return;
        const wp = Math.max(0, Math.min(1, reveal - i));
        // Muted warm gray → deep ink
        w.style.color = `color-mix(in srgb, #1A0F08 ${wp * 100}%, #D8D0C4 ${(1 - wp) * 100}%)`;
        w.style.transform = `translateY(${(1 - wp) * 6}px)`;
        w.style.opacity = `${0.15 + wp * 0.85}`;
      });

      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const lines: LineDef[] = [
    [{ text: "Your" }, { text: "crown,", italic: true }],
    [{ text: "was" }, { text: "never" }, { text: "broken." }],
    [{ text: "It" }, { text: "just" }, { text: "needed" }],
    [{ text: "someone" }, { text: "who" }],
    [{ text: "speaks" }, { text: "its" }, { text: "language.", italic: true }],
    [{ text: "Now" }, { text: "go" }, { text: "wear", italic: true }, { text: "it" }],
    [{ text: "like" }, { text: "you" }, { text: "mean" }, { text: "it." }],
  ];

  let wordIndex = 0;

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 bg-[#FDFCF8] overflow-hidden"
    >
      {/* Faint decorative quote mark */}
      <div
        className="absolute top-6 right-6 md:right-14 font-display font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(8rem, 16vw, 16rem)",
          color: "rgba(26,15,8,0.035)",
          lineHeight: 0.8,
        }}
        aria-hidden
      >
        &ldquo;
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Label */}
        <div className="flex items-center gap-3 mb-12 md:mb-16">
          <div className="h-px w-6 bg-[#C9903A]" />
          <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A]">
            Our manifesto
          </p>
        </div>

        {/* Headline */}
        <h2
          className="font-display font-bold leading-[1.02] tracking-[-0.035em]"
          style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)" }}
        >
          {lines.map((line, li) => (
            <span key={li} className="block mb-0.5 md:mb-1">
              {line.map((word, wi) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={`${li}-${wi}`}
                    ref={(el) => { if (el) wordsRef.current[idx] = el; }}
                    className={`inline-block mr-[0.22em] transition-[color,transform,opacity] duration-200 ${
                      word.italic ? "italic font-light" : ""
                    }`}
                    style={{
                      color: "#D8D0C4",
                      transform: "translateY(6px)",
                      opacity: 0.15,
                    }}
                  >
                    {word.text}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        {/* Divider + subtext + CTA */}
        <div className="mt-16 md:mt-22 pt-8 border-t border-[rgba(26,15,8,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A]/65 leading-[1.75] max-w-[400px]">
            Aunty Council was built so the texture you were born with
            is the texture your routine was made for.
          </p>
          <a
            href="#quiz"
            className="cta-magnetic group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-semibold text-[12px] tracking-[1.5px] uppercase hover:bg-[#0F0905] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.45)] flex-shrink-0 self-start md:self-auto transition-all duration-200"
          >
            Find your aunty
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
