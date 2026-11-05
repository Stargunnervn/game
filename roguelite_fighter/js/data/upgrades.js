// MOVE UPGRADE DEFINITIONS (EVERY SKILL HAS AN EX UPGRADE)
const MOVE_UPGRADES_CATALOG = {
  // ── BASE MOVES UPGRADES ──
  QUICK_JAB: {
    name: 'Swift Flash Jab',
    desc: 'Startup reduced to 2f, Damage increased to 15, extended reach.',
    buffs: { startup: 2, damage: 15, range: 85 }
  },
  HEAVY_SLASH: {
    name: 'Excalibur Cleave',
    desc: 'Damage increased to 36, massive knockback with guaranteed Wall Bounce.',
    buffs: { damage: 36, range: 110, knockbackBoost: 40 }
  },
  SWEEP: {
    name: 'Quake Sweep',
    desc: 'Damage increased to 24, trip creates +14f frame advantage.',
    buffs: { damage: 24, hitstun: 32 }
  },
  LAUNCHER: {
    name: 'Sky Sever Launcher',
    desc: 'Damage increased to 28, extreme upward velocity for prolonged air juggles.',
    buffs: { damage: 28, launchBoost: 6 }
  },
  DASH: {
    name: 'Warp Blitz Dash',
    desc: 'Leaves an electrified decoy trap that detonates for 20 bonus damage.',
    buffs: { hasMine: true, speedBoost: 4 }
  },
  JUMP: {
    name: 'Gravity Leap',
    desc: 'Higher altitude and faster airborne recovery frames.',
    buffs: { jumpBoost: 5 }
  },
  BLOCK: {
    name: 'Fortress Guard',
    desc: 'Absorbs 95% damage and reflects 14 unblockable damage back at attacker.',
    buffs: { blockDamageReduce: 0.95, reflectDmg: 14 }
  },
  PARRY: {
    name: 'Mirror Counter',
    desc: 'Parry window expanded to 12f. Successful parry restores +25 HP and 50 SP.',
    buffs: { parryWindow: 12, parryHeal: 25 }
  },
  KI_BLAST: {
    name: 'Twin Hadou Blast',
    desc: 'Fires dual twin energy projectiles dealing 40 total damage.',
    buffs: { dualProjectile: true, damage: 40 }
  },
  DRAGON_UPPER: {
    name: 'God Dragon Uppercut',
    desc: 'Damage increased to 60 with expanded vacuum vortex radius.',
    buffs: { damage: 60, range: 115 }
  },

  // ── UNLOCKABLE ATTACKS UPGRADES ──
  JUDGMENT_CUT: {
    name: 'Judgment Cut: End',
    desc: 'Damage increased to 50, spatial slice radius expanded to 80px.',
    buffs: { damage: 50, riftRadius: 80 }
  },
  DIVE_KICK: {
    name: 'Meteor Falcon Dive',
    desc: 'Damage increased to 34, causes floor quake on landing.',
    buffs: { damage: 34, quakeFloor: true }
  },
  WHIRLWIND: {
    name: 'Tempest Cyclone',
    desc: 'Delivers 5 rapid slices with doubled vacuum pull strength, 42 damage.',
    buffs: { damage: 42, range: 120 }
  },
  METEOR_STRIKE: {
    name: 'Armored Titan Blow',
    desc: 'Damage increased to 48, absorbs all hits during startup with Super Armor.',
    buffs: { damage: 48, hasArmor: true, knockback: 35 }
  },
  LIGHTNING_PALM: {
    name: 'Godspeed Thunder Palm',
    desc: 'Blazing 3f startup dealing 28 damage and shocking for 34f frame advantage.',
    buffs: { startup: 3, damage: 28, hitstun: 34 }
  },
  GROUND_POUND: {
    name: 'Tectonic Earth Shaker',
    desc: 'Massive floor quake shockwave dealing 40 damage and knocking airborne foes down.',
    buffs: { damage: 40, range: 160 }
  },
  BLADE_COUNTER: {
    name: 'Phantom Riposte Slash',
    desc: 'Counter window grants invulnerability and strikes for 36 critical damage.',
    buffs: { damage: 36, isInvuln: true }
  },
  FIRE_BURST: {
    name: 'Inferno Supernova Burst',
    desc: 'Combusts a roaring firestorm dealing 46 damage with burning damage over time.',
    buffs: { damage: 46, range: 130 }
  },

  // ── UNLOCKABLE MOVEMENT UPGRADES ──
  SHADOW_TELEPORT: {
    name: 'Void Blink',
    desc: 'SP cost reduced to 10 SP and grants 8 frames of invulnerability on arrival.',
    buffs: { superCost: 10, postInvuln: 8 }
  },
  SUPER_DASH: {
    name: 'Hyper Sonic Blitz',
    desc: 'Dash velocity doubled, travels across screen with 32 damage collision impact.',
    buffs: { damage: 32, speedBoost: 12 }
  },
  DOUBLE_JUMP: {
    name: 'Ascension Sky Leap',
    desc: 'Leap to highest elevation and grants free mid-air aim redirection.',
    buffs: { jumpBoost: 8 }
  },
  GHOST_STEP: {
    name: 'Phantom Phase Step',
    desc: 'SP cost reduced to 5 SP and leaves the enemy stunned for +15f Frame Advantage.',
    buffs: { superCost: 5, hitstunBonus: 15 }
  },
  AIR_RECOVERY: {
    name: 'Divine Sky Ukemi',
    desc: 'Cancels hitstun with extended invulnerability, restores +15 HP and grants +20 SP on air tech.',
    buffs: { isAirTech: true, isInvuln: true, healOnTech: 15, superMeterBonus: 20 }
  },

  // ── NEW ADVANCED SKILLS UPGRADES ──
  SOUL_REAP: {
    name: 'Grim Harbinger Reap',
    desc: 'Scythe blade expands dealing 44 damage and siphoning 40% of damage directly as health.',
    buffs: { damage: 44, siphonRatio: 0.40, range: 130 }
  },
  CHRONO_STASIS: {
    name: 'Absolute Zero Stasis',
    desc: 'Expanded stasis dome freezes opponent in absolute temporal zero for 50 frames.',
    buffs: { damage: 28, riftRadius: 75, stasisFreeze: 50 }
  },
  PHOENIX_KICK: {
    name: 'Blazing Phoenix Ascendant',
    desc: 'Ignites blazing phoenix aura dealing 36 damage with extra ceiling launch height.',
    buffs: { damage: 36, launchBoost: 6 }
  },
  SHADOW_PULL: {
    name: 'Singularity Event Horizon',
    desc: 'Collapsing gravity singularity deals 32 damage and violently yanks target across screen into 35f stun.',
    buffs: { damage: 32, range: 350, hitstun: 35 }
  },

  // ── HYBRID FUSION EX UPGRADES ──
  THUNDER_GALE: {
    name: 'Thunder Gale Tempest EX',
    desc: 'Electrified cyclone punches deal 78 damage with +35px extended shockwave reach.',
    buffs: { damage: 78, range: 175, hitstun: 35 }
  },
  VOID_CLEAVE: {
    name: 'Dimensional Void Cleave EX',
    desc: 'Tears 4 consecutive reality rifts, dealing 92 damage through armor.',
    buffs: { damage: 92, range: 250, hitstun: 40 }
  },
  COMET_CRASH: {
    name: 'Comet Crater Impact EX',
    desc: 'Seismic impact crater radius expanded by +50px, dealing 90 damage.',
    buffs: { damage: 90, range: 170, hitstun: 40 }
  },
  PHANTOM_SLIDE: {
    name: 'Phantom Ghost Slide EX',
    desc: 'Pass-through glide velocity increased by 35%, sweep damage increased to 56.',
    buffs: { damage: 56, speedBoost: 7, hitstun: 35 }
  },
  AEGIS_REFLECT: {
    name: 'Aegis Divine Counter EX',
    desc: 'Sacred aegis blocks 100% damage and reflects 150% back at the attacker.',
    buffs: { reflectPercent: 1.5, parryHeal: 25 }
  },
  SOLAR_SUPERNOVA: {
    name: 'Infernal Supernova Fist EX',
    desc: 'Supernova meteor fist deals 105 damage and leaves a lingering scorch zone.',
    buffs: { damage: 105, radius: 120, hasSuperArmor: true }
  },
  TEMPEST_QUAKE: {
    name: 'Tectonic Tempest Vortex EX',
    desc: 'Vacuum pull radius increased to 260px, twin seismic shocks deal 94 damage.',
    buffs: { damage: 94, pullRadius: 260, hitstun: 38 }
  },
  RAIKIRI_WARP: {
    name: 'Thunder God Flash Blitz EX',
    desc: 'Warp behind foe dealing 85 lightning damage with 36f paralysis stun.',
    buffs: { damage: 85, hitstun: 36, startup: 1 }
  },
  MIRAGE_RIPOSTE: {
    name: 'Phantom Mirage Counter EX',
    desc: 'Counter window expanded to 20 frames, critical counter slash deals 100 damage.',
    buffs: { damage: 100, counterWindow: 20, isInvuln: true }
  },
  VALKYRIE_ASCENT: {
    name: 'Phoenix Rebirth Skyward EX',
    desc: 'Breaks hitstun on ground or air, refunds +20 SP on trigger, deals 74 damage.',
    buffs: { damage: 74, isAirTech: true, superMeterBonus: 20, isInvuln: true }
  }
};

if (typeof window !== 'undefined') window.MOVE_UPGRADES_CATALOG = MOVE_UPGRADES_CATALOG;
if (typeof module !== 'undefined') module.exports = { MOVE_UPGRADES_CATALOG };


