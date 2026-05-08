"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  decimals?: number;
}

const STATS: Stat[] = [
  { value: 12000, suffix: "+", label: "Routines built", sub: "Texture-matched", },
  { value: 4.9,   suffix: "★", label: "Average rating",  sub: "Across all products", decimals: 1 },
  { value: 7,     suffix: "",  label: "Aunties",         sub: "From the diaspora" },
  { value: 47,    suffix: "",  label: "Products",        sub: "By porosity & skin type" },
];

function CountUp({ end, decimals = 0, duration = 1800 }: { end: number; decimals?: number; duration?: number }) {
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
          // ease-out cubic
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

  const formatted = decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString("en-US");

  return <span ref={ref}>{formatted}</span>;
}

export default function StatsBand() {
  return (
    <section className="relative py-16 md:py-20 bg-[#FDFCF8] border-y border-[rgba(26,15,8,0.06)] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1A0F08 0.7px, transparent 0.7px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-0">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1.5 md:items-start group"
            >
              <div className="flex items-baseline gap-0.5">
                {s.prefix && (
                  <span className="font-display text-[1.5rem] md:text-[2rem] font-bold text-[#9E8C7A]">
                    {s.prefix}
                  </span>
                )}
                <span className="font-display text-[2.4rem] md:text-[3.6rem] font-bold text-[#1A0F08] leading-none tabular-nums tracking-[-0.03em]">
                  <CountUp end={s.value} decimals={s.decimals} />
                </span>
                {s.suffix && (
                  <span
                    className={`font-display ${
                      s.suffix === "★" ? "text-[1.4rem] md:text-[2rem] text-[#C9903A]" : "text-[1.5rem] md:text-[2rem] text-[#9E8C7A]"
                    } font-bold leading-none`}
                  >
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="font-display text-[14px] md:text-base font-bold text-[#1A0F08]">
                {s.label}
              </p>
              <p className="font-body text-[11px] md:text-[12px] tracking-[1px] uppercase text-[#9E8C7A]">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
