import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import Manifesto from "@/components/Manifesto";
import ProductFeature from "@/components/ProductFeature";
import BentoFeatures from "@/components/BentoFeatures";
import PhotoBreak from "@/components/PhotoBreak";
import WhyAunty from "@/components/WhyAunty";
import IngredientsStrip from "@/components/IngredientsStrip";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import AppShowcase from "@/components/AppShowcase";
import StickyBar from "@/components/StickyBar";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductFeature />
      <Manifesto />
      <BentoFeatures />
      <PhotoBreak />
      <WhyAunty />
      <IngredientsStrip />
      <TrustBand />
      <SocialProof />
      <FAQ />
      <AppShowcase />
      <Footer />
      <ConsultationQuiz />
      <StickyBar />
    </main>
  );
}
