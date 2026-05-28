"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: "What products do you carry?",
    a: "We carry 68+ products across two types: accessories (bonnets, tools, skincare devices) that ship directly from us, and vetted hair & skin products from brands like SheaMoisture, Pattern Beauty, Mielle, and more — each one screened for ingredient safety on melanin-rich skin.",
  },
  {
    q: "How are brands vetted?",
    a: "Every product in the marketplace has been screened for ingredient safety on melanin-rich skin and textured hair. No actives known to trigger post-inflammatory hyperpigmentation (PIH), no unnecessary sulfates, no fillers. If a brand doesn't meet the standard, it doesn't get listed.",
  },
  {
    q: "How does shipping work?",
    a: "Accessories (bonnets, tools, devices) ship directly from us with fast delivery and free returns within 30 days. Hair and skin products link to each brand's own store — you buy direct from SheaMoisture, Mielle, or whoever makes the product.",
  },
  {
    q: "What makes this different from Amazon?",
    a: "Amazon shows you everything and hopes you figure it out. We only list products that pass our vetting process — curated specifically for textured hair and melanin-rich skin. No guesswork, no fake reviews, no random third-party sellers.",
  },
  {
    q: "What's your return policy?",
    a: "Accessories purchased from our store can be returned within 30 days, no questions asked. For hair and skin products bought through brand links, each brand's own return policy applies — we link you to their support.",
  },
  {
    q: "Do you have an app?",
    a: "Yes. The Aunty Council app gives you daily coaching from 7 culturally-aware AI aunties — they track your hair journey, adjust your routine, and give personalized advice in the voice of the diaspora. The marketplace is for shopping; the app is for the full experience.",
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
