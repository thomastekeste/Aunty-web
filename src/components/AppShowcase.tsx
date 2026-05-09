"use client";

import InteractivePhone from "./InteractivePhone";
import ScrollReveal from "./ScrollReveal";

export default function AppShowcase() {
  return (
    <section id="app" className="relative bg-[#1A0F08] py-20 md:py-28 overflow-hidden">
      {/* Gold glow */}
      <div
        className="absolute top-[20%] left-[30%] w-[500px] h-[500px] opacity-[0.08] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 55%)" }}
        aria-hidden
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
              The App
            </p>
            <h2 className="font-display text-[2rem] md:text-[2.8rem] font-bold text-[#FDFCF8] leading-[1.05] tracking-[-0.025em] mb-4">
              Your AI curls &amp; skin tracking app
            </h2>
            <p className="font-body text-[14px] md:text-[16px] text-[#FDFCF8]/50 max-w-lg mx-auto leading-relaxed">
              Track wash days, get personalized routines, chat with your Aunties,
              and watch your progress week by week.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Phone */}
          <ScrollReveal delay={100}>
            <div className="flex items-center justify-center">
              <InteractivePhone />
            </div>
          </ScrollReveal>

          {/* Features list */}
          <ScrollReveal delay={200}>
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 8v4l3 3" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  ),
                  title: "Wash day tracking",
                  desc: "Never miss a wash day. Your schedule, your routine, all in one place.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                  title: "Chat with your Aunties",
                  desc: "Get real advice from AI personalities who understand your texture.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                  title: "Progress tracking",
                  desc: "See how your hair and skin improve over weeks and months.",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                    </svg>
                  ),
                  title: "Personalized products",
                  desc: "Curated product recommendations matched to your exact needs.",
                },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#C9903A]/10 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-[14px] text-[#FDFCF8] mb-1">
                      {f.title}
                    </h3>
                    <p className="font-body text-[13px] text-[#FDFCF8]/45 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
