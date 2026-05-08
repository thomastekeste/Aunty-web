import Navbar from "@/components/Navbar";
import MeetTheCouncil from "@/components/MeetTheCouncil";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Aunties — Aunty Council",
  description:
    "Seven aunties. Seven perspectives. Meet the council that picks your products — from Nigerian Pidgin to Jamaican Patois.",
};

export default function AuntiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFCF8] pt-[72px]">
        <MeetTheCouncil />
        <Footer />
      </main>
    </>
  );
}
