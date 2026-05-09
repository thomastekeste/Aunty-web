// Backwards-compat export used by CurlPatternIcon
export type CurlType =
  | "2a" | "2b" | "2c"
  | "3a" | "3b" | "3c"
  | "4a" | "4b" | "4c";

// ── Hair Types ─────────────────────────────────────────────────────────────
// Described by behaviour, not the André Walker system number.
// Maps to the 2a–4c system internally for product matching.

export type HairCategory = "wavy" | "curly" | "coily" | "coily-dense";

export const hairCategoryOptions: {
  value: HairCategory;
  label: string;
  desc: string;
  detail: string;
}[] = [
  {
    value: "wavy",
    label: "Waves",
    desc: "S-shaped waves when air-dried",
    detail: "Hair makes a loose or defined S-shape when wet and air-dries into waves. Smooth when dry, frizzy when humid.",
  },
  {
    value: "curly",
    label: "Spirals & Ringlets",
    desc: "Spring-shaped curls that coil around themselves",
    detail: "Curls form a visible spiral or ringlet from root to tip. Bouncy when healthy, frizzy when dry.",
  },
  {
    value: "coily",
    label: "Tight Coils",
    desc: "Very tight coils or springs — visible S or Z pattern",
    detail: "Hair coils tightly into small S or Z shapes. Lots of shrinkage. Looks shorter dry than wet.",
  },
  {
    value: "coily-dense",
    label: "Dense Cloud",
    desc: "Very tight — barely any visible pattern, looks like cotton when dry",
    detail: "Hair forms an extremely tight, dense texture. Pattern almost invisible until styled. Maximum shrinkage — dry length can be 50–75% shorter than wet.",
  },
];

// ── Porosity ───────────────────────────────────────────────────────────────
export type Porosity = "low" | "normal" | "high";

export const porosityOptions: {
  value: Porosity;
  label: string;
  desc: string;
  test: string;
}[] = [
  {
    value: "low",
    label: "Low",
    desc: "Water beads on my hair and takes a while to soak in. Products sit on top instead of absorbing.",
    test: "Products tend to sit on top. Hair takes longer to get fully wet.",
  },
  {
    value: "normal",
    label: "Medium",
    desc: "Water soaks in after a moment — not instantly. Hair holds moisture reasonably well.",
    test: "Hair absorbs moisture well and holds it for a reasonable amount of time.",
  },
  {
    value: "high",
    label: "High",
    desc: "Water absorbs right away — but my hair dries out fast too. Very common in coily and color/heat-damaged hair.",
    test: "Products absorb fast but hair feels dry again quickly. Very common in coily and color/heat-damaged hair.",
  },
];

// ── Q3: How does your hair feel most days? ───────────────────────────────
export type MoistureLevel = "dry-crunchy" | "mushy-limp" | "balanced";

export const moistureLevelOptions: {
  value: MoistureLevel;
  label: string;
  sub: string;
}[] = [
  { value: "dry-crunchy", label: "Dry and crunchy",   sub: "Stiff, straw-like — needs moisture constantly" },
  { value: "mushy-limp",  label: "Mushy and limp",    sub: "Too soft, no bounce — like it's waterlogged" },
  { value: "balanced",    label: "Pretty balanced",   sub: "Not too dry, not too soft — holds its shape" },
];

// ── Q4: How much hair are you losing? ────────────────────────────────────
export type HairLoss = "heavy-breakage" | "edges-thinning" | "crown-thinning" | "normal";

export const hairLossOptions: {
  value: HairLoss;
  label: string;
  sub: string;
}[] = [
  { value: "heavy-breakage",  label: "A lot of breakage",       sub: "Hair snaps when I style or detangle" },
  { value: "edges-thinning",  label: "My edges are thinning",   sub: "Hairline is receding from styles or tension" },
  { value: "crown-thinning",  label: "Thinning at the crown",   sub: "Hair loss at the top of my head" },
  { value: "normal",          label: "Normal shedding",          sub: "Nothing unusual — just typical shed" },
];

// ── Q5: How's your scalp? ────────────────────────────────────────────────
export type ScalpHealth = "itchy-flaky" | "buildup-styles" | "fine";

export const scalpHealthOptions: {
  value: ScalpHealth;
  label: string;
  sub: string;
}[] = [
  { value: "itchy-flaky",    label: "Itchy or flaky",                  sub: "Dandruff, irritation, or buildup I can feel" },
  { value: "buildup-styles", label: "Buildup from protective styles",  sub: "Braids, wigs, or locs leave residue and odor" },
  { value: "fine",           label: "My scalp is fine",                sub: "No issues — it's comfortable" },
];

// ── Q6: Biggest styling frustration? ─────────────────────────────────────
export type StylingFrustration = "frizz" | "shrinkage" | "no-definition" | "takes-forever";

export const stylingFrustrationOptions: {
  value: StylingFrustration;
  label: string;
  sub: string;
}[] = [
  { value: "frizz",          label: "Frizz I can't control",    sub: "Especially in humidity or after drying" },
  { value: "shrinkage",      label: "Too much shrinkage",       sub: "Can't see my real length when it dries" },
  { value: "no-definition",  label: "No curl definition",       sub: "Curls won't clump or hold their pattern" },
  { value: "takes-forever",  label: "Everything takes too long", sub: "Wash day is an all-day event" },
];

// ── Q7: #1 hair goal? ───────────────────────────────────────────────────
export type HairGoal = "moisture" | "length" | "definition" | "scalp-health" | "damage-repair" | "simplify";

export const hairGoalOptions: {
  value: HairGoal;
  label: string;
  sub: string;
}[] = [
  { value: "moisture",      label: "Moisture that lasts",       sub: "Soft hair that stays soft between wash days" },
  { value: "length",        label: "Keep my length",            sub: "Grow it AND keep it" },
  { value: "definition",    label: "Curl definition",           sub: "Bouncy, clumped curls or coils" },
  { value: "scalp-health",  label: "Healthy scalp",             sub: "No more itch, flake, or buildup" },
  { value: "damage-repair", label: "Repair damage",             sub: "Rebuild from heat, color, or chemical treatment" },
  { value: "simplify",      label: "Simpler routine",           sub: "Fewer products, less time, same results" },
];

// ── Validation copy shown after each step ────────────────────────────────
export function getHairTypeValidation(type: HairCategory): string[] {
  switch (type) {
    case "wavy":
      return ["Wavy hair.", "Most products overcondition it. We'll keep yours light."];
    case "curly":
      return ["Curly hair — beautiful and specific.", "I know exactly what it takes to keep those spirals popping."];
    case "coily":
      return ["Coily hair. Stunning and complex.", "Products weren't made for you. That changes today."];
    case "coily-dense":
      return ["4C energy. The most misunderstood texture out there.", "Not by me. I already know what your hair needs."];
  }
}

export function getPorosityValidation(porosity: Porosity): string[] {
  switch (porosity) {
    case "low":
      return ["Low porosity.", "Your cuticle is sealed tight — we need lightweight formulas that can get in."];
    case "normal":
      return ["Normal porosity.", "Your hair absorbs and holds moisture well. We'll build on that."];
    case "high":
      return ["High porosity.", "Moisture gets in fast but leaves just as fast. We'll focus on sealing it in."];
  }
}

// ── Tiered product matching ──────────────────────────────────────────────
export interface ProductMatch {
  productId: string;
  reason: string;
}

export interface TieredMatches {
  basics: ProductMatch[];
  essentials: ProductMatch[];
  addons: ProductMatch[];
}

export function getHairTieredMatches(
  hairType: HairCategory,
  porosity: Porosity,
  moisture: MoistureLevel,
  hairLoss: HairLoss,
  scalp: ScalpHealth,
  styling: StylingFrustration,
  goal: HairGoal,
): TieredMatches {
  const basics: ProductMatch[] = [];
  const essentials: ProductMatch[] = [];
  const addons: ProductMatch[] = [];

  // ── BASICS: Shampoo ───────────────────────────────────────────────────
  if (scalp === "buildup-styles") {
    basics.push({
      productId: "scalp-microbiome-shampoo",
      reason: "You mentioned buildup from protective styles — braids, wigs, and locs trap sebum and bacteria against the scalp for weeks. This shampoo rebalances your scalp microbiome with zinc pyrithione + tea tree + prebiotics, clearing what built up without stripping everything else.",
    });
  } else if (porosity === "low") {
    basics.push({
      productId: "clarifying-shampoo",
      reason: "With low porosity hair, products pile up on the cuticle instead of absorbing. This clarifying shampoo breaks down that congestion so every product after it can actually get in.",
    });
  } else if (porosity === "high") {
    basics.push({
      productId: "strengthening-shampoo",
      reason: "High porosity hair loses moisture and protein even during cleansing. This shampoo deposits a hydrolyzed protein blend while it cleans — so you don't start wash day already in a deficit.",
    });
  } else {
    // normal porosity, scalp is fine or just itchy
    basics.push({
      productId: "balancing-shampoo",
      reason: scalp === "itchy-flaky"
        ? "Your scalp needs gentle but thorough cleansing. This aloe and oat complex keeps the pH balanced and cuticle flat while clearing the buildup that feeds irritation — without the stripping that makes itchiness worse."
        : "A gentle cleanser that maintains your hair's natural balance. Aloe and oat complex keep the pH right so every product after it works at full strength.",
    });
  }

  // ── BASICS: Conditioner ───────────────────────────────────────────────
  if (moisture === "mushy-limp") {
    basics.push({
      productId: "hygral-fatigue-conditioner",
      reason: "You told us your hair feels mushy and limp — that's hygral fatigue. Your cuticle is swelling from too much moisture and not enough protein. This conditioner seals with protein first, then moisture, stopping the swelling cycle that's making your hair weak.",
    });
  } else if (moisture === "dry-crunchy" && (porosity === "high" || porosity === "normal")) {
    basics.push({
      productId: "deep-conditioner",
      reason: "Your hair feels dry and crunchy — with " + porosity + " porosity, moisture escapes through lifted cuticles. This deep conditioner floods each strand with hydration, then wheat protein fills the gaps so moisture stays locked in.",
    });
  } else if (goal === "damage-repair") {
    basics.push({
      productId: "protein-moisture-conditioner",
      reason: "You're focused on damage repair — your hair needs the protein-moisture ratio dialed in precisely. This comes in three variants matched via the app: protein-heavy, moisture-heavy, or balanced. The ratio matters more than the ingredients.",
    });
  } else if (porosity === "low") {
    basics.push({
      productId: "lightweight-conditioner",
      reason: "Low porosity hair gets weighed down by rich formulas. This lightweight conditioner gives you detangling slip without the heaviness — rice water and silk proteins smooth the cuticle without sealing it shut.",
    });
  } else if (porosity === "normal" && moisture === "balanced") {
    basics.push({
      productId: "balancing-conditioner",
      reason: "Your hair is in a good place — normal porosity and balanced moisture. The balancing conditioner maintains that equilibrium: silk amino complex and jojoba derivative add conditioning and slip without tipping your hair into overloaded or underhydrated.",
    });
  } else {
    basics.push({
      productId: "deep-conditioner",
      reason: "Your hair needs deep, lasting moisture. Mango butter and avocado oil flood the strand while wheat protein fills gaps in the cuticle so the hydration stays locked in between wash days.",
    });
  }

  // ── BASICS: Styler ────────────────────────────────────────────────────
  if (hairType === "wavy" || hairType === "curly" || porosity === "low") {
    basics.push({
      productId: "liquid-curl-creme",
      reason: styling === "frizz"
        ? "You said frizz is your biggest frustration. This lightweight crème defines without weighing down — flaxseed gel holds the pattern and marshmallow root creates natural clumping, all without crunch or residue."
        : styling === "no-definition"
        ? "You want more curl definition. This liquid crème clumps your curls without weight — perfect for " + (hairType === "wavy" ? "waves" : "curls") + " that need definition without heaviness."
        : (hairType === "wavy" || hairType === "curly" ? "Lighter curl patterns need definition without weight." : "Low porosity hair gets gunky fast.") + " No crunch, no residue — just your curl pattern, amplified.",
    });
  } else {
    basics.push({
      productId: "rich-curl-creme",
      reason: styling === "shrinkage"
        ? "You mentioned shrinkage frustration. This rich crème's butter base helps stretch and seal your coils, so your definition holds longer and your true length shows."
        : styling === "frizz"
        ? "Frizz on coily hair means moisture is escaping. This rich butter formula seals the cuticle so your definition holds and your strands stay soft — even in humidity."
        : "Dense coily hair loses moisture fast once styled. The butter base seals the cuticle so your definition holds and your strands stay soft all day.",
    });
  }

  // ── ESSENTIALS: Targeted treatments ───────────────────────────────────
  if (hairLoss === "edges-thinning") {
    essentials.push({
      productId: "edge-repair-serum",
      reason: "You told us your edges are thinning. Braids, cornrows, extensions — your hairline remembers every style. Castor oil + peptides + biotin target traction damage specifically. Lightweight and anti-inflammatory so it heals without weighing down fragile baby hairs.",
    });
    essentials.push({
      productId: "growth-oil",
      reason: "Paired with the edge serum, this growth oil feeds the follicle from the outside. Rosemary and peppermint stimulate blood flow; castor oil seals and strengthens the base of each strand so regrowth survives.",
    });
  } else if (hairLoss === "crown-thinning") {
    essentials.push({
      productId: "ccca-scalp-treatment",
      reason: "You mentioned thinning at the crown — in Black women, this is often CCCA, a scarring alopecia that destroys follicles permanently if untreated. Centella asiatica + salicylic acid + zinc pyrithione calm inflammation and protect follicles before scarring progresses. Early action is everything.",
    });
    essentials.push({
      productId: "scalp-serum",
      reason: "Working alongside the CCCA treatment, this serum clears buildup blocking your follicles. Salicylic acid exfoliates; niacinamide calms inflammation underneath. Healthy scalp = healthy regrowth.",
    });
  } else if (hairLoss === "heavy-breakage") {
    essentials.push({
      productId: "growth-oil",
      reason: "You're losing hair to breakage — you're growing it, just not keeping it. Rosemary and castor oil feed the follicle and strengthen the base of each strand so length survives past the breakage point.",
    });
    if (scalp !== "fine") {
      essentials.push({
        productId: "scalp-serum",
        reason: "Breakage often starts at an unhealthy scalp. Salicylic acid clears the buildup blocking your follicles; niacinamide calms inflammation so new growth comes in stronger.",
      });
    }
  } else {
    // normal shedding — still recommend growth oil as a good essential
    essentials.push({
      productId: "growth-oil",
      reason: goal === "length"
        ? "Your #1 goal is keeping length. Rosemary and peppermint stimulate blood flow to the follicle; castor oil strengthens the base of each strand so your growth actually survives to length."
        : "Even with normal shedding, this growth oil boosts follicle health. Rosemary stimulates circulation and castor oil strengthens strands from the root — a solid addition to any routine.",
    });
  }

  // Add scalp serum if scalp issues and not already added
  const hasScalpSerum = essentials.some((e) => e.productId === "scalp-serum");
  if (!hasScalpSerum && (scalp === "itchy-flaky" || scalp === "buildup-styles" || goal === "scalp-health")) {
    essentials.push({
      productId: "scalp-serum",
      reason: scalp === "itchy-flaky"
        ? "You said your scalp is itchy and flaky. Salicylic acid dissolves the buildup; zinc PCA balances oil production; niacinamide calms the redness and irritation underneath. The itch stops when the scalp is clean."
        : scalp === "buildup-styles"
        ? "Protective styles trap product residue at the scalp. This serum clears that congestion between washes so your follicles can breathe and grow, even under braids."
        : "You're focused on scalp health — and healthy hair starts at the root. This serum clears buildup, calms inflammation, and creates the clean foundation everything else builds on.",
    });
  }

  // ── ADD-ONS: Accessories ──────────────────────────────────────────────
  addons.push({
    productId: "satin-bonnet",
    reason: "Cotton pillowcases absorb moisture and create friction that breaks off coily strands overnight. Satin creates zero friction and keeps tonight's moisture locked in until morning.",
  });

  if (porosity === "low") {
    addons.push({
      productId: "heat-cap",
      reason: "Low porosity hair needs heat to lift the cuticle so deep conditioner can actually penetrate — instead of just coating the outside. This is the difference between conditioning and deep conditioning.",
    });
  }

  if (styling === "frizz") {
    addons.push({
      productId: "microfiber-towel",
      reason: "You said frizz is your biggest frustration. Regular terry cloth roughens the cuticle — that's frizz. Microfiber absorbs water by capillary action so you can scrunch instead of rub.",
    });
  }

  if (scalp !== "fine" || goal === "scalp-health" || hairLoss !== "normal") {
    addons.push({
      productId: "scalp-massager",
      reason: "Two minutes of scalp massage increases blood flow to the follicle, feeding hair growth. It also works your serum deeper into the scalp so active ingredients don't just sit on the surface.",
    });
  }

  // Ensure at least 2 add-ons
  if (addons.length < 2) {
    addons.push({
      productId: "satin-pillowcase",
      reason: "Eight hours of protection while you sleep. Satin keeps your hair hydrated and prevents the friction that causes breakage and frizz overnight.",
    });
  }

  return { basics, essentials, addons };
}

// ── Convening messages ────────────────────────────────────────────────────
export function getConveningMessages(
  hairType: HairCategory,
  porosity: Porosity,
  moisture: MoistureLevel,
  goal: HairGoal,
): string[] {
  const typeLabel = hairCategoryOptions.find((o) => o.value === hairType)?.label ?? hairType;
  const goalLabel = hairGoalOptions.find((o) => o.value === goal)?.label ?? goal;
  return [
    `Reading your ${typeLabel.toLowerCase()} hair profile…`,
    `Checking ${porosity} porosity needs…`,
    `Analyzing moisture and protein balance…`,
    `Building your routine for ${goalLabel.toLowerCase()}…`,
    `Mapping your wash day steps…`,
    `Your aunties are finalizing your plan…`,
  ];
}

export const conveningChecklist = [
  "Hair profile analyzed",
  "Routine mapped",
  "Products matched",
  "Plan ready",
];

// ── Verdict messages shown per aunty ─────────────────────────────────────
export interface TeaserVerdict {
  auntyId: string;
  message: string;
}

export function getVerdicts(
  hairType: HairCategory,
  porosity: Porosity,
  moisture: MoistureLevel,
  goal: HairGoal,
): TeaserVerdict[] {
  const isCoily = hairType === "coily" || hairType === "coily-dense";
  const isWavy = hairType === "wavy";

  const ngozi: TeaserVerdict = {
    auntyId: "ngozi",
    message:
      moisture === "dry-crunchy"
        ? "Ahn ahn! I knew it. This hair is THIRSTY. I already know what you need — come, let me show you."
        : moisture === "mushy-limp"
          ? "Too much moisture, not enough protein. Your aunty sees it. We rebalancing everything today."
          : goal === "length"
            ? "You growing it but it's not staying. Feed the root, protect the ends. That's the whole secret."
            : "I see you. I see this hair. And I already know what we doing first.",
  };

  const denise: TeaserVerdict = {
    auntyId: "denise",
    message:
      goal === "length"
        ? "Baby, I been retaining length since before it was a hashtag. Your aunties got you."
        : goal === "moisture"
          ? "Honey, moisture is the foundation of EVERYTHING. We about to build you a whole routine."
          : goal === "scalp-health"
            ? "The scalp is everything, baby. You can't grow from unhealthy soil. We fixing the root first."
            : goal === "simplify"
              ? "Too many products? Baby, we trimming that routine down. Quality over quantity, always."
              : "I've been doing this a long time. Trust the process — your aunties know the way.",
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

// ════════════════════════════════════════════════════════════════════════════
// SKIN QUIZ DATA — 4-question flow → 5 Aunty Skin Types
// ════════════════════════════════════════════════════════════════════════════

// ── Aunty Skin Types ─────────────────────────────────────────────────────
export type AuntySkinType = "oily" | "dry-ashy" | "combination" | "balanced" | "sensitive";

export const auntySkinTypes: {
  value: AuntySkinType;
  label: string;
  headline: string;
  description: string;
}[] = [
  {
    value: "oily",
    label: "The Oily Type",
    headline: "Your skin overproduces oil — not because it's oily, but because it's dehydrated.",
    description: "Oil-free hydration + sebum control. We give your skin water so it stops producing oil as a substitute.",
  },
  {
    value: "dry-ashy",
    label: "The Dry & Ashy Type",
    headline: "Your barrier is broken. Moisture escapes faster than it's replaced.",
    description: "Ceramide repair + deep hydration. We rebuild the lipid barrier melanin-rich skin naturally lacks, then lock moisture in.",
  },
  {
    value: "combination",
    label: "The Combination Type",
    headline: "Your T-zone and cheeks need different things. Most brands give them the same thing.",
    description: "Zone-targeted care. Salicylic acid where you're oily, ceramides where you're dry. One routine, applied differently by zone.",
  },
  {
    value: "balanced",
    label: "The Balanced Type",
    headline: "Your skin is working. The goal is to protect what you have.",
    description: "Antioxidant protection + brightening. Vitamin C, niacinamide, and SPF to maintain and enhance what's already glowing.",
  },
  {
    value: "sensitive",
    label: "The Sensitive Type",
    headline: "Your skin isn't weak — it just reacts before others do.",
    description: "Centella calming + barrier support. We reduce reactivity first, then gently introduce actives your skin can tolerate.",
  },
];

// ── Q1: Wash Feel ────────────────────────────────────────────────────────
export type WashFeel = "tight-dry" | "normal" | "oily-fast" | "mixed";

export const washFeelOptions: {
  value: WashFeel;
  label: string;
  sub: string;
}[] = [
  { value: "tight-dry", label: "Tight and dry", sub: "Skin feels stripped, uncomfortable, might even flake" },
  { value: "normal",    label: "Fine — comfortable", sub: "No tightness, no oiliness, just normal" },
  { value: "oily-fast", label: "Oily again within an hour", sub: "Shine comes back fast, even right after washing" },
  { value: "mixed",     label: "Depends on the area", sub: "Forehead feels different from cheeks" },
];

// ── Q2: Ashy Patches ────────────────────────────────────────────────────
export type AshyLevel = "yes-often" | "sometimes" | "rarely";

export const ashyLevelOptions: {
  value: AshyLevel;
  label: string;
  sub: string;
}[] = [
  { value: "yes-often",  label: "Yes, often", sub: "White or grey patches — especially around mouth, elbows, knees" },
  { value: "sometimes",  label: "Sometimes", sub: "Only in winter or when I skip moisturiser" },
  { value: "rarely",     label: "Rarely or never", sub: "Ashiness isn't really my issue" },
];

// ── Q3: New Product Reaction ────────────────────────────────────────────
export type ProductReaction = "burns-stings" | "breaks-out" | "absorbs-fine" | "depends-area";

export const productReactionOptions: {
  value: ProductReaction;
  label: string;
  sub: string;
}[] = [
  { value: "burns-stings",  label: "Burns, stings, or turns red", sub: "My skin reacts fast — redness, irritation, sometimes breakouts" },
  { value: "breaks-out",    label: "Breaks me out", sub: "New products often cause pimples or congestion" },
  { value: "absorbs-fine",  label: "Absorbs fine — no issues", sub: "My skin handles most things well" },
  { value: "depends-area",  label: "Depends on the area", sub: "Some zones handle it, others react" },
];

// ── Q4: Midday Finish ───────────────────────────────────────────────────
export type MiddayFinish = "shiny-all" | "shiny-t-zone" | "matte-comfortable" | "tight-flaky" | "red-irritated";

export const middayFinishOptions: {
  value: MiddayFinish;
  label: string;
  sub: string;
}[] = [
  { value: "shiny-all",         label: "Shiny all over", sub: "Forehead, nose, cheeks — everything's glossy" },
  { value: "shiny-t-zone",      label: "Shiny T-zone, dry cheeks", sub: "Oily down the middle, normal or dry on the sides" },
  { value: "matte-comfortable", label: "Matte and comfortable", sub: "No excess shine, skin feels balanced" },
  { value: "tight-flaky",       label: "Tight or flaky", sub: "Dry patches, ashiness, feels like it needs more moisture" },
  { value: "red-irritated",     label: "Red or irritated", sub: "Sensitive, blotchy, or uncomfortable by afternoon" },
];

// ── Skin type determination ──────────────────────────────────────────────
export function determineSkinType(
  washFeel: WashFeel,
  ashyLevel: AshyLevel,
  reaction: ProductReaction,
  finish: MiddayFinish,
): AuntySkinType {
  const scores: Record<AuntySkinType, number> = {
    "oily": 0, "dry-ashy": 0, "combination": 0, "balanced": 0, "sensitive": 0,
  };

  // Q1: wash feel
  if (washFeel === "tight-dry")  { scores["dry-ashy"] += 3; scores["sensitive"] += 1; }
  if (washFeel === "normal")     { scores["balanced"] += 3; }
  if (washFeel === "oily-fast")  { scores["oily"] += 3; }
  if (washFeel === "mixed")      { scores["combination"] += 3; }

  // Q2: ashy patches
  if (ashyLevel === "yes-often")  { scores["dry-ashy"] += 3; }
  if (ashyLevel === "sometimes")  { scores["dry-ashy"] += 1; scores["combination"] += 1; scores["sensitive"] += 1; }
  if (ashyLevel === "rarely")     { scores["oily"] += 1; scores["balanced"] += 1; }

  // Q3: product reaction
  if (reaction === "burns-stings")  { scores["sensitive"] += 3; }
  if (reaction === "breaks-out")    { scores["oily"] += 2; scores["sensitive"] += 1; }
  if (reaction === "absorbs-fine")  { scores["balanced"] += 2; }
  if (reaction === "depends-area")  { scores["combination"] += 2; }

  // Q4: midday finish
  if (finish === "shiny-all")          { scores["oily"] += 3; }
  if (finish === "shiny-t-zone")       { scores["combination"] += 3; }
  if (finish === "matte-comfortable")  { scores["balanced"] += 3; }
  if (finish === "tight-flaky")        { scores["dry-ashy"] += 3; }
  if (finish === "red-irritated")      { scores["sensitive"] += 3; }

  let best: AuntySkinType = "balanced";
  let bestScore = -1;
  for (const [type, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      best = type as AuntySkinType;
    }
  }
  return best;
}

// ── Skin product matching by type (tiered) ──────────────────────────────
export function getSkinProductMatches(skinType: AuntySkinType): TieredMatches {
  const basics: ProductMatch[] = [];
  const essentials: ProductMatch[] = [];
  const addons: ProductMatch[] = [];

  // ── BASICS: Cleanser + primary treatments ─────────────────────────────
  switch (skinType) {
    case "oily":
      basics.push(
        { productId: "gentle-face-wash", reason: "Stripping cleansers make oily skin worse. This stays at pH 5.5 so your barrier stays intact and your glands don't panic-produce more oil." },
        { productId: "oil-free-hydration-serum", reason: "Your skin is producing oil because it's desperate for water. Hyaluronic acid + glycerin flood your skin with water — so your glands stop overcompensating with oil." },
        { productId: "sebum-control-serum", reason: "Niacinamide 10% + zinc PCA regulate sebum at the gland level. Matte without tightness — your skin stays balanced, not stripped." },
      );
      break;
    case "dry-ashy":
      basics.push(
        { productId: "gentle-face-wash", reason: "Your barrier is compromised. The last thing it needs is a harsh cleanser. This stays at your skin's natural pH so nothing gets stripped." },
        { productId: "ashy-skin-rescue", reason: "Ashiness is a broken barrier — moisture escaping faster than it's replaced. Ceramides rebuild the lipid matrix; urea draws water in; shea locks it there." },
        { productId: "ceramide-barrier-cream", reason: "Clinical-grade barrier repair. Ceramide NP + ceramide AP + cholesterol rebuild the lipid matrix your melanin-rich skin naturally lacks." },
      );
      break;
    case "combination":
      basics.push(
        { productId: "gentle-face-wash", reason: "Combination skin needs a cleanser that doesn't overstrip the dry zones or underclean the oily ones. This balances both." },
        { productId: "zone-balancing-serum", reason: "Salicylic acid 0.5% for your oily T-zone + ceramides for your dry cheeks. One serum, applied differently by zone — aunty tells you how in the app." },
        { productId: "pih-serum", reason: "Combination skin is prone to breakout-triggered PIH in the oily zones. Tranexamic acid + alpha-arbutin interrupt the pigment pathway before marks settle in." },
      );
      break;
    case "balanced":
      basics.push(
        { productId: "gentle-face-wash", reason: "Balanced skin still needs a proper cleanser. This respects your pH so every active after it works at full strength." },
        { productId: "antioxidant-glow-serum", reason: "Your skin is working. Vitamin C + niacinamide + ferulic acid protect what's already glowing — antioxidant defense, brightening, anti-pollution. Morning use only." },
      );
      break;
    case "sensitive":
      basics.push(
        { productId: "gentle-face-wash", reason: "Sensitive skin reacts to everything — especially harsh cleansers. This is pH 5.5, PHA-based, and won't trigger redness or burning." },
        { productId: "centella-calming-serum", reason: "Centella asiatica 10% + panthenol + allantoin. Reduces redness, calms inflammation, prevents the PIH that reactivity triggers. Fragrance-free, alcohol-free." },
        { productId: "pih-serum", reason: "Every time sensitive skin reacts, it leaves a dark mark. This interrupts the PIH pathway so inflammation doesn't become permanent discoloration." },
      );
      break;
  }

  // ── ESSENTIALS: SPF + secondary treatments ────────────────────────────
  essentials.push({
    productId: "spf-40",
    reason: skinType === "balanced"
      ? "The #1 thing balanced skin needs is protection. Iron oxides block visible light that triggers PIH in deeper skin — something UV-only filters miss."
      : skinType === "sensitive"
      ? "Sensitive skin marks easily. SPF with iron oxides blocks visible light — the wavelength most responsible for PIH in melanin-rich skin. Non-irritating mineral formula."
      : "Melanin-rich skin needs SPF that blocks visible light, not just UV. Iron oxides handle what chemical sunscreens miss — the #1 cause of dark marks on deeper skin tones.",
  });

  if (skinType === "oily") {
    essentials.push(
      { productId: "pih-serum", reason: "Oily skin breaks out. Breakouts leave marks. Tranexamic acid + alpha-arbutin interrupt the pigment pathway so every pimple doesn't become a 6-month dark spot." },
      { productId: "scar-defense-gel", reason: "Oily skin scars differently — keloids and raised scars are more common in melanin-rich skin. Silicone + onion extract flatten and fade while the scar is still forming." },
    );
  }

  if (skinType === "dry-ashy") {
    essentials.push({
      productId: "pih-serum",
      reason: "Dry skin cracks. Cracks inflame. Inflammation triggers PIH on melanin-rich skin. This interrupts the pigment cascade so dryness doesn't leave permanent marks.",
    });
  }

  if (skinType === "balanced") {
    essentials.push({
      productId: "pih-serum",
      reason: "Even balanced skin marks from minor inflammation — a bump, a scratch, sun exposure. Tranexamic acid + alpha-arbutin keep your even tone even.",
    });
  }

  if (skinType === "sensitive") {
    essentials.push({
      productId: "ceramide-barrier-cream",
      reason: "Sensitive skin has a weak barrier by definition. Ceramides strengthen it from the inside so fewer irritants get through. Layer this over your calming serum at night.",
    });
  }

  // ── ADD-ONS: Accessories ──────────────────────────────────────────────
  if (skinType === "oily" || skinType === "sensitive") {
    addons.push({
      productId: "ice-roller",
      reason: skinType === "oily"
        ? "Cold constricts pores and reduces morning puffiness. Two minutes before SPF gives you a tighter, more matte canvas without any product."
        : "Cold calms inflammation on contact. When your skin is reacting, this brings immediate relief — reduces redness and swelling without adding any product.",
    });
  }

  if (skinType === "balanced" || skinType === "combination") {
    addons.push({
      productId: "gua-sha",
      reason: "Lymphatic drainage and blood flow in one tool. Reduces puffiness, sculpts your jawline, and helps serums penetrate deeper. Two minutes, morning routine.",
    });
  }

  addons.push({
    productId: "silicone-face-scrubber",
    reason: skinType === "sensitive"
      ? "Silicone bristles are gentle enough for reactive skin. They clean pores without microabrasions that trigger inflammation and PIH."
      : "Deeper cleanse without irritation. Silicone bristles clear pore congestion that fingers miss — and they're antibacterial, so no bacteria buildup like cloth or sponge.",
  });

  if (skinType === "dry-ashy") {
    addons.push({
      productId: "ice-roller",
      reason: "Seals your barrier cream by driving it deeper with cold compression. Also reduces the inflammation that triggers ashiness in the first place.",
    });
  }

  if (skinType !== "sensitive") {
    addons.push({
      productId: "derma-roller",
      reason: skinType === "dry-ashy"
        ? "Micro-channels let your ceramide cream penetrate 4x deeper. Used weekly, it also stimulates collagen production to strengthen your barrier long-term."
        : "Micro-needling boosts collagen and lets serums absorb 4x deeper. Used once a week, it amplifies everything else in your routine.",
    });
  }

  if (addons.length < 2) {
    addons.push({
      productId: "gua-sha",
      reason: "Lymphatic drainage reduces puffiness and helps your serums absorb. A simple addition that makes your whole routine work harder.",
    });
  }

  return { basics, essentials, addons };
}

// ── Skin convening messages ───────────────────────────────────────────────
export function getSkinConveningMessages(skinType: AuntySkinType): string[] {
  const typeLabel = auntySkinTypes.find((t) => t.value === skinType)?.label ?? skinType;
  return [
    `Reading your skin profile…`,
    `Analyzing wash response and barrier health…`,
    `Checking melanin reactivity factors…`,
    `Determining your aunty skin type…`,
    `Building your ${typeLabel.toLowerCase()} routine…`,
    `Your aunties are finalizing your skin plan…`,
  ];
}

// ── Skin verdict messages ─────────────────────────────────────────────────
export function getSkinVerdicts(skinType: AuntySkinType): TeaserVerdict[] {
  const salma: TeaserVerdict = {
    auntyId: "salma",
    message:
      skinType === "oily"
        ? "Oil isn't the enemy — dehydration is. We give your skin what it actually needs so it stops overcompensating."
        : skinType === "sensitive"
        ? "Sensitive skin on darker tones is misunderstood. Every reaction leaves a mark. We calm first, then build."
        : "This isn't generic skincare rebadged. Every ingredient was selected for how it specifically behaves on melanin-rich skin.",
  };

  const denise: TeaserVerdict = {
    auntyId: "denise",
    message:
      skinType === "dry-ashy"
        ? "Baby, we don't throw actives at a broken barrier. We fix the barrier first. Everything else works twice as well when we do."
        : skinType === "balanced"
        ? "Your skin is already beautiful. Our job is just to protect it and keep it glowing."
        : "Healthy skin isn't complicated. The right cleanser, the right moisture, protection from UV. That's the whole secret.",
  };

  const third: TeaserVerdict =
    skinType === "dry-ashy"
      ? { auntyId: "fatou", message: "Ashiness is not a personality trait. It is a fixable barrier problem. These fix it." }
      : skinType === "combination"
      ? { auntyId: "amara", message: "Your face has zones. Most brands ignore that. We don't." }
      : skinType === "sensitive"
      ? { auntyId: "amara", message: "Your skin isn't weak — it's communicating. These products listen." }
      : { auntyId: "carmen", message: "Glow comes from within the skin, not on top of it. We build the foundation — the radiance follows." };

  return [salma, denise, third];
}
