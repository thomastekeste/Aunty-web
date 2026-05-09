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
  { value: 7, label: "Aunties" },
  { value: 47, label: "Products" },
];

const PRESS = [
  { name: "Allure", font: "italic", weight: "400" },
  { name: "Essence", font: "normal", weight: "700" },
  { name: "BLAVITY", font: "normal", weight: "900" },
  { name: "Refinery29", font: "normal", weight: "500" },
  { name: "Glamour", font: "italic", weight: "300" },
  { name: "Byrdie", font: "normal", weight: "600" },
  { name: "Teen Vogue", font: "italic", weight: "500" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mb-10 md:mb-12">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="font-display text-[2rem] md:text-[2.6rem] font-bold text-[#1A0F08] leading-none tabular-nums tracking-[-0.03em]">
                <CountUp end={s.value} decimals={s.decimals} />
              </span>
              {s.suffix && (
                <span
                  className={`font-display text-[1.1rem] md:text-[1.4rem] font-bold leading-none ${
                    s.suffix === "★" ? "text-[#C9903A]" : "text-[#9E8C7A]"
                  }`}
                >
                  {s.suffix}
                </span>
              )}
              <span className="font-body text-[12px] md:text-[13px] text-[#9E8C7A] ml-1.5 tracking-[0.3px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Press divider + wordmarks */}
        <div className="pt-8 border-t border-[rgba(26,15,8,0.06)] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <span className="font-body text-[10px] font-bold tracking-[3px] uppercase text-[#9E8C7A] flex-shrink-0">
            As mentioned in
          </span>
          <div className="flex-1 overflow-hidden relative">
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none hidden md:block"
              style={{ background: "linear-gradient(to left, #FDFCF8, transparent)" }}
            />
            <div className="flex flex-wrap md:flex-nowrap items-center gap-x-10 gap-y-4 md:gap-x-12">
              {PRESS.map((p) => (
                <span
                  key={p.name}
                  className="font-display text-[#9E8C7A]/70 hover:text-[#1A0F08] transition-colors duration-300 whitespace-nowrap select-none flex-shrink-0"
                  style={{
                    fontStyle: p.font,
                    fontWeight: p.weight,
                    fontSize: "clamp(0.95rem, 1.2vw, 1.25rem)",
                    letterSpacing: parseInt(p.weight) >= 700 ? "-0.02em" : "0.01em",
                  }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
