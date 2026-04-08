interface Props {
  children: React.ReactNode;
  className?: string;
  screenBg?: string;
}

export default function PhoneMockup({ children, className = "", screenBg }: Props) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone frame */}
      <div className="relative w-[280px] md:w-[300px] mx-auto">
        {/* Outer shell */}
        <div className="rounded-[40px] bg-gradient-to-b from-[#2D2D2D] to-[#1A1A1A] p-[3px] shadow-2xl shadow-black/40">
          {/* Inner bezel */}
          <div className="rounded-[38px] bg-[#0A0A0A] p-[8px] relative">
            {/* Notch */}
            <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-[#0A0A0A] rounded-b-2xl z-10" />

            {/* Screen */}
            <div className="rounded-[30px] overflow-hidden aspect-[9/19.5] relative" style={{ backgroundColor: screenBg || "#1A0F08" }}>
              {children}
            </div>
          </div>
        </div>

        {/* Reflection highlight */}
        <div className="absolute top-0 left-[10%] right-[50%] h-[40%] rounded-[40px] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
