// ============================================================================
// BACKGROUNDS, SPIRIT ROOTS & REINCARNATION HERITAGE TALENTS
// Zero emojis, Zero em dashes.
// ============================================================================

const BACKGROUNDS = [
  {
    id: 'han_mon_tan_tu',
    name: 'Humble Rogue Cultivator',
    rarity: 'common',
    desc: 'Born into an impoverished mortal family, you accidentally stumbled upon half a tattered Qi gathering manual by a riverbank.',
    bonus: { exp: 50, stones: 20, atk: 2, def: 2 }
  },
  {
    id: 'son_thon_tho_san',
    name: 'Wilderness Hunter',
    rarity: 'common',
    desc: 'Raised on rugged crags hunting wild beasts, your physique is extraordinarily agile and resilient.',
    bonus: { hp: 40, dodge: 4, strike: 3, stones: 15 }
  },
  {
    id: 'gia_toc_chi_thu',
    name: 'Clan Secondary Offspring',
    rarity: 'rare',
    desc: 'A secondary child in a minor cultivation clan. Though neglected, you had early access to basic pills and clan records.',
    bonus: { stones: 80, skill: 5, atk: 4 }
  },
  {
    id: 'ma_mon_co_nhi',
    name: 'Demonic Sect Orphan',
    rarity: 'rare',
    desc: 'Sole survivor from the ruins of a purged demonic sect, harboring cold resolve, intense vengeance, and sharp instincts.',
    bonus: { atk: 8, strike: 6, hp: -20, stones: 40 }
  },
  {
    id: 'chuyen_the_chan_nhan',
    name: 'Reincarnated Ancient Venerable',
    rarity: 'legendary',
    desc: 'A fallen supreme overlord of a bygone era. Your true soul retains an elusive, mystical fragment of ancient memories.',
    bonus: { skill: 15, strike: 10, dodge: 8, stones: 150, exp: 200 }
  }
];

const SPIRIT_ROOTS = [
  {
    id: 'ngu_hanh_tap_can',
    name: 'Impure Five-Element Root',
    rarity: 'Mundane',
    color: '#8b8b8b',
    cultivationRate: 0.8,
    desc: 'Chaotic mixture of all five elements. Slow Qi absorption, full of insurmountable hurdles on the path to immortality.'
  },
  {
    id: 'tam_linh_can',
    name: 'Three-Element Root',
    rarity: 'Common',
    color: '#4ade80',
    cultivationRate: 1.0,
    desc: 'Three mutually generating elements. Standard talent in the cultivation realm, requiring diligence to excel.'
  },
  {
    id: 'song_linh_can',
    name: 'True Dual Root',
    rarity: 'Superior',
    color: '#60a5fa',
    cultivationRate: 1.35,
    desc: 'Two refined, unhindered spiritual elements. Rapid Qi absorption, highly favored by prominent cultivation sects.'
  },
  {
    id: 'thien_linh_can',
    name: 'Heavenly Single Root',
    rarity: 'Peerless',
    color: '#c084fc',
    cultivationRate: 1.85,
    desc: 'A solitary, unblemished celestial root with zero minor cultivation bottlenecks. A chosen prodigy of the heavens.'
  },
  {
    id: 'bien_di_loi_can',
    name: 'Mutated Lightning Root',
    rarity: 'Mythic',
    color: '#facc15',
    cultivationRate: 2.2,
    bonusAtk: 18,
    bonusStrike: 12,
    desc: 'Commands celestial lightning tribulations. Catastrophic offensive strikes and natural resistance to tribulation damage.'
  }
];

const TALENTS = [
  // Starting Pickable Talents
  {
    id: 'khi_van_chi_tu',
    name: 'Child of Destiny',
    tier: 'Divine',
    cost: 50,
    permanentHeritage: false,
    desc: 'Tremendous fortune when wandering the realm. Rare encounter chance increased by +40%, reducing deadly perils.',
    effect: { luckBonus: 40 }
  },
  {
    id: 'kiem_tam_thong_minh',
    name: 'Sword Heart Enlightenment',
    tier: 'Celestial',
    cost: 35,
    permanentHeritage: false,
    desc: 'Innate affinity with the sword. Grants +25% bonus attack damage and +15% critical Strike chance.',
    effect: { atkMult: 1.25, strike: 15 }
  },
  {
    id: 'bat_diet_kim_than',
    name: 'Indestructible Golden Body',
    tier: 'Celestial',
    cost: 40,
    permanentHeritage: false,
    desc: 'Flesh and tendons tempered like steel. Increases base HP by +120 and boosts total Defense by +30%.',
    effect: { hp: 120, defMult: 1.30 }
  },
  {
    id: 'dan_dao_tong_su',
    name: 'Alchemy Grandmaster',
    tier: 'Apex',
    cost: 30,
    permanentHeritage: false,
    desc: 'Mastery over medicinal herbs and elixirs. All pill recovery and cultivation gains are enhanced by +60%.',
    effect: { potionEffect: 1.6 }
  },
  {
    id: 'thon_phe_ma_cong',
    name: 'Devouring Scripture',
    tier: 'Apex',
    cost: 35,
    permanentHeritage: false,
    desc: 'Siphons life force from defeated spirit beasts and rivals, restoring 20% HP and granting bonus cultivation exp.',
    effect: { lifesteal: 0.20, killExpBonus: 25 }
  },
  {
    id: 'tien_nhan_ho_the',
    name: 'Immortal Protective Ward',
    tier: 'Divine',
    cost: 60,
    permanentHeritage: false,
    desc: 'Ancestral protective talisman. Protects against 35% tribulation damage and grants one free resurrection per lifetime.',
    effect: { revive: 1, tribulationResist: 0.35 }
  },
  {
    id: 'dao_lu_dong_tam',
    name: 'Destined Dao Companion',
    tier: 'Superior',
    cost: 25,
    permanentHeritage: false,
    desc: 'Effortlessly bonds with gifted companions, boosting annual meditation cultivation speed by +20%.',
    effect: { cultRateBonus: 0.20 }
  },
  {
    id: 'ngo_tinh_tuyet_dinh',
    name: 'Transcendent Perception',
    tier: 'Superior',
    cost: 20,
    permanentHeritage: false,
    desc: 'Rapidly deciphers complex scriptures. Base Skill attribute permanently increased by +35 points.',
    effect: { skill: 35 }
  },

  // Permanent Heritage Perks (Unlocked in Reincarnation Hall)
  {
    id: 'talent_root_pure',
    name: 'Heritage: Pure Spiritual Vein',
    tier: 'Heritage',
    cost: 60,
    permanentHeritage: true,
    desc: 'Permanently removes Impure Five-Element Root from future rebirths, guaranteeing at least a Three-Element Root or better.',
    effect: { removeImpureRoot: true }
  },
  {
    id: 'talent_immortal_frame',
    name: 'Heritage: Primordial Frame',
    tier: 'Heritage',
    cost: 75,
    permanentHeritage: true,
    desc: 'Permanently increases starting base HP by +150 in all subsequent reincarnations.',
    effect: { hp: 150 }
  },
  {
    id: 'talent_sword_dao',
    name: 'Heritage: Sword Dao Imprint',
    tier: 'Heritage',
    cost: 90,
    permanentHeritage: true,
    desc: 'Permanently enhances total attack damage by +20% and Strike by +10% in all subsequent lives.',
    effect: { atkMult: 1.20, strike: 10 }
  },
  {
    id: 'talent_pill_master',
    name: 'Heritage: Grand Alchemist Mark',
    tier: 'Heritage',
    cost: 70,
    permanentHeritage: true,
    desc: 'Permanently boosts the effects of all ingested spirit pills and lifespan elixirs by +50%.',
    effect: { potionEffect: 1.5 }
  },
  {
    id: 'talent_heaven_luck',
    name: 'Heritage: Destiny Aegis',
    tier: 'Heritage',
    cost: 110,
    permanentHeritage: true,
    desc: 'Permanently increases rare celestial encounters and treasure drop chances by +35%.',
    effect: { luckBonus: 35 }
  }
];

if (typeof window !== 'undefined') {
  window.BACKGROUNDS = BACKGROUNDS;
  window.SPIRIT_ROOTS = SPIRIT_ROOTS;
  window.TALENTS = TALENTS;
}
if (typeof module !== 'undefined') {
  module.exports = { BACKGROUNDS, SPIRIT_ROOTS, TALENTS };
}
