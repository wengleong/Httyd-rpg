# Alyssa's HTTYD RPG 🐉

A single-page, browser-based RPG set in the *How To Train Your Dragon* universe,
built with **React** and **Vite**. Originally authored as a Claude Artifact, it
has been packaged here as a standalone, runnable project.

## Gameplay

- **Rider accounts** — up to 5 save slots, persisted to your browser's
  `localStorage`. Progress auto-saves as you play.
- **Pick a starter dragon** (Gronckle, Deadly Nadder, or Monstrous Nightmare),
  name it, and begin your journey at Berk.
- **Explore the archipelago** on an interactive SVG world map with animated
  dragon flight between islands.
- **Quests** from Hiccup, Astrid, Gobber, Dagur, Heather, Mala and more — from
  tutorial flights to the final showdown with Viggo Grimborn.
- **Turn-based combat** against Dragon Hunters and bosses; loot weapons and armor.
- **Hatchery** — buy mystery eggs and hatch 30+ dragon species across rarities
  (Common → Uncommon → Rare → Epic → Legendary → Titanwing).
- **Armor** for both rider and dragons, **dragon leveling**, and **sanctuaries**
  where you can release dragons to live free.
- Hand-illustrated **SVG dragon portraits** for each species.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default <http://localhost:5173>).

### Other commands

```bash
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

## Project structure

```
index.html          # Vite entry HTML
src/
  main.jsx          # React entry point
  storage.js        # localStorage-backed shim for window.storage
  HttydRpg.jsx      # the entire game (component + data)
vite.config.js
```

## Notes

- **Saves** live in `localStorage` under the `httyd:` prefix. Clearing site data
  resets all riders.
- The game was built as one self-contained component. `src/storage.js` recreates
  the Claude Artifacts `window.storage` API on top of `localStorage` so the save
  system works unchanged in a normal browser.
