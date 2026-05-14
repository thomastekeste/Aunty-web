/**
 * AuntyPortrait — Web SVG portraits for each aunty.
 * Ported from the aunty-curl-council React Native app's AuntyPortrait.tsx.
 * Each portrait is a distinct, culturally specific illustration.
 */
"use client";

import type { ReactNode } from "react";

export type AuntyId = "ngozi" | "marcia" | "denise" | "fatou" | "carmen" | "senayt" | "salma";

interface Props {
  auntyId: string;
  size?: number;
  bg?: string;
}

const portraits: Record<AuntyId, ReactNode> = {
  // ─── NGOZI — Nigerian, Bold, Round-faced ─────────────────────
  ngozi: (
    <g>
      <circle cx="50" cy="26" r="28" fill="#1A0F08" />
      <circle cx="34" cy="30" r="14" fill="#2D1B0E" />
      <circle cx="66" cy="30" r="14" fill="#2D1B0E" />
      <circle cx="50" cy="20" r="16" fill="#2D1B0E" />
      <circle cx="28" cy="38" r="10" fill="#1A0F08" />
      <circle cx="72" cy="38" r="10" fill="#1A0F08" />
      <circle cx="42" cy="18" r="10" fill="#1A0F08" />
      <circle cx="58" cy="18" r="10" fill="#1A0F08" />
      <path d="M 20 88 Q 30 82 42 80 L 42 100 L 20 100 Z" fill="#C49340" />
      <path d="M 80 88 Q 70 82 58 80 L 58 100 L 80 100 Z" fill="#C49340" />
      <path d="M 42 80 L 42 100 L 58 100 L 58 80 Q 50 84 42 80" fill="#B8862E" />
      <path d="M 42 72 L 42 80 Q 50 84 58 80 L 58 72" fill="#8B5A34" />
      <path d="M 28 48 Q 28 30 50 30 Q 72 30 72 48 Q 72 72 50 76 Q 28 72 28 48" fill="#8B5A34" />
      <ellipse cx="36" cy="56" rx="6" ry="4" fill="#A06A42" opacity={0.4} />
      <ellipse cx="64" cy="56" rx="6" ry="4" fill="#A06A42" opacity={0.4} />
      <ellipse cx="40" cy="48" rx="4" ry="3" fill="white" />
      <ellipse cx="60" cy="48" rx="4" ry="3" fill="white" />
      <ellipse cx="41" cy="48" rx="2.5" ry="2.5" fill="#1A0F08" />
      <ellipse cx="61" cy="48" rx="2.5" ry="2.5" fill="#1A0F08" />
      <circle cx="42" cy="47.5" r="0.8" fill="white" />
      <circle cx="62" cy="47.5" r="0.8" fill="white" />
      <path d="M 34 43 Q 40 40 46 43" stroke="#3D2010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 54 43 Q 60 40 66 43" stroke="#3D2010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 48 48 L 47 54" stroke="#6A4020" strokeWidth="0.8" fill="none" />
      <path d="M 52 48 L 53 54" stroke="#6A4020" strokeWidth="0.8" fill="none" />
      <path d="M 44 56 Q 47 58 50 57 Q 53 58 56 56" stroke="#6A4020" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 38 62 Q 44 60 50 61 Q 56 60 62 62" stroke="#6A4020" strokeWidth="1" fill="none" />
      <path d="M 38 62 Q 50 72 62 62" fill="#7A4428" />
      <path d="M 40 64 Q 50 69 60 64" fill="white" />
      <circle cx="26" cy="54" r="5" fill="none" stroke="#D4A04A" strokeWidth="2.5" />
      <circle cx="74" cy="54" r="5" fill="none" stroke="#D4A04A" strokeWidth="2.5" />
      <path d="M 42 76 Q 50 80 58 76" stroke="#D4A04A" strokeWidth="1.5" fill="none" />
    </g>
  ),

  // ─── MARCIA — Jamaican, Patient ──────────────
  marcia: (
    <g>
      <path d="M 24 40 Q 22 18 50 14 Q 78 18 76 40 L 74 44 Q 50 38 26 44 Z" fill="#1A7A4A" />
      <path d="M 26 36 Q 50 30 74 36 L 74 42 Q 50 36 26 42 Z" fill="#12603A" />
      <ellipse cx="58" cy="16" rx="6" ry="4" fill="#1A7A4A" />
      <ellipse cx="56" cy="14" rx="5" ry="3.5" fill="#12603A" />
      <path d="M 24 44 Q 20 56 18 70 Q 17 76 19 80" stroke="#1A0F08" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 26 44 Q 23 58 22 72" stroke="#2D1B0E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 76 44 Q 80 56 82 70 Q 83 76 81 80" stroke="#1A0F08" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 74 44 Q 77 58 78 72" stroke="#2D1B0E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 20 90 Q 30 84 44 82 L 44 100 L 20 100 Z" fill="#12603A" />
      <path d="M 80 90 Q 70 84 56 82 L 56 100 L 80 100 Z" fill="#12603A" />
      <path d="M 44 82 L 44 100 L 56 100 L 56 82 Q 50 86 44 82" fill="#0E4E2E" />
      <path d="M 44 74 L 44 82 Q 50 86 56 82 L 56 74" fill="#7A4A28" />
      <path d="M 30 46 Q 30 28 50 28 Q 70 28 70 46 Q 70 72 50 78 Q 30 72 30 46" fill="#7A4A28" />
      <ellipse cx="37" cy="56" rx="5" ry="3.5" fill="#8C5A34" opacity={0.35} />
      <ellipse cx="63" cy="56" rx="5" ry="3.5" fill="#8C5A34" opacity={0.35} />
      <ellipse cx="41" cy="48" rx="3.5" ry="2.5" fill="white" />
      <ellipse cx="59" cy="48" rx="3.5" ry="2.5" fill="white" />
      <ellipse cx="42" cy="48.5" rx="2.2" ry="2.2" fill="#1A0F08" />
      <ellipse cx="60" cy="48.5" rx="2.2" ry="2.2" fill="#1A0F08" />
      <circle cx="42.5" cy="48" r="0.7" fill="white" />
      <circle cx="60.5" cy="48" r="0.7" fill="white" />
      <path d="M 37 46 Q 41 44 45 46" stroke="#5A3418" strokeWidth="0.8" fill="none" />
      <path d="M 55 46 Q 59 44 63 46" stroke="#5A3418" strokeWidth="0.8" fill="none" />
      <path d="M 36 43 Q 41 40.5 46 43" stroke="#2D1B0E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 54 43 Q 59 40.5 64 43" stroke="#2D1B0E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 49 46 L 48 54" stroke="#5A3418" strokeWidth="0.8" fill="none" />
      <path d="M 46 56 Q 50 58 54 56" stroke="#5A3418" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 40 62 Q 45 60 50 61 Q 55 60 60 62" stroke="#5A3418" strokeWidth="1" fill="none" />
      <path d="M 40 62 Q 50 69 60 62" fill="#664028" />
      <path d="M 42 63.5 Q 50 67 58 63.5" fill="white" opacity={0.15} />
    </g>
  ),

  // ─── DENISE — African American, Wise ─────
  denise: (
    <g>
      <circle cx="32" cy="24" r="10" fill="#2D1B0E" />
      <circle cx="50" cy="18" r="12" fill="#2D1B0E" />
      <circle cx="68" cy="24" r="10" fill="#2D1B0E" />
      <circle cx="26" cy="34" r="9" fill="#1A0F08" />
      <circle cx="74" cy="34" r="9" fill="#1A0F08" />
      <circle cx="40" cy="16" r="9" fill="#1A0F08" />
      <circle cx="60" cy="16" r="9" fill="#1A0F08" />
      <circle cx="50" cy="12" r="8" fill="#2D1B0E" />
      <path d="M 18 88 Q 28 82 43 80 L 43 100 L 18 100 Z" fill="#3D5A99" />
      <path d="M 82 88 Q 72 82 57 80 L 57 100 L 82 100 Z" fill="#3D5A99" />
      <path d="M 43 80 L 43 100 L 57 100 L 57 80 Q 50 85 43 80" fill="#2A4070" />
      <path d="M 43 72 L 43 80 Q 50 85 57 80 L 57 72" fill="#6B3A1C" />
      <path d="M 26 46 Q 26 28 50 28 Q 74 28 74 46 Q 74 70 50 76 Q 26 70 26 46" fill="#6B3A1C" />
      <ellipse cx="35" cy="56" rx="6" ry="4" fill="#7C4A28" opacity={0.35} />
      <ellipse cx="65" cy="56" rx="6" ry="4" fill="#7C4A28" opacity={0.35} />
      <ellipse cx="40" cy="47" rx="4.5" ry="3" fill="white" />
      <ellipse cx="60" cy="47" rx="4.5" ry="3" fill="white" />
      <ellipse cx="41" cy="47.5" rx="2.8" ry="2.5" fill="#1A0F08" />
      <ellipse cx="61" cy="47.5" rx="2.8" ry="2.5" fill="#1A0F08" />
      <circle cx="42" cy="47" r="1" fill="white" />
      <circle cx="62" cy="47" r="1" fill="white" />
      <path d="M 33 42 Q 40 38.5 47 42" stroke="#2D1B0E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 53 42 Q 60 38.5 67 42" stroke="#2D1B0E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 48 46 L 47 54" stroke="#4C2810" strokeWidth="0.8" fill="none" />
      <path d="M 52 46 L 53 54" stroke="#4C2810" strokeWidth="0.8" fill="none" />
      <path d="M 44 56 Q 47 58 50 57.5 Q 53 58 56 56" stroke="#4C2810" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 36 62 Q 43 59 50 60 Q 57 59 64 62" stroke="#4C2810" strokeWidth="1" fill="none" />
      <path d="M 36 62 Q 50 74 64 62" fill="#5A3018" />
      <path d="M 39 64 Q 50 71 61 64" fill="white" />
      <circle cx="24" cy="52" r="2" fill="#3D5A99" />
      <ellipse cx="24" cy="57" rx="2.5" ry="3.5" fill="#3D5A99" />
      <circle cx="76" cy="52" r="2" fill="#3D5A99" />
      <ellipse cx="76" cy="57" rx="2.5" ry="3.5" fill="#3D5A99" />
    </g>
  ),

  // ─── FATOU — Senegalese, Precise ──────────
  fatou: (
    <g>
      <path d="M 34 20 Q 33 45 30 72" stroke="#1A0F08" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M 40 18 Q 38 44 36 74" stroke="#2D1B0E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 60 18 Q 62 44 64 74" stroke="#2D1B0E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 66 20 Q 67 45 70 72" stroke="#1A0F08" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M 34 20 Q 50 12 66 20" stroke="#1A0F08" strokeWidth="6" fill="none" />
      <path d="M 50 12 L 50 20" stroke="#805030" strokeWidth="0.8" fill="none" />
      <circle cx="30" cy="74" r="2.5" fill="#7B3F6B" />
      <circle cx="36" cy="76" r="2.5" fill="#D4A04A" />
      <circle cx="64" cy="76" r="2.5" fill="#D4A04A" />
      <circle cx="70" cy="74" r="2.5" fill="#7B3F6B" />
      <path d="M 22 90 Q 32 84 44 82 L 44 100 L 22 100 Z" fill="#7B3F6B" />
      <path d="M 78 90 Q 68 84 56 82 L 56 100 L 78 100 Z" fill="#7B3F6B" />
      <path d="M 44 82 L 44 100 L 56 100 L 56 82 Q 50 86 44 82" fill="#5C2A4A" />
      <path d="M 44 72 L 44 82 Q 50 86 56 82 L 56 72" fill="#805030" />
      <path d="M 32 44 Q 32 24 50 22 Q 68 24 68 44 Q 68 70 50 76 Q 32 70 32 44" fill="#805030" />
      <ellipse cx="38" cy="52" rx="4" ry="3" fill="#926040" opacity={0.4} />
      <ellipse cx="62" cy="52" rx="4" ry="3" fill="#926040" opacity={0.4} />
      <path d="M 36 46 Q 42 43 47 46 Q 42 48.5 36 46" fill="white" />
      <path d="M 53 46 Q 58 43 64 46 Q 58 48.5 53 46" fill="white" />
      <ellipse cx="42" cy="46" rx="2" ry="2" fill="#1A0F08" />
      <ellipse cx="58" cy="46" rx="2" ry="2" fill="#1A0F08" />
      <circle cx="42.5" cy="45.5" r="0.6" fill="white" />
      <circle cx="58.5" cy="45.5" r="0.6" fill="white" />
      <path d="M 35 41 Q 42 37 48 41" stroke="#3D2010" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 52 41 Q 58 37 65 41" stroke="#3D2010" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 49 42 L 48 52" stroke="#603818" strokeWidth="0.7" fill="none" />
      <path d="M 51 42 L 52 52" stroke="#603818" strokeWidth="0.7" fill="none" />
      <path d="M 46 54 Q 50 56 54 54" stroke="#603818" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M 42 60 Q 46 58.5 50 59 Q 54 58.5 58 60" stroke="#603818" strokeWidth="0.8" fill="none" />
      <path d="M 42 60 Q 50 66 58 60" fill="#6E4426" />
      <path d="M 44 61.5 Q 50 64 56 61.5" fill="white" opacity={0.15} />
    </g>
  ),

  // ─── CARMEN — Afro-Latina, Joyful ─────────
  carmen: (
    <g>
      <circle cx="28" cy="28" r="12" fill="#2D1B0E" />
      <circle cx="50" cy="16" r="14" fill="#2D1B0E" />
      <circle cx="72" cy="28" r="12" fill="#2D1B0E" />
      <circle cx="22" cy="42" r="10" fill="#1A0F08" />
      <circle cx="78" cy="42" r="10" fill="#1A0F08" />
      <circle cx="36" cy="18" r="10" fill="#1A0F08" />
      <circle cx="64" cy="18" r="10" fill="#1A0F08" />
      <circle cx="30" cy="36" r="8" fill="#2D1B0E" />
      <circle cx="70" cy="36" r="8" fill="#2D1B0E" />
      <circle cx="44" cy="12" r="7" fill="#1A0F08" />
      <circle cx="56" cy="12" r="7" fill="#1A0F08" />
      <path d="M 20 86 Q 30 80 43 78 L 43 100 L 20 100 Z" fill="#C2456E" />
      <path d="M 80 86 Q 70 80 57 78 L 57 100 L 80 100 Z" fill="#C2456E" />
      <path d="M 43 78 L 43 100 L 57 100 L 57 78 Q 50 82 43 78" fill="#A83858" />
      <path d="M 43 70 L 43 78 Q 50 82 57 78 L 57 70" fill="#946040" />
      <path d="M 28 44 Q 27 28 50 28 Q 73 28 72 44 Q 72 62 50 74 Q 28 62 28 44" fill="#946040" />
      <ellipse cx="36" cy="52" rx="5" ry="4" fill="#A87050" opacity={0.4} />
      <ellipse cx="64" cy="52" rx="5" ry="4" fill="#A87050" opacity={0.4} />
      <ellipse cx="40" cy="46" rx="4.5" ry="3.5" fill="white" />
      <ellipse cx="60" cy="46" rx="4.5" ry="3.5" fill="white" />
      <ellipse cx="41" cy="46.5" rx="2.8" ry="2.8" fill="#1A0F08" />
      <ellipse cx="61" cy="46.5" rx="2.8" ry="2.8" fill="#1A0F08" />
      <circle cx="42.5" cy="45.5" r="1.2" fill="white" />
      <circle cx="62.5" cy="45.5" r="1.2" fill="white" />
      <path d="M 34 41 Q 40 38 46 41" stroke="#3D2010" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M 54 41 Q 60 38 66 41" stroke="#3D2010" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M 49 44 L 48 52" stroke="#70482C" strokeWidth="0.7" fill="none" />
      <path d="M 46 54 Q 50 56 54 54" stroke="#70482C" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 36 58 Q 43 55 50 56 Q 57 55 64 58" stroke="#70482C" strokeWidth="1" fill="none" />
      <path d="M 36 58 Q 50 72 64 58" fill="#7E4E34" />
      <path d="M 39 60 Q 50 68 61 60" fill="white" />
      <circle cx="26" cy="48" r="5" fill="none" stroke="#C2456E" strokeWidth="2.5" />
      <circle cx="74" cy="48" r="5" fill="none" stroke="#C2456E" strokeWidth="2.5" />
    </g>
  ),

  // ─── SENAYT — Ethiopian-Eritrean, Steady ─
  senayt: (
    <g>
      <path d="M 24 40 Q 22 14 50 10 Q 78 14 76 40" stroke="#1A0F08" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M 28 36 Q 28 18 50 14 Q 72 18 72 36" stroke="#2D1B0E" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="20" r="2" fill="#D4A04A" />
      <circle cx="42" cy="13" r="2" fill="#D4A04A" />
      <circle cx="50" cy="10.5" r="2.5" fill="#D4A04A" />
      <circle cx="58" cy="13" r="2" fill="#D4A04A" />
      <circle cx="70" cy="20" r="2" fill="#D4A04A" />
      <path d="M 20 90 Q 30 84 44 82 L 44 100 L 20 100 Z" fill="#F0E6D2" />
      <path d="M 80 90 Q 70 84 56 82 L 56 100 L 80 100 Z" fill="#F0E6D2" />
      <path d="M 44 82 L 44 100 L 56 100 L 56 82 Q 50 86 44 82" fill="#E0D4BE" />
      <path d="M 36 86 Q 50 90 64 86" stroke="#D4A04A" strokeWidth="1.5" fill="none" />
      <path d="M 34 88 Q 50 92 66 88" stroke="#B85C2A" strokeWidth="1" fill="none" />
      <path d="M 44 74 L 44 82 Q 50 86 56 82 L 56 74" fill="#6E3E1E" />
      <path d="M 44 78 Q 50 82 56 78" stroke="#D4A04A" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="82" r="2" fill="#D4A04A" />
      <path d="M 30 44 Q 30 24 50 22 Q 70 24 70 44 Q 70 68 50 78 Q 30 68 30 44" fill="#6E3E1E" />
      <ellipse cx="37" cy="54" rx="5" ry="3.5" fill="#804E2C" opacity={0.35} />
      <ellipse cx="63" cy="54" rx="5" ry="3.5" fill="#804E2C" opacity={0.35} />
      <ellipse cx="41" cy="46" rx="4" ry="2.8" fill="white" />
      <ellipse cx="59" cy="46" rx="4" ry="2.8" fill="white" />
      <ellipse cx="42" cy="46.5" rx="2.2" ry="2.2" fill="#1A0F08" />
      <ellipse cx="60" cy="46.5" rx="2.2" ry="2.2" fill="#1A0F08" />
      <circle cx="42.5" cy="46" r="0.7" fill="white" />
      <circle cx="60.5" cy="46" r="0.7" fill="white" />
      <path d="M 35 41 Q 41 37 47 41" stroke="#2D1B0E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 53 41 Q 59 37 65 41" stroke="#2D1B0E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 49 42 L 48 52" stroke="#502C12" strokeWidth="0.8" fill="none" />
      <path d="M 51 42 L 52 52" stroke="#502C12" strokeWidth="0.8" fill="none" />
      <path d="M 46 54 Q 50 56.5 54 54" stroke="#502C12" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 42 60 Q 46 58 50 59 Q 54 58 58 60" stroke="#502C12" strokeWidth="0.8" fill="none" />
      <path d="M 42 60 Q 50 67 58 60" fill="#5C3418" />
      <path d="M 44 61.5 Q 50 65 56 61.5" fill="white" opacity={0.15} />
    </g>
  ),

  // ─── SALMA — Moroccan, Calm ───────────────
  salma: (
    <g>
      <path d="M 28 26 Q 24 46 26 68 Q 25 76 28 80" stroke="#2D1B0E" strokeWidth="7" fill="none" />
      <path d="M 33 22 Q 28 44 30 66 Q 29 74 32 78" stroke="#1A0F08" strokeWidth="5.5" fill="none" />
      <path d="M 38 20 Q 34 42 36 62" stroke="#2D1B0E" strokeWidth="4" fill="none" />
      <path d="M 62 20 Q 66 42 64 62" stroke="#2D1B0E" strokeWidth="4" fill="none" />
      <path d="M 67 22 Q 72 44 70 66 Q 71 74 68 78" stroke="#1A0F08" strokeWidth="5.5" fill="none" />
      <path d="M 72 26 Q 76 46 74 68 Q 75 76 72 80" stroke="#2D1B0E" strokeWidth="7" fill="none" />
      <ellipse cx="50" cy="20" rx="24" ry="13" fill="#1A0F08" />
      <ellipse cx="50" cy="18" rx="18" ry="8" fill="#2D1B0E" />
      <path d="M 22 88 Q 32 82 44 80 L 44 100 L 22 100 Z" fill="#2A7B7B" />
      <path d="M 78 88 Q 68 82 56 80 L 56 100 L 78 100 Z" fill="#2A7B7B" />
      <path d="M 44 80 L 44 100 L 56 100 L 56 80 Q 50 84 44 80" fill="#1E5C5C" />
      <path d="M 44 72 L 44 80 Q 50 84 56 80 L 56 72" fill="#9A6844" />
      <path d="M 30 46 Q 30 26 50 24 Q 70 26 70 46 Q 70 70 50 76 Q 30 70 30 46" fill="#9A6844" />
      <ellipse cx="37" cy="54" rx="5" ry="3.5" fill="#AE7854" opacity={0.35} />
      <ellipse cx="63" cy="54" rx="5" ry="3.5" fill="#AE7854" opacity={0.35} />
      <path d="M 35 46 Q 42 42 48 46 Q 42 49 35 46" fill="white" />
      <path d="M 52 46 Q 58 42 65 46 Q 58 49 52 46" fill="white" />
      <ellipse cx="42" cy="46" rx="2" ry="2" fill="#1A0F08" />
      <ellipse cx="58" cy="46" rx="2" ry="2" fill="#1A0F08" />
      <circle cx="42.5" cy="45.5" r="0.6" fill="white" />
      <circle cx="58.5" cy="45.5" r="0.6" fill="white" />
      <path d="M 34 46 Q 33 45 32 44" stroke="#1A0F08" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 66 46 Q 67 45 68 44" stroke="#1A0F08" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 35 41 Q 42 38 48 41" stroke="#3D2010" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 52 41 Q 58 38 65 41" stroke="#3D2010" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 49 42 L 48 52" stroke="#74482A" strokeWidth="0.7" fill="none" />
      <path d="M 51 42 L 52 52" stroke="#74482A" strokeWidth="0.7" fill="none" />
      <path d="M 46 54 Q 50 56 54 54" stroke="#74482A" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M 42 60 Q 46 58 50 59 Q 54 58 58 60" stroke="#74482A" strokeWidth="0.8" fill="none" />
      <path d="M 42 60 Q 50 66 58 60" fill="#846044" />
      <path d="M 44 61.5 Q 50 64 56 61.5" fill="white" opacity={0.15} />
      <path d="M 28 50 Q 22 46 28 42" stroke="#2A7B7B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 72 50 Q 78 46 72 42" stroke="#2A7B7B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
};

export default function AuntyPortrait({ auntyId, size = 80, bg = "#F5EBD5" }: Props) {
  const portrait = portraits[auntyId as AuntyId];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="50" fill={bg} />
      {portrait}
    </svg>
  );
}
