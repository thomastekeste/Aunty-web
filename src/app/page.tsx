import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import FeaturedIn from "@/components/FeaturedIn";
import Manifesto from "@/components/Manifesto";
import ValuesMarquee from "@/components/ValuesMarquee";
import QuizOnramp from "@/components/QuizOnramp";
import WhyAunty from "@/components/WhyAunty";
import TransformSection from "@/components/TransformSection";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import StickyBar from "@/components/StickyBar";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import AskAuntyWidget from "@/components/AskAuntyWidget";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBand />
      <FeaturedIn />
      <Manifesto />
      <ValuesMarquee />
      <QuizOnramp />
      <WhyAunty />
      <TransformSection />
      <SocialProof />
      <FAQ />
      <Footer />
      <ConsultationQuiz />
      <StickyBar />
      <AskAuntyWidget />
    </main>
  );
}
