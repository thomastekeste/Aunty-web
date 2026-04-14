export const PLANS = {
  lifetime: {
    name: "Lifetime Member",
    price: 2999, // cents
    display: "$29.99",
    description: "Full price, full commitment",
    perks: [
      "Lifetime access to every feature",
      "All 7 aunties, forever",
      "Every future update included",
      "Founding Member badge",
    ],
    tag: "Best Value",
  },
  yearly: {
    name: "First Year",
    price: 999, // cents
    display: "$9.99",
    description: "Then regular pricing at launch",
    perks: [
      "Full access for your first year",
      "All 7 aunties",
      "Personalized ritual calendar",
      "Priority early access",
    ],
    tag: "Most Popular",
  },
  monthly: {
    name: "First Month",
    price: 99, // cents
    display: "$0.99",
    description: "Ultra low barrier to entry",
    perks: [
      "Full access for your first month",
      "All 7 aunties",
      "Personalized ritual calendar",
      "Cancel anytime",
    ],
    tag: "Try It",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
