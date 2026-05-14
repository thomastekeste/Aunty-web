"use client";

import type { Aunty } from "@/data/aunties";
import AuntyPortrait from "./AuntyPortrait";

interface AuntyCardProps {
  aunty: Aunty;
  selected: boolean;
  onClick: () => void;
}

export default function AuntyCard({ aunty, selected, onClick }: AuntyCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex-shrink-0 w-[200px] md:w-[240px] snap-start rounded-2xl border-2 px-5 py-6 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
      style={{
        borderColor: selected ? aunty.color : "rgba(26,15,8,0.1)",
        background: selected
          ? `linear-gradient(135deg, ${aunty.gradient[0]} 0%, ${aunty.gradient[1]} 100%)`
          : "#FDFCF8",
        boxShadow: selected ? `0 12px 32px -8px ${aunty.color}40` : undefined,
      }}
      aria-pressed={selected}
      aria-label={`Select Aunty ${aunty.name}, ${aunty.title}`}
    >
      {/* Portrait illustration */}
      <div className="mb-4 transition-transform group-hover:scale-105">
        <AuntyPortrait auntyId={aunty.id} size={88} bg={aunty.bg} />
      </div>

      {/* Name + title */}
      <div className="flex flex-col gap-0.5 mb-3">
        <h3 className="font-display text-xl font-semibold text-[#1A0F08]">
          {aunty.name}
        </h3>
        <p
          className="font-body text-[11px] font-bold tracking-[1px] uppercase"
          style={{ color: aunty.color }}
        >
          {aunty.title}
        </p>
        <p className="font-body text-[11px] text-[#1A0F08]/50 mt-0.5">
          {aunty.region}
        </p>
      </div>

      {/* Quote */}
      <p className="font-body text-[12px] leading-snug text-[#1A0F08]/70 italic line-clamp-3">
        &ldquo;{aunty.quote}&rdquo;
      </p>

      {/* Selected indicator */}
      {selected && (
        <div
          className="mt-4 inline-flex items-center gap-1.5 font-body text-[10px] font-bold tracking-[1.5px] uppercase"
          style={{ color: aunty.color }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Selected
        </div>
      )}
    </button>
  );
}
