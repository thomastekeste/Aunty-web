"use client";

import InteractivePhone from "./InteractivePhone";

interface AppPreviewProps {
  hideCta?: boolean;
}

export default function AppPreview({ hideCta = false }: AppPreviewProps) {
  const features = [
    { num: "1/", title: "Care Calendar", desc: "Every day has a purpose — wash day, scalp day, protective style day. Your aunty maps the whole week." },
    { num: "2/", title: "Chat Your Aunties", desc: "Ask Ngozi why your curls are dry. Ask Marcia about shrinkage. Real advice, not a chatbot." },
    { num: "3/", title: "Track Progress", desc: "Log your hair weekly. Watch your routine work over time. Your aunties follow up." },
    { num: "4/", title: "Hair School", desc: "Learn the LOC method. Understand porosity. Know why your curls do what they do." },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F7F5F0]">
      <div className="max-w-[1400px] mx-auto px-8">

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Phone — left side */}
          <div className="flex-shrink-0">
            <InteractivePhone />
          </div>

          {/* Content — right side */}
          <div className="flex-1 max-w-lg">
            <p className="font-body text-[11px] font-semibold tracking-[4px] uppercase text-[#6B5040] mb-3">
              The Aunty Council App
            </p>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] font-bold text-[#2D1B0E] leading-[1.1] tracking-[-0.02em] mb-4">
              Your aunties, in your pocket.
            </h2>
            <p className="font-body text-[15px] text-[#6B5040] leading-[1.7] mb-8">
              Order the products — then let the app track your progress and guide you through
              every wash day.
            </p>

            {/* Numbered feature list — Prose "how it works" style */}
            <div className="flex flex-col gap-6">
              {features.map((f) => (
                <div key={f.num} className="flex gap-4">
                  <span className="font-display text-[15px] font-bold text-[#6B5040] flex-shrink-0 w-6">
                    {f.num}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold text-[#2D1B0E] mb-0.5">{f.title}</p>
                    <p className="font-body text-[13px] text-[#6B5040] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download links */}
            <div className="flex items-center gap-6 mt-8">
              <span className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5 cursor-pointer hover:opacity-60 transition-opacity">
                App Store
              </span>
              <span className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-[#2D1B0E] border-b border-[#2D1B0E] pb-0.5 cursor-pointer hover:opacity-60 transition-opacity">
                Google Play
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        {!hideCta && (
          <div className="text-center mt-16">
            <a href="/products"
              className="px-7 py-3.5 rounded-full bg-[#2D1B0E] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1px] uppercase hover:bg-[#1A0F08] transition-colors inline-block"
            >
              Shop Now
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
