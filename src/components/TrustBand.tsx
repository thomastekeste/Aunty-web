"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Merged trust section: key stats + press mentions in one compact band.
 * Replaces the separate StatsBand + FeaturedIn components.
 */

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

const STATS: Stat[] = [
  { value: 12000, suffix: "+", label: "Routines built" },
  { value: 4.9, suffix: "★", label: "Avg. rating", decimals: 1 },
  { value: 3, label: "Categories" },
  { value: 47, label: "Products" },
];


function CountUp({ end, decimals = 0, duration = 1600 }: { end: number; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(end * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setVal(end);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  const formatted = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-US");
  return <span ref={ref}>{formatted}</span>;
}

export default function TrustBand() {
  return (
    <section className="py-12 md:py-14 bg-[#FDFCF8] border-y border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="font-display text-[1.75rem] md:text-[2.2rem] font-bold text-[#1A0F08] leading-none tabular-nums tracking-[-0.03em]">
                <CountUp end={s.value} decimals={s.decimals} />
              </span>
              {s.suffix && (
                <span
                  className={`font-display text-[1rem] md:text-[1.2rem] font-bold leading-none ${
                    s.suffix === "★" ? "text-[#C9903A]" : "text-[#6B5040]"
                  }`}
                >
                  {s.suffix}
                </span>
              )}
              <span className="font-body text-[13px] md:text-[14px] text-[#6B5040] ml-1.5 tracking-[0.3px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
