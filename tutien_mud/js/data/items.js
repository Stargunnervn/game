// ============================================================================
// EQUIPMENT, ELIXIRS & CULTIVATION MANUALS CATALOG
// Zero emojis, Zero em dashes.
// ============================================================================

const ITEMS_CATALOG = {
  // ── WEAPONS & ARTIFACTS ──
  thiet_kiem: {
    id: 'thiet_kiem',
    name: 'Common Iron Sword',
    type: 'WEAPON',
    tier: 'Mundane',
    stats: { atk: 6, strike: 2 },
    price: 15,
    desc: 'An iron blade forged by mortal smiths. Sharp and balanced, yet devoid of spiritual Qi.'
  },
  thanh_phong_kiem: {
    id: 'thanh_phong_kiem',
    name: 'Azure Breeze Sword',
    type: 'WEAPON',
    tier: 'Low-Grade Artifact',
    stats: { atk: 18, strike: 6, dodge: 4 },
    price: 65,
    desc: 'Inscribed with subtle wind runes. Each swing moves like a gale, granting swift combat precision.'
  },
  xich_viem_dao: {
    id: 'xich_viem_dao',
    name: 'Scarlet Flame Saber',
    type: 'WEAPON',
    tier: 'Mid-Grade Artifact',
    stats: { atk: 38, strike: 12 },
    price: 160,
    desc: 'Forged from red iron ore deep beneath volcanic calderas. Strikes burn foes with searing spiritual flames.'
  },
  tu_dien_loi_kiem: {
    id: 'tu_dien_loi_kiem',
    name: 'Violet Lightning Blade',
    type: 'WEAPON',
    tier: 'High-Grade Treasure',
    stats: { atk: 85, strike: 22, skill: 15 },
    price: 450,
    desc: 'Tempered in celestial thunder for a millennium, discharging crackling violet lightning to paralyze adversaries.'
  },
  hu_khong_tram_linh: {
    id: 'hu_khong_tram_linh',
    name: 'Void Severing Celestial Sword',
    type: 'WEAPON',
    tier: 'Apex Immortal Relic',
    stats: { atk: 220, strike: 45, skill: 35, dodge: 20 },
    price: 1500,
    desc: 'Blade aura sunders mortal spatial fabric, piercing through 40% target armor and cleaving spiritual souls.'
  },

  // ── ARMOR & ROBES ──
  dao_bao_to_y: {
    id: 'dao_bao_to_y',
    name: 'Azure Cloud Dao Robe',
    type: 'ARMOR',
    tier: 'Low-Grade Artifact',
    stats: { hp: 80, def: 12, dodge: 3 },
    price: 50,
    desc: 'Woven from fine gossamer spiritual silk, shielding the wearer from kinetic impact and blunt trauma.'
  },
  huyen_thiet_giap: {
    id: 'huyen_thiet_giap',
    name: 'Deep Iron Chainmail',
    type: 'ARMOR',
    tier: 'Mid-Grade Artifact',
    stats: { hp: 180, def: 28 },
    price: 140,
    desc: 'Interlinked scales of deep-sea iron, impervious to mundane arrows and blade punctures.'
  },
  long_lan_chien_y: {
    id: 'long_lan_chien_y',
    name: 'Scarlet Dragon Scale Armor',
    type: 'ARMOR',
    tier: 'High-Grade Treasure',
    stats: { hp: 550, def: 75, dodge: 10 },
    price: 520,
    desc: 'Tailored from millennium flood dragon scales, radiating an intimidating draconic presence.'
  },

  // ── ELIXIRS & MEDICINES ──
  kim_sang_duoc: {
    id: 'kim_sang_duoc',
    name: 'Golden Sore Powder',
    type: 'CONSUMABLE',
    tier: 'Common Remedy',
    effect: { healHp: 150 },
    price: 20,
    desc: 'Traditional blood-staunching medicinal powder, instantly restoring 150 HP.'
  },
  tu_khi_dan: {
    id: 'tu_khi_dan',
    name: 'Qi Gathering Pill',
    type: 'CONSUMABLE',
    tier: 'Low-Grade Pill',
    effect: { addExp: 120 },
    price: 45,
    desc: 'Essential elixir for Qi Condensation disciples, directly converting medicinal essence into 120 Cultivation Exp.'
  },
  truc_co_dan: {
    id: 'truc_co_dan',
    name: 'Supreme Foundation Pill',
    type: 'CONSUMABLE',
    tier: 'Apex Pill',
    effect: { addExp: 600, guaranteeBreakthrough: true },
    price: 320,
    desc: 'Precious elixir that safeguards meridians during Dao Foundation casting, granting 600 Exp.'
  },
  tho_nguyen_dan: {
    id: 'tho_nguyen_dan',
    name: 'Longevity Elixir',
    type: 'CONSUMABLE',
    tier: 'Rare Elixir',
    effect: { addLifespan: 25 },
    price: 220,
    desc: 'Distilled from century-old spiritual mushrooms, prolonging mortal lifespan by 25 invaluable years.'
  },
  cuu_chuyen_hoan_hon: {
    id: 'cuu_chuyen_hoan_hon',
    name: 'Nine-Turn Soul Rebirth Pill',
    type: 'CONSUMABLE',
    tier: 'Divine Pill',
    effect: { healHpPercent: 1.0, addExp: 1500 },
    price: 850,
    desc: 'Miraculous resurrection pill that fully restores 100% HP and rewards 1500 Cultivation Exp.'
  },

  // ── CULTIVATION MANUALS ──
  truong_sinh_quyet: {
    id: 'truong_sinh_quyet',
    name: 'Longevity Breathing Scripture',
    type: 'MANUAL',
    tier: 'Earth Grade Manual',
    stats: { hp: 100, def: 15 },
    passiveText: 'Steady breath: Grants +15% bonus Cultivation Exp per year of meditation.',
    price: 180,
    desc: 'Authentic Daoist scripture focusing on harmonizing vital energies and preserving vitality.'
  },
  thai_at_kiem_quyet: {
    id: 'thai_at_kiem_quyet',
    name: 'Taiyi Sword Canon Fragment',
    type: 'MANUAL',
    tier: 'Heaven Grade Manual',
    stats: { atk: 45, strike: 18 },
    passiveText: 'Surging Sword Qi: Grants 25% chance to unleash an extra dual strike in battle.',
    price: 380,
    desc: 'Remnant sword scripture from the ancient Taiyi Sect, emphasizing supreme attack velocity.'
  },
  bat_hoang_du_long: {
    id: 'bat_hoang_du_long',
    name: 'Eight Desolations Dragon Footwork',
    type: 'MANUAL',
    tier: 'Immortal Grade Manual',
    stats: { dodge: 30, skill: 20 },
    passiveText: 'Dragon Glide: Successful dodges immediately trigger a 50% damage counter-strike.',
    price: 650,
    desc: 'Ethereal footwork technique mimicking heavenly dragons navigating the clouds, elusive and unpredictable.'
  },
  tinh_thach_ngoc_tuy: {
    id: 'tinh_thach_ngoc_tuy',
    name: 'Spiritual Jade Marrow',
    type: 'CONSUMABLE',
    tier: 'Apex Elixir',
    effect: { addExp: 450, healHp: 180 },
    price: 280,
    desc: 'Pure subterranean spiritual marrow condensed over ten thousand years. Cleanses meridians instantly.'
  },
  thien_loi_linh_chu: {
    id: 'thien_loi_linh_chu',
    name: 'Celestial Lightning Orb',
    type: 'WEAPON',
    tier: 'High-Grade Treasure',
    stats: { atk: 110, strike: 25, skill: 20 },
    price: 580,
    desc: 'An orb condensed from the core of heavenly tribulation thunderclouds, sparking with unbridled fury.'
  },
  bang_phach_tien_y: {
    id: 'bang_phach_tien_y',
    name: 'Ice Soul Ethereal Robe',
    type: 'ARMOR',
    tier: 'High-Grade Treasure',
    stats: { hp: 420, def: 55, dodge: 15 },
    price: 490,
    desc: 'Woven from glacial silkworm threads atop frozen mountain summits, neutralizing kinetic force.'
  },
  tam_ma_kinh: {
    id: 'tam_ma_kinh',
    name: 'Heart Demon Subduing Canon',
    type: 'MANUAL',
    tier: 'Heaven Grade Manual',
    stats: { atk: 60, strike: 22, skill: 25 },
    passiveText: 'Demon Bane: Grants +20% bonus damage when battling demonic fiends.',
    price: 480,
    desc: 'An esoteric scripture designed to conquer internal delusions and transform mental demons into raw battle intent.'
  }
};

if (typeof window !== 'undefined') {
  window.ITEMS_CATALOG = ITEMS_CATALOG;
}
if (typeof module !== 'undefined') {
  module.exports = { ITEMS_CATALOG };
}
