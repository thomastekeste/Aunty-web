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

// ── Density ────────────────────────────────────────────────────────────────
export type Density = "thin" | "medium" | "thick";

export const densityOptions: {
  value: Density;
  label: string;
  desc: string;
}[] = [
  {
    value: "thin",
    label: "Thin",
    desc: "I can easily see my scalp when I part my hair",
  },
  {
    value: "medium",
    label: "Medium",
    desc: "I can see my scalp if I look closely or part it",
  },
  {
    value: "thick",
    label: "Thick",
    desc: "Hard to see my scalp — a lot of hair",
  },
];

// ── Struggles ──────────────────────────────────────────────────────────────
export type Struggle =
  | "dryness"
  | "breakage"
  | "frizz"
  | "shrinkage"
  | "scalp"
  | "edges"
  | "detangling"
  | "knots"
  | "heat-damage"
  | "transition"
  | "growth"
  | "over-moisturized"
  | "thinning-crown"
  | "protective-buildup";

export const struggleOptions: {
  value: Struggle;
  label: string;
  sub: string;
}[] = [
  { value: "dryness",     label: "Dryness & crunch",           sub: "Products absorb but hair still feels dry" },
  { value: "breakage",    label: "Breakage & shedding",        sub: "Losing length no matter what I do" },
  { value: "frizz",       label: "Frizz I can't tame",         sub: "Especially in humidity or after drying" },
  { value: "shrinkage",   label: "Shrinkage frustration",      sub: "Can't see my length when it's dry" },
  { value: "scalp",       label: "Itchy or flaky scalp",       sub: "Buildup, dandruff, or irritation" },
  { value: "edges",       label: "Thinning edges or hairline", sub: "Edges are sparse, fragile, or slow to grow back" },
  { value: "detangling",  label: "Detangling takes forever",   sub: "Every wash day is a battle" },
  { value: "knots",       label: "Single-strand knots",        sub: "Tiny knots along the strand that keep forming" },
  { value: "heat-damage",        label: "Heat or color damage",          sub: "Curls won't spring back the way they used to" },
  { value: "transition",         label: "Transitioning to natural",      sub: "Two textures, dealing with the line between them" },
  { value: "growth",             label: "Slow growth / length loss",     sub: "Growing but not keeping length" },
  { value: "over-moisturized",   label: "Mushy or gummy hair",           sub: "Hair feels limp and weak — too soft, no bounce" },
  { value: "thinning-crown",     label: "Thinning at the crown",         sub: "Hair loss focused at the top or center of the head" },
  { value: "protective-buildup", label: "Buildup from protective styles",sub: "Flaking, itching, or odor under braids, wigs, or locs" },
];

// ── Goals ──────────────────────────────────────────────────────────────────
export type Goal =
  | "moisture"
  | "length-retention"
  | "definition"
  | "damage-repair"
  | "scalp-health"
  | "simplify"
  | "go-natural"
  | "edges-back"
  | "stronger-strands"
  | "protein-balance";

export const goalOptions: {
  value: Goal;
  label: string;
  sub: string;
}[] = [
  { value: "moisture",        label: "Moisture & softness",       sub: "Hair that feels soft, not crunchy or straw-like" },
  { value: "length-retention",label: "Keep my length",            sub: "Grow it AND keep it — stop the breakage cycle" },
  { value: "definition",      label: "Curl definition",           sub: "Bouncy, clumped, uniform curls or coils" },
  { value: "damage-repair",   label: "Repair damage",             sub: "Rebuild from heat, color, or chemical treatment" },
  { value: "scalp-health",    label: "Scalp health",              sub: "Stop the itch, flaking, and buildup at the root" },
  { value: "simplify",        label: "Simpler routine",           sub: "Fewer products, less time, better results" },
  { value: "go-natural",      label: "Embrace my natural texture",sub: "Navigate the transition or learn my real curl" },
  { value: "edges-back",       label: "Grow my edges back",           sub: "Rebuild the hairline and protect it" },
  { value: "stronger-strands", label: "Stronger strands",            sub: "Less shedding, less single-strand knots, more resilience" },
  { value: "protein-balance",  label: "Fix protein-moisture balance", sub: "Hair that's strong AND soft — not one or the other" },
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

export function getStruggleValidation(struggle: Struggle): string[] {
  switch (struggle) {
    case "dryness":     return ["Dryness.", "You've been feeding it — it's just not absorbing. We'll fix that."];
    case "breakage":    return ["Breakage.", "You're growing it. The strand just can't survive to length. That's fixable."];
    case "frizz":       return ["Frizz.", "Your hair is asking for moisture and definition at the same time. I hear it."];
    case "shrinkage":   return ["Shrinkage.", "Your curl is healthy — let's talk retention."];
    case "scalp":       return ["Scalp issues.", "The scalp sets the foundation for everything. We start there."];
    case "edges":       return ["Thinning edges.", "Fragile and often ignored. Aunty sees it. We protect what's left and bring it back."];
    case "detangling":  return ["Detangling struggles.", "Your wash day shouldn't take half a day. Let's fix the approach."];
    case "knots":       return ["Single-strand knots.", "Common in tight coils. The fix is moisture, slip, and protection."];
    case "heat-damage": return ["Heat or color damage.", "The pattern is disrupted — but it can be rebuilt. Slowly and correctly."];
    case "transition":         return ["Transitioning.", "Two textures is real work. I'll make it manageable."];
    case "growth":             return ["Length retention.", "The hair is growing. We just need to stop it from breaking off at the same pace."];
    case "over-moisturized":   return ["Hygral fatigue.", "Your hair is waterlogged — the cuticle swells every wash and never fully recovers. We rebalance with protein first."];
    case "thinning-crown":     return ["Crown thinning.", "This could be CCCA — scarring alopecia that affects 1 in 20 Black women. Early intervention matters. We act now."];
    case "protective-buildup": return ["Protective style buildup.", "Beautiful on the outside, buildup underneath. Your scalp microbiome needs rebalancing."];
  }
}

// ── Product matching ──────────────────────────────────────────────────────
// Returns ordered product IDs with a reason string for each
export interface ProductMatch {
  productId: string;
  reason: string;
}

export function getProductMatches(
  hairType: HairCategory,
  porosity: Porosity,
  density: Density,
  struggle: Struggle,
  goal: Goal
): ProductMatch[] {
  const matches: ProductMatch[] = [];

  // ── Shampoo (porosity-driven + protective style buildup) ───────────────
  if (struggle === "protective-buildup" || (struggle === "scalp" && goal === "scalp-health")) {
    matches.push({
      productId: "scalp-microbiome-shampoo",
      reason: "Protective styles trap sebum, product residue, and bacteria against the scalp for weeks. This shampoo rebalances your scalp microbiome with zinc pyrithione + tea tree + prebiotics — clearing what built up without stripping everything else.",
    });
  } else if (porosity === "low") {
    matches.push({
      productId: "clarifying-shampoo",
      reason: "Your low porosity hair builds up product on the cuticle instead of absorbing it. This shampoo clears that congestion so every product after it can actually get in.",
    });
  } else {
    matches.push({
      productId: "moisturizing-shampoo",
      reason: "With high porosity hair, even cleansing can strip moisture. This shampoo cleanses while depositing hydration so you don't start wash day in a deficit.",
    });
  }

  // ── Conditioner / Deep Conditioner ────────────────────────────────────
  if (struggle === "over-moisturized" || goal === "protein-balance") {
    matches.push({
      productId: "hygral-fatigue-conditioner",
      reason: "Your hair is over-moisturized — the cuticle swells every wash and never fully recovers. This conditioner seals with protein first, then moisture, preventing the swelling cycle that's making your hair mushy and weak.",
    });
  } else if (struggle === "breakage" && goal === "stronger-strands") {
    matches.push({
      productId: "protein-moisture-conditioner",
      reason: "Your hair needs the ratio dialed in — not just more of everything. This comes in three variants matched via the app quiz: protein-heavy, moisture-heavy, or balanced. Because the ratio matters more than the ingredients.",
    });
  } else if (porosity === "high" || struggle === "dryness" || struggle === "breakage" || goal === "moisture" || goal === "damage-repair") {
    matches.push({
      productId: "deep-conditioner",
      reason: `${porosity === "high" ? "High porosity hair needs deep conditioning every wash day — not as a treat, as a requirement." : "Your struggle with " + struggle + " starts with moisture."} Marcia's formula floods the strand and uses protein to seal the gains in.`,
    });
  } else {
    matches.push({
      productId: "lightweight-conditioner",
      reason: "Low porosity hair gets weighed down fast. This conditioner gives you detangling slip without the heaviness that causes buildup.",
    });
  }

  // ── Protein-moisture balance (add-on when relevant) ───────────────────
  if (goal === "protein-balance" && struggle !== "over-moisturized") {
    matches.push({
      productId: "protein-moisture-conditioner",
      reason: "Three variants — protein-heavy, moisture-heavy, or balanced — matched to your hair via the in-app quiz. Because the ratio matters more than the ingredients.",
    });
  }

  // ── CCCA Scalp Treatment ──────────────────────────────────────────────
  if (struggle === "thinning-crown") {
    matches.push({
      productId: "ccca-scalp-treatment",
      reason: "Crown thinning in Black women is often CCCA — scarring alopecia that destroys follicles permanently if untreated. Centella asiatica + salicylic acid + zinc pyrithione calm inflammation and protect follicles before scarring progresses. Early action is everything.",
    });
  }

  // ── Scalp care ────────────────────────────────────────────────────────
  if (struggle === "scalp" || struggle === "growth" || struggle === "edges" || struggle === "thinning-crown" || struggle === "protective-buildup" || goal === "scalp-health" || goal === "length-retention" || goal === "edges-back") {
    matches.push({
      productId: "scalp-serum",
      reason: `${struggle === "edges" || goal === "edges-back" ? "Thinning edges start at the scalp." : "Healthy hair starts at the root."} Salicylic acid clears buildup that's blocking your follicles; niacinamide calms the inflammation underneath.`,
    });
  }

  // ── Edge Repair Serum ─────────────────────────────────────────────────
  if (struggle === "edges" || goal === "edges-back") {
    matches.push({
      productId: "edge-repair-serum",
      reason: "Braids, cornrows, extensions — your edges remember every style. Castor oil + peptides + biotin target hairline damage from traction specifically. Lightweight and anti-inflammatory so it heals without weighing down fragile baby hairs.",
    });
  }

  if (struggle === "growth" || goal === "length-retention" || goal === "edges-back" || struggle === "breakage") {
    matches.push({
      productId: "growth-oil",
      reason: "You're growing hair — you're just not keeping it. Rosemary and castor oil feed the follicle and strengthen the base of each strand so length survives past the breakage point.",
    });
  }

  // ── Styler (curl type + porosity) ─────────────────────────────────────
  if (hairType === "wavy" || hairType === "curly" || porosity === "low") {
    matches.push({
      productId: "liquid-curl-creme",
      reason: `${hairType === "wavy" || hairType === "curly" ? "Lighter curl patterns need definition without weight." : "Low porosity hair gets gunky fast."} No crunch, no residue — just your curl pattern, amplified.`,
    });
  } else {
    matches.push({
      productId: "rich-curl-creme",
      reason: "Dense coily hair loses moisture fast once styled. The butter base seals the cuticle so your definition holds and your strands stay soft all day.",
    });
  }

  // Deduplicate (keep first occurrence)
  const seen = new Set<string>();
  return matches.filter((m) => {
    if (seen.has(m.productId)) return false;
    seen.add(m.productId);
    return true;
  });
}

// ── Convening messages ────────────────────────────────────────────────────
export function getConveningMessages(
  hairType: HairCategory,
  porosity: Porosity,
  struggle: Struggle,
  goal: Goal
): string[] {
  const typeLabel = hairCategoryOptions.find((o) => o.value === hairType)?.label ?? hairType;
  const goalLabel = goalOptions.find((o) => o.value === goal)?.label ?? goal;
  return [
    `Reading your ${typeLabel.toLowerCase()} hair profile…`,
    `Checking ${porosity} porosity needs…`,
    `Matching products for ${struggleOptions.find((o) => o.value === struggle)?.label.toLowerCase() ?? struggle}…`,
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
  struggle: Struggle,
  goal: Goal
): TeaserVerdict[] {
  const isCoily = hairType === "coily" || hairType === "coily-dense";
  const isWavy = hairType === "wavy";

  const ngozi: TeaserVerdict = {
    auntyId: "ngozi",
    message:
      struggle === "dryness"
        ? "Ahn ahn! I knew it. This hair is THIRSTY. I already know what you need — come, let me show you."
        : struggle === "breakage"
          ? "You been rough with this hair, abi? No worry — Aunty has a plan. We start with moisture, always."
          : struggle === "growth" || goal === "length-retention"
            ? "You growing it but it's not staying. Feed the root, protect the ends. That's the whole secret."
            : "I see you. I see this hair. And I already know what we doing first.",
  };

  const denise: TeaserVerdict = {
    auntyId: "denise",
    message:
      goal === "length-retention"
        ? "Baby, I been retaining length since before it was a hashtag. Your aunties got you."
        : goal === "moisture"
          ? "Honey, moisture is the foundation of EVERYTHING. We about to build you a whole ritual."
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
// SKIN QUIZ DATA
// ════════════════════════════════════════════════════════════════════════════

// ── Skin Concern ──────────────────────────────────────────────────────────
export type SkinConcern = "pih" | "dry-ashy" | "bumpy" | "glow";

export const skinConcernOptions: {
  value: SkinConcern;
  label: string;
  desc: string;
  detail: string;
}[] = [
  {
    value: "pih",
    label: "Dark spots & hyperpigmentation",
    desc: "Post-acne marks, uneven tone, patches that linger",
    detail: "Almost always PIH — melanin overproduction triggered by inflammation. The dark mark stays long after the original cause has healed.",
  },
  {
    value: "dry-ashy",
    label: "Dry & ashy skin",
    desc: "White or grey cast, tightness, rough patches",
    detail: "Ashiness is a visible sign of barrier breakdown — moisture escaping faster than it's replaced. More visible on darker skin tones because of the contrast.",
  },
  {
    value: "bumpy",
    label: "Bumpy or rough texture",
    desc: "Sandpaper texture, razor bumps, or small itchy bumps",
    detail: "Bumpy skin has three common causes — KP, razor bumps, or fungal acne — and each needs a different fix. We identify yours first.",
  },
  {
    value: "glow",
    label: "Glow & barrier health",
    desc: "Dull, flat skin that doesn't look or feel healthy",
    detail: "A damaged or undernourished barrier looks dull and feels reactive. Build the foundation right and the glow follows naturally.",
  },
];

// ── Skin Type ─────────────────────────────────────────────────────────────
export type SkinType = "oily" | "dry" | "combo" | "sensitive";

export const skinTypeOptions: {
  value: SkinType;
  label: string;
  desc: string;
}[] = [
  { value: "oily",      label: "Oily",        desc: "Shiny all over by midday — enlarged pores, prone to breakouts" },
  { value: "dry",       label: "Dry",         desc: "Feels tight or rough after cleansing — prone to flaking" },
  { value: "combo",     label: "Combination", desc: "Oily T-zone (forehead, nose, chin), drier or normal on cheeks" },
  { value: "sensitive", label: "Sensitive",   desc: "Reacts to new products — redness, burning, or breakouts easily" },
];

// ── Skin Struggles ────────────────────────────────────────────────────────
export type SkinStruggle =
  | "dark-spots"
  | "ashiness"
  | "razor-bumps"
  | "kp"
  | "dullness"
  | "tightness"
  | "texture"
  | "sensitivity"
  | "oiliness";

export const skinStruggleOptions: {
  value: SkinStruggle;
  label: string;
  sub: string;
}[] = [
  { value: "dark-spots",  label: "Dark spots & marks",       sub: "PIH, post-acne marks, uneven patches that won't fade" },
  { value: "ashiness",    label: "Ashiness & dryness",       sub: "White or grey cast — especially visible on darker skin" },
  { value: "razor-bumps", label: "Razor bumps",              sub: "Ingrown hairs on beard, neck, or bikini area" },
  { value: "kp",          label: "Keratosis pilaris",        sub: "Sandpaper bumps on arms, thighs, or cheeks" },
  { value: "dullness",    label: "Dull, flat skin",          sub: "No glow — looks tired even when rested" },
  { value: "tightness",   label: "Tightness after washing",  sub: "Skin feels stripped and uncomfortable post-cleanse" },
  { value: "texture",     label: "Rough surface texture",    sub: "Uneven, not smooth to touch, pores look large" },
  { value: "sensitivity", label: "Redness & sensitivity",    sub: "Reacts to actives — barrier feels compromised" },
  { value: "oiliness",    label: "Excess oil & shine",       sub: "Shiny by midday, makeup doesn't hold" },
];

// ── Skin Goals ────────────────────────────────────────────────────────────
export type SkinGoal =
  | "fade-spots"
  | "hydration"
  | "even-tone"
  | "protection"
  | "smooth-texture"
  | "barrier-repair"
  | "radiance";

export const skinGoalOptions: {
  value: SkinGoal;
  label: string;
  sub: string;
}[] = [
  { value: "fade-spots",     label: "Fade dark spots",        sub: "Consistent, visible reduction in PIH and marks" },
  { value: "hydration",      label: "Deep hydration",         sub: "Skin that stays soft and moisturised all day" },
  { value: "even-tone",      label: "Even, unified tone",     sub: "No patches, no ashiness — one consistent complexion" },
  { value: "protection",     label: "Protect from damage",    sub: "Guard against UV triggers and further PIH" },
  { value: "smooth-texture", label: "Smoother texture",       sub: "Less bumpy, refined surface, fewer rough patches" },
  { value: "barrier-repair", label: "Repair my barrier",      sub: "Stop the reactivity and rebuild from scratch" },
  { value: "radiance",       label: "Glow & radiance",        sub: "Luminous, healthy-looking skin from the inside out" },
];

// ── Skin validation copy ──────────────────────────────────────────────────
export function getSkinConcernValidation(concern: SkinConcern): string[] {
  switch (concern) {
    case "pih":
      return ["Post-Inflammatory Hyperpigmentation.", "Your melanocytes are overreacting to trauma. We block that pathway before it settles in."];
    case "dry-ashy":
      return ["Barrier breakdown.", "Melanin-rich skin naturally has fewer ceramides. We rebuild the foundation first."];
    case "bumpy":
      return ["Bumpy texture.", "Three possible causes — each needing a different fix. We identify yours before recommending anything."];
    case "glow":
      return ["Barrier health and glow.", "Radiance isn't a product. It's what the skin looks like when the barrier is right."];
  }
}

// ── Skin product matching ─────────────────────────────────────────────────
export function getSkinProductMatches(
  concern: SkinConcern,
  skinType: SkinType,
  struggle: SkinStruggle,
  goal: SkinGoal
): ProductMatch[] {
  const matches: ProductMatch[] = [];

  // Cleanser — always first
  matches.push({
    productId: "gentle-face-wash",
    reason:
      concern === "pih" || struggle === "dark-spots"
        ? "Stripping cleansers trigger inflammation — and inflammation on melanin-rich skin means PIH. This stays at pH 5.5 and uses a PHA that gently exfoliates without breaking the barrier."
        : concern === "bumpy"
        ? "Treating texture starts with a cleanser that doesn't worsen it. Gluconolactone lifts dead cells without micro-tears that trigger more PIH."
        : "The foundation of every routine. A cleanser that respects your skin's natural pH so every active after it can actually work.",
  });

  // PIH serum — for dark spots / PIH concern / fade goals
  if (concern === "pih" || struggle === "dark-spots" || goal === "fade-spots" || goal === "even-tone") {
    matches.push({
      productId: "pih-serum",
      reason: "This formula blocks melanin overproduction at multiple steps simultaneously: tranexamic acid interrupts the trigger, alpha-arbutin slows the melanin-producing enzyme, azelaic acid normalises cell turnover. One ingredient isn't enough — you need all three.",
    });
  }

  // SPF — non-negotiable for PIH
  if (concern === "pih" || struggle === "dark-spots" || goal === "fade-spots" || goal === "protection") {
    matches.push({
      productId: "spf-40",
      reason: "UV light is the #1 trigger for PIH — every other ingredient fights a losing battle without this. The iron oxides in this formula also block visible light, which triggers PIH in deeper skin tones that standard UV filters miss entirely.",
    });
  }

  // Ashy Skin Rescue — for dry/barrier concerns
  if (concern === "dry-ashy" || struggle === "ashiness" || struggle === "tightness" || struggle === "sensitivity" || goal === "hydration" || goal === "barrier-repair") {
    matches.push({
      productId: "ashy-skin-rescue",
      reason: "Melanin-rich skin naturally produces fewer ceramides — the lipids that hold the barrier together. This replenishes ceramides at a molecular level, urea draws water in, and shea locks it there. The three-layer moisturising system in one product.",
    });
  }

  // Scar Defense Gel — for bumpy / texture / razor bumps
  if (concern === "bumpy" || struggle === "razor-bumps" || struggle === "kp" || struggle === "texture" || goal === "smooth-texture") {
    matches.push({
      productId: "scar-defense-gel",
      reason:
        struggle === "razor-bumps"
          ? "Razor bumps on darker skin always leave PIH behind. Centella calms the inflammatory response so bumps heal flat; allantoin fades existing marks. Use alongside a BHA toner post-shave."
          : "Centella asiatica calms the inflammation that causes bumps to heal as raised marks. Silicone keeps the skin surface flat while it heals. Allantoin dissolves and softens existing texture.",
    });
  }

  // Glow path with no barrier product yet — add it
  if ((concern === "glow" || goal === "radiance") && !matches.find((m) => m.productId === "ashy-skin-rescue")) {
    matches.push({
      productId: "ashy-skin-rescue",
      reason: "Glow is what the skin looks like when the barrier is intact and light reflects evenly off the surface. Ceramides rebuild that foundation from the inside out.",
    });
  }

  // Deduplicate
  const seen = new Set<string>();
  return matches.filter((m) => {
    if (seen.has(m.productId)) return false;
    seen.add(m.productId);
    return true;
  });
}

// ── Skin convening messages ───────────────────────────────────────────────
export function getSkinConveningMessages(
  concern: SkinConcern,
  skinType: SkinType,
  struggle: SkinStruggle,
  goal: SkinGoal
): string[] {
  const concernLabel = skinConcernOptions.find((o) => o.value === concern)?.label ?? concern;
  const goalLabel = skinGoalOptions.find((o) => o.value === goal)?.label ?? goal;
  return [
    `Reading your ${skinType} skin profile…`,
    `Analyzing ${concernLabel.toLowerCase()}…`,
    `Checking melanin reactivity factors…`,
    `Matching active ingredients to your concern…`,
    `Building your morning and evening routine…`,
    `Your aunties are finalizing your skin plan…`,
  ];
}

// ── Skin verdict messages ─────────────────────────────────────────────────
export function getSkinVerdicts(
  concern: SkinConcern,
  skinType: SkinType,
  struggle: SkinStruggle,
  goal: SkinGoal
): TeaserVerdict[] {
  const salma: TeaserVerdict = {
    auntyId: "salma",
    message:
      concern === "pih"
        ? "I've been formulating for melanin-rich skin for years. The ingredients in your routine don't just fade spots — they interrupt the pathway that creates them."
        : concern === "bumpy"
        ? "Bumpy skin on darker skin tones needs careful hands. Wrong ingredient means more PIH on top. Everything here was chosen to fix without triggering."
        : "This isn't generic skincare rebadged. Every ingredient was selected for how it specifically behaves on melanin-rich skin. The difference is real.",
  };

  const denise: TeaserVerdict = {
    auntyId: "denise",
    message:
      goal === "hydration" || goal === "barrier-repair" || concern === "dry-ashy"
        ? "Baby, we don't throw actives at a broken barrier. We fix the barrier first. Everything else works twice as well when we do."
        : goal === "fade-spots" || concern === "pih"
        ? "Fading spots is a marathon, not a sprint. But with this routine, you will see it. Give it 8 weeks of consistency."
        : "Healthy skin isn't complicated. The right cleanser, the right moisture, protection from UV. That's it. That's the whole secret.",
  };

  const third: TeaserVerdict =
    concern === "pih" || struggle === "dark-spots"
      ? { auntyId: "amara", message: "Every dark spot has a story. The ingredients we chose interrupt the story before it settles into the skin." }
      : concern === "dry-ashy" || struggle === "ashiness"
      ? { auntyId: "fatou", message: "Ashiness is not a personality trait. It is a fixable barrier problem. These fix it." }
      : concern === "bumpy"
      ? { auntyId: "amara", message: "Texture on melanin-rich skin responds to patience and the right chemistry. This formula understands both." }
      : { auntyId: "carmen", message: "Glow comes from within the skin, not on top of it. We build the foundation — the radiance follows." };

  return [salma, denise, third];
}
