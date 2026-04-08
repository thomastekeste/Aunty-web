"use client";

import { useInView } from "@/hooks/useInView";

const stats = [
  { value: "7", label: "Aunties from across the diaspora" },
  { value: "9", label: "Curl types supported (2A\u20134C)" },
  { value: "365", label: "Days of personalized rituals" },
  { value: "2.4K+", label: "On the waitlist" },
];

export default function SocialProof() {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <section className="py-12 bg-[#FEF8EC] border-b border-[#E8DCC8]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
}
