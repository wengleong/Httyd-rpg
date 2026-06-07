// ------------------------------------------------------------
// ASSET MANIFEST — original raster art for dragons & locations
//
// Drop your generated/sharpened images into:
//   src/assets/dragons/<dragonId>.webp      (e.g. cindermaw.webp)
//   src/assets/locations/<locationId>.webp  (e.g. berk.webp)
//
// They are auto-discovered at build time. Anywhere art is missing, the
// game falls back to the built-in SVG portraits / emoji, so the game keeps
// working with zero, some, or all images present.
//
// WebP/AVIF recommended, ~1600px wide for locations, ~512px for dragons,
// kept under ~200 KB each. See docs/WORLD_BIBLE.md for the art direction
// and per-subject prompt templates.
// ------------------------------------------------------------

// Vite statically analyses these globs. With no matching files they resolve
// to empty objects — perfectly valid.
const dragonModules = import.meta.glob(
  "./assets/dragons/*.{png,webp,jpg,jpeg,avif}",
  { eager: true, import: "default" }
);
const locationModules = import.meta.glob(
  "./assets/locations/*.{png,webp,jpg,jpeg,avif}",
  { eager: true, import: "default" }
);

function indexByBasename(modules) {
  const out = {};
  for (const [path, url] of Object.entries(modules)) {
    const base = path.split("/").pop().replace(/\.[^.]+$/, "");
    out[base] = url;
  }
  return out;
}

export const DRAGON_IMAGES = indexByBasename(dragonModules);
export const LOCATION_IMAGES = indexByBasename(locationModules);
