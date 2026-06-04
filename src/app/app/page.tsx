import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractivePhone from "@/components/InteractivePhone";
import ScrollReveal from "@/components/ScrollReveal";
import WaitlistForm from "@/components/WaitlistForm";
import Link from "next/link";
import { aunties } from "@/data/aunties";

export const metadata = {
  title: "The App — Aunty Council",
  description:
    "Seven culturally-aware aunties living in your phone. Daily hair and skin tracking, personalized routines, and AI chat that actually knows your texture.",
};

const FEATURES = [
  {
    label: "Daily check-in",
    title: "Track your hair, every single day",
    body:
      "Snap a quick photo, log how your scalp feels, mark a wash day, note breakage or growth. The app learns your texture's rhythm and notices changes before you do.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    label: "AI Aunties",
    title: "Chat with seven aunties — each one a different voice",
    body:
      "Pick the aunty that matches your moment. Need a straight answer? Ngozi. Feeling overwhelmed? Senayt. Want hyped up? Carmen. They each carry the wisdom of a region, not a stereotype.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 12c0 4.4-4 8-9 8-1.2 0-2.3-.2-3.4-.6L3 21l1.5-4.6C3.5 15.1 3 13.6 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
      </svg>
    ),
  },
  {
    label: "Routine planner",
    title: "Your week, planned around your hair",
    body:
      "Wash days, deep conditioning, protein treatments, scalp massages. The app builds your weekly routine and reminds you the night before — no more guessing what your hair needs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    label: "Product memory",
    title: "Every product, scored by your hair",
    body:
      "Log what you use. Rate how it performed. The app learns what your texture loves and what it rejects, then refines your formula every month so you stop wasting money on the wrong things.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 7L9 18l-5-5" />
      </svg>
    ),
  },
  {
    label: "Progress vault",
    title: "See your hair change over weeks and months",
    body:
      "Side-by-side photos, length-check measurements, breakage trends, moisture scores. Visible proof that the work is working — or signals that something needs to change.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    label: "Texture library",
    title: "Lessons made for your texture, not against it",
    body:
      "Curated guides on porosity, density, shrinkage, protective styles, scalp health — written for 4C, 4B, 4A, 3C, and everything in between. No more reading articles built for a hair type that isn't yours.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9903A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
];

const STEPS = [
  { num: "01", title: "Download the app",  body: "Set up your profile — texture, porosity, scalp type, and goals. Takes about 2 minutes." },
  { num: "02", title: "Meet your aunty", body: "Based on what you need most, we match you with the aunty whose voice fits the moment." },
  { num: "03", title: "Track daily",     body: "Check in each morning. Snap, rate, note. The app starts to learn your rhythm in 7–10 days." },
  { num: "04", title: "Refine forever",  body: "Every month, your routine adjusts. Better products, better habits, visible proof in the vault." },
];

export default function AppPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDFCF8] pt-[112px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[700px] h-[600px] opacity-[0.08] blur-[120px] pointer-events-none"
            style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 55%)" }}
            aria-hidden
          />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
                The App
              </p>
              <h1
                className="font-display font-bold text-[#1A0F08] leading-[0.95] tracking-[-0.04em] mb-6"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
              >
                Seven aunties.
                <br />
                <span className="italic font-light text-[#6B5040]">One app</span>
                <br />
                that lives with your hair.
              </h1>
              <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A]/70 max-w-md leading-[1.75] mb-8">
                A culturally-aware AI companion for your hair and skin — tracks
                your texture day by day, learns your rhythm, adjusts your routine,
                and gives you real advice in the voice that actually sounds like home.
              </p>
              <div className="max-w-md">
                <WaitlistForm source="app-hero" variant="light" />
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <InteractivePhone />
            </div>
          </div>
        </section>

        {/* ── 7 aunties grid ── */}
        <section id="aunties" className="bg-[#FDFCF8] border-t border-[#1A0F08]/[0.06] py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="max-w-2xl mb-12 md:mb-16">
                <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
                  Culturally aware
                </p>
                <h2
                  className="font-display font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-5"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)" }}
                >
                  Seven voices.
                  <br />
                  <span className="italic font-light text-[#6B5040]">One council that knows your roots.</span>
                </h2>
                <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A]/65 leading-[1.7]">
                  Each aunty is rooted in a specific region — her language, her remedies, her
                  approach. You pick who speaks to you in the moment. They&apos;re AI, but
                  the wisdom they carry is real, sourced from generations of textured-hair care.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {aunties.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 60}>
                  <div
                    className="group relative h-full rounded-2xl p-6 border border-[#1A0F08]/[0.08] bg-[#FDFCF8] hover:border-[#1A0F08]/[0.15] hover:shadow-[0_18px_40px_-16px_rgba(26,15,8,0.12)] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-[18px]"
                        style={{ background: a.bg, color: a.color }}
                      >
                        {a.name[0]}
                      </div>
                      <div>
                        <p className="font-display text-[17px] font-bold text-[#1A0F08] leading-tight">
                          Aunty {a.name}
                        </p>
                        <p className="font-body text-[11px] tracking-[1px] uppercase text-[#9E8C7A] mt-0.5">
                          {a.region}
                        </p>
                      </div>
                    </div>
                    <p className="font-body text-[13px] font-semibold text-[#C9903A] tracking-[0.5px] mb-2">
                      {a.title}
                    </p>
                    <p className="font-body text-[14px] text-[#3D2B1A]/70 leading-[1.65] mb-4">
                      {a.specialty}
                    </p>
                    <div className="pt-4 border-t border-[#1A0F08]/[0.06]">
                      <p className="font-body italic text-[13px] text-[#1A0F08]/75 leading-[1.55]">
                        &ldquo;{a.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features deep dive ── */}
        <section className="bg-[#1A0F08] py-20 md:py-28 relative overflow-hidden">
          <div
            className="absolute top-[20%] right-[10%] w-[500px] h-[500px] opacity-[0.08] blur-[120px] pointer-events-none"
            style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 55%)" }}
            aria-hidden
          />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="max-w-2xl mb-14 md:mb-20">
                <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
                  What it does
                </p>
                <h2
                  className="font-display font-bold text-[#FDFCF8] leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)" }}
                >
                  Six things working in the background of your hair life.
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {FEATURES.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 60}>
                  <div className="h-full rounded-2xl p-6 md:p-7 bg-[#FDFCF8]/[0.04] border border-[#FDFCF8]/[0.08] hover:bg-[#FDFCF8]/[0.06] transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#C9903A]/12 border border-[#C9903A]/20 flex items-center justify-center mb-5">
                      {f.icon}
                    </div>
                    <p className="font-body text-[10px] font-bold tracking-[2px] uppercase text-[#C9903A] mb-2">
                      {f.label}
                    </p>
                    <h3 className="font-display text-[18px] md:text-[19px] font-bold text-[#FDFCF8] leading-snug mb-3">
                      {f.title}
                    </h3>
                    <p className="font-body text-[14px] text-[#9E8C7A] leading-[1.7]">
                      {f.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-[#FDFCF8] py-20 md:py-28">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="max-w-2xl mb-14">
                <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-4">
                  How it works
                </p>
                <h2
                  className="font-display font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)" }}
                >
                  Four steps. Then a lifetime of better hair days.
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              {STEPS.map((s, i) => (
                <ScrollReveal key={s.num} delay={i * 80}>
                  <div className="flex gap-5">
                    <span className="flex-shrink-0 font-display text-[44px] md:text-[52px] font-bold leading-none text-[#C9903A]/80">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-display text-[19px] md:text-[21px] font-bold text-[#1A0F08] leading-snug mb-2">
                        {s.title}
                      </h3>
                      <p className="font-body text-[14px] md:text-[15px] text-[#3D2B1A]/70 leading-[1.7]">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-[#F3E9DD] py-20 md:py-24">
          <div className="max-w-[600px] mx-auto px-6 md:px-10 text-center">
            <h2
              className="font-display font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.8rem)" }}
            >
              Your aunties are waiting.
            </h2>
            <p className="font-body text-[15px] md:text-[16px] text-[#6B5040] max-w-lg mx-auto leading-[1.7] mb-8">
              Join the waitlist and get <span className="text-[#C9903A] font-semibold">20% off your first month</span> when the app drops.
            </p>
            <div className="max-w-md mx-auto">
              <WaitlistForm source="app-footer" variant="light" />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
