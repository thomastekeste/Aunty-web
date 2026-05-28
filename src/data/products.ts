// ── Accessories-only product catalog (dropship store) ────────────────────────
// Hair & skin care product recommendations are now affiliate-based — see affiliate-products.ts

export type AccessoryCategory = "sleep" | "tools" | "devices";
export type ProductType =
  | "bonnet" | "durag" | "accessory" | "tool" | "roller" | "mask";

export interface Product {
  id: string;
  name: string;
  category: AccessoryCategory;
  auntyId: string;
  painPoint: string;
  price: number;
  productType: ProductType;
  keyIngredients: string[];  // specs / features for accessories
  whyItWorks: string;
  image?: string;
}

export const products: Product[] = [

  // ── SLEEP & PROTECTION ─────────────────────────────────────────────────────
  {
    id: "satin-bonnet",
    name: "Aunty Satin Bonnet",
    category: "sleep",
    auntyId: "ngozi",
    painPoint: "Your curls don't stop working just because you're sleeping.",
    price: 14,
    productType: "bonnet",
    keyIngredients: ["Double-lined satin", "Adjustable elastic band", "Breathable mesh interior"],
    whyItWorks: "Cotton pillowcases strip moisture and create friction that breaks curls overnight. Double-lined satin eliminates both — you wake up with day-one definition instead of frizz.",
    image: "/products/bonnet.svg",
  },
  {
    id: "silk-pillowcase",
    name: "Aunty Silk Pillowcase",
    category: "sleep",
    auntyId: "ngozi",
    painPoint: "Upgrade your sleep. Your hair and skin both benefit.",
    price: 22,
    productType: "accessory",
    keyIngredients: ["22-momme mulberry silk", "Hidden zipper closure", "Standard & queen sizes"],
    whyItWorks: "Silk reduces friction by 43% compared to cotton. Less friction means less breakage, less frizz, and fewer sleep creases on your face. Your night routine becomes automatic.",
    image: "/products/accessory.svg",
  },
  {
    id: "silky-durag",
    name: "Aunty Silky Durag",
    category: "sleep",
    auntyId: "denise",
    painPoint: "360 waves need compression. This gives it without the headache.",
    price: 12,
    productType: "durag",
    keyIngredients: ["Premium silky satin", "Extra-long tails", "Wide stretch headband"],
    whyItWorks: "The right durag lays waves flat without pulling your hairline. Silky satin interior reduces friction on the scalp while providing even compression for wave training.",
    image: "/products/durag.svg",
  },
  {
    id: "wave-cap-2pack",
    name: "Aunty Wave Cap 2-Pack",
    category: "sleep",
    auntyId: "denise",
    painPoint: "Under the durag or on its own. Compression that stays put.",
    price: 8,
    productType: "durag",
    keyIngredients: ["Breathable stocking mesh", "Seamless construction", "One-size stretch fit"],
    whyItWorks: "Wave caps provide consistent compression that durags alone can't hold all night. The seamless construction means no imprint lines — just clean, even wave progression.",
    image: "/products/durag.svg",
  },
  {
    id: "satin-scrunchie-pack",
    name: "Aunty Satin Scrunchie Pack",
    category: "sleep",
    auntyId: "carmen",
    painPoint: "Regular hair ties leave dents and break your strands. These don't.",
    price: 10,
    productType: "accessory",
    keyIngredients: ["Satin exterior", "Gentle elastic core", "6-pack assorted earth tones"],
    whyItWorks: "Elastic hair ties create tension points that snap curly hair. Satin scrunchies distribute pressure evenly — no crease, no breakage, no reset needed after a puff.",
  },

  // ── TOOLS & BRUSHES ────────────────────────────────────────────────────────
  {
    id: "scalp-massager",
    name: "Aunty Scalp Massager",
    category: "tools",
    auntyId: "denise",
    painPoint: "Stimulate your scalp. Feel it working. Watch your edges come back.",
    price: 10,
    productType: "tool",
    keyIngredients: ["Soft silicone bristles", "Ergonomic grip", "Wet & dry use"],
    whyItWorks: "Increases blood flow to the follicle by up to 300% during use. Pairs with your scalp oil to boost absorption. The bristles lift product buildup that blocks growth.",
    image: "/products/tool.svg",
  },
  {
    id: "detangling-brush-set",
    name: "Aunty Detangling Set",
    category: "tools",
    auntyId: "carmen",
    painPoint: "Detangling shouldn't mean losing half your hair in the brush.",
    price: 16,
    productType: "tool",
    keyIngredients: ["Flexible bristle detangler", "Wide-tooth comb", "Sectioning clips"],
    whyItWorks: "Rigid combs snap coily hair at the bend. Flexible bristles move with the curl pattern, separating tangles from the ends up without ripping through knots.",
    image: "/products/tool.svg",
  },
  {
    id: "satin-scrunchie-pack",
    name: "Aunty Satin Scrunchie Pack",
    category: "sleep" as AccessoryCategory,
    auntyId: "carmen",
    painPoint: "Regular hair ties leave dents and break your strands. These don't.",
    price: 10,
    productType: "accessory",
    keyIngredients: ["Satin exterior", "Gentle elastic core", "6-pack assorted earth tones"],
    whyItWorks: "Elastic hair ties create tension points that snap curly hair. Satin scrunchies distribute pressure evenly — no crease, no breakage, no reset needed after a puff.",
    image: "/products/accessory.svg",
  },
  {
    id: "edge-brush-kit",
    name: "Aunty Edge Brush Kit",
    category: "tools",
    auntyId: "marcia",
    painPoint: "Laid edges are an art. These are your brushes.",
    price: 8,
    productType: "tool",
    keyIngredients: ["Dual-ended edge brush", "Rattail comb", "Travel case"],
    whyItWorks: "The fine-bristle side lays baby hairs flat while the spoolie blends. Rattail comb creates clean parts. Small enough for your bag — touch-ups anywhere.",
    image: "/products/tool.svg",
  },
  {
    id: "microfiber-hair-towel",
    name: "Aunty Microfiber Hair Towel",
    category: "tools",
    auntyId: "fatou",
    painPoint: "Cotton towels are why your wash day ends in frizz.",
    price: 16,
    productType: "accessory",
    keyIngredients: ["Ultra-fine microfiber weave", "Button closure", "Quick-dry technology"],
    whyItWorks: "Cotton terry cloth roughs up the hair cuticle, creating frizz on contact. Microfiber absorbs water without friction — dries 50% faster while keeping your curl pattern intact.",
    image: "/products/accessory.svg",
  },
  {
    id: "silicone-face-scrubber",
    name: "Aunty Silicone Face Scrubber",
    category: "tools",
    auntyId: "fatou",
    painPoint: "Exfoliate without micro-tears. Your skin is too precious for rough tools.",
    price: 8,
    productType: "tool",
    keyIngredients: ["Medical-grade silicone", "Dual-zone bristles", "Antimicrobial material"],
    whyItWorks: "Abrasive scrubs create micro-tears that trigger inflammation and PIH on dark skin. Soft silicone nubs lift dirt and dead skin gently — clean pores without the damage.",
    image: "/products/tool.svg",
  },
  {
    id: "microfiber-face-cloths",
    name: "Aunty Microfiber Face Cloths",
    category: "tools",
    auntyId: "fatou",
    painPoint: "Your regular towel is too rough for your face. Period.",
    price: 12,
    productType: "accessory",
    keyIngredients: ["Ultra-soft microfiber", "3-pack assorted", "Machine washable"],
    whyItWorks: "Rubbing your face with a cotton towel creates friction that irritates melanin-rich skin. Microfiber removes cleanser and water by absorption alone — pat dry, no drag.",
    image: "/products/accessory.svg",
  },

  // ── SKINCARE DEVICES ───────────────────────────────────────────────────────
  {
    id: "led-therapy-mask",
    name: "Aunty LED Therapy Mask",
    category: "devices",
    auntyId: "salma",
    painPoint: "Red light for dark spots. Blue light for breakouts. No chemicals.",
    price: 68,
    productType: "mask",
    keyIngredients: ["Red LED (630nm)", "Blue LED (415nm)", "3 intensity settings", "USB-C rechargeable"],
    whyItWorks: "Red light at 630nm stimulates collagen and fades post-inflammatory hyperpigmentation without irritating melanocytes. Blue light kills acne bacteria — preventing the breakouts that cause dark spots in the first place.",
  },
  {
    id: "ice-roller",
    name: "Aunty Ice Roller",
    category: "devices",
    auntyId: "salma",
    painPoint: "Inflammation is the #1 trigger for dark spots. Cool it down.",
    price: 12,
    productType: "roller",
    keyIngredients: ["Medical-grade stainless steel", "Gel-core freeze head", "Ergonomic handle"],
    whyItWorks: "Cold constricts blood vessels and reduces the inflammatory response that triggers melanin overproduction. Two minutes after cleansing calms redness and preps skin for serum absorption.",
  },
  {
    id: "pimple-patches",
    name: "Aunty Pimple Patches",
    category: "devices",
    auntyId: "senayt",
    painPoint: "Stop picking. Seriously. Every pick becomes a dark spot.",
    price: 8,
    productType: "accessory",
    keyIngredients: ["Hydrocolloid technology", "36 patches per pack", "Invisible matte finish"],
    whyItWorks: "On melanin-rich skin, every picked pimple risks months of hyperpigmentation. Hydrocolloid patches draw out fluid overnight while creating a physical barrier against your fingers.",
  },
  {
    id: "derma-roller",
    name: "Aunty Derma Roller",
    category: "devices",
    auntyId: "salma",
    painPoint: "Boost serum absorption by 200%. The needle does the work.",
    price: 14,
    productType: "tool",
    keyIngredients: ["0.25mm titanium needles", "540-needle head", "Protective travel case"],
    whyItWorks: "0.25mm depth is the sweet spot for melanin-rich skin — deep enough to boost product absorption and stimulate collagen, shallow enough to avoid the inflammation that triggers PIH.",
  },
  {
    id: "gua-sha-tool",
    name: "Aunty Gua Sha Stone",
    category: "devices",
    auntyId: "senayt",
    painPoint: "Sculpt. De-puff. Move the lymph. Two minutes, visible difference.",
    price: 12,
    productType: "tool",
    keyIngredients: ["Rose quartz stone", "Wing-shaped design", "Velvet storage pouch"],
    whyItWorks: "Lymphatic drainage reduces puffiness and uneven tone. The wing shape follows your jawline and cheekbones naturally — promoting circulation that helps fade dark spots from within.",
  },
];

// ── Bundles ───────────────────────────────────────────────────────────────────
export interface Bundle {
  id: string;
  name: string;
  description: string;
  includes: string;
  price: number;
  originalPrice: number;
  savings: number;
  savingsPct: number;
  category: AccessoryCategory;
}

export const bundles: Bundle[] = [
  {
    id: "sleep-protection-bundle",
    name: "Sleep Protection Set",
    description: "Satin Bonnet + Silk Pillowcase + Satin Scrunchie Pack — protect your curls overnight.",
    includes: "3 accessories",
    price: 38,
    originalPrice: 46,
    savings: 8,
    savingsPct: 17,
    category: "sleep",
  },
  {
    id: "wave-starter-bundle",
    name: "Wave Starter Kit",
    description: "Silky Durag + Wave Cap 2-Pack + Scalp Massager — everything for 360 waves.",
    includes: "3 accessories",
    price: 25,
    originalPrice: 30,
    savings: 5,
    savingsPct: 17,
    category: "sleep",
  },
  {
    id: "skin-tools-bundle",
    name: "Glow Tools Kit",
    description: "Ice Roller + Gua Sha Stone + Pimple Patches — your anti-dark-spot toolkit.",
    includes: "3 accessories",
    price: 27,
    originalPrice: 32,
    savings: 5,
    savingsPct: 16,
    category: "devices",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getProductsByCategory(cat: AccessoryCategory) {
  return products.filter((p) => p.category === cat);
}
export function getProductById(id: string) {
  return products.find((p) => p.id === id) ?? null;
}
