"use client";

export default function OptionButton({
  selected, onClick, label, sub, accent,
}: {
  selected: boolean; onClick: () => void; label: string; sub?: string; accent: string;
}) {
  return (
    <button onClick={onClick} aria-label={label}
      className="w-full text-left px-5 py-4 rounded-xl border transition-all duration-150"
      style={{
        borderColor: selected ? accent : "rgba(26,15,8,0.12)",
        backgroundColor: selected ? accent + "0D" : "transparent",
        boxShadow: selected ? `0 0 0 1.5px ${accent}` : "none",
      }}>
      <div className="flex items-start gap-3">
        <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors"
             style={{ borderColor: selected ? accent : "rgba(26,15,8,0.25)", backgroundColor: selected ? accent : "transparent" }}>
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-[#FDFCF8]" />}
        </div>
        <div className="flex-1">
          <p className="font-body text-base font-semibold text-[#2D1B0E] leading-snug">{label}</p>
          {sub && <p className="font-body text-sm text-[#6B5040] mt-0.5 leading-relaxed">{sub}</p>}
        </div>
      </div>
    </button>
  );
}
