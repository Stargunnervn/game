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
}

const SFX = new SoundFX();

// ── 2. MOVE DEFINITIONS (OMNI-DIRECTIONAL YOMI HUSTLE STYLE) ─────────────────
const MOVES = {
  // BASE MOVEMENT (FULL 360° FREEDOM)
  STEP_FWD: {
    name: 'Step Forward',
    desc: 'Micro-step forward (+1 Frame Advantage on neutral)',
    type: 'MOVEMENT',
    category: 'movement',
    duration: 12,
    moveDist: 85,
    startup: 0,
    hitFrame: 0,
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
    hitFrame: 0,
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

  // BASE ATTACKS (GROUND & MID-AIR COMPATIBLE)
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

  // ── UNLOCKABLE ATTACK SKILLS (DRAFTABLE REWARDS) ──
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

  // ── UNLOCKABLE MOVEMENT SKILLS (DRAFTABLE REWARDS) ──
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
  }
};

// ── 3. VISUAL PARTICLES, DAMAGE NUMBERS, AND SHOCKWAVES ─────────────────────
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
  constructor(x, y, text, color = '#fff', isCrit = false) {
    this.x = x + (Math.random() * 20 - 10);
    this.y = y;
    this.text = text;
    this.color = color;
    this.isCrit = isCrit;
    this.life = 45;
    this.maxLife = 45;
    this.vy = -2.2;
  }
  update() {
    this.y += this.vy;
    this.vy *= 0.94;
    this.life--;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
    ctx.font = this.isCrit ? 'bold 22px Chakra Petch' : 'bold 16px Chakra Petch';
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
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
  constructor(x, y, isPlayer, damage) {
    this.x = x;
    this.y = y;
    this.isPlayer = isPlayer;
    this.damage = damage;
    this.radius = 55;
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

    // Distorting ring
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * (0.8 + progress * 0.4), 0, Math.PI * 2);
    ctx.stroke();

    // Criss-crossing spatial cut lines
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

// ── 4. YOMI HUSTLE AIM WHEEL CONTROLLER ──────────────────────────────────────
class AimWheel {
  constructor(canvasId, readoutId, onAngleChange) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.readout = document.getElementById(readoutId);
    this.angleDeg = 0; // -180 to 180 degrees
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

    // Outer dial
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.fillStyle = '#080d15';
    this.ctx.fill();
    this.ctx.strokeStyle = '#223044';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Cardinal tick marks
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

    // Crosshair axes
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    this.ctx.beginPath();
    this.ctx.moveTo(cx - r, cy);
    this.ctx.lineTo(cx + r, cy);
    this.ctx.moveTo(cx, cy - r);
    this.ctx.lineTo(cx, cy + r);
    this.ctx.stroke();

    // Direction needle pointer
    const rad = -this.angleDeg * (Math.PI / 180);
    const pointerLen = r - 6;
    const px = cx + Math.cos(rad) * pointerLen;
    const py = cy + Math.sin(rad) * pointerLen;

    // Needle line
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 8;
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(px, py);
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // Reticle knob
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

    // Center hub
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fill();
  }
}

// ── 5. TACTICAL FIGHTER CLASS (ANIME COMBAT & MOBILITY) ─────────────────────
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

    // Visual trails (Anime afterimages)
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
    const moveData = MOVES[moveKey];
    if (!moveData) return;

    this.currentMove = moveData;
    this.moveKey = moveKey;
    this.moveFrame = 0;
    this.aimAngle = aimDeg;

    if (moveData.superCost > 0) {
      this.superMeter = Math.max(0, this.superMeter - moveData.superCost);
    }

    const rad = (aimDeg * Math.PI) / 180;

    // ── OMNI-DIRECTIONAL ANIME MOVEMENT ──
    if (moveKey === 'DASH') {
      SFX.playDash();
      this.spawnAfterimage();
      // True 360° omni-directional dash (air or ground)
      const dashSpeed = 16.5;
      this.vx = Math.cos(rad) * dashSpeed * this.facing;
      this.vy = -Math.sin(rad) * 14.5;
      if (Math.abs(this.vy) > 2) this.isAirborne = true;
    } else if (moveKey === 'JUMP') {
      SFX.playDash();
      this.spawnAfterimage();
      // 360° directional jump trajectory
      const jumpPower = Math.sin(rad) > 0.1 ? Math.sin(rad) * 17 + 2 : 15;
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
    }

    // Spatial Slash Spawning
    if (moveData.isSpatial) {
      SFX.playSpatialSlash();
      const targetDist = 150;
      const tx = Math.min(960, Math.max(64, this.x + Math.cos(rad) * targetDist * this.facing));
      const ty = Math.min(this.floorY - 20, Math.max(160, (this.y - 45) - Math.sin(rad) * 120));
      engine.spatialRifts.push(new SpatialRift(tx, ty, this.isPlayer, moveData.damage));
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
    if (this.isParrying && this.moveFrame <= (this.currentMove.parryWindow || 8)) {
      SFX.playParry();
      engine.addScreenShake(8, 15);
      engine.spawnSparks(this.x, this.y - 45, '#00f0ff', 24);
      engine.addDamageText(this.x, this.y - 65, 'PARRY!', '#00f0ff', true);
      this.superMeter = Math.min(this.maxSuper, this.superMeter + 25);

      if (attacker) {
        attacker.hitstunFrames = 35;
        attacker.currentMove = null;
      }
      return 0;
    }

    // BLOCK CHECK
    if (this.isBlocking) {
      const reduced = Math.max(1, Math.round(dmg * 0.2));
      this.hp = Math.max(0, this.hp - reduced);
      this.vx = -this.facing * 3.5;
      SFX.playPunch(90);
      engine.spawnSparks(this.x, this.y - 45, '#ffd166', 8);
      engine.addDamageText(this.x, this.y - 55, `GUARD -${reduced}`, '#7d8b99');
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

    // Dynamic launch vector based on attacker's Aim Wheel
    const aimDeg = attacker ? attacker.aimAngle : 0;
    const rad = (aimDeg * Math.PI) / 180;

    if (isSpike || aimDeg < -20) {
      // Downward Spike into floor
      SFX.playHeavySlash();
      engine.addScreenShake(9, 18);
      engine.spawnSparks(this.x, this.floorY, '#ff3366', 26);
      this.hitstunFrames = 26;
      this.vy = 13;
      this.vx = -this.facing * 4;
    } else if (isHeavy || aimDeg > 20) {
      // High Aerial Juggle Launch
      SFX.playHeavySlash();
      engine.addScreenShake(7, 16);
      engine.spawnSparks(this.x, this.y - 45, '#ff3366', 22);
      this.hitstunFrames = 28;
      this.vy = -10 - Math.sin(rad) * 7;
      this.isAirborne = true;
      this.vx = -this.facing * (4 + Math.cos(rad) * 4);
    } else {
      // Standard Impact
      SFX.playPunch(140);
      engine.addScreenShake(3, 8);
      engine.spawnSparks(this.x, this.y - 45, '#ffd166', 14);
      this.hitstunFrames = 18;
      this.vx = -this.facing * 4;
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

    // ── ANIME WALL BOUNCE / WALL SPLAT ──
    if (this.x <= 65) {
      this.x = 65;
      if (Math.abs(this.vx) >= 4) {
        SFX.playWallBounce();
        engine.addScreenShake(8, 16);
        engine.spawnSparks(65, this.y - 45, '#00f0ff', 24);
        engine.addDamageText(80, this.y - 65, 'WALL BOUNCE!', '#00f0ff', true);
        this.vx = Math.abs(this.vx) * 0.7; // Bounce off left wall
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
        this.vx = -Math.abs(this.vx) * 0.7; // Bounce off right wall
        this.vy = -6;
        this.isAirborne = true;
      } else {
        this.vx = 0;
      }
    }

    // Decay afterimages
    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      this.afterimages[i].alpha *= 0.8;
      if (this.afterimages[i].alpha < 0.05) this.afterimages.splice(i, 1);
    }

    // Hitstun reduction
    if (this.hitstunFrames > 0) {
      this.hitstunFrames--;
      return;
    }

    // Move progression
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
  }

  draw(ctx) {
    ctx.save();

    // Draw afterimages
    this.afterimages.forEach(img => {
      ctx.save();
      ctx.globalAlpha = img.alpha;
      ctx.fillStyle = img.color;
      ctx.fillRect(img.x - this.width / 2, img.y - this.height, this.width, this.height);
      ctx.restore();
    });

    // Shadow on ground
    ctx.beginPath();
    ctx.ellipse(this.x, this.floorY + 2, 26, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();

    const drawX = this.x - this.width / 2;
    const drawY = this.y - this.height;

    // Invulnerability aura
    if (this.isInvulnerable) {
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - this.facing * 16 - this.width / 2, drawY, this.width, this.height);
      ctx.globalAlpha = 1.0;
    }

    // Body Color
    ctx.fillStyle = this.hitstunFrames > 0 ? '#ffffff' : this.color;
    ctx.strokeStyle = '#05080f';
    ctx.lineWidth = 2.5;

    // Torso / Body
    ctx.beginPath();
    ctx.roundRect(drawX, drawY + 20, this.width, this.height - 20, 6);
    ctx.fill();
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(this.x, drawY + 11, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Visor / Eyes
    ctx.fillStyle = this.isPlayer ? '#00f0ff' : '#ff3366';
    ctx.fillRect(this.x + this.facing * 4 - 3, drawY + 8, 7, 3.5);

    // Guard shield aura
    if (this.isBlocking || this.isParrying) {
      ctx.beginPath();
      ctx.arc(this.x + this.facing * 16, this.y - 45, 42, -Math.PI / 2, Math.PI / 2, this.facing === -1);
      ctx.strokeStyle = this.isParrying ? '#00f0ff' : 'rgba(255, 209, 102, 0.7)';
      ctx.lineWidth = 3.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  drawGhostPreview(ctx, moveKey, aimDeg = 0) {
    const moveData = MOVES[moveKey];
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
      targetX = this.x + Math.cos(rad) * 220 * this.facing;
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

    // Trajectory Dotted Arrow for Movement
    if (moveData.category === 'movement' || moveKey === 'DIVE_KICK') {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - 45);
      ctx.lineTo(targetX, targetY - 45);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.arc(targetX, targetY - 45, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.fill();
    }

    // Ghost body silhouette
    ctx.beginPath();
    ctx.roundRect(targetX - this.width / 2, targetY - this.height, this.width, this.height, 6);
    ctx.fill();
    ctx.stroke();

    // Attack Previews
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
      ctx.beginPath();
      ctx.arc(tx, ty, 55, 0, Math.PI * 2);
      ctx.strokeStyle = '#00f0ff';
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tx - 65, ty);
      ctx.lineTo(tx + 65, ty);
      ctx.moveTo(tx, ty - 65);
      ctx.lineTo(tx, ty + 65);
      ctx.stroke();
    } else if (moveKey === 'WHIRLWIND') {
      ctx.beginPath();
      ctx.arc(targetX, targetY - 45, 90, 0, Math.PI * 2);
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

// ── 6. ROGUELITE REWARDS: PERKS & ACTIVE SKILL UNLOCKS ──────────────────────
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

// ── 7. MAIN ENGINE (SIMULTANEOUS YOMI CONTROLLER & REPLAY RECORDER) ──────────
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

    // Replay Recorder & Playback Engine
    this.replayFrames = [];
    this.replayCurrentFrame = 0;
    this.replayPlaying = false;
    this.replaySpeed = 1.0;

    // Meta Progression
    this.meta = this.loadMeta();

    // Run Data
    this.stage = 1;
    this.maxStages = 5;
    this.activePerks = new Set();
    this.unlockedMoves = new Set();
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

  setupUI() {
    // Initialize Aim Wheel
    this.aimWheel = new AimWheel('aim-canvas', 'aim-readout', (angle) => {
      this.selectedAimAngle = angle;
    });

    // Move Selection Buttons
    document.querySelectorAll('.btn-move').forEach(btn => {
      this.wireMoveButton(btn);
    });

    // Default selection
    const defaultBtn = document.querySelector('.btn-move[data-move="QUICK_JAB"]');
    if (defaultBtn) defaultBtn.classList.add('selected');

    // LOCK IN BUTTON
    document.getElementById('btn-lock-in').addEventListener('click', () => {
      SFX.init();
      this.lockInTurn();
    });

    // Keyboard Shortcuts: Space / Enter to Lock In or Replay Play/Pause
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

    // Top Replay Button
    document.getElementById('btn-top-replay').addEventListener('click', () => this.startReplay());

    // Overlay Replay Buttons
    document.getElementById('btn-draft-replay').addEventListener('click', () => this.startReplay());
    document.getElementById('btn-gameover-replay').addEventListener('click', () => this.startReplay());

    // Replay Bar Controls
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

    // Title / Overlay Buttons
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

    this.updateTitleShards();
  }

  wireMoveButton(btn) {
    btn.addEventListener('click', () => {
      SFX.init();
      document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      this.selectedPlayerMove = btn.dataset.move;
      const moveData = MOVES[this.selectedPlayerMove];
      document.getElementById('move-desc').innerText = `${moveData.name} (${moveData.desc})`;
    });
  }

  unlockMove(moveKey) {
    this.unlockedMoves.add(moveKey);
    const moveData = MOVES[moveKey];
    if (!moveData) return;

    let containerId = 'attack-btns';
    if (moveData.category === 'movement' || moveData.type === 'MOVEMENT') {
      containerId = 'movement-btns';
    } else if (moveData.type === 'SPECIAL' || moveData.superCost > 0) {
      containerId = 'special-btns';
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    if (container.querySelector(`.btn-move[data-move="${moveKey}"]`)) return;

    const btn = document.createElement('button');
    btn.className = 'btn-move unlocked-btn';
    if (moveData.type === 'SPECIAL') btn.classList.add('special-btn');
    btn.dataset.move = moveKey;

    const infoLabel = moveData.superCost > 0
      ? `${moveData.superCost} SP`
      : (moveData.damage > 0 ? `${moveData.startup}f • ${moveData.damage} Dmg` : 'Mobility');

    btn.innerHTML = `
      <span>${moveData.name.split(' ')[0]}</span>
      <span class="move-frames">${infoLabel}</span>
    `;

    this.wireMoveButton(btn);
    container.appendChild(btn);

    document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    this.selectedPlayerMove = moveKey;
    document.getElementById('move-desc').innerText = `${moveData.name} (${moveData.desc})`;
  }

  resetUnlockedMoveButtons() {
    document.querySelectorAll('.btn-move.unlocked-btn').forEach(btn => btn.remove());
    this.unlockedMoves.clear();
    const defaultBtn = document.querySelector('.btn-move[data-move="QUICK_JAB"]');
    if (defaultBtn) {
      document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
      defaultBtn.classList.add('selected');
      this.selectedPlayerMove = 'QUICK_JAB';
    }
  }

  updateTitleShards() {
    document.getElementById('title-shards').innerText = `Hustle Shards: ${this.meta.shards} 💎`;
  }

  startRun() {
    this.stage = 1;
    this.activePerks.clear();
    this.replayFrames = [];
    this.resetUnlockedMoveButtons();
    this.hideAllOverlays();
    this.initStage(this.stage);
  }

  initStage(num) {
    this.stage = num;
    this.particles = [];
    this.damageTexts = [];
    this.projectiles = [];
    this.spatialRifts = [];
    this.comboCount = 0;

    const bonusHp = this.meta.upgrades.hp * 20;
    const bonusAtk = this.meta.upgrades.atk * 3;
    const bonusCrit = this.meta.upgrades.crit * 0.05;

    // Create Player
    this.player = new TacticalFighter('Hustler', 260, true, '#00f0ff');
    this.player.maxHp = 100 + bonusHp + (this.hasPerk('colossus_heart') ? 50 : 0);
    this.player.hp = this.player.maxHp;
    this.player.atkBonus = bonusAtk;
    this.player.critChance = 0.1 + bonusCrit + (this.hasPerk('crit_master') ? 0.25 : 0);
    if (this.hasPerk('iron_wall')) this.player.defenseBonus += 0.25;

    // Create Stage Opponents
    const opponents = [
      { name: 'SHAOLIN NOVICE', hp: 85, color: '#e76f51', atk: 8 },
      { name: 'WANDERING RONIN', hp: 125, color: '#d90429', atk: 12 },
      { name: 'ARMORED COLOSSUS', hp: 180, color: '#9d4edd', atk: 16 },
      { name: 'SHADOW ASSASSIN', hp: 220, color: '#3a0ca3', atk: 20 },
      { name: 'GRANDMASTER VANE', hp: 320, color: '#ff0054', atk: 26 }
    ];

    const currentOpponent = opponents[Math.min(num - 1, opponents.length - 1)];
    this.enemy = new TacticalFighter(currentOpponent.name, 760, false, currentOpponent.color);
    this.enemy.maxHp = currentOpponent.hp;
    this.enemy.hp = currentOpponent.hp;
    this.enemy.atkBonus = currentOpponent.atk;

    // Update Stage UI
    document.getElementById('stage-display').innerText = `STAGE ${this.stage} / ${this.maxStages}`;
    document.getElementById('p1-name').innerText = 'HUSTLER (YOU)';
    document.getElementById('p2-name').innerText = this.enemy.name;

    this.openDecisionTurn();
    this.updateHUD();
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

  chooseAIMove() {
    const dist = Math.abs(this.enemy.x - this.player.x);
    const rand = Math.random();

    if (this.enemy.hitstunFrames > 0) {
      return 'BLOCK';
    }

    if (dist > 280) {
      if (this.enemy.superMeter >= 30 && rand < 0.4) return 'KI_BLAST';
      return rand < 0.6 ? 'DASH' : 'JUMP';
    } else if (dist > 95) {
      if (rand < 0.3) return 'HEAVY_SLASH';
      if (rand < 0.55) return 'SWEEP';
      if (rand < 0.8) return 'DASH';
      return 'STEP_FWD';
    } else {
      if (this.enemy.superMeter >= 60 && rand < 0.35) return 'DRAGON_UPPER';
      if (rand < 0.3) return 'PARRY';
      if (rand < 0.65) return 'QUICK_JAB';
      if (rand < 0.85) return 'LAUNCHER';
      return 'BLOCK';
    }
  }

  lockInTurn() {
    if (this.turnState !== 'DECISION') return;

    SFX.playLockIn();
    this.turnState = 'SIMULATING';
    document.getElementById('tactical-panel').classList.add('hidden');

    this.selectedEnemyMove = this.chooseAIMove();

    // AI Aim Vector: intelligent aiming based on move
    let enemyAimAngle = 0;
    if (this.selectedEnemyMove === 'LAUNCHER') enemyAimAngle = 45;
    else if (this.selectedEnemyMove === 'JUMP') enemyAimAngle = 60;
    else if (this.selectedEnemyMove === 'DASH') enemyAimAngle = this.enemy.isAirborne ? -30 : 20;

    // Trigger moves simultaneously with aim angles
    this.player.executeMove(this.selectedPlayerMove, this.selectedAimAngle);
    this.enemy.executeMove(this.selectedEnemyMove, enemyAimAngle);

    // Phantom dash perk
    if (this.selectedPlayerMove === 'DASH' && this.hasPerk('phantom_dash')) {
      this.spawnSparks(this.player.x, this.player.y - 40, '#00f0ff', 16);
      this.projectiles.push(new Projectile(this.player.x, this.player.y - 40, 0, 0, true, 32, '#00f0ff'));
    }

    const pDur = MOVES[this.selectedPlayerMove].duration || 16;
    const eDur = MOVES[this.selectedEnemyMove].duration || 16;
    this.simFramesLeft = Math.max(pDur, eDur, 18);
  }

  recordFrame() {
    // Record continuous frame snapshot without decision pauses
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

    // Check Spatial Rifts
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
        let isCrit = false;

        if (Math.random() < attacker.critChance) {
          isCrit = true;
          dmg *= (attacker.isPlayer && this.hasPerk('crit_master')) ? 2.4 : 1.7;
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
          this.addDamageText(defender.x, defender.y - 70, isCrit ? `${txt} CRIT!` : txt, isCrit ? '#ff3366' : '#fff', isCrit);

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
    // ── REPLAY PLAYBACK STATE ──
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

          // Live update HUD bars from replay frame
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

      // Projectiles
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

      // Record this uninterrupted action frame
      this.recordFrame();

      this.simFramesLeft--;

      // Check KO
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

    // Particles & Damage texts
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
    const shardsEarned = this.stage * 12;
    this.meta.shards += shardsEarned;
    this.saveMeta();

    if (this.stage >= this.maxStages) {
      document.getElementById('gameover-headline').innerText = 'EXPEDITION VICTORIOUS!';
      document.getElementById('gameover-headline').style.color = 'var(--accent-gold)';
      document.getElementById('gameover-sub').innerText = 'You defeated Grandmaster Vane and conquered the arena!';
      document.getElementById('gameover-shards').innerText = `+${shardsEarned + 60} Hustle Shards acquired! 💎`;
      document.getElementById('screen-gameover').classList.add('active');
    } else {
      this.showDraftOverlay();
    }
  }

  handleDefeat() {
    this.turnState = 'ROUND_OVER';
    const shardsEarned = this.stage * 5;
    this.meta.shards += shardsEarned;
    this.saveMeta();

    document.getElementById('gameover-headline').innerText = 'KNOCKED OUT';
    document.getElementById('gameover-headline').style.color = 'var(--accent-red)';
    document.getElementById('gameover-sub').innerText = `Fell in Stage ${this.stage}`;
    document.getElementById('gameover-shards').innerText = `+${shardsEarned} Hustle Shards preserved 💎`;
    document.getElementById('screen-gameover').classList.add('active');
  }

  showDraftOverlay() {
    const container = document.getElementById('buff-cards-container');
    container.innerHTML = '';

    const available = ROGUELITE_PERKS.filter(p => {
      if (p.kind === 'SKILL') {
        return !this.unlockedMoves.has(p.moveKey);
      }
      return !this.activePerks.has(p.id);
    });

    const randomThree = [...available].sort(() => 0.5 - Math.random()).slice(0, 3);

    randomThree.forEach(reward => {
      const card = document.createElement('div');
      card.className = 'perk-card';

      let tierClass = `tier-${reward.rarity}`;
      if (reward.kind === 'SKILL') {
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
        if (reward.kind === 'SKILL') {
          this.unlockMove(reward.moveKey);
        } else {
          this.activePerks.add(reward.id);
        }
        document.getElementById('screen-draft').classList.remove('active');
        this.initStage(this.stage + 1);
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
      { key: 'crit', name: 'Eagle Focus (+5% Critical Rate)', cost: 25 },
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
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, '#0d111a');
    grad.addColorStop(0.65, '#161d2d');
    grad.addColorStop(1, '#07090f');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    const floorY = 470;
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, floorY);
    this.ctx.lineTo(this.width, floorY);
    this.ctx.stroke();

    this.ctx.fillStyle = '#0b0f17';
    this.ctx.fillRect(0, floorY, this.width, this.height - floorY);

    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    for (let x = 0; x <= this.width; x += 55) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, floorY);
      this.ctx.lineTo(x - 60, this.height);
      this.ctx.stroke();
    }
  }

  drawReplayFrame(frame) {
    this.drawArena();

    // Afterimages
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

    // Shadows
    this.ctx.beginPath();
    this.ctx.ellipse(frame.p.x, 472, 26, 6, 0, 0, Math.PI * 2);
    this.ctx.ellipse(frame.e.x, 472, 26, 6, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fill();

    // Fighters Bodies
    const drawFighterSnapshot = (f) => {
      this.ctx.save();
      const drawX = f.x - f.width / 2;
      const drawY = f.y - f.height;

      if (f.isInvulnerable) {
        this.ctx.globalAlpha = 0.45;
        this.ctx.fillStyle = f.color;
        this.ctx.fillRect(f.x - f.facing * 16 - f.width / 2, drawY, f.width, f.height);
        this.ctx.globalAlpha = 1.0;
      }

      this.ctx.fillStyle = f.hitstunFrames > 0 ? '#ffffff' : f.color;
      this.ctx.strokeStyle = '#05080f';
      this.ctx.lineWidth = 2.5;

      this.ctx.beginPath();
      this.ctx.roundRect(drawX, drawY + 20, f.width, f.height - 20, 6);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(f.x, drawY + 11, 13, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = f === frame.p ? '#00f0ff' : '#ff3366';
      this.ctx.fillRect(f.x + f.facing * 4 - 3, drawY + 8, 7, 3.5);

      if (f.isBlocking || f.isParrying) {
        this.ctx.beginPath();
        this.ctx.arc(f.x + f.facing * 16, f.y - 45, 42, -Math.PI / 2, Math.PI / 2, f.facing === -1);
        this.ctx.strokeStyle = f.isParrying ? '#00f0ff' : 'rgba(255, 209, 102, 0.7)';
        this.ctx.lineWidth = 3.5;
        this.ctx.stroke();
      }
      this.ctx.restore();
    };

    drawFighterSnapshot(frame.p);
    drawFighterSnapshot(frame.e);

    // Projectiles
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

    // Particles
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

    // Damage texts
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

    // Cinematic Anime Letterbox bars
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, 24);
    this.ctx.fillRect(0, this.height - 24, this.width, 24);
  }

  render() {
    this.ctx.save();

    // ── REPLAY MODE RENDERING ──
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

    // ── NORMAL GAMEPLAY RENDERING ──
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
