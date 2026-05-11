"use client";

export default function TierHeader({ number, label, sublabel, accent }: { number: string; label: string; sublabel: string; accent: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-1">
        <span className="font-display text-[11px] font-bold tracking-[3px] uppercase px-2.5 py-1 rounded-full"
              style={{ backgroundColor: accent + "15", color: accent }}>
          {number}
        </span>
        <h3 className="font-display text-xl font-bold text-[#2D1B0E]">{label}</h3>
      </div>
      <p className="font-body text-sm text-[#6B5040] leading-relaxed">{sublabel}</p>
    </div>
  );
}
