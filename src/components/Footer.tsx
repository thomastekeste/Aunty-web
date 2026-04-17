import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 bg-[#1A0F08] border-t border-[rgba(254,248,236,0.04)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top row: logo + product nav */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-8 border-b border-[rgba(254,248,236,0.04)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Aunty Curl Council" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-display text-base font-bold text-[#D4A04A] group-hover:opacity-80 transition-opacity">
              Aunty Curl Council
            </span>
          </Link>

          {/* Product links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href="#features" className="font-body text-sm text-[rgba(254,248,236,0.4)] hover:text-[#D4A04A] transition-colors">
              How It Works
            </a>
            <a href="#council" className="font-body text-sm text-[rgba(254,248,236,0.4)] hover:text-[#D4A04A] transition-colors">
              The Aunties
            </a>
            <a href="#quiz" className="font-body text-sm text-[rgba(254,248,236,0.4)] hover:text-[#D4A04A] transition-colors">
              Take The Quiz
            </a>
            <a href="#pricing" className="font-body text-sm text-[rgba(254,248,236,0.4)] hover:text-[#D4A04A] transition-colors">
              Pricing
            </a>
            <a href="#waitlist" className="font-body text-sm text-[rgba(254,248,236,0.4)] hover:text-[#D4A04A] transition-colors">
              Get Notified
            </a>
          </div>
        </div>

        {/* Bottom row: legal + copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/terms" className="font-body text-xs text-[rgba(254,248,236,0.35)] hover:text-[#D4A04A] transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="font-body text-xs text-[rgba(254,248,236,0.35)] hover:text-[#D4A04A] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund" className="font-body text-xs text-[rgba(254,248,236,0.35)] hover:text-[#D4A04A] transition-colors">
              Refund Policy
            </Link>
            <a
              href="mailto:hello@auntycurlcouncil.com"
              className="font-body text-xs text-[rgba(254,248,236,0.35)] hover:text-[#D4A04A] transition-colors"
            >
              hello@auntycurlcouncil.com
            </a>
          </div>

          <p className="font-body text-xs text-[rgba(254,248,236,0.25)]">
            &copy; {new Date().getFullYear()} Aunty Curl Council
          </p>
        </div>
      </div>
    </footer>
  );
}
