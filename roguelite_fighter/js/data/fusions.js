// ── SKILL FUSION & APEX BREAKTHROUGH SYSTEM ──────────────────────────────────
const FUSION_RECIPES = {
  'KI_BLAST+QUICK_JAB': {
    targetKey: 'THUNDER_GALE',
    name: 'Thunder Gale Barrage [FUSION]',
    desc: 'Merge Jab + Ki Blast into a 4-hit electric punching storm with piercing shockwaves (Consumes both skills).'
  },
  'HEAVY_SLASH+JUDGMENT_CUT': {
    targetKey: 'VOID_CLEAVE',
    name: 'Dimensional Void Cleave [FUSION]',
    desc: 'Merge Slash + Judgment Cut into a colossal space-rending slash tearing 3 reality rifts (Consumes both skills).'
  },
  'DIVE_KICK+LAUNCHER': {
    targetKey: 'COMET_CRASH',
    name: 'Comet Crater Impact [FUSION]',
    desc: 'Merge Launcher + Dive Kick into a skyward launch and blazing meteor ground slam (Consumes both skills).'
  },
  'DASH+SWEEP': {
    targetKey: 'PHANTOM_SLIDE',
    name: 'Phantom Ghost Slide [FUSION]',
    desc: 'Merge Dash + Sweep into a phase-shifting slide that passes through foes to sweep legs (Consumes both skills).'
  },
  'BLOCK+PARRY': {
    targetKey: 'AEGIS_REFLECT',
    name: 'Aegis Divine Counter [FUSION]',
    desc: 'Merge Block + Parry into an indestructible aegis that blocks 100% and reflects damage back (Consumes both skills).'
  }
};

const APEX_UPGRADES_CATALOG = {
  QUICK_JAB: {
    name: 'Zenith Flash Jab [APEX]',
    desc: '1f startup, 24 pure damage, extended reach, +12f Frame Advantage.',
    buffs: { startup: 1, damage: 24, range: 95, hitstun: 24 }
  },
  HEAVY_SLASH: {
    name: 'Sovereign Cleave [APEX]',
    desc: 'Extreme 52 damage, Super-Armor during swing, guaranteed double Wall Bounce.',
    buffs: { damage: 52, hasArmor: true, range: 120, knockbackBoost: 50 }
  },
  SWEEP: {
    name: 'Tectonic Quake Sweep [APEX]',
    desc: '34 damage, trips opponent into a massive 35f knockdown state.',
    buffs: { damage: 34, hitstun: 35 }
  },
  LAUNCHER: {
    name: 'Ascension Sky Piercer [APEX]',
    desc: '40 damage, launches opponent into the arena ceiling for prolonged aerial combos.',
    buffs: { damage: 40, launchBoost: 10 }
  },
  DASH: {
    name: 'Omnipresent Flash Step [APEX]',
    desc: '0f recovery, crosses 320px with invulnerability, drops dual blast mines.',
    buffs: { hasMine: true, speedBoost: 8 }
  },
  JUMP: {
    name: 'Sky Sovereign Leap [APEX]',
    desc: 'Complete air freedom: 250px vertical jump with mid-air aim redirection.',
    buffs: { jumpBoost: 10 }
  },
  BLOCK: {
    name: 'Absolute Bastion [APEX]',
    desc: 'Absorbs 100% damage, converts all absorbed damage directly into Super SP.',
    buffs: { blockDamageReduce: 1.0, absorbToSP: true }
  },
  PARRY: {
    name: 'Temporal Stasis Parry [APEX]',
    desc: '14f parry window. Freezes opponent in stasis for 40 frames on success.',
    buffs: { parryWindow: 14, stasisFreeze: 40 }
  },
  KI_BLAST: {
    name: 'Nova Sun Cannon [APEX]',
    desc: 'Fires massive piercing solar orb dealing 55 damage with explosive impact.',
    buffs: { damage: 55, projectileRadius: 22 }
  },
  DRAGON_UPPER: {
    name: 'Emperor Dragon Ascendant [APEX]',
    desc: '75 colossal damage, massive vortex pulls entire arena into the strike.',
    buffs: { damage: 75, range: 140 }
  },
  JUDGMENT_CUT: {
    name: 'Judgment Cut: Omniverse [APEX]',
    desc: 'Spawns 4 intersecting reality rifts dealing 65 damage across screen.',
    buffs: { damage: 65, riftRadius: 100 }
  },
  DIVE_KICK: {
    name: 'Starlight Impact [APEX]',
    desc: '45 damage, creates a seismic shockwave across floor on impact.',
    buffs: { damage: 45, quakeFloor: true }
  },
  WHIRLWIND: {
    name: 'Cataclysm Vortex [APEX]',
    desc: '6 rapid slices, 58 damage, draws all airborne and ground foes in.',
    buffs: { damage: 58, range: 140, multiHitCount: 6, hitInterval: 2, activeFrames: 14 }
  },
  METEOR_STRIKE: {
    name: 'Cataclysmic Comet Fist [APEX]',
    desc: 'Unstoppable 60 damage punch with permanent Super Armor and 1f startup.',
    buffs: { damage: 60, startup: 1, hasArmor: true }
  },
  LIGHTNING_PALM: {
    name: 'Raikiri God Palm [APEX]',
    desc: '2f startup, 36 damage, inflicts 45f frame advantage paralysis.',
    buffs: { startup: 2, damage: 36, hitstun: 45 }
  },
  SHADOW_TELEPORT: {
    name: 'Godspeed Blink [APEX]',
    desc: '0 SP cost, grants 12 frames of invulnerability and strikes on exit.',
    buffs: { superCost: 0, postInvuln: 12, exitStrike: 20 }
  }
};

if (typeof window !== 'undefined') {
  window.FUSION_RECIPES = FUSION_RECIPES;
  window.APEX_UPGRADES_CATALOG = APEX_UPGRADES_CATALOG;
}
if (typeof module !== 'undefined') {
  module.exports = { FUSION_RECIPES, APEX_UPGRADES_CATALOG };
}


