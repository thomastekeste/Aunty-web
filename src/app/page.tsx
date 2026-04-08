import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import MeetTheCouncil from "@/components/MeetTheCouncil";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import HowItWorks from "@/components/HowItWorks";
import AppPreview from "@/components/AppPreview";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SocialProof />
      <MeetTheCouncil />
      <ConsultationQuiz />
      <HowItWorks />
      <AppPreview />
      <Waitlist />
      <Footer />
    </main>
  );
}
