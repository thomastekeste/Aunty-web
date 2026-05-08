"use client";

import { useState } from "react";
import AuntyCharacterIcon from "./AuntyCharacterIcon";

interface Testimonial {
  name: string;
  texture: string;
  quote: string;
  auntyId: string;
  auntyName: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Khadija M.",
    texture: "4C coils",
    quote:
      "I've spent years buying products that weren't made for my texture. Ngozi's picks actually work — my wash day went from 4 hours to 2.",
    auntyId: "ngozi",
    auntyName: "Ngozi",
    rating: 5,
  },
  {
    name: "Tasha R.",
    texture: "3C curls",
    quote:
      "Denise recommended the deep conditioner and growth oil combo. Three months in and my stylist noticed the difference before I did.",
    auntyId: "denise",
    auntyName: "Denise",
    rating: 5,
  },
  {
    name: "Amina J.",
    texture: "4B coils",
    quote:
      "The quiz actually understood my porosity issues. Every product in my tier made sense — no filler, no upsell, just what my hair needed.",
    auntyId: "fatou",
    auntyName: "Fatou",
    rating: 5,
  },
  {
    name: "Brianna C.",
    texture: "Combination skin",
    quote:
      "Finally a skincare line that doesn't leave white cast or ash. The SPF and the PIH serum are permanent staples now.",
    auntyId: "carmen",
    auntyName: "Carmen",
    rating: 5,
  },
  {
    name: "Zuri O.",
    texture: "4A curls",
    quote:
      "Marcia's approach clicked for me — patience over products. The routine she built is simple and my curls have never been this defined.",
    auntyId: "marcia",
    auntyName: "Marcia",
    rating: 5,
  },
  {
    name: "Nia W.",
    texture: "High porosity, dry",
    quote:
      "I was skeptical about another quiz, but the aunty verdicts felt personal, not generic. Like someone actually looked at MY hair.",
    auntyId: "amara",
    auntyName: "Amara",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#D4A04A"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

  return (
    <section className="py-20 bg-[#F7F5F0]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A] mb-4">
            Real results
          </p>
          <h2 className="font-display text-[2rem] sm:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] mb-4">
            Trusted by thousands of curls, coils &amp; complexions
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <Stars count={5} />
            <span className="font-body text-[14px] text-[#6B5040]">
              4.9 average across all products
            </span>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <div
              key={i}
              className="bg-[#FDFCF8] rounded-2xl p-6 border border-[rgba(26,15,8,0.06)] flex flex-col gap-4"
            >
              <Stars count={t.rating} />

              <p className="font-body text-[15px] text-[#2D1B0E] leading-[1.7] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[rgba(26,15,8,0.06)]">
                <div>
                  <p className="font-body text-[13px] font-semibold text-[#2D1B0E]">
                    {t.name}
                  </p>
                  <p className="font-body text-[12px] text-[#9E8C7A]">
                    {t.texture}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <AuntyCharacterIcon auntyId={t.auntyId} size={24} />
                  </div>
                  <span className="font-body text-[11px] text-[#9E8C7A]">
                    {t.auntyName}&apos;s pick
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {TESTIMONIALS.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setExpanded(!expanded)}
              className="font-body text-[13px] font-semibold tracking-[1px] uppercase text-[#6B5040] hover:text-[#2D1B0E] transition-colors underline underline-offset-4 decoration-[rgba(26,15,8,0.15)] hover:decoration-[#2D1B0E]"
            >
              {expanded ? "Show less" : "Read more reviews"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
