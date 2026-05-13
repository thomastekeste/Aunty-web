"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: "How does the consultation actually work?",
    a: "Seven questions. Two minutes. The aunties analyze your texture, porosity, scalp type, and goals — then build a routine matched to exactly what your hair needs. You can come back any time and re-do it as your hair changes.",
  },
  {
    q: "Why pre-order? When do products ship?",
    a: "We manufacture based on which products hit minimum order quantity first — so your money funds your formula, not unsold inventory on a warehouse shelf. First batch shipments begin within 6–8 weeks of the MOQ being met. You'll get an email the moment yours is on the way.",
  },
  {
    q: "What makes this different from a drugstore product?",
    a: "Drugstore lines are formulated for the average head of hair — which doesn't exist if your texture is 4C. Every Aunty Council formula was built specifically for textured hair and melanin-rich skin. No filler. No \"works for all hair types\" hand-waving.",
  },
  {
    q: "Are the ingredients safe?",
    a: "Every formula is sulfate-free, paraben-free, and silicone-free. We test for irritants known to trigger PIH on melanin-rich skin and avoid them entirely. Full ingredient lists are on every product page.",
  },
  {
    q: "What if my routine doesn't work?",
    a: "Email us. The aunties will rework it for free. If after 60 days you're still not happy, we refund the unopened products — no quiz, no questions.",
  },
  {
    q: "Are the aunties real people?",
    a: "The aunties are characters who carry the diaspora's actual wisdom — Nigerian shea butter, Jamaican castor oil, Caribbean steam therapy. They speak in dialects we grew up with. Behind the scenes, they're powered by AI trained on textured hair science and cross-cultural haircare practice.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-[#FDFCF8]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20">

        <ScrollReveal>
          <div className="md:sticky md:top-24">
            <p className="font-body text-[11px] font-bold tracking-[4px] uppercase text-[#C9903A] mb-5">
              Real talk
            </p>
            <h2 className="font-display text-[1.75rem] md:text-[2.4rem] font-bold text-[#1A0F08] leading-[1.05] tracking-[-0.025em] mb-6">
              Things people
              <br />
              <span className="italic font-light text-[#6B5040]">actually ask.</span>
            </h2>
            <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A] leading-[1.7] max-w-sm">
              Don&apos;t see your question? Email{" "}
              <a
                href="mailto:hello@auntycurlcouncil.com"
                className="text-[#1A0F08] border-b border-[#1A0F08]/30 hover:border-[#1A0F08] transition-colors"
              >
                hello@auntycurlcouncil.com
              </a>{" "}
              and we&apos;ll add it.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="flex flex-col">
            {FAQS.map((qa, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="text-left border-t border-[rgba(26,15,8,0.08)] last:border-b py-6 group"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-display text-[15px] md:text-[17px] font-semibold text-[#1A0F08] leading-snug pr-2">
                      {qa.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-[rgba(26,15,8,0.15)] group-hover:border-[#1A0F08] transition-all duration-300"
                      style={{
                        background: isOpen ? "#1A0F08" : "transparent",
                        color: isOpen ? "#FDFCF8" : "#1A0F08",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      maxHeight: isOpen ? "320px" : "0",
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? "16px" : "0",
                    }}
                  >
                    <p className="font-body text-[15px] md:text-[16px] text-[#3D2B1A] leading-[1.7] pr-12">
                      {qa.a}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
