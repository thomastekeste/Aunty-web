"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Aunty } from "@/data/aunties";

interface Props {
  aunties: Aunty[];
  selected: Aunty;
  onSelect: (aunty: Aunty) => void;
}

export default function AuntyCarousel({ aunties, selected, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-[#1A0F08]/90 border border-[#FDFCF8]/15 flex items-center justify-center text-[#FDFCF8]/70 hover:text-[#FDFCF8] hover:border-[#C9903A]/40 transition-all duration-200 backdrop-blur-sm ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        } hidden md:flex`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-1 py-2 -mx-1"
      >
        {aunties.map((aunty) => {
          const isActive = selected.id === aunty.id;
          return (
            <button
              key={aunty.id}
              onClick={() => onSelect(aunty)}
              className={`snap-start shrink-0 w-[160px] md:w-[185px] p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 ${
                isActive
                  ? "border-transparent scale-[1.02]"
                  : "border-[#FDFCF8]/8 hover:border-[#FDFCF8]/15"
              }`}
              style={
                isActive
                  ? {
                      borderColor: aunty.color + "60",
                      boxShadow: `0 0 24px ${aunty.color}15, 0 4px 16px ${aunty.color}10`,
                      background: `linear-gradient(135deg, ${aunty.color}08 0%, ${aunty.color}04 100%)`,
                    }
                  : { background: "rgba(253,252,248,0.02)" }
              }
            >
              {/* Avatar circle */}
              <div
                className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold mb-3 transition-transform duration-300"
                style={{
                  backgroundColor: aunty.color + (isActive ? "30" : "18"),
                  color: aunty.color,
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                }}
              >
                {aunty.name[0]}
              </div>

              {/* Name + region */}
              <p className="font-display text-[14px] md:text-[15px] font-bold text-[#FDFCF8] leading-tight">
                {aunty.name}
              </p>
              <p className="font-body text-[10px] md:text-[11px] text-[#9E8C7A] mt-0.5 mb-2">
                {aunty.region}
              </p>

              {/* Title badge */}
              <p
                className="font-body text-[9px] md:text-[10px] font-bold uppercase tracking-[1.5px] mb-2 transition-colors duration-300"
                style={{ color: isActive ? aunty.color : aunty.color + "80" }}
              >
                {aunty.title}
              </p>

              {/* Specialty */}
              <p className="font-body text-[12px] md:text-[13px] text-[#9E8C7A]/80 leading-relaxed line-clamp-2">
                {aunty.specialty}
              </p>
            </button>
          );
        })}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-[#1A0F08]/90 border border-[#FDFCF8]/15 flex items-center justify-center text-[#FDFCF8]/70 hover:text-[#FDFCF8] hover:border-[#C9903A]/40 transition-all duration-200 backdrop-blur-sm ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        } hidden md:flex`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Fade edges */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-8 pointer-events-none transition-opacity duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "linear-gradient(to right, #1A0F08, transparent)" }}
        aria-hidden
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-8 pointer-events-none transition-opacity duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "linear-gradient(to left, #1A0F08, transparent)" }}
        aria-hidden
      />
    </div>
  );
}
