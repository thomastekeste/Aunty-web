"use client";

import Link from "next/link";
import AuntyCharacterIcon from "./AuntyCharacterIcon";
import { aunties } from "@/data/aunties";

export default function Hero() {
  return (
    <section className="relative min-h-[75svh] flex flex-col items-center justify-center bg-[#FDFCF8] pt-[72px] pb-12 overflow-hidden">

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">

        {/* Eyebrow */}
        <p
          className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A]"
          style={{ opacity: 0, animation: "introFade 500ms ease-out forwards", animationDelay: "100ms" }}
        >
          Custom Hair &amp; Skin Care
        </p>

        {/* Headline */}
        <h1
          className="font-display text-[2.5rem] sm:text-5xl md:text-[3.5rem] font-bold text-[#2D1B0E] leading-[1.08] tracking-[-0.025em]"
          style={{ opacity: 0, animation: "introFade 700ms ease-out forwards", animationDelay: "200ms" }}
        >
          Products that actually know your texture
        </h1>

        {/* Sub */}
        <p
          className="font-body text-[15px] md:text-base text-[#6B5040] max-w-lg leading-[1.7]"
          style={{ opacity: 0, animation: "introFade 700ms ease-out forwards", animationDelay: "400ms" }}
        >
          A curated marketplace of hair and skin products — each one recommended
          by an aunty who knows exactly what you need.
        </p>

        {/* CTA — single, funnel-focused */}
        <div
          className="mt-2"
          style={{ opacity: 0, animation: "introFade 600ms ease-out forwards", animationDelay: "600ms" }}
        >
          <a
            href="#quiz"
            className="inline-block px-9 py-4 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors"
          >
            Get Your Formula
          </a>
        </div>

        {/* Aunty strip */}
        <div
          className="flex items-center justify-center gap-5 sm:gap-6 mt-4"
          style={{ opacity: 0, animation: "introFade 600ms ease-out forwards", animationDelay: "800ms" }}
        >
          {aunties.map((a) => (
            <div key={a.id} className="flex flex-col items-center gap-1.5 group">
              <div
                className="w-8 h-8 rounded-full overflow-hidden transition-transform duration-200 group-hover:scale-110"
                title={`${a.name} · ${a.title}`}
              >
                <AuntyCharacterIcon auntyId={a.id} size={32} />
              </div>
              <span className="font-body text-[9px] font-semibold tracking-[0.5px] text-[#9E8C7A]">
                {a.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
