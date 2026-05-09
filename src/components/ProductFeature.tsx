import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

/**
 * Full-bleed product editorial — gives products-group.png a proper home
 * without competing with hero copy.
 */
export default function ProductFeature() {
  return (
    <section className="bg-[#1A0F08]">
      <ScrollReveal>
        <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden">
          <Image
            src="/products-group.png"
            fill
            className="object-cover object-center"
            alt="Aunty Council premium haircare and skincare collection"
            sizes="100vw"
          />
          {/* Light gradient only at bottom for CTA legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F08]/55 via-transparent to-transparent" />

          {/* Shop CTA — bottom right */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
            <a
              href="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#FDFCF8] text-[#1A0F08] font-body font-semibold text-[12px] tracking-[1.5px] uppercase hover:bg-[#F0EDE8] transition-colors"
            >
              Shop the collection
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
