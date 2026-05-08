"use client";

import Link from "next/link";
import { auntySkinTypes } from "@/data/quiz";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  oily: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 8 C16 8 10 16 10 20 C10 23.3 12.7 26 16 26 C19.3 26 22 23.3 22 20 C22 16 16 8 16 8Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.15" />
    </svg>
  ),
  "dry-ashy": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 14 L22 14 M10 18 L22 18 M12 22 L20 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  ),
  combination: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="16" r="3" fill="currentColor" opacity="0.15" />
    </svg>
  ),
  balanced: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 16 L14 12 L18 20 L22 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sensitive: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.1" />
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
};

export default function SkinTypes() {
  return (
    <section className="bg-[#FDFCF8] border-t border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#9E8C7A] mb-4">
            Skin Types
          </p>
          <h2 className="font-display text-[1.75rem] md:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] max-w-2xl mx-auto mb-4">
            Black skin isn&apos;t one thing. Neither is your routine.
          </h2>
          <p className="font-body text-base text-[#6B5040] max-w-lg mx-auto leading-relaxed">
            Five types. Five stacks. Each one formulated for how melanin-rich skin actually behaves.
          </p>
        </div>

        {/* Type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {auntySkinTypes.map((type) => (
            <div
              key={type.value}
              className="group rounded-2xl border border-[rgba(26,15,8,0.08)] p-5 hover:border-[rgba(26,15,8,0.15)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[#6B5040] mb-3">
                {TYPE_ICONS[type.value]}
              </div>
              <h3 className="font-display text-[15px] font-bold text-[#2D1B0E] mb-1.5 leading-snug">
                {type.label}
              </h3>
              <p className="font-body text-xs text-[#6B5040] leading-relaxed">
                {type.description}
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
            4 questions. 2 minutes. Your personal 3-product stack.
          </p>
        </div>
      </div>
    </section>
  );
}
