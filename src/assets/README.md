# Art assets

Original raster art for the game. Generated in an external program (your image
tool of choice) and dropped in here — the game auto-discovers them via
`src/assetManifest.js`.

```
dragons/    <dragonId>.webp      e.g. cindermaw.webp, quilldart.webp, pyrewing.webp
locations/  <locationId>.webp    e.g. berk.webp, dragons_edge.webp
```

- File name **must** match the in-game `id` (see `STARTER_DRAGONS` / `LOCATIONS`
  in `src/HttydRpg.jsx`).
- Recommended: **WebP** (or AVIF), dragons ~512×512, locations ~1600×900,
  each under ~200 KB.
- Missing art falls back to the built-in SVG portrait / emoji automatically.
- Keep everything **original** — see `docs/WORLD_BIBLE.md` for the art
  direction and ready-to-use prompt templates. Do not depict existing
  franchise characters or creatures.
