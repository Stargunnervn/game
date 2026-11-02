/**
 * ============================================================================
 * YOMI ROGUE: Tactical Simultaneous Turn-Based Fighting Roguelite
 * Inspired by Your Only Move Is Hustle (YOMI Hustle)
 * ============================================================================
 */

// ── 1. PROCEDURAL SOUND FX (Web Audio API) ──────────────────────────────────
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPunch(pitch = 140) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playHeavySlash() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.22);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playParry() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.35);
    gain.gain.setValueAtTime(0.65, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playDash() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playWallBounce() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playSpecial() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.3);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  playTeleport() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playSpatialSlash() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.28);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  }

  playLockIn() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.1);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playUpgradeFanfare() {
    if (!this.enabled || !this.ctx) return;
    const notes = [440.00, 554.37, 659.25, 880.00];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  playFanfare() {
    if (!this.enabled || !this.ctx) return;
    const notes = [329.63, 440.00, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.1;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }

  playWeakpoint() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.12);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playCoin() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.2, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.18);
    });
  }
}

const SFX = new SoundFX();

// ── 2. MOVE DEFINITIONS & UPGRADED DATA ──────────────────────────────────────
const MOVES = {
  // BASE MOVEMENT
  STEP_FWD: {
    name: 'Step Forward',
    desc: 'Micro-step forward (+1 Frame Advantage on neutral)',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 12,
    moveDist: 85,
    startup: 0,
    damage: 0,
    superCost: 0
  },
  STEP_BACK: {
    name: 'Step Backward',
    desc: 'Micro-retreat backward to reset spacing',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 12,
    moveDist: -85,
    startup: 0,
    damage: 0,
    superCost: 0
  },
  JUMP: {
    name: 'Tactical Jump',
    desc: 'Leap along 360° aim vector (evade sweeps or gain aerial height)',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 20,
    isOmni: true,
    aimable: true,
    startup: 0,
    damage: 0,
    superCost: 0
  },
  DASH: {
    name: 'Omni Phantom Dash',
    desc: 'High-speed 360° air/ground blitz along aim vector with invulnerability',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 15,
    isOmni: true,
    aimable: true,
    isInvuln: true,
    startup: 0,
    damage: 0,
    superCost: 0
  },

  // BASE DEFENSE
  BLOCK: {
    name: 'Guard Stance',
    desc: 'Absorbs 80% incoming damage and resists hitstun',
    type: 'DEFENSE',
    category: 'defense',
    duration: 16,
    blockDamageReduce: 0.8,
    startup: 0,
    damage: 0,
    superCost: 0
  },
  PARRY: {
    name: 'Instant Parry',
    desc: 'Tight window. Nullifies hits and stuns opponent heavily',
    type: 'DEFENSE',
    category: 'defense',
    duration: 14,
    parryWindow: 8,
    startup: 0,
    damage: 0,
    superCost: 0
  },

  // BASE ATTACKS
  QUICK_JAB: {
    name: 'Quick Jab',
    desc: 'Ultra fast 3f startup. Air or ground punch/thrust',
    type: 'ATTACK',
    category: 'attack',
    duration: 15,
    startup: 3,
    activeFrames: 4,
    range: 70,
    damage: 8,
    hitstun: 16,
    aimable: true,
    superCost: 0
  },
  HEAVY_SLASH: {
    name: 'Heavy Blade Slash',
    desc: 'High damage 7f strike. Punishes whiffs and slices along aim angle',
    type: 'ATTACK',
    category: 'attack',
    duration: 24,
    startup: 7,
    activeFrames: 5,
    range: 95,
    damage: 22,
    hitstun: 24,
    aimable: true,
    superCost: 0
  },
  SWEEP: {
    name: 'Low Sweep',
    desc: 'Low leg sweep or mid-air crescent arc that trips opponents',
    type: 'ATTACK',
    category: 'attack',
    duration: 18,
    startup: 5,
    activeFrames: 4,
    range: 85,
    damage: 14,
    hitstun: 20,
    aimable: true,
    superCost: 0
  },
  LAUNCHER: {
    name: 'Sky Launcher',
    desc: 'Launches opponent airborne along aim angle for aerial juggles',
    type: 'ATTACK',
    category: 'attack',
    duration: 26,
    startup: 9,
    activeFrames: 6,
    range: 75,
    damage: 18,
    hitstun: 32,
    launchesAir: true,
    aimable: true,
    superCost: 0
  },

  // BASE SPECIALS
  KI_BLAST: {
    name: 'Ki Blast',
    desc: 'Fires energy projectile along 360° aim vector',
    type: 'SPECIAL',
    category: 'attack',
    duration: 22,
    startup: 8,
    projectile: true,
    aimable: true,
    damage: 24,
    superCost: 30
  },
  DRAGON_UPPER: {
    name: 'Rising Dragon',
    desc: 'Devastating anti-air tornado spinning uppercut',
    type: 'SPECIAL',
    category: 'attack',
    duration: 32,
    startup: 6,
    activeFrames: 12,
    range: 85,
    damage: 42,
    jumpY: -13,
    hitstun: 35,
    superCost: 60
  },

  // UNLOCKABLE ATTACK SKILLS
  JUDGMENT_CUT: {
    name: 'Judgment Cut',
    desc: 'Spatial dimensional distortion slash at aimed coordinate',
    type: 'SPECIAL',
    category: 'attack',
    duration: 24,
    startup: 7,
    activeFrames: 8,
    range: 160,
    damage: 32,
    hitstun: 32,
    isSpatial: true,
    aimable: true,
    superCost: 35
  },
  DIVE_KICK: {
    name: 'Falcon Dive Kick',
    desc: 'Downward plunging diagonal kick that spikes opponents into the floor',
    type: 'ATTACK',
    category: 'attack',
    duration: 18,
    startup: 5,
    activeFrames: 8,
    range: 95,
    damage: 22,
    hitstun: 26,
    spikesDown: true,
    aimable: true,
    superCost: 0
  },
  WHIRLWIND: {
    name: 'Cyclone Blade',
    desc: '360° spinning cyclone strike that vacuums foes in',
    type: 'ATTACK',
    category: 'attack',
    duration: 22,
    startup: 5,
    activeFrames: 12,
    range: 90,
    damage: 24,
    hitstun: 24,
    is360: true,
    superCost: 20
  },
  METEOR_STRIKE: {
    name: 'Meteor Blow',
    desc: 'Armored heavy forward lunging punch. Absorbs light hits',
    type: 'ATTACK',
    category: 'attack',
    duration: 28,
    startup: 9,
    activeFrames: 6,
    range: 110,
    damage: 34,
    hitstun: 34,
    hasArmor: true,
    superCost: 25
  },
  LIGHTNING_PALM: {
    name: 'Thunder Palm',
    desc: 'Piercing electrifying palm strike with intense 28f frame stun',
    type: 'ATTACK',
    category: 'attack',
    duration: 16,
    startup: 4,
    activeFrames: 4,
    range: 75,
    damage: 16,
    hitstun: 28,
    superCost: 15
  },

  // UNLOCKABLE MOVEMENT SKILLS
  SHADOW_TELEPORT: {
    name: 'Shadow Blink',
    desc: 'Instant teleportation along the 360° aim wheel vector',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 12,
    moveDist: 160,
    isTeleport: true,
    isInvuln: true,
    aimable: true,
    startup: 0,
    damage: 0,
    superCost: 20
  },
  SUPER_DASH: {
    name: 'Hyper Rocket Dash',
    desc: 'Extreme-velocity blitz across arena along 360° aim angle',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 16,
    moveDist: 260,
    isInvuln: true,
    aimable: true,
    startup: 0,
    damage: 0,
    superCost: 0
  },
  DOUBLE_JUMP: {
    name: 'Sky Leap',
    desc: 'High-power directional jump to maneuver over attacks in air or ground',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 18,
    jumpY: -15,
    moveDist: 90,
    aimable: true,
    startup: 0,
    damage: 0,
    superCost: 0
  },
  // HYBRID FUSION MOVES (UNLOCKED VIA SKILL BREAKTHROUGH)
  THUNDER_GALE: {
    name: 'Thunder Gale Barrage',
    desc: 'Rapid 4-hit storm of electric punches that release piercing shockwaves across the screen.',
    type: 'ATTACK',
    category: 'attack',
    startup: 2,
    activeFrames: 6,
    duration: 14,
    damage: 34,
    hitstun: 26,
    knockback: 18,
    range: 130,
    superCost: 20,
    isFusion: true
  },
  VOID_CLEAVE: {
    name: 'Dimensional Void Cleave',
    desc: 'Space-rending greatsword slash that opens 3 slicing dimensional rifts along its trajectory.',
    type: 'ATTACK',
    category: 'attack',
    startup: 5,
    activeFrames: 8,
    duration: 18,
    damage: 54,
    hitstun: 35,
    knockback: 35,
    range: 160,
    superCost: 35,
    isSpatial: true,
    isFusion: true
  },
  COMET_CRASH: {
    name: 'Comet Crater Impact',
    desc: 'Sky launch into immediate downward flaming meteor slam that craters the arena floor.',
    type: 'ATTACK',
    category: 'attack',
    startup: 5,
    activeFrames: 7,
    duration: 16,
    damage: 48,
    hitstun: 30,
    launchY: -16,
    spikesDown: true,
    knockback: 30,
    range: 110,
    superCost: 25,
    isFusion: true
  },
  PHANTOM_SLIDE: {
    name: 'Phantom Ghost Slide',
    desc: 'Hyper-speed low slide passing through foe to sweep legs from behind (Guaranteed Weakpoint Hit).',
    type: 'MOVEMENT',
    category: 'movement',
    startup: 2,
    activeFrames: 6,
    duration: 14,
    moveDist: 200,
    damage: 26,
    hitstun: 28,
    superCost: 15,
    isFusion: true
  },
  AEGIS_REFLECT: {
    name: 'Aegis Divine Counter',
    desc: 'Indestructible geometric shield that absorbs 100% and immediately reflects full damage back.',
    type: 'DEFENSE',
    category: 'defense',
    startup: 0,
    activeFrames: 10,
    duration: 14,
    damage: 0,
    superCost: 10,
    isFusion: true
  }
};

// ── 3. MOVE UPGRADE DEFINITIONS (EVOLVED MOVES ★) ───────────────────────────
const MOVE_UPGRADES_CATALOG = {
  QUICK_JAB: {
    name: 'Swift Flash Jab ★',
    desc: 'Startup reduced to 2f, Damage increased to 15, extended reach.',
    buffs: { startup: 2, damage: 15, range: 85 }
  },
  HEAVY_SLASH: {
    name: 'Excalibur Cleave ★',
    desc: 'Damage increased to 36, massive knockback with guaranteed Wall Bounce.',
    buffs: { damage: 36, range: 110, knockbackBoost: 40 }
  },
  SWEEP: {
    name: 'Quake Sweep ★',
    desc: 'Damage increased to 24, trip creates +14f frame advantage advantage.',
    buffs: { damage: 24, hitstun: 32 }
  },
  LAUNCHER: {
    name: 'Sky Sever Launcher ★',
    desc: 'Damage increased to 28, extreme upward velocity for prolonged air juggles.',
    buffs: { damage: 28, launchBoost: 6 }
  },
  DASH: {
    name: 'Warp Blitz Dash ★',
    desc: 'Leaves an electrified decoy trap that detonates for 20 bonus damage.',
    buffs: { hasMine: true, speedBoost: 4 }
  },
  JUMP: {
    name: 'Gravity Leap ★',
    desc: 'Higher altitude and faster airborne recovery frames.',
    buffs: { jumpBoost: 5 }
  },
  BLOCK: {
    name: 'Fortress Guard ★',
    desc: 'Absorbs 95% damage and reflects 14 unblockable damage back at attacker.',
    buffs: { blockDamageReduce: 0.95, reflectDmg: 14 }
  },
  PARRY: {
    name: 'Mirror Counter ★',
    desc: 'Parry window expanded to 12f. Successful parry restores +25 HP and 50 SP.',
    buffs: { parryWindow: 12, parryHeal: 25 }
  },
  KI_BLAST: {
    name: 'Twin Hadou Blast ★',
    desc: 'Fires dual twin energy projectiles dealing 40 total damage.',
    buffs: { dualProjectile: true, damage: 40 }
  },
  DRAGON_UPPER: {
    name: 'God Dragon Uppercut ★',
    desc: 'Damage increased to 60 with expanded vacuum vortex radius.',
    buffs: { damage: 60, range: 115 }
  },
  JUDGMENT_CUT: {
    name: 'Judgment Cut: End ★',
    desc: 'Damage increased to 50, spatial slice radius expanded to 80px.',
    buffs: { damage: 50, riftRadius: 80 }
  },
  DIVE_KICK: {
    name: 'Meteor Falcon Dive ★',
    desc: 'Damage increased to 34, causes floor quake on landing.',
    buffs: { damage: 34, quakeFloor: true }
  },
  WHIRLWIND: {
    name: 'Tempest Cyclone ★',
    desc: 'Delivers 5 rapid slices with doubled vacuum pull strength, 42 damage.',
    buffs: { damage: 42, range: 120 }
  },
  SHADOW_TELEPORT: {
    name: 'Void Blink ★',
    desc: 'Zero SP cost and grants 6 frames of invulnerability on arrival.',
    buffs: { superCost: 0, postInvuln: 6 }
  }
};

// ── 3B. SKILL BREAKTHROUGH: FUSION & APEX ASCENSION ─────────────────────────
const FUSION_RECIPES = {
  'KI_BLAST+QUICK_JAB': {
    targetKey: 'THUNDER_GALE',
    name: 'Thunder Gale Barrage [FUSION 🔮]',
    desc: 'Merge Jab + Ki Blast into a 4-hit electric punching storm with piercing shockwaves.'
  },
  'HEAVY_SLASH+JUDGMENT_CUT': {
    targetKey: 'VOID_CLEAVE',
    name: 'Dimensional Void Cleave [FUSION 🔮]',
    desc: 'Merge Slash + Judgment Cut into a colossal space-rending slash that tears 3 reality rifts.'
  },
  'DIVE_KICK+LAUNCHER': {
    targetKey: 'COMET_CRASH',
    name: 'Comet Crater Impact [FUSION 🔮]',
    desc: 'Merge Launcher + Dive Kick into a skyward launch and blazing meteor ground slam.'
  },
  'DASH+SWEEP': {
    targetKey: 'PHANTOM_SLIDE',
    name: 'Phantom Ghost Slide [FUSION 🔮]',
    desc: 'Merge Dash + Sweep into a phase-shifting slide that passes through foes to sweep their legs from behind.'
  },
  'BLOCK+PARRY': {
    targetKey: 'AEGIS_REFLECT',
    name: 'Aegis Divine Counter [FUSION 🔮]',
    desc: 'Merge Block + Parry into an indestructible aegis that blocks 100% and reflects damage back.'
  }
};

const APEX_UPGRADES_CATALOG = {
  QUICK_JAB: {
    name: 'Zenith Flash Jab [APEX ⚔️]',
    desc: '1f startup, 24 pure damage, extended reach, +12f Frame Advantage.',
    buffs: { startup: 1, damage: 24, range: 95, hitstun: 24 }
  },
  HEAVY_SLASH: {
    name: 'Sovereign Cleave [APEX ⚔️]',
    desc: 'Extreme 52 damage, Super-Armor during swing, guaranteed double Wall Bounce.',
    buffs: { damage: 52, hasArmor: true, range: 120, knockbackBoost: 50 }
  },
  SWEEP: {
    name: 'Tectonic Quake Sweep [APEX ⚔️]',
    desc: '34 damage, trips opponent into a massive 35f knockdown state.',
    buffs: { damage: 34, hitstun: 35 }
  },
  LAUNCHER: {
    name: 'Ascension Sky Piercer [APEX ⚔️]',
    desc: '40 damage, launches opponent into the arena ceiling for prolonged aerial combos.',
    buffs: { damage: 40, launchBoost: 10 }
  },
  DASH: {
    name: 'Omnipresent Flash Step [APEX ⚔️]',
    desc: '0f recovery, crosses 320px with invulnerability, drops dual blast mines.',
    buffs: { hasMine: true, speedBoost: 8 }
  },
  JUMP: {
    name: 'Sky Sovereign Leap [APEX ⚔️]',
    desc: 'Complete air freedom: 250px vertical jump with mid-air aim redirection.',
    buffs: { jumpBoost: 10 }
  },
  BLOCK: {
    name: 'Absolute Bastion [APEX ⚔️]',
    desc: 'Absorbs 100% damage, converts all absorbed damage directly into Super SP.',
    buffs: { blockDamageReduce: 1.0, absorbToSP: true }
  },
  PARRY: {
    name: 'Temporal Stasis Parry [APEX ⚔️]',
    desc: '14f parry window. Freezes opponent in stasis for 40 frames on success.',
    buffs: { parryWindow: 14, stasisFreeze: 40 }
  },
  KI_BLAST: {
    name: 'Nova Sun Cannon [APEX ⚔️]',
    desc: 'Fires massive piercing solar orb dealing 55 damage with explosive impact.',
    buffs: { damage: 55, projectileRadius: 22 }
  },
  DRAGON_UPPER: {
    name: 'Emperor Dragon Ascendant [APEX ⚔️]',
    desc: '75 colossal damage, massive vortex pulls entire arena into the strike.',
    buffs: { damage: 75, range: 140 }
  },
  JUDGMENT_CUT: {
    name: 'Judgment Cut: Omniverse [APEX ⚔️]',
    desc: 'Spawns 4 intersecting reality rifts dealing 65 damage across screen.',
    buffs: { damage: 65, riftRadius: 100 }
  },
  DIVE_KICK: {
    name: 'Starlight Impact [APEX ⚔️]',
    desc: '45 damage, creates a seismic shockwave across floor on impact.',
    buffs: { damage: 45, quakeFloor: true }
  },
  WHIRLWIND: {
    name: 'Cataclysm Vortex [APEX ⚔️]',
    desc: '6 rapid slices, 58 damage, draws all airborne and ground foes in.',
    buffs: { damage: 58, range: 140 }
  },
  SHADOW_TELEPORT: {
    name: 'Godspeed Blink [APEX ⚔️]',
    desc: '0 SP cost, grants 12 frames of invulnerability and strikes on exit.',
    buffs: { superCost: 0, postInvuln: 12, exitStrike: 20 }
  }
};

// ── 4. TIER-BASED ENCOUNTER POOLS (3 FLOORS, DIFFICULTY SCALING) ────────────
const FLOOR_DEFINITIONS = [
  {
    floor: 1,
    name: 'THE OUTSKIRTS',
    stages: 3,
    bgGradient: ['#0d111a', '#161d2d', '#07090f'],
    arenaFloorColor: '#2b3648'
  },
  {
    floor: 2,
    name: 'THE IRON CITADEL',
    stages: 3,
    bgGradient: ['#1a0f1d', '#2c1533', '#0e0811'],
    arenaFloorColor: '#472254'
  },
  {
    floor: 3,
    name: 'THE VOID SANCTUM',
    stages: 3,
    bgGradient: ['#0b1622', '#0d2838', '#050c14'],
    arenaFloorColor: '#1d4860'
  }
];

const ENEMY_POOLS = {
  // Floor 1 (The Outskirts)
  floor1_minions: [
    {
      name: 'BANDIT BRAWLER',
      title: 'Street Pugilist',
      color: '#e76f51',
      hp: 75,
      atk: 7,
      defense: 0,
      moveset: ['QUICK_JAB', 'SWEEP', 'STEP_FWD', 'BLOCK', 'DASH'],
      aiType: 'RUSHDOWN',
      desc: 'Aggressive street fighter with quick jabs.'
    },
    {
      name: 'SPEAR RECRUIT',
      title: 'Pike Guard',
      color: '#f4a261',
      hp: 85,
      atk: 8,
      defense: 0.05,
      moveset: ['HEAVY_SLASH', 'STEP_BACK', 'STEP_FWD', 'BLOCK'],
      aiType: 'COUNTER_ZONER',
      desc: 'Keeps distance with long thrusts.'
    },
    {
      name: 'ROGUE MONK',
      title: 'Shaolin Trainee',
      color: '#e9c46a',
      hp: 80,
      atk: 9,
      defense: 0,
      moveset: ['QUICK_JAB', 'JUMP', 'SWEEP', 'DASH', 'BLOCK'],
      aiType: 'RUSHDOWN',
      desc: 'Agile martial trainee with jumping sweeps.'
    }
  ],
  floor1_bosses: [
    {
      name: 'SHAOLIN MASTER',
      title: 'Rushdown Monk (Floor 1 Boss)',
      color: '#e76f51',
      hp: 140,
      atk: 10,
      defense: 0.1,
      moveset: ['QUICK_JAB', 'SWEEP', 'JUMP', 'DASH', 'BLOCK', 'STEP_FWD', 'LIGHTNING_PALM'],
      aiType: 'RUSHDOWN',
      desc: 'Fierce monk who pressures relentlessly.'
    },
    {
      name: 'WANDERING RONIN',
      title: 'Counter Blademaster (Floor 1 Boss)',
      color: '#d90429',
      hp: 150,
      atk: 12,
      defense: 0.1,
      moveset: ['HEAVY_SLASH', 'PARRY', 'STEP_BACK', 'DASH', 'JUDGMENT_CUT', 'SWEEP'],
      aiType: 'COUNTER_ZONER',
      desc: 'Master of spacing, parrying strikes and slicing from afar.'
    }
  ],

  // Floor 2 (The Iron Citadel)
  floor2_minions: [
    {
      name: 'IRON SENTINEL',
      title: 'Citadel Shieldbearer',
      color: '#8338ec',
      hp: 120,
      atk: 12,
      defense: 0.2,
      moveset: ['BLOCK', 'LAUNCHER', 'STEP_FWD', 'METEOR_STRIKE'],
      aiType: 'SUPER_ARMOR_TANK',
      desc: 'Heavy shield guard that withstands frontal assaults.'
    },
    {
      name: 'KATANA DUELIST',
      title: 'Steel Ronin',
      color: '#b5179e',
      hp: 110,
      atk: 14,
      defense: 0.08,
      moveset: ['HEAVY_SLASH', 'PARRY', 'DASH', 'SWEEP', 'JUDGMENT_CUT'],
      aiType: 'COUNTER_ZONER',
      desc: 'Fast swordsman punishing predictable moves.'
    },
    {
      name: 'SHADOW ACOLYTE',
      title: 'Void Ninja',
      color: '#7209b7',
      hp: 105,
      atk: 13,
      defense: 0.05,
      moveset: ['SHADOW_TELEPORT', 'KI_BLAST', 'DIVE_KICK', 'QUICK_JAB'],
      aiType: 'AMBUSH_NINJA',
      desc: 'Teleporting acolyte striking from angles.'
    }
  ],
  floor2_bosses: [
    {
      name: 'ARMORED COLOSSUS',
      title: 'Iron Juggernaut (Floor 2 Boss)',
      color: '#9d4edd',
      hp: 240,
      atk: 18,
      defense: 0.25,
      moveset: ['METEOR_STRIKE', 'BLOCK', 'LAUNCHER', 'STEP_FWD', 'DASH'],
      aiType: 'SUPER_ARMOR_TANK',
      desc: 'Unstoppable behemoth that launches players into wall bounces.'
    },
    {
      name: 'THUNDER SHINOBI',
      title: 'Lightning Shadow (Floor 2 Boss)',
      color: '#3a0ca3',
      hp: 210,
      atk: 20,
      defense: 0.15,
      moveset: ['SHADOW_TELEPORT', 'DIVE_KICK', 'SUPER_DASH', 'KI_BLAST', 'LIGHTNING_PALM'],
      aiType: 'AMBUSH_NINJA',
      desc: 'Strikes at the speed of sound with airborne dive kicks.'
    }
  ],

  // Floor 3 (The Void Sanctum)
  floor3_minions: [
    {
      name: 'VOID STALKER',
      title: 'Dimensional Phantom',
      color: '#4361ee',
      hp: 160,
      atk: 18,
      defense: 0.15,
      moveset: ['SHADOW_TELEPORT', 'JUDGMENT_CUT', 'DIVE_KICK', 'SUPER_DASH'],
      aiType: 'AMBUSH_NINJA',
      desc: 'Blinks in and out of reality.'
    },
    {
      name: 'CHAOS JUGGERNAUT',
      title: 'Abyssal Titan',
      color: '#3f37c9',
      hp: 190,
      atk: 20,
      defense: 0.25,
      moveset: ['METEOR_STRIKE', 'LAUNCHER', 'BLOCK', 'WHIRLWIND'],
      aiType: 'SUPER_ARMOR_TANK',
      desc: 'Devastating armor and swirling blade vortexes.'
    },
    {
      name: 'GRAND DISCIPLE',
      title: 'Sanctum Monk',
      color: '#4895ef',
      hp: 175,
      atk: 21,
      defense: 0.18,
      moveset: ['DRAGON_UPPER', 'PARRY', 'SUPER_DASH', 'QUICK_JAB', 'LIGHTNING_PALM'],
      aiType: 'GRANDMASTER',
      desc: 'Elite disciple reading advantage and countering attacks.'
    }
  ],
  floor3_final_boss: [
    {
      name: 'GRANDMASTER VANE',
      title: 'Supreme Hustler (Final Boss)',
      color: '#ff0054',
      hp: 360,
      atk: 28,
      defense: 0.25,
      moveset: ['WHIRLWIND', 'JUDGMENT_CUT', 'DRAGON_UPPER', 'PARRY', 'SUPER_DASH', 'METEOR_STRIKE', 'LAUNCHER', 'DIVE_KICK'],
      aiType: 'GRANDMASTER',
      desc: 'Supreme grandmaster who commands space, reads frames, and executes aerial juggles.'
    }
  ]
};

// Fallback legacy array
const OPPONENTS = [
  ...ENEMY_POOLS.floor1_minions,
  ...ENEMY_POOLS.floor1_bosses,
  ...ENEMY_POOLS.floor2_bosses,
  ...ENEMY_POOLS.floor3_final_boss
];

// ── 5. VISUAL PARTICLES, DAMAGE NUMBERS, AND RIFTS ──────────────────────────
class Particle {
  constructor(x, y, vx, vy, color, size, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.life = life;
    this.maxLife = life;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15;
    this.life--;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class DamageText {
  constructor(x, y, text, color = '#fff', isWeakpoint = false) {
    this.x = x + (Math.random() * 20 - 10);
    this.y = y;
    this.text = text;
    this.color = color;
    this.isWeakpoint = isWeakpoint;
    this.life = 48;
    this.maxLife = 48;
    this.vy = -2.5;
  }
  update() {
    this.y += this.vy;
    this.vy *= 0.94;
    this.life--;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
    ctx.font = this.isWeakpoint ? 'bold 22px "Chakra Petch", sans-serif' : 'bold 16px "Chakra Petch", sans-serif';
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = this.isWeakpoint ? '#ffd166' : 'transparent';
    ctx.shadowBlur = this.isWeakpoint ? 12 : 0;
    ctx.strokeText(this.text, this.x, this.y);
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

class Projectile {
  constructor(x, y, vx, vy, isPlayer, damage, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy || 0;
    this.isPlayer = isPlayer;
    this.damage = damage;
    this.color = color;
    this.radius = 12;
    this.active = true;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 30 || this.x > 994 || this.y < 50 || this.y > 550) {
      this.active = false;
    }
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
}

class SpatialRift {
  constructor(x, y, isPlayer, damage, radius = 55) {
    this.x = x;
    this.y = y;
    this.isPlayer = isPlayer;
    this.damage = damage;
    this.radius = radius;
    this.life = 20;
    this.maxLife = 20;
    this.hasHit = false;
  }
  update() {
    this.life--;
  }
  draw(ctx) {
    ctx.save();
    const progress = 1 - (this.life / this.maxLife);
    ctx.globalAlpha = Math.sin(progress * Math.PI);
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * (0.8 + progress * 0.4), 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI / 4) + progress * 2;
      const len = this.radius * 1.1;
      ctx.beginPath();
      ctx.moveTo(this.x - Math.cos(angle) * len, this.y - Math.sin(angle) * len);
      ctx.lineTo(this.x + Math.cos(angle) * len, this.y + Math.sin(angle) * len);
      ctx.stroke();
    }
    ctx.restore();
  }
}

// ── 6. YOMI HUSTLE AIM WHEEL CONTROLLER ──────────────────────────────────────
class AimWheel {
  constructor(canvasId, readoutId, onAngleChange) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.readout = document.getElementById(readoutId);
    this.angleDeg = 0;
    this.isDragging = false;
    this.onAngleChange = onAngleChange;

    this.bindEvents();
    this.draw();
  }

  bindEvents() {
    const handleMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const rad = Math.atan2(dy, dx);
      let deg = Math.round(rad * (180 / Math.PI));
      this.angleDeg = -deg;

      this.updateReadout();
      this.draw();
      if (this.onAngleChange) this.onAngleChange(this.angleDeg);
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      handleMove(e);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) handleMove(e);
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.isDragging = true;
        handleMove(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) {
        handleMove(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  setAngle(deg) {
    this.angleDeg = Math.round(deg);
    this.updateReadout();
    this.draw();
    if (this.onAngleChange) this.onAngleChange(this.angleDeg);
  }

  updateReadout() {
    let dir = 'FWD';
    const a = this.angleDeg;
    if (a >= 68 && a <= 112) dir = 'HIGH';
    else if (a >= 23 && a < 68) dir = 'UP-FWD';
    else if (a > -23 && a < 23) dir = 'FWD';
    else if (a <= -23 && a > -68) dir = 'LOW-FWD';
    else if (a <= -68 && a >= -112) dir = 'DOWN';
    else if (a < -112 && a >= -157) dir = 'LOW-BACK';
    else if (a > 112 && a <= 157) dir = 'UP-BACK';
    else dir = 'BACK';

    const sign = a > 0 ? '+' : '';
    this.readout.innerText = `${sign}${a}° [${dir}]`;
  }

  draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = w / 2 - 4;

    this.ctx.clearRect(0, 0, w, h);

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.fillStyle = '#080d15';
    this.ctx.fill();
    this.ctx.strokeStyle = '#223044';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const tickAngle = (i * Math.PI) / 4;
      const innerR = r - 5;
      this.ctx.beginPath();
      this.ctx.moveTo(cx + Math.cos(tickAngle) * innerR, cy + Math.sin(tickAngle) * innerR);
      this.ctx.lineTo(cx + Math.cos(tickAngle) * r, cy + Math.sin(tickAngle) * r);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    this.ctx.beginPath();
    this.ctx.moveTo(cx - r, cy);
    this.ctx.lineTo(cx + r, cy);
    this.ctx.moveTo(cx, cy - r);
    this.ctx.lineTo(cx, cy + r);
    this.ctx.stroke();

    const rad = -this.angleDeg * (Math.PI / 180);
    const pointerLen = r - 6;
    const px = cx + Math.cos(rad) * pointerLen;
    const py = cy + Math.sin(rad) * pointerLen;

    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 8;
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(px, py);
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    this.ctx.beginPath();
    this.ctx.arc(px, py, 4.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffd166';
    this.ctx.shadowColor = '#ffd166';
    this.ctx.shadowBlur = 6;
    this.ctx.fill();
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fill();
  }
}

// ── 6B. PROCEDURAL MARTIAL ARTS FIGHTER ANIMATOR ────────────────────────────
function renderFighterModel(ctx, f, isPlayer) {
  ctx.save();
  const facing = f.facing || 1;
  const x = f.x;
  const y = f.y;
  const floorY = f.floorY || 470;
  const isAirborne = f.isAirborne || (y < floorY - 5);
  const color = f.color || (isPlayer ? '#00f0ff' : '#ff3366');
  const hitstun = (f.hitstunFrames || 0) > 0;
  const moveKey = f.moveKey || (f.currentMove ? f.currentMove.name : null);
  const moveFrame = f.moveFrame || 0;
  const animTick = f.animTick || 0;

  // Ground contact shadow
  ctx.beginPath();
  const shadowScale = Math.max(0.3, 1 - (floorY - y) / 320);
  ctx.ellipse(x, floorY + 2, 28 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fill();

  // Invulnerability ghosting
  if (f.isInvulnerable) {
    ctx.globalAlpha = 0.5;
  }

  // Afterimages
  if (f.afterimages && f.afterimages.length > 0) {
    f.afterimages.forEach(img => {
      ctx.save();
      ctx.globalAlpha = img.alpha * 0.45;
      ctx.fillStyle = img.color;
      ctx.beginPath();
      ctx.arc(img.x, img.y - 45, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // Procedural pose calculations
  let bobY = Math.sin(animTick * 0.15) * 2.5;
  let headTilt = 0;
  let bodyAngle = 0;
  let lLegAngle = 0.2;
  let rLegAngle = -0.2;
  let lArmAngle = 0.5;
  let rArmAngle = -0.4;
  let punchReach = 0;
  let bladeSlashArc = 0;

  if (hitstun) {
    bodyAngle = -0.32 * facing;
    headTilt = -0.35 * facing;
    bobY = 4;
    lArmAngle = -0.8;
    rArmAngle = -0.6;
  } else if (f.isBlocking || f.isParrying) {
    bodyAngle = -0.1 * facing;
    lArmAngle = 1.2 * facing;
    rArmAngle = 1.0 * facing;
  } else if ((moveKey === 'QUICK_JAB' || moveKey === 'THUNDER_GALE') && moveFrame > 0 && moveFrame <= 7) {
    bodyAngle = 0.22 * facing;
    punchReach = 34 * facing;
    rArmAngle = 1.4 * facing;
  } else if ((moveKey === 'HEAVY_SLASH' || moveKey === 'VOID_CLEAVE') && moveFrame > 0 && moveFrame <= 13) {
    bodyAngle = 0.3 * facing;
    bladeSlashArc = (moveFrame / 13) * Math.PI;
  } else if ((moveKey === 'SWEEP' || moveKey === 'PHANTOM_SLIDE') && moveFrame > 0) {
    bobY = 16;
    lLegAngle = 1.4 * facing;
    rLegAngle = -1.1 * facing;
  } else if ((moveKey === 'LAUNCHER' || moveKey === 'COMET_CRASH' || moveKey === 'DRAGON_UPPER') && moveFrame > 0) {
    bodyAngle = -0.2 * facing;
    rArmAngle = -1.8 * facing;
    bobY = -12;
  } else if (moveKey === 'DIVE_KICK' && moveFrame > 0) {
    bodyAngle = 0.7 * facing;
    rLegAngle = 1.2 * facing;
  } else if (isAirborne) {
    bobY = -5;
    lLegAngle = 0.6;
    rLegAngle = 0.4;
  }

  ctx.translate(x, y - 48 + bobY);
  ctx.rotate(bodyAngle);

  const mainColor = hitstun ? '#ffffff' : color;
  const darkSuit = isPlayer ? '#0f172a' : '#1e1124';
  const accentTrim = isPlayer ? '#38bdf8' : '#fb7185';

  // 1. Back Leg
  ctx.save();
  ctx.strokeStyle = darkSuit;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-4 * facing, 22);
  ctx.lineTo(-4 * facing + Math.sin(rLegAngle) * 24, 46);
  ctx.stroke();
  ctx.fillStyle = mainColor;
  ctx.fillRect(-4 * facing + Math.sin(rLegAngle) * 24 - 3, 44, 8, 5);
  ctx.restore();

  // 2. Back Arm
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-6 * facing, 2);
  ctx.lineTo(-6 * facing + Math.cos(rArmAngle) * 18, 2 + Math.sin(rArmAngle) * 18);
  ctx.stroke();
  ctx.restore();

  // 3. Torso (Martial Gi & Armor)
  ctx.fillStyle = darkSuit;
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(-10, 0, 20, 26, 4);
  ctx.fill();
  ctx.stroke();

  // Belt & Chest Sigil
  ctx.fillStyle = mainColor;
  ctx.fillRect(-8, 8, 16, 4);
  ctx.fillStyle = accentTrim;
  ctx.fillRect(-10, 22, 20, 3.5);

  // 4. Front Leg
  ctx.save();
  ctx.strokeStyle = darkSuit;
  ctx.lineWidth = 6.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(4 * facing, 22);
  ctx.lineTo(4 * facing + Math.sin(lLegAngle) * 25, 46);
  ctx.stroke();
  ctx.fillStyle = mainColor;
  ctx.fillRect(4 * facing + Math.sin(lLegAngle) * 25 - 4, 44, 9, 5);
  ctx.restore();

  // 5. Head & Flowing Scarf
  ctx.save();
  ctx.translate(0, -14);
  ctx.rotate(headTilt);

  ctx.fillStyle = darkSuit;
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Glowing Ninja Visor / Eyes
  ctx.fillStyle = mainColor;
  ctx.shadowColor = mainColor;
  ctx.shadowBlur = 8;
  ctx.fillRect(facing > 0 ? 1 : -7, -3, 7, 3.5);

  // Flowing Scarf in Wind
  ctx.fillStyle = mainColor;
  const scarfWave1 = Math.sin(animTick * 0.2) * 5;
  const scarfWave2 = Math.cos(animTick * 0.25) * 6;
  ctx.beginPath();
  ctx.moveTo(-6 * facing, 0);
  ctx.quadraticCurveTo(-16 * facing, -4 + scarfWave1, -26 * facing, -2 + scarfWave2);
  ctx.lineTo(-24 * facing, 2 + scarfWave2);
  ctx.quadraticCurveTo(-15 * facing, scarfWave1, -6 * facing, 3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 6. Front Arm & Punching Extension
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(6 * facing, 2);
  const fistX = 6 * facing + Math.cos(lArmAngle) * (20 + Math.abs(punchReach)) * facing;
  const fistY = 2 + Math.sin(lArmAngle) * 16;
  ctx.lineTo(fistX, fistY);
  ctx.stroke();

  // Glowing Fist impact ring
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(fistX, fistY, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Blade Slash Arc
  if (bladeSlashArc > 0) {
    ctx.save();
    ctx.strokeStyle = isPlayer ? '#00f0ff' : '#ff3366';
    ctx.shadowColor = isPlayer ? '#00f0ff' : '#ff3366';
    ctx.shadowBlur = 16;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(fistX + 12 * facing, fistY, 45, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();
    ctx.restore();
  }

  // Forcefield Barrier during Block / Parry
  if (f.isBlocking || f.isParrying) {
    ctx.save();
    ctx.strokeStyle = f.isParrying ? '#00f0ff' : '#ffd166';
    ctx.shadowColor = f.isParrying ? '#00f0ff' : '#ffd166';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(18 * facing, 4, 38, -Math.PI / 2.3, Math.PI / 2.3, facing === -1);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
  ctx.restore();
}

// ── 7. TACTICAL FIGHTER CLASS ────────────────────────────────────────────────
class TacticalFighter {
  constructor(name, x, isPlayer, color) {
    this.name = name;
    this.x = x;
    this.floorY = 470;
    this.y = this.floorY;
    this.isPlayer = isPlayer;
    this.color = color;

    this.width = 44;
    this.height = 90;
    this.vx = 0;
    this.vy = 0;
    this.facing = isPlayer ? 1 : -1;

    // Stats
    this.maxHp = 100;
    this.hp = 100;
    this.maxSuper = 100;
    this.superMeter = 0;
    this.atkBonus = 0;
    this.critChance = 0.1;
    this.defenseBonus = 0;

    // Tactical State
    this.currentMove = null;
    this.moveKey = null;
    this.moveFrame = 0;
    this.aimAngle = 0;
    this.isInvulnerable = false;
    this.isParrying = false;
    this.isBlocking = false;
    this.hasArmor = false;
    this.hitstunFrames = 0;
    this.isAirborne = false;

    // Visual trails
    this.afterimages = [];
  }

  spawnAfterimage() {
    this.afterimages.push({
      x: this.x,
      y: this.y,
      facing: this.facing,
      color: this.color,
      alpha: 0.65
    });
    if (this.afterimages.length > 5) this.afterimages.shift();
  }

  executeMove(moveKey, aimDeg = 0) {
    const moveData = engine.getMoveData(moveKey, this.isPlayer);
    if (!moveData) return;

    this.currentMove = moveData;
    this.moveKey = moveKey;
    this.moveFrame = 0;
    this.aimAngle = aimDeg;

    if (moveData.superCost > 0) {
      this.superMeter = Math.max(0, this.superMeter - moveData.superCost);
    }

    const rad = (aimDeg * Math.PI) / 180;

    // ── MOVEMENT RESOLUTION ──
    if (moveKey === 'DASH') {
      SFX.playDash();
      this.spawnAfterimage();
      const dashSpeed = 16.5 + (moveData.speedBoost || 0);
      this.vx = Math.cos(rad) * dashSpeed * this.facing;
      this.vy = -Math.sin(rad) * 14.5;
      if (Math.abs(this.vy) > 2) this.isAirborne = true;

      // Upgraded Dash Spark Trap
      if (moveData.hasMine && this.isPlayer) {
        engine.projectiles.push(new Projectile(this.x, this.y - 40, 0, 0, true, 20, '#ffd166'));
        engine.spawnSparks(this.x, this.y - 40, '#ffd166', 14);
      }
    } else if (moveKey === 'JUMP') {
      SFX.playDash();
      this.spawnAfterimage();
      const jumpPower = (Math.sin(rad) > 0.1 ? Math.sin(rad) * 17 + 2 : 15) + (moveData.jumpBoost || 0);
      this.vy = -jumpPower;
      this.vx = Math.cos(rad) * 9.5 * this.facing;
      this.isAirborne = true;
    } else if (moveKey === 'SUPER_DASH') {
      SFX.playDash();
      this.spawnAfterimage();
      const blitzSpeed = 23;
      this.vx = Math.cos(rad) * blitzSpeed * this.facing;
      this.vy = -Math.sin(rad) * 17;
      if (Math.abs(this.vy) > 2) this.isAirborne = true;
    } else if (moveKey === 'DOUBLE_JUMP') {
      SFX.playDash();
      this.spawnAfterimage();
      this.vy = -16;
      this.vx = Math.cos(rad) * 11 * this.facing;
      this.isAirborne = true;
    } else if (moveKey === 'SHADOW_TELEPORT') {
      SFX.playTeleport();
      engine.spawnSparks(this.x, this.y - 45, '#00f0ff', 16);
      this.x += Math.cos(rad) * 160 * this.facing;
      this.y = Math.min(this.floorY, Math.max(160, this.y - Math.sin(rad) * 140));
      this.isAirborne = this.y < this.floorY;
      engine.spawnSparks(this.x, this.y - 45, '#ffd166', 16);
      if (moveData.postInvuln) this.isInvulnerable = true;
    } else if (moveKey === 'DIVE_KICK') {
      SFX.playDash();
      this.spawnAfterimage();
      this.vx = Math.max(5, Math.abs(Math.cos(rad))) * 9 * this.facing;
      this.vy = 14;
      this.isAirborne = true;
    } else if (moveData.moveDist) {
      this.vx = (moveData.moveDist / moveData.duration) * this.facing;
    }

    if (moveData.jumpY && !['JUMP', 'DOUBLE_JUMP', 'DASH', 'SUPER_DASH'].includes(moveKey)) {
      this.vy = moveData.jumpY;
      this.isAirborne = true;
    }

    // Projectile Spawning
    if (moveData.projectile) {
      const spd = 19;
      const pvx = Math.cos(rad) * spd * this.facing;
      const pvy = -Math.sin(rad) * spd;
      engine.projectiles.push(new Projectile(this.x + this.facing * 35, this.y - 45, pvx, pvy, this.isPlayer, moveData.damage, '#00f0ff'));

      // Upgraded Twin Blast
      if (moveData.dualProjectile) {
        const spreadRad = rad + 0.22;
        const pvx2 = Math.cos(spreadRad) * spd * this.facing;
        const pvy2 = -Math.sin(spreadRad) * spd;
        engine.projectiles.push(new Projectile(this.x + this.facing * 35, this.y - 45, pvx2, pvy2, this.isPlayer, moveData.damage * 0.75, '#ffd166'));
      }
    }

    // Spatial Slash Spawning
    if (moveData.isSpatial) {
      SFX.playSpatialSlash();
      const targetDist = 150;
      const tx = Math.min(960, Math.max(64, this.x + Math.cos(rad) * targetDist * this.facing));
      const ty = Math.min(this.floorY - 20, Math.max(160, (this.y - 45) - Math.sin(rad) * 120));
      engine.spatialRifts.push(new SpatialRift(tx, ty, this.isPlayer, moveData.damage, moveData.riftRadius || 55));
    }

    this.isInvulnerable = !!moveData.isInvuln;
    this.isBlocking = moveKey === 'BLOCK';
    this.isParrying = moveKey === 'PARRY';
    this.hasArmor = !!moveData.hasArmor;

    if (moveData.type === 'SPECIAL' && !moveData.isSpatial) SFX.playSpecial();
  }

  takeHit(dmg, attacker, isHeavy = false, isSpike = false) {
    if (this.isInvulnerable) return 0;

    // PARRY CHECK
    const moveData = this.currentMove || {};
    const parryWin = moveData.parryWindow || 8;
    if (this.isParrying && this.moveFrame <= parryWin) {
      SFX.playParry();
      engine.addScreenShake(8, 15);
      engine.spawnSparks(this.x, this.y - 45, '#00f0ff', 24);
      engine.addDamageText(this.x, this.y - 65, 'PARRY!', '#00f0ff', true);
      this.superMeter = Math.min(this.maxSuper, this.superMeter + 25);

      if (moveData.parryHeal && this.isPlayer) {
        this.hp = Math.min(this.maxHp, this.hp + moveData.parryHeal);
        engine.addDamageText(this.x, this.y - 85, `+${moveData.parryHeal} HP`, '#06d6a0');
      }

      if (attacker) {
        attacker.hitstunFrames = 35;
        attacker.currentMove = null;
      }
      return 0;
    }

    // BLOCK CHECK
    if (this.isBlocking) {
      const blockRate = moveData.blockDamageReduce || 0.8;
      const reduced = Math.max(1, Math.round(dmg * (1 - blockRate)));
      this.hp = Math.max(0, this.hp - reduced);
      this.vx = -this.facing * 3.5;
      SFX.playPunch(90);
      engine.spawnSparks(this.x, this.y - 45, '#ffd166', 8);
      engine.addDamageText(this.x, this.y - 55, `GUARD -${reduced}`, '#7d8b99');

      // Fortress Guard Reflection
      if (moveData.reflectDmg && attacker) {
        attacker.takeHit(moveData.reflectDmg, null, false);
        engine.addDamageText(attacker.x, attacker.y - 60, `${moveData.reflectDmg} REFLECT!`, '#00f0ff', true);
      }
      return reduced;
    }

    // SUPER ARMOR CHECK
    if (this.hasArmor && !isHeavy) {
      const reduced = Math.round(dmg * 0.7);
      this.hp = Math.max(0, this.hp - reduced);
      SFX.playPunch(110);
      engine.spawnSparks(this.x, this.y - 45, '#ffd166', 12);
      engine.addDamageText(this.x, this.y - 60, `ARMORED -${reduced}`, '#ffd166');
      return reduced;
    }

    // FULL IMPACT HIT
    const finalDmg = Math.max(1, Math.round(dmg * (1 - this.defenseBonus)));
    this.hp = Math.max(0, this.hp - finalDmg);

    const aimDeg = attacker ? attacker.aimAngle : 0;
    const rad = (aimDeg * Math.PI) / 180;
    const launchBonus = (attacker && attacker.currentMove && attacker.currentMove.launchBoost) || 0;
    const kbBonus = (attacker && attacker.currentMove && attacker.currentMove.knockbackBoost) || 0;

    if (isSpike || aimDeg < -20) {
      SFX.playHeavySlash();
      engine.addScreenShake(9, 18);
      engine.spawnSparks(this.x, this.floorY, '#ff3366', 26);
      this.hitstunFrames = 26;
      this.vy = 13;
      this.vx = -this.facing * (4 + kbBonus / 10);
    } else if (isHeavy || aimDeg > 20) {
      SFX.playHeavySlash();
      engine.addScreenShake(7, 16);
      engine.spawnSparks(this.x, this.y - 45, '#ff3366', 22);
      this.hitstunFrames = 28;
      this.vy = -10 - Math.sin(rad) * 7 - launchBonus;
      this.isAirborne = true;
      this.vx = -this.facing * (4 + Math.cos(rad) * 4 + kbBonus / 10);
    } else {
      SFX.playPunch(140);
      engine.addScreenShake(3, 8);
      engine.spawnSparks(this.x, this.y - 45, '#ffd166', 14);
      this.hitstunFrames = 18;
      this.vx = -this.facing * (4 + kbBonus / 10);
    }

    this.currentMove = null;
    return finalDmg;
  }

  updateFramePhysics() {
    this.vy += 0.58;
    this.x += this.vx;
    this.y += this.vy;

    // Floor collision
    if (this.y >= this.floorY) {
      if (this.vy > 9) {
        engine.addScreenShake(5, 8);
        engine.spawnSparks(this.x, this.floorY, '#ffffff', 10);
      }
      this.y = this.floorY;
      this.vy = 0;
      this.isAirborne = false;
      this.vx *= 0.82;
    }

    // Wall Bounce
    if (this.x <= 65) {
      this.x = 65;
      if (Math.abs(this.vx) >= 4) {
        SFX.playWallBounce();
        engine.addScreenShake(8, 16);
        engine.spawnSparks(65, this.y - 45, '#00f0ff', 24);
        engine.addDamageText(80, this.y - 65, 'WALL BOUNCE!', '#00f0ff', true);
        this.vx = Math.abs(this.vx) * 0.7;
        this.vy = -6;
        this.isAirborne = true;
      } else {
        this.vx = 0;
      }
    } else if (this.x >= 959) {
      this.x = 959;
      if (Math.abs(this.vx) >= 4) {
        SFX.playWallBounce();
        engine.addScreenShake(8, 16);
        engine.spawnSparks(959, this.y - 45, '#ff3366', 24);
        engine.addDamageText(940, this.y - 65, 'WALL BOUNCE!', '#ff3366', true);
        this.vx = -Math.abs(this.vx) * 0.7;
        this.vy = -6;
        this.isAirborne = true;
      } else {
        this.vx = 0;
      }
    }

    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      this.afterimages[i].alpha *= 0.8;
      if (this.afterimages[i].alpha < 0.05) this.afterimages.splice(i, 1);
    }

    if (this.hitstunFrames > 0) {
      this.hitstunFrames--;
      return;
    }

    if (this.currentMove) {
      this.moveFrame++;
      if (this.moveFrame >= this.currentMove.duration) {
        this.currentMove = null;
        this.isInvulnerable = false;
        this.isParrying = false;
        this.isBlocking = false;
        this.hasArmor = false;
      }
    }
    this.animTick = (this.animTick || 0) + 1;
  }

  draw(ctx) {
    renderFighterModel(ctx, this, this.isPlayer);
  }

  drawGhostPreview(ctx, moveKey, aimDeg = 0) {
    const moveData = engine.getMoveData(moveKey, this.isPlayer);
    if (!moveData) return;

    ctx.save();
    ctx.globalAlpha = 0.38;
    ctx.strokeStyle = this.isPlayer ? '#00f0ff' : '#ff3366';
    ctx.fillStyle = this.isPlayer ? 'rgba(0, 240, 255, 0.16)' : 'rgba(255, 51, 102, 0.16)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    const rad = (aimDeg * Math.PI) / 180;
    let targetX = this.x;
    let targetY = this.y;

    if (moveKey === 'DASH') {
      targetX = this.x + Math.cos(rad) * (220 + (moveData.speedBoost || 0) * 8) * this.facing;
      targetY = Math.min(this.floorY, this.y - Math.sin(rad) * 160);
    } else if (moveKey === 'JUMP') {
      targetX = this.x + Math.cos(rad) * 150 * this.facing;
      targetY = Math.min(this.floorY, this.y - (Math.sin(rad) > 0 ? Math.sin(rad) * 160 : 120));
    } else if (moveKey === 'SUPER_DASH') {
      targetX = this.x + Math.cos(rad) * 300 * this.facing;
      targetY = Math.min(this.floorY, this.y - Math.sin(rad) * 180);
    } else if (moveKey === 'DOUBLE_JUMP') {
      targetX = this.x + Math.cos(rad) * 140 * this.facing;
      targetY = Math.min(this.floorY, this.y - 140);
    } else if (moveKey === 'SHADOW_TELEPORT') {
      targetX = Math.min(960, Math.max(64, this.x + Math.cos(rad) * 160 * this.facing));
      targetY = Math.min(this.floorY, Math.max(160, this.y - Math.sin(rad) * 140));
    } else if (moveKey === 'DIVE_KICK') {
      targetX = this.x + Math.cos(rad) * 120 * this.facing;
      targetY = this.floorY;
    } else {
      targetX = this.x + (moveData.moveDist || 0) * this.facing;
      targetY = this.y + (moveData.jumpY ? moveData.jumpY * 2.5 : 0);
    }

    if (moveData.category === 'movement' || moveKey === 'DIVE_KICK') {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - 45);
      ctx.lineTo(targetX, targetY - 45);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(targetX, targetY - 45, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.roundRect(targetX - this.width / 2, targetY - this.height, this.width, this.height, 6);
    ctx.fill();
    ctx.stroke();

    if (moveKey === 'KI_BLAST') {
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.moveTo(this.x + this.facing * 30, this.y - 45);
      ctx.lineTo(this.x + Math.cos(rad) * 360 * this.facing, (this.y - 45) - Math.sin(rad) * 360);
      ctx.stroke();
    } else if (moveKey === 'JUDGMENT_CUT') {
      const tx = Math.min(960, Math.max(64, this.x + Math.cos(rad) * 150 * this.facing));
      const ty = Math.min(this.floorY - 20, Math.max(160, (this.y - 45) - Math.sin(rad) * 120));
      const r = moveData.riftRadius || 55;
      ctx.beginPath();
      ctx.arc(tx, ty, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#00f0ff';
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tx - r - 10, ty);
      ctx.lineTo(tx + r + 10, ty);
      ctx.moveTo(tx, ty - r - 10);
      ctx.lineTo(tx, ty + r + 10);
      ctx.stroke();
    } else if (moveKey === 'WHIRLWIND') {
      const r = moveData.range || 90;
      ctx.beginPath();
      ctx.arc(targetX, targetY - 45, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffd166';
      ctx.fillStyle = 'rgba(255, 209, 102, 0.18)';
      ctx.fill();
      ctx.stroke();
    } else if (moveData.range) {
      const hbDist = moveData.range;
      const hbX = targetX + Math.cos(rad) * (hbDist * 0.7) * this.facing;
      const hbY = (targetY - 50) - Math.sin(rad) * (hbDist * 0.6);

      ctx.fillStyle = 'rgba(255, 209, 102, 0.25)';
      ctx.strokeStyle = '#ffd166';
      ctx.beginPath();
      ctx.arc(hbX, hbY, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(targetX, targetY - 45);
      ctx.lineTo(hbX, hbY);
      ctx.stroke();
    }

    ctx.restore();
  }
}

// ── 8. ROGUELITE REWARDS: PERKS & ACTIVE SKILL UNLOCKS ──────────────────────
const ROGUELITE_PERKS = [
  // ACTIVE ATTACK SKILLS
  {
    id: 'skill_judgment',
    kind: 'SKILL',
    moveKey: 'JUDGMENT_CUT',
    name: 'Judgment Cut',
    rarity: 'legendary',
    icon: '🌌',
    badge: 'NEW ATTACK',
    desc: 'Unlocks Spatial Distortion Slash (35 SP). Spawns a slicing rift along your aim wheel vector.'
  },
  {
    id: 'skill_divekick',
    kind: 'SKILL',
    moveKey: 'DIVE_KICK',
    name: 'Falcon Dive Kick',
    rarity: 'rare',
    icon: '🦅',
    badge: 'NEW ATTACK',
    desc: 'Unlocks Airborne Downward Dive Kick. Plunges diagonally and spikes opponents into the floor.'
  },
  {
    id: 'skill_whirlwind',
    kind: 'SKILL',
    moveKey: 'WHIRLWIND',
    name: 'Cyclone Blade',
    rarity: 'rare',
    icon: '🌪️',
    badge: 'NEW ATTACK',
    desc: 'Unlocks 360° Spinning Blade (20 SP). Vacuums nearby foes in and delivers 3 fast strikes.'
  },
  {
    id: 'skill_meteor',
    kind: 'SKILL',
    moveKey: 'METEOR_STRIKE',
    name: 'Meteor Blow',
    rarity: 'rare',
    icon: '☄️',
    badge: 'NEW ATTACK',
    desc: 'Unlocks Armored Heavy Blow (25 SP). Ignores light attacks during startup and hits for 34 damage.'
  },
  {
    id: 'skill_thunderpalm',
    kind: 'SKILL',
    moveKey: 'LIGHTNING_PALM',
    name: 'Thunder Palm',
    rarity: 'common',
    icon: '⚡',
    badge: 'NEW ATTACK',
    desc: 'Unlocks Piercing Palm (15 SP). Blazing 4f startup inflicting heavy 28f frame advantage stun.'
  },

  // ACTIVE MOVEMENT SKILLS
  {
    id: 'skill_teleport',
    kind: 'SKILL',
    moveKey: 'SHADOW_TELEPORT',
    name: 'Shadow Blink',
    rarity: 'rare',
    icon: '🌀',
    badge: 'NEW MOVEMENT',
    desc: 'Unlocks Directional Blink (20 SP). Instantly teleports along the 360° aim wheel vector.'
  },
  {
    id: 'skill_superdash',
    kind: 'SKILL',
    moveKey: 'SUPER_DASH',
    name: 'Hyper Rocket Dash',
    rarity: 'common',
    icon: '🚀',
    badge: 'NEW MOVEMENT',
    desc: 'Unlocks Extreme Rocket Blitz. Crosses 260px distance with complete invulnerability.'
  },
  {
    id: 'skill_doublejump',
    kind: 'SKILL',
    moveKey: 'DOUBLE_JUMP',
    name: 'Sky Leap',
    rarity: 'common',
    icon: '🦘',
    badge: 'NEW MOVEMENT',
    desc: 'Unlocks High Directional Leap. Jump higher and reposition mid-air along your aim angle.'
  },

  // PASSIVE BLESSINGS
  {
    id: 'vampiric_touch',
    kind: 'PERK',
    name: 'Vampiric Touch',
    rarity: 'rare',
    icon: '🩸',
    badge: 'PASSIVE',
    desc: 'Absorb 14% of all combat damage dealt directly into your health pool.'
  },
  {
    id: 'lightning_strike',
    kind: 'PERK',
    name: 'Thunder Step',
    rarity: 'rare',
    icon: '⚡',
    badge: 'PASSIVE',
    desc: 'Successful hits discharge chain lightning dealing +16 bonus shock damage.'
  },
  {
    id: 'iron_wall',
    kind: 'PERK',
    name: 'Aegis Parry',
    rarity: 'common',
    icon: '🛡️',
    badge: 'PASSIVE',
    desc: '+25% defense. Parrying reflects 25 unblockable damage back at the attacker.'
  },
  {
    id: 'phantom_dash',
    kind: 'PERK',
    name: 'Phantom Afterimage',
    rarity: 'rare',
    icon: '💨',
    badge: 'PASSIVE',
    desc: 'Dash leaves an explosive decoy behind that detonates for 32 damage.'
  },
  {
    id: 'berserk_core',
    kind: 'PERK',
    name: 'Overdrive Berserk',
    rarity: 'legendary',
    icon: '🔥',
    badge: 'PASSIVE',
    desc: 'When HP drops below 50%, all attacks deal +55% increased damage.'
  },
  {
    id: 'limit_break',
    kind: 'PERK',
    name: 'Spirit Surge',
    rarity: 'common',
    icon: '🔮',
    badge: 'PASSIVE',
    desc: 'Super Meter generates +80% faster on every exchange and parry.'
  },
  {
    id: 'crit_master',
    kind: 'PERK',
    name: 'Executioner Precision',
    rarity: 'legendary',
    icon: '⚔️',
    badge: 'PASSIVE',
    desc: '+25% Critical Hit Chance. Critical strikes deal 240% lethal damage.'
  },
  {
    id: 'colossus_heart',
    kind: 'PERK',
    name: 'Titan Vitality',
    rarity: 'common',
    icon: '❤️',
    badge: 'PASSIVE',
    desc: 'Increases Max HP by +50 and restores all health to maximum.'
  }
];

// ── 9. MAIN ENGINE ──────────────────────────────────────────────────────────
class YomiEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = 1024;
    this.height = 600;

    // Tactical State Machine: 'DECISION' | 'SIMULATING' | 'ROUND_OVER' | 'REPLAY'
    this.turnState = 'DECISION';
    this.previousState = 'DECISION';
    this.simFramesLeft = 0;
    this.selectedPlayerMove = 'QUICK_JAB';
    this.selectedEnemyMove = 'QUICK_JAB';
    this.selectedAimAngle = 0;

    // Replay Recorder
    this.replayFrames = [];
    this.replayCurrentFrame = 0;
    this.replayPlaying = false;
    this.replaySpeed = 1.0;

    // Meta Progression
    this.meta = this.loadMeta();

    // Run Data (3 Floors, Minion & Boss Pools, Gold & Deck Customizer)
    this.currentFloor = 1;
    this.floorStage = 1;
    this.gold = 50;
    this.activePerks = new Set();
    this.relics = new Set();
    this.ownedMoves = new Set([
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'DASH', 'JUMP', 'BLOCK', 'PARRY', 'KI_BLAST', 'DRAGON_UPPER'
    ]);
    this.equippedMoves = new Set(this.ownedMoves);
    this.unlockedMoves = new Set();
    this.moveUpgrades = new Map(); // moveKey -> upgradeData
    this.apexMoves = new Set();    // moveKeys with APEX tier
    this.activeShopTab = 'armory';
    this.currentOpponentData = null;

    this.comboCount = 0;
    this.screenShake = { intensity: 0, duration: 0 };
    this.hitStop = 0;

    // Entities
    this.particles = [];
    this.damageTexts = [];
    this.projectiles = [];
    this.spatialRifts = [];
    this.player = null;
    this.enemy = null;

    this.setupUI();
  }

  loadMeta() {
    const saved = localStorage.getItem('yomi_rogue_meta');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      shards: 0,
      upgrades: { hp: 0, atk: 0, crit: 0, super: 0 }
    };
  }

  saveMeta() {
    localStorage.setItem('yomi_rogue_meta', JSON.stringify(this.meta));
  }

  getMoveData(moveKey, isPlayer) {
    const base = MOVES[moveKey];
    if (!base) return null;

    if (isPlayer) {
      if (this.apexMoves && this.apexMoves.has(moveKey)) {
        const apex = APEX_UPGRADES_CATALOG[moveKey];
        if (apex) return { ...base, ...apex.buffs, isApex: true, name: apex.name };
      }
      if (this.moveUpgrades && this.moveUpgrades.has(moveKey)) {
        const upg = this.moveUpgrades.get(moveKey);
        return { ...base, ...upg.buffs, isUpgraded: true, name: upg.name };
      }
    }
    return base;
  }

  setupUI() {
    this.aimWheel = new AimWheel('aim-canvas', 'aim-readout', (angle) => {
      this.selectedAimAngle = angle;
    });

    document.querySelectorAll('.btn-move').forEach(btn => {
      this.wireMoveButton(btn);
    });

    const defaultBtn = document.querySelector('.btn-move[data-move="QUICK_JAB"]');
    if (defaultBtn) defaultBtn.classList.add('selected');

    document.getElementById('btn-lock-in').addEventListener('click', () => {
      SFX.init();
      this.lockInTurn();
    });

    window.addEventListener('keydown', (e) => {
      SFX.init();
      if ((e.code === 'Space' || e.code === 'Enter') && this.turnState === 'DECISION') {
        e.preventDefault();
        this.lockInTurn();
      } else if (e.code === 'Space' && this.turnState === 'REPLAY') {
        e.preventDefault();
        this.toggleReplayPlay();
      } else if (e.code === 'KeyR' && this.turnState !== 'REPLAY') {
        e.preventDefault();
        this.startReplay();
      } else if (e.code === 'Escape' && this.turnState === 'REPLAY') {
        e.preventDefault();
        this.exitReplay();
      }
    });

    document.getElementById('btn-top-replay').addEventListener('click', () => this.startReplay());
    document.getElementById('btn-draft-replay').addEventListener('click', () => this.startReplay());
    document.getElementById('btn-gameover-replay').addEventListener('click', () => this.startReplay());

    document.getElementById('btn-replay-play').addEventListener('click', () => this.toggleReplayPlay());
    document.getElementById('btn-replay-restart').addEventListener('click', () => this.restartReplay());
    document.getElementById('btn-replay-speed').addEventListener('click', () => this.cycleReplaySpeed());
    document.getElementById('btn-replay-exit').addEventListener('click', () => this.exitReplay());

    const scrubber = document.getElementById('replay-scrubber');
    scrubber.addEventListener('input', (e) => {
      this.replayCurrentFrame = parseInt(e.target.value, 10);
      this.replayPlaying = false;
      document.getElementById('replay-play-icon').innerText = '▶ PLAY';
    });

    document.getElementById('btn-start-run').addEventListener('click', () => {
      SFX.init();
      this.startRun();
    });
    document.getElementById('btn-open-dojo').addEventListener('click', () => this.showDojo());
    document.getElementById('btn-close-dojo').addEventListener('click', () => this.hideDojo());
    document.getElementById('btn-retry-run').addEventListener('click', () => this.startRun());
    document.getElementById('btn-gameover-dojo').addEventListener('click', () => {
      document.getElementById('screen-gameover').classList.remove('active');
      this.showDojo();
    });

    // Sanctuary Shop Navigation & Deck Customizer Tabs
    document.getElementById('btn-leave-shop').addEventListener('click', () => {
      SFX.init();
      this.startNextFloor();
    });
    document.getElementById('tab-shop-armory').addEventListener('click', () => {
      this.activeShopTab = 'armory';
      this.renderShopTab();
    });
    document.getElementById('tab-shop-supplies').addEventListener('click', () => {
      this.activeShopTab = 'supplies';
      this.renderShopTab();
    });
    document.getElementById('tab-shop-deck').addEventListener('click', () => {
      this.activeShopTab = 'deck';
      this.renderShopTab();
    });

    this.updateTitleShards();
  }

  wireMoveButton(btn) {
    btn.addEventListener('click', () => {
      SFX.init();
      document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      this.selectedPlayerMove = btn.dataset.move;
      const moveData = this.getMoveData(this.selectedPlayerMove, true);
      const tag = moveData.isApex ? '[APEX ⚔️] ' : (moveData.isFusion ? '[FUSION 🔮] ' : (moveData.isUpgraded ? '[UPGRADED ★] ' : ''));
      document.getElementById('move-desc').innerText = `${tag}${moveData.name} (${moveData.desc})`;
    });
  }

  rebuildMoveButtons() {
    const moveCat = document.getElementById('movement-btns');
    const defCat = document.getElementById('defense-btns');
    const atkCat = document.getElementById('attack-btns');
    const spCat = document.getElementById('special-btns');

    if (!moveCat || !defCat || !atkCat || !spCat) return;

    moveCat.innerHTML = '';
    defCat.innerHTML = '';
    atkCat.innerHTML = '';
    spCat.innerHTML = '';

    this.equippedMoves.forEach(moveKey => {
      const moveData = this.getMoveData(moveKey, true);
      if (!moveData) return;

      let targetContainer = atkCat;
      if (moveData.category === 'movement' || moveData.type === 'MOVEMENT') {
        targetContainer = moveCat;
      } else if (moveData.category === 'defense' || moveData.type === 'DEFENSE') {
        targetContainer = defCat;
      } else if (moveData.type === 'SPECIAL' || moveData.superCost > 0) {
        targetContainer = spCat;
      }

      const btn = document.createElement('button');
      btn.className = 'btn-move';
      if (moveData.isApex) btn.classList.add('apex-move');
      else if (moveData.isFusion) btn.classList.add('fusion-move');
      else if (moveData.isUpgraded) btn.classList.add('upgraded-move');

      if (moveData.type === 'SPECIAL') btn.classList.add('special-btn');
      btn.dataset.move = moveKey;

      let frameText = 'Mobility';
      if (moveData.superCost > 0) frameText = `${moveData.superCost} SP`;
      else if (moveData.damage > 0) frameText = `${moveData.startup}f • ${moveData.damage} Dmg`;
      else if (moveKey === 'PARRY') frameText = 'Frame Trap';
      else if (moveKey === 'BLOCK') frameText = 'Guard 80%';

      btn.innerHTML = `
        <span>${moveData.name.split(' ')[0]} ${moveData.isApex ? '⚔️' : (moveData.isFusion ? '🔮' : (moveData.isUpgraded ? '★' : ''))}</span>
        <span class="move-frames">${frameText}</span>
      `;

      this.wireMoveButton(btn);
      targetContainer.appendChild(btn);
    });

    const activeBtn = document.querySelector(`.btn-move[data-move="${this.selectedPlayerMove}"]`) || document.querySelector('.btn-move');
    if (activeBtn) {
      document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
      activeBtn.classList.add('selected');
      this.selectedPlayerMove = activeBtn.dataset.move;
      const mData = this.getMoveData(this.selectedPlayerMove, true);
      if (mData) document.getElementById('move-desc').innerText = `${mData.name} (${mData.desc})`;
    }
  }

  unlockMove(moveKey) {
    this.ownedMoves.add(moveKey);
    this.equippedMoves.add(moveKey);
    this.unlockedMoves.add(moveKey);
    this.rebuildMoveButtons();
    SFX.playUpgradeFanfare();
  }

  upgradeMove(moveKey) {
    const upg = MOVE_UPGRADES_CATALOG[moveKey];
    if (!upg) return;

    this.moveUpgrades.set(moveKey, upg);
    SFX.playUpgradeFanfare();
    this.rebuildMoveButtons();

    const currentMoveData = this.getMoveData(moveKey, true);
    document.getElementById('move-desc').innerText = `[UPGRADED ★] ${currentMoveData.name} (${upg.desc})`;
  }

  updateTitleShards() {
    document.getElementById('title-shards').innerText = `Hustle Shards: ${this.meta.shards} 💎`;
  }

  startRun() {
    this.currentFloor = 1;
    this.floorStage = 1;
    this.gold = 50;
    this.activePerks.clear();
    this.relics.clear();
    this.replayFrames = [];
    this.ownedMoves = new Set([
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'DASH', 'JUMP', 'BLOCK', 'PARRY', 'KI_BLAST', 'DRAGON_UPPER'
    ]);
    this.equippedMoves = new Set(this.ownedMoves);
    this.moveUpgrades.clear();
    this.apexMoves.clear();

    this.hideAllOverlays();
    this.initStage(this.currentFloor, this.floorStage);
  }

  initStage(floorNum, stageNum) {
    this.currentFloor = floorNum || 1;
    this.floorStage = stageNum || 1;
    this.particles = [];
    this.damageTexts = [];
    this.projectiles = [];
    this.spatialRifts = [];
    this.comboCount = 0;

    // Draw Opponent from Encounter Pools
    let opp = null;
    if (this.floorStage < 3) {
      const pool = ENEMY_POOLS[`floor${this.currentFloor}_minions`];
      opp = pool[Math.floor(Math.random() * pool.length)];
    } else {
      if (this.currentFloor === 3) {
        opp = ENEMY_POOLS.floor3_final_boss[0];
      } else {
        const pool = ENEMY_POOLS[`floor${this.currentFloor}_bosses`];
        opp = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    this.currentOpponentData = opp;

    const bonusHp = this.meta.upgrades.hp * 20;
    const bonusAtk = this.meta.upgrades.atk * 3;

    // Create Player
    this.player = new TacticalFighter('Hustler', 260, true, '#00f0ff');
    this.player.maxHp = 100 + bonusHp + (this.hasPerk('colossus_heart') ? 50 : 0);
    this.player.hp = this.player.maxHp;
    this.player.atkBonus = bonusAtk;
    this.player.defenseBonus = this.hasPerk('iron_wall') ? 0.25 : 0;

    if (this.relics.has('ki_start')) {
      this.player.superMeter = 50;
    }

    // Create Enemy
    this.enemy = new TacticalFighter(opp.name, 760, false, opp.color);
    this.enemy.maxHp = opp.hp;
    this.enemy.hp = opp.hp;
    this.enemy.atkBonus = opp.atk;
    this.enemy.defenseBonus = opp.defense || 0;

    // Update Stage UI
    document.getElementById('stage-display').innerText = `FLOOR ${this.currentFloor} • STAGE ${this.floorStage} / 3`;
    document.getElementById('gold-display').innerText = `🪙 ${this.gold} Gold`;
    document.getElementById('p1-name').innerText = 'HUSTLER (YOU)';
    document.getElementById('p2-name').innerText = opp.name;
    document.getElementById('p2-archetype').innerText = opp.title;

    this.rebuildMoveButtons();
    this.openDecisionTurn();
    this.updateHUD();
  }

  startNextFloor() {
    document.getElementById('screen-shop').classList.remove('active');
    this.currentFloor++;
    this.floorStage = 1;
    this.initStage(this.currentFloor, this.floorStage);
  }

  hasPerk(id) {
    return this.activePerks.has(id);
  }

  openDecisionTurn() {
    this.turnState = 'DECISION';
    document.getElementById('tactical-panel').classList.remove('hidden');

    this.player.facing = this.player.x < this.enemy.x ? 1 : -1;
    this.enemy.facing = this.enemy.x < this.player.x ? 1 : -1;

    const advTag = document.getElementById('advantage-display');
    if (this.enemy.hitstunFrames > 0) {
      advTag.innerText = `+${this.enemy.hitstunFrames}F COMBO ADVANTAGE`;
      advTag.className = 'frame-advantage-tag adv-plus';
    } else if (this.player.hitstunFrames > 0) {
      advTag.innerText = `-${this.player.hitstunFrames}F DISADVANTAGE`;
      advTag.className = 'frame-advantage-tag adv-minus';
    } else {
      advTag.innerText = 'NEUTRAL FRAME';
      advTag.className = 'frame-advantage-tag';
    }
  }

  // ── INTELLIGENT SCALING AI (ARCHETYPE-BASED COMBAT) ────────────────────────
  chooseAIMove() {
    const opp = this.currentOpponentData;
    const aiType = opp.aiType || 'RUSHDOWN';
    const dist = Math.abs(this.enemy.x - this.player.x);
    const rand = Math.random();
    const playerInHitstun = this.player.hitstunFrames > 0;
    const isEnemyAirborne = this.enemy.isAirborne;
    const isPlayerAirborne = this.player.isAirborne;

    // Guard if in hitstun
    if (this.enemy.hitstunFrames > 0) {
      return 'BLOCK';
    }

    // 1. RUSHDOWN (Shaolin Novice)
    if (aiType === 'RUSHDOWN') {
      if (playerInHitstun) {
        return dist < 85 ? (rand < 0.6 ? 'QUICK_JAB' : 'LAUNCHER') : 'DASH';
      }
      if (dist > 200) return rand < 0.6 ? 'DASH' : 'JUMP';
      if (dist < 85) {
        if (rand < 0.55) return 'QUICK_JAB';
        if (rand < 0.8) return 'SWEEP';
        return 'BLOCK';
      }
      return rand < 0.5 ? 'STEP_FWD' : 'SWEEP';
    }

    // 2. COUNTER_ZONER (Wandering Ronin)
    if (aiType === 'COUNTER_ZONER') {
      if (dist > 220) {
        if (this.enemy.superMeter >= 35 && rand < 0.5) return 'JUDGMENT_CUT';
        return rand < 0.5 ? 'STEP_BACK' : 'DASH';
      }
      if (dist <= 100) {
        // High likelihood to frame-trap parry or heavy slash punish
        if (rand < 0.35) return 'PARRY';
        if (rand < 0.7) return 'HEAVY_SLASH';
        return 'SWEEP';
      }
      return rand < 0.6 ? 'HEAVY_SLASH' : 'STEP_BACK';
    }

    // 3. SUPER_ARMOR_TANK (Armored Colossus)
    if (aiType === 'SUPER_ARMOR_TANK') {
      if (dist > 180) return rand < 0.6 ? 'DASH' : 'STEP_FWD';
      if (dist <= 110) {
        if (this.enemy.superMeter >= 25 && rand < 0.45) return 'METEOR_STRIKE';
        if (rand < 0.4) return 'LAUNCHER';
        return 'BLOCK';
      }
      return rand < 0.5 ? 'METEOR_STRIKE' : 'LAUNCHER';
    }

    // 4. AMBUSH_NINJA (Shadow Assassin)
    if (aiType === 'AMBUSH_NINJA') {
      if (dist > 180) {
        if (this.enemy.superMeter >= 20 && rand < 0.5) return 'SHADOW_TELEPORT';
        if (rand < 0.7) return 'SUPER_DASH';
        return 'KI_BLAST';
      }
      if (isEnemyAirborne) {
        return 'DIVE_KICK';
      }
      if (dist < 80) {
        if (rand < 0.4) return 'LIGHTNING_PALM';
        if (rand < 0.7) return 'QUICK_JAB';
        return 'SUPER_DASH';
      }
      return rand < 0.5 ? 'DIVE_KICK' : 'KI_BLAST';
    }

    // 5. GRANDMASTER (Grandmaster Vane - Final Boss)
    if (aiType === 'GRANDMASTER') {
      // Exploit frame advantage ruthlessly with aerial combos
      if (playerInHitstun) {
        if (isPlayerAirborne) {
          if (this.enemy.superMeter >= 60) return 'DRAGON_UPPER';
          return 'WHIRLWIND';
        }
        return 'LAUNCHER';
      }

      // Read telegraphed strikes with tight parries
      if (dist <= 95 && rand < 0.35) return 'PARRY';

      if (dist > 220) {
        if (this.enemy.superMeter >= 35 && rand < 0.4) return 'JUDGMENT_CUT';
        return rand < 0.6 ? 'SUPER_DASH' : 'DIVE_KICK';
      }

      if (dist <= 100) {
        if (this.enemy.superMeter >= 20 && rand < 0.4) return 'WHIRLWIND';
        if (this.enemy.superMeter >= 25 && rand < 0.6) return 'METEOR_STRIKE';
        return rand < 0.5 ? 'LAUNCHER' : 'QUICK_JAB';
      }

      return 'SUPER_DASH';
    }

    return 'QUICK_JAB';
  }

  getAIAimAngle(moveKey) {
    const opp = this.currentOpponentData;
    const aiType = opp.aiType || 'RUSHDOWN';

    if (moveKey === 'LAUNCHER') return 55;
    if (moveKey === 'JUMP') return 60;
    if (moveKey === 'DIVE_KICK') return -45;
    if (moveKey === 'JUDGMENT_CUT') return 15;
    if (moveKey === 'SHADOW_TELEPORT') {
      // Teleport behind or above player
      return aiType === 'AMBUSH_NINJA' ? 35 : 0;
    }
    if (moveKey === 'DASH' || moveKey === 'SUPER_DASH') {
      return this.enemy.isAirborne ? -30 : 15;
    }
    return 0;
  }

  lockInTurn() {
    if (this.turnState !== 'DECISION') return;

    SFX.playLockIn();
    this.turnState = 'SIMULATING';
    document.getElementById('tactical-panel').classList.add('hidden');

    this.selectedEnemyMove = this.chooseAIMove();
    const enemyAimAngle = this.getAIAimAngle(this.selectedEnemyMove);

    this.player.executeMove(this.selectedPlayerMove, this.selectedAimAngle);
    this.enemy.executeMove(this.selectedEnemyMove, enemyAimAngle);

    if (this.selectedPlayerMove === 'DASH' && this.hasPerk('phantom_dash')) {
      this.spawnSparks(this.player.x, this.player.y - 40, '#00f0ff', 16);
      this.projectiles.push(new Projectile(this.player.x, this.player.y - 40, 0, 0, true, 32, '#00f0ff'));
    }

    const pData = this.getMoveData(this.selectedPlayerMove, true);
    const eData = this.getMoveData(this.selectedEnemyMove, false);
    const pDur = pData.duration || 16;
    const eDur = eData.duration || 16;
    this.simFramesLeft = Math.max(pDur, eDur, 18);
  }

  recordFrame() {
    const snapshot = {
      p: {
        x: this.player.x,
        y: this.player.y,
        facing: this.player.facing,
        color: this.player.color,
        width: this.player.width,
        height: this.player.height,
        isAirborne: this.player.isAirborne,
        isInvulnerable: this.player.isInvulnerable,
        isBlocking: this.player.isBlocking,
        isParrying: this.player.isParrying,
        hitstunFrames: this.player.hitstunFrames,
        moveKey: this.player.moveKey,
        moveFrame: this.player.moveFrame,
        animTick: this.player.animTick,
        hp: this.player.hp,
        maxHp: this.player.maxHp,
        superMeter: this.player.superMeter,
        maxSuper: this.player.maxSuper,
        afterimages: this.player.afterimages.map(a => ({ ...a }))
      },
      e: {
        x: this.enemy.x,
        y: this.enemy.y,
        facing: this.enemy.facing,
        color: this.enemy.color,
        width: this.enemy.width,
        height: this.enemy.height,
        isAirborne: this.enemy.isAirborne,
        isInvulnerable: this.enemy.isInvulnerable,
        isBlocking: this.enemy.isBlocking,
        isParrying: this.enemy.isParrying,
        hitstunFrames: this.enemy.hitstunFrames,
        moveKey: this.enemy.moveKey,
        moveFrame: this.enemy.moveFrame,
        animTick: this.enemy.animTick,
        hp: this.enemy.hp,
        maxHp: this.enemy.maxHp,
        superMeter: this.enemy.superMeter,
        maxSuper: this.enemy.maxSuper,
        afterimages: this.enemy.afterimages.map(a => ({ ...a }))
      },
      projectiles: this.projectiles.map(pr => ({ x: pr.x, y: pr.y, radius: pr.radius, color: pr.color })),
      spatialRifts: this.spatialRifts.map(sr => ({ x: sr.x, y: sr.y, radius: sr.radius, life: sr.life, maxLife: sr.maxLife })),
      particles: this.particles.map(pt => ({ x: pt.x, y: pt.y, color: pt.color, size: pt.size, alpha: Math.max(0, pt.life / pt.maxLife) })),
      damageTexts: this.damageTexts.map(dt => ({ x: dt.x, y: dt.y, text: dt.text, color: dt.color, isCrit: dt.isCrit, alpha: Math.max(0, dt.life / dt.maxLife) })),
      screenShake: { ...this.screenShake },
      comboCount: this.comboCount
    };
    this.replayFrames.push(snapshot);
  }

  // ── CINEMATIC REPLAY CONTROLLER ───────────────────────────────────────────
  startReplay() {
    if (this.replayFrames.length === 0) return;

    this.previousState = this.turnState;
    this.turnState = 'REPLAY';
    this.replayCurrentFrame = 0;
    this.replayPlaying = true;
    this.replaySpeed = 1.0;

    document.getElementById('tactical-panel').classList.add('hidden');
    this.hideAllOverlays();
    document.getElementById('replay-hud').classList.remove('hidden');
    document.getElementById('replay-play-icon').innerText = '⏸ PAUSE';
    document.getElementById('replay-speed-label').innerText = '1.0x';

    const scrubber = document.getElementById('replay-scrubber');
    scrubber.max = this.replayFrames.length - 1;
    scrubber.value = 0;
  }

  toggleReplayPlay() {
    this.replayPlaying = !this.replayPlaying;
    document.getElementById('replay-play-icon').innerText = this.replayPlaying ? '⏸ PAUSE' : '▶ PLAY';
  }

  restartReplay() {
    this.replayCurrentFrame = 0;
    this.replayPlaying = true;
    document.getElementById('replay-play-icon').innerText = '⏸ PAUSE';
  }

  cycleReplaySpeed() {
    const speeds = [1.0, 1.5, 2.0, 0.5];
    const currentIndex = speeds.indexOf(this.replaySpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    this.replaySpeed = speeds[nextIndex];
    document.getElementById('replay-speed-label').innerText = `${this.replaySpeed.toFixed(1)}x`;
  }

  exitReplay() {
    document.getElementById('replay-hud').classList.add('hidden');
    this.turnState = this.previousState;

    if (this.turnState === 'DECISION') {
      document.getElementById('tactical-panel').classList.remove('hidden');
    } else if (this.turnState === 'ROUND_OVER') {
      if (this.enemy && this.enemy.hp <= 0) {
        if (this.stage >= this.maxStages) {
          document.getElementById('screen-gameover').classList.add('active');
        } else {
          document.getElementById('screen-draft').classList.add('active');
        }
      } else {
        document.getElementById('screen-gameover').classList.add('active');
      }
    }
  }

  checkTacticalStrikes() {
    this.evaluateHit(this.player, this.enemy);
    this.evaluateHit(this.enemy, this.player);

    for (let i = this.spatialRifts.length - 1; i >= 0; i--) {
      const rift = this.spatialRifts[i];
      rift.update();
      if (!rift.hasHit && rift.life <= 14) {
        const target = rift.isPlayer ? this.enemy : this.player;
        const d = Math.hypot(rift.x - target.x, rift.y - (target.y - 45));
        if (d <= rift.radius + 25) {
          rift.hasHit = true;
          const dmg = target.takeHit(rift.damage, rift.isPlayer ? this.player : this.enemy, true);
          this.spawnSparks(target.x, target.y - 45, '#00f0ff', 24);
          this.addDamageText(target.x, target.y - 70, `${dmg} SPATIAL!`, '#00f0ff', true);
        }
      }
      if (rift.life <= 0) this.spatialRifts.splice(i, 1);
    }
  }

  checkWeakpointHit(attacker, defender, move) {
    // 1. Whiff Punish: defender is executing an attack or just whiffed
    if (defender.moveKey && defender.moveFrame > 0 && !defender.hasHit) {
      return { isWeakpoint: true, reason: 'WHIFF PUNISH' };
    }
    // 2. High / Low vector matching:
    // Anti-Air: defender is airborne and attacker aims high
    if (defender.isAirborne && attacker.aimAngle >= 25) {
      return { isWeakpoint: true, reason: 'ANTI-AIR WEAKPOINT' };
    }
    // Low Sweep: defender is standing on ground and attacker strikes low with sweep or negative angle
    if (!defender.isAirborne && !defender.isBlocking && (attacker.aimAngle <= -25 || (move.name && move.name.includes('Sweep')) || (move.name && move.name.includes('Slide')))) {
      return { isWeakpoint: true, reason: 'LOW SWEEP WEAKPOINT' };
    }
    // 3. Backstab / Blindside: Attacking from behind
    if ((defender.x - attacker.x) * defender.facing < 0) {
      return { isWeakpoint: true, reason: 'BACKSTAB WEAKPOINT' };
    }
    return { isWeakpoint: false };
  }

  evaluateHit(attacker, defender) {
    if (!attacker.currentMove || (attacker.currentMove.type !== 'ATTACK' && attacker.currentMove.type !== 'SPECIAL')) return;
    const move = attacker.currentMove;
    if (move.projectile || move.isSpatial) return;

    const currentF = attacker.moveFrame;
    const startF = move.startup;
    const endF = startF + (move.activeFrames || 4);

    if (currentF >= startF && currentF <= endF) {
      const dist = Math.abs(attacker.x - defender.x);
      const is360 = !!move.is360;
      const withinRange = is360 ? dist <= (move.range || 90) : dist <= (move.range || 75);

      if (withinRange) {
        let dmg = move.damage + attacker.atkBonus;
        
        // WEAKPOINT HIT SYSTEM (Zero RNG, 100% Tactical & Deterministic)
        const wp = this.checkWeakpointHit(attacker, defender, move);
        const isWeakpoint = wp.isWeakpoint;

        if (isWeakpoint) {
          const wpBonus = (this.meta.upgrades.crit || 0) * 0.15; // Precision Striker Dojo training
          const wpMult = 1.65 + wpBonus + (this.hasPerk('crit_master') ? 0.4 : 0);
          dmg = Math.round(dmg * wpMult);
          defender.hitstunFrames += 4;
          SFX.playWeakpoint();
          this.spawnSparks(defender.x, defender.y - 45, '#ffd166', 22);
          if (attacker.isPlayer) {
            this.gold += 8;
            this.updateHUD();
          }
        }

        if (attacker.isPlayer && this.hasPerk('berserk_core') && attacker.hp < attacker.maxHp * 0.5) {
          dmg *= 1.55;
        }

        const isSpike = !!move.spikesDown;
        const isHeavy = !!move.launchesAir || move.damage >= 24;
        const realDmg = defender.takeHit(dmg, attacker, isHeavy, isSpike);

        if (realDmg > 0) {
          attacker.superMeter = Math.min(attacker.maxSuper, attacker.superMeter + 16);

          if (attacker.isPlayer && this.hasPerk('vampiric_touch')) {
            const heal = Math.max(1, Math.round(realDmg * 0.14));
            attacker.hp = Math.min(attacker.maxHp, attacker.hp + heal);
            this.addDamageText(attacker.x, attacker.y - 80, `+${heal} HP`, '#06d6a0');
          }

          if (attacker.isPlayer && this.hasPerk('lightning_strike')) {
            this.spawnSparks(defender.x, defender.y - 45, '#ffd166', 15);
            defender.hp = Math.max(0, defender.hp - 16);
            this.addDamageText(defender.x + 20, defender.y - 50, '16 ⚡', '#ffd166');
          }

          const txt = Math.round(realDmg).toString();
          this.addDamageText(defender.x, defender.y - 70, isWeakpoint ? `${txt} WEAKPOINT!` : txt, isWeakpoint ? '#ffd166' : '#fff', isWeakpoint);

          if (attacker.isPlayer) {
            this.comboCount++;
            this.showCombo(this.comboCount);
          }

          this.hitStop = isHeavy ? 4 : 2;
        }

        attacker.currentMove = null;
      }
    }
  }

  showCombo(count) {
    const el = document.getElementById('combo-display');
    if (count >= 2) {
      el.innerText = `${count} HITS!`;
      el.classList.add('active');
    }
  }

  spawnSparks(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 6;
      this.particles.push(new Particle(x, y, Math.cos(angle) * spd, Math.sin(angle) * spd - 1, color, 2 + Math.random() * 3, 22));
    }
  }

  addDamageText(x, y, text, color, isCrit = false) {
    this.damageTexts.push(new DamageText(x, y, text, color, isCrit));
  }

  addScreenShake(intensity, duration) {
    this.screenShake.intensity = intensity;
    this.screenShake.duration = duration;
  }

  updateHUD() {
    if (!this.player || !this.enemy) return;

    const p1Hp = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    const p1Sp = Math.max(0, (this.player.superMeter / this.player.maxSuper) * 100);
    document.getElementById('p1-hp-bar').style.width = `${p1Hp}%`;
    document.getElementById('p1-hp-text').innerText = `${Math.ceil(this.player.hp)} / ${this.player.maxHp}`;
    document.getElementById('p1-super-bar').style.width = `${p1Sp}%`;

    const p2Hp = Math.max(0, (this.enemy.hp / this.enemy.maxHp) * 100);
    const p2Sp = Math.max(0, (this.enemy.superMeter / this.enemy.maxSuper) * 100);
    document.getElementById('p2-hp-bar').style.width = `${p2Hp}%`;
    document.getElementById('p2-hp-text').innerText = `${Math.ceil(this.enemy.hp)} / ${this.enemy.maxHp}`;
    document.getElementById('p2-super-bar').style.width = `${p2Sp}%`;
  }

  update() {
    if (this.turnState === 'REPLAY') {
      if (this.replayPlaying && this.replayFrames.length > 0) {
        this.replayCurrentFrame += this.replaySpeed;
        if (this.replayCurrentFrame >= this.replayFrames.length - 1) {
          this.replayCurrentFrame = this.replayFrames.length - 1;
          this.replayPlaying = false;
          document.getElementById('replay-play-icon').innerText = '▶ PLAY';
        }

        const idx = Math.floor(this.replayCurrentFrame);
        const frame = this.replayFrames[idx];
        if (frame) {
          document.getElementById('replay-scrubber').value = idx;
          const currSec = (idx / 60).toFixed(1);
          const totalSec = (this.replayFrames.length / 60).toFixed(1);
          document.getElementById('replay-time-display').innerText = `${currSec}s / ${totalSec}s`;

          const p1Hp = Math.max(0, (frame.p.hp / frame.p.maxHp) * 100);
          const p1Sp = Math.max(0, (frame.p.superMeter / frame.p.maxSuper) * 100);
          document.getElementById('p1-hp-bar').style.width = `${p1Hp}%`;
          document.getElementById('p1-hp-text').innerText = `${Math.ceil(frame.p.hp)} / ${frame.p.maxHp}`;
          document.getElementById('p1-super-bar').style.width = `${p1Sp}%`;

          const p2Hp = Math.max(0, (frame.e.hp / frame.e.maxHp) * 100);
          const p2Sp = Math.max(0, (frame.e.superMeter / frame.e.maxSuper) * 100);
          document.getElementById('p2-hp-bar').style.width = `${p2Hp}%`;
          document.getElementById('p2-hp-text').innerText = `${Math.ceil(frame.e.hp)} / ${frame.e.maxHp}`;
          document.getElementById('p2-super-bar').style.width = `${p2Sp}%`;
        }
      }
      return;
    }

    if (!this.player || !this.enemy) return;

    if (this.hitStop > 0) {
      this.hitStop--;
      return;
    }

    if (this.turnState === 'SIMULATING') {
      this.player.updateFramePhysics();
      this.enemy.updateFramePhysics();

      this.checkTacticalStrikes();

      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.update();
        const target = p.isPlayer ? this.enemy : this.player;
        const d = Math.hypot(p.x - target.x, p.y - (target.y - 45));
        if (d < p.radius + 30) {
          target.takeHit(p.damage, null, true);
          this.spawnSparks(p.x, p.y, p.color, 16);
          p.active = false;
        }
        if (!p.active) this.projectiles.splice(i, 1);
      }

      this.recordFrame();
      this.simFramesLeft--;

      if (this.enemy.hp <= 0) {
        this.handleVictory();
        return;
      }
      if (this.player.hp <= 0) {
        this.handleDefeat();
        return;
      }

      if (this.simFramesLeft <= 0) {
        if (this.enemy.hitstunFrames === 0) {
          this.comboCount = 0;
          document.getElementById('combo-display').classList.remove('active');
        }
        this.openDecisionTurn();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }
    for (let i = this.damageTexts.length - 1; i >= 0; i--) {
      this.damageTexts[i].update();
      if (this.damageTexts[i].life <= 0) this.damageTexts.splice(i, 1);
    }

    this.updateHUD();
  }

  handleVictory() {
    this.turnState = 'ROUND_OVER';
    SFX.playFanfare();
    const shardsEarned = (this.currentFloor * 12) + (this.floorStage * 6);
    this.meta.shards += shardsEarned;
    this.saveMeta();

    if (this.floorStage < 3) {
      // Minion / Elite encounter victory
      const goldGained = 35 + Math.floor(Math.random() * 12);
      this.gold += goldGained;
      SFX.playCoin();
      this.showDraftOverlay();
    } else {
      // Floor Boss Defeated!
      const bossGold = 120 + this.currentFloor * 30;
      this.gold += bossGold;
      SFX.playCoin();

      if (this.currentFloor >= 3) {
        // Floor 3 Final Boss (Grandmaster Vane) Defeated!
        document.getElementById('gameover-headline').innerText = 'EXPEDITION VICTORIOUS!';
        document.getElementById('gameover-headline').style.color = 'var(--accent-gold)';
        document.getElementById('gameover-sub').innerText = 'You defeated Grandmaster Vane and conquered all 3 Floors!';
        document.getElementById('gameover-shards').innerText = `+${shardsEarned + 100} Hustle Shards acquired! 💎`;
        document.getElementById('screen-gameover').classList.add('active');
      } else {
        // Floor 1 or 2 Boss Defeated -> Open Sanctuary Shop & Skill Forge!
        this.showSanctuaryShop();
      }
    }
  }

  handleDefeat() {
    this.turnState = 'ROUND_OVER';
    const shardsEarned = (this.currentFloor * 5) + (this.floorStage * 3);
    this.meta.shards += shardsEarned;
    this.saveMeta();

    document.getElementById('gameover-headline').innerText = 'KNOCKED OUT';
    document.getElementById('gameover-headline').style.color = 'var(--accent-red)';
    document.getElementById('gameover-sub').innerText = `Fell in Floor ${this.currentFloor} (Stage ${this.floorStage}) to ${this.enemy.name}`;
    document.getElementById('gameover-shards').innerText = `+${shardsEarned} Hustle Shards preserved 💎`;
    document.getElementById('screen-gameover').classList.add('active');
  }

  // ── SANCTUARY FORGE & MARKET (POST-BOSS SHOP & DECK CUSTOMIZER) ───────────
  showSanctuaryShop() {
    this.hideAllOverlays();
    document.getElementById('shop-gold-display').innerText = `🪙 ${this.gold} Gold Available`;
    this.activeShopTab = 'armory';
    this.renderShopTab();
    document.getElementById('screen-shop').classList.add('active');
  }

  generateShopWares() {
    const wares = [];
    
    // Upgrades for currently owned moves
    this.ownedMoves.forEach(mKey => {
      if (!this.apexMoves.has(mKey)) {
        if (this.moveUpgrades.has(mKey)) {
          wares.push({
            type: 'UPGRADE',
            moveKey: mKey,
            name: `${mKey} Breakthrough 🔮`,
            badge: 'BREAKTHROUGH',
            badgeClass: 'tier-fusion',
            cost: 85,
            desc: 'Evolve this upgraded move into a Hybrid Fusion or Apex Mastery!'
          });
        } else if (MOVE_UPGRADES_CATALOG[mKey]) {
          const upg = MOVE_UPGRADES_CATALOG[mKey];
          wares.push({
            type: 'UPGRADE',
            moveKey: mKey,
            name: upg.name,
            badge: 'UPGRADE ★',
            badgeClass: 'tier-upgrade',
            cost: 60,
            desc: upg.desc
          });
        }
      }
    });

    // New unowned skills from ROGUELITE_PERKS
    ROGUELITE_PERKS.filter(p => p.kind === 'SKILL' && !this.ownedMoves.has(p.moveKey)).forEach(sk => {
      wares.push({
        type: 'SKILL',
        moveKey: sk.moveKey,
        name: sk.name,
        badge: 'NEW SKILL',
        badgeClass: 'tier-rare',
        cost: 70,
        desc: sk.desc
      });
    });

    wares.sort(() => 0.5 - Math.random());
    return wares.slice(0, 3);
  }

  renderShopTab() {
    document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
    const armoryTab = document.getElementById('tab-shop-armory');
    const suppliesTab = document.getElementById('tab-shop-supplies');
    const deckTab = document.getElementById('tab-shop-deck');
    const waresView = document.getElementById('shop-wares-view');
    const deckView = document.getElementById('shop-deck-view');

    waresView.innerHTML = '';
    waresView.style.display = 'grid';
    deckView.style.display = 'none';

    if (this.activeShopTab === 'armory') {
      armoryTab.classList.add('active');
      const wares = this.generateShopWares();

      if (wares.length === 0) {
        waresView.innerHTML = `<div style="grid-column: 1 / -1; color: var(--accent-cyan); font-size: 14px; text-align: center; padding: 20px;">All available techniques in this tier are fully mastered!</div>`;
        return;
      }

      wares.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-header">
              <span class="perk-badge ${item.badgeClass}">${item.badge}</span>
              <span class="shop-price">🪙 ${item.cost} G</span>
            </div>
            <div class="perk-name">${item.name}</div>
            <div class="perk-desc">${item.desc}</div>
          </div>
          <button class="btn-primary" style="margin-top: 12px; padding: 7px 16px; font-size: 12px;" ${this.gold < item.cost ? 'disabled' : ''}>
            PURCHASE
          </button>
        `;
        const btn = card.querySelector('button');
        if (this.gold >= item.cost) {
          btn.addEventListener('click', () => {
            this.gold -= item.cost;
            SFX.playCoin();
            document.getElementById('shop-gold-display').innerText = `🪙 ${this.gold} Gold Available`;
            this.updateHUD();
            
            if (item.type === 'UPGRADE') {
              if (this.moveUpgrades.has(item.moveKey)) {
                this.openBreakthrough(item.moveKey);
              } else {
                this.upgradeMove(item.moveKey);
              }
            } else if (item.type === 'SKILL') {
              this.unlockMove(item.moveKey);
            }
            this.renderShopTab();
          });
        }
        waresView.appendChild(card);
      });

    } else if (this.activeShopTab === 'supplies') {
      suppliesTab.classList.add('active');
      const supplies = [
        {
          id: 'heal_potion',
          name: 'Vitality Elixir',
          cost: 45,
          badge: 'POTION',
          badgeClass: 'tier-common',
          desc: 'Restores 50% of maximum health immediately.',
          action: () => {
            const heal = Math.round(this.player.maxHp * 0.5);
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
          }
        },
        {
          id: 'max_hp_charm',
          name: 'Colossus Talisman',
          cost: 65,
          badge: 'RELIC',
          badgeClass: 'tier-rare',
          desc: 'Permanently increases Max HP by +35 and heals 35 HP.',
          action: () => {
            this.player.maxHp += 35;
            this.player.hp += 35;
          }
        },
        {
          id: 'super_essence',
          name: 'Ki Conduit Crystal',
          cost: 60,
          badge: 'RELIC',
          badgeClass: 'tier-rare',
          desc: 'Start every match with +50 Super SP ready to unleash specials.',
          action: () => {
            this.relics.add('ki_start');
          }
        }
      ];

      supplies.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-header">
              <span class="perk-badge ${item.badgeClass}">${item.badge}</span>
              <span class="shop-price">🪙 ${item.cost} G</span>
            </div>
            <div class="perk-name">${item.name}</div>
            <div class="perk-desc">${item.desc}</div>
          </div>
          <button class="btn-primary" style="margin-top: 12px; padding: 7px 16px; font-size: 12px;" ${this.gold < item.cost ? 'disabled' : ''}>
            ACQUIRE
          </button>
        `;
        const btn = card.querySelector('button');
        if (this.gold >= item.cost) {
          btn.addEventListener('click', () => {
            this.gold -= item.cost;
            SFX.playCoin();
            document.getElementById('shop-gold-display').innerText = `🪙 ${this.gold} Gold Available`;
            this.updateHUD();
            item.action();
            this.renderShopTab();
          });
        }
        waresView.appendChild(card);
      });

    } else if (this.activeShopTab === 'deck') {
      deckTab.classList.add('active');
      waresView.style.display = 'none';
      deckView.style.display = 'block';
      this.renderDeckCustomizer();
    }
  }

  renderDeckCustomizer() {
    const container = document.getElementById('deck-grid-container');
    container.innerHTML = '';
    document.getElementById('deck-count-text').innerText = `${this.equippedMoves.size} / ${this.ownedMoves.size} Moves`;

    Array.from(this.ownedMoves).forEach(moveKey => {
      const moveData = this.getMoveData(moveKey, true);
      if (!moveData) return;

      const isEquipped = this.equippedMoves.has(moveKey);
      const card = document.createElement('div');
      card.className = `deck-item ${isEquipped ? 'equipped' : 'stashed'}`;

      const tagClass = isEquipped ? 'tag-equipped' : 'tag-stashed';
      const tagText = isEquipped ? 'EQUIPPED' : 'STASHED';

      card.innerHTML = `
        <span class="deck-tag ${tagClass}">${tagText}</span>
        <div style="font-size: 13px; font-weight: 700; color: #fff;">${moveData.name}</div>
        <div style="font-size: 11px; color: var(--accent-cyan); font-family: 'JetBrains Mono', monospace;">
          ${moveData.damage > 0 ? `${moveData.startup}f • ${moveData.damage} Dmg` : 'Mobility/Guard'}
        </div>
        <div style="font-size: 10px; color: #94a3b8; line-height: 1.3;">${moveData.desc}</div>
      `;

      card.addEventListener('click', () => {
        if (isEquipped) {
          if (this.equippedMoves.size <= 4) return;
          this.equippedMoves.delete(moveKey);
        } else {
          this.equippedMoves.add(moveKey);
        }
        this.rebuildMoveButtons();
        this.renderDeckCustomizer();
      });

      container.appendChild(card);
    });
  }

  // ── SKILL BREAKTHROUGH: FUSION OR APEX ─────────────────────────────────────
  openBreakthrough(moveKey) {
    const moveData = this.getMoveData(moveKey, true);
    document.getElementById('breakthrough-sub').innerText = `Choose the evolutionary destiny for ${moveData.name}:`;

    let matchedFusion = null;
    let partnerMoveKey = null;

    for (const [keyPair, recipe] of Object.entries(FUSION_RECIPES)) {
      const [m1, m2] = keyPair.split('+');
      if (m1 === moveKey && this.ownedMoves.has(m2)) {
        matchedFusion = recipe;
        partnerMoveKey = m2;
        break;
      } else if (m2 === moveKey && this.ownedMoves.has(m1)) {
        matchedFusion = recipe;
        partnerMoveKey = m1;
        break;
      }
    }

    const fusionTitle = document.getElementById('fusion-title');
    const fusionDesc = document.getElementById('fusion-desc');
    const apexTitle = document.getElementById('apex-title');
    const apexDesc = document.getElementById('apex-desc');

    const apexUpg = APEX_UPGRADES_CATALOG[moveKey] || {
      name: `${moveData.name} [APEX ⚔️]`,
      desc: '1f startup, doubled damage, super armor, +15f frame advantage.'
    };

    apexTitle.innerText = apexUpg.name;
    apexDesc.innerText = apexUpg.desc;

    if (matchedFusion) {
      fusionTitle.innerText = matchedFusion.name;
      fusionDesc.innerText = matchedFusion.desc;
    } else {
      fusionTitle.innerText = `Elemental Resonance [FUSION 🔮]`;
      fusionDesc.innerText = `Fuse ${moveData.name} with inner Ki aura to release an elemental shockwave on hit.`;
    }

    const btnFusion = document.getElementById('btn-opt-fusion');
    const btnApex = document.getElementById('btn-opt-apex');

    const newBtnFusion = btnFusion.cloneNode(true);
    const newBtnApex = btnApex.cloneNode(true);
    btnFusion.parentNode.replaceChild(newBtnFusion, btnFusion);
    btnApex.parentNode.replaceChild(newBtnApex, btnApex);

    newBtnFusion.addEventListener('click', () => {
      SFX.playUpgradeFanfare();
      if (matchedFusion) {
        this.ownedMoves.add(matchedFusion.targetKey);
        this.equippedMoves.add(matchedFusion.targetKey);
      } else {
        this.upgradeMove(moveKey);
      }
      this.rebuildMoveButtons();
      document.getElementById('screen-breakthrough').classList.remove('active');
      if (this.turnState === 'ROUND_OVER' && document.getElementById('screen-shop').classList.contains('active')) {
        this.renderShopTab();
      }
    });

    newBtnApex.addEventListener('click', () => {
      SFX.playUpgradeFanfare();
      this.apexMoves.add(moveKey);
      this.rebuildMoveButtons();
      document.getElementById('screen-breakthrough').classList.remove('active');
      if (this.turnState === 'ROUND_OVER' && document.getElementById('screen-shop').classList.contains('active')) {
        this.renderShopTab();
      }
    });

    document.getElementById('screen-breakthrough').classList.add('active');
  }

  // ── DRAFTING SCREEN: REWARDS WITH MOVE UPGRADES, SKILLS & BLESSINGS ────────
  showDraftOverlay() {
    const container = document.getElementById('buff-cards-container');
    container.innerHTML = '';

    const upgradeCandidates = [];
    const newMoveCandidates = [];
    const perkCandidates = [];

    // 1. Move Upgrades for currently possessed moves
    this.ownedMoves.forEach(moveKey => {
      if (!this.apexMoves.has(moveKey)) {
        if (this.moveUpgrades.has(moveKey)) {
          // Can breakthrough!
          upgradeCandidates.push({
            kind: 'UPGRADE',
            moveKey: moveKey,
            name: `${moveKey} Breakthrough 🔮`,
            rarity: 'legendary',
            icon: '🔮',
            badge: 'BREAKTHROUGH',
            desc: 'Ascend this upgraded technique into a Hybrid Fusion or Apex Mastery!'
          });
        } else if (MOVE_UPGRADES_CATALOG[moveKey]) {
          const upg = MOVE_UPGRADES_CATALOG[moveKey];
          upgradeCandidates.push({
            kind: 'UPGRADE',
            moveKey: moveKey,
            name: upg.name,
            rarity: 'rare',
            icon: '⭐',
            badge: 'MOVE UPGRADE ★',
            desc: upg.desc
          });
        }
      }
    });

    // 2. New Skill Unlocks not yet owned
    ROGUELITE_PERKS.filter(p => p.kind === 'SKILL' && !this.ownedMoves.has(p.moveKey)).forEach(sk => {
      newMoveCandidates.push(sk);
    });

    // 3. Passive Perks not yet active
    ROGUELITE_PERKS.filter(p => p.kind === 'PERK' && !this.activePerks.has(p.id)).forEach(pk => {
      perkCandidates.push(pk);
    });

    const randomThree = [];
    const popRandom = (arr) => {
      if (!arr || arr.length === 0) return null;
      const idx = Math.floor(Math.random() * arr.length);
      return arr.splice(idx, 1)[0];
    };

    // Slot 1: Guaranteed Move Upgrade (if available)
    const cardUpgrade = popRandom(upgradeCandidates);
    if (cardUpgrade) randomThree.push(cardUpgrade);

    // Slot 2: Guaranteed New Moveset (if available)
    const cardNewMove = popRandom(newMoveCandidates);
    if (cardNewMove) randomThree.push(cardNewMove);

    // Slot 3+: Fill up to 3 cards from all remaining candidates (Upgrades, New Moves, Passives)
    const remainingPool = [...upgradeCandidates, ...newMoveCandidates, ...perkCandidates];
    remainingPool.sort(() => 0.5 - Math.random());

    while (randomThree.length < 3 && remainingPool.length > 0) {
      randomThree.push(remainingPool.pop());
    }

    randomThree.sort(() => 0.5 - Math.random());

    randomThree.forEach(reward => {
      const card = document.createElement('div');
      card.className = 'perk-card';

      let tierClass = `tier-${reward.rarity}`;
      if (reward.kind === 'UPGRADE') {
        tierClass = reward.badge === 'BREAKTHROUGH' ? 'tier-fusion' : 'tier-upgrade';
      } else if (reward.kind === 'SKILL') {
        const moveData = MOVES[reward.moveKey];
        tierClass = (moveData && moveData.category === 'movement') ? 'tier-skill-mov' : 'tier-skill-atk';
      }

      card.innerHTML = `
        <span class="perk-badge ${tierClass}">${reward.badge || reward.rarity}</span>
        <div class="perk-icon">${reward.icon}</div>
        <div class="perk-name">${reward.name}</div>
        <div class="perk-desc">${reward.desc}</div>
      `;

      card.addEventListener('click', () => {
        if (reward.kind === 'UPGRADE') {
          if (this.moveUpgrades.has(reward.moveKey)) {
            this.openBreakthrough(reward.moveKey);
          } else {
            this.upgradeMove(reward.moveKey);
          }
        } else if (reward.kind === 'SKILL') {
          this.unlockMove(reward.moveKey);
        } else {
          this.activePerks.add(reward.id);
        }
        document.getElementById('screen-draft').classList.remove('active');
        this.initStage(this.currentFloor, this.floorStage + 1);
      });

      container.appendChild(card);
    });

    document.getElementById('screen-draft').classList.add('active');
  }

  showDojo() {
    this.hideAllOverlays();
    document.getElementById('dojo-shards').innerText = `Hustle Shards: ${this.meta.shards} 💎`;
    const grid = document.getElementById('dojo-upgrades-grid');
    grid.innerHTML = '';

    const upgrades = [
      { key: 'hp', name: 'Vitality Conditioning (+20 HP)', cost: 15 },
      { key: 'atk', name: 'Striking Power (+3 Damage)', cost: 20 },
      { key: 'crit', name: 'Precision Striker (+15% Weakpoint Damage)', cost: 25 },
      { key: 'super', name: 'Ki Resonance (+Super Generation)', cost: 30 }
    ];

    upgrades.forEach(u => {
      const lvl = this.meta.upgrades[u.key] || 0;
      const totalCost = u.cost * (lvl + 1);
      const card = document.createElement('div');
      card.className = 'dojo-card';
      card.innerHTML = `
        <div class="dojo-meta">
          <span class="dojo-title">${u.name}</span>
          <span class="dojo-tier">Level: ${lvl} / 5 • Cost: ${totalCost} 💎</span>
        </div>
        <button class="btn-primary" style="padding: 6px 14px; font-size: 12px;" ${this.meta.shards < totalCost || lvl >= 5 ? 'disabled' : ''}>
          ${lvl >= 5 ? 'MAX' : 'TRAIN'}
        </button>
      `;

      const btn = card.querySelector('button');
      if (lvl < 5 && this.meta.shards >= totalCost) {
        btn.addEventListener('click', () => {
          this.meta.shards -= totalCost;
          this.meta.upgrades[u.key] = lvl + 1;
          this.saveMeta();
          this.showDojo();
        });
      }

      grid.appendChild(card);
    });

    document.getElementById('screen-dojo').classList.add('active');
  }

  hideDojo() {
    document.getElementById('screen-dojo').classList.remove('active');
    document.getElementById('screen-title').classList.add('active');
    this.updateTitleShards();
  }

  hideAllOverlays() {
    document.querySelectorAll('.overlay-screen').forEach(el => el.classList.remove('active'));
  }

  drawArena() {
    const floorIdx = Math.max(0, Math.min(2, (this.currentFloor || 1) - 1));
    const floorDef = FLOOR_DEFINITIONS[floorIdx] || FLOOR_DEFINITIONS[0];
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, floorDef.bgGradient[0]);
    grad.addColorStop(0.65, floorDef.bgGradient[1]);
    grad.addColorStop(1, floorDef.bgGradient[2]);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    const floorY = 470;
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, floorY);
    this.ctx.lineTo(this.width, floorY);
    this.ctx.stroke();

    this.ctx.fillStyle = floorDef.arenaFloorColor || '#0b0f17';
    this.ctx.fillRect(0, floorY, this.width, this.height - floorY);

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 0; x <= this.width; x += 55) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, floorY);
      this.ctx.lineTo(x - 60, this.height);
      this.ctx.stroke();
    }
  }

  drawReplayFrame(frame) {
    this.drawArena();

    if (frame.p.afterimages) {
      frame.p.afterimages.forEach(img => {
        this.ctx.save();
        this.ctx.globalAlpha = img.alpha;
        this.ctx.fillStyle = img.color;
        this.ctx.fillRect(img.x - frame.p.width / 2, img.y - frame.p.height, frame.p.width, frame.p.height);
        this.ctx.restore();
      });
    }
    if (frame.e.afterimages) {
      frame.e.afterimages.forEach(img => {
        this.ctx.save();
        this.ctx.globalAlpha = img.alpha;
        this.ctx.fillStyle = img.color;
        this.ctx.fillRect(img.x - frame.e.width / 2, img.y - frame.e.height, frame.e.width, frame.e.height);
        this.ctx.restore();
      });
    }

    this.ctx.beginPath();
    this.ctx.ellipse(frame.p.x, 472, 26, 6, 0, 0, Math.PI * 2);
    this.ctx.ellipse(frame.e.x, 472, 26, 6, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fill();

    renderFighterModel(this.ctx, frame.p, true);
    renderFighterModel(this.ctx, frame.e, false);

    frame.projectiles.forEach(p => {
      this.ctx.save();
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 18;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.restore();
    });

    frame.particles.forEach(pt => {
      this.ctx.save();
      this.ctx.globalAlpha = pt.alpha;
      this.ctx.fillStyle = pt.color;
      this.ctx.shadowColor = pt.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    frame.damageTexts.forEach(dt => {
      this.ctx.save();
      this.ctx.globalAlpha = dt.alpha;
      this.ctx.font = dt.isCrit ? 'bold 22px Chakra Petch' : 'bold 16px Chakra Petch';
      this.ctx.fillStyle = dt.color;
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 3;
      this.ctx.strokeText(dt.text, dt.x, dt.y);
      this.ctx.fillText(dt.text, dt.x, dt.y);
      this.ctx.restore();
    });

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, 24);
    this.ctx.fillRect(0, this.height - 24, this.width, 24);
  }

  render() {
    this.ctx.save();

    if (this.turnState === 'REPLAY') {
      const idx = Math.floor(this.replayCurrentFrame);
      const frame = this.replayFrames[idx];
      if (frame) {
        if (frame.screenShake && frame.screenShake.duration > 0) {
          const sx = (Math.random() - 0.5) * frame.screenShake.intensity;
          const sy = (Math.random() - 0.5) * frame.screenShake.intensity;
          this.ctx.translate(sx, sy);
        }
        this.drawReplayFrame(frame);
      }
      this.ctx.restore();
      return;
    }

    if (this.screenShake.duration > 0) {
      this.screenShake.duration--;
      const sx = (Math.random() - 0.5) * this.screenShake.intensity;
      const sy = (Math.random() - 0.5) * this.screenShake.intensity;
      this.ctx.translate(sx, sy);
    }

    this.drawArena();

    if (this.turnState === 'DECISION' && this.player) {
      this.player.drawGhostPreview(this.ctx, this.selectedPlayerMove, this.selectedAimAngle);
    }

    this.spatialRifts.forEach(r => r.draw(this.ctx));
    this.projectiles.forEach(p => p.draw(this.ctx));

    if (this.player) this.player.draw(this.ctx);
    if (this.enemy) this.enemy.draw(this.ctx);

    this.particles.forEach(pt => pt.draw(this.ctx));
    this.damageTexts.forEach(dt => dt.draw(this.ctx));

    this.ctx.restore();
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }
}

// Start Game
const engine = new YomiEngine();
engine.loop();
