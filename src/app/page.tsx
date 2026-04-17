import Navbar from "@/components/Navbar";
import FullScreenIntro from "@/components/FullScreenIntro";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import AppPreview from "@/components/AppPreview";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import PricingTiers from "@/components/PricingTiers";
import Waitlist from "@/components/Waitlist";
import MeetTheCouncil from "@/components/MeetTheCouncil";
import FounderNote from "@/components/FounderNote";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <FullScreenIntro />
      <Navbar />
      <Hero />
      <HowItWorks />
      <MeetTheCouncil />
      <AppPreview />
      <ConsultationQuiz />
      <FounderNote />
      <PricingTiers />
      <Waitlist />
      <Footer />
    </main>
  );
}
