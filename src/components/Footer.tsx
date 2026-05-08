import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 bg-[#FDFCF8] border-t border-[rgba(26,15,8,0.06)]">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-[rgba(26,15,8,0.06)]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.png" alt="Aunty Council" width={24} height={24} className="rounded-lg object-cover" />
            <span className="font-display text-[14px] font-bold text-[#2D1B0E] group-hover:opacity-60 transition-opacity">
              Aunty Council
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href="/#council" className="font-body text-[13px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
              The Aunties
            </a>
            <a href="/#science" className="font-body text-[13px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
              Our Science
            </a>
            <Link href="/products" className="font-body text-[13px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
              Shop
            </Link>
            <a href="#quiz" className="font-body text-[13px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
              Get Your Formula
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/terms"   className="font-body text-[12px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">Terms</Link>
            <Link href="/privacy" className="font-body text-[12px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">Privacy</Link>
            <Link href="/refund"  className="font-body text-[12px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">Refund</Link>
            <a href="mailto:hello@auntycurlcouncil.com" className="font-body text-[12px] text-[#9E8C7A] hover:text-[#2D1B0E] transition-colors">
              hello@auntycurlcouncil.com
            </a>
          </div>
          <p className="font-body text-[12px] text-[#9E8C7A]">
            &copy; {new Date().getFullYear()} Aunty Council
          </p>
        </div>
      </div>
    </footer>
  );
}
