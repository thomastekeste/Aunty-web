"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface Review {
  name: string;
  texture: string;
  quote: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    name: "Khadija M.",
    texture: "4C / High porosity",
    quote:
      "I've tried everything — cowashing, LOC method, salon treatments that cost more than my rent. Three weeks with this routine and my sister grabbed my hair asking what I changed. That literally never happens.",
    date: "April 2025",
  },
  {
    name: "Tasha R.",
    texture: "3C / Normal porosity",
    quote:
      "I was really skeptical about the AI part, but the quiz asked about my scalp health and porosity, not just 'is your hair curly or straight.' Only gripe is I wish the conditioner came bigger.",
    date: "March 2025",
  },
  {
    name: "Nia W.",
    texture: "4B / Low porosity",
    quote:
      "I've spent more money than I'll ever admit on products that weren't made for my hair. This is the first routine where I'm not layering six products and hoping for the best.",
    date: "March 2025",
  },
  {
    name: "Amina J.",
    texture: "4A / Medium porosity",
    quote:
      "My stylist noticed the difference before I did. She thought I switched to a professional line. I just laughed.",
    date: "February 2025",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill="#C9903A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F5F0]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-18">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              What people are saying
            </p>
            <h2 className="font-display text-[2rem] md:text-[2.8rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em]">
              Real results.
            </h2>
          </div>
        </ScrollReveal>

        {/* Reviews — clean grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {REVIEWS.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 80}>
              <article className="flex flex-col gap-4 p-6 md:p-8 rounded-2xl bg-[#FDFCF8] border border-[rgba(26,15,8,0.06)] h-full">
                <Stars />

                <p className="font-body text-[15px] text-[#1A0F08] leading-[1.65] flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-[rgba(26,15,8,0.06)]">
                  <p className="font-body text-[13px] font-semibold text-[#1A0F08]">
                    {r.name}
                  </p>
                  <p className="font-body text-[11px] text-[#9E8C7A] mt-0.5">
                    {r.texture} &middot; {r.date}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Before / After */}
        <ScrollReveal delay={300}>
          <div className="mt-12 md:mt-16">
            <div className="relative aspect-[4/3] md:aspect-[3/2] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(26,15,8,0.1)]">
              <Image
                src="/social-proof.png"
                fill
                className="object-cover object-center"
                alt="Customer results — three portraits and a before and after comparison"
                sizes="(max-width: 768px) 100vw, 1100px"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={350}>
          <div className="mt-14 text-center">
            <a
              href="#quiz"
              className="inline-flex items-center justify-center font-body text-[12px] font-bold tracking-[2px] uppercase text-[#1A0F08] border-b-2 border-[#1A0F08]/20 hover:border-[#1A0F08] py-3 px-4 transition-all"
            >
              Find your routine
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
