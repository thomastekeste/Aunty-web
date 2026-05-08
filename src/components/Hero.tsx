"use client";

import AuntyCharacterIcon from "./AuntyCharacterIcon";
import { aunties } from "@/data/aunties";

/* ─── Decorative card visuals (placeholder for product photography) ───────── */

function CoilPattern({ color = "#2D1B0E", opacity = 0.18 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 240"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity={opacity}>
        <path d="M30 30 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M30 60 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M30 90 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M30 120 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M30 150 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M30 180 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0" />
        <path d="M30 210 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0" />
      </g>
    </svg>
  );
}

function HairTypeCard() {
  return (
    <div
      className="absolute top-0 left-0 w-[220px] h-[280px] rounded-[28px] overflow-hidden float-a shadow-[0_20px_60px_-20px_rgba(45,27,14,0.35)]"
      style={{
        background: "linear-gradient(155deg, #F5ECD4 0%, #E8C87A 65%, #D4A04A 100%)",
      }}
    >
      <CoilPattern color="#7A5A2A" opacity={0.22} />
      <div className="relative h-full p-5 flex flex-col">
        <span className="font-body text-[9px] font-bold tracking-[2.5px] uppercase text-[#5C3F12]">
          Hair Type
        </span>
        <div className="flex-1 flex items-center justify-center">
          <span
            className="font-display font-bold text-[#2D1B0E] leading-none"
            style={{ fontSize: 110, letterSpacing: "-0.06em" }}
          >
            4C
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2D1B0E]/85 backdrop-blur-sm">
            <span className="w-1 h-1 rounded-full bg-[#E8C87A]" />
            <span className="font-body text-[9px] font-semibold tracking-[1.5px] uppercase text-[#FDFCF8]">
              High Porosity
            </span>
          </div>
          <span className="font-body text-[10px] text-[#5C3F12]/80 leading-snug">
            Tight coil pattern · Moisture-hungry
          </span>
        </div>
      </div>
    </div>
  );
}

function VerdictCard() {
  return (
    <div
      className="absolute top-[42%] right-0 w-[260px] h-[170px] rounded-[24px] overflow-hidden float-b shadow-[0_24px_60px_-15px_rgba(45,27,14,0.55)]"
      style={{
        background: "linear-gradient(140deg, #2D1B0E 0%, #1A0F08 100%)",
      }}
    >
      <div className="relative h-full p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#C9903A]/40 bg-[#FDFCF8]/5">
              <AuntyCharacterIcon auntyId="ngozi" size={32} />
            </div>
            <div>
              <span className="block font-body text-[9px] font-bold tracking-[2px] uppercase text-[#C9903A]">
                Ngozi says
              </span>
              <span className="block font-body text-[9px] text-[#9E8C7A]">
                The bold one
              </span>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9903A">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Verdict copy */}
        <p className="font-display text-[14px] text-[#FDFCF8] leading-[1.4] flex-1">
          &ldquo;Your moisture barrier&apos;s lifting. Ceramides first, butter second.&rdquo;
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#FDFCF8]/8">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9903A]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9903A]/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9903A]/25" />
          </div>
          <span className="font-body text-[9px] tracking-[1.5px] uppercase text-[#9E8C7A]">
            Verdict 1 of 7
          </span>
        </div>
      </div>
    </div>
  );
}

function RoutineCard() {
  const routine = [
    { name: "Strengthening Shampoo", aunty: "ngozi" },
    { name: "Deep Conditioner", aunty: "marcia" },
    { name: "Edge Repair Serum", aunty: "denise" },
  ];
  return (
    <div
      className="absolute bottom-0 left-[14%] w-[230px] h-[260px] rounded-[24px] overflow-hidden float-c shadow-[0_18px_55px_-18px_rgba(45,27,14,0.30)] border border-[rgba(26,15,8,0.06)]"
      style={{ background: "#FDFCF8" }}
    >
      <div className="relative h-full p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-body text-[9px] font-bold tracking-[2.5px] uppercase text-[#9E8C7A]">
            Your Routine
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C9903A]/10">
            <span className="w-1 h-1 rounded-full bg-[#C9903A]" />
            <span className="font-body text-[8px] font-bold tracking-[1px] uppercase text-[#A0701E]">
              Live
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {routine.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F7F5F0]"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                <AuntyCharacterIcon auntyId={p.aunty} size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-[11px] font-bold text-[#2D1B0E] truncate">
                  {p.name}
                </p>
                <p className="font-body text-[9px] text-[#9E8C7A] truncate">
                  Step {i + 1}
                </p>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A6B3A" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-[15px] font-bold text-[#2D1B0E]">
            $74
            <span className="font-body text-[10px] font-normal text-[#9E8C7A] ml-1">/ month</span>
          </span>
          <span className="font-body text-[9px] tracking-[1.5px] uppercase text-[#1A6B3A] font-bold">
            Save 15%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="relative min-h-[88svh] bg-mesh-warm pt-[88px] pb-16 overflow-hidden">
      {/* Background grain dot */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#1A0F08 0.8px, transparent 0.8px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">

        {/* ─── Left: text ─── */}
        <div className="flex flex-col gap-7 max-w-2xl">

          {/* Eyebrow with live indicator */}
          <div
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#FDFCF8]/70 backdrop-blur-md border border-[rgba(26,15,8,0.08)]"
            style={{ opacity: 0, animation: "introFade 500ms ease-out forwards", animationDelay: "100ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A6B3A] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1A6B3A]" />
            </span>
            <span className="font-body text-[10px] font-bold tracking-[2px] uppercase text-[#3D2B1A]">
              7 aunties available now
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-[#1A0F08] leading-[0.96] tracking-[-0.035em] text-[clamp(2.6rem,7.2vw,5.4rem)]"
            style={{ opacity: 0, animation: "introFade 700ms ease-out forwards", animationDelay: "200ms" }}
          >
            Hair &amp; skin care
            <br />
            <span className="italic font-light text-[#6B5040]">that finally</span>
            <br />
            knows your <span className="text-shimmer">texture</span>.
          </h1>

          {/* Sub */}
          <p
            className="font-body text-[16px] md:text-[17px] text-[#3D2B1A] max-w-lg leading-[1.7]"
            style={{ opacity: 0, animation: "introFade 700ms ease-out forwards", animationDelay: "400ms" }}
          >
            Seven aunties from across the diaspora. One AI-powered consultation that
            actually understands 4C coils, melanin-rich skin, and what makes them thrive.
          </p>

          {/* CTA cluster */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
            style={{ opacity: 0, animation: "introFade 600ms ease-out forwards", animationDelay: "600ms" }}
          >
            <a
              href="#quiz"
              className="group cta-magnetic inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1.5px] uppercase hover:bg-[#0F0905] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.55)]"
            >
              Get your formula
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/aunties"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-body font-semibold text-[13px] tracking-[1px] uppercase text-[#3D2B1A] hover:text-[#1A0F08] hover:bg-[rgba(26,15,8,0.04)] transition-all"
            >
              Meet the aunties
            </a>
          </div>

          {/* Aunty strip + trust */}
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-4 pt-4 border-t border-[rgba(26,15,8,0.08)]"
            style={{ opacity: 0, animation: "introFade 600ms ease-out forwards", animationDelay: "800ms" }}
          >
            <div className="flex -space-x-1.5">
              {aunties.slice(0, 5).map((a) => (
                <div
                  key={a.id}
                  className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#FDFCF8]"
                  title={`${a.name} · ${a.title}`}
                >
                  <AuntyCharacterIcon auntyId={a.id} size={36} />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full ring-2 ring-[#FDFCF8] bg-[#1A0F08] flex items-center justify-center">
                <span className="font-body text-[10px] font-bold text-[#C9903A]">+2</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#C9903A">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="font-body text-[12px] font-semibold text-[#1A0F08]">
                  4.9
                </span>
              </div>
              <span className="font-body text-[11px] text-[#6B5040]">
                12,000+ texture-matched routines
              </span>
            </div>
          </div>
        </div>

        {/* ─── Right: stacked card visual ─── */}
        <div
          className="relative h-[520px] hidden lg:block"
          style={{ opacity: 0, animation: "introFade 800ms ease-out forwards", animationDelay: "500ms" }}
        >
          <div className="relative w-full h-full max-w-[480px] ml-auto">
            <HairTypeCard />
            <RoutineCard />
            <VerdictCard />

            {/* Decorative dot grid backdrop */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full -z-10 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(#C9903A 1.2px, transparent 1.2px)",
                backgroundSize: "12px 12px",
              }}
              aria-hidden
            />
          </div>
        </div>

        {/* Mobile: simplified card visual */}
        <div className="relative h-[360px] lg:hidden">
          <div className="relative w-full h-full max-w-[320px] mx-auto">
            <div className="scale-[0.65] origin-top-left absolute -top-2 -left-2">
              <HairTypeCard />
            </div>
            <div className="scale-[0.65] origin-top-right absolute top-32 -right-2">
              <VerdictCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
