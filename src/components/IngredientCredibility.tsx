"use client";

import ScrollReveal from "./ScrollReveal";

const ROOT_CAUSES = [
  {
    problem: "Moisture loss",
    mechanism: "Lifted cuticles let water escape faster than it enters",
    approach: "Proprietary ceramide-protein complex that fills cuticle gaps and seals from the inside out",
    color: "#3D6B8B",
    bg: "#E8EFF5",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    problem: "Pigment overproduction",
    mechanism: "Melanin-rich skin triggers excess pigment after any inflammation",
    approach: "Multi-pathway pigment blockers that interrupt the cascade at three different stages",
    color: "#8B4A3A",
    bg: "#F7EDE9",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    problem: "Scalp congestion",
    mechanism: "Tight coils trap sebum and dead cells, suffocating follicles",
    approach: "Targeted scalp actives that dissolve buildup without stripping natural oils",
    color: "#3F6B52",
    bg: "#E4EDE8",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const ACTIVES = [
  { code: "01", name: "Aunty's Moisture Complex",          what: "Barrier-rebuilding blend",            why: "Locks hydration into high-porosity strands that lose moisture within hours of wash day" },
  { code: "02", name: "Pigment Pathway Blockers",          what: "Multi-acid brightening system",       why: "Targets PIH at the trigger, transfer, and turnover stages — not just the surface" },
  { code: "03", name: "Scalp Reset Actives",               what: "Microbiome-balancing formula",        why: "Clears follicle congestion from protective styles without disrupting your scalp's ecosystem" },
  { code: "04", name: "Protein-Moisture Ratio System",     what: "Adaptive conditioning technology",    why: "Three formulation ratios matched to your porosity — because the balance matters more than the ingredient list" },
  { code: "05", name: "Cuticle Penetration Blend",         what: "Lightweight molecular carriers",      why: "Gets actives inside low-porosity strands that repel everything — without heat or heavy butters" },
  { code: "06", name: "Traction Recovery Complex",         what: "Follicle-strengthening peptides",     why: "Targets hairline damage from braids, cornrows, and extensions at the root" },
];

export default function IngredientCredibility() {
  return (
    <section id="science" className="relative py-24 md:py-32 bg-[#FDFCF8] overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1A0F08 0.7px, transparent 0.7px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-10">

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-16 md:mb-20">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              The science
            </p>
            <h1 className="font-display text-[2.4rem] md:text-[4rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-6">
              We formulate for
              <br />
              <span className="italic font-light text-[#6B5040]">root causes,</span>
              <br />
              not symptoms.
            </h1>
            <p className="font-body text-[15px] md:text-base text-[#3D2B1A] leading-[1.7] max-w-xl">
              Most products mask the problem. Ours are built to address why your hair loses
              moisture, why your skin darkens after a breakout, and why your scalp won&apos;t
              cooperate.
            </p>
          </div>
        </ScrollReveal>

        {/* Root cause cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-20 md:mb-28">
          {ROOT_CAUSES.map((c, i) => (
            <ScrollReveal key={c.problem} delay={i * 100}>
              <article
                className="group relative h-full rounded-3xl p-7 md:p-8 flex flex-col gap-5 transition-transform duration-500 hover:-translate-y-1"
                style={{ background: c.bg }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "#FDFCF8", color: c.color }}
                  >
                    {c.icon}
                  </div>
                  <span
                    className="font-display text-[2rem] font-bold leading-none opacity-25"
                    style={{ color: c.color }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <div>
                  <p
                    className="font-body text-[10px] font-bold tracking-[2px] uppercase mb-2"
                    style={{ color: c.color }}
                  >
                    The Problem
                  </p>
                  <h3 className="font-display text-[1.3rem] md:text-[1.5rem] font-bold text-[#1A0F08] leading-tight tracking-[-0.02em]">
                    {c.problem}
                  </h3>
                </div>

                <div className="border-t border-[#1A0F08]/8 pt-4">
                  <p className="font-body text-[10px] font-bold tracking-[2px] uppercase text-[#6B5040] mb-1.5">
                    Why it happens
                  </p>
                  <p className="font-body text-[13px] text-[#3D2B1A] leading-[1.6]">
                    {c.mechanism}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-[#1A0F08]/8">
                  <p
                    className="font-body text-[10px] font-bold tracking-[2px] uppercase mb-1.5"
                    style={{ color: c.color }}
                  >
                    Our approach
                  </p>
                  <p className="font-body text-[13px] text-[#1A0F08] leading-[1.6] font-medium">
                    {c.approach}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Actives section */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-end justify-between mb-2">
              <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A]">
                Six proprietary complexes
              </p>
            </div>
            <h2 className="font-display text-[1.8rem] md:text-[2.6rem] font-bold text-[#1A0F08] leading-[1.1] tracking-[-0.02em]">
              The actives doing the work.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {ACTIVES.map((a, i) => (
            <ScrollReveal key={a.code} delay={i * 60}>
              <article className="group relative h-full bg-[#FDFCF8] border border-[rgba(26,15,8,0.08)] rounded-2xl p-6 hover:border-[#C9903A] hover:shadow-[0_18px_40px_-16px_rgba(201,144,58,0.25)] transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-display text-[10px] font-bold tracking-[2px] uppercase text-[#C9903A]">
                    Active · {a.code}
                  </span>
                  <span className="w-5 h-5 rounded-full border border-[#C9903A]/30 group-hover:bg-[#C9903A] group-hover:border-[#C9903A] flex items-center justify-center transition-all">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="3" className="group-hover:stroke-[#FDFCF8] transition-colors">
                      <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                <h3 className="font-display text-[16px] md:text-[17px] font-bold text-[#1A0F08] leading-snug tracking-[-0.01em] mb-2">
                  {a.name}
                </h3>
                <p className="font-body text-[11px] font-medium tracking-[0.5px] uppercase text-[#6B5040] mb-3">
                  {a.what}
                </p>
                <p className="font-body text-[13px] text-[#3D2B1A] leading-[1.65]">
                  {a.why}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom honesty card */}
        <ScrollReveal delay={200}>
          <div className="mt-16 md:mt-20 relative rounded-3xl overflow-hidden bg-[#1A0F08] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div
              className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 70%)" }}
            />
            <div className="relative max-w-xl">
              <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-[#C9903A] mb-3">
                Real talk
              </p>
              <p className="font-display text-[1.2rem] md:text-[1.5rem] text-[#FDFCF8] leading-[1.4] tracking-[-0.01em]">
                We don&apos;t list every ingredient because we don&apos;t want it copied. But every formula
                is sulfate-free, paraben-free, silicone-free, and tested on melanin-rich skin for irritants we
                know cause PIH.
              </p>
            </div>
            <a
              href="/#quiz"
              className="cta-magnetic group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C9903A] text-[#1A0F08] font-body font-bold text-[12px] tracking-[1.5px] uppercase hover:bg-[#E8C87A] flex-shrink-0 self-start md:self-auto"
            >
              Build my routine
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
