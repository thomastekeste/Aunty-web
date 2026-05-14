import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import AuntySelectorHero from "@/components/AuntySelectorHero";
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
import QuizLoader from "@/components/QuizLoader";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <AuntySelectorHero />
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
      <ErrorBoundary><QuizLoader /></ErrorBoundary>
      <StickyBar />
    </main>
  );
}
