"use client";

const ROOT_CAUSES = [
  {
    problem: "Moisture loss",
    mechanism: "Lifted cuticles let water escape faster than it enters",
    approach: "Proprietary ceramide-protein complex that fills cuticle gaps and seals from the inside out",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    problem: "Pigment overproduction",
    mechanism: "Melanin-rich skin triggers excess pigment after any inflammation",
    approach: "Multi-pathway pigment blockers that interrupt the cascade at three different stages",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    problem: "Scalp congestion",
    mechanism: "Tight coils trap sebum and dead cells, suffocating follicles",
    approach: "Targeted scalp actives that dissolve buildup without stripping natural oils",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const ACTIVES = [
  {
    name: "Aunty's Moisture Complex",
    what: "Barrier-rebuilding blend",
    why: "Locks hydration into high-porosity strands that lose moisture within hours of wash day",
  },
  {
    name: "Pigment Pathway Blockers",
    what: "Multi-acid brightening system",
    why: "Targets PIH at the trigger, transfer, and turnover stages — not just the surface",
  },
  {
    name: "Scalp Reset Actives",
    what: "Microbiome-balancing formula",
    why: "Clears follicle congestion from protective styles without disrupting your scalp's natural ecosystem",
  },
  {
    name: "Protein-Moisture Ratio System",
    what: "Adaptive conditioning technology",
    why: "Three formulation ratios matched to your porosity — because the balance matters more than the ingredient list",
  },
  {
    name: "Cuticle Penetration Blend",
    what: "Lightweight molecular carriers",
    why: "Gets actives inside low-porosity strands that repel everything — without heat or heavy butters",
  },
  {
    name: "Traction Recovery Complex",
    what: "Follicle-strengthening peptides",
    why: "Targets hairline damage from braids, cornrows, and extensions at the root",
  },
];

export default function IngredientCredibility() {
  return (
    <section className="py-20 bg-[#FDFCF8]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A] mb-4">
            The science
          </p>
          <h2 className="font-display text-[2rem] sm:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] mb-4">
            We formulate for root causes, not symptoms
          </h2>
          <p className="font-body text-[15px] text-[#6B5040] max-w-lg mx-auto leading-[1.7]">
            Most products mask the problem. Ours are built to address why your
            hair loses moisture, why your skin darkens after a breakout, and why
            your scalp won&apos;t cooperate.
          </p>
        </div>

        {/* Root cause cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {ROOT_CAUSES.map((c, i) => (
            <div
              key={i}
              className="bg-[#F7F5F0] rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#FDFCF8] flex items-center justify-center">
                {c.icon}
              </div>
              <p className="font-body text-[13px] font-semibold text-[#2D1B0E] uppercase tracking-[1px]">
                {c.problem}
              </p>
              <p className="font-body text-[13px] text-[#9E8C7A] leading-[1.6]">
                {c.mechanism}
              </p>
              <p className="font-body text-[14px] text-[#6B5040] leading-[1.6]">
                {c.approach}
              </p>
            </div>
          ))}
        </div>

        {/* Actives grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVES.map((a) => (
            <div
              key={a.name}
              className="border border-[rgba(26,15,8,0.06)] rounded-xl p-5 hover:border-[rgba(26,15,8,0.15)] transition-colors"
            >
              <p className="font-body text-[14px] font-semibold text-[#2D1B0E] mb-1">
                {a.name}
              </p>
              <p className="font-body text-[12px] text-[#9E8C7A] mb-2">
                {a.what}
              </p>
              <p className="font-body text-[13px] text-[#6B5040] leading-[1.6]">
                {a.why}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
