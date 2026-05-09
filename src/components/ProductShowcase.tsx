import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

/**
 * Prose-style product showcase — hero product photo paired with copy.
 * Uses the product group shot (amber bottles on wood).
 */
export default function ProductShowcase() {
  return (
    <section className="py-28 md:py-36 bg-[#F7F5F0]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Product photo */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(26,15,8,0.12)]">
              <Image
                src="/products-group.png"
                fill
                className="object-cover"
                alt="Aunty Council product collection — amber bottles and jars on wooden surface"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Copy */}
          <ScrollReveal delay={150}>
            <div>
              <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
                The collection
              </p>
              <h2 className="font-display text-[2rem] md:text-[2.8rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-6">
                Your routine,{" "}
                <span className="italic font-light text-[#6B5040]">
                  bottled.
                </span>
              </h2>
              <p className="font-body text-[15px] text-[#3D2B1A] leading-[1.7] mb-8 max-w-md">
                Sulfate-free. Paraben-free. Silicone-free. Every formula starts with
                your quiz results and ends with ingredients that actually work on
                textured hair — not a generic base relabeled for a new audience.
              </p>
              <a
                href="/products"
                className="group inline-flex items-center gap-2 font-body text-[12px] font-bold tracking-[2px] uppercase text-[#1A0F08] border-b-2 border-[#1A0F08]/20 hover:border-[#1A0F08] pb-1 transition-all"
              >
                Browse products
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
