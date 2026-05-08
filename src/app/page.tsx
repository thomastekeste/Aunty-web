import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import Manifesto from "@/components/Manifesto";
import ValuesMarquee from "@/components/ValuesMarquee";
import QuizOnramp from "@/components/QuizOnramp";
import WhyAunty from "@/components/WhyAunty";
import TransformSection from "@/components/TransformSection";
import SocialProof from "@/components/SocialProof";
import StickyBar from "@/components/StickyBar";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBand />
      <Manifesto />
      <ValuesMarquee />
      <QuizOnramp />
      <WhyAunty />
      <TransformSection />
      <SocialProof />
      <Footer />
      <ConsultationQuiz />
      <StickyBar />
    </main>
  );
}
