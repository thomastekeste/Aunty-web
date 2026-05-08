import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValuesMarquee from "@/components/ValuesMarquee";
import QuizOnramp from "@/components/QuizOnramp";
import SocialProof from "@/components/SocialProof";
import IngredientCredibility from "@/components/IngredientCredibility";
import MeetTheCouncil from "@/components/MeetTheCouncil";
import StickyBar from "@/components/StickyBar";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ValuesMarquee />
      <QuizOnramp />
      <SocialProof />
      <IngredientCredibility />
      <MeetTheCouncil />
      <Footer />
      <ConsultationQuiz />
      <StickyBar />
    </main>
  );
}
