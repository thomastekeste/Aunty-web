export default function Footer() {
  return (
    <footer className="py-12 bg-[#1A0F08] border-t border-[rgba(254,248,236,0.04)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Aunty Curl Council" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-display text-base font-bold text-[#D4A04A]">
              Aunty Curl Council
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="#council" className="font-body text-sm text-[rgba(254,248,236,0.3)] hover:text-[rgba(254,248,236,0.6)] transition-colors">
              The Aunties
            </a>
            <a href="#features" className="font-body text-sm text-[rgba(254,248,236,0.3)] hover:text-[rgba(254,248,236,0.6)] transition-colors">
              How It Works
            </a>
            <a href="#quiz" className="font-body text-sm text-[rgba(254,248,236,0.3)] hover:text-[rgba(254,248,236,0.6)] transition-colors">
              Take The Quiz
            </a>
            <a href="#waitlist" className="font-body text-sm text-[rgba(254,248,236,0.3)] hover:text-[rgba(254,248,236,0.6)] transition-colors">
              Waitlist
            </a>
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-[rgba(254,248,236,0.2)]">
            &copy; {new Date().getFullYear()} Aunty Curl Council
          </p>
        </div>
      </div>
    </footer>
  );
}
