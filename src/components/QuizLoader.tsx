"use client";

import dynamic from "next/dynamic";

const ConsultationQuiz = dynamic(
  () => import("@/components/ConsultationQuiz"),
  { ssr: false, loading: () => null }
);

export default function QuizLoader() {
  return <ConsultationQuiz />;
}
