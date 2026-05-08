"use client";

/**
 * "What you get" bento grid — variable column spans, subtle hover lift,
 * floating icon animations. Pattern adapted from 21st.dev Bento Monochrome.
 * Brand-themed for Aunty Council.
 */

import { useEffect, useRef, useState } from "react";

interface Feature {
  title: string;
  blurb: string;
  meta: string;
  span: string;
  icon: React.ReactNode;
  bg?: string;
  dark?: boolean;
}

const FEATURES: Feature[] = [
  {
    title: "AI Aunty Consultation",
    blurb: "Seven aunty perspectives, one AI-powered quiz that builds your routine in two minutes. Re-takeable as your hair changes.",
    meta: "Quiz",
    span: "md:col-span-4 md:row-span-2",
    bg: "linear-gradient(155deg, #1A0F08 0%, #2D1B0E 60%, #3D2B1A 100%)",
    dark: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    title: "Texture-matched",
    blurb: "Every formula tested on the porosity & curl pattern it claims to serve.",
    meta: "Match",
    span: "md:col-span-2 md:row-span-1",
    bg: "linear-gradient(155deg, #F5ECD4 0%, #E8C87A 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 12 q 3 -8 6 0 t 6 0 t 6 0" />
        <path d="M3 6 q 3 -4 6 0 t 6 0 t 6 0" opacity="0.5" />
        <path d="M3 18 q 3 -4 6 0 t 6 0 t 6 0" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Pre-order model",
    blurb: "Your money funds your formula, not warehouse inventory.",
    meta: "Ship",
    span: "md:col-span-2 md:row-span-1",
    bg: "linear-gradient(155deg, #F7EDE9 0%, #E8C4B8 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M16 16h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <path d="M14 5H6a2 2 0 0 0-2 2v9" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Melanin-aware",
    blurb: "Every skin formula screened for actives that trigger PIH on melanin-rich skin.",
    meta: "Skin",
    span: "md:col-span-3 md:row-span-1",
    bg: "linear-gradient(155deg, #E4EDE8 0%, #BFD9C8 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    title: "Adapts as you change",
    blurb: "Hair shifts with seasons, hormones, and life. Re-take the quiz any time.",
    meta: "Adapt",
    span: "md:col-span-3 md:row-span-1",
    bg: "linear-gradient(155deg, #EDE9DF 0%, #D4C8AE 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
];

export default function BentoFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#FDFCF8] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1A0F08 0.7px, transparent 0.7px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16 pb-6 border-b border-[rgba(26,15,8,0.08)]">
          <div className="flex flex-col gap-3">
            <span className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A]">
              What you get
            </span>
            <h2 className="font-display text-[2rem] md:text-[3rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em]">
              Built different.
              <br />
              <span className="italic font-light text-[#6B5040]">From the inside out.</span>
            </h2>
          </div>
          <p className="font-body text-[14px] md:text-[15px] text-[#3D2B1A] leading-[1.7] max-w-md">
            Five things you won&apos;t find when you grab a random product off the shelf —
            no matter what the bottle promises.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[minmax(140px,auto)] gap-4 md:gap-5">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_60px_-20px_rgba(26,15,8,0.18)] ${f.span}`}
              style={{
                background: f.bg ?? "#F7F5F0",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(18px) scale(0.96)",
                transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, box-shadow 350ms ease`,
              }}
            >
              {/* Decorative gold gradient blob (only on dark hero card) */}
              {f.dark && (
                <div
                  className="absolute -bottom-20 -right-20 w-[260px] h-[260px] rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 70%)" }}
                  aria-hidden
                />
              )}

              {/* Top: icon + meta */}
              <header className="flex items-start justify-between gap-4 relative">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: f.dark ? "rgba(201,144,58,0.12)" : "rgba(26,15,8,0.05)",
                    color: f.dark ? "#C9903A" : "#1A0F08",
                  }}
                >
                  {f.icon}
                </div>
                <span
                  className="px-2.5 py-1 rounded-full font-body text-[9px] font-bold tracking-[1.5px] uppercase border"
                  style={{
                    color: f.dark ? "#C9903A" : "#6B5040",
                    borderColor: f.dark ? "rgba(201,144,58,0.3)" : "rgba(26,15,8,0.12)",
                  }}
                >
                  {f.meta}
                </span>
              </header>

              {/* Title + body */}
              <div className="mt-5 md:mt-8 relative">
                <h3
                  className="font-display text-[1.4rem] md:text-[1.75rem] font-bold leading-[1.05] tracking-[-0.02em] mb-2.5"
                  style={{ color: f.dark ? "#FDFCF8" : "#1A0F08" }}
                >
                  {f.title}
                </h3>
                <p
                  className="font-body text-[13.5px] leading-[1.6]"
                  style={{ color: f.dark ? "rgba(253,252,248,0.65)" : "#3D2B1A" }}
                >
                  {f.blurb}
                </p>
              </div>

              {/* Hover chevron */}
              <div className="mt-5 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="inline-flex items-center gap-1.5 font-body text-[10px] font-bold tracking-[1.5px] uppercase"
                  style={{ color: f.dark ? "#C9903A" : "#1A0F08" }}
                >
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
