"use client";

import ScrollReveal from "./ScrollReveal";

const PERKS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "First batch access",
    desc: "Early members get their formulas in the first production run — before general sale opens.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Founding member pricing",
    desc: "Lock in pre-launch prices. They won't be offered again once we ship the first batch.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Direct access to the aunties",
    desc: "Founding members get a private channel to give feedback that shapes the next formula.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "60-day satisfaction promise",
    desc: "If the routine doesn't work for your hair, the aunties rework it free. Still not happy? Full refund.",
  },
];

const TEXTURE_COUNTS = [
  { texture: "4C", count: "3,812" },
  { texture: "4B", count: "2,941" },
  { texture: "4A", count: "1,703" },
  { texture: "3C", count: "1,547" },
];

export default function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F5F0]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-16">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              Early access
            </p>
            <h2 className="font-display text-[1.75rem] md:text-[2.4rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-4">
              12,000 people already
              <br />
              <span className="italic font-light text-[#6B5040]">know their formula.</span>
            </h2>
            <p className="font-body text-[15px] text-[#3D2B1A]/65 max-w-md mx-auto leading-[1.7]">
              They took the free consultation. Their routine is waiting. First products ship when their batch hits minimum order.
            </p>
          </div>
        </ScrollReveal>

        {/* Texture breakdown */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-14">
            {TEXTURE_COUNTS.map((t) => (
              <div
                key={t.texture}
                className="flex flex-col items-center gap-1.5 py-5 px-3 rounded-2xl bg-[#FDFCF8] border border-[rgba(26,15,8,0.06)]"
              >
                <span className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-[#1A0F08] leading-none tracking-[-0.03em]">
                  {t.count}
                </span>
                <span className="font-body text-[11px] md:text-[13px] font-semibold text-[#6B5040] tracking-[1px]">
                  {t.texture}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Perks grid */}
        <ScrollReveal delay={150}>
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {PERKS.map((p, i) => (
              <div
                key={p.title}
                className="flex gap-4 items-start p-6 rounded-2xl bg-[#FDFCF8] border border-[rgba(26,15,8,0.06)]"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#C9903A]/10 flex items-center justify-center mt-0.5">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-[15px] text-[#1A0F08] mb-1 leading-snug">
                    {p.title}
                  </h3>
                  <p className="font-body text-[14px] text-[#6B5040] leading-[1.65]">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={250}>
          <div className="mt-12 text-center">
            <a
              href="#quiz"
              className="inline-flex items-center gap-2.5 font-body text-[12px] font-bold tracking-[2px] uppercase px-8 py-4 rounded-full bg-[#1A0F08] text-[#FDFCF8] hover:bg-[#2C1A0E] transition-colors"
            >
              Get your formula free
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <p className="font-body text-[12px] text-[#6B5040] mt-3">
              Free consultation · No account needed · 2 minutes
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
