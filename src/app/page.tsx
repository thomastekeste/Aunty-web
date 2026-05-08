import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValuesMarquee from "@/components/ValuesMarquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import AppPreview from "@/components/AppPreview";
import MeetTheCouncil from "@/components/MeetTheCouncil";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ValuesMarquee />
      <FeaturedProducts />
      <AppPreview />
      <MeetTheCouncil />
      <Footer />
      <ConsultationQuiz />
    </main>
  );
}
