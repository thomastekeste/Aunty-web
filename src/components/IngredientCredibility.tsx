"use client";

const CLAIMS = [
  {
    stat: "92%",
    desc: "saw improved moisture retention after 4 weeks",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    stat: "87%",
    desc: "reported less breakage within the first month",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    stat: "100%",
    desc: "of products free from sulfates, parabens & mineral oils",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const INGREDIENTS = [
  { name: "Shea Butter", origin: "West Africa", benefit: "Deep moisture & sealing" },
  { name: "Jamaican Black Castor Oil", origin: "Caribbean", benefit: "Scalp health & growth" },
  { name: "Argan Oil", origin: "North Africa", benefit: "Shine without weight" },
  { name: "Fenugreek Protein", origin: "East Africa", benefit: "Strengthens fragile strands" },
  { name: "Mango Butter", origin: "South Asia", benefit: "Softens tight curl patterns" },
  { name: "Aloe Vera", origin: "Global", benefit: "Hydration & scalp soothing" },
];

export default function IngredientCredibility() {
  return (
    <section className="py-20 bg-[#FDFCF8]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A] mb-4">
            Our ingredients
          </p>
          <h2 className="font-display text-[2rem] sm:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] mb-4">
            Rooted in tradition. Backed by results.
          </h2>
          <p className="font-body text-[15px] text-[#6B5040] max-w-lg mx-auto leading-[1.7]">
            Every ingredient is sourced from the same traditions our aunties grew up
            with — then validated with modern testing.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {CLAIMS.map((c, i) => (
            <div
              key={i}
              className="bg-[#F7F5F0] rounded-2xl p-6 flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#FDFCF8] flex items-center justify-center">
                {c.icon}
              </div>
              <span className="font-display text-[2.25rem] font-bold text-[#2D1B0E] tracking-[-0.02em]">
                {c.stat}
              </span>
              <p className="font-body text-[14px] text-[#6B5040] leading-[1.6]">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Ingredient grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.name}
              className="border border-[rgba(26,15,8,0.06)] rounded-xl p-5 hover:border-[rgba(26,15,8,0.15)] transition-colors"
            >
              <p className="font-body text-[14px] font-semibold text-[#2D1B0E] mb-1">
                {ing.name}
              </p>
              <p className="font-body text-[12px] text-[#9E8C7A] mb-2">
                {ing.origin}
              </p>
              <p className="font-body text-[13px] text-[#6B5040] leading-[1.5]">
                {ing.benefit}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-[rgba(26,15,8,0.06)]">
          {["Cruelty free", "Dermatologist reviewed", "No sulfates", "No parabens", "Vegan friendly"].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 font-body text-[12px] font-semibold tracking-[0.5px] uppercase text-[#9E8C7A]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
