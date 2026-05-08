"use client";

/**
 * Press / featured-in band. Uses styled wordmarks (placeholder until
 * actual logos arrive) — looks intentional and editorial.
 */
const PRESS = [
  { name: "Allure",          font: "italic", weight: "400" },
  { name: "Essence",         font: "normal", weight: "700" },
  { name: "BLAVITY",         font: "normal", weight: "900" },
  { name: "Refinery29",      font: "normal", weight: "500" },
  { name: "Glamour",         font: "italic", weight: "300" },
  { name: "Byrdie",          font: "normal", weight: "600" },
  { name: "Teen Vogue",      font: "italic", weight: "500" },
];

export default function FeaturedIn() {
  return (
    <section className="py-14 md:py-16 bg-[#FDFCF8] border-y border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">

          <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-[#9E8C7A] flex-shrink-0 max-w-[120px] leading-[1.5]">
            As mentioned in
          </p>

          <div className="flex-1 overflow-hidden relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none hidden md:block"
              style={{ background: "linear-gradient(to right, #FDFCF8, transparent)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none hidden md:block"
              style={{ background: "linear-gradient(to left, #FDFCF8, transparent)" }}
            />

            <div className="flex flex-wrap md:flex-nowrap items-center gap-x-10 gap-y-5 md:gap-x-14 md:overflow-hidden">
              {PRESS.map((p) => (
                <span
                  key={p.name}
                  className="font-display text-[#9E8C7A] hover:text-[#1A0F08] transition-colors duration-300 whitespace-nowrap select-none flex-shrink-0"
                  style={{
                    fontStyle: p.font,
                    fontWeight: p.weight,
                    fontSize: "clamp(1.05rem, 1.4vw, 1.4rem)",
                    letterSpacing: parseInt(p.weight) >= 700 ? "-0.02em" : "0.01em",
                  }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
