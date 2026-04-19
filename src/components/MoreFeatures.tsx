"use client";

import { useInView } from "@/hooks/useInView";

const ROWS = [
  [
    { label: "Ingredient Decoder",         icon: "🔬", locked: false },
    { label: "Product Compatibility",      icon: "✓",  locked: false },
    { label: "Progress Photo Journal",     icon: "📷", locked: false },
    { label: "Hair Porosity Quiz",         icon: "💧", locked: false },
    { label: "Protective Style Tracker",   icon: "🛡", locked: true  },
    { label: "Moisture Balance Monitor",   icon: "⚖️", locked: true  },
    { label: "Ingredient Decoder",         icon: "🔬", locked: false },
    { label: "Product Compatibility",      icon: "✓",  locked: false },
  ],
  [
    { label: "Weather-aware Recs",         icon: "🌤", locked: true  },
    { label: "Growth Milestone Tracker",   icon: "📈", locked: true  },
    { label: "Curl Shrinkage Calculator",  icon: "📐", locked: true  },
    { label: "Aunty Chat History",         icon: "💬", locked: false },
    { label: "Custom Hair Goals",          icon: "🎯", locked: false },
    { label: "Texture Timeline",           icon: "🗓", locked: true  },
    { label: "Weather-aware Recs",         icon: "🌤", locked: true  },
    { label: "Wash Day Reminders",         icon: "🔔", locked: false },
  ],
];

function MarqueeRow({ items, reverse = false }: { items: typeof ROWS[0]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden" aria-hidden="true">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee ${reverse ? "35s" : "28s"} linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border font-body text-sm whitespace-nowrap"
            style={
              item.locked
                ? {
                    background: "rgba(26,15,8,0.03)",
                    border: "1px solid rgba(26,15,8,0.07)",
                    color: "rgba(26,15,8,0.3)",
                  }
                : {
                    background: "white",
                    border: "1px solid rgba(26,15,8,0.08)",
                    color: "rgba(26,15,8,0.65)",
                    boxShadow: "0 2px 8px rgba(26,15,8,0.05)",
                  }
            }
          >
            <span className={item.locked ? "grayscale opacity-40" : ""}>{item.icon}</span>
            <span>{item.label}</span>
            {item.locked && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MoreFeatures() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-20 bg-[#FEF8EC] overflow-hidden" ref={ref}>
      <div
        className="text-center mb-10 px-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
          Way more inside
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A0F08] mb-4">
          That&rsquo;s just the beginning.
        </h2>
        <p className="font-body text-lg text-[rgba(26,15,8,0.55)] max-w-xl mx-auto">
          The three screens above barely scratch the surface. Here&rsquo;s a taste of
          what&rsquo;s inside the full app — with more being built every week.
        </p>
      </div>

      {/* Marquee rows */}
      <div
        className="flex flex-col gap-3"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.7s ease-out 200ms",
        }}
      >
        <MarqueeRow items={ROWS[0]} />
        <MarqueeRow items={ROWS[1]} reverse />
      </div>

      {/* Coming soon note */}
      <div
        className="text-center mt-10 px-6"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.7s ease-out 400ms",
        }}
      >
        <p className="font-body text-sm text-[rgba(26,15,8,0.4)]">
          🔒 Locked features ship after launch. Founding Members get access first.
        </p>
      </div>
    </section>
  );
}
