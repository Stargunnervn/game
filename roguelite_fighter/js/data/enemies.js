// ============================================================================
// ENEMY DEFINITIONS & 10-STAGE FLOOR PROGRESSION POOLS
// ============================================================================

const ENEMY_CATALOG = {
  // ── FLOOR 1: THE IRON DOJO (Physical & Martial Arts) ──
  shaolin_novice: {
    name: 'Shaolin Novice',
    title: 'Dojo Apprentice',
    color: '#ff6b6b',
    bodyColor: '#e74c3c',
    headColor: '#f39c12',
    accentColor: '#f1c40f',
    baseHp: 80,
    aiTier: 'NOVICE',
    moves: ['STEP_FWD', 'STEP_BACK', 'QUICK_JAB', 'SWEEP', 'BLOCK'],
    goldReward: 25,
    introQuote: 'Let us exchange blows! Teach me your style.',
    defeatQuote: 'My fundamentals were lacking...'
  },
  dojo_sparring_partner: {
    name: 'Sparring Adept',
    title: 'Wooden Dummy Master',
    color: '#e67e22',
    bodyColor: '#d35400',
    headColor: '#f39c12',
    accentColor: '#e67e22',
    baseHp: 95,
    aiTier: 'NOVICE',
    moves: ['STEP_FWD', 'QUICK_JAB', 'HEAVY_SLASH', 'BLOCK', 'PARRY'],
    goldReward: 30,
    introQuote: 'Can you penetrate my steady guard?',
    defeatQuote: 'A clean hit! Well played.'
  },
  street_brawler: {
    name: 'Steel Knuckle Brawler',
    title: 'Alleyway Fighter',
    color: '#c0392b',
    bodyColor: '#962d22',
    headColor: '#e74c3c',
    accentColor: '#bdc3c7',
    baseHp: 110,
    aiTier: 'AGGRESSIVE',
    moves: ['STEP_FWD', 'DASH', 'QUICK_JAB', 'LAUNCHER', 'GROUND_POUND'],
    goldReward: 35,
    introQuote: 'No fancy forms here, just brute force!',
    defeatQuote: 'My knuckle irons shattered...'
  },
  windblade_ronin: {
    name: 'Windblade Ronin',
    title: 'Wandering Swordsman',
    color: '#16a085',
    bodyColor: '#1abc9c',
    headColor: '#2ecc71',
    accentColor: '#ecf0f1',
    baseHp: 125,
    aiTier: 'BALANCED',
    moves: ['STEP_FWD', 'STEP_BACK', 'DASH', 'HEAVY_SLASH', 'PARRY', 'BLADE_COUNTER'],
    goldReward: 42,
    introQuote: 'The wind whispers your every move.',
    defeatQuote: 'Your edge was sharper than the gale.'
  },
  iron_temple_monk: {
    name: 'Iron Temple Monk',
    title: 'Diamond Body Disciple',
    color: '#d4ac0d',
    bodyColor: '#b7950b',
    headColor: '#f1c40f',
    accentColor: '#f39c12',
    baseHp: 145,
    aiTier: 'TACTICAL',
    moves: ['STEP_FWD', 'BLOCK', 'PARRY', 'LAUNCHER', 'LIGHTNING_PALM', 'GROUND_POUND'],
    goldReward: 50,
    introQuote: 'My spirit is an unyielding fortress.',
    defeatQuote: 'The diamond has cracked...'
  },
  elite_dojo_master: {
    name: 'Elite Dojo Instructor',
    title: 'First Floor Gatekeeper',
    color: '#8e44ad',
    bodyColor: '#6c3483',
    headColor: '#9b59b6',
    accentColor: '#f1c40f',
    baseHp: 170,
    aiTier: 'VETERAN',
    moves: ['STEP_FWD', 'DASH', 'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER', 'DRAGON_UPPER', 'PARRY'],
    goldReward: 65,
    introQuote: 'Show me what you have mastered in this dojo!',
    defeatQuote: 'You have surpassed the instructor!'
  },

  // FLOOR 1 BOSS: IRON SHOGUN
  boss_iron_shogun: {
    name: 'Iron Shogun Raiden',
    title: 'Lord of the Iron Mountain',
    isBoss: true,
    color: '#e74c3c',
    bodyColor: '#78281f',
    headColor: '#c0392b',
    accentColor: '#f39c12',
    baseHp: 260,
    aiTier: 'BOSS',
    moves: ['DASH', 'HEAVY_SLASH', 'LAUNCHER', 'GROUND_POUND', 'BLADE_COUNTER', 'DRAGON_UPPER', 'PARRY'],
    goldReward: 140,
    introQuote: 'Tremble before the invincible blade of the Shogunate!',
    defeatQuote: 'Impossible... The Iron Dynasty falls...'
  },

  // ── FLOOR 2: THE SHADOW RIFT (Spectral, Dark & Spatial) ──
  spectral_stalker: {
    name: 'Spectral Stalker',
    title: 'Rift Walker',
    color: '#9b59b6',
    bodyColor: '#5b2c6f',
    headColor: '#af7ac5',
    accentColor: '#85c1e9',
    baseHp: 155,
    aiTier: 'BALANCED',
    moves: ['STEP_FWD', 'GHOST_STEP', 'QUICK_JAB', 'SHADOW_TELEPORT', 'SWEEP'],
    goldReward: 50,
    introQuote: 'Can you strike a shadow in the dark?',
    defeatQuote: 'Banished back into the ether...'
  },
  void_cultist: {
    name: 'Void Cultist',
    title: 'Acolyte of Oblivion',
    color: '#5d6d7e',
    bodyColor: '#34495e',
    headColor: '#85929e',
    accentColor: '#a569bd',
    baseHp: 170,
    aiTier: 'TACTICAL',
    moves: ['STEP_BACK', 'KI_BLAST', 'FIRE_BURST', 'BLOCK', 'SHADOW_TELEPORT'],
    goldReward: 55,
    introQuote: 'The darkness hungers for your essence.',
    defeatQuote: 'The void still awaits you...'
  },
  crimson_assassin: {
    name: 'Crimson Nightshade',
    title: 'Silent Fang',
    color: '#e91e63',
    bodyColor: '#880e4f',
    headColor: '#f06292',
    accentColor: '#ffffff',
    baseHp: 190,
    aiTier: 'AGGRESSIVE',
    moves: ['DASH', 'SUPER_DASH', 'QUICK_JAB', 'HEAVY_SLASH', 'PARRY', 'LIGHTNING_PALM'],
    goldReward: 65,
    introQuote: 'One heartbeat is all I need to end you.',
    defeatQuote: 'A lethal miscalculation...'
  },
  dusk_duelist: {
    name: 'Duskblade Duelist',
    title: 'Twilight Fencer',
    color: '#3498db',
    bodyColor: '#1b4f72',
    headColor: '#5dade2',
    accentColor: '#f4d03f',
    baseHp: 215,
    aiTier: 'VETERAN',
    moves: ['STEP_FWD', 'STEP_BACK', 'HEAVY_SLASH', 'JUDGMENT_CUT', 'PARRY', 'BLADE_COUNTER', 'GHOST_STEP'],
    goldReward: 75,
    introQuote: 'Steel honed between twilight and oblivion.',
    defeatQuote: 'Your timing was absolute perfection.'
  },
  nether_abomination: {
    name: 'Nether Titan',
    title: 'Rift Goliath',
    color: '#27ae60',
    bodyColor: '#145a32',
    headColor: '#52be80',
    accentColor: '#e74c3c',
    baseHp: 250,
    aiTier: 'AGGRESSIVE',
    moves: ['STEP_FWD', 'GROUND_POUND', 'METEOR_STRIKE', 'WHIRLWIND', 'BLOCK'],
    goldReward: 85,
    introQuote: 'ROAARRR! CRUSH THE MORTAL!',
    defeatQuote: 'The mountain of flesh crumbles...'
  },
  void_inquisitor: {
    name: 'Void Inquisitor',
    title: 'Keeper of the Rift Gates',
    color: '#1abc9c',
    bodyColor: '#0e6251',
    headColor: '#48c9b0',
    accentColor: '#af7ac5',
    baseHp: 275,
    aiTier: 'VETERAN',
    moves: ['DASH', 'JUDGMENT_CUT', 'SHADOW_TELEPORT', 'LIGHTNING_PALM', 'WHIRLWIND', 'PARRY'],
    goldReward: 95,
    introQuote: 'You trespass in realms forbidden to living flesh.',
    defeatQuote: 'The seals are broken...'
  },

  // FLOOR 2 BOSS: VOID PHANTOM LORD
  boss_void_phantom_lord: {
    name: 'Void Lord Malakor',
    title: 'Sovereign of Non-Existence',
    isBoss: true,
    color: '#8e44ad',
    bodyColor: '#4a235a',
    headColor: '#bb8fce',
    accentColor: '#00f0ff',
    baseHp: 380,
    aiTier: 'BOSS',
    moves: ['GHOST_STEP', 'SHADOW_TELEPORT', 'JUDGMENT_CUT', 'VOID_CLEAVE', 'WHIRLWIND', 'PARRY', 'BLADE_COUNTER'],
    goldReward: 220,
    introQuote: 'All light dissolves into the eternal void. Surrender your soul!',
    defeatQuote: 'Even the endless void can be sundered...'
  },

  // ── FLOOR 3: THE ASTRAL CITADEL (Celestial, Divine & Supreme) ──
  astral_templar: {
    name: 'Astral Templar',
    title: 'Sky Shield of the Citadel',
    color: '#f39c12',
    bodyColor: '#7e5109',
    headColor: '#f5b041',
    accentColor: '#ffffff',
    baseHp: 260,
    aiTier: 'BALANCED',
    moves: ['STEP_FWD', 'BLOCK', 'AEGIS_REFLECT', 'LAUNCHER', 'LIGHTNING_PALM', 'KI_BLAST'],
    goldReward: 85,
    introQuote: 'The light of the heavens shields the righteous!',
    defeatQuote: 'My divine shield was shattered...'
  },
  celestial_valkyrie: {
    name: 'Solar Valkyrie',
    title: 'Wing of Judgment',
    color: '#e74c3c',
    bodyColor: '#922b21',
    headColor: '#ec7063',
    accentColor: '#f7dc6f',
    baseHp: 285,
    aiTier: 'AGGRESSIVE',
    moves: ['DOUBLE_JUMP', 'DIVE_KICK', 'COMET_CRASH', 'HEAVY_SLASH', 'SUPER_DASH', 'DRAGON_UPPER'],
    goldReward: 95,
    introQuote: 'Descend from the heavens with radiant wrath!',
    defeatQuote: 'My wings... clipped by a mortal...'
  },
  chrono_weaver: {
    name: 'Chrono Sage',
    title: 'Guardian of Timelines',
    color: '#00bcd4',
    bodyColor: '#006064',
    headColor: '#4dd0e1',
    accentColor: '#ffffff',
    baseHp: 310,
    aiTier: 'TACTICAL',
    moves: ['GHOST_STEP', 'SHADOW_TELEPORT', 'PARRY', 'FIRE_BURST', 'THUNDER_GALE', 'JUDGMENT_CUT'],
    goldReward: 110,
    introQuote: 'I have witnessed every outcome of this duel.',
    defeatQuote: 'A divergence in destiny itself!'
  },
  plasma_behemoth: {
    name: 'Apex War Sentinel',
    title: 'Star-Forge Construct',
    color: '#e67e22',
    bodyColor: '#6e2c00',
    headColor: '#f39c12',
    accentColor: '#00f0ff',
    baseHp: 350,
    aiTier: 'AGGRESSIVE',
    moves: ['METEOR_STRIKE', 'GROUND_POUND', 'FIRE_BURST', 'BLOCK', 'SUPER_DASH'],
    goldReward: 120,
    introQuote: 'ENGAGING TARGET. MAXIMUM COMBAT PURGE PROTOCOL.',
    defeatQuote: 'CORE TEMPERATURE CRITICAL... SHUTTING DOWN.'
  },
  divine_sword_saint: {
    name: 'Celestial Sword Saint',
    title: 'Grand Arbiter of the Astral Throne',
    color: '#f1c40f',
    bodyColor: '#7d6608',
    headColor: '#f9e79f',
    accentColor: '#00f0ff',
    baseHp: 380,
    aiTier: 'VETERAN',
    moves: ['SUPER_DASH', 'HEAVY_SLASH', 'JUDGMENT_CUT', 'VOID_CLEAVE', 'BLADE_COUNTER', 'DRAGON_UPPER', 'PARRY'],
    goldReward: 140,
    introQuote: 'Few mortals reach this summit. Draw your weapon!',
    defeatQuote: 'Magnificent technique! The throne is within your reach.'
  },

  // FLOOR 3 FINAL BOSS: CELESTIAL EMPEROR
  boss_celestial_emperor: {
    name: 'Celestial Emperor Zenith',
    title: 'The Supreme God of Hustle',
    isBoss: true,
    isFinalBoss: true,
    color: '#ffffff',
    bodyColor: '#1a5276',
    headColor: '#f4d03f',
    accentColor: '#00f0ff',
    baseHp: 520,
    aiTier: 'BOSS',
    moves: ['SUPER_DASH', 'GHOST_STEP', 'THUNDER_GALE', 'VOID_CLEAVE', 'COMET_CRASH', 'AEGIS_REFLECT', 'DRAGON_UPPER', 'PARRY'],
    goldReward: 500,
    introQuote: 'You stand before the creator of the arena. Witness absolute martial perfection!',
    defeatQuote: 'You have done the impossible... You are the true God of Hustle!'
  }
};

// ── 10 STAGES PER FLOOR CONFIGURATION ──
const FLOOR_DEFINITIONS = [
  {
    floor: 1,
    name: 'The Iron Dojo',
    bgTheme: 'dojo',
    totalStages: 10,
    stageRoster: [
      // Stage 1 to 3: Novice sparring
      { stage: 1, pool: ['shaolin_novice'], hpMult: 1.0, goldBonus: 0 },
      { stage: 2, pool: ['shaolin_novice', 'dojo_sparring_partner'], hpMult: 1.05, goldBonus: 5 },
      { stage: 3, pool: ['dojo_sparring_partner', 'street_brawler'], hpMult: 1.1, goldBonus: 10 },
      // Stage 4 to 6: Adept fighters
      { stage: 4, pool: ['street_brawler', 'windblade_ronin'], hpMult: 1.15, goldBonus: 15 },
      { stage: 5, pool: ['windblade_ronin'], hpMult: 1.2, goldBonus: 20 },
      { stage: 6, pool: ['windblade_ronin', 'iron_temple_monk'], hpMult: 1.25, goldBonus: 25 },
      // Stage 7 to 9: Elite challengers
      { stage: 7, pool: ['iron_temple_monk', 'street_brawler'], hpMult: 1.3, goldBonus: 30 },
      { stage: 8, pool: ['iron_temple_monk', 'elite_dojo_master'], hpMult: 1.35, goldBonus: 35 },
      { stage: 9, pool: ['elite_dojo_master'], hpMult: 1.45, goldBonus: 45 },
      // Stage 10: Floor Boss
      { stage: 10, pool: ['boss_iron_shogun'], hpMult: 1.0, goldBonus: 50, isBossStage: true }
    ]
  },
  {
    floor: 2,
    name: 'The Shadow Rift',
    bgTheme: 'rift',
    totalStages: 10,
    stageRoster: [
      // Stage 1 to 3
      { stage: 1, pool: ['spectral_stalker'], hpMult: 1.0, goldBonus: 10 },
      { stage: 2, pool: ['spectral_stalker', 'void_cultist'], hpMult: 1.05, goldBonus: 15 },
      { stage: 3, pool: ['void_cultist', 'crimson_assassin'], hpMult: 1.1, goldBonus: 20 },
      // Stage 4 to 6
      { stage: 4, pool: ['crimson_assassin', 'dusk_duelist'], hpMult: 1.15, goldBonus: 25 },
      { stage: 5, pool: ['dusk_duelist'], hpMult: 1.2, goldBonus: 30 },
      { stage: 6, pool: ['dusk_duelist', 'nether_abomination'], hpMult: 1.25, goldBonus: 35 },
      // Stage 7 to 9
      { stage: 7, pool: ['nether_abomination', 'crimson_assassin'], hpMult: 1.3, goldBonus: 40 },
      { stage: 8, pool: ['nether_abomination', 'void_inquisitor'], hpMult: 1.35, goldBonus: 45 },
      { stage: 9, pool: ['void_inquisitor'], hpMult: 1.45, goldBonus: 55 },
      // Stage 10: Floor Boss
      { stage: 10, pool: ['boss_void_phantom_lord'], hpMult: 1.0, goldBonus: 80, isBossStage: true }
    ]
  },
  {
    floor: 3,
    name: 'The Astral Citadel',
    bgTheme: 'astral',
    totalStages: 10,
    stageRoster: [
      // Stage 1 to 3
      { stage: 1, pool: ['astral_templar'], hpMult: 1.0, goldBonus: 20 },
      { stage: 2, pool: ['astral_templar', 'celestial_valkyrie'], hpMult: 1.05, goldBonus: 25 },
      { stage: 3, pool: ['celestial_valkyrie', 'chrono_weaver'], hpMult: 1.1, goldBonus: 30 },
      // Stage 4 to 6
      { stage: 4, pool: ['chrono_weaver', 'plasma_behemoth'], hpMult: 1.15, goldBonus: 35 },
      { stage: 5, pool: ['plasma_behemoth'], hpMult: 1.2, goldBonus: 40 },
      { stage: 6, pool: ['plasma_behemoth', 'divine_sword_saint'], hpMult: 1.25, goldBonus: 45 },
      // Stage 7 to 9
      { stage: 7, pool: ['divine_sword_saint', 'chrono_weaver'], hpMult: 1.3, goldBonus: 50 },
      { stage: 8, pool: ['divine_sword_saint', 'celestial_valkyrie'], hpMult: 1.35, goldBonus: 60 },
      { stage: 9, pool: ['divine_sword_saint'], hpMult: 1.45, goldBonus: 75 },
      // Stage 10: Final Boss
      { stage: 10, pool: ['boss_celestial_emperor'], hpMult: 1.0, goldBonus: 100, isBossStage: true, isFinalBoss: true }
    ]
  }
];

// Helper to instantiate enemy fighter data
function generateEnemyData(floorNum, stageNum) {
  const floorDef = FLOOR_DEFINITIONS[floorNum - 1] || FLOOR_DEFINITIONS[0];
  const stageCfg = floorDef.stageRoster[stageNum - 1] || floorDef.stageRoster[0];

  const pool = stageCfg.pool;
  const pickedKey = pool[Math.floor(Math.random() * pool.length)];
  const rawEnemy = ENEMY_CATALOG[pickedKey];

  const finalHp = Math.round(rawEnemy.baseHp * (stageCfg.hpMult || 1.0));
  const finalGold = Math.round((rawEnemy.goldReward + (stageCfg.goldBonus || 0)));

  return {
    ...rawEnemy,
    catalogKey: pickedKey,
    maxHp: finalHp,
    hp: finalHp,
    goldReward: finalGold,
    floor: floorNum,
    stage: stageNum,
    isBoss: !!rawEnemy.isBoss,
    isFinalBoss: !!rawEnemy.isFinalBoss
  };
}

if (typeof window !== 'undefined') {
  window.ENEMY_CATALOG = ENEMY_CATALOG;
  window.FLOOR_DEFINITIONS = FLOOR_DEFINITIONS;
  window.generateEnemyData = generateEnemyData;
}
if (typeof module !== 'undefined') {
  module.exports = { ENEMY_CATALOG, FLOOR_DEFINITIONS, generateEnemyData };
}


