export const siteConfig = {
  domain: "example.com",
  siteName: "Planted Tank Picks",
  tagline: "Straight-answer gear picks for planted aquariums",
  description:
    "Decision-framework guides for planted freshwater aquariums. Filters, heaters, lights, substrate, CO2 — picked by tank size and setup.",
  amazonAssociateTag: "",
  amazonMarketplace: "amazon.com",
  defaultImage: "/og-default.png",
  author: "Planted Tank Picks Editorial",
  yearStarted: 2026,
} as const;

export function amazonUrl(asin: string): string {
  const base = `https://www.${siteConfig.amazonMarketplace}/dp/${asin}`;
  return siteConfig.amazonAssociateTag
    ? `${base}?tag=${siteConfig.amazonAssociateTag}`
    : base;
}

export function amazonSearchUrl(query: string): string {
  const q = encodeURIComponent(query);
  const base = `https://www.${siteConfig.amazonMarketplace}/s?k=${q}`;
  return siteConfig.amazonAssociateTag
    ? `${base}&tag=${siteConfig.amazonAssociateTag}`
    : base;
}
