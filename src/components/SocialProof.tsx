"use client";

import { useInView } from "@/hooks/useInView";

const stats = [
  { value: "7", label: "Aunties that know your texture" },
  { value: "9", label: "Curl types supported (2A\u20134C)" },
  { value: "365", label: "Days of personalized rituals" },
  { value: "2.4K+", label: "On the waitlist" },
];

const quotes = [
  {
    text: "I've tried everything — Cantu, Shea Moisture, DIY flaxseed gel. Nothing stuck. I need someone who actually gets 4C hair.",
    name: "Amara T.",
    type: "4C coils",
  },
  {
    text: "My stylist moved away and I've been lost ever since. I want guidance, not just another product recommendation.",
    name: "Jasmine R.",
    type: "3B curls",
  },
  {
    text: "Finally something that's not a one-size-fits-all routine. Signed up the second I saw it.",
    name: "Priya K.",
    type: "2C waves",
  },
];

export default function SocialProof() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-20 bg-[#FEF8EC] border-b border-[#E8DCC8]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: `all 0.5s ease-out ${i * 100}ms`,
              }}
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-[#D4A04A] mb-1">
                {s.value}
              </p>
              <p className="font-body text-xs text-[#9E8C7A]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Waitlist quotes */}
        <div
          className="grid md:grid-cols-3 gap-5"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease-out 400ms",
          }}
        >
          {quotes.map((q) => (
            <div
              key={q.name}
              className="rounded-2xl bg-white p-6"
              style={{
                boxShadow: "0 1px 8px rgba(45,27,14,0.04), 0 0 0 1px rgba(45,27,14,0.04)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#D4A04A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-sm text-[#5C4433] leading-relaxed mb-4">
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="font-body text-xs font-semibold text-[#2D1B0E]">{q.name}</p>
                <span className="font-body text-[10px] text-[#9E8C7A] px-2 py-0.5 rounded-full bg-[#F5EBD5]">
                  {q.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center font-body text-xs text-[#9E8C7A] mt-6"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease-out 600ms",
          }}
        >
          From real waitlist signups. These are the women your aunties are getting ready for.
        </p>
      </div>
    </section>
  );
}
