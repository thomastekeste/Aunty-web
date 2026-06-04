import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const FEATURED = [
  { name: "Satin Bonnet", type: "Sleep", cat: "sleep", image: "/products/satin-bonnet.webp" },
  { name: "Silk Pillowcase", type: "Sleep", cat: "sleep", image: "/products/silk-pillowcase.webp" },
  { name: "Silky Durag", type: "Protection", cat: "sleep", image: "/products/silky-durag.webp" },
  { name: "Detangling Set", type: "Tools", cat: "tools", image: "/products/detangling-brush-set.webp" },
  { name: "LED Therapy Mask", type: "Devices", cat: "devices", image: "/products/led-therapy-mask.webp" },
  { name: "Gua Sha Stone", type: "Devices", cat: "devices", image: "/products/gua-sha-tool.webp" },
];

export default function ProductFeature() {
  return (
    <section className="bg-[#F3E9DD] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
                The essentials
              </p>
              <h2 className="font-display text-[1.75rem] md:text-[2.4rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em]">
                Your routine needs tools.
                <br />
                <span className="italic font-light text-[#8A7560]">Curated by your aunty.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#1A0F08]/20 text-[#1A0F08] font-body font-semibold text-[12px] tracking-[1.5px] uppercase hover:bg-[#1A0F08]/5 transition-colors self-start md:self-auto flex-shrink-0"
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
                className="group block rounded-2xl bg-white border border-[#1A0F08]/[0.06] overflow-hidden hover:border-[#C9903A]/40 hover:shadow-[0_8px_30px_-12px_rgba(26,15,8,0.25)] transition-all duration-300"
              >
                <div className="relative aspect-square bg-[#FBF8F2] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-3.5 py-3">
                  <p className="font-body text-[12px] font-semibold text-[#1A0F08] leading-snug mb-1">
                    {p.name}
                  </p>
                  <span className="font-body text-[10px] font-bold tracking-[1.5px] uppercase text-[#C9903A]">
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
