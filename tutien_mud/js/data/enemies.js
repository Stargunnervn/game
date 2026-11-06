// ============================================================================
// SPIRIT BEASTS & RIVAL CULTIVATORS BESTIARY
// Zero emojis, Zero em dashes.
// ============================================================================

const ENEMIES_CATALOG = {
  // ── QI CONDENSATION LEVEL ──
  hac_lang_vuong: {
    id: 'hac_lang_vuong',
    name: 'Black Gale Wolf King',
    title: 'Rank 1 Low-Tier Spirit Beast',
    realm: 'Qi Condensation Stage 1',
    hp: 140, maxHp: 140,
    atk: 18, def: 8, strike: 10, dodge: 12, skill: 8,
    dropExp: 65, dropStones: 12,
    dropItem: 'kim_sang_duoc',
    specialSkill: { name: 'Wolf King Tear', chance: 0.25, dmgMult: 1.35 },
    desc: 'Ferocious alpha wolf haunting the deep woods. Razor claws coated in mild paralyzing venom.'
  },
  xich_diem_ho: {
    id: 'xich_diem_ho',
    name: 'Blazing Flame Tiger',
    title: 'Rank 1 Mid-Tier Spirit Beast',
    realm: 'Qi Condensation Stage 3',
    hp: 260, maxHp: 260,
    atk: 36, def: 18, strike: 15, dodge: 8, skill: 12,
    dropExp: 140, dropStones: 28,
    dropItem: 'tu_khi_dan',
    specialSkill: { name: 'Flame Burst', chance: 0.30, dmgMult: 1.45 },
    desc: 'Flame predator dwelling near volcanic craters, shrouded in spiritual fire that singes human flesh.'
  },
  hac_y_cuop_tu: {
    id: 'hac_y_cuop_tu',
    name: 'Shadowblade Bandit Cultivator',
    title: 'Black Wind Fortress Raider',
    realm: 'Qi Condensation Stage 6',
    hp: 420, maxHp: 420,
    atk: 54, def: 28, strike: 20, dodge: 15, skill: 20,
    dropExp: 260, dropStones: 65,
    dropItem: 'thanh_phong_kiem',
    specialSkill: { name: 'Soul Slaying Cleave', chance: 0.28, dmgMult: 1.50 },
    desc: 'A rogue cultivator seduced by demonic greed, ambushing solitary travelers for spiritual treasures.'
  },
  bach_ngoc_mang: {
    id: 'bach_ngoc_mang',
    name: 'White Jade Serpent Spirit',
    title: 'Rank 1 Peak Serpent Beast',
    realm: 'Qi Condensation Stage 9',
    hp: 650, maxHp: 650,
    atk: 78, def: 42, strike: 24, dodge: 22, skill: 30,
    dropExp: 480, dropStones: 110,
    dropItem: 'truc_co_dan',
    specialSkill: { name: 'Glacial Breath', chance: 0.35, dmgMult: 1.60 },
    desc: 'White jade serpent exhaling freezing mist that chills blood and bone, zealously guarding rare spiritual fruits.'
  },

  // ── FOUNDATION ESTABLISHMENT LEVEL ──
  huyet_sat_chap_su: {
    id: 'huyet_sat_chap_su',
    name: 'Blood Shadow Sect Deacon',
    title: 'Demonic Foundation Cultivator',
    realm: 'Foundation Establishment (Early)',
    hp: 1100, maxHp: 1100,
    atk: 135, def: 80, strike: 32, dodge: 25, skill: 45,
    dropExp: 850, dropStones: 220,
    dropItem: 'xich_viem_dao',
    specialSkill: { name: 'Bloodfiend Slash', chance: 0.32, dmgMult: 1.65, lifesteal: 0.25 },
    desc: 'Cruel demonic deacon harvesting human souls for unholy cauldrons, fighting with sadistic ferocity.'
  },
  doc_giac_cu_te: {
    id: 'doc_giac_cu_te',
    name: 'Armored Ironhorn Rhinoceros',
    title: 'Rank 2 Apex Beast Sovereign',
    realm: 'Foundation Establishment (Late)',
    hp: 1950, maxHp: 1950,
    atk: 195, def: 150, strike: 25, dodge: 12, skill: 50,
    dropExp: 1600, dropStones: 380,
    dropItem: 'huyen_thiet_giap',
    specialSkill: { name: 'Earth Shattering Charge', chance: 0.30, dmgMult: 1.80 },
    desc: 'Armored hide as dense as tempered iron. Its brutal horn easily pierces common defensive talismans.'
  },

  // ── GOLDEN CORE LEVEL ──
  xich_huyet_kiem_ma: {
    id: 'xich_huyet_kiem_ma',
    name: 'Crimson Blood Sword Fiend',
    title: 'Golden Core Sword Prodigy',
    realm: 'Golden Core (Early)',
    hp: 3400, maxHp: 3400,
    atk: 340, def: 210, strike: 55, dodge: 45, skill: 95,
    dropExp: 3200, dropStones: 750,
    dropItem: 'tu_dien_loi_kiem',
    specialSkill: { name: 'Myriad Swords Converge', chance: 0.38, dmgMult: 2.0 },
    desc: 'Formerly a righteous sword immortal who succumbed to demonic possession, wielding terrifyingly cold sword intent.'
  },
  doc_nhan_giao_long: {
    id: 'doc_nhan_giao_long',
    name: 'Abyssal Cyclops Drake',
    title: 'Rank 3 Leviathan Emperor',
    realm: 'Golden Core (Grand Peak)',
    hp: 5500, maxHp: 5500,
    atk: 520, def: 350, strike: 65, dodge: 50, skill: 135,
    dropExp: 5500, dropStones: 1400,
    dropItem: 'long_lan_chien_y',
    specialSkill: { name: 'Azure Dragon Cataclysm', chance: 0.40, dmgMult: 2.20 },
    desc: 'Submerged deep within oceanic trenches for ten centuries, only half a step away from true dragon transformation.'
  },

  // ── NASCENT SOUL LEVEL ──
  van_doc_ma_quan: {
    id: 'van_doc_ma_quan',
    name: 'Old Demon Myriad Poisons',
    title: 'Nascent Soul Ancient Fiend',
    realm: 'Nascent Soul (Early)',
    hp: 9200, maxHp: 9200,
    atk: 850, def: 560, strike: 85, dodge: 70, skill: 210,
    dropExp: 11000, dropStones: 3000,
    dropItem: 'hu_khong_tram_linh',
    specialSkill: { name: 'Nether Bone Corrosive Palm', chance: 0.42, dmgMult: 2.35 },
    desc: 'An ancient fiend dwelling within toxic mires for over a millennium. Poison palms dissolve stone and metal.'
  },
  xich_xa_ma_nu: {
    id: 'xich_xa_ma_nu',
    name: 'Crimson Serpent Sorceress',
    title: 'Poison Valley Enchantress',
    realm: 'Foundation Establishment (Early)',
    hp: 920, maxHp: 920,
    atk: 115, def: 68, strike: 28, dodge: 26, skill: 40,
    dropExp: 720, dropStones: 180,
    dropItem: 'tu_khi_dan',
    specialSkill: { name: 'Serpent Blood Curse', chance: 0.30, dmgMult: 1.55 },
    desc: 'An enchantress who wields venomous spirit vipers, bewitching travelers and draining their lifeforce.'
  },
  cu_nham_ho_phap: {
    id: 'cu_nham_ho_phap',
    name: 'Ancient Stone Golem Guardian',
    title: 'Mountain Tomb Sentinel',
    realm: 'Golden Core (Early)',
    hp: 4400, maxHp: 4400,
    atk: 290, def: 340, strike: 35, dodge: 10, skill: 70,
    dropExp: 2900, dropStones: 600,
    dropItem: 'tinh_thach_ngoc_tuy',
    specialSkill: { name: 'Titan Rock Slam', chance: 0.32, dmgMult: 1.75 },
    desc: 'A colossal monolith forged from mountain bedrock by an ancient sovereign to guard secluded tombs.'
  },
  am_hon_quy_vuong: {
    id: 'am_hon_quy_vuong',
    name: 'Nether Soul Specter King',
    title: 'Abyssal Wraith Overlord',
    realm: 'Nascent Soul (Early)',
    hp: 8200, maxHp: 8200,
    atk: 780, def: 510, strike: 80, dodge: 75, skill: 220,
    dropExp: 9800, dropStones: 2400,
    dropItem: 'tam_ma_kinh',
    specialSkill: { name: 'Soul Sunder Howl', chance: 0.38, dmgMult: 2.10 },
    desc: 'A wraith monarch forged from ten thousand vengeful spirits, commanding ghostly legions in dark burial grounds.'
  },

  // ── TRIBULATION & CALAMITY PEAK ──
  thao_thiet_thuong_co: {
    id: 'thao_thiet_thuong_co',
    name: 'Ancient Taotie Calamity Beast',
    title: 'Primordial World Eater',
    realm: 'Tribulation Transcending (Peak)',
    hp: 36000, maxHp: 36000,
    atk: 4200, def: 2800, strike: 220, dodge: 180, skill: 750,
    dropExp: 50000, dropStones: 15000,
    dropItem: 'cuu_chuyen_hoan_hon',
    specialSkill: { name: 'World Devouring Maw', chance: 0.45, dmgMult: 2.80, lifesteal: 0.30 },
    desc: 'A primordial calamity beast existing since the creation of heaven and earth, devouring sun and moon to obstruct ascension.'
  }
};

if (typeof window !== 'undefined') {
  window.ENEMIES_CATALOG = ENEMIES_CATALOG;
}
if (typeof module !== 'undefined') {
  module.exports = { ENEMIES_CATALOG };
}
