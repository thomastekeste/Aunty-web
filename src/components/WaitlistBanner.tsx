import { isLive } from "@/lib/launchMode";
import InteractivePhone from "@/components/InteractivePhone";
import WaitlistForm from "@/components/WaitlistForm";

/**
 * Pre-launch email capture — cream background, sits at top of page.
 * Email capture on the left, interactive app preview on the right (desktop);
 * stacked on mobile. Only renders in waitlist mode.
 */
export default function WaitlistBanner() {
  if (isLive) return null;

  return (
    <section className="relative bg-[#FDFCF8] overflow-hidden">
      {/* Gold glow — subtle */}
      <div
        className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] opacity-[0.08] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4A04A 0%, transparent 60%)" }}
        aria-hidden
      />

      <div className="relative w-full max-w-[1300px] mx-auto px-6 md:px-10 pb-12 md:pb-16">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-14 items-center">
          {/* ── Left: email capture ── */}
          <div>
            <p className="font-body text-[11px] font-bold tracking-[3px] uppercase text-[#D4A04A] mb-4">
              Coming soon
            </p>
            <h1
              className="font-display font-bold text-[#1A0F08] leading-[0.95] tracking-[-0.04em] mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
            >
              The aunties are almost
              <br />
              <span className="italic font-light text-[#6B5040]">
                ready for you.
              </span>
            </h1>
            <p className="font-body text-[14px] md:text-[15px] text-[#3D2B1A]/70 leading-relaxed mb-7 max-w-md">
              Join the list. Get 20% off your first month when the app drops.
              Daily coaching from 7 culturally-aware aunties — built for your texture.
            </p>

            <div className="max-w-md">
              <WaitlistForm source="hero" variant="light" />
            </div>
          </div>

          {/* ── Right: interactive app preview (hidden on mobile, scaled on desktop) ── */}
          <div className="hidden md:flex justify-end" style={{ transform: "scale(0.78)", transformOrigin: "top right" }}>
            <InteractivePhone />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(26,15,8,0.08)] to-transparent" />
    </section>
  );
}
