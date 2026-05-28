import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const ICONS = {
  bonnet: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C7.03 3 3 7.03 3 12c0 2.76 1.24 5.23 3.19 6.88" />
      <path d="M20.81 18.88C22.76 17.23 24 14.76 24 12c0-4.97-4.03-9-9-9" />
      <path d="M3 16c0 2 1.5 4 4 5h10c2.5-1 4-3 4-5" />
    </svg>
  ),
  pillowcase: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M6 6v12" />
    </svg>
  ),
  durag: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10c0-3.31 3.58-6 8-6s8 2.69 8 6" />
      <path d="M4 10c0 2 1 3.5 3 4.5l5 3 5-3c2-1 3-2.5 3-4.5" />
      <path d="M12 17.5V22" />
    </svg>
  ),
  detangle: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6M8 4v4M16 4v4M4 10h16" />
      <rect x="4" y="10" width="16" height="4" rx="1" />
      <path d="M6 14v7M10 14v7M14 14v7M18 14v7" />
    </svg>
  ),
  led: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 3 1.5 5.5 4 7v3h8v-3c2.5-1.5 4-4 4-7a8 8 0 0 0-8-8z" />
      <path d="M8 20h8" />
      <path d="M9 22h6" />
    </svg>
  ),
  guasha: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-3 0-6 2-7 5s-1 7 1 9c2 2.5 5 4 6 4s4-1.5 6-4c2-2 2-6 1-9s-4-5-7-5z" />
    </svg>
  ),
};

const FEATURED = [
  { name: "Satin Bonnet", type: "Sleep", cat: "sleep", icon: ICONS.bonnet },
  { name: "Silk Pillowcase", type: "Sleep", cat: "sleep", icon: ICONS.pillowcase },
  { name: "Silky Durag", type: "Protection", cat: "sleep", icon: ICONS.durag },
  { name: "Detangling Set", type: "Tools", cat: "tools", icon: ICONS.detangle },
  { name: "LED Therapy Mask", type: "Devices", cat: "devices", icon: ICONS.led },
  { name: "Gua Sha Stone", type: "Devices", cat: "devices", icon: ICONS.guasha },
];

export default function ProductFeature() {
  return (
    <section className="bg-[#1A0F08] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
                The essentials
              </p>
              <h2 className="font-display text-[1.75rem] md:text-[2.4rem] font-bold text-[#FDFCF8] leading-[1.05] tracking-[-0.025em]">
                Your routine needs tools.
                <br />
                <span className="italic font-light text-[#9E8C7A]">Curated by your aunty.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#FDFCF8]/20 text-[#FDFCF8] font-body font-semibold text-[12px] tracking-[1.5px] uppercase hover:bg-[#FDFCF8]/8 transition-colors self-start md:self-auto flex-shrink-0"
            >
              Shop all accessories
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {FEATURED.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 60}>
              <Link
                href={`/products?cat=${p.cat}`}
                className="group block rounded-2xl bg-[#FDFCF8]/[0.04] border border-[#FDFCF8]/8 overflow-hidden hover:bg-[#FDFCF8]/[0.07] hover:border-[#C9903A]/30 transition-all duration-300"
              >
                <div className="relative aspect-square bg-[#FDFCF8]/[0.03] flex items-center justify-center text-[#C9903A] group-hover:scale-110 transition-transform duration-500">
                  {p.icon}
                </div>
                <div className="px-3.5 py-3">
                  <p className="font-body text-[12px] font-semibold text-[#FDFCF8] leading-snug mb-1">
                    {p.name}
                  </p>
                  <span className="font-body text-[10px] font-bold tracking-[1.5px] uppercase text-[#C9903A]/70">
                    {p.type}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
