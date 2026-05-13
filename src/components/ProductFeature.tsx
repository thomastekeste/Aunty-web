import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const FEATURED = [
  { src: "/products/rich-curl-creme.png", name: "Rich Curl Crème", type: "Styler", cat: "hair" },
  { src: "/products/clarifying-shampoo.png", name: "Clarifying Shampoo", type: "Cleanser", cat: "hair" },
  { src: "/products/deep-conditioner.png", name: "Deep Conditioner", type: "Treatment", cat: "hair" },
  { src: "/products/scalp-oil.png", name: "Scalp Oil", type: "Treatment", cat: "hair" },
  { src: "/products/pih-cream.png", name: "PIH Cream", type: "Skin", cat: "skin" },
  { src: "/products/sebum-control-serum.png", name: "Sebum Control Serum", type: "Skin", cat: "skin" },
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
                The collection
              </p>
              <h2 className="font-display text-[1.75rem] md:text-[2.4rem] font-bold text-[#FDFCF8] leading-[1.05] tracking-[-0.025em]">
                Made for your texture.
                <br />
                <span className="italic font-light text-[#9E8C7A]">Backed by science.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#FDFCF8]/20 text-[#FDFCF8] font-body font-semibold text-[12px] tracking-[1.5px] uppercase hover:bg-[#FDFCF8]/8 transition-colors self-start md:self-auto flex-shrink-0"
            >
              Shop all products
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {FEATURED.map((p, i) => (
            <ScrollReveal key={p.src} delay={i * 60}>
              <Link
                href={`/products?cat=${p.cat}`}
                className="group block rounded-2xl bg-[#FDFCF8]/[0.04] border border-[#FDFCF8]/8 overflow-hidden hover:bg-[#FDFCF8]/[0.07] hover:border-[#C9903A]/30 transition-all duration-300"
              >
                <div className="relative aspect-square bg-[#FDFCF8]/[0.03]">
                  <Image
                    src={p.src}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    alt={p.name}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
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
