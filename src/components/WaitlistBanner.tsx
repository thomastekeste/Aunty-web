import { isLive } from "@/lib/launchMode";
import InteractivePhone from "@/components/InteractivePhone";
import WaitlistForm from "@/components/WaitlistForm";

/**
 * Pre-launch email capture. Only renders in waitlist mode.
 * Email capture on the left, interactive app preview on the right (desktop);
 * stacked on mobile.
 */
export default function WaitlistBanner() {
  if (isLive) return null;

  return (
    <section className="relative bg-[#1A0F08] overflow-hidden">
      {/* Gold gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A04A] to-transparent" />

      {/* Soft gold glow */}
      <div
        className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] opacity-[0.07] blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4A04A 0%, transparent 60%)" }}
        aria-hidden
      />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-10 items-center">
          {/* ── Left: email capture ── */}
          <div className="order-1">
            <p className="font-body text-[11px] font-bold tracking-[3px] uppercase text-[#D4A04A] mb-4">
              Coming soon
            </p>
            <h2 className="font-display text-[1.9rem] md:text-[2.6rem] font-bold text-[#F3E9DD] leading-[1.05] tracking-[-0.02em] mb-4">
              The aunties are almost ready for you.
            </h2>
            <p className="font-body text-[15px] md:text-[16px] text-[#F3E9DD]/60 leading-relaxed mb-8 max-w-md">
              Join the list. Get 20% off your first month when the app drops.
            </p>

            <div className="max-w-md">
              <WaitlistForm source="hero" variant="dark" />
            </div>
          </div>

          {/* ── Right: interactive app preview ── */}
          <div className="order-2 flex justify-center md:justify-end">
            <InteractivePhone />
          </div>
        </div>
      </div>
    </section>
  );
}
