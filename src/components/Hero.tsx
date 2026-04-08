"use client";

import { useState } from "react";
import WordReveal from "./WordReveal";
import PhoneMockup from "./PhoneMockup";
import { aunties } from "@/data/aunties";

export default function Hero() {
  const [overlineDone, setOverlineDone] = useState(false);
  const [headlineDone, setHeadlineDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A0F08] noise pt-16">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#D4A04A] opacity-[0.04] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2456E] opacity-[0.03] blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#3D5A99] opacity-[0.03] blur-[100px]" />
      </div>

      {/* Floating aunty orbs — subtle background */}
      {aunties.map((a, i) => (
        <div
          key={a.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 80 + (i % 3) * 40,
            height: 80 + (i % 3) * 40,
            left: `${8 + i * 13}%`,
            top: `${15 + (i % 4) * 18}%`,
            backgroundColor: a.color,
            opacity: 0.05,
            filter: "blur(50px)",
            animation: `float ${18 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <WordReveal
              text="The Council Awaits"
              as="p"
              stagger={100}
              startDelay={300}
              onComplete={() => setOverlineDone(true)}
              className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-6"
            />

            {overlineDone && (
              <div className="mb-6">
                <WordReveal
                  text="Your Aunties Have Been Waiting"
                  as="h1"
                  stagger={110}
                  onComplete={() => setHeadlineDone(true)}
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-shimmer leading-[1.05]"
                  cursor
                />
              </div>
            )}

            {headlineDone && (
              <WordReveal
                text="Seven women from across the diaspora. Real hair wisdom, not algorithms. A personalized ritual \u2014 just for your curls."
                as="p"
                stagger={60}
                startDelay={200}
                onComplete={() => setSubtitleDone(true)}
                className="font-body text-lg md:text-xl text-[rgba(254,248,236,0.55)] max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
              />
            )}

            {subtitleDone && (
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in-up">
                <a
                  href="#quiz"
                  className="animate-pulse-glow inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#D4A04A] text-[#1A0F08] font-body font-semibold text-base hover:bg-[#B8862E] transition-colors"
                >
                  Take The Free Quiz
                </a>
                <a
                  href="#council"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[rgba(254,248,236,0.12)] text-[#FEF8EC] font-body font-medium text-base hover:border-[rgba(254,248,236,0.25)] hover:bg-[rgba(254,248,236,0.04)] transition-all"
                >
                  Meet The Aunties
                </a>
              </div>
            )}

            {/* Social proof teaser */}
            {subtitleDone && (
              <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start animate-fade-in-up delay-300">
                <div className="flex -space-x-2">
                  {aunties.slice(0, 4).map((a) => (
                    <div
                      key={a.id}
                      className="w-7 h-7 rounded-full border-2 border-[#1A0F08]"
                      style={{ backgroundColor: a.color + "40" }}
                    >
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: a.color + "30" }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: a.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-body text-sm text-[rgba(254,248,236,0.4)]">
                  <span className="text-[#D4A04A] font-semibold">2,400+</span> on the waitlist
                </p>
              </div>
            )}
          </div>

          {/* Right: Phone mockup */}
          <div
            className="flex-shrink-0 hidden md:block"
            style={{ animation: "phonePulse 6s ease-in-out infinite" }}
          >
            <PhoneMockup screenBg="#FEF8EC">
              {/* Faithful recreation of the actual app HomeScreen */}
              <div className="h-full flex flex-col bg-[#FEF8EC] overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-5 pt-3 pb-1">
                  <span className="font-body text-[9px] font-semibold text-[#2D1B0E]">9:41</span>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="#2D1B0E"><rect x="0" y="4" width="2.5" height="5" rx="0.5"/><rect x="3.2" y="2.5" width="2.5" height="6.5" rx="0.5"/><rect x="6.4" y="1" width="2.5" height="8" rx="0.5"/><rect x="9.5" y="0" width="2.5" height="9" rx="0.5" opacity="0.3"/></svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#2D1B0E"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                    <div className="flex items-center">
                      <div className="w-5 h-[9px] rounded-[2px] border border-[#2D1B0E] relative">
                        <div className="absolute inset-[1px] rounded-[1px] bg-[#2D1B0E]" style={{ width: '70%' }} />
                      </div>
                      <div className="w-[1.5px] h-[4px] bg-[#2D1B0E] rounded-r-full ml-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-hidden px-4 pt-2 pb-14">
                  {/* Top bar: greeting + avatar */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-display text-[15px] font-bold text-[#2D1B0E] leading-tight">Good morning, Queen</p>
                      <p className="font-body text-[9px] text-[#9E8C7A] mt-0.5">Week 3 of your journey</p>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '2px solid #D4A04A40', backgroundColor: '#D4A04A15' }}>
                      <div className="w-3.5 h-3.5 rounded-full bg-[#D4A04A]" />
                    </div>
                  </div>

                  {/* Today's Ritual — THE HERO CARD */}
                  <div className="rounded-xl bg-white border-l-[3px] border-l-[#D4A04A] p-3.5 mb-3.5" style={{ boxShadow: '0 2px 8px rgba(45,27,14,0.06)' }}>
                    <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-2">Today&rsquo;s Ritual</p>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-[7px] h-[7px] rounded-full bg-[#D4A04A]" />
                      <span className="font-display text-[14px] font-bold text-[#2D1B0E] flex-1">Wash Day</span>
                      <span className="font-body text-[7px] font-semibold px-2 py-0.5 rounded-full text-[#D4A04A]" style={{ backgroundColor: '#D4A04A18' }}>45 min</span>
                    </div>
                    <p className="font-body text-[9px] text-[#5C4433] mb-2.5 leading-relaxed">Deep cleanse &amp; moisture reset.</p>
                    <div className="h-[26px] rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #D4A04A, #B8862E)' }}>
                      <span className="font-body text-[8px] font-bold text-[#1A0F08]">Start Today&rsquo;s Ritual</span>
                    </div>
                  </div>

                  {/* Week Progress */}
                  <div className="mb-3.5">
                    <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#9E8C7A] mb-2">This Week</p>
                    <div className="flex justify-between">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => {
                        const dayColors = ["#2A7B7B", "#D4A04A", "#1A7A4A", "#3D5A99", "#7B3F6B", "#C2456E", "#B85C2A"];
                        const isPast = i < 2;
                        const isToday = i === 2;
                        return (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <div
                              className="w-[22px] h-[22px] rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: isPast ? dayColors[i] : 'transparent',
                                border: isToday ? `2px solid ${dayColors[i]}` : isPast ? 'none' : '1px solid #E8DCC8',
                              }}
                            />
                            <span className={`font-body text-[7px] ${isToday ? 'font-semibold text-[#2D1B0E]' : 'text-[#9E8C7A]'}`}>{d}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ask Aunty — Quick question chips */}
                  <div className="mb-3.5">
                    <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-2">Ask Ngozi</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["My hair feels dry", "Deep conditioner rec?", "Shea butter tips"].map((q) => (
                        <span
                          key={q}
                          className="font-body text-[7px] px-2 py-1 rounded-full"
                          style={{ border: '1px solid #D4A04A', backgroundColor: '#FDF6E8', color: '#7A5E00' }}
                        >
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Weekly Check-in card (dark) */}
                  <div className="rounded-xl p-3" style={{ background: 'linear-gradient(135deg, #2D1B0E, #1A0F08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ border: '1.5px solid #D4A04A40', backgroundColor: '#D4A04A15' }}>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D4A04A]" />
                      </div>
                      <div>
                        <p className="font-body text-[9px] font-semibold text-[#FEF8EC]">Weekly Check-in</p>
                        <p className="font-body text-[7px] text-[rgba(254,248,236,0.5)]">How&rsquo;s your hair this week?</p>
                      </div>
                    </div>
                    <div className="h-[22px] rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #D4A04A, #B8862E)' }}>
                      <span className="font-body text-[7px] font-bold text-[#2D1B0E]">Check In</span>
                    </div>
                  </div>
                </div>

                {/* Bottom tab bar — real SVG icons from the app */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[rgba(45,27,14,0.06)] px-1 pt-1.5 pb-3">
                  <div className="flex justify-around items-center">
                    {/* Home (active) */}
                    <div className="flex flex-col items-center gap-[2px] relative">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15C15 14.4477 14.5523 14 14 14H10C9.44772 14 9 14.4477 9 15V21H4C3.44772 21 3 20.5523 3 20V10.5Z" stroke="#D4A04A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-body text-[6px] font-semibold text-[#D4A04A]">Home</span>
                      <div className="w-[4px] h-[4px] rounded-full" style={{ background: 'linear-gradient(135deg, #D4A04A, #B8862E)' }} />
                    </div>

                    {/* Ritual */}
                    <div className="flex flex-col items-center gap-[2px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" stroke="#9E8C7A" strokeWidth="2"/>
                        <path d="M4 10H20" stroke="#9E8C7A" strokeWidth="2"/>
                        <path d="M8 3V7" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 3V7" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 14H11" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M13 14H15" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 17H11" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-body text-[6px] text-[#9E8C7A]">Ritual</span>
                    </div>

                    {/* Products */}
                    <div className="flex flex-col items-center gap-[2px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 6H21" stroke="#9E8C7A" strokeWidth="2"/>
                        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-body text-[6px] text-[#9E8C7A]">Products</span>
                    </div>

                    {/* Chat */}
                    <div className="flex flex-col items-center gap-[2px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 12C21 16.4183 16.9706 20 12 20C10.8053 20 9.66162 19.8004 8.6085 19.4341L3 21L4.48953 16.3754C3.55037 15.0911 3 13.5956 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 11.5H8.01" stroke="#9E8C7A" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M12 11.5H12.01" stroke="#9E8C7A" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M16 11.5H16.01" stroke="#9E8C7A" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                      <span className="font-body text-[6px] text-[#9E8C7A]">Chat</span>
                    </div>

                    {/* Journey */}
                    <div className="flex flex-col items-center gap-[2px]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21C12 21 3 14.5 3 8.5C3 5.46243 5.46243 3 8.5 3C10.2817 3 11.8578 3.88213 12.8066 5.22022" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 21C12 21 21 14.5 21 8.5C21 5.46243 18.5376 3 15.5 3C13.7183 3 12.1422 3.88213 11.1934 5.22022" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 8V14" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 11H15" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-body text-[6px] text-[#9E8C7A]">Journey</span>
                    </div>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FEF8EC] to-transparent" />
    </section>
  );
}
