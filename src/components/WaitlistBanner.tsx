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
    <section className="relative bg-[#FDFCF8] overflow-hidden pt-[112px]">
      {/* Gold glow — subtle */}
      <div
        className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] opacity-[0.08] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4A04A 0%, transparent 60%)" }}
        aria-hidden
      />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-10 items-center">
          {/* ── Left: email capture ── */}
          <div className="order-1">
            <p className="font-body text-[11px] font-bold tracking-[3px] uppercase text-[#D4A04A] mb-4">
              Coming soon
            </p>
            <h1
              className="font-display font-bold text-[#1A0F08] leading-[0.95] tracking-[-0.04em] mb-5"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
            >
              The aunties are almost
              <br />
              <span className="italic font-light text-[#6B5040]">
                ready for you.
              </span>
            </h1>
            <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A]/70 leading-relaxed mb-8 max-w-md">
              Join the list. Get 20% off your first month when the app drops.
              Daily coaching from 7 culturally-aware aunties — built for your texture.
            </p>

            <div className="max-w-md">
              <WaitlistForm source="hero" variant="light" />
            </div>
          </div>

          {/* ── Right: interactive app preview ── */}
          <div className="order-2 flex justify-center md:justify-end">
            <InteractivePhone />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(26,15,8,0.08)] to-transparent" />
    </section>
  );
}
