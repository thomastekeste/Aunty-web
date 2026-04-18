import Link from "next/link";

interface Props {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <main className="min-h-screen bg-[#FEF8EC] noise">
      {/* Soft glow */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D4A04A] opacity-[0.08] blur-[150px] pointer-events-none" />

      {/* Top nav */}
      <header className="sticky top-0 z-20 backdrop-blur-sm bg-[#FEF8EC]/80 border-b border-[rgba(26,15,8,0.08)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Aunty Curl Council" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-display text-base font-bold text-[#D4A04A] group-hover:opacity-80 transition-opacity">
              Aunty Curl Council
            </span>
          </Link>
          <Link
            href="/"
            className="font-body text-sm text-[rgba(26,15,8,0.5)] hover:text-[#D4A04A] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <article className="relative max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="font-body text-[#D4A04A] text-xs tracking-[4px] uppercase mb-4">
          Legal
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1A0F08] mb-3 leading-tight">
          {title}
        </h1>
        <p className="font-body text-sm text-[rgba(26,15,8,0.4)] mb-12">
          Last updated: {lastUpdated}
        </p>

        <div className="legal-prose font-body text-[rgba(26,15,8,0.75)] leading-relaxed space-y-6">
          {children}
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(26,15,8,0.08)] flex flex-wrap gap-6 text-sm">
          <Link href="/terms" className="text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/refund" className="text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors">
            Refund Policy
          </Link>
          <a
            href="mailto:hello@auntycurlcouncil.com"
            className="text-[rgba(26,15,8,0.4)] hover:text-[#D4A04A] transition-colors ml-auto"
          >
            hello@auntycurlcouncil.com
          </a>
        </div>
      </article>
    </main>
  );
}
