#!/usr/bin/env node
/**
 * Convert public/images/*.png to optimized WebP at reasonable display sizes.
 *
 * Hero: max 1200w @ q78  (target ~150 KB)
 * Category: max 1600w @ q80 (target ~180 KB)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.resolve(__dirname, "..", "public", "images");

const targets = [
  { input: "hero-aquascape.png",   output: "hero-aquascape.webp",   maxWidth: 1200, quality: 78 },
  { input: "category-filters.png", output: "category-filters.webp", maxWidth: 1600, quality: 80 },
  { input: "category-lights.png",  output: "category-lights.webp",  maxWidth: 1600, quality: 80 },
  { input: "category-plants.png",  output: "category-plants.webp",  maxWidth: 1600, quality: 80 },
];

for (const t of targets) {
  const src = path.join(imageDir, t.input);
  const dst = path.join(imageDir, t.output);
  if (!fs.existsSync(src)) {
    console.log(`skip (missing): ${t.input}`);
    continue;
  }
  const before = fs.statSync(src).size;
  await sharp(src)
    .resize({ width: t.maxWidth, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 5 })
    .toFile(dst);
  const after = fs.statSync(dst).size;
  const pct = (100 * (before - after) / before).toFixed(0);
  console.log(
    `${t.input} → ${t.output}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (−${pct}%)`,
  );
}

console.log("\ndone.");
