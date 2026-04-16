import type { Product } from "./products";
import { products } from "./products";

export type CalculatorInput = {
  tankSizeGal: number;
  planting: "low" | "medium" | "high";
  livestock: "community" | "shrimp" | "betta" | "cichlid" | "species-only";
  experience: "first" | "some" | "experienced";
};

function fits(p: Product, input: CalculatorInput): number {
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
  input: CalculatorInput,
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
};

export function recommend(input: CalculatorInput): CalculatorResult {
  const notes: string[] = [];
  const co2Needed = input.planting === "high";
  const result: CalculatorResult = {
    filter: pickBest("filter", input),
    heater: input.tankSizeGal <= 1 ? null : pickBest("heater", input),
    light: pickBest("light", input),
    substrate: pickBest("substrate", input),
    co2: co2Needed ? pickBest("co2", input) : null,
    testing: pickBest("testing", input),
    notes,
  };

  if (!co2Needed && input.planting !== "low") {
    notes.push(
      "Medium-tech tanks do well on liquid carbon or nothing; CO2 injection is optional.",
    );
  }
  if (input.livestock === "shrimp" && result.filter?.id !== "sponge-filter-dual") {
    notes.push(
      "If you keep shrimp long-term, consider adding a sponge pre-filter or switching to a sponge filter for fry safety.",
    );
  }
  if (input.experience === "first" && input.planting === "high") {
    notes.push(
      "High-tech CO2 tanks fight back when you're still learning. Consider starting low-tech and upgrading in six months.",
    );
  }
  return result;
}
