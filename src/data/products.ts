export type ProductCategory = "hair" | "skin" | "accessories";
export type HairSub = "low-porosity" | "high-porosity" | "normal-porosity" | "scalp";
export type SkinSub = "universal" | "oily" | "dry-ashy" | "combination" | "balanced" | "sensitive";
export type AccessorySub = "hair" | "skin";
export type ProductSub = HairSub | SkinSub | AccessorySub;
export type ProductStatus = "pre-order" | "ships-now";
export type ProductType =
  | "shampoo" | "conditioner" | "deep-conditioner" | "curl-cream"
  | "scalp-serum" | "growth-oil" | "face-serum" | "face-cream" | "lotion"
  | "face-wash" | "accessory" | "scalp-treatment" | "spf" | "scar-gel";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  sub: ProductSub;
  auntyId: string;
  painPoint: string;
  price: number;
  status: ProductStatus;
  productType: ProductType;
  keyIngredients: string[];
  whyItWorks: string;
  image?: string;
}

export const products: Product[] = [

  // ── HAIR: Low Porosity ──────────────────────────────────────────────────────
  {
    id: "clarifying-shampoo",
    name: "Aunty Clarifying Shampoo",
    category: "hair",
    sub: "low-porosity",
    auntyId: "fatou",
    painPoint: "For hair that holds onto everything — except moisture.",
    price: 20,
    status: "pre-order",
    productType: "shampoo",
    keyIngredients: ["Apple Cider Vinegar Complex", "Glycerin", "Panthenol", "Peppermint Actives"],
    whyItWorks: "Low porosity hair repels moisture — products pile up on the cuticle instead of getting in. Our ACV complex breaks down that buildup so your hair can finally absorb what it needs.",
    image: "/products/clarifying-shampoo.png",
  },
  {
    id: "lightweight-conditioner",
    name: "Aunty Lightweight Conditioner",
    category: "hair",
    sub: "low-porosity",
    auntyId: "fatou",
    painPoint: "Moisture that actually gets in. Not just sits on top.",
    price: 22,
    status: "pre-order",
    productType: "conditioner",
    keyIngredients: ["Rice Water Extract", "Silk Amino Complex", "Lightweight Oil Blend", "Cetyl Alcohol"],
    whyItWorks: "Low porosity hair is easily weighed down by rich butters. Rice water and silk amino complex give detangling slip without coating the strand — smoothing the cuticle without shutting it.",
    image: "/products/lightweight-conditioner.png",
  },

  // ── HAIR: High Porosity ─────────────────────────────────────────────────────
  {
    id: "strengthening-shampoo",
    name: "Aunty Strengthening Shampoo",
    category: "hair",
    sub: "high-porosity",
    auntyId: "ngozi",
    painPoint: "High porosity hair needs strength, not stripping.",
    price: 22,
    status: "pre-order",
    productType: "shampoo",
    keyIngredients: ["Hydrolyzed Protein Blend", "Shea Extract", "Castor Oil Derivative", "Panthenol"],
    whyItWorks: "High porosity hair loses protein fast — color, heat, and manipulation all strip the cortex. This deposits our protein blend while cleansing so you don't start wash day in a deficit.",
    image: "/products/strengthening-shampoo.png",
  },
  {
    id: "deep-conditioner",
    name: "Aunty Deep Conditioner",
    category: "hair",
    sub: "high-porosity",
    auntyId: "marcia",
    painPoint: "The long game. Rich, slow, deep moisture your hair holds onto.",
    price: 26,
    status: "pre-order",
    productType: "deep-conditioner",
    keyIngredients: ["Mango Butter Complex", "Avocado Oil Blend", "Wheat Protein Matrix", "Honey Extract"],
    whyItWorks: "High porosity curls need protein and moisture in balance. This formula floods each strand with hydration, then our protein matrix fills the gaps in the cuticle so moisture stays locked in.",
    image: "/products/deep-conditioner.png",
  },

  // ── HAIR: Normal Porosity ───────────────────────────────────────────────────
  {
    id: "liquid-curl-creme",
    name: "Aunty Liquid Curl Crème",
    category: "hair",
    sub: "normal-porosity",
    auntyId: "carmen",
    painPoint: "Define your curls without the crunch. No cast, no residue.",
    price: 24,
    status: "pre-order",
    productType: "curl-cream",
    keyIngredients: ["Flaxseed Gel Complex", "Marshmallow Root Extract", "Aloe Vera", "Glycerin"],
    whyItWorks: "Wavy and curly hair needs definition without weight. Flaxseed gel locks in curl pattern without crunch; marshmallow root creates natural clumping and slip so curls form, stay formed, and don't frizz.",
    image: "/products/liquid-curl-creme.png",
  },
  {
    id: "rich-curl-creme",
    name: "Aunty Rich Curl Crème",
    category: "hair",
    sub: "high-porosity",
    auntyId: "ngozi",
    painPoint: "Seal your coils. Lock in moisture. Show your real length.",
    price: 26,
    status: "pre-order",
    productType: "curl-cream",
    keyIngredients: ["Shea Butter Complex", "Mango Butter", "Black Castor Oil", "Rice Bran Oil"],
    whyItWorks: "Dense coily hair loses moisture fast once styled. This butter-based formula seals the cuticle on contact so your definition holds all day without going stiff, flaking, or leaving white residue.",
    image: "/products/rich-curl-creme.png",
  },

  // ── HAIR: Scalp ─────────────────────────────────────────────────────────────
  {
    id: "scalp-oil",
    name: "Aunty Scalp Oil",
    category: "hair",
    sub: "scalp",
    auntyId: "denise",
    painPoint: "Old recipe. Real results. Your edges will thank you.",
    price: 24,
    status: "pre-order",
    productType: "growth-oil",
    keyIngredients: ["Black Castor Oil Complex", "Peppermint Actives", "Rosemary Extract", "Vitamin E"],
    whyItWorks: "You're growing hair — you're just not keeping it. Rosemary and peppermint actives stimulate blood flow to the follicle; castor complex seals the scalp and strengthens the base so length doesn't break off.",
    image: "/products/scalp-oil.png",
  },
  {
    id: "edge-repair-serum",
    name: "Aunty Edge Repair Serum",
    category: "hair",
    sub: "scalp",
    auntyId: "denise",
    painPoint: "Braids. Cornrows. Extensions. Your edges remember everything.",
    price: 28,
    status: "pre-order",
    productType: "scalp-serum",
    keyIngredients: ["Castor Oil Complex", "Peptide Blend", "Biotin Actives", "Anti-Inflammatory Extract"],
    whyItWorks: "Lightweight, anti-inflammatory formula. Castor complex + peptide blend + biotin actives target hairline damage from traction and tight styling specifically.",
    image: "/products/edge-repair-serum.png",
  },

  // ── SKIN ────────────────────────────────────────────────────────────────────
  {
    id: "gentle-face-wash",
    name: "Aunty Gentle Face Wash",
    category: "skin",
    sub: "universal",
    auntyId: "fatou",
    painPoint: "pH balanced. Fragrance free. Your skin barrier stays intact.",
    price: 18,
    status: "pre-order",
    productType: "face-wash",
    keyIngredients: ["PHA Complex", "Aloe Vera Extract", "Oat Actives", "Panthenol"],
    whyItWorks: "Stripping cleansers trigger inflammation — and inflammation on melanin-rich skin means PIH. This stays at pH 5.5 (your skin's natural pH) and uses a PHA complex that cleanses without disrupting the barrier.",
    image: "/products/gentle-face-wash.png",
  },
  {
    id: "pih-cream",
    name: "Aunty PIH Cream",
    category: "skin",
    sub: "universal",
    auntyId: "salma",
    painPoint: "Richer. Slower. For dark spots that need more than a serum.",
    price: 30,
    status: "pre-order",
    productType: "face-cream",
    keyIngredients: ["Alpha-Arbutin Complex", "Niacinamide", "Ceramide Blend", "Kojic Actives"],
    whyItWorks: "For deeper, older dark spots that need slow-release actives and an occlusive base. Alpha-arbutin complex inhibits melanin transfer; ceramide blend seals in treatment while repairing the barrier overnight.",
    image: "/products/pih-cream.png",
  },
  {
    id: "sebum-control-serum",
    name: "Aunty Sebum Control Serum",
    category: "skin",
    sub: "oily",
    auntyId: "salma",
    painPoint: "Blotting papers are not a routine. Niacinamide is.",
    price: 28,
    status: "pre-order",
    productType: "face-serum",
    keyIngredients: ["Niacinamide 10% Complex", "Zinc PCA Blend", "Panthenol"],
    whyItWorks: "Regulates sebum at the gland level. Niacinamide complex + zinc PCA blend reduce shine without stripping — so skin stays matte without the tightness. For oily + dehydrated types.",
    image: "/products/sebum-control-serum.png",
  },
  {
    id: "moisturizer",
    name: "Aunty Moisturizer",
    category: "skin",
    sub: "universal",
    auntyId: "salma",
    painPoint: "Rich. Fast-absorbing. Leaves no grease, just glow.",
    price: 26,
    status: "pre-order",
    productType: "face-cream",
    keyIngredients: ["Ceramide Complex", "Hyaluronic Acid Blend", "Shea Butter", "Niacinamide"],
    whyItWorks: "Melanin-rich skin benefits from a moisturizer that hydrates and strengthens the barrier simultaneously. Ceramide complex locks moisture in; hyaluronic acid draws water to the surface. Absorbs fully — no white residue.",
    image: "/products/moisturizer.png",
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
  category: "hair" | "skin" | "full";
}

export const bundles: Bundle[] = [
  {
    id: "low-porosity-bundle",
    name: "Low Porosity Bundle",
    description: "Clarifying Shampoo + Lightweight Conditioner + Liquid Curl Crème.",
    includes: "3 products",
    price: 55,
    originalPrice: 66,
    savings: 11,
    savingsPct: 17,
    category: "hair",
  },
  {
    id: "high-porosity-bundle",
    name: "High Porosity Bundle",
    description: "Strengthening Shampoo + Deep Conditioner + Rich Curl Crème.",
    includes: "3 products",
    price: 63,
    originalPrice: 74,
    savings: 11,
    savingsPct: 15,
    category: "hair",
  },
  {
    id: "scalp-bundle",
    name: "Scalp Health Bundle",
    description: "Scalp Oil + Edge Repair Serum — your full scalp ritual.",
    includes: "2 products",
    price: 46,
    originalPrice: 52,
    savings: 6,
    savingsPct: 12,
    category: "hair",
  },
  {
    id: "skin-starter-kit",
    name: "Skin Starter Kit",
    description: "Gentle Face Wash + PIH Cream + Aunty Moisturizer.",
    includes: "3 products",
    price: 63,
    originalPrice: 74,
    savings: 11,
    savingsPct: 15,
    category: "skin",
  },
  {
    id: "full-council-kit",
    name: "Full Council Kit",
    description: "4 hair + 4 skin essentials. The whole council, in a box.",
    includes: "8 products",
    price: 130,
    originalPrice: 164,
    savings: 34,
    savingsPct: 21,
    category: "full",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getProductsByCategory(cat: ProductCategory) {
  return products.filter((p) => p.category === cat);
}
export function getProductsBySub(sub: ProductSub) {
  return products.filter((p) => p.sub === sub);
}
export function getProductById(id: string) {
  return products.find((p) => p.id === id) ?? null;
}
