#!/usr/bin/env node
// ------------------------------------------------------------
// Programmatic art generation for The Sundered Reach.
//
// Reads scripts/art.config.json, calls an image-generation API for each
// subject, downscales + converts to WebP, and writes the result to
// src/assets/{dragons,locations}/<id>.webp. The running game auto-discovers
// those files via src/assetManifest.js — no code changes needed after generating.
//
// Usage:
//   npm i -D sharp openai          # one-time (not part of the app build)
//   OPENAI_API_KEY=sk-... npm run art            # generate missing assets
//   OPENAI_API_KEY=sk-... npm run art -- --force # regenerate everything
//   OPENAI_API_KEY=sk-... npm run art -- --only=cindermaw
//
// Swap providers with ART_PROVIDER (default: openai). Stubs for Stability /
// Replicate / fal are noted below — each just needs to return an image Buffer.
//
// NOTE: keys come from env only — never commit them. Outputs are reviewed by a
// human before shipping; generate ORIGINAL creatures only (no franchise art).
// ------------------------------------------------------------
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = path.join(ROOT, "scripts", "art.config.json");
const OUT_DIR = {
  dragon: path.join(ROOT, "src/assets/dragons"),
  location: path.join(ROOT, "src/assets/locations"),
};
const TARGET_WIDTH = { dragon: 512, location: 1600 };

const FORCE = process.argv.includes("--force");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").split("=")[1];
const PROVIDER = process.env.ART_PROVIDER || "openai";

// ── Providers: each returns a PNG/JPEG Buffer for (prompt, size) ──
async function openai(prompt, size) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not set");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: "gpt-image-1", prompt, size, n: 1 }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return Buffer.from(json.data[0].b64_json, "base64");
}

// Example alternatives (uncomment + implement, then set ART_PROVIDER):
//   stability  -> POST https://api.stability.ai/v2beta/stable-image/generate/core (supports seed for consistency)
//   replicate  -> POST https://api.replicate.com/v1/predictions (e.g. black-forest-labs/flux-1.1-pro, supports seed)
//   fal        -> POST https://fal.run/fal-ai/flux/dev
const PROVIDERS = { openai };

async function main() {
  const sharp = (await import("sharp").catch(() => {
    throw new Error('Missing "sharp". Run: npm i -D sharp openai');
  })).default;

  const cfg = JSON.parse(await readFile(CONFIG, "utf8"));
  const gen = PROVIDERS[PROVIDER];
  if (!gen) throw new Error(`Unknown ART_PROVIDER "${PROVIDER}". Available: ${Object.keys(PROVIDERS).join(", ")}`);

  await mkdir(OUT_DIR.dragon, { recursive: true });
  await mkdir(OUT_DIR.location, { recursive: true });

  const groups = [["dragons", "dragon"], ["locations", "location"]];
  for (const [groupKey, kind] of groups) {
    const group = cfg[groupKey];
    if (!group) continue;
    for (const [id, subject] of Object.entries(group.subjects)) {
      if (ONLY && ONLY !== id) continue;
      const outFile = path.join(OUT_DIR[kind], `${id}.webp`);
      if (!FORCE && existsSync(outFile)) {
        console.log(`• skip   ${kind}/${id} (already exists)`);
        continue;
      }
      const prompt = `${subject}. ${cfg.style}`;
      console.log(`• gen    ${kind}/${id} via ${PROVIDER} ...`);
      const raw = await gen(prompt, group.size);
      await sharp(raw)
        .resize({ width: TARGET_WIDTH[kind], withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outFile);
      console.log(`  ↳ wrote ${path.relative(ROOT, outFile)}`);
    }
  }
  console.log("Done. Run `npm run build` to bundle the new art.");
}

main().catch((err) => {
  console.error("art generation failed:", err.message);
  process.exit(1);
});
