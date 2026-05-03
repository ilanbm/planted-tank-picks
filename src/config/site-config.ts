export const siteConfig = {
  domain: "www.plantedtankgear.com",
  siteName: "Planted Tank Gear",
  tagline: "Gear guides for planted freshwater aquariums",
  description:
    "Decision-framework guides for planted freshwater aquariums. Filters, heaters, lights, substrate, and CO2 picked by tank size and setup.",
  amazonAssociateTag: "plantedtankge-20",
  amazonMarketplace: "amazon.com",
  defaultImage: "/images/hero-aquascape.webp",
  author: "Planted Tank Gear Editorial",
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
