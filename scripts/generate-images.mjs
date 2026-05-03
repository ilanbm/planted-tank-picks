#!/usr/bin/env node
/**
 * Generate aquascape images via Gemini's Imagen model.
 *
 * Requires: GEMINI_API_KEY in site/.env
 * Writes to: site/public/images/*.webp (optimized)
 *
 * Usage: cd site && node scripts/generate-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "images");

// --- Load .env from site/.env ----------------------------------------------
const envPath = path.join(root, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) {
      let val = m[2];
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[m[1]] = val;
    }
  }
}

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("error: GEMINI_API_KEY not found in env or site/.env");
  process.exit(1);
}

// --- Image jobs ------------------------------------------------------------
const jobs = [
  {
    filename: "hero-aquascape.webp",
    aspectRatio: "3:4",
    prompt:
      "A masterfully aquascaped freshwater planted aquarium, shot in natural warm light filtering through water from above. Dense carpet of dwarf hairgrass in the foreground, lush green Bucephalandra and Anubias on driftwood centerpiece, tall Rotala stems reaching up in the background with hints of red. Crystal clear water with subtle CO2 bubbles. A small school of neon tetras visible mid-water. Soft depth of field, editorial magazine quality photography, muted earthy color palette (deep moss green, warm sand, soft water blue), natural lighting, no logos, no text, vertical 3:4 composition.",
  },
  {
    filename: "category-filters.webp",
    aspectRatio: "16:9",
    prompt:
      "Close-up horizontal view inside a freshwater planted aquarium showing gentle water movement and bubbles near a submerged intake strainer, green aquatic plants (Anubias, moss, vallisneria) swaying softly underwater, shallow depth of field, editorial aquarium photography, muted earthy green palette, crystal clear water, natural daylight, no text, no logos, 16:9 horizontal composition.",
  },
  {
    filename: "category-lights.webp",
    aspectRatio: "16:9",
    prompt:
      "A bright freshwater planted aquarium viewed from the front, lush vibrant green aquatic plants of varied textures basking under full-spectrum light from above, calm reflective water surface, fine sand substrate, editorial aquarium photography, muted earthy green palette, warm inviting glow, no text, no logos, 16:9 horizontal composition.",
  },
  {
    filename: "category-plants.webp",
    aspectRatio: "16:9",
    prompt:
      "Macro close-up of vibrant aquarium plants underwater — broad Anubias leaves, fine java moss, and a hint of red Ludwigia — shot in soft natural light with a shallow depth of field, editorial botanical photography, muted earthy palette, crisp details on leaf veins, no text, no logos, 16:9 horizontal composition.",
  },
];

// --- Generate via Imagen 4 Fast via Gemini API -----------------------------
// Endpoint docs: https://ai.google.dev/gemini-api/docs/imagen
const MODEL = "imagen-4.0-fast-generate-001";
const URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict`;

async function generate({ prompt, aspectRatio }) {
  const res = await fetch(`${URL_BASE}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio,
        personGeneration: "dont_allow",
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Imagen API ${res.status}: ${text.slice(0, 600)}`);
  }
  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) {
    throw new Error(`No image bytes in response: ${JSON.stringify(data).slice(0, 400)}`);
  }
  return Buffer.from(b64, "base64");
}

// --- Main ------------------------------------------------------------------
async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`writing to: ${outDir}\n`);

  for (const job of jobs) {
    const outPath = path.join(outDir, job.filename);
    if (fs.existsSync(outPath)) {
      console.log(`skip (exists): ${job.filename}`);
      continue;
    }
    console.log(`generating: ${job.filename} (${job.aspectRatio})`);
    try {
      const bytes = await generate(job);
      // Imagen returns PNG/JPEG. Write as .png first then convert if tools exist.
      const tmpPath = outPath.replace(/\.webp$/, ".png");
      fs.writeFileSync(tmpPath, bytes);
      console.log(`  wrote ${tmpPath} (${(bytes.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
    }
  }
  console.log("\ndone.");
}

main();
