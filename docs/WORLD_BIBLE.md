# The Sundered Reach — World Bible

> Original universe for the game. **No franchise IP.** Everything here is our
> own creation, built to fill the same gameplay roles (tank / agile / bruiser
> starters, a mentor, a warrior, a chief, a home isle, an outpost) without
> copying any existing characters, creatures, or place names.

## Setting

The **Sundered Reach** is a storm-wracked archipelago where a sky-splitting
cataclysm long ago scattered the old mainland into hundreds of floating and
sea-locked isles. The people who remain — the **Holtfolk** — survive by bonding
with **drakes**: wild dragon-kin drawn to the Reach's volcanic thermals and
aurora-lit gales. A **Bondrider** is someone who has earned a drake's trust and
flies as its partner, not its master.

- **Drakes** — the dragons of this world. Grouped into *Classes* by element and
  build (Ember, Galewing, Blaze, Tidal, Stormcaller, …).
- **Bondriders** — the player and the cast.
- **The Reaving** — the antagonist faction: drake-poachers who cage and sell
  drakes (our original stand-in for the "hunters").

---

## Starter drakes (LIVE in code)

| id | Name | Class | Role | Ability | Look |
|----|------|-------|------|---------|------|
| `cindermaw` | **Cindermaw** | Ember | Tank | Magma Cough | Boulder-bodied, amber/brown hide, glowing lava cracks, rocky back-plates, stubby wings |
| `quilldart` | **Quilldart** | Galewing | Agile | Quill Volley | Sleek azure flier, gold tail-quills, sharp head-spines, fastest in the Reach |
| `pyrewing` | **Pyrewing** | Blaze | Bruiser | Ashen Roar | Crimson, flame-wreathed, horned, aggressive charger |

Lore beats:
- **Cindermaw** smelts swallowed stone and spits molten slag; slow, immovable,
  fiercely loyal.
- **Quilldart** is vain and brilliant, launching superheated quills in a
  glittering volley.
- **Pyrewing** cloaks itself in living flame and charges headlong — all fury,
  all heart.

---

## Core characters (LIVE in code)

| Role | Our name | Notes |
|------|----------|-------|
| Clever young leader (mentor) | **Rurik** 🦾 | Believes in flying smart and listening to drakes |
| Fierce warrior | **Sigrun** ⚔️ | Demanding, loyal, sharp-tongued |
| The chief | **Chief Haldor** 👑 | Steady, protective leader of Holtgard |

*(Sage healer and trickster twins remain to be rebranded — see checklist.)*

## Key locations (LIVE in code)

| id | Our name | Notes |
|----|----------|-------|
| `berk` | **Holtgard** | The home isle. Chief Haldor's seat. |
| `dragons_edge` | **Stormwatch Spire** | Forward outpost / base of operations. |

*(Internal location **ids** are unchanged so the map layout, quests and travel
keep working — only the player-facing names/lore change.)*

---

## Art direction

A single consistent look keeps the set feeling like one game:

- **Style:** painterly storybook illustration, hand-painted texture, soft edges.
- **Light:** dramatic single-source rim lighting, misty atmosphere.
- **Palette:** deep teal/navy seas + warm ember-gold highlights; per-class accent
  (Ember = amber/orange, Galewing = azure/gold, Blaze = crimson/orange).
- **Camera:** dragons as 3/4 portrait busts on transparent/dark ground;
  locations as wide cinematic establishing shots, no characters, no text.
- **Consistency tip:** lock ONE seed / style-reference image and reuse the same
  prompt skeleton, swapping only the subject line. This is the single biggest
  factor in a cohesive set.

### Prompt template — dragons (512×512, transparent or dark bg)
> "Original fantasy dragon creature, painterly storybook illustration, 3/4
> portrait bust, dramatic rim lighting, hand-painted texture — **<SUBJECT>** —
> deep teal background with warm ember highlights, cohesive game art, no text,
> not resembling any existing franchise"

Per-starter `<SUBJECT>`:
- `cindermaw`: "a stocky boulder-bodied drake with cracked obsidian hide glowing
  with molten lava seams, rocky armoured back, short heavy wings, amber eyes"
- `quilldart`: "a sleek azure drake with a fan of glittering gold tail-quills and
  swept-back head spines, lean aerodynamic build, bright cyan eyes"
- `pyrewing`: "a fierce crimson drake wreathed in living flame, curved horns,
  broad wings mid-roar, glowing orange eyes"

### Prompt template — locations (1600×900, no characters/text)
> "Painterly fantasy game background, storybook illustration, dramatic rim
> lighting, misty Nordic archipelago — **<SCENE>** — deep blues and molten gold
> palette, cinematic establishing shot, no text"

Per-location `<SCENE>`:
- `berk` (Holtgard): "a rugged cliffside viking-style home harbour at dusk,
  longhouses and watchfires above a grey sea"
- `dragons_edge` (Stormwatch Spire): "a lonely sea-stack outpost wreathed in
  storm clouds, wooden platforms ringing a tall rock spire"

---

## How art gets used

1. Generate/sharpen in your external program using the prompts above.
2. Export WebP (~512px dragons / ~1600px locations, <200 KB).
3. Save as `src/assets/dragons/<id>.webp` or `src/assets/locations/<id>.webp`.
4. `src/assetManifest.js` auto-discovers it; `DragonPortrait` shows the image
   when present and falls back to the built-in SVG otherwise.

---

## Rebrand checklist (expand-later, currently still franchise-derived)

This POC rebrands the starter drakes + 3 core characters + 2 hub locations.
To fully de-brand before any wider release, still to do:

- [ ] `EGG_DRAGONS` — rename all hatchable species to original drakes.
- [ ] Remaining `CHARACTERS` — sage healer, trickster twins, rival faction
      leaders, the merchant, the warlord, etc.
- [ ] Remaining `LOCATIONS` — glacier, defender, deep, stronghold isles, etc.
- [ ] `ENEMIES` + `QUESTS` text that references the above.
- [ ] Armour/weapon flavour text referencing old place/character names.
- [ ] Replace remaining franchise place-name mentions in dialogue.
- [ ] Generate the full original art set per the prompts above.
