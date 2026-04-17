"use client";

import { useInView } from "@/hooks/useInView";

export default function FounderNote() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section
      className="relative py-20 md:py-28 bg-[#FEF8EC] noise overflow-hidden"
      ref={ref}
    >
      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#D4A04A] opacity-[0.08] blur-[140px]" />

      <div
        className="relative max-w-2xl mx-auto px-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s ease-out",
        }}
      >
        <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-6 text-center">
          A note from the makers
        </p>

        {/* Wordmark emblem in place of a face */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4A04A] to-[#B8862E] flex items-center justify-center ring-2 ring-[#D4A04A]/20 ring-offset-4 ring-offset-[#FEF8EC]">
              {/* Curl glyph */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 22 Q8 14, 16 14 Q24 14, 24 22 M8 22 Q8 26, 12 26 M24 22 Q24 26, 20 26 M16 14 Q16 8, 12 8 Q9 8, 9 11"
                  stroke="#1A0F08"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="16" cy="11" r="1.2" fill="#1A0F08" />
              </svg>
            </div>
          </div>
        </div>

        {/* Letter — "we" voice, no personal details */}
        <div className="space-y-5 font-body text-[rgba(26,15,8,0.75)] text-base md:text-lg leading-relaxed">
          <p>
            We built Aunty Curl Council because every hair care app we tried treated
            curls like a generic problem to solve. Pick a product. Follow a routine.
            Hope it works.
          </p>
          <p>
            The aunties in our lives never talked to us like that. They asked
            questions. They watched how our hair moved. They remembered what worked
            last month and what didn&rsquo;t. That&rsquo;s the wisdom we wanted to
            put in your pocket.
          </p>
          <p>
            If you become a Founding Member, you&rsquo;re not just buying an app &mdash;
            you&rsquo;re helping us build it in the open. Your feedback shapes which
            aunty we add next, which features ship first, and how we grow.
          </p>
          <p className="font-display italic text-[#D4A04A] text-lg md:text-xl pt-2">
            Thank you for believing in this before we&rsquo;ve earned it.
          </p>
        </div>

        {/* Signature line */}
        <div className="flex items-center gap-4 mt-8 justify-center">
          <div className="h-px w-8 bg-[rgba(212,160,74,0.3)]" />
          <p className="font-body text-xs text-[rgba(26,15,8,0.4)] tracking-[2px] uppercase">
            The Aunty Curl Council team
          </p>
          <div className="h-px w-8 bg-[rgba(212,160,74,0.3)]" />
        </div>
      </div>
    </section>
  );
}
