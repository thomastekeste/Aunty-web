/**
 * AuntyGuide — A persistent presence that speaks throughout the consultation.
 * Shows the selected aunty's portrait + a contextual line in her voice
 * that changes based on the current quiz phase.
 */
"use client";

import { useEffect, useState } from "react";
import type { Aunty } from "@/data/aunties";
import AuntyPortrait from "./AuntyPortrait";

export type GuidePhase =
  | "journey-pick"
  | "hair-type" | "porosity" | "hair-moisture" | "hair-loss"
  | "hair-scalp" | "hair-styling" | "hair-goal"
  | "hair-convening" | "hair-results"
  | "skin-wash-feel" | "skin-ashy" | "skin-reaction" | "skin-finish"
  | "skin-convening" | "skin-results";

/**
 * Per-aunty, per-phase coaching lines, written in each aunty's authentic voice.
 * Drawn from their dialect, personality, and focus.
 */
const LINES: Record<string, Partial<Record<GuidePhase, string>>> = {
  ngozi: {
    "journey-pick": "Ahn ahn — wetin we dey solve today? Hair or skin?",
    "hair-type": "Show me dis curl. No lie to Aunty.",
    "porosity": "Porosity matter o. Tell me how your hair dey drink water.",
    "hair-moisture": "Dry hair na dry hair — no shame. Just tell me.",
    "hair-loss": "We go fix any breakage. But first, talk true.",
    "hair-scalp": "Scalp na foundation. We no dey skip dis one.",
    "hair-styling": "Wetin dey vex you on wash day? Spill am.",
    "hair-goal": "Pick one — we no dey scatter focus.",
    "hair-convening": "I dey gather di council. Hold on small.",
    "hair-results": "Now we dey talk o! Dis is wetin your hair need.",
    "skin-wash-feel": "How your face dey feel after washing? Talk true.",
    "skin-ashy": "Ashy na real ting. Don't hide am.",
    "skin-reaction": "Some products no be your friend. We go find di right ones.",
    "skin-finish": "Last question, ch — then we go work.",
    "skin-convening": "Council dey deliberate. Patience.",
    "skin-results": "Ah ah! Look at dis routine. Dis na correct skincare.",
  },
  marcia: {
    "journey-pick": "Wah gwaan, love? Wha we workin' on today?",
    "hair-type": "Mek me see dem curls. Take yuh time.",
    "porosity": "Porosity — di way yuh hair drink di water. Pick yuh truth.",
    "hair-moisture": "Tell mi how it feel everyday. Not just wash day.",
    "hair-loss": "We nah panic. Just tell mi wha yuh see.",
    "hair-scalp": "Di scalp is di garden. Wha di soil look like?",
    "hair-styling": "Wha frustrate yuh? Sit wid it, then tell mi.",
    "hair-goal": "One ting. Wha matter most right now?",
    "hair-convening": "Mek di council take a moment. Good tings need time.",
    "hair-results": "Look pon dis. Root strong, di rest follow.",
    "skin-wash-feel": "After yuh wash, how it feel? No rush di answer.",
    "skin-ashy": "Tell mi 'bout di ashy. We nah judge.",
    "skin-reaction": "Yuh skin talk loud — wha it tell yuh las' time?",
    "skin-finish": "One more, sweetness. Den we done.",
    "skin-convening": "Patience, baby. Di council a deliberate.",
    "skin-results": "Yuh see it? Slow and steady — dis is di way.",
  },
  denise: {
    "journey-pick": "Hey sugar. What we working on — hair or skin?",
    "hair-type": "Let me see what we got. Don't be shy now.",
    "porosity": "Porosity test, baby. Trust the process.",
    "hair-moisture": "Tell me how it feel on an average day. Not your good day.",
    "hair-loss": "Whatever you losing, we'll address it. Be honest.",
    "hair-scalp": "Scalp first. Always. How we doing down there?",
    "hair-styling": "What's the thing that drive you crazy? That's where we start.",
    "hair-goal": "Pick one thing. We don't scatter ourselves in this house.",
    "hair-convening": "Auntie thinking. Give me a second.",
    "hair-results": "Now THAT is what I'm talking about. Look at this routine.",
    "skin-wash-feel": "After you wash, how the skin feel? Talk to me.",
    "skin-ashy": "Ashiness is real. We not pretending it ain't.",
    "skin-reaction": "Last time you tried something new — what happened?",
    "skin-finish": "Last one, baby. Then we work.",
    "skin-convening": "Hold tight. Auntie putting it together.",
    "skin-results": "There it is. We got you covered.",
  },
  fatou: {
    "journey-pick": "Bonjour, chérie. Hair, or skin — which one today?",
    "hair-type": "Show me your texture. Precision matters.",
    "porosity": "Porosity, ma chérie. Choose with care.",
    "hair-moisture": "How does it feel? Every day, not just the good ones.",
    "hair-loss": "Be exact. The truth is never rude.",
    "hair-scalp": "Your scalp — its condition shapes everything else.",
    "hair-styling": "Name the frustration. We will fix the technique.",
    "hair-goal": "One goal. Focused. Elegant.",
    "hair-convening": "A moment — the council assembles.",
    "hair-results": "Magnifique. This is technique becoming art.",
    "skin-wash-feel": "After cleansing — feel, then tell me.",
    "skin-ashy": "Be exact. Where, how much?",
    "skin-reaction": "Your skin remembers. What did it tell you?",
    "skin-finish": "The final question. Then — answers.",
    "skin-convening": "Un moment, chérie. We are deciding.",
    "skin-results": "Voilà. A routine with intention.",
  },
  carmen: {
    "journey-pick": "¡Hola mi amor! Hair or skin — let's go!",
    "hair-type": "Mira, show me those curls! They have a personalidad of their own.",
    "porosity": "¡Vamos! Pick your porosity, mami.",
    "hair-moisture": "How does it feel? Tell me everything.",
    "hair-loss": "We're gonna fix it together. Just be real with me.",
    "hair-scalp": "The scalp! Let's see how she's doing.",
    "hair-styling": "What frustrates you? Spill, mi amor.",
    "hair-goal": "One goal — we're focusing the energy!",
    "hair-convening": "¡Espérate! The council is brewing something good.",
    "hair-results": "¡Ay! Look at this routine — those curls about to POP!",
    "skin-wash-feel": "After washing, how does she feel?",
    "skin-ashy": "Tell me about the ashy. ¡Sin vergüenza!",
    "skin-reaction": "Your skin is dramatic? Mine too. What did she do last time?",
    "skin-finish": "¡Última pregunta, amor!",
    "skin-convening": "Un momentico — the magic is happening.",
    "skin-results": "¡Mira eso! Your skin's about to glow.",
  },
  senayt: {
    "journey-pick": "Welcome, dear one. Hair or skin today?",
    "hair-type": "Let us see what we are working with. Take your time.",
    "porosity": "Porosity. The first quiet truth about your hair.",
    "hair-moisture": "How does it feel — not on your best day, but most days?",
    "hair-loss": "Whatever you are losing, we will rebuild. Tell me.",
    "hair-scalp": "The scalp is the soil. Honest answers only.",
    "hair-styling": "Name the frustration. We will work patiently.",
    "hair-goal": "One goal. Steady focus.",
    "hair-convening": "A moment. The council is gathering.",
    "hair-results": "Feel that? This is your hair remembering what it is.",
    "skin-wash-feel": "After cleansing — what does the skin say?",
    "skin-ashy": "Ashy patches are honest signals. Where do you see them?",
    "skin-reaction": "Your skin is not weak — it is speaking. What has it said?",
    "skin-finish": "One more answer, dear one.",
    "skin-convening": "Quiet now. The council is listening.",
    "skin-results": "Strength is patience. Here is your routine.",
  },
  salma: {
    "journey-pick": "As-salaam, habibi. Hair, or skin — where shall we begin?",
    "hair-type": "Show me your hair. Every texture has its own story.",
    "porosity": "Porosity — how the hair receives. Choose calmly.",
    "hair-moisture": "How does it feel most days? Listen to it first.",
    "hair-loss": "Whatever it is, we will balance it. Be honest, habibi.",
    "hair-scalp": "The scalp speaks for the whole body. What does yours say?",
    "hair-styling": "Name your frustration without judgment.",
    "hair-goal": "One intention. Hold it gently.",
    "hair-convening": "A breath. The council is finding balance.",
    "hair-results": "See how everything flows when we listen?",
    "skin-wash-feel": "After cleansing — what does she whisper?",
    "skin-ashy": "Where is the dryness? Be specific, habibi.",
    "skin-reaction": "Sensitive skin is wise skin. What has she taught you?",
    "skin-finish": "The last question — then balance.",
    "skin-convening": "Healing is not linear. A moment.",
    "skin-results": "Balanced. This is what listening looks like.",
  },
};

const FALLBACK = "I'm right here with you — let's keep going.";

export function getAuntyLine(aunty: Aunty, phase: GuidePhase): string {
  return LINES[aunty.id]?.[phase] ?? aunty.greeting ?? FALLBACK;
}

interface AuntyGuideProps {
  aunty: Aunty;
  phase: GuidePhase;
}

export default function AuntyGuide({ aunty, phase }: AuntyGuideProps) {
  const line = getAuntyLine(aunty, phase);
  const [shown, setShown] = useState(line);
  const [visible, setVisible] = useState(true);

  // Smooth crossfade when line changes
  useEffect(() => {
    if (line === shown) return;
    setVisible(false);
    const t = setTimeout(() => {
      setShown(line);
      setVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [line, shown]);

  return (
    <div
      className="sticky top-0 z-[110] w-full backdrop-blur-md border-b"
      style={{
        background: `linear-gradient(90deg, ${aunty.gradient[0]}F2 0%, ${aunty.gradient[1]}F2 100%)`,
        borderColor: `${aunty.color}33`,
      }}
    >
      <div className="max-w-[720px] mx-auto px-4 py-3 md:py-4 flex items-center gap-3 md:gap-4">
        <div className="flex-shrink-0">
          <AuntyPortrait auntyId={aunty.id} size={48} bg={aunty.bg} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-body text-[10px] font-bold tracking-[1.5px] uppercase leading-none mb-1"
            style={{ color: aunty.color }}
          >
            Aunty {aunty.name} · {aunty.title}
          </p>
          <p
            className="font-display text-[14px] md:text-[15px] leading-snug text-[#1A0F08] transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            &ldquo;{shown}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
