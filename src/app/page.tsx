import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValuesMarquee from "@/components/ValuesMarquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import AppPreview from "@/components/AppPreview";
import MeetTheCouncil from "@/components/MeetTheCouncil";
import HairTypes from "@/components/HairTypes";
import SkinTypes from "@/components/SkinTypes";
import SocialProof from "@/components/SocialProof";
import QuizOnramp from "@/components/QuizOnramp";
import IngredientCredibility from "@/components/IngredientCredibility";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ValuesMarquee />
      <FeaturedProducts />
      <SocialProof />
      <QuizOnramp />
      <IngredientCredibility />
      <AppPreview />
      <MeetTheCouncil />
      <HairTypes />
      <SkinTypes />
      <Footer />
      <ConsultationQuiz />
    </main>
  );
}
