export const PLANS = {
  lifetime: {
    name: "Lifetime",
    price: 2999, // cents
    display: "$29.99",
    description: "One payment. Forever access.",
    productId: "prod_UMnam0v05h2GVo",
    perks: [
      "Lifetime access — never pay again",
      "Beta access 2 weeks before public launch",
      "Every future aunty + feature, free",
      "Founding Member badge in-app",
      "Vote on which aunty we add next",
    ],
    tag: "Best Value",
  },
  yearly: {
    name: "First Year",
    price: 999, // cents
    display: "$9.99",
    description: "One year of founding access.",
    productId: "prod_UMnajegbshwxPf",
    perks: [
      "Full access for 12 months",
      "Beta access 1 week before public launch",
      "Founding rate locked if you renew",
      "Founding Member badge in-app",
      "All 7 aunties + care calendar",
    ],
    tag: "Most Popular",
  },
  monthly: {
    name: "First Month",
    price: 99, // cents
    display: "$0.99",
    description: "Lowest-risk way to try it.",
    productId: "prod_UMna6hxv94Pc0a",
    perks: [
      "Full access for 30 days",
      "Beta access at public launch",
      "Full refund if we don't launch in the coming weeks",
      "Cancel anytime, no lock-in",
      "All 7 aunties + care calendar",
    ],
    tag: "Try It",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
