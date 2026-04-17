import type { Product } from "./products";
import { products } from "./products";

/**
 * "unsure" = user hasn't decided. The calculator substitutes a safe-starter
 * default for that field before scoring and adds a note to the result so the
 * user knows we made the assumption for them.
 */
export type CalculatorInput = {
  tankSizeGal: number | "unsure";
  planting: "low" | "medium" | "high" | "unsure";
  livestock: "community" | "shrimp" | "betta" | "cichlid" | "species-only" | "unsure";
  experience: "first" | "some" | "experienced";
};

type ResolvedInput = {
  tankSizeGal: number;
  planting: "low" | "medium" | "high";
  livestock: "community" | "shrimp" | "betta" | "cichlid" | "species-only";
  experience: "first" | "some" | "experienced";
};

/**
 * The hobby-consensus "safe first tank" defaults, applied when the user picks
 * "I'm not sure yet" or "First tank" without specifying downstream choices.
 */
const SAFE_STARTER: ResolvedInput = {
  tankSizeGal: 20,
  planting: "low",
  livestock: "community",
  experience: "first",
};

function resolve(input: CalculatorInput): { resolved: ResolvedInput; substituted: string[] } {
  const substituted: string[] = [];
  const resolved: ResolvedInput = { ...SAFE_STARTER };

  if (input.tankSizeGal === "unsure") {
    substituted.push(
      `We defaulted to a ${SAFE_STARTER.tankSizeGal}-gallon tank — the most forgiving size for a first build.`,
    );
  } else {
    resolved.tankSizeGal = input.tankSizeGal;
  }

  if (input.planting === "unsure") {
    substituted.push(
      "We defaulted to low-tech planting (no CO₂, hardy plants) — the easiest way to succeed with plants.",
    );
  } else {
    resolved.planting = input.planting;
  }

  if (input.livestock === "unsure") {
    substituted.push(
      "We defaulted to a community setup (tetras, rasboras, corys) — the most flexible starter livestock.",
    );
  } else {
    resolved.livestock = input.livestock;
  }

  resolved.experience = input.experience;

  return { resolved, substituted };
}

function fits(p: Product, input: ResolvedInput): number {
  if (
    p.fits.tankSizeMinGal !== undefined &&
    input.tankSizeGal < p.fits.tankSizeMinGal
  ) return 0;
  if (
    p.fits.tankSizeMaxGal !== undefined &&
    input.tankSizeGal > p.fits.tankSizeMaxGal
  ) return 0;
  if (p.fits.planting && !p.fits.planting.includes(input.planting)) return 0;
  if (p.fits.livestock && !p.fits.livestock.includes(input.livestock)) return 0;
  if (p.fits.experience && !p.fits.experience.includes(input.experience)) return 0;

  let score = 10;
  if (p.fits.tankSizeMinGal !== undefined && p.fits.tankSizeMaxGal !== undefined) {
    const mid = (p.fits.tankSizeMinGal + p.fits.tankSizeMaxGal) / 2;
    const deviation = Math.abs(input.tankSizeGal - mid);
    score -= deviation / 20;
  }
  if (input.experience === "first" && p.priceBand === "$") score += 2;
  if (input.experience === "experienced" && p.priceBand === "$$$") score += 1;
  return Math.max(score, 0.1);
}

function pickBest(
  category: Product["category"],
  input: ResolvedInput,
): Product | null {
  const ranked = products
    .filter((p) => p.category === category)
    .map((p) => ({ p, score: fits(p, input) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.p ?? null;
}

export type CalculatorResult = {
  filter: Product | null;
  heater: Product | null;
  light: Product | null;
  substrate: Product | null;
  co2: Product | null;
  testing: Product | null;
  notes: string[];
  /** Plain-language description of the setup we're recommending against, e.g., "20-gal low-tech community" */
  setupSummary: string;
};

export function recommend(input: CalculatorInput): CalculatorResult {
  const { resolved, substituted } = resolve(input);
  const notes: string[] = [...substituted];
  const co2Needed = resolved.planting === "high";

  const filter = pickBest("filter", resolved);
  const heater = resolved.tankSizeGal <= 1 ? null : pickBest("heater", resolved);
  const light = pickBest("light", resolved);
  const substrate = pickBest("substrate", resolved);
  const co2 = co2Needed ? pickBest("co2", resolved) : null;
  const testing = pickBest("testing", resolved);

  if (!co2Needed && resolved.planting !== "low") {
    notes.push(
      "Medium-tech tanks do well on liquid carbon or nothing; CO₂ injection is optional.",
    );
  }
  if (resolved.livestock === "shrimp" && filter?.id !== "sponge-filter-dual") {
    notes.push(
      "If you keep shrimp long-term, consider adding a sponge pre-filter or switching to a sponge filter for fry safety.",
    );
  }
  if (resolved.experience === "first" && resolved.planting === "high") {
    notes.push(
      "High-tech CO₂ tanks fight back when you're still learning. Consider starting low-tech and upgrading in six months.",
    );
  }

  const plantingLabel: Record<ResolvedInput["planting"], string> = {
    low: "low-tech", medium: "medium-tech", high: "high-tech",
  };
  const livestockLabel: Record<ResolvedInput["livestock"], string> = {
    community: "community", shrimp: "shrimp", betta: "betta",
    cichlid: "cichlid", "species-only": "species-only",
  };
  const setupSummary = `${resolved.tankSizeGal}-gal · ${plantingLabel[resolved.planting]} · ${livestockLabel[resolved.livestock]}`;

  return { filter, heater, light, substrate, co2, testing, notes, setupSummary };
}
