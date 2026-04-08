"use client";

import { useInView } from "@/hooks/useInView";

const steps = [
  {
    number: "01",
    title: "Tell Your Aunties About Your Hair",
    description:
      "Answer questions about your curl type, struggles, and goals. It feels like a conversation with someone who actually gets it \u2014 not a form.",
    color: "#D4A04A",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Your Council Convenes",
    description:
      "Seven aunties analyze your hair profile using AI. They cross-reference their specialties \u2014 moisture, technique, strength, scalp health \u2014 to build YOUR plan.",
    color: "#3D5A99",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Follow Your Ritual",
    description:
      "Every day has a purpose: wash day, style day, rest day. A different aunty guides each one. Weekly check-ins adjust your plan as your hair evolves.",
    color: "#1A7A4A",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="features" className="py-24 md:py-32 bg-[#F5EBD5]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            How It Works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2D1B0E] mb-4">
            Not a Routine. A Ritual.
          </h2>
          <p className="font-body text-lg text-[#5C4433] max-w-2xl mx-auto">
            Your aunties don&rsquo;t hand you a product list and disappear. They build a practice with you \u2014
            one that adapts as your hair changes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.number}
              className="relative rounded-2xl bg-white p-8 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.6s ease-out ${i * 150}ms`,
                boxShadow: `0 1px 8px rgba(45,27,14,0.04), 0 0 0 1px ${s.color}15`,
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}40)` }}
              />

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: s.color + "12", color: s.color }}
              >
                {s.icon}
              </div>

              <p
                className="font-display text-4xl font-bold mb-3"
                style={{ color: s.color + "15" }}
              >
                {s.number}
              </p>

              <h3 className="font-display text-xl font-bold text-[#2D1B0E] mb-3">
                {s.title}
              </h3>

              <p className="font-body text-sm text-[#5C4433] leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
