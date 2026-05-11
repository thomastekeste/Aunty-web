import PhoneMockup from "@/components/PhoneMockup";

export default function Hero() {
  const options = [
    { label: "4C — tight coils", selected: true },
    { label: "4B — zig-zag coils", selected: false },
    { label: "4A — springy curls", selected: false },
    { label: "3C — corkscrew", selected: false },
  ];

  return (
    <section className="relative bg-[#FDFCF8] pt-[72px] overflow-hidden min-h-[90svh] flex items-center">
      {/* Subtle gold glow — top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[600px] opacity-[0.08] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9903A 0%, transparent 55%)" }}
        aria-hidden
      />
      {/* Subtle gold glow — bottom-left */}
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

        {/* ── Right: phone mockup ── */}
        <div
          className="relative flex justify-center md:justify-end"
          style={{
            opacity: 0,
            animation: "introFade 700ms ease-out forwards",
            animationDelay: "500ms",
          }}
        >
          {/* Gold glow behind phone */}
          <div
            className="absolute inset-0 opacity-[0.12] blur-[80px] pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 60%, #C9903A 0%, transparent 65%)" }}
            aria-hidden
          />

          <div
            className="relative"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <PhoneMockup screenBg="#FDFCF8" className="w-[220px] md:w-[260px]">
              {/* Quiz UI */}
              <div className="flex flex-col h-full p-4 pt-10 bg-[#FDFCF8]">

                {/* Aunty avatar row */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full bg-[#C9903A]/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-body font-bold text-[10px] text-[#C9903A]">A</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[9px] text-[#1A0F08] leading-none">Aunty Ife</p>
                    <p className="font-body text-[8px] text-[#6B5040] leading-none mt-0.5">Your consultation guide</p>
                  </div>
                </div>

                {/* Question */}
                <p className="font-display font-bold text-[12px] text-[#1A0F08] leading-[1.3] mb-4">
                  What&apos;s your<br />hair texture?
                </p>

                {/* Options */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {options.map((opt) => (
                    <div
                      key={opt.label}
                      className={`px-3 py-2 rounded-xl text-[10px] font-body font-medium leading-none cursor-default ${
                        opt.selected
                          ? "bg-[#1A0F08] text-[#FDFCF8]"
                          : "bg-transparent border border-[rgba(26,15,8,0.15)] text-[#3D2B1A]"
                      }`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>

                {/* Bottom: progress + label */}
                <div className="mt-4 pt-3 border-t border-[rgba(26,15,8,0.06)]">
                  <div className="flex gap-1 mb-1.5">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full"
                        style={{ backgroundColor: i === 0 ? "#C9903A" : "rgba(26,15,8,0.1)" }}
                      />
                    ))}
                  </div>
                  <p className="font-body text-[9px] text-[#6B5040]">Question 1 of 7</p>
                </div>

              </div>
            </PhoneMockup>
          </div>
        </div>

      </div>
    </section>
  );
}
