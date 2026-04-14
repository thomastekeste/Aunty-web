"use client";

import { useInView } from "@/hooks/useInView";
import PhoneMockup from "./PhoneMockup";
import MockTabBar from "./MockTabBar";
import { aunties } from "@/data/aunties";

const ritualColors = [
  { day: "M", color: "#D4A04A", label: "Wash" },
  { day: "T", color: "#C2456E", label: "Style" },
  { day: "W", color: "#7B3F6B", label: "Refresh" },
  { day: "T", color: "#2A7B7B", label: "Rest" },
  { day: "F", color: "#1A7A4A", label: "Scalp" },
  { day: "S", color: "#B85C2A", label: "Strength" },
  { day: "S", color: "#3D5A99", label: "Protect" },
];

export default function AppPreview() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 bg-[#FEF8EC] overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
            Inside The App
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2D1B0E] mb-4">
            Everything Your Hair Needs.<br className="hidden md:block" /> In One Place.
          </h2>
          <p className="font-body text-lg text-[#5C4433] max-w-2xl mx-auto">
            A personalized ritual calendar. Daily step-by-step guidance. Hair education
            from aunties that know your texture. Weekly check-ins that adapt your plan.
          </p>
        </div>

        {/* Three phone mockups in a row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6">
          {/* Phone 1: Ritual Calendar */}
          <div
            className="flex flex-col items-center gap-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.7s ease-out 0ms",
            }}
          >
            <PhoneMockup className="scale-[0.85] md:scale-90" screenBg="#FEF8EC">
              <div className="h-full flex flex-col p-5 pt-10 pb-14">
                <p className="font-body text-[8px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-3">
                  Your Week
                </p>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {ritualColors.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="font-body text-[8px] text-[#9E8C7A]">{d.day}</span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: d.color + "20" }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      </div>
                      <span className="font-body text-[6px] text-[#9E8C7A]">{d.label}</span>
                    </div>
                  ))}
                </div>

                {/* Detail card */}
                <div className="rounded-xl bg-white p-3 mt-auto" style={{ boxShadow: '0 2px 8px rgba(45,27,14,0.06)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#D4A04A]" />
                    <span className="font-display text-xs font-bold text-[#2D1B0E]">Monday &middot; Wash Day</span>
                  </div>
                  <p className="font-body text-[9px] text-[#5C4433] mb-2">
                    Ngozi guides your deep moisture reset.
                  </p>
                  <div className="flex gap-1.5">
                    {["Pre-poo", "Shampoo", "Condition", "Style"].map((s, i) => (
                      <span key={s} className="font-body text-[7px] px-1.5 py-0.5 rounded text-[#D4A04A]" style={{ backgroundColor: '#D4A04A18' }}>
                        {i + 1}. {s}
                      </span>
                    ))}
                  </div>
                </div>

                <MockTabBar activeTab="Ritual" />
              </div>
            </PhoneMockup>
            <div className="text-center">
              <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-1">Ritual Calendar</h3>
              <p className="font-body text-sm text-[#5C4433]">Every day has a purpose</p>
            </div>
          </div>

          {/* Phone 2: Council Verdict (center, larger) */}
          <div
            className="flex flex-col items-center gap-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.7s ease-out 150ms",
            }}
          >
            <PhoneMockup className="scale-[0.85] md:scale-100">
              <div className="h-full flex flex-col items-center justify-center p-5 pb-14 text-center relative">
                <p className="font-body text-[8px] tracking-[2px] uppercase text-[#D4A04A] mb-4">
                  Aunty's Advice
                </p>

                {/* Aunty speaking */}
                <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center" style={{ backgroundColor: "#D4A04A20", border: "2px solid #D4A04A40" }}>
                  <div className="w-4 h-4 rounded-full bg-[#D4A04A]" />
                </div>
                <p className="font-body text-[10px] font-semibold text-[#D4A04A] mb-1">Ngozi</p>
                <p className="font-body text-[8px] text-[rgba(254,248,236,0.4)] mb-4">The Bold One &middot; West Africa</p>

                <p className="font-display text-sm italic text-[#FEF8EC] leading-relaxed px-2">
                  &ldquo;Ahn ahn! I knew it. Dis hair is THIRSTY. I already know what you need — come, let me show you.&rdquo;
                </p>

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-6">
                  <div className="w-6 h-1.5 rounded-full bg-[#D4A04A]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(254,248,236,0.15)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(254,248,236,0.15)]" />
                </div>

                <MockTabBar activeTab="Chat" />
              </div>
            </PhoneMockup>
            <div className="text-center">
              <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-1">Personal Advice</h3>
              <p className="font-body text-sm text-[#5C4433]">Each aunty speaks to YOUR hair</p>
            </div>
          </div>

          {/* Phone 3: Check-in */}
          <div
            className="flex flex-col items-center gap-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.7s ease-out 300ms",
            }}
          >
            <PhoneMockup className="scale-[0.85] md:scale-90">
              <div className="h-full flex flex-col p-5 pt-10 pb-14 relative">
                <p className="font-body text-[8px] tracking-[2px] uppercase text-[#D4A04A] mb-3">
                  Weekly Check-in
                </p>

                {/* Aunty card */}
                <div className="rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(254,248,236,0.06)] p-4 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#3D5A9920", border: "1.5px solid #3D5A9940" }}>
                      <div className="w-3 h-3 rounded-full bg-[#3D5A99]" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] font-semibold text-[#3D5A99]">Denise</p>
                      <p className="font-body text-[7px] text-[rgba(254,248,236,0.3)]">The Wise One</p>
                    </div>
                  </div>
                  <p className="font-display text-xs italic text-[rgba(254,248,236,0.7)] leading-relaxed">
                    &ldquo;Hey sugar. How&rsquo;s your hair this week? Tell me everything.&rdquo;
                  </p>
                </div>

                {/* Mood buttons */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {["\u2728 Great", "\ud83d\ude0a Good", "\ud83d\ude15 Tough"].map((m) => (
                    <div key={m} className="rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(254,248,236,0.06)] p-2 text-center">
                      <span className="font-body text-[9px] text-[rgba(254,248,236,0.5)]">{m}</span>
                    </div>
                  ))}
                </div>

                {/* Photo area */}
                <div className="rounded-xl border-2 border-dashed border-[rgba(254,248,236,0.08)] p-4 text-center mt-auto">
                  <p className="font-body text-[9px] text-[rgba(254,248,236,0.3)]">
                    + Add a photo of your hair
                  </p>
                </div>

                <MockTabBar activeTab="Learn" />
              </div>
            </PhoneMockup>
            <div className="text-center">
              <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-1">Weekly Check-ins</h3>
              <p className="font-body text-sm text-[#5C4433]">Your aunties follow up</p>
            </div>
          </div>
        </div>

        {/* Guide to quiz */}
        <div
          className="text-center mt-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease-out 500ms",
          }}
        >
          <button
            onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#D4A04A] to-[#B8862E] text-[#1A0F08] font-body font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#D4A04A]/20"
          >
            Find Your Perfect Ritual
          </button>
          <p className="font-body text-sm text-[#9E8C7A] mt-3">
            Free 60-second consultation with your aunties
          </p>
        </div>
      </div>
    </section>
  );
}
