# Art generation

Programmatic image generation that feeds the runtime asset pipeline. Generate →
files land in `src/assets/{dragons,locations}/<id>.webp` → the game auto-uses
them (falling back to built-in SVG where art is missing).

## Quick start

```bash
npm i -D sharp openai                          # one-time; NOT part of the app build
OPENAI_API_KEY=sk-...  npm run art             # generate any missing assets
OPENAI_API_KEY=sk-...  npm run art -- --force  # regenerate all
OPENAI_API_KEY=sk-...  npm run art -- --only=cindermaw
npm run build                                  # bundle the new art
```

Subjects and prompts live in `scripts/art.config.json` (style prefix + per-id
prompt). Add ids there as you rebrand more content.

## Choosing an API

| Provider | Why | Consistency control | Notes |
|---|---|---|---|
| **OpenAI `gpt-image-1`** (default) | Simplest REST, strong quality, you own the output | Style prefix only (no seed) | One key, easy to start |
| **Stability AI** (Stable Image / SD 3.5) | Cheap, fast | **Seed** + style presets | Good for large sets |
| **Replicate** (FLUX 1.1 / SDXL) | Best painterly quality | **Seed** + image refs | Pay-per-run, many models |
| **fal.ai** (FLUX) | Very fast dev API | **Seed** | Great for iteration |
| **Adobe Firefly Services** | Trained on licensed data — safest IP posture | Style refs | Enterprise access |

Switch with `ART_PROVIDER=<name>` once you implement the stub in
`generate-art.mjs` (each provider just returns an image `Buffer`).

### Recommendation
- Start with **OpenAI `gpt-image-1`** to validate the loop end-to-end.
- For a **cohesive set**, move to **Replicate/FLUX or Stability** and pin a
  **seed** + the shared style prefix — consistency across a set is the single
  biggest quality factor.
- If IP-safety of the *training data* matters for release, use **Firefly**.

## Guardrails

- **Keys only via env** — never commit them. `.gitignore` already excludes
  `*.local`; do not place keys in `art.config.json`.
- **Original only** — prompts must not depict any existing franchise's
  characters/creatures (see `docs/WORLD_BIBLE.md`).
- **Human review** — generated art should be reviewed before it ships; treat
  output as a draft, not final.
- **Cost** — each run hits a paid API; `--only=` and the skip-if-exists default
  keep spend down.
