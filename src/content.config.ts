import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const categories = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/categories" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    intro: z.string(),
    categoryKey: z.enum([
      "filter", "heater", "light", "substrate",
      "co2", "testing", "plant", "accessory",
    ]),
  }),
});

const decisions = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/decisions" }),
  schema: z.object({
    slug: z.string(),
    category: z.enum([
      "filters", "heaters", "lights", "substrate",
      "co2", "testing", "plants", "accessories",
    ]),
    title: z.string(),
    h1: z.string(),
    description: z.string(),
    intent: z.string(),
    productIds: z.array(z.string()),
    decisionTree: z.array(z.object({
      condition: z.string(),
      pick: z.string(),
    })),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })),
    siblingSlugs: z.array(z.string()).default([]),
    updatedAt: z.string(),
  }),
});

const pillars = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pillars" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    updatedAt: z.string(),
  }),
});

export const collections = { categories, decisions, pillars };
