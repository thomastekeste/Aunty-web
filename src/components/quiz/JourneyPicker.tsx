"use client";

export default function JourneyPicker({
  onSelect, onClose,
}: {
  onSelect: (journey: "hair" | "skin") => void;
  onClose: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end px-6 md:px-10 pt-6">
        <button onClick={onClose} aria-label="Close consultation"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(26,15,8,0.05)] hover:bg-[rgba(26,15,8,0.1)] transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2 L12 12 M12 2 L2 12" stroke="#2D1B0E" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        <button onClick={() => onSelect("hair")}
          className="relative flex-1 flex flex-col items-center justify-center px-8 py-16 group overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{ backgroundColor: "rgba(26,15,8,0.03)" }} />
          <div className="relative text-center">
            <p className="font-body text-[11px] tracking-[5px] uppercase mb-4 text-[#9E8C7A]">Hair Care</p>
            <h2 className="font-display text-6xl md:text-7xl font-bold mb-5 text-[#2D1B0E]">HAIR</h2>
            <p className="font-body text-base text-[#6B5040] max-w-sm mx-auto leading-relaxed mb-10">
              Curl pattern, porosity, density. Products matched to your exact texture.
            </p>
            <span className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5">
              Start Hair Quiz →
            </span>
          </div>
        </button>
        <div className="hidden md:flex items-center w-px"><div className="h-48 w-px bg-[rgba(26,15,8,0.08)]" /></div>
        <div className="md:hidden h-px w-full bg-[rgba(26,15,8,0.08)]" />
        <button onClick={() => onSelect("skin")}
          className="relative flex-1 flex flex-col items-center justify-center px-8 py-16 group overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{ backgroundColor: "rgba(26,15,8,0.03)" }} />
          <div className="relative text-center">
            <p className="font-body text-[11px] tracking-[5px] uppercase mb-4 text-[#9E8C7A]">Skin Care</p>
            <h2 className="font-display text-6xl md:text-7xl font-bold mb-5 text-[#6B5040]">SKIN</h2>
            <p className="font-body text-base text-[#6B5040] max-w-sm mx-auto leading-relaxed mb-10">
              PIH, hyperpigmentation, dry skin. Formulated for melanin-rich skin specifically.
            </p>
            <span className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5">
              Start Skin Quiz →
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
