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
  },
  'FIRE_BURST+METEOR_STRIKE': {
    targetKey: 'SOLAR_SUPERNOVA',
    name: 'Infernal Supernova Fist [FUSION]',
    desc: 'Merge Fire Burst + Meteor Blow into a cataclysmic flame-infused meteorite punch with Super Armor (Consumes both skills).'
  },
  'GROUND_POUND+WHIRLWIND': {
    targetKey: 'TEMPEST_QUAKE',
    name: 'Tectonic Tempest Vortex [FUSION]',
    desc: 'Merge Ground Pound + Whirlwind into a vacuum cyclone that violently crashes down into dual seismic shockwaves (Consumes both skills).'
  },
  'LIGHTNING_PALM+SHADOW_TELEPORT': {
    targetKey: 'RAIKIRI_WARP',
    name: 'Thunder God Flash Blitz [FUSION]',
    desc: 'Merge Thunder Palm + Shadow Blink into an instant teleport behind foe followed by a 1f paralysis shock strike (Consumes both skills).'
  },
  'BLADE_COUNTER+SUPER_DASH': {
    targetKey: 'MIRAGE_RIPOSTE',
    name: 'Phantom Mirage Counter [FUSION]',
    desc: 'Merge Blade Counter + Rocket Dash into a supersonic cross-strike with full invulnerability countering attacks for critical damage (Consumes both skills).'
  },
  'AIR_RECOVERY+DRAGON_UPPER': {
    targetKey: 'VALKYRIE_ASCENT',
    name: 'Phoenix Rebirth Skyward [FUSION]',
    desc: 'Merge Air Recovery + Rising Dragon into the ultimate comeback: cancel hitstun anywhere and erupt into a blazing dragon uppercut (Consumes both skills).'
  },
  'GLACIAL_SPIKE+FIRE_BURST': {
    targetKey: 'FROSTFIRE_BURST',
    name: 'Frostfire Thermonuclear Burst [FUSION]',
    desc: 'Merge Frost Spike + Fire Burst into freezing crystal rifts followed by a 90 damage thermo-steam explosion (Consumes both skills).'
  },
  'SHADOW_PULL+VOID_CLEAVE': {
    targetKey: 'EVENT_HORIZON_SLASH',
    name: 'Singularity Event Horizon Slash [FUSION]',
    desc: 'Merge Shadow Pull + Void Cleave into a black hole gravity pull followed by a 94 damage unblockable dimensional rift slash (Consumes both skills).'
  },
  'CHRONO_STASIS+JUDGMENT_CUT': {
    targetKey: 'CHRONO_JUDGMENT',
    name: 'Absolute Chrono Judgment [FUSION]',
    desc: 'Merge Chrono Stasis + Judgment Cut into a 35f temporal time-freeze while carving 8 invisible slashes for 96 damage (Consumes both skills).'
  },
  'LIGHTNING_PALM+METEOR_STRIKE': {
    targetKey: 'THUNDER_METEOR',
    name: 'Thunder God Cataclysm Meteor [FUSION]',
    desc: 'Merge Thunder Palm + Meteor Blow into an electrified hammer fist with Super Armor dealing 92 seismic lightning damage (Consumes both skills).'
  },
  'BLOOD_RUSH+SOUL_REAP': {
    targetKey: 'CARMINE_HARVEST',
    name: 'Carmine Blood Scythe Harvest [FUSION]',
    desc: 'Merge Blood Rush + Soul Reap into an invulnerable 1f crimson scythe execution dealing 86 damage and siphoning 60% health (Consumes both skills).'
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
  },
  AIR_RECOVERY: {
    name: 'Celestial Immortality Tech [APEX]',
    desc: '0f startup, 18f full invulnerability, restores 25 HP and 30 SP, bursts 28 damage shockwave.',
    buffs: { damage: 28, isInvuln: true, healOnTech: 25, superMeterBonus: 30, shockwaveRadius: 100 }
  },
  GROUND_POUND: {
    name: 'Earthshaker Cataclysm [APEX]',
    desc: 'Colossal 55 damage screen-wide seismic rupture tripping all grounded foes into 40f knockdown.',
    buffs: { damage: 55, range: 220, hitstun: 40, is360: true }
  },
  BLADE_COUNTER: {
    name: 'Omniscient Mirage Counter [APEX]',
    desc: '1f startup, full invulnerability during counter window, executes counter-cleave for 58 critical damage.',
    buffs: { startup: 1, damage: 58, isInvuln: true, hitstun: 35 }
  },
  FIRE_BURST: {
    name: 'Prometheus Supernova Core [APEX]',
    desc: 'Explodes a colossal solar corona dealing 62 damage with massive blast radius.',
    buffs: { damage: 62, range: 160 }
  },
  SUPER_DASH: {
    name: 'Hyperion Sonic Godspeed [APEX]',
    desc: 'Crosses entire screen with 0f lag and permanent invulnerability, dealing 48 collision impact damage.',
    buffs: { damage: 48, speedBoost: 16, isInvuln: true }
  },
  DOUBLE_JUMP: {
    name: 'Cosmic Sovereign Leap [APEX]',
    desc: 'Infinite aerial redirection, leaps 280px into the stratosphere and resets all aerial mobility limits.',
    buffs: { jumpBoost: 14, freeAirAim: true }
  },
  GHOST_STEP: {
    name: 'Omnipresent Shadow Shift [APEX]',
    desc: '0 SP cost, teleports behind foe instantly and inflicts 30f backstab paralysis stun.',
    buffs: { superCost: 0, hitstunBonus: 30, moveDist: 240 }
  },
  SOUL_REAP: {
    name: 'Abyssal Thanatos Scythe [APEX]',
    desc: '65 pure piercing damage through all shields, siphons 50% damage dealt as health directly.',
    buffs: { damage: 65, siphonRatio: 0.50, range: 150 }
  },
  CHRONO_STASIS: {
    name: 'Chronos Absolute Continuum [APEX]',
    desc: 'Freezes entire screen time in stasis for 60 frames, completely paralyzing the opponent.',
    buffs: { damage: 40, riftRadius: 130, stasisFreeze: 60 }
  },
  PHOENIX_KICK: {
    name: 'Vermilion Phoenix God Kick [APEX]',
    desc: '1f startup, 52 flaming damage, launches opponent to ceiling and ignites arena floor.',
    buffs: { startup: 1, damage: 52, launchBoost: 10, burnFloor: true }
  },
  SHADOW_PULL: {
    name: 'Black Hole Singularity [APEX]',
    desc: 'Spawns inescapable gravitational event horizon dealing 50 damage and pulling opponent into zero spacing.',
    buffs: { damage: 50, range: 450, hitstun: 45 }
  },

  // ── 4 NEW ADVANCED BASE MOVES APEX MASTERY ──
  GLACIAL_SPIKE: {
    name: 'Absolute Zero Cocytus Glacier [APEX]',
    desc: '1f startup, freezes whole arena in crystalline glacier spikes for 60 damage and 50f stasis.',
    buffs: { startup: 1, damage: 60, range: 350, hitstun: 50 }
  },
  SONIC_PALM: {
    name: 'Emperor Resonance Null-Palm [APEX]',
    desc: '1f startup, 65 pure unblockable damage, acoustic shock shatters all armor and blocks.',
    buffs: { startup: 1, damage: 65, range: 130, unblockable: true, hitstun: 42 }
  },
  GRAVITY_CRUSH: {
    name: 'Hyper-Graviton Supercluster [APEX]',
    desc: '80 damage crushing downspike, launches opponent into high ceiling bounce with lingering gravity well.',
    buffs: { damage: 80, range: 240, spikesDown: true, hitstun: 45 }
  },
  BLOOD_RUSH: {
    name: 'Asura Bloodfiend Onslaught [APEX]',
    desc: '0f startup, 75 damage, complete invulnerability throughout dash with +40 SP refund.',
    buffs: { startup: 0, damage: 75, isInvuln: true, superMeterBonus: 40, speedBoost: 12 }
  }
};

if (typeof window !== 'undefined') {
  window.FUSION_RECIPES = FUSION_RECIPES;
  window.APEX_UPGRADES_CATALOG = APEX_UPGRADES_CATALOG;
}
if (typeof module !== 'undefined') {
  module.exports = { FUSION_RECIPES, APEX_UPGRADES_CATALOG };
}


