"use client";

import { useEffect, useRef, useState } from "react";

type Cell = "yes" | "no" | "partial";

interface Row {
  label: string;
  drugstore: Cell;
  aunty: Cell;
  derm: Cell;
}

const ROWS: Row[] = [
  { label: "Knows your hair texture",       drugstore: "no",      aunty: "yes", derm: "partial" },
  { label: "Built for melanin-rich skin",   drugstore: "no",      aunty: "yes", derm: "partial" },
  { label: "Personalized to your porosity", drugstore: "no",      aunty: "yes", derm: "no" },
  { label: "Cultural context, no judgment", drugstore: "no",      aunty: "yes", derm: "no" },
  { label: "Under $35 / product",           drugstore: "yes",     aunty: "yes", derm: "no" },
  { label: "Routine ready in 2 minutes",    drugstore: "partial", aunty: "yes", derm: "no" },
  { label: "Adjusts as your hair changes",  drugstore: "no",      aunty: "yes", derm: "partial" },
];

function CellMark({ value }: { value: Cell }) {
  if (value === "yes") {
    return (
      <span className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-[#1A6B3A]/15 ring-1 ring-[#1A6B3A]/30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A6B3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-[#FDFCF8]/8 ring-1 ring-[#FDFCF8]/15">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9E8C7A" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-[#C9903A]/15 ring-1 ring-[#C9903A]/30">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2.5" strokeLinecap="round">
        <path d="M5 12h14" />
      </svg>
    </span>
  );
}

export default function WhyAunty() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#1A0F08]">
      {/* Backdrop pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#FDFCF8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
            The honest comparison
          </p>
          <h2 className="font-display text-[2.2rem] md:text-[3.4rem] font-bold text-[#FDFCF8] leading-[1.05] tracking-[-0.025em]">
            We&apos;re not the only option.
            <br />
            <span className="text-[#9E8C7A]">We&apos;re just the </span>
            <span className="text-shimmer">honest</span>
            <span className="text-[#9E8C7A]"> one.</span>
          </h2>
          <p className="font-body text-[15px] md:text-base text-[#9E8C7A] leading-[1.7] mt-6 max-w-xl">
            Drugstore aisles weren&apos;t built for textured hair. Dermatologist visits
            cost $300 and don&apos;t cover what mama already knows. Here&apos;s where
            we land.
          </p>
        </div>

        {/* Comparison table */}
        <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] md:grid-cols-[1.6fr_repeat(3,1fr)] gap-x-2 md:gap-x-4 items-stretch">

          {/* Header row */}
          <div className="hidden md:block" />
          <div className="flex flex-col items-center justify-end pb-5 px-2">
            <span className="font-body text-[10px] md:text-[11px] font-bold tracking-[1.5px] md:tracking-[2px] uppercase text-[#9E8C7A] text-center">
              Drugstore
            </span>
            <span className="font-body text-[10px] text-[#9E8C7A]/60 mt-1 text-center hidden md:block">
              Random pick
            </span>
          </div>
          <div className="relative flex flex-col items-center justify-end pb-5 px-2 rounded-t-3xl bg-gradient-to-b from-[#C9903A]/12 to-transparent">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C9903A] text-[#1A0F08] font-body text-[9px] font-bold tracking-[1.5px] uppercase whitespace-nowrap">
              ★ Best fit
            </span>
            <span className="font-body text-[10px] md:text-[11px] font-bold tracking-[1.5px] md:tracking-[2px] uppercase text-[#FDFCF8] text-center">
              Aunty Council
            </span>
            <span className="font-body text-[10px] text-[#C9903A]/80 mt-1 text-center hidden md:block">
              The whole council
            </span>
          </div>
          <div className="flex flex-col items-center justify-end pb-5 px-2">
            <span className="font-body text-[10px] md:text-[11px] font-bold tracking-[1.5px] md:tracking-[2px] uppercase text-[#9E8C7A] text-center">
              Dermatologist
            </span>
            <span className="font-body text-[10px] text-[#9E8C7A]/60 mt-1 text-center hidden md:block">
              $300 visit
            </span>
          </div>

          {/* Mobile feature label header */}
          <div className="md:hidden col-span-4 mb-3 pb-3 border-b border-[#FDFCF8]/10">
            <span className="font-body text-[10px] font-bold tracking-[2px] uppercase text-[#C9903A]">
              Compare
            </span>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className="contents"
              style={visible ? { animationDelay: `${i * 70}ms` } : undefined}
            >
              <div
                className="flex items-center py-4 md:py-5 border-t border-[#FDFCF8]/8 row-reveal"
                style={{ animationDelay: `${i * 70}ms`, animationPlayState: visible ? "running" : "paused" }}
              >
                <span className="font-body text-[13px] md:text-[15px] text-[#FDFCF8] leading-snug">
                  {row.label}
                </span>
              </div>
              <div
                className="flex items-center justify-center py-4 md:py-5 border-t border-[#FDFCF8]/8 row-reveal"
                style={{ animationDelay: `${i * 70 + 80}ms`, animationPlayState: visible ? "running" : "paused" }}
              >
                <CellMark value={row.drugstore} />
              </div>
              <div
                className="flex items-center justify-center py-4 md:py-5 border-t border-[#C9903A]/15 bg-gradient-to-b from-[#C9903A]/[0.04] to-[#C9903A]/[0.06] row-reveal"
                style={{ animationDelay: `${i * 70 + 160}ms`, animationPlayState: visible ? "running" : "paused" }}
              >
                <CellMark value={row.aunty} />
              </div>
              <div
                className="flex items-center justify-center py-4 md:py-5 border-t border-[#FDFCF8]/8 row-reveal"
                style={{ animationDelay: `${i * 70 + 240}ms`, animationPlayState: visible ? "running" : "paused" }}
              >
                <CellMark value={row.derm} />
              </div>
            </div>
          ))}

          {/* Footer / CTA row */}
          <div className="border-t border-[#FDFCF8]/15" />
          <div className="border-t border-[#FDFCF8]/15" />
          <div className="border-t border-[#C9903A]/30 bg-gradient-to-b from-[#C9903A]/[0.06] to-[#C9903A]/[0.02] rounded-b-3xl pt-6 pb-7 flex flex-col items-center gap-3">
            <span className="font-display text-[18px] md:text-[20px] font-bold text-[#FDFCF8]">$0</span>
            <a
              href="#quiz"
              className="px-5 py-2.5 rounded-full bg-[#C9903A] text-[#1A0F08] font-body text-[10px] md:text-[11px] font-bold tracking-[1.5px] uppercase hover:bg-[#E8C87A] transition-colors text-center whitespace-nowrap"
            >
              Start free
            </a>
          </div>
          <div className="border-t border-[#FDFCF8]/15" />
        </div>

      </div>
    </section>
  );
}
