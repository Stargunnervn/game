/**
 * PIXELFX ENGINE for YOMI ROGUE
 * Adapted from patch-gg/pixelfx (MIT License, Copyright (c) 2026 Patch / Hugo Duprez)
 * Pure JavaScript code-based pixel art effects and procedural particle physics.
 */

// 4x4 Ordered Bayer Matrix for Authentic Retro Pixel Dithering
const PIXEL_BAYER_4X4 = [
  0 / 16,  8 / 16,  2 / 16, 10 / 16,
 12 / 16,  4 / 16, 14 / 16,  6 / 16,
  3 / 16, 11 / 16,  1 / 16,  9 / 16,
 15 / 16,  7 / 16, 13 / 16,  5 / 16
];

class PixelFXManager {
  constructor() {
    this.effects = [];
    this.pixelSize = 4; // 4x4 screen pixels per virtual pixel for bold, chunky retro arcade look
    this.floorY = 470;
  }

  clear() {
    this.effects = [];
  }

  update(dt = 1 / 60) {
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const fx = this.effects[i];
      fx.update(dt);
      if (fx.isDone()) {
        this.effects.splice(i, 1);
      }
    }
  }

  render(ctx) {
    if (this.effects.length === 0) return;
    ctx.save();
    for (let i = 0; i < this.effects.length; i++) {
      this.effects[i].render(ctx, this.pixelSize);
    }
    ctx.restore();
  }

  // ── SPAWNER SHORTCUTS ──────────────────────────────────────────────

  // 1. Parry Clash (clashing X-lines flash, 4-point star, broken ring shockwave, spray of sparks)
  spawnParry(x, y, color = '#ffd166') {
    this.effects.push(new PixelParryFX(x, y, color, this.floorY));
  }

  // 2. Shield Block (hexagonal energy barrier with deflection pulses)
  spawnBlock(x, y, color = '#00f0ff') {
    this.effects.push(new PixelShieldBlockFX(x, y, color));
  }

  // 3. Directional Slash (crescent smear with Bayer dither, cooling color ramp, tip spark)
  spawnSlash(x, y, facing, angleDeg, colorRamp = null, radius = 55) {
    this.effects.push(new PixelSlashFX(x, y, facing, angleDeg, colorRamp, radius));
  }

  // 4. Hit Spark (multi-directional bursting pixel motes with bright core)
  spawnHitSpark(x, y, color = '#ffd166', count = 16) {
    this.effects.push(new PixelHitSparkFX(x, y, color, count, this.floorY));
  }

  // 5. Weakpoint / Punish Crit (8-point impact star with expanding shockwave)
  spawnCrit(x, y, color = '#ff0055') {
    this.effects.push(new PixelCritImpactFX(x, y, color));
  }

  // 6. Flame Pillar (Dragon Upper / Launcher ascending fire with floating embers)
  spawnFlamePillar(x, y, facing, colorRamp = null) {
    this.effects.push(new PixelFlamePillarFX(x, y, facing, colorRamp, this.floorY));
  }

  // 7. Lightning Arc (Thunder Gale branching jagged bolts with electric nodes)
  spawnLightning(x0, y0, x1, y1, color = '#00f0ff') {
    this.effects.push(new PixelLightningFX(x0, y0, x1, y1, color));
  }

  // 8. Void Cleave Rift (dimensional tear, dark matter distortion, purple embers)
  spawnVoidRift(x, y, facing, radius = 60) {
    this.effects.push(new PixelVoidRiftFX(x, y, facing, radius));
  }

  // 9. Ground Slam Crater (Comet Crash / Ground Pound impact shockwave and rock debris)
  spawnGroundSlam(x, y = this.floorY, color = '#ffd166') {
    this.effects.push(new PixelGroundSlamFX(x, y, color, this.floorY));
  }
}

// ── EFFECT IMPLEMENTATIONS (PIXELFX ADAPTATIONS) ──────────────────────

/**
 * 1. PARRY CLASH EFFECT
 * Adapted from patch-gg/pixelfx src/fx/impacts/parry.js
 */
class PixelParryFX {
  constructor(x, y, mainColor = '#ffd166', floorY = 470) {
    this.x = x;
    this.y = y;
    this.floorY = floorY;
    this.duration = 0.58;
    this.t = 0;
    this.palette = [
      '#ffffff', // Core white
      mainColor, // Highlight
      '#e8b030', // Amber
      '#b07a1a', // Dark bronze
      '#6a4410'  // Shadow
    ];

    // Sparks with gravity and bounce
    this.sparks = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 1.5) + (Math.random() - 0.5) * 1.8;
      const speed = Math.random() * 260 + 120;
      this.sparks.push({
        x: this.x + (Math.random() - 0.5) * 8,
        y: this.y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 0.45 + 0.25,
        maxLife: 0.5,
        color: i % 3 === 0 ? '#ffffff' : this.palette[1 + (i % 3)],
        bounced: false
      });
    }

    // Broken ring segments
    this.segments = [];
    const segCount = 6;
    for (let i = 0; i < segCount; i++) {
      this.segments.push({
        a: (i / segCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2,
        arc: (Math.PI * 2 / segCount) * 0.65
      });
    }
  }

  update(dt) {
    this.t += dt;
    for (let i = 0; i < this.sparks.length; i++) {
      const s = this.sparks[i];
      s.vy += 850 * dt; // Gravity
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      // Bounce on floor
      if (s.y >= this.floorY && !s.bounced) {
        s.y = this.floorY;
        s.vy = -s.vy * 0.45;
        s.vx *= 0.6;
        s.bounced = true;
      }
      s.life -= dt;
    }
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const progress = Math.min(1, this.t / this.duration);

    // Initial clashing X flash lines (0 to 0.08s)
    if (this.t < 0.08) {
      const len = 42 * (1 - this.t / 0.08);
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = pSize * 1.5;
      ctx.beginPath();
      ctx.moveTo(this.x - len, this.y - len);
      ctx.lineTo(this.x + len, this.y + len);
      ctx.moveTo(this.x - len, this.y + len);
      ctx.lineTo(this.x + len, this.y - len);
      ctx.stroke();
      ctx.restore();
    }

    // 4-point expanding white star (0 to 0.22s)
    if (this.t < 0.22) {
      const u = this.t / 0.22;
      const rOuter = 28 * (1 - u * 0.5);
      const rInner = 6 * (1 - u * 0.5);
      this.drawStar(ctx, this.x, this.y, rInner, rOuter, 4, '#ffffff', pSize);
    }

    // Expanding broken shockwave ring
    if (this.t >= 0.03 && this.t < 0.45) {
      const uRing = (this.t - 0.03) / 0.42;
      const ringRadius = 12 + 65 * Math.sqrt(uRing);
      const alpha = Math.max(0, 1 - uRing);

      ctx.save();
      ctx.strokeStyle = this.palette[1];
      ctx.globalAlpha = alpha;
      ctx.lineWidth = pSize;
      for (let s of this.segments) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ringRadius, s.a, s.a + s.arc);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Bouncing physics sparks
    for (let s of this.sparks) {
      if (s.life <= 0) continue;
      const alpha = Math.max(0, s.life / s.maxLife);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(Math.round(s.x / pSize) * pSize, Math.round(s.y / pSize) * pSize, pSize, pSize);
    }
  }

  drawStar(ctx, cx, cy, r0, r1, n, color, pSize) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < n * 2; i++) {
      const a = (i * Math.PI) / n - Math.PI / 2;
      const r = i % 2 === 0 ? r1 : r0;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

/**
 * 2. SHIELD BLOCK EFFECT
 * Adapted from patch-gg/pixelfx src/fx/impacts/shield-block.js
 */
class PixelShieldBlockFX {
  constructor(x, y, color = '#00f0ff') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.duration = 0.48;
    this.t = 0;
    this.radius = 42;
  }

  update(dt) {
    this.t += dt;
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const u = this.t / this.duration;
    const alpha = Math.max(0, 1 - u);

    ctx.save();
    ctx.translate(this.x, this.y);

    // Draw 3 concentric hexagon pixel rings with pulsing dither
    for (let layer = 0; layer < 3; layer++) {
      const r = (this.radius - layer * 7) * (1 + u * 0.25);
      const ringAlpha = alpha * (1 - layer * 0.25);
      ctx.strokeStyle = layer === 0 ? '#ffffff' : this.color;
      ctx.globalAlpha = ringAlpha;
      ctx.lineWidth = pSize;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Center deflection spark
    if (this.t < 0.15) {
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 1 - (this.t / 0.15);
      ctx.fillRect(-pSize * 2, -pSize * 2, pSize * 4, pSize * 4);
    }

    ctx.restore();
  }
}

/**
 * 3. PIXEL SLASH EFFECT
 * Adapted from patch-gg/pixelfx src/fx/melee/sword-slash.js & heavy-cleave.js
 */
class PixelSlashFX {
  constructor(x, y, facing = 1, angleDeg = 0, colorRamp = null, radius = 62) {
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.baseAngle = (angleDeg * Math.PI) / 180;
    this.radius = radius || 62;
    this.duration = 0.44;
    this.t = 0;

    // Default palette: White core -> Bright cyan -> Mid blue -> Dark navy
    this.palette = colorRamp || ['#ffffff', '#62c8f4', '#2c58aa', '#1a2456'];

    // Flying spark motes thrown from blade tip
    this.sparks = [];
    for (let i = 0; i < 15; i++) {
      const spd = Math.random() * 140 + 75;
      const ang = this.baseAngle + (Math.random() - 0.5) * 0.8;
      this.sparks.push({
        x: this.x + Math.cos(ang) * this.radius * 0.9 * this.facing,
        y: this.y + Math.sin(ang) * this.radius * 0.9,
        vx: Math.cos(ang) * spd * this.facing,
        vy: Math.sin(ang) * spd,
        life: Math.random() * 0.28 + 0.16,
        maxLife: 0.44,
        color: this.palette[i % 2 === 0 ? 0 : 1]
      });
    }
  }

  update(dt) {
    this.t += dt;
    for (let s of this.sparks) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= dt;
    }
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const u = this.t / this.duration;
    const sweepSpan = Math.PI * 0.85;
    const startAng = this.baseAngle - sweepSpan * 0.5;
    const endAng = this.baseAngle + sweepSpan * 0.5;

    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.facing === -1) ctx.scale(-1, 1);

    // Thick pixelated crescent slash arc
    const arcCount = 5;
    for (let layer = 0; layer < arcCount; layer++) {
      const r = this.radius - layer * pSize;
      const colorIdx = Math.min(this.palette.length - 1, layer + Math.floor(u * 2.5));
      const col = this.palette[colorIdx];
      const alpha = Math.max(0, 1 - u * 1.2);

      ctx.strokeStyle = col;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = pSize * 1.35;
      ctx.beginPath();
      // Leading edge whips forward then dissolves
      const curStart = startAng + (endAng - startAng) * Math.max(0, u * 0.6);
      const curEnd = endAng;
      ctx.arc(0, 0, r, curStart, curEnd);
      ctx.stroke();
    }

    // Blade Tip Glint Spark (early frames)
    if (this.t < 0.12) {
      const tipX = Math.cos(endAng) * this.radius;
      const tipY = Math.sin(endAng) * this.radius;
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 1 - (this.t / 0.12);
      ctx.fillRect(tipX - pSize, tipY - pSize, pSize * 2, pSize * 2);
    }

    ctx.restore();

    // Sparks
    for (let s of this.sparks) {
      if (s.life <= 0) continue;
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.max(0, s.life / s.maxLife);
      ctx.fillRect(Math.round(s.x / pSize) * pSize, Math.round(s.y / pSize) * pSize, pSize, pSize);
    }
  }
}

/**
 * 4. PIXEL HIT SPARK EFFECT
 * Adapted from patch-gg/pixelfx src/fx/impacts/hit-spark.js
 */
class PixelHitSparkFX {
  constructor(x, y, color = '#ffd166', count = 22, floorY = 470) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.floorY = floorY;
    this.duration = 0.42;
    this.t = 0;

    this.particles = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 210 + 95;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 0.32 + 0.14,
        maxLife: 0.42,
        color: i % 2 === 0 ? '#ffffff' : color
      });
    }
  }

  update(dt) {
    this.t += dt;
    for (let p of this.particles) {
      p.vy += 650 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    }
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    // Core impact flash
    if (this.t < 0.10) {
      const flashR = (1 - this.t / 0.10) * 18;
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.95;
      ctx.fillRect(this.x - flashR, this.y - flashR, flashR * 2, flashR * 2);
    }

    // Flying pixel motes
    for (let p of this.particles) {
      if (p.life <= 0) continue;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillRect(Math.round(p.x / pSize) * pSize, Math.round(p.y / pSize) * pSize, pSize, pSize);
    }
  }
}

/**
 * 5. CRIT / PUNISH IMPACT EFFECT
 * Adapted from patch-gg/pixelfx src/fx/impacts/crit-hit.js
 */
class PixelCritImpactFX {
  constructor(x, y, color = '#ff0055') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.duration = 0.58;
    this.t = 0;
  }

  update(dt) {
    this.t += dt;
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const u = this.t / this.duration;
    const alpha = Math.max(0, 1 - u);

    ctx.save();
    ctx.translate(this.x, this.y);

    // 8-point expanding starburst
    if (this.t < 0.22) {
      const uStar = this.t / 0.22;
      const rOuter = 46 * (1 - uStar * 0.4);
      const rInner = 10 * (1 - uStar * 0.4);
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 1 - uStar;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8 - Math.PI / 2;
        const r = i % 2 === 0 ? rOuter : rInner;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }

    // Double expanding shockwave ring
    const ringRadius1 = 16 + 85 * Math.sqrt(u);
    const ringRadius2 = 10 + 60 * Math.sqrt(u);
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = pSize * 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, ringRadius1, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = pSize;
    ctx.beginPath();
    ctx.arc(0, 0, ringRadius2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
}

/**
 * 6. FLAME PILLAR EFFECT (Rising Dragon Super / Launcher)
 * Adapted from patch-gg/pixelfx src/fx/fire/flame-pillar.js & melee/uppercut.js
 */
class PixelFlamePillarFX {
  constructor(x, y, facing = 1, colorRamp = null, floorY = 470) {
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.floorY = floorY;
    this.duration = 0.70;
    this.t = 0;
    this.palette = colorRamp || ['#ffffff', '#ffd166', '#ff8a2a', '#f2561d', '#990f30'];

    this.embers = [];
    for (let i = 0; i < 38; i++) {
      this.embers.push({
        x: this.x + (Math.random() - 0.5) * 54,
        y: this.y + Math.random() * 40,
        vx: (Math.random() - 0.5) * 85 * this.facing,
        vy: -Math.random() * 360 - 200, // High-speed upward rise
        size: Math.random() > 0.4 ? 1 : 2,
        life: Math.random() * 0.5 + 0.2,
        maxLife: 0.70,
        color: this.palette[Math.floor(Math.random() * this.palette.length)]
      });
    }
  }

  update(dt) {
    this.t += dt;
    for (let e of this.embers) {
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.life -= dt;
    }
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const u = this.t / this.duration;
    const alpha = Math.max(0, 1 - u);

    // Billowing rising core pillar
    ctx.save();
    const pillarH = 240 * (1 - u * 0.3);
    const pillarW = 54 * (1 - u * 0.4);
    const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y - pillarH);
    grad.addColorStop(0, 'rgba(255, 209, 102, 0.95)');
    grad.addColorStop(0.35, 'rgba(242, 86, 29, 0.85)');
    grad.addColorStop(1, 'rgba(153, 15, 48, 0)');

    ctx.fillStyle = grad;
    ctx.globalAlpha = alpha;
    ctx.fillRect(this.x - pillarW * 0.5, this.y - pillarH, pillarW, pillarH);
    ctx.restore();

    // Flying pixel embers
    for (let e of this.embers) {
      if (e.life <= 0) continue;
      ctx.fillStyle = e.color;
      ctx.globalAlpha = Math.max(0, e.life / e.maxLife);
      ctx.fillRect(Math.round(e.x / pSize) * pSize, Math.round(e.y / pSize) * pSize, pSize * e.size, pSize * e.size);
    }
  }
}

/**
 * 7. LIGHTNING ARC EFFECT (Thunder Gale)
 * Adapted from patch-gg/pixelfx src/fx/lightning/lightning-strike.js & spark-arc.js
 */
class PixelLightningFX {
  constructor(x0, y0, x1, y1, color = '#00f0ff') {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.color = color;
    this.duration = 0.38;
    this.t = 0;

    // Generate jagged bolt points via midpoint displacement
    this.bolts = [this.generateBolt(x0, y0, x1, y1, 0.26, 4)];
    // Add 3 branch forks
    for (let b = 0; b < 3; b++) {
      const idx = Math.floor(Math.random() * (this.bolts[0].length - 2)) + 1;
      const pt = this.bolts[0][idx];
      const branchAngle = Math.random() * Math.PI * 2;
      const branchLen = Math.random() * 55 + 30;
      const tx = pt[0] + Math.cos(branchAngle) * branchLen;
      const ty = pt[1] + Math.sin(branchAngle) * branchLen;
      this.bolts.push(this.generateBolt(pt[0], pt[1], tx, ty, 0.3, 3));
    }
  }

  generateBolt(x0, y0, x1, y1, jag = 0.25, depth = 4) {
    let pts = [[x0, y0], [x1, y1]];
    for (let d = 0; d < depth; d++) {
      const next = [pts[0]];
      for (let i = 1; i < pts.length; i++) {
        const [ax, ay] = pts[i - 1];
        const [bx, by] = pts[i];
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.hypot(dx, dy);
        const off = (Math.random() * 2 - 1) * jag * len;
        next.push([(ax + bx) / 2 + (-dy / (len || 1)) * off, (ay + by) / 2 + (dx / (len || 1)) * off], pts[i]);
      }
      pts = next;
    }
    return pts;
  }

  update(dt) {
    this.t += dt;
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const alpha = Math.max(0, 1 - (this.t / this.duration));
    ctx.save();
    ctx.lineWidth = pSize * 1.6;
    ctx.globalAlpha = alpha;

    for (let b = 0; b < this.bolts.length; b++) {
      const bolt = this.bolts[b];
      ctx.strokeStyle = b === 0 ? '#ffffff' : this.color;
      ctx.beginPath();
      for (let i = 0; i < bolt.length; i++) {
        const [px, py] = bolt[i];
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
}

/**
 * 8. VOID RIFT EFFECT (Void Cleave / Judgment Cut)
 * Adapted from patch-gg/pixelfx src/fx/shadow/dark-explosion.js & shadow-flames.js
 */
class PixelVoidRiftFX {
  constructor(x, y, facing = 1, radius = 68) {
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.radius = radius || 68;
    this.duration = 0.65;
    this.t = 0;
    this.palette = ['#ffffff', '#c084fc', '#9333ea', '#581c87', '#0f051d'];

    this.voidEmbers = [];
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = Math.random() * 120 + 45;
      this.voidEmbers.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        life: Math.random() * 0.45 + 0.20,
        maxLife: 0.65,
        color: this.palette[i % this.palette.length]
      });
    }
  }

  update(dt) {
    this.t += dt;
    for (let e of this.voidEmbers) {
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.life -= dt;
    }
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const u = this.t / this.duration;
    const alpha = Math.max(0, 1 - u);

    ctx.save();
    ctx.translate(this.x, this.y);

    // Swirling dimensional slit
    const riftLen = this.radius * (1 - Math.abs(u - 0.4) * 1.5);
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 18;
    ctx.lineWidth = pSize * 1.6;
    ctx.beginPath();
    ctx.moveTo(-riftLen * 0.7 * this.facing, -riftLen * 0.6);
    ctx.lineTo(riftLen * 0.7 * this.facing, riftLen * 0.6);
    ctx.stroke();

    // Dark energy shockwave
    ctx.strokeStyle = '#a855f7';
    ctx.globalAlpha = alpha * 0.75;
    ctx.lineWidth = pSize;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.radius * Math.sqrt(u), this.radius * 0.45 * Math.sqrt(u), 0.4 * this.facing, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // Void embers
    for (let e of this.voidEmbers) {
      if (e.life <= 0) continue;
      ctx.fillStyle = e.color;
      ctx.globalAlpha = Math.max(0, e.life / e.maxLife);
      ctx.fillRect(Math.round(e.x / pSize) * pSize, Math.round(e.y / pSize) * pSize, pSize, pSize);
    }
  }
}

/**
 * 9. GROUND SLAM IMPACT EFFECT (Comet Crash / Ground Pound)
 * Adapted from patch-gg/pixelfx src/fx/impacts/ground-slam.js
 */
class PixelGroundSlamFX {
  constructor(x, y = 470, color = '#ffd166', floorY = 470) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.floorY = floorY;
    this.duration = 0.72;
    this.t = 0;

    // Flying rock debris
    this.debris = [];
    for (let i = 0; i < 24; i++) {
      const a = (Math.PI * 1.5) + (Math.random() - 0.5) * 1.6;
      const spd = Math.random() * 240 + 95;
      this.debris.push({
        x: this.x + (Math.random() - 0.5) * 20,
        y: this.floorY,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        size: Math.random() > 0.5 ? 2 : 1,
        life: Math.random() * 0.45 + 0.20,
        maxLife: 0.72,
        color: i % 2 === 0 ? '#64748b' : '#334155'
      });
    }
  }

  update(dt) {
    this.t += dt;
    for (let d of this.debris) {
      d.vy += 850 * dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.life -= dt;
    }
  }

  isDone() {
    return this.t >= this.duration;
  }

  render(ctx, pSize) {
    const u = this.t / this.duration;
    const alpha = Math.max(0, 1 - u);

    // Ground shockwave rings expanding horizontally
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = pSize;
    ctx.beginPath();
    const rX = 35 + 130 * Math.sqrt(u);
    const rY = 8 + 24 * Math.sqrt(u);
    ctx.ellipse(this.x, this.floorY, rX, rY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Flying rock debris
    for (let d of this.debris) {
      if (d.life <= 0) continue;
      ctx.fillStyle = d.color;
      ctx.globalAlpha = Math.max(0, d.life / d.maxLife);
      ctx.fillRect(Math.round(d.x / pSize) * pSize, Math.round(d.y / pSize) * pSize, pSize * d.size, pSize * d.size);
    }
  }
}

// Global Singleton
const PixelFX = new PixelFXManager();

if (typeof window !== 'undefined') {
  window.PixelFX = PixelFX;
  window.PixelFXManager = PixelFXManager;
}
if (typeof module !== 'undefined') {
  module.exports = { PixelFX, PixelFXManager };
}

