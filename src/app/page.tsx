import Navbar from "@/components/Navbar";
import MeetTheAunties from "@/components/MeetTheAunties";
import WaitlistSection from "@/components/WaitlistSection";
import ShopSection from "@/components/ShopSection";
import ProductFeature from "@/components/ProductFeature";
import FAQ from "@/components/FAQ";
import AppShowcase from "@/components/AppShowcase";
import StickyBar from "@/components/StickyBar";
import Footer from "@/components/Footer";
import { isLive } from "@/lib/launchMode";

export default function Home() {
  return (
    <main>
      <Navbar />
      <MeetTheAunties />
      {/* Section 1 — app waitlist (email capture) */}
      <WaitlistSection />
      {/* Section 2 — the shop (dropship, ad destination) */}
      <ShopSection />
      <ProductFeature />
      <AppShowcase />
      <FAQ />
      <Footer />
      <StickyBar />
    </main>
  );
}
