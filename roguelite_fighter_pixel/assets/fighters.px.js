// Roguelite Fighter Character Sprites DSL for claude-pxl
use("sweetie16")

pal({
  k: "#0d0e15", // Deep outline black
  w: "#ffffff", // Pure white
  s: "#e8c170", // Skin tone / warm gold
  S: "#c29342", // Skin shade
  c: "#00f0ff", // Hustler Cyan
  C: "#008da5", // Dark Cyan
  r: "#ff2a55", // Crimson Oni Red
  R: "#990f30", // Dark Crimson
  y: "#ffd166", // Imperial Gold
  Y: "#b58728", // Dark Gold
  p: "#a855f7", // Void Purple
  P: "#6b21a8", // Dark Purple
  g: "#06d6a0", // Emerald Green
  G: "#048866", // Dark Green
  t: "#0ea5e9", // Sky Teal
  T: "#0369a1", // Dark Teal
  m: "#64748b", // Metal Silver
  M: "#334155", // Dark Metal
  d: "#1e1e2e"  // Nether Dark
})

ramps("kMCm", "kCcw", "kRr", "kYyw", "kPpw", "kGg", "kTTt", "kSsw")

// 1. HUSTLER (Player: Martial Artist with Cyan Headband and Robe)
sprite("hustler", { mx: true, outline: "k" }, `
  ...kk
  ..kcck
  .kcwww
  .kcsss
  .kssss
  ..kSSS
  .kcccc
  kccwcc
  kcccccc
  .kCCCC
  .kccCc
  .kmmMm
  .kMMMM
  .kMMMM
  .kMm..
  .kMM..`)

// 2. IRON SHOGUN (Floor 1 Boss: Heavy Kabuto Samurai)
sprite("iron_shogun", { mx: true, outline: "k" }, `
  .kyyy
  ..kyy
  .kmmmm
  kmmmym
  kmmmmw
  kmmmmm
  kMymYM
  kMMMMM
  kmMMMm
  kmmMMm
  kMMMMM
  kmmMmm
  kMMMMM
  kMMMMM
  .kMM..
  .kMM..`)

// 3. CRIMSON ONI (Floor 1 Boss: Berserker Horned Demon)
sprite("crimson_oni", { mx: true, outline: "k" }, `
  .ky...
  .kyy..
  krrrrk
  krryrr
  krrrww
  krwwww
  krrrrr
  kRrrrR
  krrrrr
  kRRRRR
  krRrRr
  kRmmMm
  kMMMMM
  kMMMMM
  .kRR..
  .kRR..`)

// 4. SHADOW KUNOICHI (Floor 1 Boss: Masked Shadow Ninja)
sprite("shadow_kunoichi", { mx: true, outline: "k" }, `
  ..kpp
  .kpppk
  .kpwww
  .kpppp
  .ksspp
  .kpppk
  .kpppp
  kppwpp
  kppppk
  .kPPPP
  .kpPpp
  .kPPPP
  .kpppp
  .kPPPP
  .kpP..
  .kPP..`)

// 5. VOID PHANTOM LORD (Floor 2 Boss: Hooded Spatial Entity)
sprite("void_phantom_lord", { mx: true, outline: "k" }, `
  ..kPP
  .kPppk
  kppppp
  kpwwpp
  kddddd
  kppppp
  kpPppP
  kppppp
  kPPPPk
  .kpppp
  .kPPPP
  .kpppp
  .kPPPP
  .kdddd
  .kPP..
  .kPP..`)

// 6. ABYSSAL LEVIATHAN (Floor 2 Boss: Deep Sea Armored Sovereign)
sprite("abyssal_leviathan", { mx: true, outline: "k" }, `
  ..kTT
  .kTTtt
  .ktttt
  kttwtt
  kttttt
  kTTTTT
  kttttT
  kttwtt
  kTTTTT
  .ktttt
  .kTTTT
  .ktttt
  .kTTTT
  .kTTTT
  .kTT..
  .kTT..`)

// 7. SOUL REAPER (Floor 2 Boss: Grim Reaper with Scythe Mask)
sprite("soul_reaper", { mx: true, outline: "k" }, `
  ..kdd
  .kdddk
  kddddd
  kdwkwd
  kdwwwd
  kddddd
  kdPddP
  kddddd
  kddddd
  .kPPdd
  .kdddd
  .kPPPP
  .kdddd
  .kdddd
  .kdd..
  .kdd..`)

// 8. CELESTIAL EMPEROR (Floor 3 Final Boss: Golden Sun Sovereign)
sprite("celestial_emperor", { mx: true, outline: "k" }, `
  .kywy
  .kyyy
  kyyyyy
  kywwyy
  kyyyyy
  kYYYyY
  kyyyyy
  kywwyy
  kYYYYY
  .kyyyy
  .kYYYY
  .kMMMM
  .kyyyy
  .kYYYY
  .kYY..
  .kYY..`)

// 9. SERAPH ARCHON (Floor 3 Final Boss: Six-Winged Radiant Angel)
sprite("seraph_archon", { mx: true, outline: "k" }, `
  k.ky.
  kwkyy
  kwwyyy
  kwwwwy
  kwwyyy
  kYYYYk
  kwwyyw
  kwwyyw
  kYYYYY
  .kwwww
  .kYYYY
  .kwwww
  .kYYYY
  .kYYYY
  .kYY..
  .kYY..`)

// 10. CHRONOS TITAN (Floor 3 Final Boss: Prime Time Keeper)
sprite("chronos_titan", { mx: true, outline: "k" }, `
  ..kyy
  .kMYYm
  kmMYYm
  kmwwYm
  kmYYYY
  kMMMMM
  kmYYYm
  kmwwYm
  kMMMMM
  .kYYYY
  .kMMMM
  .kYYYY
  .kMMMM
  .kMMMM
  .kMM..
  .kMM..`)

// Weapon / Combat Badges
sprite("badge_sword", { mx: "c", outline: "k" }, `
  ..w..
  .www.
  .wmw.
  .wmw.
  .wmw.
  .wmw.
  .yyy.
  ..y..
  ..k..`)

sprite("badge_shield", { mx: true, outline: "k" }, `
  .yyyy
  kyyyy
  kycyy
  kyccy
  kyyyy
  kyyyy
  .kyyy
  ..kyy
  ...ky`)

sheet("all_fighters", ["hustler", "iron_shogun", "crimson_oni", "shadow_kunoichi", "void_phantom_lord", "abyssal_leviathan", "soul_reaper", "celestial_emperor", "seraph_archon", "chronos_titan", "badge*"], { cols: 4, pad: 2 })

