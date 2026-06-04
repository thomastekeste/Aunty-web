import { aunties } from "@/data/aunties";
import AuntyPortrait from "@/components/AuntyPortrait";
import type { AuntyId } from "@/components/AuntyPortrait";

export default function MeetTheCouncil() {
  return (
    <section className="bg-[#FDFCF8] pt-[80px] pb-10 md:pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-6">
          <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-[#D4A04A] mb-1.5">
            The Council
          </p>
          <h2 className="font-display text-[1.3rem] md:text-[1.6rem] font-bold text-[#1A0F08] tracking-[-0.02em] leading-tight">
            Seven aunties. Built for your texture.
          </h2>
        </div>

        {/* Aunty cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 lg:grid lg:grid-cols-7 lg:gap-3 lg:overflow-visible">
          {aunties.map((aunty) => (
            <div
              key={aunty.id}
              className="flex-shrink-0 w-[130px] lg:w-auto rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-200 hover:shadow-[0_4px_20px_-6px_rgba(26,15,8,0.12)] hover:-translate-y-0.5"
              style={{
                backgroundColor: aunty.bg,
                border: "1px solid rgba(26,15,8,0.06)",
              }}
            >
              {/* Portrait */}
              <div className="mb-2.5">
                <AuntyPortrait
                  auntyId={aunty.id as AuntyId}
                  size={60}
                  bg={aunty.bg}
                />
              </div>

              {/* Name */}
              <p className="font-display text-[13px] font-bold text-[#1A0F08] mb-1 leading-tight">
                {aunty.name}
              </p>

              {/* Title badge */}
              <span
                className="font-body text-[9px] font-semibold px-2 py-0.5 rounded-full mb-2"
                style={{
                  backgroundColor: `${aunty.color}18`,
                  color: aunty.color,
                }}
              >
                {aunty.title}
              </span>

              {/* Quote */}
              <p className="font-body text-[10px] italic text-[#3D2B1A]/60 leading-relaxed line-clamp-2">
                &ldquo;{aunty.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
