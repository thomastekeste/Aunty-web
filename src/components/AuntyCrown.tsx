"use client";

import type { Aunty } from "@/data/aunties";

interface Props {
  aunties: Aunty[];
  selected: Aunty;
  onSelect: (aunty: Aunty) => void;
}

/**
 * Crown arc offsets — center is highest (0px), edges drop.
 * Creates a tiara/crown silhouette from 7 evenly-spaced avatars.
 */
const CROWN_Y = [26, 13, 4, 0, 4, 13, 26];

export default function AuntyCrown({ aunties, selected, onSelect }: Props) {
  return (
    <div className="relative">
      {/* ── Crown SVG arc (decorative) ────────────────────────────── */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 bottom-[42px] md:bottom-[50px] w-[85%] md:w-[70%] h-[50px] pointer-events-none opacity-[0.12]"
        viewBox="0 0 700 50"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M 0 45 Q 175 0 350 2 Q 525 0 700 45"
          stroke="#C9903A"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      </svg>

      {/* ── Aunty circles ─────────────────────────────────────────── */}
      <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-7 lg:gap-9 px-2 sm:px-0">
        {aunties.map((aunty, i) => {
          const isActive = selected.id === aunty.id;
          return (
            <button
              key={aunty.id}
              onClick={() => onSelect(aunty)}
              className="flex flex-col items-center gap-1.5 md:gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#C9903A]/50 rounded-xl"
              style={{
                transform: `translateY(${CROWN_Y[i]}px)`,
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Avatar */}
              <div
                className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center font-bold transition-all duration-400"
                style={{
                  fontSize: isActive ? "1.2rem" : "1rem",
                  backgroundColor: aunty.color + (isActive ? "28" : "12"),
                  color: aunty.color,
                  border: `2px solid ${aunty.color}${isActive ? "90" : "25"}`,
                  boxShadow: isActive
                    ? `0 0 0 3px ${aunty.color}20, 0 0 24px ${aunty.color}30, 0 4px 12px ${aunty.color}15`
                    : "none",
                  transform: isActive ? "scale(1.12)" : "scale(1)",
                  transition:
                    "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {aunty.name[0]}

                {/* Online dot */}
                {isActive && (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-[#1A0F08] animate-pulse"
                    style={{ backgroundColor: aunty.color }}
                  />
                )}
              </div>

              {/* Name */}
              <span
                className="font-body text-[10px] sm:text-[11px] md:text-[12px] tracking-wide transition-all duration-300 whitespace-nowrap"
                style={{
                  color: isActive ? "#FDFCF8" : "#9E8C7A",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {aunty.name}
              </span>

              {/* Active indicator line */}
              <div
                className="h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "20px" : "0px",
                  backgroundColor: aunty.color,
                  opacity: isActive ? 1 : 0,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
