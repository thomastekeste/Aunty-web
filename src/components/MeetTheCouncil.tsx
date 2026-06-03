import { aunties } from "@/data/aunties";
import AuntyPortrait from "@/components/AuntyPortrait";
import type { AuntyId } from "@/components/AuntyPortrait";

export default function MeetTheCouncil() {
  return (
    <section className="py-14 md:py-16 bg-[#FDFCF8] border-y border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-[#D4A04A] mb-2">
            The Council
          </p>
          <h2 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-[#1A0F08] tracking-[-0.02em] leading-tight">
            Seven aunties. Built for your texture.
          </h2>
        </div>

        {/* Scrollable aunty row */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2">
          {aunties.map((aunty) => (
            <div
              key={aunty.id}
              className="flex-shrink-0 w-[148px] md:w-[168px] rounded-[20px] p-4 flex flex-col items-center text-center transition-all duration-200 hover:shadow-[0_6px_24px_-8px_rgba(26,15,8,0.12)] hover:-translate-y-0.5"
              style={{
                backgroundColor: aunty.bg,
                border: "1px solid rgba(26,15,8,0.06)",
              }}
            >
              {/* Portrait */}
              <div className="mb-3">
                <AuntyPortrait
                  auntyId={aunty.id as AuntyId}
                  size={72}
                  bg={aunty.bg}
                />
              </div>

              {/* Name */}
              <p className="font-display text-[14px] font-bold text-[#1A0F08] mb-0.5 leading-tight">
                {aunty.name}
              </p>

              {/* Region */}
              <p className="font-body text-[9px] font-semibold uppercase tracking-[1.5px] text-[#6B5040] mb-1.5">
                {aunty.region}
              </p>

              {/* Title badge */}
              <span
                className="font-body text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-2.5"
                style={{
                  backgroundColor: `${aunty.color}18`,
                  color: aunty.color,
                }}
              >
                {aunty.title}
              </span>

              {/* Quote */}
              <p className="font-body text-[11px] italic text-[#3D2B1A]/65 leading-relaxed line-clamp-2">
                &ldquo;{aunty.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
