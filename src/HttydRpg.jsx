import { useState, useEffect, useRef } from "react";
import { DRAGON_IMAGES } from "./assetManifest.js";

// ============================================================
// DATA
// ============================================================
const STARTER_DRAGONS = [
  {
    id: "cindermaw",
    name: "Cindermaw",
    emoji: "🪨",
    class: "Ember Class",
    rarity: "Common",
    color: "#B5651D",
    description: "A boulder-bodied drake that smelts swallowed stone and spits molten slag. Slow, immovable, and fiercely devoted.",
    stats: { hp: 120, attack: 35, defense: 50, speed: 20 },
    ability: "Magma Cough",
    bg: "from-amber-900 to-stone-800"
  },
  {
    id: "quilldart",
    name: "Quilldart",
    emoji: "🌟",
    class: "Galewing Class",
    rarity: "Common",
    color: "#2E8BC0",
    description: "Sleek and vain, it launches superheated quills from its tail in a glittering volley. The fastest wings in the Reach.",
    stats: { hp: 90, attack: 55, defense: 35, speed: 70 },
    ability: "Quill Volley",
    bg: "from-sky-900 to-cyan-800"
  },
  {
    id: "pyrewing",
    name: "Pyrewing",
    emoji: "🔥",
    class: "Blaze Class",
    rarity: "Common",
    color: "#C0392B",
    description: "The largest of the common drakes — it wreathes itself in living flame and charges headlong. All fury, all heart.",
    stats: { hp: 100, attack: 65, defense: 30, speed: 50 },
    ability: "Ashen Roar",
    bg: "from-red-900 to-orange-800"
  }
];

const EGG_DRAGONS = [
  // TITANWING
  { id: "tw_night_fury",    name: "Titanwing Night Fury",         emoji: "🖤", rarity: "Titanwing", chance: 0.5, stats: { hp: 160, attack: 110, defense: 85,  speed: 120 }, ability: "Alpha Plasma Blast",  class: "Strike Class"  },
  { id: "tw_bewilderbeast", name: "Titanwing Bewilderbeast",      emoji: "❄️", rarity: "Titanwing", chance: 0.5, stats: { hp: 300, attack: 90,  defense: 130, speed: 25  }, ability: "Blizzard Command",    class: "Tidal Class"   },
  { id: "tw_stormcutter",   name: "Titanwing Stormcutter",        emoji: "🌩️", rarity: "Titanwing", chance: 0.5, stats: { hp: 155, attack: 88,  defense: 72,  speed: 105 }, ability: "Gale Force Wing",     class: "Sharp Class"   },
  { id: "tw_gronckle",      name: "Titanwing Gronckle",           emoji: "🪨", rarity: "Titanwing", chance: 0.5, stats: { hp: 190, attack: 82,  defense: 120, speed: 28  }, ability: "Molten Rock Spray",   class: "Boulder Class" },
  { id: "tw_skrill",        name: "Titanwing Skrill",             emoji: "⚡", rarity: "Titanwing", chance: 0.5, stats: { hp: 140, attack: 100, defense: 62,  speed: 110 }, ability: "Thunderstorm Strike", class: "Strike Class"  },
  { id: "tw_monstrous_nightmare", name: "Titanwing Monstrous Nightmare", emoji: "🔥", rarity: "Titanwing", chance: 0.5, stats: { hp: 170, attack: 105, defense: 65, speed: 78 }, ability: "Inferno Jacket", class: "Stoker Class" },
  { id: "tw_dramillion",    name: "Titanwing Dramillion",         emoji: "🔴", rarity: "Titanwing", chance: 0.5, stats: { hp: 145, attack: 98,  defense: 58,  speed: 102 }, ability: "Omni-Fire Barrage",   class: "Stoker Class"  },
  // LEGENDARY
  { id: "night_fury",       name: "Night Fury",        emoji: "⚫", rarity: "Legendary", chance: 1,   stats: { hp: 110, attack: 80, defense: 60, speed: 95  }, ability: "Plasma Blast",      class: "Strike Class"  },
  { id: "light_fury",       name: "Light Fury",        emoji: "⚪", rarity: "Legendary", chance: 1,   stats: { hp: 100, attack: 75, defense: 55, speed: 100 }, ability: "Cloaking Dive",     class: "Strike Class"  },
  { id: "bewilderbeast",    name: "Bewilderbeast",     emoji: "🏔️", rarity: "Legendary", chance: 1,   stats: { hp: 200, attack: 70, defense: 90, speed: 20  }, ability: "Ice Command",       class: "Tidal Class"   },
  // EPIC
  { id: "screaming_death",  name: "Screaming Death",   emoji: "💥", rarity: "Epic",      chance: 3,   stats: { hp: 150, attack: 75, defense: 65, speed: 55  }, ability: "Death Spiral",      class: "Boulder Class" },
  { id: "deathgripper",     name: "Deathgripper",      emoji: "🦂", rarity: "Epic",      chance: 3,   stats: { hp: 130, attack: 85, defense: 50, speed: 70  }, ability: "Venom Strike",      class: "Strike Class"  },
  { id: "shellfire",        name: "Shellfire",         emoji: "🐚", rarity: "Epic",      chance: 3,   stats: { hp: 180, attack: 65, defense: 85, speed: 30  }, ability: "Fortress Blast",    class: "Tidal Class"   },
  // RARE (RTTE + originals)
  { id: "skrill",           name: "Skrill",            emoji: "⚡", rarity: "Rare",      chance: 4,   stats: { hp: 95,  attack: 70, defense: 45, speed: 80  }, ability: "Lightning Charge",  class: "Strike Class"  },
  { id: "stormcutter",      name: "Stormcutter",       emoji: "🌪️", rarity: "Rare",      chance: 4,   stats: { hp: 105, attack: 60, defense: 50, speed: 75  }, ability: "Wing Cyclone",      class: "Sharp Class"   },
  { id: "flightmare",       name: "Flightmare",        emoji: "👻", rarity: "Rare",      chance: 4,   stats: { hp: 85,  attack: 65, defense: 40, speed: 90  }, ability: "Glowing Mist",      class: "Mystery Class" },
  { id: "dramillion",       name: "Dramillion",        emoji: "🔴", rarity: "Rare",      chance: 4,   stats: { hp: 90,  attack: 72, defense: 38, speed: 78  }, ability: "Multi-Fire",        class: "Stoker Class"  },
  { id: "catastrophic_quaken", name: "Catastrophic Quaken", emoji: "🌍", rarity: "Rare", chance: 4,   stats: { hp: 130, attack: 60, defense: 80, speed: 30  }, ability: "Rockslide Roll",    class: "Boulder Class" },
  // UNCOMMON (RTTE additions)
  { id: "razorwhip",        name: "Razorwhip",         emoji: "🔪", rarity: "Uncommon",  chance: 5,   stats: { hp: 85,  attack: 65, defense: 55, speed: 70  }, ability: "Tail Slash",        class: "Sharp Class"   },
  { id: "singetail",        name: "Singetail",         emoji: "🌋", rarity: "Uncommon",  chance: 5,   stats: { hp: 100, attack: 60, defense: 40, speed: 60  }, ability: "Jet Stream Fire",   class: "Stoker Class"  },
  { id: "typhoomerang",     name: "Typhoomerang",      emoji: "🌀", rarity: "Uncommon",  chance: 5,   stats: { hp: 90,  attack: 58, defense: 38, speed: 65  }, ability: "Ring of Fire",      class: "Stoker Class"  },
  { id: "eruptodon",        name: "Eruptodon",         emoji: "🌋", rarity: "Uncommon",  chance: 5,   stats: { hp: 120, attack: 50, defense: 70, speed: 35  }, ability: "Lava Spit",         class: "Boulder Class" },
  { id: "armorwing",        name: "Armorwing",         emoji: "🛡️", rarity: "Uncommon",  chance: 5,   stats: { hp: 110, attack: 52, defense: 80, speed: 45  }, ability: "Metal Plating",     class: "Mystery Class" },
  { id: "slithersong",      name: "Slithersong",       emoji: "🎶", rarity: "Uncommon",  chance: 5,   stats: { hp: 80,  attack: 62, defense: 35, speed: 85  }, ability: "Siren Song",        class: "Mystery Class" },
  // COMMON (starters obtainable + others)
  { id: "gronckle_egg",     name: "Gronckle",          emoji: "🪨", rarity: "Common",    chance: 2,   stats: { hp: 120, attack: 35, defense: 50, speed: 20  }, ability: "Lava Blast",        class: "Boulder Class" },
  { id: "nadder_egg",       name: "Deadly Nadder",     emoji: "🌟", rarity: "Common",    chance: 2,   stats: { hp: 90,  attack: 55, defense: 35, speed: 70  }, ability: "Spine Shot",        class: "Tracker Class" },
  { id: "nightmare_egg",    name: "Monstrous Nightmare", emoji: "🔥", rarity: "Common",  chance: 2,   stats: { hp: 100, attack: 65, defense: 30, speed: 50  }, ability: "Fire Jacket",       class: "Stoker Class"  },
  { id: "tide_glider",      name: "Tide Glider",       emoji: "🐬", rarity: "Common",    chance: 5,   stats: { hp: 80,  attack: 45, defense: 60, speed: 55  }, ability: "Acid Spray",        class: "Tidal Class"   },
  { id: "hideous_zippleback", name: "Hideous Zippleback", emoji: "🐍", rarity: "Common", chance: 5,   stats: { hp: 90,  attack: 48, defense: 42, speed: 50  }, ability: "Gas & Spark",       class: "Mystery Class" },
  { id: "hobblegrunt",      name: "Hobblegrunt",       emoji: "🦋", rarity: "Common",    chance: 5,   stats: { hp: 75,  attack: 40, defense: 45, speed: 58  }, ability: "Mood Flame",        class: "Stoker Class"  },
  { id: "terrible_terror",  name: "Terrible Terror",   emoji: "🦎", rarity: "Common",    chance: 5,   stats: { hp: 55,  attack: 35, defense: 30, speed: 72  }, ability: "Tiny Blaze",        class: "Stoker Class"  },
  { id: "sand_wraith",      name: "Sand Wraith",       emoji: "🏜️", rarity: "Common",    chance: 4,   stats: { hp: 85,  attack: 50, defense: 42, speed: 65  }, ability: "Sandblast",         class: "Tidal Class"   },
  { id: "sweet_death",      name: "Sweet Death",       emoji: "🌸", rarity: "Common",    chance: 3,   stats: { hp: 70,  attack: 42, defense: 38, speed: 55  }, ability: "Lure and Snap",     class: "Mystery Class" },
];

// Actual: TW=3, Leg=3, Epic=9, Rare=20, Uncommon=32, Common=4×8.5=34 → total=101. Tide Glider set to 8.0 → 100.5. terrible_terror=8.0 → 100.

const WEAPONS = [
  { id: "axe", name: "Axe", emoji: "🪓", damage: 15, special: null },
  { id: "double_axe", name: "Double-Sided Axe", emoji: "⚔️", damage: 22, special: "Spin Strike" },
  { id: "daggers", name: "Daggers", emoji: "🗡️", damage: 12, special: "Quick Slash" },
  { id: "crossbow", name: "Crossbow", emoji: "🏹", damage: 18, special: "Bolt Barrage" },
  { id: "bow", name: "Bow", emoji: "🏹", damage: 14, special: null },
  { id: "sword", name: "Sword", emoji: "⚔️", damage: 16, special: null },
  { id: "bludgeon", name: "Bludgeon", emoji: "🔨", damage: 20, special: "Stun" },
  { id: "dragon_blade", name: "Dragon Blade", emoji: "🔱", damage: 35, special: "Dragon Roar", legendary: true },
  { id: "heathers_axe", name: "Heather's Axe", emoji: "🪓", damage: 28, special: "Whirlwind", legendary: true },
  { id: "viggos_sword_1", name: "Viggo's Sword I", emoji: "⚔️", damage: 30, special: "Calculated Strike", legendary: true },
  { id: "viggos_sword_2", name: "Viggo's Sword II", emoji: "⚔️", damage: 32, special: "Master Parry", legendary: true },
  { id: "krogans_weapon", name: "Krogan's Weapon", emoji: "🗡️", damage: 38, special: "Flightmare Lock", legendary: true },
];

// ── HUMAN ARMOR ──
const HUMAN_ARMOR = [
  { id: "leather_tunic",    name: "Leather Tunic",       emoji: "🧥", defense: 5,  hpBonus: 10, speed: 0,  tier: 1, description: "Basic protection for any Viking in training." },
  { id: "chain_mail",       name: "Chain Mail",          emoji: "⛓️", defense: 12, hpBonus: 20, speed: -2, tier: 2, description: "Standard Viking battle armour. Heavy but reliable." },
  { id: "plate_armor",      name: "Plate Armour",        emoji: "🛡️", defense: 20, hpBonus: 35, speed: -5, tier: 3, description: "Full iron plate. You won't feel a thing. You also won't run." },
  { id: "dragon_scale_mail",name: "Dragon Scale Mail",   emoji: "🐉", defense: 30, hpBonus: 50, speed: 0,  tier: 4, description: "Armour woven from shed dragon scales. Light and nearly impenetrable.", legendary: true },
  { id: "night_fury_cloak", name: "Night Fury Cloak",    emoji: "🖤", defense: 25, hpBonus: 40, speed: 10, tier: 4, description: "A gift from a bonded Night Fury. Absorbs impact and boosts agility.", legendary: true },
  { id: "berkian_chief_armor", name: "Holtgardian Chief Armour", emoji: "👑", defense: 35, hpBonus: 60, speed: -3, tier: 5, description: "Haldor's own armour, passed to the worthy. Inspires all who see it.", legendary: true },
];

// ── DRAGON ARMOR ──
const DRAGON_ARMOR = [
  { id: "leather_wing_guards", name: "Leather Wing Guards",   emoji: "🦴", defenseBonus: 8,  hpBonus: 15, speedPenalty: 0,  tier: 1, description: "Soft leather guards for wing joints. Basic protection." },
  { id: "iron_scale_plates",   name: "Iron Scale Plates",     emoji: "🔩", defenseBonus: 18, hpBonus: 25, speedPenalty: 5,  tier: 2, description: "Iron plates riveted over the most exposed areas." },
  { id: "full_dragon_armor",   name: "Full Dragon Armour",    emoji: "🛡️", defenseBonus: 28, hpBonus: 40, speedPenalty: 10, tier: 3, description: "Complete iron-and-leather body armour for a dragon." },
  { id: "dragonite_plating",   name: "Dragonite Plating",     emoji: "💎", defenseBonus: 40, hpBonus: 55, speedPenalty: 5,  tier: 4, description: "Rare dragonite ore plates. Harder than steel, lighter than iron.", legendary: true },
  { id: "titanwing_harness",   name: "Titanwing Harness",     emoji: "👑", defenseBonus: 50, hpBonus: 70, speedPenalty: 0,  tier: 5, description: "Forged by Grott for a Titanwing. The pinnacle of dragon protection.", legendary: true },
];

const LOCATIONS = [
  { id: "berk",             name: "Holtgard",                        emoji: "🏔️", minLevel: 1,  description: "Your home island. Chief Haldor's domain.",                                    characters: ["Rurik", "Sigrun", "Haldor", "Grott", "Moith"], enemies: ["Outcast Raider", "Dragon Hunter Scout"] },
  { id: "dragons_edge",     name: "Stormwatch Spire",               emoji: "🌊", minLevel: 1,  description: "The edge outpost. Base of operations.",                                        characters: ["Rurik", "Sigrun", "Fishlegs", "Snotlout", "Ruffnut", "Tuffnut"], enemies: ["Dragon Hunter Scout", "Dragon Hunter Warrior"] },
  { id: "glacier_island",   name: "Glacier Island",              emoji: "🧊", minLevel: 5,  description: "A frozen wasteland. Snow Wraiths lurk here.",                                  characters: [], enemies: ["Snow Wraith", "Dragon Hunter Scout"] },
  { id: "berserker_island", name: "Berserker Island",            emoji: "⚡", minLevel: 10, description: "Home of Dagur the Deranged.",                                                  characters: ["Dagur", "Heather"], enemies: ["Dragon Hunter Warrior", "Hunter Captain"] },
  { id: "defenders_wing",   name: "Defenders of the Wing Island",emoji: "🌺", minLevel: 15, description: "Home of Mala and her people.",                                                  characters: ["Mala"], enemies: ["Dragon Hunter Warrior", "Viggo's Elite Guard"] },
  { id: "dark_deep",        name: "Dark Deep",                   emoji: "🌑", minLevel: 20, description: "Mysterious deep waters. Screaming Deaths nest here.",                          characters: [], enemies: ["Screaming Death", "Viggo's Elite Guard"] },
  { id: "dramillion_island",name: "Dramillion Island",           emoji: "🔴", minLevel: 25, description: "Rare Dramillions roam free.",                                                  characters: [], enemies: ["Hunter Captain", "Viggo's Elite Guard"] },
  { id: "viggos_base",      name: "Viggo's Stronghold",          emoji: "💀", minLevel: 30, description: "The Dragon Hunter fortress. Viggo commands here.",                             characters: ["Viggo", "Krogan", "Ryker"], enemies: ["Viggo's Elite Guard", "Krogan's Berserker", "Viggo Grimborn", "Ryker Grimborn"] },
  { id: "johanns_ship",     name: "Johann's Trading Post",       emoji: "⚓", minLevel: 8,  description: "A travelling merchant vessel. Johann seems friendly... at first. Watch your back.", characters: ["Johann"], enemies: ["Johann's Hired Thug", "Trader Johann (Traitor)"], johannWarning: true },
  { id: "rykers_outpost",   name: "Ryker's Outpost",             emoji: "💢", minLevel: 18, description: "Ryker Grimborn's brutal operations base. Viggo's enforcer runs this place with an iron fist.", characters: ["Ryker"], enemies: ["Dragon Hunter Warrior", "Ryker Grimborn"] },
];

const CHARACTERS = {
  Rurik: { emoji: "🦾", lines: ["I say we fight smart, not hard.", "Every dragon has a story — you just need to listen.", "Nice flying out there. Seriously.", "The best riders aren't the strongest. They're the ones who understand their dragons."] },
  Sigrun: { emoji: "⚔️", lines: ["Your form is sloppy. I've seen Snotlout fly better. Almost.", "A true rider never gives up on their dragon.", "You want to be great? Train harder.", "Next time, lead with the barrel roll."] },
  Haldor: { emoji: "👑", lines: ["There will always be a Holtgard. And as long as there is, we Vikings will stand.", "A chief protects his own.", "You've made Holtgard proud today.", "The mark of a true chief is knowing when to listen."] },
  Grott: { emoji: "🔧", lines: ["I once lost a hand, a leg, and my dignity all in the same week. Tuesdays, am I right?", "You'll want to get that wing-joint checked — I've seen worse, but not much.", "Come back in one piece. Or pieces. I can work with pieces.", "That dragon looks hungry. Also, you look hungry."], isGrott: true },
  Moith: { emoji: "👵", lines: ["..."], isMoith: true },
  Fishlegs: { emoji: "📚", lines: ["Did you know Gronckles can eat rocks? Multiple kinds! It changes their fire composition!", "I've cross-referenced your dragon's stats and... impressive, actually.", "The Dragon Eye has an entry on this island. Fascinating.", "Don't tell Snotlout I said this, but your dragon is objectively superior."] },
  Snotlout: { emoji: "💪", lines: ["Let me guess — you want to be as great as me. Understandable.", "Hookfang and I could have handled that. We were just letting you have the win.", "Snotlout! Snotlout! Oi! Oi! Oi!", "I'm not impressed. I'm just... mildly interested."] },
  Dagur: { emoji: "😜", lines: ["GLORIOUS! The chaos! The fire! I love it!", "You know, I used to want to destroy dragons. Now I just want to BE one. Relatable.", "My sister says you're decent. High praise from Heather.", "Let's battle! Or be friends! Both options excite me equally!"] },
  Heather: { emoji: "🗡️", lines: ["Trust no one until they've earned it. Then trust them with everything.", "I've been underestimated my whole life. It never gets old.", "Your dragon is strong. So are you. Don't forget that.", "Dagur says you're good. I needed to see it myself. ...I see it."] },
  Mala: { emoji: "🌺", lines: ["The Eruptodon protects us. We protect the Eruptodon. Balance in all things.", "You have proven yourself worthy of Defenders' trust. Do not squander it.", "Our island does not welcome the weak of spirit.", "The dragons choose their riders. Remember that always."] },
  Viggo: { emoji: "♟️", lines: ["You play the game well. But I play it better.", "Every move has a consequence. Have you considered yours?", "I admire your persistence. Truly. It will make your defeat more satisfying.", "The dragon trade is merely business. Don't take it personally.", "Maces and Talons — a game of strategy, patience, and sacrifice. Much like dragon hunting, wouldn't you say?", "In Maces and Talons, every piece has a purpose. Even the ones you lose.", "You remind me of a Maces and Talons player who relies on aggression over intellect. Predictable. Beatable.", "The Maces represent brute force. The Talons, precision and cunning. I have always preferred the Talons.", "I once played Maces and Talons for three days straight. My opponent wept. I consider that a win.", "Would you care for a game of Maces and Talons? I promise to make your defeat... educational."] },
  Krogan: { emoji: "🦅", lines: ["The Singetails obey me. You would be wise to follow their example.", "Viggo thinks in chess pieces. I think in armies.", "You've come far. That ends here.", "I've broken stronger riders than you."] },
  Johann: { emoji: "🐍", lines: ["Oh, Master Rurik! What a delight to see you! I bring only the finest goods... and information.", "You know, I've always admired dragon riders. Truly. No ulterior motive whatsoever.", "Trade is the foundation of trust, wouldn't you say? ...Don't look at me like that.", "Every story has two sides. Mine simply has... more profit in it.", "I have been so grossly misunderstood. I am but a humble trader.", "The King of Dragons? Oh yes, I know exactly where it is. For a price.", "You're sharper than you look. That's... inconvenient.", "Loyalty is just a currency, dear rider. And mine goes to the highest bidder."] },
  Ryker: { emoji: "💢", lines: ["My brother plays chess. I prefer more... direct solutions.", "You really thought you could sail into my waters?", "Viggo deals in strategy. I deal in pain. Guess which one you're getting.", "Every rider who's crossed me regrets it. Briefly.", "I don't negotiate. I don't debate. I hit things until they stop moving.", "You're brave. I'll give you that. Brave and stupid.", "The dragons will be caged. All of them. Starting with yours."] },
  Ruffnut: { emoji: "👱‍♀️", lines: ["Barf is the best head. Don't tell Tuffnut.", "We're not twins. We're the same person. A better person.", "Last time someone underestimated me, they regretted it. For about five seconds."] },
  Tuffnut: { emoji: "👱‍♂️", lines: ["Belch is clearly the superior head. The science is irrefutable.", "I have a plan. Ruffnut hates it. Therefore it's good.", "Chickens. That's all I'll say. Chickens."] },
};

const ENEMIES = [
  { id: "hunter_scout",    name: "Dragon Hunter Scout",     emoji: "🏹", hp: 40,  attack: 15, defense: 8,  xp: 25,  gold: 15,  loot: ["daggers", "bow", "leather_tunic"] },
  { id: "hunter_warrior",  name: "Dragon Hunter Warrior",   emoji: "⚔️", hp: 65,  attack: 22, defense: 12, xp: 45,  gold: 25,  loot: ["axe", "crossbow", "chain_mail", "leather_wing_guards"] },
  { id: "outcast_raider",  name: "Outcast Raider",          emoji: "🪓", hp: 55,  attack: 20, defense: 10, xp: 35,  gold: 20,  loot: ["axe", "bludgeon", "leather_tunic", "leather_wing_guards"] },
  { id: "hunter_captain",  name: "Hunter Captain",          emoji: "🦅", hp: 100, attack: 30, defense: 20, xp: 80,  gold: 50,  loot: ["double_axe", "heathers_axe", "chain_mail", "iron_scale_plates"] },
  { id: "viggo_guard",     name: "Viggo's Elite Guard",     emoji: "🛡️", hp: 120, attack: 35, defense: 28, xp: 100, gold: 65,  loot: ["sword", "viggos_sword_1", "plate_armor", "full_dragon_armor"] },
  { id: "viggo_grimborn",  name: "Viggo Grimborn",          emoji: "♟️", hp: 200, attack: 45, defense: 35, xp: 500, gold: 200, loot: ["viggos_sword_2", "dragon_blade", "dragon_scale_mail", "dragonite_plating"] },
  { id: "krogans_berserker",name:"Krogan's Berserker",      emoji: "🔥", hp: 140, attack: 40, defense: 25, xp: 120, gold: 70,  loot: ["krogans_weapon", "plate_armor", "iron_scale_plates"] },
  { id: "snow_wraith",     name: "Snow Wraith",             emoji: "❄️", hp: 90,  attack: 28, defense: 18, xp: 60,  gold: 40,  loot: ["chain_mail"] },
  { id: "screaming_death", name: "Screaming Death",         emoji: "💥", hp: 180, attack: 42, defense: 30, xp: 300, gold: 120, loot: ["dragon_blade", "full_dragon_armor"] },
  { id: "ryker_grimborn",  name: "Ryker Grimborn",          emoji: "💢", hp: 170, attack: 42, defense: 30, xp: 400, gold: 180, loot: ["double_axe", "viggos_sword_1", "dragonite_plating"] },
  { id: "johann_revealed", name: "Trader Johann (Traitor)", emoji: "🐍", hp: 130, attack: 36, defense: 22, xp: 350, gold: 220, loot: ["dragon_blade", "krogans_weapon", "night_fury_cloak"] },
  { id: "johann_guard",    name: "Johann's Hired Thug",     emoji: "💰", hp: 70,  attack: 25, defense: 14, xp: 55,  gold: 35,  loot: ["crossbow", "daggers", "leather_tunic"] },
];

function getLevelTitle(level) {
  if (level <= 5) return "Starter";
  if (level <= 10) return "Novice Trainer";
  if (level <= 15) return "Trainer";
  if (level <= 20) return "Starter Rider";
  if (level <= 25) return "Novice Rider";
  if (level <= 30) return "Full Fledged Rider";
  return "Dragon Master";
}

function xpForLevel(level) {
  return level * 100;
}

const RARITY_COLORS = {
  Common: "#9ca3af",
  Uncommon: "#22c55e",
  Rare: "#3b82f6",
  Epic: "#a855f7",
  Legendary: "#f59e0b",
  Titanwing: "#f0f0ff",
};

// Moith writes in runes — Grott translates (badly)
const MOITH_TRANSLATIONS = [
  { runes: "ᚦᚢ ᛞᚱᛖᚲᚨ ᛖᚱ ᛊᛏᚱᚨᚾᚷᚱ", real: "Your dragon is strong and well-bonded to you.", gobber: "She says your dragon smells like old fish and could stand to lose a few pounds. Her words, not mine." },
  { runes: "ᚾᛖᛋᛏᚨ ᛒᛖᛏᚱ", real: "Rest is the best medicine.", gobber: "Moith says you should wrestle a Terrible Terror to build character. Also something about soup." },
  { runes: "ᚠᚨᚱᛁ ᛗᛖᛞ ᚺᚢᚷᚱ", real: "Be careful with care.", gobber: "She's saying the dragon needs more vegetables in its diet. Possibly also you. Look, I'm doing my best here." },
  { runes: "ᛞᚢ ᛖᚱᛏ ᛊᛏᛖᚱᚲ", real: "You are brave and resilient.", gobber: "Moith says you remind her of a young Haldor. That's either a compliment or a warning. Fifty-fifty, really." },
  { runes: "ᚷᚱᛖᛁᚾ ᚨ ᛞᚱᛖᚲᚨ", real: "Heal your dragon with rest and patience.", gobber: "Right, so she definitely said something about your dragon needing rest, but she also drew what I think is a yak? She's very expressive." },
  { runes: "ᛏᚱᚢᛊᛏ ᛏᚺᛁᚾ ᛒᛟᚾᛞ", real: "Trust the bond between you.", gobber: "She says the two of you are destined for great things. OR she's asking if you've seen her walking stick. It was definitely one of those." },
];

const GROTT_ALONE_LINES = [
  "You know, I've been translating for Moith for thirty years and I'm still mostly guessing. Don't tell her.",
  "She once told me through runes that she believed in me. Took me a week to figure out. Turns out she was asking for more cod.",
  "Moith's runes are technically ancient Norse. I read them as ancient Norse filtered through my own personal interpretation. It's basically the same thing.",
  "Last time I mistranslated her, she hit me with her staff. Three times. I think that means she agrees with me.",
];

// ============================================================
// QUESTS
// ============================================================
const QUESTS = [
  // ── TUTORIAL / EARLY ──
  {
    id: "first_flight",
    title: "First Flight",
    giver: "Rurik",
    giverEmoji: "🦾",
    location: "berk",
    minLevel: 1,
    description: "Rurik wants to see you bond with your dragon. Take to the skies and go for a ride.",
    objectives: [{ id: "ride", label: "Ride your dragon", type: "ride", count: 1, progress: 0 }],
    reward: { xp: 40, gold: 20, item: null },
    rewardText: "+40 XP, +20g",
    flavour: "\"Every rider starts somewhere. Go on — trust them.\" — Rurik",
  },
  {
    id: "hunter_threat",
    title: "Hunter Threat",
    giver: "Sigrun",
    giverEmoji: "⚔️",
    location: "dragons_edge",
    minLevel: 1,
    description: "Dragon Hunters have been spotted near the Edge. Sigrun wants you to drive them off.",
    objectives: [{ id: "kill_hunters", label: "Defeat Dragon Hunters", type: "kill", target: "Dragon Hunter Scout", count: 3, progress: 0 }],
    reward: { xp: 80, gold: 40, item: "crossbow" },
    rewardText: "+80 XP, +40g, Crossbow",
    flavour: "\"They're getting bolder. Make them regret it.\" — Sigrun",
  },
  {
    id: "berkS_finest",
    title: "Holtgard's Finest",
    giver: "Grott",
    giverEmoji: "🔧",
    location: "berk",
    minLevel: 2,
    description: "Grott needs you to clear out some Outcast Raiders threatening Holtgard's shores. Something about his good prosthetic arm.",
    objectives: [{ id: "kill_outcasts", label: "Defeat Outcast Raiders", type: "kill", target: "Outcast Raider", count: 3, progress: 0 }],
    reward: { xp: 70, gold: 35, item: "axe" },
    rewardText: "+70 XP, +35g, Axe",
    flavour: "\"They knocked over my forge last time. LAST TIME.\" — Grott",
  },
  {
    id: "gothis_remedy",
    title: "Moith's Remedy",
    giver: "Moith",
    giverEmoji: "👵",
    location: "berk",
    minLevel: 3,
    description: "Moith's runes suggest she needs you to travel to Glacier Island for rare frost-herbs. (Grott translates: she wants you to fetch something cold. Probably.)",
    objectives: [
      { id: "visit_glacier", label: "Travel to Glacier Island", type: "visit", target: "glacier_island", count: 1, progress: 0 },
      { id: "kill_wraith", label: "Defeat a Snow Wraith", type: "kill", target: "Snow Wraith", count: 1, progress: 0 },
    ],
    reward: { xp: 120, gold: 60, item: "sword" },
    rewardText: "+120 XP, +60g, Sword",
    flavour: "\"...\" — Moith. \"She says thank you. Or possibly 'your boots are on wrong'.\" — Grott",
  },
  // ── MID GAME ──
  {
    id: "dagurs_challenge",
    title: "Dagur's Challenge",
    giver: "Dagur",
    giverEmoji: "😜",
    location: "berserker_island",
    minLevel: 10,
    description: "Dagur wants to see if you're worthy of calling yourself a rider — defeat his Berserker warriors in battle.",
    objectives: [{ id: "kill_berserkers", label: "Defeat Berserker Warriors", type: "kill", target: "Dragon Hunter Warrior", count: 4, progress: 0 }],
    reward: { xp: 200, gold: 100, item: "double_axe" },
    rewardText: "+200 XP, +100g, Double-Sided Axe",
    flavour: "\"MAGNIFICENT! You're almost as good as me. Almost!\" — Dagur",
  },
  {
    id: "heathers_mission",
    title: "Heather's Mission",
    giver: "Heather",
    giverEmoji: "🗡️",
    location: "berserker_island",
    minLevel: 11,
    description: "Heather has intel on a Hunter Captain operating nearby. Take them down and bring back their weapon.",
    objectives: [{ id: "kill_captain", label: "Defeat a Hunter Captain", type: "kill", target: "Hunter Captain", count: 1, progress: 0 }],
    reward: { xp: 180, gold: 90, item: "heathers_axe" },
    rewardText: "+180 XP, +90g, Heather's Axe",
    flavour: "\"Don't lose. I'm not pulling you out of this one.\" — Heather",
  },
  {
    id: "malas_trial",
    title: "Mala's Trial",
    giver: "Mala",
    giverEmoji: "🌺",
    location: "defenders_wing",
    minLevel: 15,
    description: "To earn the trust of the Defenders of the Wing, Mala requires you to prove your bond with your dragon — visit three locations and survive a battle.",
    objectives: [
      { id: "visit_dark", label: "Scout Dark Deep", type: "visit", target: "dark_deep", count: 1, progress: 0 },
      { id: "kill_soldiers", label: "Repel Viggo's Soldiers", type: "kill", target: "Viggo's Elite Guard", count: 2, progress: 0 },
    ],
    reward: { xp: 300, gold: 150, item: "dragon_blade" },
    rewardText: "+300 XP, +150g, Dragon Blade",
    flavour: "\"The dragons watched you. So did I. You are worthy.\" — Mala",
  },
  {
    id: "johanns_secret",
    title: "Something Fishy",
    giver: "Rurik",
    giverEmoji: "🦾",
    location: "dragons_edge",
    minLevel: 8,
    description: "Rurik is suspicious of Johann — his trade routes don't add up. Visit his ship and investigate. If your suspicions are confirmed... deal with it.",
    objectives: [
      { id: "visit_ship", label: "Visit Johann's Trading Post", type: "visit", target: "johanns_ship", count: 1, progress: 0 },
      { id: "expose_johann", label: "Defeat Trader Johann (Traitor)", type: "kill", target: "Trader Johann (Traitor)", count: 1, progress: 0 },
    ],
    reward: { xp: 250, gold: 130, item: "viggos_sword_1" },
    rewardText: "+250 XP, +130g, Viggo's Sword I",
    flavour: "\"I wanted to be wrong about him. I wasn't.\" — Rurik",
  },
  // ── LATE GAME ──
  {
    id: "ryker_takedown",
    title: "The Enforcer Falls",
    giver: "Heather",
    giverEmoji: "🗡️",
    location: "berserker_island",
    minLevel: 18,
    description: "Ryker Grimborn is Viggo's fist. Take him down at his outpost — Heather says it'll shake the entire Hunter network.",
    objectives: [
      { id: "visit_ryker", label: "Travel to Ryker's Outpost", type: "visit", target: "rykers_outpost", count: 1, progress: 0 },
      { id: "kill_ryker", label: "Defeat Ryker Grimborn", type: "kill", target: "Ryker Grimborn", count: 1, progress: 0 },
    ],
    reward: { xp: 400, gold: 180, item: "viggos_sword_2" },
    rewardText: "+400 XP, +180g, Viggo's Sword II",
    flavour: "\"Viggo will feel that. Good.\" — Heather",
  },
  {
    id: "endgame_viggo",
    title: "Checkmate",
    giver: "Rurik",
    giverEmoji: "🦾",
    location: "dragons_edge",
    minLevel: 30,
    description: "The time has come. Viggo Grimborn's stronghold is within reach. Storm the fortress, defeat his elite guard, and end this.",
    objectives: [
      { id: "visit_viggo", label: "Storm Viggo's Stronghold", type: "visit", target: "viggos_base", count: 1, progress: 0 },
      { id: "kill_elite", label: "Defeat Elite Guards", type: "kill", target: "Viggo's Elite Guard", count: 3, progress: 0 },
      { id: "kill_viggo", label: "Defeat Viggo Grimborn", type: "kill", target: "Viggo Grimborn", count: 1, progress: 0 },
    ],
    reward: { xp: 1000, gold: 500, item: "krogans_weapon" },
    rewardText: "+1000 XP, +500g, Krogan's Weapon",
    flavour: "\"You should never have come here, rider. ...Then again, perhaps I always knew it would end this way.\" — Viggo",
  },
];

const QUEST_STATUS = { AVAILABLE: "available", ACTIVE: "active", COMPLETE: "complete" };

// ============================================================
// PROTECTED AREAS / SANCTUARIES
// ============================================================
const PROTECTED_AREAS = [
  {
    id: "the_rookery",
    name: "The Rookery",
    emoji: "🪺",
    description: "A towering sea stack riddled with nesting caves. Protected by an ancient agreement between Holtgard and the wild dragons.",
    lore: "Grott accidentally discovered it. Haldor declared it off-limits to hunters under penalty of banishment. The rule still holds.",
    minLevel: 1,
    capacity: 25,
    preferredClasses: ["Stoker Class", "Boulder Class", "Tidal Class"],
    bonusNote: "Any dragon released here will find a safe home and a nest.",
  },
  {
    id: "the_sanctuary",
    name: "The Sanctuary",
    emoji: "🏝️",
    description: "A remote, fog-shrouded island no hunter has ever found. Dragons live undisturbed.",
    lore: "Fishlegs catalogued 47 species here. Moith blessed it with Elder runes. The Defenders of the Wing patrol its waters from a respectful distance.",
    minLevel: 5,
    capacity: 20,
    preferredClasses: ["Boulder Class", "Tidal Class", "Stoker Class"],
    bonusNote: "Common and Uncommon dragons thrive here, forming new herds.",
  },
  {
    id: "melody_island",
    name: "Melody Island",
    emoji: "🎵",
    description: "An island that hums with strange dragon song. Typhoomerangs here have never seen a hunter. They dance in thermal rings above the peaks.",
    lore: "The island's music comes from wind through rock formations — but dragons seem to understand it as language. No one has fully explained why.",
    minLevel: 10,
    capacity: 15,
    preferredClasses: ["Stoker Class", "Sharp Class"],
    bonusNote: "Stoker and Sharp class dragons are especially drawn here.",
  },
  {
    id: "vanaheim",
    name: "Vanaheim",
    emoji: "🍂",
    description: "The ancient dragon graveyard — and a place of new beginnings. Injured and elderly dragons come here to rest. Sacred ground.",
    lore: "Only Eret and a handful of riders have ever set foot here. The trees are made of dragon bone and coral. Nothing hunts here.",
    minLevel: 15,
    capacity: 10,
    preferredClasses: ["Tidal Class", "Mystery Class", "Sharp Class"],
    bonusNote: "Epic and Legendary dragons released here are never forgotten.",
  },
  {
    id: "hidden_world_entrance",
    name: "Hidden World Entrance",
    emoji: "🌀",
    description: "A shimmering sea cave leading toward the Hidden World — where dragons are truly free. Only the most bonded riders know this place exists.",
    lore: "Toothless first showed Rurik the entrance. The bioluminescent tunnels stretch for miles. Dragons released here are believed to reach the Hidden World itself.",
    minLevel: 20,
    capacity: 12,
    preferredClasses: ["Strike Class"],
    bonusNote: "Night Furies and Light Furies released here find their kind.",
  },
];

export default function HTTYD_RPG() {
  const [screen, setScreen] = useState("accounts"); // accounts | intro | name | starter | game
  const [accounts, setAccounts] = useState([]); // [{slot, name, level, dragonName, dragonEmoji, lastSaved}]
  const [activeSlot, setActiveSlot] = useState(null);
  const [storageReady, setStorageReady] = useState(false);

  const [playerName, setPlayerName] = useState("");
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerXP, setPlayerXP] = useState(0);
  const [playerHP, setPlayerHP] = useState(100);
  const [playerMaxHP, setPlayerMaxHP] = useState(100);
  const [playerGold, setPlayerGold] = useState(50);
  const [dragons, setDragons] = useState([]);
  const [activeDragonIdx, setActiveDragonIdx] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [equippedWeapon, setEquippedWeapon] = useState(null);
  const [currentBase, setCurrentBase] = useState("berk");
  const [currentLocation, setCurrentLocation] = useState("berk");
  const [eggs, setEggs] = useState([]);
  const [log, setLog] = useState([]);
  const [tab, setTab] = useState("map");
  const [modal, setModal] = useState(null);
  const [combat, setCombat] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [selectedStarter, setSelectedStarter] = useState(null);
  const [customIslands, setCustomIslands] = useState([]);
  const [buildingBase, setBuildingBase] = useState(false);
  const [buildName, setBuildName] = useState("");
  const [travelling, setTravelling] = useState(null);
  const [questLog, setQuestLog] = useState({});
  const [releasedDragons, setReleasedDragons] = useState({});
  const [equippedHumanArmor, setEquippedHumanArmor] = useState(null);
  const [equippedDragonArmor, setEquippedDragonArmor] = useState({}); // { dragonIdx: armorId }
  const [healParticles, setHealParticles] = useState([]); // [{id, x, y}] // { areaId: [dragonSnapshot, ...] }

  const logRef = useRef(null);
  const travelRef = useRef(null);
  const saveTimerRef = useRef(null);

  // ── STORAGE: load accounts on mount ──
  useEffect(() => {
    async function loadAccounts() {
      try {
        const result = await window.storage.get("httyd_accounts");
        if (result?.value) setAccounts(JSON.parse(result.value));
      } catch (_) {}
      setStorageReady(true);
    }
    loadAccounts();
  }, []);

  // ── STORAGE: save accounts list whenever it changes ──
  useEffect(() => {
    if (!storageReady) return;
    window.storage.set("httyd_accounts", JSON.stringify(accounts)).catch(() => {});
  }, [accounts, storageReady]);

  // ── STORAGE: auto-save game state when in-game (debounced 1.5s) ──
  useEffect(() => {
    if (screen !== "game" || activeSlot === null) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const saveData = {
        playerName, playerLevel, playerXP, playerHP, playerMaxHP, playerGold,
        dragons, activeDragonIdx, inventory, equippedWeapon,
        currentBase, currentLocation, eggs, log: log.slice(-30),
        customIslands, questLog, releasedDragons, equippedHumanArmor, equippedDragonArmor,
      };
      window.storage.set(`httyd_save_${activeSlot}`, JSON.stringify(saveData)).catch(() => {});
      // Update account summary
      const dragon = dragons[activeDragonIdx];
      setAccounts(prev => prev.map(a => a.slot === activeSlot
        ? { ...a, name: playerName, level: playerLevel, dragonName: dragon?.nickname || "—", dragonEmoji: dragon?.emoji || "🐉", lastSaved: Date.now() }
        : a
      ));
    }, 1500);
  }, [playerLevel, playerXP, playerHP, playerGold, dragons, inventory, equippedWeapon,
      currentBase, currentLocation, eggs, questLog, customIslands, releasedDragons]);

  async function loadSlot(slot) {
    try {
      const result = await window.storage.get(`httyd_save_${slot}`);
      if (result?.value) {
        const s = JSON.parse(result.value);
        setPlayerName(s.playerName || "");
        setPlayerLevel(s.playerLevel || 1);
        setPlayerXP(s.playerXP || 0);
        setPlayerHP(s.playerHP || 100);
        setPlayerMaxHP(s.playerMaxHP || 100);
        setPlayerGold(s.playerGold || 50);
        setDragons(s.dragons || []);
        setActiveDragonIdx(s.activeDragonIdx || 0);
        setInventory(s.inventory || []);
        setEquippedWeapon(s.equippedWeapon || null);
        setCurrentBase(s.currentBase || "berk");
        setCurrentLocation(s.currentLocation || "berk");
        setEggs(s.eggs || []);
        setLog(s.log || []);
        setCustomIslands(s.customIslands || []);
        setQuestLog(s.questLog || {});
        setReleasedDragons(s.releasedDragons || {});
        setEquippedHumanArmor(s.equippedHumanArmor || null);
        setEquippedDragonArmor(s.equippedDragonArmor || {});
        setTab("map");
        setModal(null);
        setCombat(null);
        setTravelling(null);
        setActiveSlot(slot);
        setScreen("game");
        return true;
      }
    } catch (_) {}
    return false;
  }

  async function deleteSlot(slot) {
    try { await window.storage.delete(`httyd_save_${slot}`); } catch (_) {}
    setAccounts(prev => prev.filter(a => a.slot !== slot));
  }

  function createNewSlot() {
    const usedSlots = accounts.map(a => a.slot);
    const slot = [1,2,3,4,5].find(s => !usedSlots.includes(s));
    if (!slot) return;
    const newAccount = { slot, name: "", level: 0, dragonName: "—", dragonEmoji: "🐉", lastSaved: null };
    setAccounts(prev => [...prev, newAccount]);
    setActiveSlot(slot);
    // Reset all game state for fresh start
    resetGameState();
    setScreen("intro");
  }

  function resetGameState() {
    setPlayerName(""); setPlayerNameInput(""); setPlayerLevel(1); setPlayerXP(0);
    setPlayerHP(100); setPlayerMaxHP(100); setPlayerGold(50);
    setDragons([]); setActiveDragonIdx(0); setInventory([]); setEquippedWeapon(null);
    setCurrentBase("berk"); setCurrentLocation("berk"); setEggs([]); setLog([]);
    setCustomIslands([]); setQuestLog({}); setReleasedDragons({}); setEquippedHumanArmor(null); setEquippedDragonArmor({}); setHealParticles([]); setTab("map"); setModal(null);
    setCombat(null); setTravelling(null); setNameInput(""); setSelectedStarter(null);
  }

  async function restartJourney() {
    if (activeSlot === null) return;
    try { await window.storage.delete(`httyd_save_${activeSlot}`); } catch (_) {}
    setAccounts(prev => prev.map(a => a.slot === activeSlot
      ? { ...a, name: "", level: 0, dragonName: "—", dragonEmoji: "🐉", lastSaved: null }
      : a
    ));
    resetGameState();
    setScreen("intro");
  }

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  function addLog(msg, type = "info") {
    setLog(prev => [...prev.slice(-60), { msg, type, id: Date.now() + Math.random() }]);
  }

  // ── QUEST HELPERS ──
  function acceptQuest(questId) {
    const q = QUESTS.find(x => x.id === questId);
    if (!q) return;
    setQuestLog(prev => ({
      ...prev,
      [questId]: { status: QUEST_STATUS.ACTIVE, objectives: q.objectives.map(o => ({ ...o, progress: 0 })) }
    }));
    addLog(`📜 Quest accepted: "${q.title}" — ${q.objectives.map(o => o.label).join(", ")}`, "success");
  }

  function advanceQuestObjective(type, value) {
    setQuestLog(prev => {
      const updated = { ...prev };
      Object.entries(updated).forEach(([qid, qstate]) => {
        if (qstate.status !== QUEST_STATUS.ACTIVE) return;
        const q = QUESTS.find(x => x.id === qid);
        if (!q) return;
        let changed = false;
        const newObjs = qstate.objectives.map(obj => {
          if (obj.type !== type) return obj;
          if (type === "kill" && obj.target !== value) return obj;
          if (type === "visit" && obj.target !== value) return obj;
          if (obj.progress >= obj.count) return obj;
          changed = true;
          return { ...obj, progress: obj.progress + 1 };
        });
        if (changed) {
          updated[qid] = { ...qstate, objectives: newObjs };
          // Check if all objectives done
          const allDone = newObjs.every(o => o.progress >= o.count);
          if (allDone) {
            updated[qid].status = QUEST_STATUS.COMPLETE;
            // Grant rewards
            setTimeout(() => {
              gainXP(q.reward.xp);
              setPlayerGold(g => g + q.reward.gold);
              if (q.reward.item) setInventory(inv => [...inv, q.reward.item]);
              addLog(`🏆 Quest complete: "${q.title}"! ${q.rewardText}`, "legendary");
            }, 200);
          }
        }
      });
      return updated;
    });
  }

  function isQuestAvailable(q) {
    if (questLog[q.id]) return false;
    return playerLevel >= (q.minLevel || 1);
  }

  function gainXP(amount) {
    setPlayerXP(prev => {
      const newXP = prev + amount;
      setPlayerLevel(lvl => {
        const needed = xpForLevel(lvl);
        if (newXP >= needed) {
          const newLvl = lvl + 1;
          addLog(`🎉 LEVEL UP! You are now Level ${newLvl} — ${getLevelTitle(newLvl)}!`, "success");
          setPlayerMaxHP(h => h + 10);
          setPlayerHP(h => Math.min(h + 20, h + 10 + 100));
          return newLvl;
        }
        return lvl;
      });
      return newXP % xpForLevel(playerLevel);
    });
  }

  function dragonXpForLevel(level) {
    return level * 80;
  }

  function gainDragonXP(dragonIdx, amount) {
    setDragons(prev => prev.map((d, i) => {
      if (i !== dragonIdx) return d;
      const newXP = (d.xp || 0) + amount;
      const needed = dragonXpForLevel(d.level || 1);
      if (newXP >= needed) {
        const newLevel = (d.level || 1) + 1;
        const hpGain = 8;
        const atkGain = 3;
        const defGain = 2;
        const spdGain = 2;
        const newMaxHP = (d.maxHP || d.stats.hp) + hpGain;
        addLog(`🐉 ${d.nickname} reached Level ${newLevel}! +${hpGain} HP, +${atkGain} ATK, +${defGain} DEF, +${spdGain} SPD`, "success");
        return {
          ...d,
          level: newLevel,
          xp: newXP - needed,
          maxHP: newMaxHP,
          currentHP: Math.min(d.currentHP + hpGain, newMaxHP),
          stats: {
            ...d.stats,
            hp: d.stats.hp + hpGain,
            attack: d.stats.attack + atkGain,
            defense: d.stats.defense + defGain,
            speed: d.stats.speed + spdGain,
          }
        };
      }
      return { ...d, xp: newXP };
    }));
  }

  function startGame(starterDragon) {
    const dragon = {
      ...starterDragon,
      nickname: nameInput.trim() || starterDragon.name,
      level: 1,
      xp: 0,
      maxHP: starterDragon.stats.hp,
      currentHP: starterDragon.stats.hp,
    };
    setDragons([dragon]);
    setCurrentBase("berk");
    setCurrentLocation("berk");
    addLog(`🐉 ${dragon.nickname} the ${dragon.name} hatched! Your adventure begins.`, "success");
    addLog(`📍 You start at Holtgard. Talk to Rurik, explore, or find your first fight.`, "info");
    setScreen("game");
  }

  function hatchEgg(idx) {
    const roll = Math.random() * 100;
    let cumulative = 0;
    let hatched = null;
    for (const d of EGG_DRAGONS) {
      cumulative += d.chance;
      if (roll <= cumulative) { hatched = d; break; }
    }
    if (!hatched) hatched = EGG_DRAGONS[EGG_DRAGONS.length - 1];
    const newDragon = {
      ...hatched,
      nickname: hatched.name,
      level: 1,
      xp: 0,
      maxHP: hatched.stats.hp,
      currentHP: hatched.stats.hp,
    };
    setEggs(prev => prev.filter((_, i) => i !== idx));
    setDragons(prev => [...prev, newDragon]);
    addLog(`🥚 The egg hatched! You got a ${hatched.rarity} ${hatched.emoji} ${hatched.name}!`, (hatched.rarity === "Titanwing" || hatched.rarity === "Legendary" || hatched.rarity === "Epic") ? "legendary" : "success");
    setModal({ type: "hatched", data: newDragon });
  }

  function buyEgg() {
    if (playerGold < 30) { addLog("❌ Not enough gold. Eggs cost 30g.", "error"); return; }
    setPlayerGold(g => g - 30);
    setEggs(prev => [...prev, { id: Date.now() }]);
    addLog("🥚 You bought a mystery egg! Head to the Hatchery to hatch it.", "info");
  }

  function renameDragon(idx, newName) {
    if (!newName.trim()) return;
    setDragons(prev => prev.map((d, i) => i === idx ? { ...d, nickname: newName.trim() } : d));
    addLog(`✏️ Dragon renamed to ${newName.trim()}.`, "info");
  }

  function releaseDragon(dragonIdx, areaId) {
    const area = PROTECTED_AREAS.find(a => a.id === areaId);
    if (!area) return;
    if (dragons.length <= 1) { addLog("❌ You can't release your last dragon.", "error"); return; }
    if (dragonIdx === activeDragonIdx) { addLog("❌ Switch your active dragon before releasing this one.", "error"); return; }
    const dragon = dragons[dragonIdx];
    if (!dragon) return;
    const areaFull = (releasedDragons[areaId]?.length || 0) >= area.capacity;
    if (areaFull) { addLog(`❌ ${area.name} is at full capacity (${area.capacity} dragons).`, "error"); return; }
    // Snapshot the dragon
    const snapshot = { ...dragon, releasedAt: Date.now(), releasedBy: playerName };
    setReleasedDragons(prev => ({
      ...prev,
      [areaId]: [...(prev[areaId] || []), snapshot]
    }));
    setDragons(prev => prev.filter((_, i) => i !== dragonIdx));
    setActiveDragonIdx(prev => {
      if (prev > dragonIdx) return prev - 1;
      return prev;
    });
    gainXP(30);
    addLog(`🕊️ ${dragon.nickname} has been released to ${area.name}. They're free. +30 XP`, "success");
    setModal(null);
  }

  function startCombat(enemyData) {
    const enemy = { ...enemyData, hp: enemyData.hp, maxHp: enemyData.hp };
    setCombat({ enemy, enemyHP: enemy.hp, turn: "player", log: [`⚔️ A ${enemy.name} appears!`] });
    setTab("combat");
  }

  function combatAttack() {
    if (!combat) return;
    const weapon = equippedWeapon ? WEAPONS.find(w => w.id === equippedWeapon) : null;
    const baseDmg = weapon ? weapon.damage : 10;
    const dragon = dragons[activeDragonIdx];
    const dragonBonus = dragon ? Math.floor(dragon.stats.attack / 5) : 0;
    const dmg = baseDmg + dragonBonus + Math.floor(Math.random() * 8);
    const newEnemyHP = Math.max(0, combat.enemyHP - dmg);
    const newLog = [...combat.log, `⚔️ You deal ${dmg} damage! Enemy HP: ${newEnemyHP}/${combat.enemy.maxHp}`];

    if (newEnemyHP <= 0) {
      const { xp, gold, loot } = combat.enemy;
      gainXP(xp);
      gainDragonXP(activeDragonIdx, Math.floor(xp * 0.6));
      setPlayerGold(g => g + gold);
      addLog(`✅ You defeated ${combat.enemy.name}! +${xp} XP, +${gold}g`, "success");
      advanceQuestObjective("kill", combat.enemy.name);
      if (loot && loot.length > 0 && Math.random() > 0.5) {
        const drop = loot[Math.floor(Math.random() * loot.length)];
        setInventory(prev => [...prev, drop]);
        addLog(`🎁 Loot dropped: ${WEAPONS.find(w => w.id === drop)?.name || drop}`, "success");
      }
      setCombat(null);
      setTab("map");
      return;
    }

    const armorDef = equippedHumanArmor ? (HUMAN_ARMOR.find(a => a.id === equippedHumanArmor)?.defense || 0) : 0;
    const eDmg = Math.max(1, combat.enemy.attack - Math.floor(armorDef / 4) - Math.floor(Math.random() * 5));
    const newPlayerHP = Math.max(0, playerHP - eDmg);
    // Dragon also takes a glancing hit
    const dragonDmg = Math.floor(eDmg * 0.4);
    setDragons(prev => prev.map((d, i) => i === activeDragonIdx ? { ...d, currentHP: Math.max(0, d.currentHP - dragonDmg) } : d));
    const finalLog = [...newLog, `💥 ${combat.enemy.name} hits you for ${eDmg}! Your HP: ${newPlayerHP}. ${activeDragon?.nickname} takes ${dragonDmg} damage.`];
    setPlayerHP(newPlayerHP);
    if (newPlayerHP <= 0) {
      addLog("💀 You were defeated... returning to base.", "error");
      setPlayerHP(Math.floor(playerMaxHP * 0.5));
      setCombat(null);
      setCurrentLocation(currentBase);
      setTab("map");
      return;
    }
    setCombat({ ...combat, enemyHP: newEnemyHP, log: finalLog });
  }

  function combatFlee() {
    addLog("🏃 You fled the battle!", "info");
    setCombat(null);
    setTab("map");
  }

  function dragonAttack() {
    if (!combat) return;
    const dragon = dragons[activeDragonIdx];
    if (!dragon || dragon.currentHP <= 0) { addLog("❌ Your dragon is incapacitated!", "error"); return; }
    const dmg = dragon.stats.attack + Math.floor(Math.random() * 15);
    const newEnemyHP = Math.max(0, combat.enemyHP - dmg);
    const newLog = [...combat.log, `🐉 ${dragon.nickname} uses ${dragon.ability} for ${dmg} damage!`];

    if (newEnemyHP <= 0) {
      const { xp, gold } = combat.enemy;
      gainXP(xp + 10);
      gainDragonXP(activeDragonIdx, Math.floor(xp * 0.9));
      setPlayerGold(g => g + gold);
      addLog(`✅ ${dragon.nickname} defeated ${combat.enemy.name}! +${xp + 10} XP, +${gold}g`, "success");
      advanceQuestObjective("kill", combat.enemy.name);
      setCombat(null);
      setTab("map");
      return;
    }

    const dragonArmorId = equippedDragonArmor[activeDragonIdx];
    const dragonArmorDef = dragonArmorId ? (DRAGON_ARMOR.find(a => a.id === dragonArmorId)?.defenseBonus || 0) : 0;
    const eDmg = Math.max(1, combat.enemy.attack - Math.floor((dragon.stats.defense + dragonArmorDef) / 8) - Math.floor(Math.random() * 5));
    setPlayerHP(h => Math.max(0, h - Math.floor(eDmg * 0.5)));
    setDragons(prev => prev.map((d, i) => i === activeDragonIdx ? { ...d, currentHP: Math.max(0, d.currentHP - eDmg) } : d));
    setCombat({ ...combat, enemyHP: newEnemyHP, log: [...newLog, `💥 ${combat.enemy.name} retaliates! ${dragon.nickname} takes ${eDmg} damage!`] });
  }

  function talkToCharacter(charName) {
    const char = CHARACTERS[charName];
    if (!char) return;

    // Moith — opens dragon heal modal
    if (char.isMoith) {
      const entry = MOITH_TRANSLATIONS[Math.floor(Math.random() * MOITH_TRANSLATIONS.length)];
      addLog(`👵 Moith scratches runes in the dirt and points meaningfully at your dragon.`, "dialogue");
      setModal({ type: "gothi", data: entry });
      return;
    }

    // Grott — special translation lines + random alone quip
    if (char.isGrott) {
      const useTranslation = Math.random() > 0.4;
      if (useTranslation) {
        const entry = MOITH_TRANSLATIONS[Math.floor(Math.random() * MOITH_TRANSLATIONS.length)];
        addLog(`🔧 Grott attempts to translate Moith's latest message...`, "dialogue");
        setModal({ type: "gobber_translate", data: entry });
      } else {
        const line = GROTT_ALONE_LINES[Math.floor(Math.random() * GROTT_ALONE_LINES.length)];
        addLog(`🔧 Grott: "${line}"`, "dialogue");
        setModal({ type: "dialogue", data: { name: "Grott", emoji: "🔧", line } });
      }
      return;
    }

    const line = char.lines[Math.floor(Math.random() * char.lines.length)];
    addLog(`${char.emoji} ${charName}: "${line}"`, "dialogue");
    setModal({ type: "dialogue", data: { name: charName, emoji: char.emoji, line } });
  }

  function explore(locationId) {
    const allLocs = [...LOCATIONS, ...customIslands];
    const loc = allLocs.find(l => l.id === locationId);
    if (!loc) return;
    if (loc.minLevel && playerLevel < loc.minLevel) {
      addLog(`❌ You need to be Level ${loc.minLevel} to access ${loc.name}.`, "error");
      return;
    }
    if (locationId === currentLocation) return;
    if (travelling) return; // already mid-flight

    // Calculate travel time based on map distance
    const fromPos = ISLAND_POSITIONS[currentLocation] || { x: 250, y: 170 };
    const toPos = ISLAND_POSITIONS[locationId] || { x: 250, y: 170 };
    const dx = toPos.x - fromPos.x, dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Speed based on active dragon's speed stat (50 = baseline ~2s, 100 = ~1.2s)
    const dragon = dragons[activeDragonIdx];
    const dragonSpeed = dragon?.stats?.speed || 50;
    const durationMs = Math.max(1200, Math.min(3500, (dist / dragonSpeed) * 1800));
    const steps = 60;
    const intervalMs = durationMs / steps;

    addLog(`🐉 ${dragon?.nickname || "Your dragon"} takes off toward ${loc.name}...`, "ride");
    setTravelling({ from: currentLocation, to: locationId, progress: 0, dragonEmoji: dragon?.emoji || "🐉" });

    let step = 0;
    if (travelRef.current) clearInterval(travelRef.current);
    travelRef.current = setInterval(() => {
      step++;
      const progress = step / steps;
      setTravelling(prev => prev ? { ...prev, progress } : null);
      if (step >= steps) {
        clearInterval(travelRef.current);
        setTravelling(null);
        setCurrentLocation(locationId);
        advanceQuestObjective("visit", locationId);
        addLog(`📍 Arrived at ${loc.name}. ${loc.description}`, "info");
      }
    }, intervalMs);
  }

  function ride() {
    const dragon = dragons[activeDragonIdx];
    if (!dragon) { addLog("❌ No dragon to ride!", "error"); return; }
    const events = [
      `🌅 You and ${dragon.nickname} soar above the clouds. The world below looks tiny and perfect.`,
      `💨 ${dragon.nickname} pulls off a perfect barrel roll. You nearly fall off, but manage to hold on.`,
      `🐟 ${dragon.nickname} dives toward the ocean and snatches a fish. Shows off, then gives you half.`,
      `⭐ You discover a new thermal updraft. ${dragon.nickname} loves it — +5 XP bonus!`,
      `🌩️ A storm rolls in. ${dragon.nickname} pushes through it like it's nothing.`,
      `🤝 ${dragon.nickname} nudges your hand with their snout. Quiet, but meaningful.`,
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    addLog(event, "ride");
    if (event.includes("+5 XP")) gainXP(5);
    advanceQuestObjective("ride", "ride");
  }

  function setBase(locationId) {
    setCurrentBase(locationId);
    addLog(`🏠 Base set to ${LOCATIONS.find(l => l.id === locationId)?.name || customIslands.find(l => l.id === locationId)?.name}.`, "success");
  }

  function buildIsland() {
    if (!buildName.trim()) return;
    const newIsland = {
      id: "custom_" + Date.now(),
      name: buildName.trim(),
      emoji: "🏝️",
      minLevel: 1,
      description: "Your own custom base.",
      characters: [],
      enemies: ["Dragon Hunters"],
      custom: true,
    };
    setCustomIslands(prev => [...prev, newIsland]);
    addLog(`🏝️ You built a new base: ${newIsland.name}!`, "success");
    setBuildingBase(false);
    setBuildName("");
  }

  function spawnHealParticles() {
    const id = Date.now();
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: id + i,
      x: 20 + Math.random() * 60,
      y: 50 + Math.random() * 30,
    }));
    setHealParticles(prev => [...prev, ...particles]);
    setTimeout(() => setHealParticles(prev => prev.filter(p => !particles.find(x => x.id === p.id))), 1400);
  }

  function gothiHealDragon(dragonIdx) {
    if (playerGold < 25) { addLog("❌ Moith's treatment costs 25g.", "error"); setModal(null); return; }
    setPlayerGold(g => g - 25);
    setDragons(prev => prev.map((d, i) => i === dragonIdx ? { ...d, currentHP: d.maxHP || d.stats.hp } : d));
    const name = dragons[dragonIdx]?.nickname || "your dragon";
    addLog(`👵 Moith treated ${name}. Fully healed! (-25g)`, "success");
    spawnHealParticles();
    setModal(null);
  }

  function heal() {
    if (playerGold < 20) { addLog("❌ Healing costs 20g.", "error"); return; }
    setPlayerGold(g => g - 20);
    setPlayerHP(playerMaxHP);
    addLog("💊 You rested and healed to full HP.", "success");
  }

  const activeDragon = dragons[activeDragonIdx];
  const loc = [...LOCATIONS, ...customIslands].find(l => l.id === currentLocation);
  const xpNeeded = xpForLevel(playerLevel);
  const xpPct = Math.min(100, (playerXP / xpNeeded) * 100);
  const hpPct = (playerHP / playerMaxHP) * 100;

  // ============================================================
  // SCREENS
  // ============================================================

  // ── ACCOUNTS SCREEN ──
  if (screen === "accounts") {
    const MAX_SLOTS = 5;
    const canCreate = accounts.length < MAX_SLOTS;
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 40% 20%, #0d1f3a 0%, #060a14 70%)",
        fontFamily: "'Cinzel', 'Georgia', serif",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        color: "#e8d5b0", padding: "24px 16px"
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Cinzel+Decorative:wght@400;900&display=swap');
          @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          .btn-httyd { background: linear-gradient(135deg, #c8860a, #8b5e00); border: 2px solid #e8c060; color: #fff8e0; padding: 12px 32px; font-size: 15px; font-family: 'Cinzel', serif; font-weight: 600; border-radius: 4px; cursor: pointer; letter-spacing: 1px; transition: all 0.2s; }
          .btn-httyd:hover { transform: scale(1.04); box-shadow: 0 0 15px #c8860a66; }
          .btn-httyd:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
          .slot-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px 18px; cursor: pointer; transition: all 0.18s; display: flex; align-items: center; gap: 14px; }
          .slot-card:hover { border-color: #4db8ff55; background: rgba(77,184,255,0.05); }
          .slot-card.empty { border-style: dashed; opacity: 0.6; cursor: default; }
          .btn-sm-a { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); color: #e8d5b0; padding: 5px 12px; font-size: 10px; font-family: 'Cinzel', serif; border-radius: 3px; cursor: pointer; letter-spacing: 1px; transition: all 0.15s; text-transform: uppercase; }
          .btn-sm-a:hover { background: rgba(255,255,255,0.1); }
          .btn-del { background: rgba(248,113,113,0.05); border: 1px solid rgba(248,113,113,0.25); color: #f87171; padding: 5px 10px; font-size: 10px; font-family: 'Cinzel', serif; border-radius: 3px; cursor: pointer; letter-spacing: 1px; transition: all 0.15s; text-transform: uppercase; }
          .btn-del:hover { background: rgba(248,113,113,0.15); }
        `}</style>

        <div style={{ animation: "float2 3s ease-in-out infinite", fontSize: "64px", marginBottom: "12px" }}>🐉</div>
        <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(20px,4vw,32px)", fontWeight: "900", marginBottom: "4px", textAlign: "center" }}>
          How To Train Your Dragon
        </div>
        <div style={{ fontSize: "11px", letterSpacing: "4px", opacity: 0.5, marginBottom: "32px" }}>SELECT YOUR RIDER</div>

        {!storageReady ? (
          <div style={{ opacity: 0.5 }}>Loading save data...</div>
        ) : (
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <div style={{ display: "grid", gap: "10px", marginBottom: "16px" }}>
              {accounts.map(acc => (
                <div key={acc.slot} className="slot-card" onClick={() => loadSlot(acc.slot)}>
                  <div style={{ fontSize: "32px" }}>{acc.dragonEmoji || "🐉"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>{acc.name || "New Rider"}</div>
                    <div style={{ fontSize: "11px", opacity: 0.6 }}>
                      {acc.level > 0 ? `Lv.${acc.level} ${getLevelTitle(acc.level)} · ${acc.dragonName}` : "Not started"}
                    </div>
                    {acc.lastSaved && (
                      <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "2px" }}>
                        Last saved {new Date(acc.lastSaved).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    <button className="btn-sm-a" onClick={e => { e.stopPropagation(); loadSlot(acc.slot); }}>
                      {acc.level > 0 ? "Continue" : "Start"}
                    </button>
                    <button className="btn-del" onClick={e => { e.stopPropagation(); deleteSlot(acc.slot); }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
            {canCreate && (
              <button className="btn-httyd" style={{ width: "100%" }} onClick={createNewSlot}>
                ➕ New Rider
              </button>
            )}
            {!canCreate && (
              <div style={{ textAlign: "center", opacity: 0.4, fontSize: "12px" }}>
                Maximum 5 riders. Delete one to create a new rider.
              </div>
            )}
            {accounts.length === 0 && (
              <div style={{ textAlign: "center", opacity: 0.5, fontSize: "13px", marginBottom: "16px" }}>
                No riders yet. Create your first Viking!
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (screen === "intro") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 30% 20%, #1a3a5c 0%, #0a0f1e 60%)",
        fontFamily: "'Cinzel', 'Georgia', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#e8d5b0",
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Stars */}
        {[...Array(40)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            borderRadius: "50%",
            background: "white",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
          }} />
        ))}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Cinzel+Decorative:wght@400;900&display=swap');
          @keyframes twinkle { from { opacity: 0.3 } to { opacity: 1 } }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
          @keyframes glow { 0%,100%{text-shadow:0 0 20px #4db8ff,0 0 40px #1a7abf} 50%{text-shadow:0 0 40px #4db8ff,0 0 80px #1a7abf,0 0 120px #0a4a7a} }
          .btn-httyd { background: linear-gradient(135deg, #c8860a, #8b5e00); border: 2px solid #e8c060; color: #fff8e0; padding: 14px 40px; font-size: 18px; font-family: 'Cinzel', serif; font-weight: 600; border-radius: 4px; cursor: pointer; letter-spacing: 2px; transition: all 0.2s; text-transform: uppercase; }
          .btn-httyd:hover { transform: scale(1.05); background: linear-gradient(135deg, #e09a10, #a07000); box-shadow: 0 0 20px #c8860a66; }
        `}</style>
        <div style={{ animation: "float 4s ease-in-out infinite", fontSize: "100px", marginBottom: "20px" }}>🐉</div>
        <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: "900", textAlign: "center", animation: "glow 3s infinite", marginBottom: "10px", letterSpacing: "3px" }}>
          HOW TO TRAIN
        </div>
        <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(32px,6vw,64px)", fontWeight: "900", textAlign: "center", animation: "glow 3s infinite 0.5s", color: "#4db8ff", marginBottom: "8px" }}>
          YOUR DRAGON
        </div>
        <div style={{ fontSize: "16px", letterSpacing: "6px", opacity: 0.7, marginBottom: "50px", textTransform: "uppercase" }}>— The RPG —</div>
        <button className="btn-httyd" onClick={() => setScreen("name")}>Begin Your Journey</button>
      </div>
    );
  }

  if (screen === "name") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 60% 30%, #1a2a4a 0%, #0a0f1e 70%)",
        fontFamily: "'Cinzel', 'Georgia', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#e8d5b0",
        padding: "20px"
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&display=swap'); .btn-httyd{background:linear-gradient(135deg,#c8860a,#8b5e00);border:2px solid #e8c060;color:#fff8e0;padding:12px 32px;font-size:16px;font-family:'Cinzel',serif;font-weight:600;border-radius:4px;cursor:pointer;letter-spacing:1px;transition:all 0.2s;} .btn-httyd:hover{transform:scale(1.04);box-shadow:0 0 15px #c8860a66;} input.httyd{background:rgba(255,255,255,0.05);border:1px solid #4db8ff44;border-bottom:2px solid #4db8ff;color:#e8d5b0;padding:12px 16px;font-size:20px;font-family:'Cinzel',serif;outline:none;width:260px;text-align:center;letter-spacing:2px;}`}</style>
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>⚔️</div>
        <div style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: "900", marginBottom: "8px", textAlign: "center" }}>What is your name, Viking?</div>
        <div style={{ opacity: 0.6, marginBottom: "32px", fontSize: "14px", letterSpacing: "2px" }}>YOUR LEGEND BEGINS HERE</div>
        <input
          className="httyd"
          placeholder="Enter your name..."
          value={playerNameInput}
          onChange={e => setPlayerNameInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && playerNameInput.trim()) { setPlayerName(playerNameInput.trim()); setScreen("starter"); } }}
        />
        <div style={{ marginTop: "24px" }}>
          <button className="btn-httyd" onClick={() => { if (playerNameInput.trim()) { setPlayerName(playerNameInput.trim()); setScreen("starter"); } }}>
            Confirm
          </button>
        </div>
      </div>
    );
  }

  if (screen === "starter") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 40% 30%, #0d2137 0%, #060a14 70%)",
        fontFamily: "'Cinzel', 'Georgia', serif",
        color: "#e8d5b0",
        padding: "30px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&display=swap'); .starter-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:24px 18px;cursor:pointer;transition:all 0.2s;width:240px;text-align:center;} .starter-card:hover,.starter-card.sel{border-color:#4db8ff;box-shadow:0 0 20px #4db8ff33;transform:translateY(-4px);} .btn-httyd{background:linear-gradient(135deg,#c8860a,#8b5e00);border:2px solid #e8c060;color:#fff8e0;padding:12px 32px;font-size:16px;font-family:'Cinzel',serif;font-weight:600;border-radius:4px;cursor:pointer;letter-spacing:1px;transition:all 0.2s;} .btn-httyd:hover{transform:scale(1.04);box-shadow:0 0 15px #c8860a66;} .btn-httyd:disabled{opacity:0.4;cursor:not-allowed;transform:none;} input.httyd{background:rgba(255,255,255,0.05);border-bottom:2px solid #4db8ff;color:#e8d5b0;padding:8px 14px;font-size:16px;font-family:'Cinzel',serif;outline:none;width:200px;text-align:center;border-top:none;border-left:none;border-right:none;}`}</style>
        <div style={{ fontSize: "14px", letterSpacing: "4px", opacity: 0.5, marginBottom: "8px" }}>WELCOME, {playerName.toUpperCase()}</div>
        <div style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: "900", marginBottom: "6px", textAlign: "center" }}>Choose Your Dragon</div>
        <div style={{ opacity: 0.6, fontSize: "13px", marginBottom: "32px" }}>Your companion for life. Choose wisely.</div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
          {STARTER_DRAGONS.map(d => (
            <div key={d.id} className={`starter-card${selectedStarter?.id === d.id ? " sel" : ""}`} onClick={() => setSelectedStarter(d)}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", overflow: "hidden" }}>
                <DragonPortrait dragonId={d.id} size={110} rarity={d.rarity} />
              </div>
              <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>{d.name}</div>
              <div style={{ fontSize: "12px", color: "#4db8ff", letterSpacing: "1px", marginBottom: "10px" }}>{d.class}</div>
              <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "14px", lineHeight: "1.5" }}>{d.description}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", fontSize: "11px" }}>
                {Object.entries(d.stats).map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "3px", padding: "4px 6px" }}>
                    <span style={{ opacity: 0.6, textTransform: "uppercase", letterSpacing: "1px" }}>{k}</span>
                    <br /><span style={{ fontWeight: "700", color: "#4db8ff" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#f59e0b", background: "rgba(245,158,11,0.1)", borderRadius: "3px", padding: "4px 8px" }}>
                ✨ {d.ability}
              </div>
            </div>
          ))}
        </div>
        {selectedStarter && (
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ marginBottom: "10px", opacity: 0.7, fontSize: "14px" }}>Name your {selectedStarter.name}:</div>
            <input
              className="httyd"
              placeholder={selectedStarter.name}
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
            />
          </div>
        )}
        <button className="btn-httyd" disabled={!selectedStarter} onClick={() => startGame(selectedStarter)}>
          {selectedStarter ? `Begin with ${nameInput || selectedStarter.name}` : "Select a Dragon First"}
        </button>
      </div>
    );
  }

  // ============================================================
  // MAIN GAME
  // ============================================================
  const allLocations = [...LOCATIONS, ...customIslands];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060a14",
      fontFamily: "'Cinzel', 'Georgia', serif",
      color: "#e8d5b0",
      display: "flex",
      flexDirection: "column",
      maxWidth: "900px",
      margin: "0 auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        .btn-sm { background: rgba(77,184,255,0.1); border: 1px solid rgba(77,184,255,0.3); color: #4db8ff; padding: 6px 14px; font-size: 11px; font-family: 'Cinzel', serif; border-radius: 3px; cursor: pointer; letter-spacing: 1px; transition: all 0.15s; text-transform: uppercase; }
        .btn-sm:hover { background: rgba(77,184,255,0.2); border-color: #4db8ff; }
        .btn-sm.danger { color: #f87171; border-color: rgba(248,113,113,0.3); background: rgba(248,113,113,0.05); }
        .btn-sm.danger:hover { background: rgba(248,113,113,0.15); }
        .btn-sm.gold { color: #f59e0b; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.05); }
        .btn-sm.gold:hover { background: rgba(245,158,11,0.15); }
        .btn-sm.success { color: #4ade80; border-color: rgba(74,222,128,0.3); background: rgba(74,222,128,0.05); }
        .btn-sm.success:hover { background: rgba(74,222,128,0.15); }
        .tab { padding: 10px 16px; font-size: 11px; font-family: 'Cinzel', serif; cursor: pointer; letter-spacing: 1px; border: none; background: none; color: #9ca3af; transition: all 0.15s; text-transform: uppercase; border-bottom: 2px solid transparent; }
        .tab.active { color: #4db8ff; border-bottom: 2px solid #4db8ff; }
        .tab:hover:not(.active) { color: #e8d5b0; }
        .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; }
        .progress-bar { background: rgba(255,255,255,0.08); border-radius: 4px; height: 8px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
        input.httyd-in { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid #4db8ff55; color: #e8d5b0; padding: 6px 10px; font-size: 12px; font-family: 'Cinzel', serif; outline: none; border-radius: 3px; }
        input.httyd-in:focus { border-color: #4db8ff; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .combat-pulse { animation: pulse 1s infinite; }
      `}</style>

      {/* Header */}
      <div style={{ background: "rgba(0,0,0,0.6)", borderBottom: "1px solid rgba(77,184,255,0.15)", padding: "12px 16px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "11px", opacity: 0.5, letterSpacing: "2px" }}>RIDER</div>
          <div style={{ fontWeight: "700", fontSize: "15px" }}>{playerName}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", opacity: 0.6, marginBottom: "3px" }}>
            <span>Lv.{playerLevel} {getLevelTitle(playerLevel)}</span>
            <span>{playerXP}/{xpForLevel(playerLevel)} XP</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: xpPct + "%", background: "linear-gradient(90deg, #4db8ff, #0080ff)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", opacity: 0.6, marginTop: "3px" }}>
            <span>❤️ {playerHP}/{playerMaxHP}</span>
            <div className="progress-bar" style={{ flex: 1, margin: "0 8px", marginTop: "2px" }}>
              <div className="progress-fill" style={{ width: hpPct + "%", background: hpPct > 50 ? "#4ade80" : hpPct > 25 ? "#f59e0b" : "#f87171" }} />
            </div>
            <span>💰 {playerGold}g</span>
          </div>
        </div>
        {activeDragon && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", opacity: 0.5, letterSpacing: "1px" }}>ACTIVE DRAGON</div>
            <div style={{ fontWeight: "700", fontSize: "13px" }}>{activeDragon.emoji} {activeDragon.nickname}</div>
            <div style={{ fontSize: "10px", color: "#4db8ff" }}>HP: {activeDragon.currentHP}/{activeDragon.maxHP || activeDragon.stats.hp}</div>
          </div>
        )}
        <button
          onClick={() => setModal({ type: "settings" })}
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8d5b0", borderRadius: "6px", width: "34px", height: "34px", cursor: "pointer", fontSize: "16px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          title="Settings"
        >⚙️</button>
      </div>

      {/* Tabs */}
      <div style={{ background: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", overflowX: "auto" }}>
        {["map", "quests", "dragons", "armor", "sanctuaries", "inventory", "hatchery", "log", ...(combat ? ["combat"] : [])].map(t => (
          <button key={t} className={`tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
            {t === "combat" ? <span className="combat-pulse">⚔️ Combat</span> : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>

        {/* MAP TAB */}
        {tab === "map" && (
          <div>

            {/* In-flight banner */}
            {travelling && (() => {
              const toLoc = [...LOCATIONS, ...customIslands].find(l => l.id === travelling.to);
              const pct = Math.round(travelling.progress * 100);
              return (
                <div style={{ background: "rgba(77,184,255,0.07)", border: "1px solid rgba(77,184,255,0.3)", borderRadius: "8px", padding: "12px 14px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {travelling.dragonEmoji} Flying to {toLoc?.name}...
                    </div>
                    <div style={{ fontSize: "11px", color: "#4db8ff" }}>{pct}%</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: pct + "%", background: "linear-gradient(90deg,#4db8ff,#c084fc)" }} />
                  </div>
                  <div style={{ fontSize: "10px", opacity: 0.5, marginTop: "5px" }}>
                    You can't act while flying. Hold tight!
                  </div>
                </div>
              );
            })()}

            <div style={{ marginBottom: "16px", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>📍 {loc?.name || "Unknown"}</div>
              <span style={{ fontSize: "12px", opacity: 0.6 }}>{loc?.description}</span>
            </div>

            {/* Actions at current location */}
            <div className="card" style={{ marginBottom: "12px", opacity: travelling ? 0.4 : 1, pointerEvents: travelling ? "none" : "auto" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "10px" }}>ACTIONS</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button className="btn-sm success" onClick={ride}>🐉 Ride Dragon</button>
                <button className="btn-sm gold" onClick={heal}>💊 Heal (20g)</button>
                <button className="btn-sm gold" onClick={buyEgg}>🥚 Buy Egg (30g)</button>
                {!loc?.custom && !["berk","dragons_edge"].includes(currentLocation) && (
                  <button className="btn-sm" onClick={() => setBase(currentLocation)}>🏠 Set as Base</button>
                )}
                {loc?.custom && (
                  <button className="btn-sm" onClick={() => setBase(currentLocation)}>🏠 Set as Base</button>
                )}
              </div>
            </div>

            {/* Johann warning */}
            {loc?.johannWarning && (
              <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.35)", borderRadius: "6px", padding: "10px 14px", marginBottom: "12px", fontSize: "12px", color: "#f59e0b", lineHeight: "1.6" }}>
                ⚠️ <strong>Warning:</strong> Trader Johann appears welcoming — but he's been secretly working with the Dragon Hunters all along. Talking to him is safe... until it isn't. Fight him to expose the traitor.
              </div>
            )}

            {/* Characters */}
            {loc?.characters && loc.characters.length > 0 && (
              <div className="card" style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "10px" }}>CHARACTERS</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {loc.characters.map(c => (
                    <button key={c} className="btn-sm" onClick={() => talkToCharacter(c)}>
                      {CHARACTERS[c]?.emoji} {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enemies */}
            {loc?.enemies && loc.enemies.length > 0 && (
              <div className="card" style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "10px" }}>ENEMIES SPOTTED</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {loc.enemies.map(eName => {
                    const enemy = ENEMIES.find(e => e.name === eName);
                    if (!enemy) return null;
                    return (
                      <button key={eName} className="btn-sm danger" onClick={() => startCombat(enemy)}>
                        {enemy.emoji} {eName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Visual World Map */}
            <div className="card" style={{ padding: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5 }}>
                  ARCHIPELAGO MAP — BASE: {allLocations.find(l => l.id === currentBase)?.name || "None"}
                </div>
                {!buildingBase ? (
                  <button className="btn-sm" style={{ fontSize: "10px" }} onClick={() => setBuildingBase(true)}>➕ Build Island</button>
                ) : (
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input className="httyd-in" placeholder="Island name..." value={buildName} onChange={e => setBuildName(e.target.value)} style={{ width: "110px", fontSize: "11px", padding: "4px 8px" }} />
                    <button className="btn-sm success" style={{ fontSize: "10px" }} onClick={buildIsland}>Build</button>
                    <button className="btn-sm" style={{ fontSize: "10px" }} onClick={() => setBuildingBase(false)}>✕</button>
                  </div>
                )}
              </div>
              <WorldMap
                locations={allLocations}
                currentLocation={currentLocation}
                currentBase={currentBase}
                playerLevel={playerLevel}
                onExplore={explore}
                travelling={travelling}
              />
              {/* Legend */}
              <div style={{ display: "flex", gap: "14px", marginTop: "8px", flexWrap: "wrap", fontSize: "10px", opacity: 0.6 }}>
                <span>🔵 Current location</span>
                <span>🟡 Home base</span>
                <span>🔒 Level locked</span>
                <span style={{ opacity: 0.4 }}>🌫️ Fog = undiscovered</span>
              </div>
            </div>
          </div>
        )}

        {/* DRAGONS TAB */}
        {tab === "dragons" && (
          <div>
            <div style={{ display: "grid", gap: "12px" }}>
              {dragons.map((d, idx) => (
                <div key={idx} className="card" style={{ border: idx === activeDragonIdx ? "1px solid #4db8ff66" : undefined }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, background: "rgba(0,0,0,0.3)", borderRadius: "8px", overflow: "hidden", border: `1px solid ${RARITY_COLORS[d.rarity] || "#9ca3af"}33` }}>
                      <DragonPortrait dragonId={d.id} size={96} rarity={d.rarity} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{ fontWeight: "700", fontSize: "16px" }}>{d.nickname}</span>
                        <span style={{ fontSize: "11px", opacity: 0.6 }}>{d.name}</span>
                        <span style={{ fontSize: "10px", color: RARITY_COLORS[d.rarity] || "#9ca3af", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "2px" }}>{d.rarity}</span>
                        {idx === activeDragonIdx && <span style={{ fontSize: "10px", color: "#4db8ff" }}>ACTIVE</span>}
                      </div>
                      <div style={{ fontSize: "11px", color: "#4db8ff", marginBottom: "8px" }}>{d.class}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", marginBottom: "10px" }}>
                        {Object.entries(d.stats).map(([k, v]) => (
                          <div key={k} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "3px", padding: "4px", textAlign: "center", fontSize: "10px" }}>
                            <div style={{ opacity: 0.5, textTransform: "uppercase" }}>{k}</div>
                            <div style={{ fontWeight: "700", color: "#4db8ff" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: "11px", color: "#f59e0b", marginBottom: "8px" }}>✨ {d.ability}</div>

                      {/* HP bar */}
                      <div style={{ marginBottom: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", opacity: 0.6, marginBottom: "3px" }}>
                          <span>❤️ HP</span>
                          <span style={{ color: d.currentHP < (d.maxHP || d.stats.hp) * 0.3 ? "#f87171" : "inherit" }}>
                            {d.currentHP}/{d.maxHP || d.stats.hp}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{
                            width: (d.currentHP / (d.maxHP || d.stats.hp) * 100) + "%",
                            background: d.currentHP < (d.maxHP || d.stats.hp) * 0.3 ? "#f87171" : d.currentHP < (d.maxHP || d.stats.hp) * 0.6 ? "#f59e0b" : "#4ade80"
                          }} />
                        </div>
                      </div>

                      {/* Dragon XP / Level bar */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", opacity: 0.6, marginBottom: "3px" }}>
                          <span>⭐ Level {d.level || 1}</span>
                          <span>{d.xp || 0}/{dragonXpForLevel(d.level || 1)} XP</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{
                            width: (Math.min(1, (d.xp || 0) / dragonXpForLevel(d.level || 1)) * 100) + "%",
                            background: "linear-gradient(90deg, #f59e0b, #f97316)"
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                    {idx !== activeDragonIdx && <button className="btn-sm" onClick={() => setActiveDragonIdx(idx)}>Set Active</button>}
                    <RenameInline dragon={d} onRename={(name) => renameDragon(idx, name)} />
                    {dragons.length > 1 && idx !== activeDragonIdx && (
                      <button className="btn-sm" style={{ color: "#c084fc", borderColor: "rgba(192,132,252,0.3)", background: "rgba(192,132,252,0.05)" }}
                        onClick={() => setModal({ type: "release_dragon", data: { dragonIdx: idx, dragon: d } })}>
                        🕊️ Release
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ARMOR TAB */}
        {tab === "armor" && (
          <div>
            {/* Human Armor */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", opacity: 0.5, marginBottom: "10px" }}>YOUR ARMOUR</div>
              <div style={{ display: "grid", gap: "8px" }}>
                {HUMAN_ARMOR.map(a => {
                  const owned = inventory.includes(a.id);
                  const equipped = equippedHumanArmor === a.id;
                  return (
                    <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "10px", background: equipped ? "rgba(77,184,255,0.08)" : owned ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)", border: `1px solid ${equipped ? "#4db8ff55" : owned ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`, borderRadius: "6px", padding: "10px", opacity: owned ? 1 : 0.45 }}>
                      <span style={{ fontSize: "28px" }}>{a.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span style={{ fontWeight: "600", fontSize: "13px" }}>{a.name}</span>
                          {a.legendary && <span style={{ fontSize: "10px", color: "#f59e0b" }}>LEGENDARY</span>}
                          {equipped && <span style={{ fontSize: "10px", color: "#4db8ff" }}>EQUIPPED</span>}
                          {!owned && <span style={{ fontSize: "10px", opacity: 0.5 }}>NOT OWNED</span>}
                        </div>
                        <div style={{ fontSize: "11px", opacity: 0.6 }}>🛡️ +{a.defense} DEF · ❤️ +{a.hpBonus} HP{a.speed !== 0 ? ` · 💨 ${a.speed > 0 ? "+" : ""}${a.speed} SPD` : ""}</div>
                        <div style={{ fontSize: "11px", opacity: 0.5, fontStyle: "italic" }}>{a.description}</div>
                      </div>
                      {owned && (
                        <button className={`btn-sm${equipped ? " success" : ""}`} onClick={() => setEquippedHumanArmor(equipped ? null : a.id)}>
                          {equipped ? "Unequip" : "Equip"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dragon Armor */}
            <div>
              <div style={{ fontSize: "11px", letterSpacing: "3px", opacity: 0.5, marginBottom: "10px" }}>DRAGON ARMOUR</div>
              {dragons.map((d, dIdx) => {
                const armorId = equippedDragonArmor[dIdx];
                const equipped = armorId ? DRAGON_ARMOR.find(a => a.id === armorId) : null;
                return (
                  <div key={dIdx} style={{ marginBottom: "14px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px", display: "flex", gap: "6px", alignItems: "center" }}>
                      {d.emoji} {d.nickname}
                      {equipped && <span style={{ fontSize: "10px", color: "#4ade80" }}>({equipped.name})</span>}
                    </div>
                    <div style={{ display: "grid", gap: "6px" }}>
                      {DRAGON_ARMOR.map(a => {
                        const owned = inventory.includes(a.id);
                        const isEquipped = equippedDragonArmor[dIdx] === a.id;
                        return (
                          <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "10px", background: isEquipped ? "rgba(74,222,128,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${isEquipped ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: "6px", padding: "8px 10px", opacity: owned ? 1 : 0.4 }}>
                            <span style={{ fontSize: "22px" }}>{a.emoji}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                <span style={{ fontWeight: "600", fontSize: "12px" }}>{a.name}</span>
                                {a.legendary && <span style={{ fontSize: "10px", color: "#f59e0b" }}>LEGENDARY</span>}
                                {!owned && <span style={{ fontSize: "10px", opacity: 0.5 }}>NOT OWNED</span>}
                              </div>
                              <div style={{ fontSize: "10px", opacity: 0.6 }}>🛡️ +{a.defenseBonus} DEF · ❤️ +{a.hpBonus} HP{a.speedPenalty > 0 ? ` · 💨 -${a.speedPenalty} SPD` : ""}</div>
                            </div>
                            {owned && (
                              <button className={`btn-sm${isEquipped ? " success" : ""}`} style={{ fontSize: "10px" }}
                                onClick={() => setEquippedDragonArmor(prev => ({ ...prev, [dIdx]: isEquipped ? null : a.id }))}>
                                {isEquipped ? "Remove" : "Equip"}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: "11px", opacity: 0.45, marginTop: "10px", fontStyle: "italic" }}>
              Armour drops from enemies or is looted. Check your Inventory tab for owned pieces.
            </div>
          </div>
        )}

        {/* SANCTUARIES TAB */}
        {tab === "sanctuaries" && (
          <div>
            <div style={{ fontSize: "13px", opacity: 0.7, lineHeight: "1.6", marginBottom: "16px" }}>
              Protected areas where released dragons live free and safe from hunters. Release a dragon from the Dragons tab. They stay forever — but you can visit anytime.
            </div>
            <div style={{ display: "grid", gap: "14px" }}>
              {PROTECTED_AREAS.map(area => {
                const locked = playerLevel < area.minLevel;
                const residents = releasedDragons[area.id] || [];
                const isFull = residents.length >= area.capacity;
                return (
                  <div key={area.id} className="card" style={{
                    borderColor: locked ? "rgba(255,255,255,0.05)" : isFull ? "rgba(245,158,11,0.3)" : "rgba(192,132,252,0.2)",
                    opacity: locked ? 0.45 : 1
                  }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                      <span style={{ fontSize: "32px" }}>{area.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                          <div style={{ fontWeight: "700", fontSize: "15px" }}>{area.name}</div>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            {locked && <span style={{ fontSize: "10px", color: "#f87171" }}>🔒 Lv{area.minLevel}</span>}
                            <span style={{ fontSize: "10px", color: isFull ? "#f59e0b" : "#4ade80", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "2px" }}>
                              {residents.length}/{area.capacity} dragons
                            </span>
                          </div>
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.7, lineHeight: "1.5", marginTop: "4px" }}>{area.description}</div>
                      </div>
                    </div>

                    {/* Lore */}
                    <div style={{ fontSize: "11px", fontStyle: "italic", opacity: 0.5, borderLeft: "2px solid rgba(192,132,252,0.3)", paddingLeft: "10px", marginBottom: "10px", lineHeight: "1.6" }}>
                      {area.lore}
                    </div>

                    {/* Bonus note */}
                    <div style={{ fontSize: "11px", color: "#c084fc", marginBottom: "10px" }}>✨ {area.bonusNote}</div>

                    {/* Residents */}
                    {residents.length > 0 && (
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ fontSize: "10px", letterSpacing: "2px", opacity: 0.5, marginBottom: "6px" }}>RESIDENTS</div>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {residents.map((d, i) => (
                            <div key={i} title={`${d.nickname} (${d.name}) — released by ${d.releasedBy}`}
                              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${RARITY_COLORS[d.rarity] || "#9ca3af"}33`, borderRadius: "6px", padding: "5px 8px", fontSize: "11px", display: "flex", gap: "5px", alignItems: "center" }}>
                              <span>{d.emoji}</span>
                              <div>
                                <div style={{ fontWeight: "600" }}>{d.nickname}</div>
                                <div style={{ fontSize: "9px", opacity: 0.5, color: RARITY_COLORS[d.rarity] }}>{d.rarity}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {residents.length === 0 && !locked && (
                      <div style={{ fontSize: "11px", opacity: 0.4, marginBottom: "8px" }}>
                        No dragons here yet. Release one from the Dragons tab.
                      </div>
                    )}

                    {/* Release button shortcut if you have releasable dragons */}
                    {!locked && !isFull && dragons.length > 1 && (
                      <button className="btn-sm" style={{ color: "#c084fc", borderColor: "rgba(192,132,252,0.3)", background: "rgba(192,132,252,0.05)", fontSize: "10px" }}
                        onClick={() => setModal({ type: "release_choose", data: { areaId: area.id, area } })}>
                        🕊️ Release a Dragon Here
                      </button>
                    )}
                    {isFull && <div style={{ fontSize: "10px", color: "#f59e0b", opacity: 0.8 }}>⚠️ This sanctuary is full.</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {tab === "inventory" && (
          <div>
            {/* Weapons */}
            <div className="card" style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "10px" }}>WEAPONS</div>
              {inventory.filter(id => WEAPONS.find(w => w.id === id)).length === 0 && <div style={{ opacity: 0.5, fontSize: "13px" }}>No weapons yet. Defeat enemies to loot them.</div>}
              <div style={{ display: "grid", gap: "8px" }}>
                {[...new Set(inventory.filter(id => WEAPONS.find(w => w.id === id)))].map((wid, i) => {
                  const w = WEAPONS.find(x => x.id === wid);
                  if (!w) return null;
                  const count = inventory.filter(x => x === wid).length;
                  const isEquipped = equippedWeapon === wid;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", background: isEquipped ? "rgba(77,184,255,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${isEquipped ? "#4db8ff44" : "rgba(255,255,255,0.06)"}`, borderRadius: "6px", padding: "10px" }}>
                      <span style={{ fontSize: "24px" }}>{w.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: "600", fontSize: "13px" }}>{w.name}</span>
                          {w.legendary && <span style={{ fontSize: "10px", color: "#f59e0b" }}>LEGENDARY</span>}
                          {count > 1 && <span style={{ fontSize: "10px", opacity: 0.5 }}>x{count}</span>}
                        </div>
                        <div style={{ fontSize: "11px", opacity: 0.6 }}>⚔️ {w.damage} dmg {w.special && `· ✨ ${w.special}`}</div>
                      </div>
                      <button className={`btn-sm${isEquipped ? " success" : ""}`} onClick={() => setEquippedWeapon(isEquipped ? null : wid)}>
                        {isEquipped ? "Equipped" : "Equip"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Armor owned */}
            {inventory.some(id => HUMAN_ARMOR.find(a => a.id === id) || DRAGON_ARMOR.find(a => a.id === id)) && (
              <div className="card" style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "6px" }}>ARMOUR (equip via Armour tab)</div>
                <div style={{ display: "grid", gap: "6px" }}>
                  {[...new Set(inventory.filter(id => HUMAN_ARMOR.find(a => a.id === id) || DRAGON_ARMOR.find(a => a.id === id)))].map((aid, i) => {
                    const a = HUMAN_ARMOR.find(x => x.id === aid) || DRAGON_ARMOR.find(x => x.id === aid);
                    if (!a) return null;
                    const isHA = !!HUMAN_ARMOR.find(x => x.id === aid);
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", padding: "8px 10px", fontSize: "12px" }}>
                        <span style={{ fontSize: "20px" }}>{a.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontWeight: "600" }}>{a.name}</span>
                          {a.legendary && <span style={{ fontSize: "10px", color: "#f59e0b", marginLeft: "6px" }}>LEGENDARY</span>}
                          <div style={{ fontSize: "10px", opacity: 0.5 }}>{isHA ? "Human Armour" : "Dragon Armour"}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="card">
              <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "6px" }}>EQUIPPED WEAPON</div>
              {equippedWeapon ? (
                <div style={{ fontSize: "13px" }}>{WEAPONS.find(w => w.id === equippedWeapon)?.emoji} {WEAPONS.find(w => w.id === equippedWeapon)?.name}</div>
              ) : (
                <div style={{ opacity: 0.5, fontSize: "13px" }}>Bare hands (10 dmg)</div>
              )}
            </div>
          </div>
        )}

        {/* HATCHERY TAB */}
        {tab === "hatchery" && (
          <div>
            <div style={{ marginBottom: "16px", fontSize: "13px", opacity: 0.7, lineHeight: "1.6" }}>
              Eggs are mystery — any dragon could hatch from one. Night Furies and Light Furies are legendary (2% each). Buy eggs for 30g.
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              <button className="btn-sm gold" onClick={buyEgg}>🥚 Buy Egg (30g)</button>
            </div>

            {eggs.length === 0 ? (
              <div className="card" style={{ textAlign: "center", opacity: 0.5, padding: "32px" }}>No eggs in hatchery.<br />Buy some to expand your den.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                {eggs.map((egg, i) => (
                  <div key={egg.id} className="card" style={{ textAlign: "center", cursor: "pointer" }} onClick={() => hatchEgg(i)}>
                    <div style={{ fontSize: "48px", marginBottom: "8px" }}>🥚</div>
                    <div style={{ fontSize: "11px", opacity: 0.6, marginBottom: "8px" }}>Tap to hatch</div>
                    <button className="btn-sm success" style={{ width: "100%" }}>Hatch</button>
                  </div>
                ))}
              </div>
            )}

            {/* Rarity table */}
            <div className="card" style={{ marginTop: "16px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "10px" }}>HATCH ODDS</div>
              <div style={{ display: "grid", gap: "4px" }}>
                {EGG_DRAGONS.map(d => (
                  <div key={d.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span>{d.emoji} {d.name}</span>
                    <span style={{ color: RARITY_COLORS[d.rarity] }}>{d.chance}% · {d.rarity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMBAT TAB */}
        {tab === "combat" && combat && (
          <div>
            <div className="card" style={{ marginBottom: "12px", borderColor: "#f8717155" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "18px" }}>{combat.enemy.emoji} {combat.enemy.name}</div>
                  <div style={{ fontSize: "11px", opacity: 0.6 }}>Dragon Hunter</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#f87171", fontWeight: "700" }}>{combat.enemyHP} / {combat.enemy.maxHp} HP</div>
                </div>
              </div>
              <div className="progress-bar" style={{ marginBottom: "4px" }}>
                <div className="progress-fill" style={{ width: (combat.enemyHP / combat.enemy.maxHp * 100) + "%", background: "#f87171" }} />
              </div>
              <div style={{ fontSize: "11px", opacity: 0.5 }}>ATK {combat.enemy.attack} · DEF {combat.enemy.defense}</div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              <button className="btn-sm danger" onClick={combatAttack}>⚔️ Attack</button>
              {activeDragon && activeDragon.currentHP > 0 && (
                <button className="btn-sm success" onClick={dragonAttack}>🐉 Dragon Attack</button>
              )}
              <button className="btn-sm" onClick={combatFlee}>🏃 Flee</button>
            </div>

            <div className="card" style={{ maxHeight: "200px", overflowY: "auto" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", opacity: 0.5, marginBottom: "8px" }}>BATTLE LOG</div>
              {combat.log.map((l, i) => (
                <div key={i} style={{ fontSize: "12px", padding: "3px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", opacity: i === combat.log.length - 1 ? 1 : 0.7 }}>{l}</div>
              ))}
            </div>
          </div>
        )}

        {/* QUESTS TAB */}
        {tab === "quests" && (() => {
          const activeQuests = QUESTS.filter(q => questLog[q.id]?.status === QUEST_STATUS.ACTIVE);
          const availableQuests = QUESTS.filter(q => isQuestAvailable(q));
          const completedQuests = QUESTS.filter(q => questLog[q.id]?.status === QUEST_STATUS.COMPLETE);

          return (
            <div>
              {/* Active quests */}
              {activeQuests.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", opacity: 0.5, marginBottom: "10px" }}>ACTIVE QUESTS</div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {activeQuests.map(q => {
                      const qstate = questLog[q.id];
                      return (
                        <div key={q.id} className="card" style={{ borderColor: "rgba(77,184,255,0.3)" }}>
                          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
                            <span style={{ fontSize: "22px" }}>{q.giverEmoji}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: "700", fontSize: "14px" }}>{q.title}</div>
                              <div style={{ fontSize: "11px", color: "#4db8ff", marginBottom: "6px" }}>from {q.giver}</div>
                              <div style={{ fontSize: "12px", opacity: 0.7, lineHeight: "1.5", marginBottom: "10px" }}>{q.description}</div>
                              {/* Objectives */}
                              <div style={{ display: "grid", gap: "5px" }}>
                                {qstate.objectives.map(obj => {
                                  const done = obj.progress >= obj.count;
                                  const pct = Math.min(100, (obj.progress / obj.count) * 100);
                                  return (
                                    <div key={obj.id}>
                                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                                        <span style={{ color: done ? "#4ade80" : "#e8d5b0" }}>
                                          {done ? "✅" : "⬜"} {obj.label}
                                        </span>
                                        <span style={{ opacity: 0.6 }}>{obj.progress}/{obj.count}</span>
                                      </div>
                                      <div className="progress-bar" style={{ height: "4px" }}>
                                        <div className="progress-fill" style={{ width: pct + "%", background: done ? "#4ade80" : "#4db8ff" }} />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div style={{ marginTop: "10px", fontSize: "11px", color: "#f59e0b" }}>🏆 Reward: {q.rewardText}</div>
                            </div>
                          </div>
                          <div style={{ fontSize: "11px", fontStyle: "italic", opacity: 0.5, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "8px" }}>
                            {q.flavour}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Available quests */}
              {availableQuests.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", opacity: 0.5, marginBottom: "10px" }}>AVAILABLE QUESTS</div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {availableQuests.map(q => (
                      <div key={q.id} className="card" style={{ borderColor: "rgba(245,158,11,0.2)" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
                          <span style={{ fontSize: "22px" }}>{q.giverEmoji}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ fontWeight: "700", fontSize: "14px" }}>{q.title}</div>
                              <div style={{ fontSize: "10px", color: "#4db8ff", opacity: 0.6 }}>Lv{q.minLevel}+</div>
                            </div>
                            <div style={{ fontSize: "11px", color: "#f59e0b", marginBottom: "6px" }}>from {q.giver} · {[...LOCATIONS, ...customIslands].find(l=>l.id===q.location)?.name || q.location}</div>
                            <div style={{ fontSize: "12px", opacity: 0.7, lineHeight: "1.5", marginBottom: "10px" }}>{q.description}</div>
                            <div style={{ fontSize: "11px", color: "#f59e0b", marginBottom: "10px" }}>🏆 {q.rewardText}</div>
                            <button className="btn-sm success" onClick={() => acceptQuest(q.id)}>📜 Accept Quest</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked quests hint */}
              {QUESTS.filter(q => !questLog[q.id] && !isQuestAvailable(q)).length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", opacity: 0.5, marginBottom: "10px" }}>LOCKED QUESTS</div>
                  <div style={{ display: "grid", gap: "6px" }}>
                    {QUESTS.filter(q => !questLog[q.id] && !isQuestAvailable(q)).map(q => (
                      <div key={q.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "10px 12px", opacity: 0.45, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: "600", fontSize: "12px" }}>🔒 {q.title}</div>
                          <div style={{ fontSize: "10px", opacity: 0.6 }}>from {q.giver}</div>
                        </div>
                        <div style={{ fontSize: "10px", color: "#f87171" }}>Lv{q.minLevel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed */}
              {completedQuests.length > 0 && (
                <div>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", opacity: 0.5, marginBottom: "10px" }}>COMPLETED</div>
                  <div style={{ display: "grid", gap: "6px" }}>
                    {completedQuests.map(q => (
                      <div key={q.id} style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: "6px", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: "600", fontSize: "12px", color: "#4ade80" }}>✅ {q.title}</div>
                          <div style={{ fontSize: "10px", opacity: 0.6 }}>{q.rewardText}</div>
                        </div>
                        <span style={{ fontSize: "18px" }}>{q.giverEmoji}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeQuests.length === 0 && availableQuests.length === 0 && completedQuests.length === 0 && (
                <div style={{ textAlign: "center", opacity: 0.4, padding: "48px 0" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>📜</div>
                  No quests available yet. Level up and explore to unlock them.
                </div>
              )}
            </div>
          );
        })()}

        {/* LOG TAB */}
        {tab === "log" && (
          <div ref={logRef} style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {log.length === 0 && <div style={{ opacity: 0.4, textAlign: "center", padding: "32px" }}>No events yet. Start exploring.</div>}
            {[...log].reverse().map(entry => (
              <div key={entry.id} style={{
                padding: "8px 12px",
                borderLeft: `3px solid ${entry.type === "success" ? "#4ade80" : entry.type === "error" ? "#f87171" : entry.type === "dialogue" ? "#f59e0b" : entry.type === "legendary" ? "#f59e0b" : entry.type === "ride" ? "#c084fc" : "#4db8ff"}`,
                marginBottom: "6px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "0 4px 4px 0",
                fontSize: "13px",
                lineHeight: "1.5"
              }}>
                {entry.msg}
              </div>
            ))}
          </div>
        )}
      </div>

      <HealParticles particles={healParticles} />

      {/* MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }} onClick={() => setModal(null)}>
          <div style={{ background: "#0d1624", border: "1px solid rgba(77,184,255,0.3)", borderRadius: "10px", padding: "28px", maxWidth: "400px", width: "100%", textAlign: "center" }} onClick={e => e.stopPropagation()}>
            {modal.type === "dialogue" && (
              <>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>{modal.data.emoji}</div>
                <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "16px" }}>{modal.data.name}</div>
                <div style={{ fontSize: "15px", fontStyle: "italic", opacity: 0.9, lineHeight: "1.7", marginBottom: "20px" }}>"{modal.data.line}"</div>
                <button className="btn-sm" onClick={() => setModal(null)}>Close</button>
              </>
            )}

            {modal.type === "gothi" && (
              <>
                <div style={{ fontSize: "48px", marginBottom: "8px" }}>👵</div>
                <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>Moith</div>
                <div style={{ fontSize: "11px", color: "#4db8ff", letterSpacing: "2px", marginBottom: "16px" }}>ELDER HEALER OF HOLTGARD</div>
                <div style={{ fontSize: "22px", letterSpacing: "6px", color: "#f59e0b", marginBottom: "8px", fontFamily: "serif" }}>{modal.data.runes}</div>
                <div style={{ fontSize: "11px", opacity: 0.4, marginBottom: "16px", fontStyle: "italic" }}>(What she actually means: "{modal.data.real}")</div>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,165,0,0.2)", borderRadius: "6px", padding: "12px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "11px", color: "#f59e0b", letterSpacing: "1px", marginBottom: "6px" }}>🔧 GROTT'S TRANSLATION:</div>
                  <div style={{ fontSize: "13px", fontStyle: "italic", lineHeight: "1.6", opacity: 0.9 }}>"{modal.data.gobber}"</div>
                </div>
                {dragons.some(d => d.currentHP < (d.maxHP || d.stats.hp)) ? (
                  <>
                    <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "10px" }}>Moith can heal your injured dragons. (25g each)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                      {dragons.map((d, i) => d.currentHP < (d.maxHP || d.stats.hp) && (
                        <button key={i} className="btn-sm success" onClick={() => gothiHealDragon(i)}>
                          {d.emoji} Heal {d.nickname} ({d.currentHP}/{d.maxHP || d.stats.hp} HP) — 25g
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: "12px", color: "#4ade80", marginBottom: "12px" }}>✅ All your dragons are at full health!</div>
                )}
                <button className="btn-sm" onClick={() => setModal(null)}>Leave</button>
              </>
            )}

            {modal.type === "gobber_translate" && (
              <>
                <div style={{ fontSize: "48px", marginBottom: "8px" }}>🔧</div>
                <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>Grott</div>
                <div style={{ fontSize: "11px", color: "#4db8ff", letterSpacing: "2px", marginBottom: "14px" }}>ATTEMPTING TO TRANSLATE</div>
                <div style={{ fontSize: "20px", letterSpacing: "4px", color: "#f59e0b", marginBottom: "10px", fontFamily: "serif" }}>{modal.data.runes}</div>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "12px", marginBottom: "10px" }}>
                  <div style={{ fontSize: "11px", opacity: 0.4, letterSpacing: "1px", marginBottom: "4px" }}>WHAT MOITH WROTE:</div>
                  <div style={{ fontSize: "12px", opacity: 0.6, fontStyle: "italic" }}>"{modal.data.real}"</div>
                </div>
                <div style={{ background: "rgba(255,165,0,0.07)", border: "1px solid rgba(255,165,0,0.25)", borderRadius: "6px", padding: "12px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "11px", color: "#f59e0b", letterSpacing: "1px", marginBottom: "6px" }}>🔧 WHAT GROTT TOLD YOU:</div>
                  <div style={{ fontSize: "14px", fontStyle: "italic", lineHeight: "1.7" }}>"{modal.data.gobber}"</div>
                </div>
                <button className="btn-sm" onClick={() => setModal(null)}>...Right. Thanks, Grott.</button>
              </>
            )}
            {modal.type === "hatched" && (() => {
              const isTW = modal.data.rarity === "Titanwing";
              const isLeg = modal.data.rarity === "Legendary" || modal.data.rarity === "Epic";
              return (
                <>
                  {isTW && (
                    <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#f0f0ff", marginBottom: "8px", animation: "pulse 1s infinite" }}>
                      ✦ ✦ ✦ TITANWING ✦ ✦ ✦
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", background: "rgba(0,0,0,0.3)", borderRadius: "10px", overflow: "hidden", border: `1px solid ${RARITY_COLORS[modal.data.rarity] || "#9ca3af"}44` }}>
                    <DragonPortrait dragonId={modal.data.id} size={isTW ? 140 : 120} rarity={modal.data.rarity} />
                  </div>
                  <div style={{ color: RARITY_COLORS[modal.data.rarity] || "#9ca3af", fontSize: "13px", letterSpacing: "3px", marginBottom: "8px", fontWeight: isTW ? "700" : "400" }}>
                    {modal.data.rarity.toUpperCase()} DRAGON
                  </div>
                  <div style={{ fontWeight: "700", fontSize: isTW ? "26px" : "22px", marginBottom: "8px" }}>{modal.data.name} Hatched!</div>
                  <div style={{ fontSize: "13px", opacity: 0.7, marginBottom: isTW ? "8px" : "16px" }}>{modal.data.class} · ✨ {modal.data.ability}</div>
                  {isTW && (
                    <div style={{ fontSize: "12px", color: "#f0f0ff", background: "rgba(240,240,255,0.06)", border: "1px solid rgba(240,240,255,0.2)", borderRadius: "6px", padding: "8px 12px", marginBottom: "12px", lineHeight: "1.6" }}>
                      A fully evolved Titanwing — the apex of dragonkind. Fewer than one in two hundred riders ever see one hatch.
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "6px", marginBottom: "16px" }}>
                    {Object.entries(modal.data.stats).map(([k, v]) => (
                      <div key={k} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "4px", padding: "5px", textAlign: "center", fontSize: "10px" }}>
                        <div style={{ opacity: 0.5, textTransform: "uppercase" }}>{k}</div>
                        <div style={{ fontWeight: "700", color: isTW ? "#f0f0ff" : "#4db8ff" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "16px" }}>Head to the Dragons tab to rename it.</div>
                  <button className={`btn-sm${isTW ? "" : " success"}`} style={isTW ? { color: "#f0f0ff", borderColor: "rgba(240,240,255,0.4)", background: "rgba(240,240,255,0.06)" } : {}} onClick={() => setModal(null)}>
                    {isTW ? "✦ Incredible ✦" : "Wonderful!"}
                  </button>
                </>
              );
            })()}
            {/* Release dragon — pick sanctuary */}
            {modal.type === "release_dragon" && (() => {
              const { dragonIdx, dragon } = modal.data;
              return (
                <>
                  <div style={{ fontSize: "48px", marginBottom: "8px" }}>{dragon.emoji}</div>
                  <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>Release {dragon.nickname}?</div>
                  <div style={{ fontSize: "12px", color: RARITY_COLORS[dragon.rarity], marginBottom: "16px" }}>{dragon.rarity} · {dragon.class}</div>
                  <div style={{ fontSize: "12px", opacity: 0.7, lineHeight: "1.6", marginBottom: "16px" }}>
                    Choose a protected area. {dragon.nickname} will live there safely, forever. You'll be able to visit them anytime in the Sanctuaries tab.
                  </div>
                  <div style={{ display: "grid", gap: "7px", marginBottom: "14px" }}>
                    {PROTECTED_AREAS.map(area => {
                      const locked = playerLevel < area.minLevel;
                      const full = (releasedDragons[area.id]?.length || 0) >= area.capacity;
                      const disabled = locked || full;
                      return (
                        <button key={area.id}
                          disabled={disabled}
                          style={{ background: disabled ? "rgba(255,255,255,0.02)" : "rgba(192,132,252,0.07)", border: `1px solid ${disabled ? "rgba(255,255,255,0.06)" : "rgba(192,132,252,0.3)"}`, borderRadius: "6px", padding: "9px 12px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, display: "flex", justifyContent: "space-between", alignItems: "center", color: "#e8d5b0", fontFamily: "'Cinzel',serif", fontSize: "12px" }}
                          onClick={() => !disabled && releaseDragon(dragonIdx, area.id)}
                        >
                          <span>{area.emoji} {area.name}</span>
                          <span style={{ fontSize: "10px", opacity: 0.6 }}>
                            {locked ? `🔒 Lv${area.minLevel}` : full ? "Full" : `${(releasedDragons[area.id]?.length||0)}/${area.capacity}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button className="btn-sm" onClick={() => setModal(null)}>Cancel</button>
                </>
              );
            })()}

            {/* Release choose — pick dragon for a specific area */}
            {modal.type === "release_choose" && (() => {
              const { areaId, area } = modal.data;
              const releasable = dragons.filter((_, i) => i !== activeDragonIdx);
              return (
                <>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{area.emoji}</div>
                  <div style={{ fontWeight: "700", fontSize: "17px", marginBottom: "4px" }}>{area.name}</div>
                  <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "16px" }}>Choose a dragon to release here:</div>
                  {releasable.length === 0 ? (
                    <div style={{ opacity: 0.5, fontSize: "13px", marginBottom: "14px" }}>No releasable dragons. Your active dragon can't be released.</div>
                  ) : (
                    <div style={{ display: "grid", gap: "7px", marginBottom: "14px" }}>
                      {releasable.map((d) => {
                        const idx = dragons.indexOf(d);
                        return (
                          <button key={idx}
                            style={{ background: "rgba(192,132,252,0.05)", border: "1px solid rgba(192,132,252,0.25)", borderRadius: "6px", padding: "9px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", color: "#e8d5b0", fontFamily: "'Cinzel',serif", fontSize: "12px" }}
                            onClick={() => releaseDragon(idx, areaId)}
                          >
                            <span style={{ fontSize: "22px" }}>{d.emoji}</span>
                            <div style={{ textAlign: "left" }}>
                              <div style={{ fontWeight: "600" }}>{d.nickname}</div>
                              <div style={{ fontSize: "10px", color: RARITY_COLORS[d.rarity], opacity: 0.8 }}>{d.rarity} · {d.class}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <button className="btn-sm" onClick={() => setModal(null)}>Cancel</button>
                </>
              );
            })()}

            {modal.type === "settings" && (
              <>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>⚙️</div>
                <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>Settings</div>
                <div style={{ fontSize: "11px", color: "#4db8ff", letterSpacing: "2px", marginBottom: "20px" }}>
                  SLOT {activeSlot} · {playerName}
                </div>
                <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "6px", padding: "10px 12px", marginBottom: "16px", fontSize: "12px", color: "#4ade80" }}>
                  ✅ Progress saves automatically as you play.
                </div>
                <div style={{ display: "grid", gap: "10px", marginBottom: "16px" }}>
                  <button className="btn-sm" onClick={() => { setModal(null); setScreen("accounts"); }}>
                    👥 Switch Rider (Account Select)
                  </button>
                  <button className="btn-sm danger" onClick={() => setModal({ type: "confirm_restart" })}>
                    🔄 Restart Journey
                  </button>
                </div>
                <button className="btn-sm" onClick={() => setModal(null)}>Close</button>
              </>
            )}
            {modal.type === "confirm_restart" && (
              <>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚠️</div>
                <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "8px" }}>Restart Journey?</div>
                <div style={{ fontSize: "13px", opacity: 0.7, lineHeight: "1.7", marginBottom: "20px" }}>
                  This will permanently delete all progress for <strong>{playerName}</strong> — dragons, items, quests, and gold. Your rider slot is kept but the save is wiped.
                  <br /><br />This cannot be undone.
                </div>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  <button className="btn-sm danger" onClick={() => { setModal(null); restartJourney(); }}>Yes, Restart</button>
                  <button className="btn-sm" onClick={() => setModal({ type: "settings" })}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// WORLD MAP COMPONENT
// ============================================================

// Fixed island positions on a 500x340 canvas
const ISLAND_POSITIONS = {
  berk:            { x: 110, y:  60, r: 28 },
  dragons_edge:    { x: 260, y: 155, r: 24 },
  glacier_island:  { x:  55, y: 185, r: 20 },
  berserker_island:{ x: 180, y: 255, r: 22 },
  defenders_wing:  { x: 370, y: 240, r: 22 },
  dark_deep:       { x: 430, y: 130, r: 20 },
  dramillion_island:{ x: 340, y:  55, r: 18 },
  viggos_base:     { x: 460, y: 295, r: 26 },
  johanns_ship:    { x: 200, y:  95, r: 16 },
  rykers_outpost:  { x: 320, y: 310, r: 18 },
};

// Colour theme per island
const ISLAND_COLORS = {
  berk:            { fill: "#2a4a6a", stroke: "#4db8ff" },
  dragons_edge:    { fill: "#1a3a5a", stroke: "#38bdf8" },
  glacier_island:  { fill: "#1e3a5a", stroke: "#93c5fd" },
  berserker_island:{ fill: "#3a2a1a", stroke: "#f59e0b" },
  defenders_wing:  { fill: "#1a3a2a", stroke: "#4ade80" },
  dark_deep:       { fill: "#0a0a1a", stroke: "#818cf8" },
  dramillion_island:{ fill: "#3a1a1a", stroke: "#f87171" },
  viggos_base:     { fill: "#2a0a0a", stroke: "#ef4444" },
  johanns_ship:    { fill: "#2a2a1a", stroke: "#d97706" },
  rykers_outpost:  { fill: "#3a1a0a", stroke: "#ea580c" },
};

function IslandShape({ id, x, y, r }) {
  // Each island has a unique organic blob shape via SVG path offsets
  const shapes = {
    berk: `M${x},${y-r} C${x+r*0.6},${y-r*1.1} ${x+r*1.2},${y-r*0.3} ${x+r*1.1},${y+r*0.4} C${x+r*0.8},${y+r*1.1} ${x-r*0.2},${y+r*1.2} ${x-r*0.8},${y+r*0.7} C${x-r*1.3},${y+r*0.1} ${x-r*1.1},${y-r*0.7} ${x},${y-r}Z`,
    dragons_edge: `M${x},${y-r} C${x+r*0.9},${y-r*0.9} ${x+r*1.2},${y+r*0.2} ${x+r*0.7},${y+r*1.0} C${x+r*0.1},${y+r*1.3} ${x-r*0.9},${y+r*0.9} ${x-r*1.1},${y+r*0.1} C${x-r*1.2},${y-r*0.6} ${x-r*0.5},${y-r*1.2} ${x},${y-r}Z`,
    glacier_island: `M${x+r*0.2},${y-r} C${x+r*1.1},${y-r*0.5} ${x+r*1.0},${y+r*0.8} ${x+r*0.3},${y+r*1.1} C${x-r*0.5},${y+r*1.2} ${x-r*1.1},${y+r*0.5} ${x-r*0.9},${y-r*0.3} C${x-r*0.7},${y-r*1.1} ${x-r*0.1},${y-r*1.1} ${x+r*0.2},${y-r}Z`,
    berserker_island: `M${x},${y-r*1.1} C${x+r*0.7},${y-r*0.8} ${x+r*1.2},${y} ${x+r*0.9},${y+r*0.9} C${x+r*0.3},${y+r*1.2} ${x-r*0.6},${y+r*1.1} ${x-r*1.0},${y+r*0.4} C${x-r*1.2},${y-r*0.3} ${x-r*0.6},${y-r*1.1} ${x},${y-r*1.1}Z`,
    defenders_wing: `M${x+r*0.1},${y-r} C${x+r*1.0},${y-r*0.7} ${x+r*1.3},${y+r*0.3} ${x+r*0.6},${y+r*1.1} C${x-r*0.2},${y+r*1.3} ${x-r*1.0},${y+r*0.7} ${x-r*1.1},${y-r*0.1} C${x-r*1.0},${y-r*0.8} ${x-r*0.3},${y-r*1.1} ${x+r*0.1},${y-r}Z`,
    dark_deep: `M${x},${y-r} C${x+r*1.2},${y-r*0.4} ${x+r*1.0},${y+r*1.0} ${x},${y+r*1.1} C${x-r*1.0},${y+r*1.0} ${x-r*1.2},${y-r*0.4} ${x},${y-r}Z`,
    dramillion_island: `M${x+r*0.3},${y-r} C${x+r*1.1},${y-r*0.3} ${x+r*1.0},${y+r*0.9} ${x+r*0.1},${y+r*1.1} C${x-r*0.8},${y+r*1.0} ${x-r*1.1},${y+r*0.2} ${x-r*0.7},${y-r*0.7} C${x-r*0.2},${y-r*1.2} ${x+r*0.3},${y-r}Z`,
    viggos_base: `M${x},${y-r*1.1} C${x+r*0.8},${y-r*0.9} ${x+r*1.3},${y} ${x+r*1.0},${y+r*1.0} C${x+r*0.4},${y+r*1.3} ${x-r*0.5},${y+r*1.2} ${x-r*1.1},${y+r*0.5} C${x-r*1.3},${y-r*0.2} ${x-r*0.7},${y-r*1.1} ${x},${y-r*1.1}Z`,
    johanns_ship: `M${x},${y-r} C${x+r*1.3},${y-r*0.2} ${x+r*0.8},${y+r*1.1} ${x-r*0.2},${y+r*1.0} C${x-r*1.1},${y+r*0.8} ${x-r*1.0},${y-r*0.3} ${x},${y-r}Z`,
    rykers_outpost: `M${x+r*0.2},${y-r} C${x+r*1.1},${y-r*0.4} ${x+r*1.1},${y+r*0.8} ${x+r*0.2},${y+r*1.1} C${x-r*0.7},${y+r*1.1} ${x-r*1.2},${y+r*0.3} ${x-r*0.9},${y-r*0.6} C${x-r*0.4},${y-r*1.1} ${x+r*0.2},${y-r}Z`,
  };
  return shapes[id] || `M${x},${y-r} C${x+r},${y-r} ${x+r},${y+r} ${x},${y+r} C${x-r},${y+r} ${x-r},${y-r} ${x},${y-r}Z`;
}

function WorldMap({ locations, currentLocation, currentBase, playerLevel, onExplore, travelling }) {
  const [hovered, setHovered] = useState(null);
  const W = 500, H = 340;

  // Flying dragon position
  const flyingDragon = (() => {
    if (!travelling) return null;
    const fromPos = ISLAND_POSITIONS[travelling.from] || { x: 250, y: 170 };
    const toPos = ISLAND_POSITIONS[travelling.to] || { x: 250, y: 170 };
    const t = travelling.progress;
    // Quadratic bezier arc — dragon arcs upward mid-flight
    const mx = (fromPos.x + toPos.x) / 2;
    const my = (fromPos.y + toPos.y) / 2 - 40; // arc height
    const bx = (1-t)*(1-t)*fromPos.x + 2*(1-t)*t*mx + t*t*toPos.x;
    const by = (1-t)*(1-t)*fromPos.y + 2*(1-t)*t*my + t*t*toPos.y;
    return { x: bx, y: by, emoji: travelling.dragonEmoji || "🐉",
      fromPos, toPos, mx, my };
  })();

  // Route lines between connected islands (visual only)
  const routes = [
    ["berk","dragons_edge"], ["berk","glacier_island"], ["berk","johanns_ship"],
    ["dragons_edge","berserker_island"], ["dragons_edge","dark_deep"], ["dragons_edge","defenders_wing"],
    ["dragons_edge","dramillion_island"], ["berserker_island","rykers_outpost"],
    ["defenders_wing","viggos_base"], ["rykers_outpost","viggos_base"],
    ["dark_deep","viggos_base"],
  ];

  return (
    <div style={{ position: "relative", width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(77,184,255,0.15)" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", display: "block", background: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ocean gradient */}
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0a1a2e" />
            <stop offset="100%" stopColor="#030810" />
          </radialGradient>
          {/* Fog for locked islands */}
          <filter id="fog">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.1  0 0 0 0 0.2  0 0 0 0.85 0" in="noise" result="colorNoise" />
            <feComposite in="colorNoise" in2="SourceGraphic" operator="in" />
          </filter>
          {/* Glow for active */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Pulse animation for current location */}
          <filter id="pulseGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Wave pattern */}
          <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 Q10,4 20,10 Q30,16 40,10" stroke="rgba(77,184,255,0.06)" strokeWidth="1" fill="none"/>
          </pattern>
        </defs>

        {/* Ocean base */}
        <rect width={W} height={H} fill="url(#oceanGrad)" />
        <rect width={W} height={H} fill="url(#waves)" />

        {/* Subtle vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </radialGradient>
        <rect width={W} height={H} fill="url(#vignette)" />

        {/* Route lines */}
        {routes.map(([a, b]) => {
          const pa = ISLAND_POSITIONS[a], pb = ISLAND_POSITIONS[b];
          if (!pa || !pb) return null;
          const aLocked = (locations.find(l => l.id === a)?.minLevel || 1) > playerLevel;
          const bLocked = (locations.find(l => l.id === b)?.minLevel || 1) > playerLevel;
          return (
            <line key={`${a}-${b}`}
              x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
              stroke={aLocked || bLocked ? "rgba(255,255,255,0.04)" : "rgba(77,184,255,0.12)"}
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          );
        })}

        {/* Islands */}
        {locations.map(loc => {
          const pos = ISLAND_POSITIONS[loc.id];
          if (!pos) return null;
          const { x, y, r } = pos;
          const locked = (loc.minLevel || 1) > playerLevel;
          const isHere = currentLocation === loc.id;
          const isBase = currentBase === loc.id;
          const isHovered = hovered === loc.id;
          const colors = ISLAND_COLORS[loc.id] || { fill: "#1a2a3a", stroke: "#4db8ff" };
          const shapePath = IslandShape({ id: loc.id, x, y, r });

          return (
            <g key={loc.id}
              style={{ cursor: locked ? "not-allowed" : "pointer" }}
              onClick={() => !locked && onExplore(loc.id)}
              onMouseEnter={() => setHovered(loc.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Glow ring for current location */}
              {isHere && (
                <circle cx={x} cy={y} r={r + 10} fill="none" stroke="#4db8ff" strokeWidth="1.5" opacity="0.3" filter="url(#pulseGlow)">
                  <animate attributeName="r" values={`${r+8};${r+14};${r+8}`} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Island blob */}
              <path
                d={shapePath}
                fill={locked ? "#0d1824" : isHovered ? colors.fill.replace("a","b") : colors.fill}
                stroke={isHere ? "#4db8ff" : isBase ? "#f59e0b" : locked ? "rgba(255,255,255,0.1)" : colors.stroke}
                strokeWidth={isHere ? 2 : isBase ? 2 : 1.2}
                opacity={locked ? 0.35 : 1}
                filter={isHere ? "url(#glow)" : undefined}
              />

              {/* Fog overlay for locked */}
              {locked && (
                <path d={shapePath} fill="rgba(10,15,30,0.6)" />
              )}

              {/* Island emoji */}
              <text x={x} y={y + 2} textAnchor="middle" dominantBaseline="middle"
                fontSize={locked ? r * 0.7 : r * 0.85}
                opacity={locked ? 0.3 : 1}
                style={{ userSelect: "none" }}
              >
                {locked ? "🔒" : loc.emoji}
              </text>

              {/* Base indicator */}
              {isBase && !locked && (
                <text x={x} y={y - r - 8} textAnchor="middle" fontSize="8" fill="#f59e0b" fontFamily="Cinzel, serif" letterSpacing="1">
                  HOME
                </text>
              )}

              {/* HERE indicator */}
              {isHere && (
                <text x={x} y={y + r + 10} textAnchor="middle" fontSize="7" fill="#4db8ff" fontFamily="Cinzel, serif" letterSpacing="1">
                  ▲ HERE
                </text>
              )}

              {/* Level lock label */}
              {locked && (
                <text x={x} y={y + r + 10} textAnchor="middle" fontSize="8" fill="#f87171" fontFamily="Cinzel, serif" opacity="0.7">
                  Lv{loc.minLevel}
                </text>
              )}

              {/* Island name — show on hover or if current/base */}
              {(isHovered || isHere || isBase) && !locked && (
                <g>
                  <rect
                    x={x - 50} y={y - r - 26}
                    width="100" height="16"
                    rx="3" fill="rgba(6,10,20,0.85)"
                    stroke={isHere ? "#4db8ff33" : "rgba(255,255,255,0.1)"}
                    strokeWidth="1"
                  />
                  <text x={x} y={y - r - 15} textAnchor="middle" fontSize="8.5"
                    fill={isHere ? "#4db8ff" : isBase ? "#f59e0b" : "#e8d5b0"}
                    fontFamily="Cinzel, serif"
                    style={{ userSelect: "none" }}
                  >
                    {loc.name.length > 18 ? loc.name.slice(0, 17) + "…" : loc.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Custom islands — scatter them in open water */}
        {locations.filter(l => l.custom).map((loc, i) => {
          const angle = (i / Math.max(locations.filter(l=>l.custom).length, 1)) * Math.PI * 2;
          const cx = 250 + Math.cos(angle) * 80;
          const cy = 170 + Math.sin(angle) * 60;
          const isHere = currentLocation === loc.id;
          const isBase = currentBase === loc.id;
          return (
            <g key={loc.id} style={{ cursor: "pointer" }}
              onClick={() => onExplore(loc.id)}
              onMouseEnter={() => setHovered(loc.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle cx={cx} cy={cy} r={14}
                fill="#1a2a1a" stroke={isHere ? "#4db8ff" : isBase ? "#f59e0b" : "#4ade8066"}
                strokeWidth={isHere ? 2 : 1.2}
              />
              <text x={cx} y={cy+2} textAnchor="middle" dominantBaseline="middle" fontSize="12" style={{userSelect:"none"}}>🏝️</text>
              {(hovered === loc.id || isHere) && (
                <text x={cx} y={cy - 20} textAnchor="middle" fontSize="8" fill="#4ade80" fontFamily="Cinzel, serif">{loc.name}</text>
              )}
            </g>
          );
        })}

        {/* Compass rose */}
        <g transform="translate(470, 30)" opacity="0.35">
          <text textAnchor="middle" y="-12" fontSize="8" fill="#e8d5b0" fontFamily="serif">N</text>
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#e8d5b0" strokeWidth="0.8"/>
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#e8d5b0" strokeWidth="0.8"/>
          <circle cx="0" cy="0" r="6" fill="none" stroke="#e8d5b0" strokeWidth="0.6"/>
        </g>

        {/* Flying dragon animation */}
        {flyingDragon && (
          <g>
            {/* Arc trail path */}
            <path
              d={`M${flyingDragon.fromPos.x},${flyingDragon.fromPos.y} Q${flyingDragon.mx},${flyingDragon.my} ${flyingDragon.toPos.x},${flyingDragon.toPos.y}`}
              fill="none"
              stroke="rgba(192,132,252,0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Glow halo under dragon */}
            <circle cx={flyingDragon.x} cy={flyingDragon.y} r="10"
              fill="rgba(192,132,252,0.15)"
              filter="url(#pulseGlow)"
            />
            {/* Dragon emoji */}
            <text
              x={flyingDragon.x}
              y={flyingDragon.y + 5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="18"
              style={{ userSelect: "none", filter: "drop-shadow(0 0 4px rgba(192,132,252,0.8))" }}
            >
              {flyingDragon.emoji}
            </text>
          </g>
        )}
      </svg>

      {/* Tooltip panel for hovered island */}
      {hovered && (() => {
        const loc = locations.find(l => l.id === hovered);
        if (!loc) return null;
        const locked = (loc.minLevel || 1) > playerLevel;
        return (
          <div style={{
            position: "absolute", bottom: "8px", left: "8px", right: "8px",
            background: "rgba(6,10,20,0.92)", border: "1px solid rgba(77,184,255,0.2)",
            borderRadius: "6px", padding: "8px 12px",
            pointerEvents: "none", fontSize: "11px", lineHeight: "1.6"
          }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "18px" }}>{locked ? "🔒" : loc.emoji}</span>
              <div>
                <div style={{ fontWeight: "700", color: locked ? "#f87171" : "#e8d5b0" }}>
                  {loc.name} {locked ? `— Locked (Lv${loc.minLevel})` : ""}
                </div>
                <div style={{ opacity: 0.6 }}>{loc.description}</div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ============================================================
// DRAGON PORTRAIT — SVG illustrated dragon per species
// ============================================================
function DragonPortrait({ dragonId, size = 80, rarity }) {
  const rc = RARITY_COLORS[rarity] || "#9ca3af";
  const s = size;

  const defs = (id) => (
    <>
      <defs>
        <radialGradient id={`bg${id}`} cx="50%" cy="65%" r="60%">
          <stop offset="0%" stopColor={rc} stopOpacity="0.22" />
          <stop offset="100%" stopColor="#060a14" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`eyeL${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id={`glow${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`softglow${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id={`bodygrad${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.18" />
          <stop offset="100%" stopColor="black" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="55" r="44" fill={`url(#bg${id})`} />
    </>
  );

  const portraits = {

    // ── ORIGINAL STARTER DRAKES (The Sundered Reach) ──
    cindermaw: (id) => (
      <g>
        {defs(id)}
        {/* stubby ember wings */}
        <ellipse cx="24" cy="60" rx="13" ry="7" fill="#5b3a12" transform="rotate(-25 24 60)" opacity="0.9"/>
        <ellipse cx="76" cy="60" rx="13" ry="7" fill="#5b3a12" transform="rotate(25 76 60)" opacity="0.9"/>
        {/* body */}
        <ellipse cx="50" cy="66" rx="27" ry="19" fill="#7a4e1a"/>
        <ellipse cx="50" cy="66" rx="27" ry="19" fill={`url(#bodygrad${id})`}/>
        {/* rocky back plates */}
        {[0,1,2,3,4].map(i=><ellipse key={i} cx={30+i*10} cy={52} rx="5" ry="4" fill="#4a3210" opacity="0.85"/>)}
        {/* molten lava cracks */}
        <path d="M36 64 L41 58 L45 64 L50 56 L54 64" stroke="#ff7a18" strokeWidth="1.6" fill="none" opacity="0.7"/>
        <path d="M56 66 L61 60 L65 67" stroke="#ff5500" strokeWidth="1.4" fill="none" opacity="0.6"/>
        {/* neck + head */}
        <ellipse cx="50" cy="50" rx="14" ry="10" fill="#8a5a1e"/>
        <ellipse cx="50" cy="39" rx="17" ry="14" fill="#9a6a22"/>
        <ellipse cx="50" cy="39" rx="17" ry="14" fill={`url(#bodygrad${id})`}/>
        {/* brow ridge */}
        <path d="M36 33 Q50 29 64 33" stroke="#4a3210" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* snout + nostrils */}
        <ellipse cx="50" cy="46" rx="10" ry="6" fill="#8a5a1e"/>
        <ellipse cx="46" cy="48" rx="3" ry="2" fill="#3a2408" opacity="0.7"/>
        <ellipse cx="54" cy="48" rx="3" ry="2" fill="#3a2408" opacity="0.7"/>
        {/* molten throat glow */}
        <ellipse cx="50" cy="50" rx="8" ry="3" fill="#ff7a18" opacity="0.3" filter={`url(#softglow${id})`}/>
        {/* eyes */}
        <circle cx="42" cy="36" r="5" fill="#2a1800"/>
        <circle cx="58" cy="36" r="5" fill="#2a1800"/>
        <circle cx="42" cy="36" r="3.5" fill="#ff8c1a"/>
        <circle cx="58" cy="36" r="3.5" fill="#ff8c1a"/>
        <circle cx="42" cy="36" r="1.8" fill="#1a0d00" filter={`url(#glow${id})`}/>
        <circle cx="58" cy="36" r="1.8" fill="#1a0d00" filter={`url(#glow${id})`}/>
        <circle cx="43" cy="35" r="0.9" fill="white"/>
        <circle cx="59" cy="35" r="0.9" fill="white"/>
      </g>
    ),

    quilldart: (id) => (
      <g>
        {defs(id)}
        {/* swept wings */}
        <path d="M50 55 L14 30 L23 60 Z" fill="#16557e" opacity="0.9"/>
        <path d="M50 55 L86 30 L77 60 Z" fill="#16557e" opacity="0.9"/>
        <line x1="50" y1="55" x2="14" y2="30" stroke="#0c3a5a" strokeWidth="1" opacity="0.6"/>
        {/* gold tail-quill fan */}
        <path d="M50 72 Q63 78 70 73" stroke="#2a6fa0" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {[0,1,2,3].map(i=>(
          <path key={i} d={`M${64+i*4} ${74-i*3} L${70+i*5} ${66-i*5}`} stroke="#f5b800" strokeWidth="2" strokeLinecap="round"/>
        ))}
        {/* body */}
        <ellipse cx="50" cy="63" rx="18" ry="14" fill="#2378ad"/>
        <ellipse cx="50" cy="63" rx="18" ry="14" fill={`url(#bodygrad${id})`}/>
        {/* scale rows */}
        {[0,1,2].map(r => [0,1,2,3].map(c =>
          <ellipse key={r*4+c} cx={37+c*8+(r%2)*4} cy={56+r*5} rx="3" ry="2" fill="#155a86" opacity="0.4"/>
        ))}
        {/* neck + head */}
        <path d="M42 52 Q50 44 58 52" stroke="#2378ad" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <ellipse cx="50" cy="38" rx="13" ry="12" fill="#2e85c0"/>
        <ellipse cx="50" cy="38" rx="13" ry="12" fill={`url(#bodygrad${id})`}/>
        {/* gold head spines */}
        {[0,1,2,3].map(i=>(
          <path key={i} d={`M${42+i*5} 30 L${41+i*5} 22 L${44+i*5} 29`} fill="#f5b800" opacity="0.9"/>
        ))}
        {/* snout */}
        <path d="M42 43 Q50 48 58 43" fill="#2378ad"/>
        <ellipse cx="50" cy="44" rx="6" ry="3" fill="#155a86"/>
        {/* eyes */}
        <circle cx="43" cy="36" r="5" fill="#0a2030"/>
        <circle cx="57" cy="36" r="5" fill="#0a2030"/>
        <circle cx="43" cy="36" r="3.5" fill="#4fc3f7" filter={`url(#glow${id})`}/>
        <circle cx="57" cy="36" r="3.5" fill="#4fc3f7" filter={`url(#glow${id})`}/>
        <circle cx="43" cy="36" r="1.8" fill="#04202e"/>
        <circle cx="57" cy="36" r="1.8" fill="#04202e"/>
        <circle cx="42" cy="35" r="1" fill="white" opacity="0.9"/>
        <circle cx="56" cy="35" r="1" fill="white" opacity="0.9"/>
      </g>
    ),

    pyrewing: (id) => (
      <g>
        {defs(id)}
        {/* flame aura */}
        <ellipse cx="50" cy="60" rx="30" ry="22" fill="#ff4400" opacity="0.1" filter={`url(#softglow${id})`}/>
        {/* wings */}
        <path d="M50 58 L9 25 L19 62 Z" fill="#7a1208" opacity="0.9"/>
        <path d="M50 58 L91 25 L81 62 Z" fill="#7a1208" opacity="0.9"/>
        <path d="M50 58 L19 47" stroke="#4a0a04" strokeWidth="1" opacity="0.5"/>
        {/* tail + flame tip */}
        <path d="M50 74 Q70 84 78 75 Q84 66 74 60" stroke="#b5281a" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M74 60 L80 54 L72 62" fill="#ff6a18" opacity="0.85"/>
        {/* body */}
        <ellipse cx="50" cy="64" rx="20" ry="15" fill="#b22a18"/>
        <ellipse cx="50" cy="64" rx="20" ry="15" fill={`url(#bodygrad${id})`}/>
        <ellipse cx="50" cy="68" rx="14" ry="8" fill="#ff4400" opacity="0.2"/>
        {/* neck + head */}
        <path d="M40 52 Q50 42 60 52" stroke="#c0392b" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <ellipse cx="50" cy="37" rx="15" ry="13" fill="#c0392b"/>
        <ellipse cx="50" cy="37" rx="15" ry="13" fill={`url(#bodygrad${id})`}/>
        {/* horns */}
        <path d="M42 28 L37 18 L45 27" fill="#ff6a18"/>
        <path d="M50 27 L50 17 L54 26" fill="#ff6a18"/>
        <path d="M58 28 L63 18 L55 27" fill="#ff6a18"/>
        {/* snout */}
        <path d="M40 43 Q50 50 60 43" fill="#992414"/>
        <ellipse cx="50" cy="44" rx="8" ry="4" fill="#7a1c0e"/>
        {/* eyes */}
        <circle cx="42" cy="34" r="5.5" fill="#1a0500"/>
        <circle cx="58" cy="34" r="5.5" fill="#1a0500"/>
        <circle cx="42" cy="34" r="4" fill="#ff7a18" filter={`url(#glow${id})`}/>
        <circle cx="58" cy="34" r="4" fill="#ff7a18" filter={`url(#glow${id})`}/>
        <ellipse cx="42" cy="34" rx="2" ry="3" fill="#1a0500"/>
        <ellipse cx="58" cy="34" rx="2" ry="3" fill="#1a0500"/>
        <circle cx="41" cy="33" r="1.2" fill="white" opacity="0.8"/>
        <circle cx="57" cy="33" r="1.2" fill="white" opacity="0.8"/>
      </g>
    ),

    gronckle: (id) => (
      <g>
        {defs(id)}
        {/* Wings */}
        <ellipse cx="22" cy="58" rx="14" ry="7" fill="#6B4A0E" transform="rotate(-30 22 58)" opacity="0.9"/>
        <ellipse cx="78" cy="58" rx="14" ry="7" fill="#6B4A0E" transform="rotate(30 78 58)" opacity="0.9"/>
        {/* Body */}
        <ellipse cx="50" cy="66" rx="26" ry="18" fill="#7A5A12"/>
        <ellipse cx="50" cy="66" rx="26" ry="18" fill="url(#bodygrad_gronckle)" />
        {/* Rock bumps on back */}
        {[0,1,2,3,4].map(i=><ellipse key={i} cx={30+i*10} cy={52} rx="5" ry="4" fill="#5A4010" opacity="0.85"/>)}
        {/* Neck */}
        <ellipse cx="50" cy="52" rx="14" ry="10" fill="#8B6914"/>
        {/* Head */}
        <ellipse cx="50" cy="40" rx="17" ry="14" fill="#9B7820"/>
        <ellipse cx="50" cy="40" rx="17" ry="14" fill="url(#bodygrad_gronckle)" />
        {/* Brow ridge */}
        <path d="M36 34 Q50 30 64 34" stroke="#5A4010" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Snout */}
        <ellipse cx="50" cy="47" rx="10" ry="6" fill="#8B6914"/>
        <ellipse cx="46" cy="49" rx="3" ry="2" fill="#5A3A0A" opacity="0.7"/>
        <ellipse cx="54" cy="49" rx="3" ry="2" fill="#5A3A0A" opacity="0.7"/>
        {/* Eyes */}
        <circle cx="42" cy="37" r="5" fill="#2a1800"/>
        <circle cx="58" cy="37" r="5" fill="#2a1800"/>
        <circle cx="42" cy="37" r="3.5" fill="#e87c00"/>
        <circle cx="58" cy="37" r="3.5" fill="#e87c00"/>
        <circle cx="42" cy="37" r="2" fill="#111" filter={`url(#glow${id})`}/>
        <circle cx="58" cy="37" r="2" fill="#111" filter={`url(#glow${id})`}/>
        <circle cx="43" cy="36" r="0.9" fill="white"/>
        <circle cx="59" cy="36" r="0.9" fill="white"/>
        {/* Rock-plate texture on head */}
        <path d="M38 33 L36 28 L42 31" fill="#6B5010" opacity="0.6"/>
        <path d="M50 30 L50 24 L55 29" fill="#6B5010" opacity="0.6"/>
        <path d="M62 33 L64 28 L58 31" fill="#6B5010" opacity="0.6"/>
        {/* Lava glow under chin */}
        <ellipse cx="50" cy="50" rx="8" ry="3" fill="#ff8c00" opacity="0.18" filter={`url(#softglow${id})`}/>
      </g>
    ),

    gronckle_egg: (id) => portraits.gronckle(id),

    nadder: (id) => (
      <g>
        {defs(id)}
        {/* Wings */}
        <path d="M50 55 L15 30 L22 60 Z" fill="#1540A0" opacity="0.85"/>
        <path d="M50 55 L85 30 L78 60 Z" fill="#1540A0" opacity="0.85"/>
        <path d="M50 55 L15 30 L22 60 Z" fill="url(#bodygrad_nadder)" opacity="0.4"/>
        {/* Wing membrane veins */}
        <line x1="50" y1="55" x2="15" y2="30" stroke="#0A2A80" strokeWidth="1" opacity="0.6"/>
        <line x1="50" y1="55" x2="22" y2="48" stroke="#0A2A80" strokeWidth="0.8" opacity="0.5"/>
        {/* Tail */}
        <path d="M50 72 Q65 80 72 74 Q78 68 70 64" stroke="#1E5FCC" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="50" cy="63" rx="18" ry="14" fill="#2255BB"/>
        <ellipse cx="50" cy="63" rx="18" ry="14" fill="url(#bodygrad_nadder)"/>
        {/* Scale pattern */}
        {[0,1,2].map(r => [0,1,2,3].map(c =>
          <ellipse key={r*4+c} cx={37+c*8+(r%2)*4} cy={56+r*5} rx="3" ry="2" fill="#1840A0" opacity="0.4"/>
        ))}
        {/* Neck */}
        <path d="M42 52 Q50 44 58 52" stroke="#2255BB" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="38" rx="13" ry="12" fill="#2E6ADF"/>
        <ellipse cx="50" cy="38" rx="13" ry="12" fill="url(#bodygrad_nadder)"/>
        {/* Head spines */}
        {[0,1,2,3].map(i=>(
          <path key={i} d={`M${42+i*5} 30 L${41+i*5} 22 L${44+i*5} 29`} fill="#F5B800" opacity="0.9"/>
        ))}
        {/* Snout */}
        <path d="M42 43 Q50 48 58 43" fill="#2255BB"/>
        <ellipse cx="50" cy="44" rx="6" ry="3" fill="#1840A0"/>
        {/* Nostrils */}
        <ellipse cx="47" cy="44" rx="1.5" ry="1" fill="#0A2A70"/>
        <ellipse cx="53" cy="44" rx="1.5" ry="1" fill="#0A2A70"/>
        {/* Eyes */}
        <circle cx="43" cy="36" r="5" fill="#0a1830"/>
        <circle cx="57" cy="36" r="5" fill="#0a1830"/>
        <circle cx="43" cy="36" r="3.5" fill="#00AAFF" filter={`url(#glow${id})`}/>
        <circle cx="57" cy="36" r="3.5" fill="#00AAFF" filter={`url(#glow${id})`}/>
        <circle cx="43" cy="36" r="1.8" fill="#001a33"/>
        <circle cx="57" cy="36" r="1.8" fill="#001a33"/>
        <circle cx="42" cy="35" r="1" fill="white" opacity="0.9"/>
        <circle cx="56" cy="35" r="1" fill="white" opacity="0.9"/>
        {/* Spine glow */}
        <ellipse cx="50" cy="26" rx="12" ry="4" fill="#F5B800" opacity="0.12" filter={`url(#softglow${id})`}/>
      </g>
    ),

    nadder_egg: (id) => portraits.nadder(id),

    nightmare: (id) => (
      <g>
        {defs(id)}
        {/* Fire aura */}
        <ellipse cx="50" cy="70" rx="30" ry="8" fill="#FF4400" opacity="0.1" filter={`url(#softglow${id})`}/>
        {/* Wings */}
        <path d="M50 58 L8 25 L18 62 Z" fill="#8B0000" opacity="0.9"/>
        <path d="M50 58 L92 25 L82 62 Z" fill="#8B0000" opacity="0.9"/>
        {/* Wing membrane detail */}
        <path d="M50 58 L8 25" stroke="#5A0000" strokeWidth="1.5" opacity="0.6"/>
        <path d="M50 58 L18 45" stroke="#5A0000" strokeWidth="1" opacity="0.5"/>
        <path d="M50 58 L92 25" stroke="#5A0000" strokeWidth="1.5" opacity="0.6"/>
        {/* Tail */}
        <path d="M50 74 Q70 85 78 76 Q84 67 74 60" stroke="#BB2200" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M74 60 L80 55 L72 62" fill="#FF5500" opacity="0.8"/>
        {/* Body */}
        <ellipse cx="50" cy="64" rx="20" ry="15" fill="#BB1A00"/>
        <ellipse cx="50" cy="64" rx="20" ry="15" fill="url(#bodygrad_nightmare)"/>
        {/* Fire belly */}
        <ellipse cx="50" cy="68" rx="14" ry="8" fill="#FF4400" opacity="0.2"/>
        {/* Scale ridges */}
        {[0,1,2].map(i=>(
          <path key={i} d={`M${37+i*6} ${56+i*3} Q${40+i*6} ${52+i*3} ${43+i*6} ${56+i*3}`}
            stroke="#8B0000" strokeWidth="2" fill="none" opacity="0.7"/>
        ))}
        {/* Neck */}
        <path d="M40 52 Q50 42 60 52" stroke="#CC2200" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="37" rx="15" ry="13" fill="#CC2200"/>
        <ellipse cx="50" cy="37" rx="15" ry="13" fill="url(#bodygrad_nightmare)"/>
        {/* Head horns */}
        <path d="M42 28 L38 19 L45 27" fill="#FF5500"/>
        <path d="M50 27 L50 18 L54 26" fill="#FF5500"/>
        <path d="M58 28 L62 19 L55 27" fill="#FF5500"/>
        {/* Snout */}
        <path d="M40 43 Q50 50 60 43" fill="#BB1A00"/>
        <ellipse cx="50" cy="44" rx="8" ry="4" fill="#991500"/>
        {/* Fire breath hint */}
        <path d="M46 47 Q50 52 54 47" fill="none" stroke="#FF6600" strokeWidth="1.5" opacity="0.5"/>
        {/* Eyes — glowing orange */}
        <circle cx="42" cy="34" r="5.5" fill="#1a0000"/>
        <circle cx="58" cy="34" r="5.5" fill="#1a0000"/>
        <circle cx="42" cy="34" r="4" fill="#FF6600" filter={`url(#glow${id})`}/>
        <circle cx="58" cy="34" r="4" fill="#FF6600" filter={`url(#glow${id})`}/>
        <ellipse cx="42" cy="34" rx="2" ry="3" fill="#1a0000"/>
        <ellipse cx="58" cy="34" rx="2" ry="3" fill="#1a0000"/>
        <circle cx="41" cy="33" r="1.2" fill="white" opacity="0.8"/>
        <circle cx="57" cy="33" r="1.2" fill="white" opacity="0.8"/>
        {/* Flame glow around body */}
        <ellipse cx="50" cy="50" rx="22" ry="20" fill="none" stroke="#FF4400" strokeWidth="1.5" opacity="0.12"/>
      </g>
    ),

    nightmare_egg: (id) => portraits.nightmare(id),

    night_fury: (id) => (
      <g>
        {defs(id)}
        {/* Wing shadows behind */}
        <path d="M50 60 L5 28 L20 65 Z" fill="#080818" opacity="0.95"/>
        <path d="M50 60 L95 28 L80 65 Z" fill="#080818" opacity="0.95"/>
        {/* Wing details */}
        <path d="M50 60 L5 28" stroke="#0a0a22" strokeWidth="1.5" opacity="0.8"/>
        <path d="M50 60 L20 50" stroke="#0a0a22" strokeWidth="1" opacity="0.6"/>
        <path d="M50 60 L95 28" stroke="#0a0a22" strokeWidth="1.5" opacity="0.8"/>
        {/* Tail fin */}
        <path d="M50 75 Q68 82 74 72 Q80 62 68 58" stroke="#111122" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M68 58 L76 52 L67 60" fill="#222233"/>
        <path d="M68 58 L72 50 L63 58" fill="#222233"/>
        {/* Body */}
        <ellipse cx="50" cy="65" rx="20" ry="14" fill="#111122"/>
        <ellipse cx="50" cy="65" rx="20" ry="14" fill="url(#bodygrad_night_fury)" opacity="0.5"/>
        {/* Plasma charge glow on throat */}
        <ellipse cx="50" cy="62" rx="10" ry="6" fill="#00DDFF" opacity="0.08" filter={`url(#softglow${id})`}/>
        {/* Ear-fins */}
        <path d="M38 34 L30 24 L40 32" fill="#1a1a2e"/>
        <path d="M62 34 L70 24 L60 32" fill="#1a1a2e"/>
        {/* Neck */}
        <path d="M40 56 Q50 46 60 56" stroke="#111122" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="38" rx="16" ry="14" fill="#151525"/>
        <ellipse cx="50" cy="38" rx="16" ry="14" fill="url(#bodygrad_night_fury)" opacity="0.4"/>
        {/* Head top ridge */}
        <path d="M38 30 Q50 25 62 30" stroke="#0a0a1a" strokeWidth="3" fill="none"/>
        {/* Snout */}
        <path d="M40 45 Q50 52 60 45" fill="#111122"/>
        <ellipse cx="50" cy="47" rx="9" ry="4" fill="#0d0d1e"/>
        {/* Nostrils */}
        <ellipse cx="46" cy="48" rx="1.8" ry="1.2" fill="#050510"/>
        <ellipse cx="54" cy="48" rx="1.8" ry="1.2" fill="#050510"/>
        {/* Eyes — iconic cyan glow */}
        <circle cx="41" cy="35" r="6.5" fill="#050510"/>
        <circle cx="59" cy="35" r="6.5" fill="#050510"/>
        <circle cx="41" cy="35" r="5" fill="#00E5FF" filter={`url(#glow${id})`}/>
        <circle cx="59" cy="35" r="5" fill="#00E5FF" filter={`url(#glow${id})`}/>
        <ellipse cx="41" cy="35" rx="2.5" ry="4" fill="#001a22"/>
        <ellipse cx="59" cy="35" rx="2.5" ry="4" fill="#001a22"/>
        <circle cx="40" cy="33" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="58" cy="33" r="1.5" fill="white" opacity="0.9"/>
        {/* Glow ring */}
        <ellipse cx="50" cy="38" rx="18" ry="16" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.08"/>
        {/* Subtle plasma glow */}
        <ellipse cx="50" cy="35" rx="18" ry="16" fill="#00AAFF" opacity="0.04" filter={`url(#softglow${id})`}/>
      </g>
    ),

    light_fury: (id) => (
      <g>
        {defs(id)}
        {/* Wings — translucent */}
        <path d="M50 60 L8 28 L22 64 Z" fill="#d8d8f0" opacity="0.75"/>
        <path d="M50 60 L92 28 L78 64 Z" fill="#d8d8f0" opacity="0.75"/>
        <path d="M50 60 L8 28" stroke="#b0b0d0" strokeWidth="1.5" opacity="0.5"/>
        <path d="M50 60 L92 28" stroke="#b0b0d0" strokeWidth="1.5" opacity="0.5"/>
        {/* Iridescent shimmer on wings */}
        <path d="M50 60 L8 28 L22 64 Z" fill="#aaeeff" opacity="0.12"/>
        {/* Tail */}
        <path d="M50 75 Q68 82 72 72 Q76 62 66 58" stroke="#c8c8e8" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M66 58 L74 52 L65 60" fill="#d8d8f0"/>
        <path d="M66 58 L70 50 L61 58" fill="#d8d8f0"/>
        {/* Body */}
        <ellipse cx="50" cy="65" rx="20" ry="14" fill="#e0e0f4"/>
        <ellipse cx="50" cy="65" rx="20" ry="14" fill="url(#bodygrad_light_fury)" opacity="0.3"/>
        {/* Pearlescent belly */}
        <ellipse cx="50" cy="68" rx="13" ry="8" fill="white" opacity="0.25"/>
        {/* Ear fins */}
        <path d="M38 34 L31 23 L40 32" fill="#c8c8e8"/>
        <path d="M62 34 L69 23 L60 32" fill="#c8c8e8"/>
        {/* Neck */}
        <path d="M40 56 Q50 46 60 56" stroke="#d8d8f0" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="38" rx="16" ry="14" fill="#e8e8f8"/>
        <ellipse cx="50" cy="38" rx="16" ry="14" fill="url(#bodygrad_light_fury)" opacity="0.3"/>
        {/* Snout */}
        <path d="M40 45 Q50 52 60 45" fill="#d8d8f0"/>
        <ellipse cx="50" cy="47" rx="9" ry="4" fill="#c8c8e8"/>
        {/* Eyes — electric blue */}
        <circle cx="41" cy="35" r="6.5" fill="#d0d0ee"/>
        <circle cx="59" cy="35" r="6.5" fill="#d0d0ee"/>
        <circle cx="41" cy="35" r="5" fill="#44CCFF" filter={`url(#glow${id})`}/>
        <circle cx="59" cy="35" r="5" fill="#44CCFF" filter={`url(#glow${id})`}/>
        <ellipse cx="41" cy="35" rx="2.5" ry="4" fill="#002233"/>
        <ellipse cx="59" cy="35" rx="2.5" ry="4" fill="#002233"/>
        <circle cx="40" cy="33" r="1.5" fill="white" opacity="0.95"/>
        <circle cx="58" cy="33" r="1.5" fill="white" opacity="0.95"/>
        {/* Pearlescent glow */}
        <ellipse cx="50" cy="38" rx="20" ry="18" fill="#ffffff" opacity="0.06" filter={`url(#softglow${id})`}/>
      </g>
    ),

    bewilderbeast: (id) => (
      <g>
        {defs(id)}
        {/* Ice breath aura */}
        <ellipse cx="50" cy="52" rx="36" ry="30" fill="#aaeeff" opacity="0.06" filter={`url(#softglow${id})`}/>
        {/* Massive wings */}
        <path d="M50 58 L2 22 L16 68 Z" fill="#1a2a4a" opacity="0.92"/>
        <path d="M50 58 L98 22 L84 68 Z" fill="#1a2a4a" opacity="0.92"/>
        <path d="M50 58 L2 22" stroke="#0a1a3a" strokeWidth="2" opacity="0.7"/>
        <path d="M50 58 L98 22" stroke="#0a1a3a" strokeWidth="2" opacity="0.7"/>
        {/* Body — massive */}
        <ellipse cx="50" cy="68" rx="28" ry="18" fill="#2a3a5a"/>
        <ellipse cx="50" cy="68" rx="28" ry="18" fill="url(#bodygrad_bewilderbeast)"/>
        {/* Ice armor plates on back */}
        {[0,1,2,3].map(i=>(
          <ellipse key={i} cx={32+i*12} cy={54} rx="7" ry="5" fill="#5aaabb" opacity="0.6"/>
        ))}
        {/* Neck */}
        <path d="M38 52 Q50 40 62 52" stroke="#2a3a5a" strokeWidth="14" fill="none" strokeLinecap="round"/>
        {/* Head — huge */}
        <ellipse cx="50" cy="34" rx="22" ry="18" fill="#2a3a5a"/>
        <ellipse cx="50" cy="34" rx="22" ry="18" fill="url(#bodygrad_bewilderbeast)"/>
        {/* Three crown tusks */}
        <path d="M34 20 L28 7 L38 18" fill="#88CCDD"/>
        <path d="M50 18 L50 4 L55 17" fill="#99DDEE"/>
        <path d="M66 20 L72 7 L62 18" fill="#88CCDD"/>
        {/* Snout */}
        <ellipse cx="50" cy="44" rx="14" ry="7" fill="#253550"/>
        <ellipse cx="43" cy="46" rx="3" ry="2" fill="#0a1a2a"/>
        <ellipse cx="57" cy="46" rx="3" ry="2" fill="#0a1a2a"/>
        {/* Eyes — icy glow */}
        <circle cx="38" cy="30" r="7" fill="#0a1520"/>
        <circle cx="62" cy="30" r="7" fill="#0a1520"/>
        <circle cx="38" cy="30" r="5.5" fill="#88DDFF" filter={`url(#glow${id})`}/>
        <circle cx="62" cy="30" r="5.5" fill="#88DDFF" filter={`url(#glow${id})`}/>
        <circle cx="38" cy="30" r="3" fill="#003344"/>
        <circle cx="62" cy="30" r="3" fill="#003344"/>
        <circle cx="37" cy="28" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="61" cy="28" r="1.5" fill="white" opacity="0.9"/>
        {/* Ice glow */}
        <ellipse cx="50" cy="34" rx="24" ry="20" fill="none" stroke="#88DDFF" strokeWidth="1.5" opacity="0.15"/>
      </g>
    ),

    skrill: (id) => (
      <g>
        {defs(id)}
        {/* Lightning aura */}
        <ellipse cx="50" cy="50" rx="34" ry="28" fill="#6600cc" opacity="0.1" filter={`url(#softglow${id})`}/>
        {/* Jagged wings */}
        <path d="M50 55 L8 22 L15 42 L5 48 L20 62 Z" fill="#3a006a" opacity="0.92"/>
        <path d="M50 55 L92 22 L85 42 L95 48 L80 62 Z" fill="#3a006a" opacity="0.92"/>
        <path d="M50 55 L8 22 L15 42 L5 48 L20 62 Z" fill="#8800ff" opacity="0.1"/>
        {/* Tail with lightning */}
        <path d="M50 73 Q65 82 70 72" stroke="#4a007a" strokeWidth="6" fill="none"/>
        {/* Lightning bolt on tail */}
        <path d="M60 68 L65 62 L62 66 L67 60" stroke="#DDAA00" strokeWidth="1.5" fill="none" opacity="0.8"/>
        {/* Body */}
        <ellipse cx="50" cy="63" rx="19" ry="13" fill="#3a006a"/>
        <ellipse cx="50" cy="63" rx="19" ry="13" fill="url(#bodygrad_skrill)"/>
        {/* Electric charge marks */}
        <path d="M38 58 L36 54 L40 56 L38 52" stroke="#DDAA00" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <path d="M62 58 L64 54 L60 56 L62 52" stroke="#DDAA00" strokeWidth="1.2" fill="none" opacity="0.6"/>
        {/* Neck */}
        <path d="M40 54 Q50 44 60 54" stroke="#3a006a" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="37" rx="15" ry="13" fill="#4a0088"/>
        <ellipse cx="50" cy="37" rx="15" ry="13" fill="url(#bodygrad_skrill)"/>
        {/* Crown spines */}
        <path d="M40 28 L37 18 L43 27" fill="#DDAA00"/>
        <path d="M50 25 L50 14 L54 24" fill="#DDAA00"/>
        <path d="M60 28 L63 18 L57 27" fill="#DDAA00"/>
        {/* Snout */}
        <path d="M40 44 Q50 50 60 44" fill="#3a006a"/>
        <ellipse cx="50" cy="46" rx="8" ry="4" fill="#2a0050"/>
        {/* Eyes — electric yellow */}
        <circle cx="41" cy="33" r="5.5" fill="#1a0030"/>
        <circle cx="59" cy="33" r="5.5" fill="#1a0030"/>
        <circle cx="41" cy="33" r="4" fill="#FFDD00" filter={`url(#glow${id})`}/>
        <circle cx="59" cy="33" r="4" fill="#FFDD00" filter={`url(#glow${id})`}/>
        <circle cx="41" cy="33" r="2" fill="#222200"/>
        <circle cx="59" cy="33" r="2" fill="#222200"/>
        <circle cx="40" cy="32" r="1.2" fill="white" opacity="0.9"/>
        <circle cx="58" cy="32" r="1.2" fill="white" opacity="0.9"/>
        {/* Static sparks */}
        {[0,1,2,3].map(i=>(
          <line key={i} x1={28+i*15} y1={72} x2={31+i*15} y2={68} stroke="#FFDD00" strokeWidth="1.2" opacity="0.5"/>
        ))}
      </g>
    ),

    screaming_death: (id) => (
      <g>
        {defs(id)}
        {/* Red aura */}
        <ellipse cx="50" cy="50" rx="36" ry="30" fill="#cc0000" opacity="0.1" filter={`url(#softglow${id})`}/>
        {/* Huge wings */}
        <path d="M50 55 L4 20 L18 65 Z" fill="#d8d0c0" opacity="0.88"/>
        <path d="M50 55 L96 20 L82 65 Z" fill="#d8d0c0" opacity="0.88"/>
        <path d="M50 55 L4 20" stroke="#a8a098" strokeWidth="2"/>
        {/* Tail */}
        <path d="M50 72 Q68 84 74 74 Q80 64 70 58" stroke="#d0c8b8" strokeWidth="7" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="50" cy="63" rx="22" ry="15" fill="#e0d8c8"/>
        <ellipse cx="50" cy="63" rx="22" ry="15" fill="url(#bodygrad_screaming_death)"/>
        {/* Spines down back */}
        {[0,1,2,3,4,5].map(i=>(
          <path key={i} d={`M${35+i*6} ${56} L${34+i*6} ${48} L${37+i*6} ${55}`} fill="#cc4400" opacity="0.8"/>
        ))}
        {/* Neck */}
        <path d="M38 52 Q50 40 62 52" stroke="#d8d0c0" strokeWidth="12" fill="none" strokeLinecap="round"/>
        {/* Head — huge */}
        <ellipse cx="50" cy="33" rx="20" ry="17" fill="#e8e0d0"/>
        <ellipse cx="50" cy="33" rx="20" ry="17" fill="url(#bodygrad_screaming_death)"/>
        {/* Head spines — many */}
        {[0,1,2,3,4].map(i=>(
          <path key={i} d={`M${34+i*8} ${22} L${33+i*8} ${13} L${37+i*8} ${21}`} fill="#cc4400" opacity="0.9"/>
        ))}
        {/* Huge mouth */}
        <path d="M33 42 Q50 52 67 42" fill="#cc0000" opacity="0.9"/>
        <path d="M36 42 Q50 48 64 42" fill="#880000"/>
        {/* Teeth */}
        {[0,1,2,3,4].map(i=>(
          <polygon key={i} points={`${37+i*7},42 ${40+i*7},42 ${38.5+i*7},46`} fill="white" opacity="0.9"/>
        ))}
        {/* Eyes — red glowing */}
        <circle cx="38" cy="28" r="7" fill="#1a0000"/>
        <circle cx="62" cy="28" r="7" fill="#1a0000"/>
        <circle cx="38" cy="28" r="5.5" fill="#FF0000" filter={`url(#glow${id})`}/>
        <circle cx="62" cy="28" r="5.5" fill="#FF0000" filter={`url(#glow${id})`}/>
        <circle cx="38" cy="28" r="3" fill="#330000"/>
        <circle cx="62" cy="28" r="3" fill="#330000"/>
        <circle cx="37" cy="26" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="61" cy="26" r="1.5" fill="white" opacity="0.7"/>
      </g>
    ),

    deathgripper: (id) => (
      <g>
        {defs(id)}
        {/* Venom glow */}
        <ellipse cx="50" cy="55" rx="30" ry="24" fill="#cc2200" opacity="0.1" filter={`url(#softglow${id})`}/>
        {/* Clawed legs */}
        {[0,1,2].map(i=>(
          <g key={i}>
            <line x1={28} y1={60+i*4} x2={12} y2={58+i*6} stroke="#1a0800" strokeWidth="3"/>
            <path d={`M12 ${58+i*6} L8 ${55+i*6} M12 ${58+i*6} L10 ${62+i*6}`} stroke="#1a0800" strokeWidth="2" fill="none"/>
            <line x1={72} y1={60+i*4} x2={88} y2={58+i*6} stroke="#1a0800" strokeWidth="3"/>
            <path d={`M88 ${58+i*6} L92 ${55+i*6} M88 ${58+i*6} L90 ${62+i*6}`} stroke="#1a0800" strokeWidth="2" fill="none"/>
          </g>
        ))}
        {/* Scorpion tail */}
        <path d="M50 74 Q70 80 78 70 Q85 58 76 52 Q72 48 68 54" stroke="#2a0800" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M68 54 L74 48 L66 56" fill="#cc2200"/>
        {/* Body */}
        <ellipse cx="50" cy="62" rx="20" ry="14" fill="#1a0800"/>
        <ellipse cx="50" cy="62" rx="20" ry="14" fill="url(#bodygrad_deathgripper)"/>
        {/* Armor plates */}
        {[0,1,2].map(i=>(
          <ellipse key={i} cx={40+i*10} cy={56+i*2} rx="7" ry="4" fill="#2a1000" opacity="0.8"/>
        ))}
        {/* Neck */}
        <path d="M40 52 Q50 42 60 52" stroke="#1a0800" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="36" rx="16" ry="13" fill="#2a1000"/>
        <ellipse cx="50" cy="36" rx="16" ry="13" fill="url(#bodygrad_deathgripper)"/>
        {/* Mandibles */}
        <path d="M38 44 L30 50 L36 46" stroke="#1a0800" strokeWidth="3" fill="none"/>
        <path d="M62 44 L70 50 L64 46" stroke="#1a0800" strokeWidth="3" fill="none"/>
        {/* Snout */}
        <ellipse cx="50" cy="44" rx="9" ry="5" fill="#1a0800"/>
        {/* Eyes — fierce red */}
        <circle cx="40" cy="32" r="6" fill="#0a0000"/>
        <circle cx="60" cy="32" r="6" fill="#0a0000"/>
        <circle cx="40" cy="32" r="4.5" fill="#FF2200" filter={`url(#glow${id})`}/>
        <circle cx="60" cy="32" r="4.5" fill="#FF2200" filter={`url(#glow${id})`}/>
        <ellipse cx="40" cy="32" rx="2" ry="3.5" fill="#110000"/>
        <ellipse cx="60" cy="32" rx="2" ry="3.5" fill="#110000"/>
        <circle cx="39" cy="30" r="1.2" fill="white" opacity="0.7"/>
        <circle cx="59" cy="30" r="1.2" fill="white" opacity="0.7"/>
      </g>
    ),

    flightmare: (id) => (
      <g>
        {defs(id)}
        {/* Bioluminescent aura */}
        <ellipse cx="50" cy="52" rx="38" ry="32" fill="#00ccff" opacity="0.12" filter={`url(#softglow${id})`}/>
        {/* Translucent wings */}
        <path d="M50 55 L8 24 L20 62 Z" fill="#00aacc" opacity="0.55"/>
        <path d="M50 55 L92 24 L80 62 Z" fill="#00aacc" opacity="0.55"/>
        {/* Wing bio-glow veins */}
        <path d="M50 55 L8 24" stroke="#00eeff" strokeWidth="1.5" opacity="0.6"/>
        <path d="M50 55 L24 52" stroke="#00eeff" strokeWidth="1" opacity="0.4"/>
        <path d="M50 55 L92 24" stroke="#00eeff" strokeWidth="1.5" opacity="0.6"/>
        {/* Tail */}
        <path d="M50 73 Q66 82 70 72 Q74 62 64 58" stroke="#00aacc" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8"/>
        {/* Bio-dots on tail */}
        {[0,1,2,3].map(i=><circle key={i} cx={52+i*5} cy={71+i*2} r="2" fill="#00FFFF" opacity="0.7"/>)}
        {/* Body */}
        <ellipse cx="50" cy="64" rx="18" ry="13" fill="#008aaa" opacity="0.85"/>
        <ellipse cx="50" cy="64" rx="18" ry="13" fill="url(#bodygrad_flightmare)"/>
        {/* Bioluminescent spots */}
        {[0,1,2,3,4,5].map(i=>(
          <circle key={i} cx={35+i*7} cy={62+Math.sin(i)*4} r="2.5" fill="#00FFFF" opacity="0.55" filter={`url(#glow${id})`}/>
        ))}
        {/* Neck */}
        <path d="M40 54 Q50 44 60 54" stroke="#008aaa" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.9"/>
        {/* Head */}
        <ellipse cx="50" cy="37" rx="14" ry="13" fill="#00aabb" opacity="0.9"/>
        <ellipse cx="50" cy="37" rx="14" ry="13" fill="url(#bodygrad_flightmare)"/>
        {/* Bio-glow dots on head */}
        {[0,1,2].map(i=><circle key={i} cx={43+i*7} cy={32} r="2" fill="#00FFFF" opacity="0.6" filter={`url(#glow${id})`}/>)}
        {/* Snout */}
        <ellipse cx="50" cy="45" rx="8" ry="4" fill="#007a8a" opacity="0.9"/>
        {/* Eyes — white glowing */}
        <circle cx="42" cy="33" r="6" fill="#003344"/>
        <circle cx="58" cy="33" r="6" fill="#003344"/>
        <circle cx="42" cy="33" r="4.5" fill="#FFFFFF" filter={`url(#glow${id})`}/>
        <circle cx="58" cy="33" r="4.5" fill="#FFFFFF" filter={`url(#glow${id})`}/>
        <circle cx="42" cy="33" r="2.5" fill="#00aacc"/>
        <circle cx="58" cy="33" r="2.5" fill="#00aacc"/>
        <circle cx="41" cy="32" r="1.2" fill="white" opacity="0.9"/>
        <circle cx="57" cy="32" r="1.2" fill="white" opacity="0.9"/>
        {/* Mist cloud */}
        <ellipse cx="50" cy="37" rx="16" ry="14" fill="none" stroke="#00FFFF" strokeWidth="1.5" opacity="0.15"/>
      </g>
    ),

    stormcutter: (id) => (
      <g>
        {defs(id)}
        {/* 4-wing silhouette */}
        <path d="M50 56 L6 20 L18 60 Z" fill="#1040aa" opacity="0.9"/>
        <path d="M50 56 L94 20 L82 60 Z" fill="#1040aa" opacity="0.9"/>
        <path d="M50 64 L10 52 L22 72 Z" fill="#0a3090" opacity="0.8"/>
        <path d="M50 64 L90 52 L78 72 Z" fill="#0a3090" opacity="0.8"/>
        {/* Wing veins */}
        <path d="M50 56 L6 20" stroke="#0830a0" strokeWidth="2" opacity="0.5"/>
        <path d="M50 56 L94 20" stroke="#0830a0" strokeWidth="2" opacity="0.5"/>
        {/* Tail */}
        <path d="M50 74 Q68 84 74 74 Q80 62 70 56" stroke="#1550cc" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="50" cy="64" rx="20" ry="14" fill="#1550cc"/>
        <ellipse cx="50" cy="64" rx="20" ry="14" fill="url(#bodygrad_stormcutter)"/>
        {/* Crown — 4-pointed */}
        <path d="M42 28 L38 16 L45 26" fill="#F5B800"/>
        <path d="M50 25 L50 12 L55 24" fill="#F5B800"/>
        <path d="M58 28 L62 16 L55 26" fill="#F5B800"/>
        {/* Neck */}
        <path d="M40 54 Q50 42 60 54" stroke="#1550cc" strokeWidth="12" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="36" rx="16" ry="14" fill="#1e60dd"/>
        <ellipse cx="50" cy="36" rx="16" ry="14" fill="url(#bodygrad_stormcutter)"/>
        {/* Snout */}
        <path d="M40 44 Q50 50 60 44" fill="#1040aa"/>
        <ellipse cx="50" cy="46" rx="9" ry="4" fill="#0a3090"/>
        {/* Eyes — golden */}
        <circle cx="41" cy="32" r="5.5" fill="#0a2060"/>
        <circle cx="59" cy="32" r="5.5" fill="#0a2060"/>
        <circle cx="41" cy="32" r="4" fill="#F5B800" filter={`url(#glow${id})`}/>
        <circle cx="59" cy="32" r="4" fill="#F5B800" filter={`url(#glow${id})`}/>
        <circle cx="41" cy="32" r="2" fill="#221000"/>
        <circle cx="59" cy="32" r="2" fill="#221000"/>
        <circle cx="40" cy="31" r="1.2" fill="white" opacity="0.9"/>
        <circle cx="58" cy="31" r="1.2" fill="white" opacity="0.9"/>
      </g>
    ),

    razorwhip: (id) => (
      <g>
        {defs(id)}
        {/* Metallic sheen aura */}
        <ellipse cx="50" cy="52" rx="32" ry="26" fill="#c0c0c0" opacity="0.08" filter={`url(#softglow${id})`}/>
        {/* Wings — narrow, blade-like */}
        <path d="M50 54 L12 26 L24 60 Z" fill="#909090" opacity="0.9"/>
        <path d="M50 54 L88 26 L76 60 Z" fill="#909090" opacity="0.9"/>
        {/* Blade-tip highlights */}
        <path d="M12 26 L18 30" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <path d="M88 26 L82 30" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        {/* Spiral tail */}
        <path d="M50 72 Q62 80 68 72 Q74 62 68 56 Q64 50 60 54" stroke="#a0a0a0" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* Blade spines on tail */}
        {[0,1,2].map(i=>(
          <path key={i} d={`M${56+i*4} ${66-i*4} L${60+i*4} ${60-i*4}`} stroke="#cccccc" strokeWidth="2" strokeLinecap="round"/>
        ))}
        {/* Body */}
        <ellipse cx="50" cy="62" rx="16" ry="12" fill="#b0b0b0"/>
        <ellipse cx="50" cy="62" rx="16" ry="12" fill="url(#bodygrad_razorwhip)"/>
        {/* Metallic scale highlights */}
        {[0,1,2].map(r=>[0,1,2].map(c=>(
          <ellipse key={r*3+c} cx={40+c*10} cy={57+r*5} rx="4" ry="2.5" fill="white" opacity="0.12"/>
        )))}
        {/* Neck */}
        <path d="M42 52 Q50 42 58 52" stroke="#b0b0b0" strokeWidth="9" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="37" rx="13" ry="12" fill="#c0c0c0"/>
        <ellipse cx="50" cy="37" rx="13" ry="12" fill="url(#bodygrad_razorwhip)"/>
        {/* Crown blade */}
        <path d="M44 28 L42 18 L48 27" fill="#888888"/>
        <path d="M50 26 L50 15 L54 25" fill="#999999"/>
        <path d="M56 28 L58 18 L52 27" fill="#888888"/>
        {/* Snout */}
        <ellipse cx="50" cy="44" rx="8" ry="4" fill="#a0a0a0"/>
        {/* Eyes — silver */}
        <circle cx="42" cy="33" r="5" fill="#606060"/>
        <circle cx="58" cy="33" r="5" fill="#606060"/>
        <circle cx="42" cy="33" r="3.5" fill="#E0E0FF" filter={`url(#glow${id})`}/>
        <circle cx="58" cy="33" r="3.5" fill="#E0E0FF" filter={`url(#glow${id})`}/>
        <circle cx="42" cy="33" r="1.8" fill="#222244"/>
        <circle cx="58" cy="33" r="1.8" fill="#222244"/>
        <circle cx="41" cy="32" r="1" fill="white" opacity="0.9"/>
        <circle cx="57" cy="32" r="1" fill="white" opacity="0.9"/>
      </g>
    ),

    typhoomerang: (id) => (
      <g>
        {defs(id)}
        {/* Fire ring aura */}
        <ellipse cx="50" cy="52" rx="36" ry="30" fill="none" stroke="#FF6600" strokeWidth="2" opacity="0.18"/>
        <ellipse cx="50" cy="52" rx="30" ry="24" fill="none" stroke="#FF8800" strokeWidth="1.5" opacity="0.12"/>
        {/* Ring-fire wings */}
        <path d="M50 56 L6 22 L16 60 Z" fill="#bb3300" opacity="0.9"/>
        <path d="M50 56 L94 22 L84 60 Z" fill="#bb3300" opacity="0.9"/>
        {/* Fire edge on wings */}
        <path d="M6 22 L16 60" stroke="#FF6600" strokeWidth="2" opacity="0.5"/>
        <path d="M94 22 L84 60" stroke="#FF6600" strokeWidth="2" opacity="0.5"/>
        {/* Tail — ring-tipped */}
        <path d="M50 73 Q66 83 72 72 Q78 60 66 56" stroke="#cc4400" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <circle cx="66" cy="56" r="5" fill="none" stroke="#FF6600" strokeWidth="2" opacity="0.7"/>
        {/* Body */}
        <ellipse cx="50" cy="63" rx="20" ry="14" fill="#cc4400"/>
        <ellipse cx="50" cy="63" rx="20" ry="14" fill="url(#bodygrad_typhoomerang)"/>
        {/* Orange belly */}
        <ellipse cx="50" cy="67" rx="13" ry="7" fill="#FF6600" opacity="0.2"/>
        {/* Neck */}
        <path d="M40 52 Q50 42 60 52" stroke="#cc4400" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="36" rx="15" ry="13" fill="#dd5500"/>
        <ellipse cx="50" cy="36" rx="15" ry="13" fill="url(#bodygrad_typhoomerang)"/>
        {/* Flame crown */}
        <path d="M41 26 L38 16 L44 25" fill="#FF8800"/>
        <path d="M50 23 L50 12 L55 22" fill="#FF9900"/>
        <path d="M59 26 L62 16 L56 25" fill="#FF8800"/>
        {/* Snout */}
        <path d="M40 44 Q50 50 60 44" fill="#aa3300"/>
        {/* Eyes — fiery orange */}
        <circle cx="41" cy="32" r="5.5" fill="#220a00"/>
        <circle cx="59" cy="32" r="5.5" fill="#220a00"/>
        <circle cx="41" cy="32" r="4" fill="#FF8800" filter={`url(#glow${id})`}/>
        <circle cx="59" cy="32" r="4" fill="#FF8800" filter={`url(#glow${id})`}/>
        <ellipse cx="41" cy="32" rx="2" ry="3" fill="#1a0500"/>
        <ellipse cx="59" cy="32" rx="2" ry="3" fill="#1a0500"/>
        <circle cx="40" cy="31" r="1.2" fill="white" opacity="0.8"/>
        <circle cx="58" cy="31" r="1.2" fill="white" opacity="0.8"/>
      </g>
    ),

    singetail: (id) => (
      <g>
        {defs(id)}
        {/* Fire aura */}
        <ellipse cx="50" cy="55" rx="30" ry="26" fill="#cc5500" opacity="0.1" filter={`url(#softglow${id})`}/>
        {/* Wings */}
        <path d="M50 56 L10 26 L22 62 Z" fill="#7a3200" opacity="0.9"/>
        <path d="M50 56 L90 26 L78 62 Z" fill="#7a3200" opacity="0.9"/>
        {/* Singetail's signature flame-tipped tail */}
        <path d="M50 73 Q66 85 74 76 Q82 66 72 58" stroke="#8b4500" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* Flame ball at tail tip */}
        <circle cx="72" cy="58" r="7" fill="#FF4400" opacity="0.8" filter={`url(#glow${id})`}/>
        <circle cx="72" cy="58" r="4" fill="#FFAA00" opacity="0.9"/>
        {/* Body */}
        <ellipse cx="50" cy="63" rx="19" ry="13" fill="#993300"/>
        <ellipse cx="50" cy="63" rx="19" ry="13" fill="url(#bodygrad_singetail)"/>
        {/* Neck */}
        <path d="M40 52 Q50 42 60 52" stroke="#993300" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="36" rx="14" ry="13" fill="#aa4400"/>
        <ellipse cx="50" cy="36" rx="14" ry="13" fill="url(#bodygrad_singetail)"/>
        {/* Horns */}
        <path d="M40 26 L36 16 L43 25" fill="#cc6600"/>
        <path d="M60 26 L64 16 L57 25" fill="#cc6600"/>
        {/* Snout */}
        <ellipse cx="50" cy="44" rx="9" ry="5" fill="#882a00"/>
        {/* Eyes */}
        <circle cx="41" cy="32" r="5.5" fill="#1a0800"/>
        <circle cx="59" cy="32" r="5.5" fill="#1a0800"/>
        <circle cx="41" cy="32" r="4" fill="#FF8800" filter={`url(#glow${id})`}/>
        <circle cx="59" cy="32" r="4" fill="#FF8800" filter={`url(#glow${id})`}/>
        <ellipse cx="41" cy="32" rx="2" ry="3" fill="#1a0500"/>
        <ellipse cx="59" cy="32" rx="2" ry="3" fill="#1a0500"/>
        <circle cx="40" cy="31" r="1.2" fill="white" opacity="0.8"/>
        <circle cx="58" cy="31" r="1.2" fill="white" opacity="0.8"/>
      </g>
    ),

    dramillion: (id) => (
      <g>
        {defs(id)}
        {/* Multi-fire aura */}
        {["#ff0000","#ff8800","#ffee00","#00ff88"].map((c,i)=>(
          <ellipse key={i} cx={50} cy={52} rx={36-i*4} ry={30-i*3} fill="none" stroke={c} strokeWidth="1" opacity="0.1"/>
        ))}
        {/* Wings */}
        <path d="M50 56 L10 24 L22 62 Z" fill="#aa0000" opacity="0.9"/>
        <path d="M50 56 L90 24 L78 62 Z" fill="#aa0000" opacity="0.9"/>
        {/* Tail */}
        <path d="M50 73 Q64 83 70 72 Q76 60 66 56" stroke="#cc0000" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="50" cy="63" rx="19" ry="13" fill="#cc0000"/>
        <ellipse cx="50" cy="63" rx="19" ry="13" fill="url(#bodygrad_dramillion)"/>
        {/* Multi-fire breath dots — key trait */}
        {["#ff0000","#ff8800","#ffee00","#00ff88","#0088ff","#aa00ff"].map((c,i)=>(
          <circle key={i} cx={33+i*7} cy={72} r="3" fill={c} opacity="0.8" filter={`url(#glow${id})`}/>
        ))}
        {/* Neck */}
        <path d="M40 52 Q50 42 60 52" stroke="#cc0000" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="36" rx="14" ry="13" fill="#dd1111"/>
        <ellipse cx="50" cy="36" rx="14" ry="13" fill="url(#bodygrad_dramillion)"/>
        {/* Frills */}
        <path d="M36 28 L28 20 L38 26" fill="#ff4400"/>
        <path d="M64 28 L72 20 L62 26" fill="#ff4400"/>
        {/* Eyes */}
        <circle cx="41" cy="32" r="5.5" fill="#1a0000"/>
        <circle cx="59" cy="32" r="5.5" fill="#1a0000"/>
        <circle cx="41" cy="32" r="4" fill="#FF4400" filter={`url(#glow${id})`}/>
        <circle cx="59" cy="32" r="4" fill="#FF4400" filter={`url(#glow${id})`}/>
        <ellipse cx="41" cy="32" rx="2" ry="3" fill="#111"/>
        <ellipse cx="59" cy="32" rx="2" ry="3" fill="#111"/>
        <circle cx="40" cy="31" r="1.2" fill="white" opacity="0.9"/>
        <circle cx="58" cy="31" r="1.2" fill="white" opacity="0.9"/>
      </g>
    ),

    eruptodon: (id) => (
      <g>
        {defs(id)}
        {/* Lava glow */}
        <ellipse cx="50" cy="58" rx="32" ry="26" fill="#ff4400" opacity="0.12" filter={`url(#softglow${id})`}/>
        {/* Stubby wings */}
        <ellipse cx="22" cy="60" rx="14" ry="8" fill="#1a0800" transform="rotate(-20 22 60)" opacity="0.9"/>
        <ellipse cx="78" cy="60" rx="14" ry="8" fill="#1a0800" transform="rotate(20 78 60)" opacity="0.9"/>
        {/* Body — massive, boulder-like */}
        <ellipse cx="50" cy="66" rx="28" ry="20" fill="#1a0800"/>
        <ellipse cx="50" cy="66" rx="28" ry="20" fill="url(#bodygrad_eruptodon)"/>
        {/* Lava cracks */}
        <path d="M36 58 L40 52 L44 58 L48 50 L52 58" stroke="#FF4400" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M55 60 L60 54 L64 62" stroke="#FF6600" strokeWidth="1.5" fill="none" opacity="0.5"/>
        {/* Lava belly */}
        <ellipse cx="50" cy="70" rx="18" ry="10" fill="#FF4400" opacity="0.2"/>
        {/* Neck */}
        <path d="M38 52 Q50 38 62 52" stroke="#2a1000" strokeWidth="12" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="50" cy="36" rx="18" ry="15" fill="#221000"/>
        <ellipse cx="50" cy="36" rx="18" ry="15" fill="url(#bodygrad_eruptodon)"/>
        {/* Volcanic dorsal crest */}
        {[0,1,2,3].map(i=>(
          <path key={i} d={`M${38+i*8} ${26} L${37+i*8} ${16} L${41+i*8} ${25}`} fill="#cc2200" opacity="0.85"/>
        ))}
        {/* Snout */}
        <ellipse cx="50" cy="46" rx="12" ry="6" fill="#1a0a00"/>
        <ellipse cx="44" cy="48" rx="3" ry="2" fill="#FF4400" opacity="0.5"/>
        <ellipse cx="56" cy="48" rx="3" ry="2" fill="#FF4400" opacity="0.5"/>
        {/* Eyes — fiery */}
        <circle cx="40" cy="32" r="6" fill="#0a0500"/>
        <circle cx="60" cy="32" r="6" fill="#0a0500"/>
        <circle cx="40" cy="32" r="4.5" fill="#FF5500" filter={`url(#glow${id})`}/>
        <circle cx="60" cy="32" r="4.5" fill="#FF5500" filter={`url(#glow${id})`}/>
        <circle cx="40" cy="32" r="2.5" fill="#1a0000"/>
        <circle cx="60" cy="32" r="2.5" fill="#1a0000"/>
        <circle cx="39" cy="30" r="1.2" fill="white" opacity="0.7"/>
        <circle cx="59" cy="30" r="1.2" fill="white" opacity="0.7"/>
      </g>
    ),

    shellfire: (id) => (
      <g>
        {defs(id)}
        {/* Ocean depth aura */}
        <ellipse cx="50" cy="56" rx="38" ry="30" fill="#004488" opacity="0.15" filter={`url(#softglow${id})`}/>
        {/* Massive shell/back */}
        <ellipse cx="50" cy="62" rx="34" ry="22" fill="#1a3a5a"/>
        {/* Shell plates */}
        {[0,1,2,3].map(i=>(
          <ellipse key={i} cx={28+i*15} cy={56} rx="10" ry="7" fill="#2a5a7a" opacity="0.8"/>
        ))}
        {/* Shell highlight */}
        <ellipse cx="50" cy="56" rx="34" ry="20" fill="url(#bodygrad_shellfire)" opacity="0.3"/>
        {/* Small head relative to body */}
        <path d="M40 48 Q50 36 60 48" stroke="#2a4a6a" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <ellipse cx="50" cy="34" rx="16" ry="14" fill="#2a4a6a"/>
        <ellipse cx="50" cy="34" rx="16" ry="14" fill="url(#bodygrad_shellfire)"/>
        {/* Ridge fins */}
        <path d="M36 24 L32 14 L40 23" fill="#4488bb"/>
        <path d="M50 21 L50 10 L55 20" fill="#4488bb"/>
        <path d="M64 24 L68 14 L60 23" fill="#4488bb"/>
        {/* Snout */}
        <ellipse cx="50" cy="43" rx="11" ry="5" fill="#1a3a5a"/>
        {/* Eyes — deep blue */}
        <circle cx="40" cy="30" r="6" fill="#0a1a2a"/>
        <circle cx="60" cy="30" r="6" fill="#0a1a2a"/>
        <circle cx="40" cy="30" r="4.5" fill="#4499DD" filter={`url(#glow${id})`}/>
        <circle cx="60" cy="30" r="4.5" fill="#4499DD" filter={`url(#glow${id})`}/>
        <circle cx="40" cy="30" r="2.5" fill="#001133"/>
        <circle cx="60" cy="30" r="2.5" fill="#001133"/>
        <circle cx="39" cy="28" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="59" cy="28" r="1.5" fill="white" opacity="0.9"/>
        {/* Water splash */}
        <ellipse cx="50" cy="78" rx="28" ry="5" fill="#4499DD" opacity="0.15"/>
      </g>
    ),

  };

  // Generic fallback for unlisted dragons
  const fallback = (id) => (
    <g>
      {defs(id)}
      <ellipse cx="50" cy="60" rx="28" ry="20" fill={rc} opacity="0.25"/>
      {/* Generic wings */}
      <path d={`M50 58 L12 28 L22 64 Z`} fill={rc} opacity="0.55"/>
      <path d={`M50 58 L88 28 L78 64 Z`} fill={rc} opacity="0.55"/>
      {/* Body */}
      <ellipse cx="50" cy="63" rx="18" ry="13" fill={rc} opacity="0.8"/>
      {/* Head */}
      <ellipse cx="50" cy="38" rx="14" ry="12" fill={rc} opacity="0.9"/>
      <ellipse cx="50" cy="38" rx="14" ry="12" fill="url(#bodygrad_fb)"/>
      {/* Eyes */}
      <circle cx="43" cy="35" r="4" fill="rgba(0,0,0,0.6)"/>
      <circle cx="57" cy="35" r="4" fill="rgba(0,0,0,0.6)"/>
      <circle cx="43" cy="35" r="2.5" fill={rc} filter={`url(#glow${id})`}/>
      <circle cx="57" cy="35" r="2.5" fill={rc} filter={`url(#glow${id})`}/>
      <circle cx="42" cy="34" r="1" fill="white" opacity="0.8"/>
      <circle cx="56" cy="34" r="1" fill="white" opacity="0.8"/>
    </g>
  );

  const key = dragonId?.replace(/_egg$/, "").replace(/_egg$/, "");
  const renderFn = portraits[key] || portraits[dragonId] || fallback;
  const id = (dragonId || "fb").replace(/[^a-zA-Z0-9]/g, "_");

  // Prefer original raster art when present in src/assets/dragons/;
  // otherwise fall back to the built-in SVG portrait below.
  const rasterSrc = DRAGON_IMAGES[dragonId] || DRAGON_IMAGES[key];
  if (rasterSrc) {
    return (
      <img
        src={rasterSrc}
        alt=""
        width={s}
        height={s}
        loading="lazy"
        style={{ display: "block", width: s, height: s, objectFit: "contain" }}
      />
    );
  }

  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: "block" }}>
      {renderFn(id)}
      {rarity === "Titanwing" && (
        <g>
          {[0,1,2,3,4,5,6,7].map(i => {
            const a = (i / 8) * Math.PI * 2;
            const r2 = 44 + Math.sin(i*2.5)*3;
            return (
              <g key={i}>
                <circle cx={50+Math.cos(a)*r2} cy={52+Math.sin(a)*r2*0.85} r="1.8" fill="#f0f0ff" opacity="0.7"/>
                <circle cx={50+Math.cos(a)*r2} cy={52+Math.sin(a)*r2*0.85} r="1.8" fill="#f0f0ff" filter={`url(#glow${id})`} opacity="0.4"/>
              </g>
            );
          })}
          <ellipse cx="50" cy="52" rx="46" ry="42" fill="none" stroke="#f0f0ff" strokeWidth="0.8" opacity="0.2"/>
        </g>
      )}
    </svg>
  );
}

// ============================================================
// HEAL PARTICLES OVERLAY
// ============================================================
function HealParticles({ particles }) {
  if (!particles.length) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      <style>{`
        @keyframes healFloat {
          0%   { opacity: 1; transform: translateY(0px) scale(1); }
          70%  { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-60px) scale(1.4); }
        }
      `}</style>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          color: "#4ade80",
          fontSize: "22px",
          fontWeight: "900",
          fontFamily: "'Cinzel', serif",
          animation: "healFloat 1.3s ease-out forwards",
          textShadow: "0 0 8px #4ade80, 0 0 16px #22c55e",
          userSelect: "none",
        }}>+</div>
      ))}
    </div>
  );
}

// ============================================================
// RENAME INLINE
// ============================================================
function RenameInline({ dragon, onRename }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(dragon.nickname);
  if (!editing) return (
    <button className="btn-sm" onClick={() => { setVal(dragon.nickname); setEditing(true); }}>✏️ Rename</button>
  );
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      <input className="httyd-in" value={val} onChange={e => setVal(e.target.value)} style={{ width: "120px" }} onKeyDown={e => { if (e.key === "Enter") { onRename(val); setEditing(false); } }} />
      <button className="btn-sm success" onClick={() => { onRename(val); setEditing(false); }}>✓</button>
      <button className="btn-sm" onClick={() => setEditing(false)}>✕</button>
    </div>
  );
}
