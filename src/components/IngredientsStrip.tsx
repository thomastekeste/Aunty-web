import ScrollReveal from "./ScrollReveal";

const STATS = [
  { num: "47", label: "Bioactive compounds" },
  { num: "0", label: "Sulfates" },
  { num: "0", label: "Parabens" },
  { num: "0", label: "Silicones" },
];

const ACTIVES = [
  "Panthenol (Vit B5)",
  "Ceramide complex",
  "Biotin",
  "Niacinamide",
  "Hydrolysed keratin",
  "Jamaican black castor oil",
  "Shea butter",
  "Aloe barbadensis",
  "Hibiscus extract",
  "Rice water ferment",
];

/**
 * Science-forward formula breakdown — not a natural-brand ingredient flat-lay.
 * Stats + active ingredients with clinical and cultural compounds together.
 */
export default function IngredientsStrip() {
  return (
    <section className="relative py-20 md:py-28 bg-[#1A0F08] overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FDFCF8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[500px] opacity-[0.1] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 60%)" }}
        aria-hidden
      />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10">

        <ScrollReveal>
          <div className="max-w-3xl mb-14 md:mb-18">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              The science
            </p>
            <h2 className="font-display text-[2rem] md:text-[3.2rem] font-bold text-[#FDFCF8] leading-[1.05] tracking-[-0.025em] mb-6">
              Formulated.{" "}
              <span className="italic font-light text-[#9E8C7A]">Not just foraged.</span>
            </h2>
            <p className="font-body text-[15px] md:text-[16px] text-[#9E8C7A] leading-[1.75] max-w-xl">
              Every formula starts with dermatological research — then layers in the actives that
              textured hair and melanin-rich skin have needed for generations. Not because
              they&apos;re &ldquo;natural.&rdquo; Because the data backs them.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 md:mb-16">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="px-6 py-7 rounded-2xl border border-[#FDFCF8]/8 bg-[#FDFCF8]/[0.03]"
              >
                <p className="font-display text-[2.8rem] md:text-[3.2rem] font-bold text-[#C9903A] leading-none mb-2">
                  {s.num}
                </p>
                <p className="font-body text-[11px] md:text-[12px] text-[#9E8C7A] uppercase tracking-[1px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Active ingredient chips */}
        <ScrollReveal delay={200}>
          <div>
            <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-[#FDFCF8]/35 mb-4">
              Key actives
            </p>
            <div className="flex flex-wrap gap-2.5">
              {ACTIVES.map((a) => (
                <span
                  key={a}
                  className="px-4 py-2 rounded-full border border-[#FDFCF8]/10 font-body text-[13px] text-[#FDFCF8]/65 bg-[#FDFCF8]/[0.04] hover:border-[#C9903A]/40 hover:text-[#FDFCF8] transition-all"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
