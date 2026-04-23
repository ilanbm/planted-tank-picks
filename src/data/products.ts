export type Product = {
  id: string;
  name: string;
  brand: string;
  category:
    | "filter"
    | "heater"
    | "light"
    | "substrate"
    | "co2"
    | "testing"
    | "plant"
    | "accessory";
  asin: string;
  priceBand: "$" | "$$" | "$$$";
  shortPitch: string;
  prosConsSummary: {
    pros: string[];
    cons: string[];
  };
  fits: {
    tankSizeMinGal?: number;
    tankSizeMaxGal?: number;
    planting?: Array<"low" | "medium" | "high">;
    livestock?: Array<
      "community" | "shrimp" | "betta" | "cichlid" | "species-only"
    >;
    experience?: Array<"first" | "some" | "experienced">;
  };
  specs: Record<string, string | number>;
};

export const products: Product[] = [
  {
    id: "fluval-107",
    name: "Fluval 107 Canister Filter",
    brand: "Fluval",
    category: "filter",
    asin: "B07JGLN6XC",
    priceBand: "$$",
    shortPitch:
      "Quiet, reliable canister for 20–30 gallon planted tanks that want clear water and flexible media.",
    prosConsSummary: {
      pros: ["Quiet operation", "Easy priming", "Good media volume"],
      cons: ["Flow rate overstated", "Taps can leak over time"],
    },
    fits: {
      tankSizeMinGal: 15,
      tankSizeMaxGal: 35,
      planting: ["low", "medium", "high"],
      livestock: ["community", "betta", "species-only"],
      experience: ["some", "experienced"],
    },
    specs: { flowRateGph: 145, wattage: 10, mediaVolumeL: 2.1 },
  },
  {
    id: "fluval-207",
    name: "Fluval 207 Canister Filter",
    brand: "Fluval",
    category: "filter",
    asin: "B07JHG13WP",
    priceBand: "$$",
    shortPitch:
      "The sweet-spot canister for 30–55 gallon planted tanks. Plenty of media, fair price.",
    prosConsSummary: {
      pros: ["Generous media", "Very quiet", "Good customer support"],
      cons: ["Stock intake screens clog", "Impeller needs periodic cleaning"],
    },
    fits: {
      tankSizeMinGal: 30,
      tankSizeMaxGal: 60,
      planting: ["low", "medium", "high"],
      livestock: ["community", "cichlid", "species-only"],
      experience: ["some", "experienced"],
    },
    specs: { flowRateGph: 206, wattage: 15, mediaVolumeL: 3.0 },
  },
  {
    id: "aquaclear-50",
    name: "AquaClear 50 HOB Filter",
    brand: "AquaClear",
    category: "filter",
    asin: "B000260FUM",
    priceBand: "$",
    shortPitch:
      "The workhorse hang-on-back filter for 20–50 gallon tanks. Cheap, modular, bulletproof.",
    prosConsSummary: {
      pros: ["Huge media basket", "Adjustable flow", "Parts available forever"],
      cons: ["Noisier than canisters", "Needs priming after power loss"],
    },
    fits: {
      tankSizeMinGal: 20,
      tankSizeMaxGal: 50,
      planting: ["low", "medium"],
      livestock: ["community", "betta", "species-only"],
      experience: ["first", "some", "experienced"],
    },
    specs: { flowRateGph: 200, wattage: 6, mediaVolumeL: 1.2 },
  },
  {
    id: "sponge-filter-dual",
    name: "Dual Sponge Filter with Air Pump",
    brand: "Generic",
    category: "filter",
    asin: "B01LXRDZPO",
    priceBand: "$",
    shortPitch:
      "The shrimp-safe, fry-safe, idiot-proof option. Not pretty, but it works.",
    prosConsSummary: {
      pros: ["Safe for shrimp and fry", "Near-impossible to break", "Cheap"],
      cons: [
        "Visible in-tank",
        "Needs an air pump",
        "Less mechanical filtration",
      ],
    },
    fits: {
      tankSizeMinGal: 2,
      tankSizeMaxGal: 20,
      planting: ["low", "medium"],
      livestock: ["shrimp", "betta", "species-only"],
      experience: ["first", "some", "experienced"],
    },
    specs: { flowRateGph: 80, wattage: 3, mediaVolumeL: 0.4 },
  },
  {
    id: "eheim-jager-100w",
    name: "Eheim Jager 100W Heater",
    brand: "Eheim",
    category: "heater",
    asin: "B003SNU1I2",
    priceBand: "$$",
    shortPitch:
      "The heater hobbyists default to when they're tired of heaters failing. 20–30 gallon sweet spot.",
    prosConsSummary: {
      pros: ["Accurate thermostat", "Glass tube resistant to fogging", "Long-lived"],
      cons: ["Fragile if knocked", "Calibration knob has learning curve"],
    },
    fits: {
      tankSizeMinGal: 15,
      tankSizeMaxGal: 35,
      planting: ["low", "medium", "high"],
      livestock: ["community", "shrimp", "betta", "cichlid"],
      experience: ["first", "some", "experienced"],
    },
    specs: { wattage: 100, tempRangeF: "65–93" },
  },
  {
    id: "eheim-jager-200w",
    name: "Eheim Jager 200W Heater",
    brand: "Eheim",
    category: "heater",
    asin: "B00BTN9R2E",
    priceBand: "$$",
    shortPitch:
      "Same reliability as the 100W, sized for 40–65 gallon tanks.",
    prosConsSummary: {
      pros: ["Accurate thermostat", "Robust", "Trusted for years"],
      cons: ["Glass construction fragile", "Higher price than brands like Tetra"],
    },
    fits: {
      tankSizeMinGal: 40,
      tankSizeMaxGal: 65,
      planting: ["low", "medium", "high"],
      livestock: ["community", "cichlid", "species-only"],
      experience: ["first", "some", "experienced"],
    },
    specs: { wattage: 200, tempRangeF: "65–93" },
  },
  {
    id: "cobalt-neotherm-50w",
    name: "Cobalt Neo-Therm 50W Heater",
    brand: "Cobalt",
    category: "heater",
    asin: "B09JQ9NFB8",
    priceBand: "$$",
    shortPitch:
      "Flat, shatter-resistant heater for nano tanks (2.5–10 gallon). Betta-friendly.",
    prosConsSummary: {
      pros: ["Compact and flat", "Shatter-resistant", "Preset dial is readable"],
      cons: ["Not as accurate long-term", "More expensive per watt"],
    },
    fits: {
      tankSizeMinGal: 2,
      tankSizeMaxGal: 10,
      planting: ["low", "medium", "high"],
      livestock: ["shrimp", "betta"],
      experience: ["first", "some", "experienced"],
    },
    specs: { wattage: 50, tempRangeF: "66–96" },
  },
  {
    id: "fluval-plant-30",
    name: "Fluval Plant 3.0 LED (24–34 inch)",
    brand: "Fluval",
    category: "light",
    asin: "B07BBWSPRC",
    priceBand: "$$$",
    shortPitch:
      "The plant light for people who want an app, programmable sunrise, and enough PAR for most medium-tech setups.",
    prosConsSummary: {
      pros: ["Bluetooth programmable", "Strong full spectrum", "Good for medium-tech"],
      cons: ["Overkill for low-tech", "Expensive", "App can disconnect"],
    },
    fits: {
      tankSizeMinGal: 20,
      tankSizeMaxGal: 55,
      planting: ["medium", "high"],
      livestock: ["community", "shrimp", "betta"],
      experience: ["some", "experienced"],
    },
    specs: { parAt12in: 88, wattage: 32, lengthIn: "24–34" },
  },
  {
    id: "hygger-957",
    name: "Hygger 957 Adjustable LED",
    brand: "Hygger",
    category: "light",
    asin: "B0785QPXHR",
    priceBand: "$",
    shortPitch:
      "The budget plant light that over-performs its price. For low-tech plants and shrimp tanks.",
    prosConsSummary: {
      pros: ["Cheap", "Adjustable brackets", "Decent spectrum for low-tech"],
      cons: ["No app", "Inconsistent PAR across units", "Adhesive timer knob"],
    },
    fits: {
      tankSizeMinGal: 10,
      tankSizeMaxGal: 40,
      planting: ["low", "medium"],
      livestock: ["community", "shrimp", "betta"],
      experience: ["first", "some"],
    },
    specs: { parAt12in: 45, wattage: 18, lengthIn: "18–24" },
  },
  {
    id: "chihiros-wrgb-2",
    name: "Chihiros WRGB II Pro 60cm",
    brand: "Chihiros",
    category: "light",
    asin: "B09YQXLX2T",
    priceBand: "$$$",
    shortPitch:
      "The aquascaper's light. High-tech planted with CO2, red plants, and app color control.",
    prosConsSummary: {
      pros: ["Strong PAR", "Vivid color rendering", "Bluetooth programmable"],
      cons: ["Pricey", "App is clunky", "Needs CO2 or algae wins"],
    },
    fits: {
      tankSizeMinGal: 15,
      tankSizeMaxGal: 40,
      planting: ["high"],
      livestock: ["community", "shrimp"],
      experience: ["experienced"],
    },
    specs: { parAt12in: 120, wattage: 45, lengthIn: "24" },
  },
  {
    id: "fluval-stratum",
    name: "Fluval Stratum (Planted Substrate)",
    brand: "Fluval",
    category: "substrate",
    asin: "B00JMABYUO",
    priceBand: "$$",
    shortPitch:
      "Porous volcanic substrate that buffers pH down and grows carpet plants well. Easy on shrimp.",
    prosConsSummary: {
      pros: ["Buffers pH down", "Lightweight", "Shrimp-safe"],
      cons: ["Breaks down over 2–3 years", "Dust cloud on first fill"],
    },
    fits: {
      tankSizeMinGal: 5,
      tankSizeMaxGal: 40,
      planting: ["medium", "high"],
      livestock: ["shrimp", "community"],
      experience: ["some", "experienced"],
    },
    specs: { bagSizeLb: 8.8, grainMm: "2–4" },
  },
  {
    id: "caribsea-eco-complete",
    name: "CaribSea Eco-Complete",
    brand: "CaribSea",
    category: "substrate",
    asin: "B0002DH0QM",
    priceBand: "$$",
    shortPitch:
      "Black, heavy, mineral-rich substrate that doesn't break down. Good for low-to-medium tech.",
    prosConsSummary: {
      pros: ["Inert, won't break down", "Heavy enough to anchor plants", "No pH swing"],
      cons: ["Doesn't add nutrients over time", "Heavier to ship"],
    },
    fits: {
      tankSizeMinGal: 10,
      tankSizeMaxGal: 75,
      planting: ["low", "medium"],
      livestock: ["community", "cichlid", "betta"],
      experience: ["first", "some", "experienced"],
    },
    specs: { bagSizeLb: 20, grainMm: "1–3" },
  },
  {
    id: "co2art-pro-se",
    name: "CO2Art Pro-SE Regulator",
    brand: "CO2Art",
    category: "co2",
    asin: "B084TVM54D",
    priceBand: "$$$",
    shortPitch:
      "Reliable dual-stage regulator for injected planted tanks. Skip the Chinese knockoffs.",
    prosConsSummary: {
      pros: ["Dual-stage (no end-of-tank-dump)", "Solenoid included", "Good support"],
      cons: ["Expensive vs Amazon generics", "Still needs a CO2 tank and diffuser"],
    },
    fits: {
      tankSizeMinGal: 10,
      tankSizeMaxGal: 75,
      planting: ["high"],
      livestock: ["community", "shrimp"],
      experience: ["experienced"],
    },
    specs: { stages: 2, solenoid: "yes" },
  },
  {
    id: "api-master-kit",
    name: "API Freshwater Master Test Kit",
    brand: "API",
    category: "testing",
    asin: "B000255NCI",
    priceBand: "$$",
    shortPitch:
      "The default liquid test kit. Cheaper per test than strips, far more accurate.",
    prosConsSummary: {
      pros: ["Accurate vs strips", "Lasts months", "Trusted by hobby"],
      cons: ["Color-matching is subjective", "Doesn't include GH/KH"],
    },
    fits: {
      tankSizeMinGal: 2,
      tankSizeMaxGal: 200,
      planting: ["low", "medium", "high"],
      livestock: ["community", "shrimp", "betta", "cichlid", "species-only"],
      experience: ["first", "some", "experienced"],
    },
    specs: { testsPerBottle: "Hundreds", parameters: "pH, NH3, NO2, NO3" },
  },
];

export function productsByCategory(cat: Product["category"]): Product[] {
  return products.filter((p) => p.category === cat);
}
