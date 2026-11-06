// ============================================================================
// CULTIVATION REALMS & LIFESPAN SYSTEM
// Zero emojis, Zero em dashes.
// ============================================================================

const REALMS = [
  {
    id: 'pham_nhan',
    name: 'Mortal',
    stage: 'Body Tempering',
    level: 0,
    lifespan: 70,
    expRequired: 100,
    baseStats: { hp: 100, atk: 12, def: 6, strike: 5, dodge: 5, skill: 5 },
    tribulation: false,
    desc: 'Mortal flesh and blood, unaware of celestial spiritual Qi, with a fragile and fleeting lifespan.'
  },
  {
    id: 'luyen_khi_1',
    name: 'Qi Condensation Stage 1',
    stage: 'Qi Condensation',
    level: 1,
    lifespan: 100,
    expRequired: 250,
    baseStats: { hp: 160, atk: 22, def: 12, strike: 8, dodge: 7, skill: 8 },
    tribulation: false,
    desc: 'Drawing spiritual Qi into the body, opening the first meridian pathway.'
  },
  {
    id: 'luyen_khi_3',
    name: 'Qi Condensation Stage 3',
    stage: 'Qi Condensation',
    level: 2,
    lifespan: 110,
    expRequired: 450,
    baseStats: { hp: 240, atk: 35, def: 20, strike: 12, dodge: 10, skill: 12 },
    tribulation: false,
    desc: 'Qi sea begins to take shape, capable of gathering genuine Qi to cast basic spells.'
  },
  {
    id: 'luyen_khi_6',
    name: 'Qi Condensation Stage 6',
    stage: 'Qi Condensation',
    level: 3,
    lifespan: 120,
    expRequired: 800,
    baseStats: { hp: 360, atk: 52, def: 30, strike: 16, dodge: 14, skill: 18 },
    tribulation: false,
    desc: 'Stable spiritual aura, spiritual sense extends thirty paces to repel foes with Qi.'
  },
  {
    id: 'luyen_khi_9',
    name: 'Qi Condensation Stage 9',
    stage: 'Qi Condensation',
    level: 4,
    lifespan: 130,
    expRequired: 1400,
    baseStats: { hp: 520, atk: 75, def: 45, strike: 22, dodge: 18, skill: 25 },
    tribulation: false,
    desc: 'Peak of Qi Condensation, meridians surge like grand rivers, preparing for Foundation liquification.'
  },
  {
    id: 'truc_co_so',
    name: 'Foundation Establishment (Early)',
    stage: 'Foundation Establishment',
    level: 5,
    lifespan: 220,
    expRequired: 2500,
    baseStats: { hp: 850, atk: 120, def: 75, strike: 28, dodge: 24, skill: 38 },
    tribulation: true,
    tribulationDamage: 180,
    desc: 'Genuine Qi condenses into liquid essence, establishing the immortal foundation with 200 years of life.'
  },
  {
    id: 'truc_co_hau',
    name: 'Foundation Establishment (Late)',
    stage: 'Foundation Establishment',
    level: 6,
    lifespan: 260,
    expRequired: 4200,
    baseStats: { hp: 1350, atk: 185, def: 120, strike: 36, dodge: 30, skill: 55 },
    tribulation: false,
    desc: 'Dao foundation perfected, flying freely upon swords, spiritual sense sweeping across hundreds of miles.'
  },
  {
    id: 'kim_dan_so',
    name: 'Golden Core (Early)',
    stage: 'Golden Core',
    level: 7,
    lifespan: 450,
    expRequired: 7500,
    baseStats: { hp: 2200, atk: 310, def: 200, strike: 48, dodge: 40, skill: 85 },
    tribulation: true,
    tribulationDamage: 450,
    desc: 'Golden Core condensed in the dantian, casting off mortal coils: My life is governed by me, not heaven.'
  },
  {
    id: 'kim_dan_vien_man',
    name: 'Golden Core (Grand Peak)',
    stage: 'Golden Core',
    level: 8,
    lifespan: 550,
    expRequired: 13000,
    baseStats: { hp: 3600, atk: 480, def: 320, strike: 62, dodge: 52, skill: 125 },
    tribulation: false,
    desc: 'Nine-turned golden core glowing with brilliant purple radiance, preparing to birth the nascent soul.'
  },
  {
    id: 'nguyen_anh_so',
    name: 'Nascent Soul (Early)',
    stage: 'Nascent Soul',
    level: 9,
    lifespan: 1000,
    expRequired: 24000,
    baseStats: { hp: 6000, atk: 780, def: 520, strike: 80, dodge: 68, skill: 190 },
    tribulation: true,
    tribulationDamage: 1100,
    desc: 'Golden core shatters, birthing the Nascent Soul. Even if physical body perishes, the soul escapes to possess a new form.'
  },
  {
    id: 'nguyen_anh_vien_man',
    name: 'Nascent Soul (Grand Peak)',
    stage: 'Nascent Soul',
    level: 10,
    lifespan: 1300,
    expRequired: 42000,
    baseStats: { hp: 9800, atk: 1250, def: 850, strike: 105, dodge: 90, skill: 280 },
    tribulation: false,
    desc: 'Commanding regional heavenly laws. With a wave of the hand, all mundane spirits submit in awe.'
  },
  {
    id: 'hoa_than_so',
    name: 'Soul Formation Sovereign',
    stage: 'Soul Formation',
    level: 11,
    lifespan: 2500,
    expRequired: 75000,
    baseStats: { hp: 16000, atk: 2100, def: 1450, strike: 140, dodge: 125, skill: 420 },
    tribulation: true,
    tribulationDamage: 2600,
    desc: 'Merging soul into the void, manifesting heavenly dharma idols that effortlessly tear apart mortal space.'
  },
  {
    id: 'do_kiep_phi_thang',
    name: 'Tribulation Transcending (Pre-Ascension)',
    stage: 'Tribulation Transcending',
    level: 12,
    lifespan: 5000,
    expRequired: 150000,
    baseStats: { hp: 28000, atk: 3600, def: 2500, strike: 195, dodge: 175, skill: 650 },
    tribulation: true,
    tribulationDamage: 6500,
    desc: 'The absolute pinnacle of this realm. Ninefold heavenly tribulations descend. Overcome them to ascend as a True Immortal!'
  }
];

if (typeof window !== 'undefined') {
  window.REALMS = REALMS;
}
if (typeof module !== 'undefined') {
  module.exports = { REALMS };
}
