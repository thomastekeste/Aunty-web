/* eslint-disable @next/next/no-img-element */

export default function Hero() {
  return (
      <section className="relative bg-[#FDFCF8] pt-[72px] overflow-hidden min-h-[90svh] flex items-center">
        {/* Subtle gold glow on cream */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[600px] opacity-[0.07] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 55%)" }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-[10%] w-[400px] h-[350px] opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 60%)" }}
          aria-hidden
        />

        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Left: text ── */}
          <div
            style={{
              opacity: 0,
              animation: "introFade 700ms ease-out forwards",
              animationDelay: "300ms",
            }}
          >
            <h1
              className="font-display font-bold text-[#1A0F08] leading-[0.92] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              Hair &amp; skin care
              <br />
              <span className="italic font-light text-[#6B5040]">
                that finally knows
              </span>
              <br />
              your texture.
            </h1>

            <p className="font-body text-[15px] md:text-[17px] text-[#3D2B1A]/70 max-w-md leading-[1.75] mb-8">
              One AI-powered consultation that understands 4C coils,
              melanin-rich skin, and what makes them thrive.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
              <a
                href="#quiz"
                className="group cta-magnetic inline-flex items-center justify-center gap-2.5 px-10 py-4.5 rounded-full bg-[#1A0F08] text-[#FDFCF8] font-body font-semibold text-[13px] tracking-[1.5px] uppercase hover:bg-[#2C1A0E] hover:shadow-[0_18px_40px_-12px_rgba(26,15,8,0.3)] transition-all"
              >
                Get your formula
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <a
              href="#app"
              className="inline-flex items-center gap-2 font-body font-semibold text-[13px] tracking-[0.5px] text-[#C9903A] hover:text-[#1A0F08] transition-colors mb-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              Checkout our AI curls &amp; skin tracking app
            </a>

          </div>

          {/* ── Right: hero image ── */}
          <div
            className="relative"
            style={{
              opacity: 0,
              animation: "introFade 700ms ease-out forwards",
              animationDelay: "500ms",
            }}
          >
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_80px_-15px_rgba(26,15,8,0.12)]">
              <img
                src="/hero-v2.png"
                className="w-full h-auto block"
                alt="Black women and men with natural hair and melanin-rich skin — 4C coils, locs, TWA, wash day rituals"
              />
            </div>
          </div>

        </div>
      </section>
  );
}
