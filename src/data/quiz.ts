export type CurlType =
  | "2a" | "2b" | "2c"
  | "3a" | "3b" | "3c"
  | "4a" | "4b" | "4c";

export type Struggle =
  | "dryness" | "breakage" | "frizz" | "shrinkage"
  | "scalp" | "heat-damage" | "transition";

export type Goal =
  | "moisture" | "growth" | "definition" | "damage-repair"
  | "scalp-health" | "simplify-routine" | "transition";

export const curlOptions: { type: CurlType; label: string; desc: string }[] = [
  { type: "2a", label: "2A", desc: "Gentle S-wave" },
  { type: "2b", label: "2B", desc: "Defined wave" },
  { type: "2c", label: "2C", desc: "Deep wave" },
  { type: "3a", label: "3A", desc: "Loose spiral" },
  { type: "3b", label: "3B", desc: "Bouncy ringlet" },
  { type: "3c", label: "3C", desc: "Tight corkscrew" },
  { type: "4a", label: "4A", desc: "Springy S-coil" },
  { type: "4b", label: "4B", desc: "Z-pattern coil" },
  { type: "4c", label: "4C", desc: "Tight shrinkage" },
];

export const curlCategories = [
  { label: "Wavy", types: ["2a", "2b", "2c"] as CurlType[] },
  { label: "Curly", types: ["3a", "3b", "3c"] as CurlType[] },
  { label: "Coily", types: ["4a", "4b", "4c"] as CurlType[] },
];

export const struggleOptions: { value: Struggle; label: string; sub: string }[] = [
  { value: "dryness", label: "Dryness & crunch", sub: "Hair feels like straw" },
  { value: "breakage", label: "Breakage & shedding", sub: "Losing length constantly" },
  { value: "frizz", label: "Frizz I can\u2019t tame", sub: "No matter what I try" },
  { value: "shrinkage", label: "Shrinkage frustration", sub: "Where did my length go?" },
  { value: "scalp", label: "Itchy / flaky scalp", sub: "Uncomfortable and visible" },
  { value: "heat-damage", label: "Heat or color damage", sub: "My curls won\u2019t bounce back" },
  { value: "transition", label: "Transitioning to natural", sub: "Two textures, one head" },
];

export const goalOptions: { value: Goal; label: string; sub: string }[] = [
  { value: "moisture", label: "Moisture & softness", sub: "I want touchable hair" },
  { value: "growth", label: "Length retention", sub: "Keep every inch I grow" },
  { value: "definition", label: "Curl definition", sub: "Bouncy, uniform curls" },
  { value: "damage-repair", label: "Damage repair", sub: "Heal what\u2019s broken" },
  { value: "scalp-health", label: "Scalp health", sub: "Healthy from the root" },
  { value: "simplify-routine", label: "Simpler routine", sub: "Less products, more results" },
  { value: "transition", label: "Go natural", sub: "Embrace my real texture" },
];

// --- Validation messages (ported from app) ---

export function getCurlValidation(curl: CurlType): string[] {
  if (curl.startsWith("2"))
    return [
      "Wavy hair.",
      "Most products aren\u2019t built for you. That changes today.",
    ];
  if (curl.startsWith("3"))
    return [
      "Curly hair. Beautiful and complex.",
      "I know exactly what it needs.",
    ];
  return [
    "Coily hair. The most misunderstood texture.",
    "Not anymore. I got you.",
  ];
}

export const empathyValidation = [
  "You\u2019ve been carrying this alone.",
  "That stops today.",
];

// --- Convening ceremony ---

export function getConveningMessages(curl: CurlType, struggle: Struggle, goal: Goal): string[] {
  const curlLabel = curlOptions.find((o) => o.type === curl)?.label ?? curl;
  const goalLabel = goalOptions.find((o) => o.value === goal)?.label ?? goal;

  return [
    `Analyzing your ${curlLabel} curl pattern\u2026`,
    `Checking ${struggleOptions.find((o) => o.value === struggle)?.label.toLowerCase() ?? struggle} needs\u2026`,
    `Building your wash day routine\u2026`,
    `Selecting products for ${goalLabel.toLowerCase()}\u2026`,
    `Mapping your weekly ritual\u2026`,
    `Your aunties are finalizing your plan\u2026`,
  ];
}

export const conveningChecklist = [
  "Hair profile analyzed",
  "Routine mapped",
  "Products matched",
  "Plan ready",
];

// --- Verdict ---

export interface TeaserVerdict {
  auntyId: string;
  message: string;
}

export function getVerdicts(
  curl: CurlType,
  struggle: Struggle,
  goal: Goal
): TeaserVerdict[] {
  const isCoily = curl.startsWith("4");
  const isWavy = curl.startsWith("2");

  const ngozi: TeaserVerdict = {
    auntyId: "ngozi",
    message:
      struggle === "dryness"
        ? "Ahn ahn! I knew it. Dis hair is THIRSTY. I already know what you need \u2014 come, let me show you."
        : struggle === "breakage"
          ? "You been rough with this hair, abi? No worry \u2014 Aunty has a plan. We start with moisture, always."
          : struggle === "frizz"
            ? "Frizz is just your hair crying for attention, baby. We gon\u2019 give it what it wants."
            : "I see you. I see this hair. And I already know what we doing first.",
  };

  const denise: TeaserVerdict = {
    auntyId: "denise",
    message:
      goal === "growth"
        ? "Baby, I been retaining length since before it was a hashtag. Your aunties got you."
        : goal === "moisture"
          ? "Honey, moisture is the foundation of EVERYTHING. We about to build you a whole ritual."
          : goal === "definition"
            ? "Definition comes from understanding your pattern. And sugar, we about to understand yours real well."
            : goal === "simplify-routine"
              ? "Too many products? Baby, we trimming that routine down. Quality over quantity, always."
              : "I\u2019ve been doing this a long time. Trust the process \u2014 your aunties know the way.",
  };

  const third: TeaserVerdict = isCoily
    ? {
        auntyId: "amara",
        message:
          "Your coils carry so much strength. Sometimes they just need someone to remind them. That is what we are here for.",
      }
    : isWavy
      ? {
          auntyId: "carmen",
          message:
            "Mira! Those waves have so much life in them. We just need to wake them up, mi amor!",
        }
      : {
          auntyId: "marcia",
          message:
            "Your curls need patience and the right foundation. Mek we start from di root and build up, love.",
        };

  return [ngozi, denise, third];
}
