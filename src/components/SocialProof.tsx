"use client";

import AuntyCharacterIcon from "./AuntyCharacterIcon";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  name: string;
  texture: string;
  quote: string;
  auntyId: string;
  auntyName: string;
  rating: number;
  highlight?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Khadija M.",
    texture: "4C · High porosity",
    quote:
      "I've spent years buying products that weren't made for my texture. Ngozi's picks actually work — my wash day went from 4 hours to 2.",
    auntyId: "ngozi",
    auntyName: "Ngozi",
    rating: 5,
    highlight: "Wash day cut in half",
  },
  {
    name: "Tasha R.",
    texture: "3C · Normal porosity",
    quote:
      "Denise recommended the deep conditioner and growth oil combo. Three months in and my stylist noticed the difference before I did.",
    auntyId: "denise",
    auntyName: "Denise",
    rating: 5,
    highlight: "Stylist noticed",
  },
  {
    name: "Amina J.",
    texture: "4B · Low porosity",
    quote:
      "The quiz actually understood my porosity. Every product made sense — no filler, no upsell, just what my hair needed.",
    auntyId: "fatou",
    auntyName: "Fatou",
    rating: 5,
    highlight: "No filler, no upsell",
  },
  {
    name: "Brianna C.",
    texture: "Combination skin",
    quote:
      "Finally a skincare line that doesn't leave white cast or ash. The PIH serum is a permanent staple now.",
    auntyId: "salma",
    auntyName: "Salma",
    rating: 5,
    highlight: "No more white cast",
  },
  {
    name: "Zuri O.",
    texture: "4A · Curls",
    quote:
      "Marcia's approach clicked for me — patience over products. The routine she built is simple and my curls have never been this defined.",
    auntyId: "marcia",
    auntyName: "Marcia",
    rating: 5,
    highlight: "Patience over products",
  },
  {
    name: "Nia W.",
    texture: "High porosity · Dry",
    quote:
      "I was skeptical about another quiz, but the aunty verdicts felt personal, not generic. Like someone actually looked at MY hair.",
    auntyId: "amara",
    auntyName: "Amara",
    rating: 5,
    highlight: "Personal, not generic",
  },
  {
    name: "Imani T.",
    texture: "4C · Locs",
    quote:
      "The scalp microbiome shampoo cleared my buildup in two washes. My scalp finally feels light again under my locs.",
    auntyId: "amara",
    auntyName: "Amara",
    rating: 5,
    highlight: "Scalp finally feels light",
  },
  {
    name: "Jasmine A.",
    texture: "3B · Curls",
    quote:
      "Lightweight conditioner that doesn't weigh my curls down? I've been searching for years. Carmen knew exactly what I needed.",
    auntyId: "carmen",
    auntyName: "Carmen",
    rating: 5,
    highlight: "Curls finally bouncy",
  },
];

function Stars({ count = 5, size = 12 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#C9903A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex-shrink-0 w-[340px] md:w-[400px] bg-[#FDFCF8] rounded-3xl p-6 border border-[rgba(26,15,8,0.06)] shadow-[0_4px_24px_-12px_rgba(26,15,8,0.10)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Stars />
        {t.highlight && (
          <span className="px-2.5 py-1 rounded-full bg-[#C9903A]/10 font-body text-[10px] font-bold tracking-[1px] uppercase text-[#A0701E]">
            {t.highlight}
          </span>
        )}
      </div>

      <p className="font-display text-[15px] md:text-[16px] text-[#1A0F08] leading-[1.55] flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[rgba(26,15,8,0.06)]">
        <div>
          <p className="font-body text-[13px] font-semibold text-[#1A0F08]">
            {t.name}
          </p>
          <p className="font-body text-[11px] text-[#9E8C7A] tracking-[0.3px]">
            {t.texture}
          </p>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F7F5F0]">
          <div className="w-5 h-5 rounded-full overflow-hidden">
            <AuntyCharacterIcon auntyId={t.auntyId} size={20} />
          </div>
          <span className="font-body text-[10px] font-bold tracking-[1px] uppercase text-[#3D2B1A]">
            {t.auntyName}&apos;s pick
          </span>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({ items, direction }: { items: Testimonial[]; direction: "left" | "right" }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden marquee-pause-on-hover">
      <div className={`flex gap-5 w-max ${animClass}`}>
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function SocialProof() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = TESTIMONIALS.slice(0, half);
  const row2 = TESTIMONIALS.slice(half);

  return (
    <section className="relative py-24 md:py-32 bg-[#F7F5F0] overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 65%)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B4A3A 0%, transparent 65%)" }}
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              Real results
            </p>
            <h2 className="font-display text-[2.2rem] md:text-[3.2rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-6">
              Trusted by thousands of
              <br />
              <span className="italic font-light text-[#6B5040]">curls, coils &amp; complexions</span>
            </h2>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FDFCF8] border border-[rgba(26,15,8,0.08)]">
              <Stars size={14} />
              <span className="font-display text-[15px] font-bold text-[#1A0F08]">4.9</span>
              <span className="w-1 h-1 rounded-full bg-[#9E8C7A]" />
              <span className="font-body text-[13px] text-[#3D2B1A]">
                12,000+ texture-matched routines
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Edge fade masks for marquee */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #F7F5F0, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #F7F5F0, transparent)" }}
        />

        <div className="flex flex-col gap-5">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-12 text-center">
        <a
          href="#quiz"
          className="font-body text-[12px] font-bold tracking-[2px] uppercase text-[#1A0F08] border-b-2 border-[#1A0F08]/30 hover:border-[#1A0F08] pb-1 transition-all"
        >
          Join 12,000+ aunty-matched routines
        </a>
      </div>
    </section>
  );
}
