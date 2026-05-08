"use client";

import Link from "next/link";
import { hairCategoryOptions } from "@/data/quiz";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  wavy: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 16 Q10 10 14 16 T22 16 T30 16" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M6 22 Q10 16 14 22 T22 22 T30 22" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  curly: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="10" cy="16" r="5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="16" r="5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="15" cy="10" r="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  coily: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 8 Q12 12 8 16 Q4 20 8 24 Q12 28 8 32" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M16 4 Q20 8 16 12 Q12 16 16 20 Q20 24 16 28" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M24 8 Q28 12 24 16 Q20 20 24 24 Q28 28 24 32" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "coily-dense": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="9" cy="10" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="17" cy="8" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="25" cy="11" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="7" cy="18" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="24" cy="19" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="10" cy="25" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="24" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="26" cy="26" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  ),
};

export default function HairTypes() {
  return (
    <section className="bg-[#FDFCF8] border-t border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A] mb-4">
            Hair Types
          </p>
          <h2 className="font-display text-[1.75rem] md:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] max-w-2xl mx-auto mb-4">
            Your texture isn&apos;t a trend. It&apos;s a blueprint.
          </h2>
          <p className="font-body text-base text-[#6B5040] max-w-lg mx-auto leading-relaxed">
            Four categories. Each one matched to specific products, porosity needs, and styling goals.
          </p>
        </div>

        {/* Type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {hairCategoryOptions.map((type) => (
            <div
              key={type.value}
              className="group rounded-2xl border border-[rgba(26,15,8,0.08)] p-5 hover:border-[rgba(26,15,8,0.15)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[#2D1B0E] mb-3">
                {TYPE_ICONS[type.value]}
              </div>
              <h3 className="font-display text-[15px] font-bold text-[#2D1B0E] mb-1.5 leading-snug">
                {type.label}
              </h3>
              <p className="font-body text-xs text-[#6B5040] leading-relaxed mb-2">
                {type.desc}
              </p>
              <p className="font-body text-[11px] text-[#9E8C7A] leading-relaxed">
                {type.detail}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/#quiz"
            className="inline-block font-body text-[12px] font-semibold tracking-[2px] uppercase px-8 py-4 rounded-full bg-[#2D1B0E] text-[#FDFCF8] hover:bg-[#1A0F08] transition-colors"
          >
            Find my type
          </Link>
          <p className="font-body text-xs text-[#9E8C7A] mt-3">
            7 questions. 2 minutes. Your personal 3-tier routine.
          </p>
        </div>
      </div>
    </section>
  );
}
