import Navbar from "@/components/Navbar";
import IngredientCredibility from "@/components/IngredientCredibility";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Science — Aunty Council",
  description:
    "We formulate for root causes, not symptoms. Proprietary complexes targeting moisture loss, pigment overproduction, and scalp congestion.",
};

export default function SciencePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFCF8] pt-[72px]">
        <IngredientCredibility />
        <Footer />
      </main>
    </>
  );
}
