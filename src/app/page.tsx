import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import MeetTheCouncil from "@/components/MeetTheCouncil";
import WaitlistBanner from "@/components/WaitlistBanner";
import Manifesto from "@/components/Manifesto";
import ProductFeature from "@/components/ProductFeature";
import PhotoBreak from "@/components/PhotoBreak";
import WhyAunty from "@/components/WhyAunty";
import FAQ from "@/components/FAQ";
import AppShowcase from "@/components/AppShowcase";
import StickyBar from "@/components/StickyBar";
import Footer from "@/components/Footer";
import { isLive } from "@/lib/launchMode";

export default function Home() {
  return (
    <main>
      <Navbar />
      {!isLive && (
        <div id="waitlist">
          <WaitlistBanner />
        </div>
      )}
      {isLive && <Hero />}
      <TrustBand />
      <MeetTheCouncil />
      <ProductFeature />
      <Manifesto />
      <PhotoBreak />
      <WhyAunty />
      <AppShowcase />
      <FAQ />
      <Footer />
      <StickyBar />
    </main>
  );
}
