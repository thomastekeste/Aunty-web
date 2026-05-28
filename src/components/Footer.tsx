import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 bg-[#FDFCF8] border-t border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-[rgba(26,15,8,0.06)]">
          <Link href="/" className="group">
            <Image src="/logo.png" alt="Aunty Council" width={200} height={200} className="object-contain group-hover:opacity-60 transition-opacity" style={{ height: "48px", width: "auto" }} />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Link href="/app" className="font-body text-[14px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">
              The App
            </Link>
            <Link href="/science" className="font-body text-[14px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">
              Our Science
            </Link>
            <Link href="/products" className="font-body text-[14px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">
              Shop
            </Link>
            <a href="/products" className="font-body text-[14px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">
              Shop All
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/terms"   className="font-body text-[13px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">Terms</Link>
            <Link href="/privacy" className="font-body text-[13px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">Privacy</Link>
            <Link href="/refund"  className="font-body text-[13px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">Refund</Link>
            <a href="mailto:hello@auntycurlcouncil.com" className="font-body text-[13px] text-[#6B5040] hover:text-[#2D1B0E] transition-colors">
              hello@auntycurlcouncil.com
            </a>
          </div>
          <p className="font-body text-[13px] text-[#6B5040]">
            &copy; {new Date().getFullYear()} Aunty Council
          </p>
        </div>
      </div>
    </footer>
  );
}
