// ============================================================================
// COMBAT ENTITIES: PARTICLES, DAMAGE TEXT, PROJECTILES, RIFTS & TACTICAL FIGHTER
// ============================================================================

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
    this.hasHit = false;
    this.hitsDealt = 0;
    this.lastHitFrame = -999;
    this.hasMomentumBoost = false;

    // Mobility Spam and Punish Vulnerability System
    this.lastMoveKey = null;
    this.consecutiveMobilityCount = 0;
    this.isVulnerable = false;
    this.vulnerableTurns = 0;
    this.hasSpamPenalty = false;

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
    let moveData = window.engine ? window.engine.getMoveData(moveKey, this.isPlayer) : (typeof MOVES !== 'undefined' ? MOVES[moveKey] : null);
    if (!moveData) return;

    // Enforce SP cost deduction
    if (moveData.superCost > 0) {
      if (this.superMeter < moveData.superCost) {
        return; // Insufficient SP safeguard
      }
      this.superMeter = Math.max(0, this.superMeter - moveData.superCost);
    }

    // Mobility Attack Detection and Consecutive Spam Penalty
    const isMobilityAttack = ['DIVE_KICK', 'COMET_CRASH', 'PHANTOM_SLIDE', 'SWEEP', 'THUNDER_GALE'].includes(moveKey) ||
      ((moveData.type === 'ATTACK' || moveData.type === 'SPECIAL') && (moveData.moveDist > 0 || moveData.spikesDown));

    if (isMobilityAttack) {
      if (this.lastMoveKey === moveKey) {
        this.consecutiveMobilityCount = (this.consecutiveMobilityCount || 0) + 1;
        this.hasSpamPenalty = true;
      } else {
        this.consecutiveMobilityCount = 1;
        this.hasSpamPenalty = false;
      }
    } else {
      this.consecutiveMobilityCount = 0;
      this.hasSpamPenalty = false;
    }

    this.lastMoveKey = moveKey;

    if (this.hasSpamPenalty && this.consecutiveMobilityCount > 1) {
      const extraStartup = 4 * Math.min(3, this.consecutiveMobilityCount - 1);
      const extraRecovery = 6 * Math.min(3, this.consecutiveMobilityCount - 1);
      moveData = {
        ...moveData,
        startup: (moveData.startup || 4) + extraStartup,
        duration: (moveData.duration || 16) + extraStartup + extraRecovery
      };
      if (window.engine) {
        window.engine.addDamageText(this.x, this.y - 75, `SPAM PENALTY! +${extraStartup}f LAG`, '#ffaa00', true);
        window.engine.spawnSparks(this.x, this.y - 45, '#ffaa00', 8);
      }
    }

    this.currentMove = moveData;
    this.moveKey = moveKey;
    this.moveFrame = 0;
    this.aimAngle = aimDeg;
    this.hasHit = false;
    this.hitsDealt = 0;
    this.lastHitFrame = -999;

    const rad = (aimDeg * Math.PI) / 180;

    // Momentum Engine Perk
    if (['DASH', 'JUMP', 'SUPER_DASH', 'DOUBLE_JUMP', 'GHOST_STEP'].includes(moveKey)) {
      if (this.isPlayer && window.engine && window.engine.hasPerk('momentum_engine')) {
        this.hasMomentumBoost = true;
      }
    }

    // ── MOVEMENT RESOLUTION ──
    if (moveKey === 'DASH') {
      SFX.playDash();
      this.spawnAfterimage();
      const dashSpeed = 16.5 + (moveData.speedBoost || 0);
      this.vx = Math.cos(rad) * dashSpeed * this.facing;
      this.vy = -Math.sin(rad) * 14.5;
      if (Math.abs(this.vy) > 2) this.isAirborne = true;

      // Upgraded Dash Spark Trap
      if (moveData.hasMine && this.isPlayer && window.engine) {
        window.engine.projectiles.push(new Projectile(this.x, this.y - 40, 0, 0, true, 20, '#ffd166'));
        window.engine.spawnSparks(this.x, this.y - 40, '#ffd166', 14);
      }
    } else if (moveKey === 'AIR_RECOVERY') {
      SFX.playDash();
      this.spawnAfterimage();
      this.hitstunFrames = 0;
      this.isInvulnerable = true;
      this.isAirborne = true;
      const techSpeed = 13;
      this.vx = Math.cos(rad) * techSpeed * this.facing;
      this.vy = -Math.sin(rad) * 11;
      if (window.engine) {
        window.engine.addDamageText(this.x, this.y - 65, 'AIR TECH!', '#00f0ff', true);
        window.engine.spawnSparks(this.x, this.y - 45, '#00f0ff', 16);
      }
      if (typeof PixelFX !== 'undefined') {
        PixelFX.spawnHitSpark(this.x, this.y - 45, '#00f0ff', 18);
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
    } else if (moveKey === 'GHOST_STEP') {
      SFX.playTeleport();
      if (window.engine) window.engine.spawnSparks(this.x, this.y - 45, '#00f0ff', 12);
      this.x += Math.cos(rad) * 110 * this.facing;
      this.y = Math.min(this.floorY, Math.max(160, this.y - Math.sin(rad) * 90));
      this.isAirborne = this.y < this.floorY;
      if (window.engine) window.engine.spawnSparks(this.x, this.y - 45, '#ffd166', 12);
      this.isInvulnerable = true;
    } else if (moveKey === 'SHADOW_TELEPORT') {
      SFX.playTeleport();
      if (window.engine) window.engine.spawnSparks(this.x, this.y - 45, '#00f0ff', 16);
      this.x += Math.cos(rad) * 160 * this.facing;
      this.y = Math.min(this.floorY, Math.max(160, this.y - Math.sin(rad) * 140));
      this.isAirborne = this.y < this.floorY;
      if (window.engine) window.engine.spawnSparks(this.x, this.y - 45, '#ffd166', 16);
      if (moveData.postInvuln) this.isInvulnerable = true;
    } else if (moveKey === 'DIVE_KICK') {
      SFX.playDash();
      this.spawnAfterimage();
      this.vx = Math.max(5, Math.abs(Math.cos(rad))) * 9 * this.facing;
      this.vy = 14;
      this.isAirborne = true;
    } else if (moveKey === 'COMET_CRASH') {
      SFX.playDash();
      this.spawnAfterimage();
      this.vx = Math.max(7, Math.abs(Math.cos(rad))) * 12 * this.facing;
      this.vy = 18;
      this.isAirborne = true;
    } else if (moveData.moveDist) {
      this.vx = (moveData.moveDist / moveData.duration) * this.facing;
    }

    if (moveData.jumpY && !['JUMP', 'DOUBLE_JUMP', 'DASH', 'SUPER_DASH', 'COMET_CRASH'].includes(moveKey)) {
      this.vy = moveData.jumpY;
      this.isAirborne = true;
    }

    // Projectile Spawning
    if (moveData.projectile && window.engine) {
      const spd = 19;
      const pvx = Math.cos(rad) * spd * this.facing;
      const pvy = -Math.sin(rad) * spd;
      const pColor = moveData.isFusion ? '#a78bfa' : '#00f0ff';
      window.engine.projectiles.push(new Projectile(this.x + this.facing * 35, this.y - 45, pvx, pvy, this.isPlayer, moveData.damage, pColor));

      // Upgraded Twin Blast
      if (moveData.dualProjectile) {
        const spreadRad = rad + 0.22;
        const pvx2 = Math.cos(spreadRad) * spd * this.facing;
        const pvy2 = -Math.sin(spreadRad) * spd;
        window.engine.projectiles.push(new Projectile(this.x + this.facing * 35, this.y - 45, pvx2, pvy2, this.isPlayer, moveData.damage * 0.75, '#ffd166'));
      }
    }

    // Spatial Slash Spawning
    if (moveData.isSpatial && window.engine) {
      SFX.playSpatialSlash();
      const targetDist = 150;
      const tx = Math.min(960, Math.max(64, this.x + Math.cos(rad) * targetDist * this.facing));
      const ty = Math.min(this.floorY - 20, Math.max(160, (this.y - 45) - Math.sin(rad) * 120));
      window.engine.spatialRifts.push(new SpatialRift(tx, ty, this.isPlayer, moveData.damage, moveData.riftRadius || 55));
    }

    this.isInvulnerable = !!moveData.isInvuln;
    this.isBlocking = moveKey === 'BLOCK' || moveKey === 'AEGIS_REFLECT';
    this.isParrying = moveKey === 'PARRY' || moveKey === 'BLADE_COUNTER';
    this.hasArmor = !!moveData.hasArmor;

    // Trigger PixelFX animations (from patch-gg/pixelfx)
    if (typeof PixelFX !== 'undefined') {
      const mKey = (moveKey || (moveData ? moveData.name : '') || '').toUpperCase();
      const pColorRamp = this.isPlayer ? ['#ffffff', '#00f0ff', '#0077b6', '#03045e'] : ['#ffffff', '#ff3366', '#990f30', '#3b000f'];

      const isSlash = ['QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'PHANTOM_SLIDE', 'BLADE_COUNTER', 'WHIRLWIND', 'DIVE_KICK'].includes(mKey) ||
        mKey.includes('SLASH') || mKey.includes('JAB') || mKey.includes('SWEEP') || mKey.includes('SLIDE') || mKey.includes('WHIRLWIND') || mKey.includes('RIPOSTE');

      const isFlame = ['DRAGON_UPPER', 'LAUNCHER', 'FIRE_BURST'].includes(mKey) ||
        mKey.includes('DRAGON') || mKey.includes('LAUNCHER') || mKey.includes('FIRE') || mKey.includes('BURST') || mKey.includes('UPPER');

      const isLightning = ['THUNDER_GALE', 'LIGHTNING_PALM'].includes(mKey) ||
        mKey.includes('THUNDER') || mKey.includes('LIGHTNING') || mKey.includes('GALE') || mKey.includes('PALM');

      const isVoid = ['VOID_CLEAVE', 'JUDGMENT_CUT'].includes(mKey) ||
        mKey.includes('VOID') || mKey.includes('JUDGMENT') || mKey.includes('CLEAVE') || mKey.includes('DIMENSIONAL');

      const isSlam = ['COMET_CRASH', 'GROUND_POUND', 'METEOR_STRIKE'].includes(mKey) ||
        mKey.includes('COMET') || mKey.includes('GROUND') || mKey.includes('METEOR') || mKey.includes('POUND') || mKey.includes('STOMP');

      if (isSlash) {
        PixelFX.spawnSlash(this.x + this.facing * 35, this.y - 45, this.facing, aimDeg, pColorRamp, (mKey === 'HEAVY_SLASH' || mKey.includes('SLASH')) ? 68 : 52);
      } else if (isFlame) {
        PixelFX.spawnFlamePillar(this.x + this.facing * 20, this.y, this.facing);
      } else if (isLightning) {
        PixelFX.spawnLightning(this.x, this.y - 45, this.x + this.facing * 140, this.y - 45);
      } else if (isVoid) {
        PixelFX.spawnVoidRift(this.x + this.facing * 60, this.y - 45, this.facing, 68);
      } else if (isSlam) {
        PixelFX.spawnGroundSlam(this.x, this.floorY, '#ffd166');
      }
    }

    if (moveData.type === 'SPECIAL' && !moveData.isSpatial) SFX.playSpecial();
  }

  takeHit(dmg, attacker, isHeavy = false, isSpike = false) {
    if (this.isInvulnerable) return 0;

    // PARRY CHECK
    const moveData = this.currentMove || {};
    const parryWin = moveData.parryWindow || 8;
    if (this.isParrying && this.moveFrame <= parryWin) {
      SFX.playParry();
      if (typeof PixelFX !== 'undefined') {
        PixelFX.spawnParry(this.x, this.y - 45, '#00f0ff');
      }
      if (window.engine) {
        window.engine.addScreenShake(8, 15);
        window.engine.spawnSparks(this.x, this.y - 45, '#00f0ff', 24);
        window.engine.addDamageText(this.x, this.y - 65, 'PARRY!', '#00f0ff', true);
      }
      this.superMeter = Math.min(this.maxSuper, this.superMeter + 25);

      if (moveData.parryHeal && this.isPlayer && window.engine) {
        this.hp = Math.min(this.maxHp, this.hp + moveData.parryHeal);
        window.engine.addDamageText(this.x, this.y - 85, `+${moveData.parryHeal} HP`, '#06d6a0');
      }

      if (attacker) {
        attacker.hitstunFrames = 35;
        attacker.currentMove = null;

        // Iron Retaliation Perk
        if (this.isPlayer && window.engine && window.engine.hasPerk('iron_parry')) {
          attacker.takeHit(12, null, false);
          window.engine.addDamageText(attacker.x, attacker.y - 70, '12 RETALIATE!', '#ffd166', true);
          window.engine.spawnSparks(attacker.x, attacker.y - 45, '#ffd166', 12);
        }
      }
      return 0;
    }

    // BLOCK CHECK
    if (this.isBlocking) {
      let blockRate = moveData.blockDamageReduce || 0.8;
      if (this.isPlayer && window.engine && window.engine.hasPerk('aegis_plating')) {
        blockRate = 1.0;
      }
      const reduced = Math.max(0, Math.round(dmg * (1 - blockRate)));
      this.hp = Math.max(0, this.hp - reduced);
      this.vx = -this.facing * 3.5;
      SFX.playPunch(90);
      if (typeof PixelFX !== 'undefined') {
        PixelFX.spawnBlock(this.x, this.y - 45, '#ffd166');
      }
      if (window.engine) {
        window.engine.spawnSparks(this.x, this.y - 45, '#ffd166', 8);
        window.engine.addDamageText(this.x, this.y - 55, reduced > 0 ? `GUARD -${reduced}` : 'GUARD BLOCKED 100%', '#7d8b99');
      }

      // Fortress Guard Reflection
      if (moveData.reflectDmg && attacker) {
        attacker.takeHit(moveData.reflectDmg, null, false);
        if (window.engine) window.engine.addDamageText(attacker.x, attacker.y - 60, `${moveData.reflectDmg} REFLECT!`, '#00f0ff', true);
      } else if (this.isPlayer && window.engine && window.engine.hasPerk('iron_parry') && attacker) {
        attacker.takeHit(12, null, false);
        window.engine.addDamageText(attacker.x, attacker.y - 70, '12 RETALIATE!', '#ffd166', true);
        window.engine.spawnSparks(attacker.x, attacker.y - 45, '#ffd166', 10);
      }
      return reduced;
    }

    // SUPER ARMOR CHECK
    if (this.hasArmor && !isHeavy) {
      const reduced = Math.round(dmg * 0.7);
      this.hp = Math.max(0, this.hp - reduced);
      SFX.playPunch(110);
      if (window.engine) {
        window.engine.spawnSparks(this.x, this.y - 45, '#ffd166', 12);
        window.engine.addDamageText(this.x, this.y - 60, `ARMORED -${reduced}`, '#ffd166');
      }
      return reduced;
    }

    // FULL IMPACT HIT
    let finalDmg = Math.max(1, Math.round(dmg * (1 - this.defenseBonus)));

    // Punish Counter Check (Target was in Vulnerable state)
    if (this.isVulnerable) {
      finalDmg = Math.round(finalDmg * 1.35);
      this.isVulnerable = false;
      this.vulnerableTurns = 0;
      if (typeof PixelFX !== 'undefined') {
        PixelFX.spawnCrit(this.x, this.y - 45, '#ff0055');
      }
      if (window.engine) {
        window.engine.addDamageText(this.x, this.y - 95, 'PUNISH COUNTER +35%!', '#ff0055', true);
        window.engine.spawnSparks(this.x, this.y - 45, '#ff0055', 18);
        window.engine.addScreenShake(6, 12);
      }
    }

    if (typeof PixelFX !== 'undefined') {
      PixelFX.spawnHitSpark(this.x, this.y - 45, isSpike ? '#ff3366' : '#ffd166', isHeavy ? 20 : 12);
    }

    this.hp = Math.max(0, this.hp - finalDmg);

    const aimDeg = attacker ? attacker.aimAngle : 0;
    const rad = (aimDeg * Math.PI) / 180;
    const launchBonus = (attacker && attacker.currentMove && attacker.currentMove.launchBoost) || 0;
    const kbBonus = (attacker && attacker.currentMove && attacker.currentMove.knockbackBoost) || 0;

    if (isSpike || aimDeg < -20) {
      SFX.playHeavySlash();
      if (window.engine) {
        window.engine.addScreenShake(9, 18);
        window.engine.spawnSparks(this.x, this.floorY, '#ff3366', 26);
      }
      this.hitstunFrames = 26;
      this.vy = 13;
      this.vx = -this.facing * (4 + kbBonus / 10);
    } else if (isHeavy || aimDeg > 20) {
      SFX.playHeavySlash();
      if (window.engine) {
        window.engine.addScreenShake(7, 16);
        window.engine.spawnSparks(this.x, this.y - 45, '#ff3366', 22);
      }
      this.hitstunFrames = 28;
      this.vy = -10 - Math.sin(rad) * 7 - launchBonus;
      this.isAirborne = true;
      this.vx = -this.facing * (4 + Math.cos(rad) * 4 + kbBonus / 10);
    } else {
      SFX.playPunch(140);
      if (window.engine) {
        window.engine.addScreenShake(3, 8);
        window.engine.spawnSparks(this.x, this.y - 45, '#ffd166', 14);
      }
      this.hitstunFrames = 18;
      this.vx = -this.facing * (4 + kbBonus / 10);
    }

    this.currentMove = null;
    this.hasHit = false;
    this.hitsDealt = 0;
    return finalDmg;
  }

  updateFramePhysics() {
    this.vy += 0.58;
    this.x += this.vx;
    this.y += this.vy;

    // Floor collision
    if (this.y >= this.floorY) {
      if (this.vy > 9 && window.engine) {
        window.engine.addScreenShake(5, 8);
        window.engine.spawnSparks(this.x, this.floorY, '#ffffff', 10);
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
        if (window.engine) {
          window.engine.addScreenShake(8, 16);
          window.engine.spawnSparks(65, this.y - 45, '#00f0ff', 24);
          window.engine.addDamageText(80, this.y - 65, 'WALL BOUNCE!', '#00f0ff', true);
        }
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
        if (window.engine) {
          window.engine.addScreenShake(8, 16);
          window.engine.spawnSparks(959, this.y - 45, '#ff3366', 24);
          window.engine.addDamageText(940, this.y - 65, 'WALL BOUNCE!', '#ff3366', true);
        }
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
        this.hasHit = false;
        this.hitsDealt = 0;
      }
    }
    this.animTick = (this.animTick || 0) + 1;
  }

  draw(ctx) {
    renderFighterModel(ctx, this, this.isPlayer);
  }

  drawGhostPreview(ctx, moveKey, aimDeg = 0) {
    const moveData = window.engine ? window.engine.getMoveData(moveKey, this.isPlayer) : null;
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
    } else if (moveKey === 'AIR_RECOVERY') {
      targetX = this.x + Math.cos(rad) * 140 * this.facing;
      targetY = Math.min(this.floorY, this.y - Math.sin(rad) * 120);
    } else if (moveKey === 'JUMP') {
      targetX = this.x + Math.cos(rad) * 150 * this.facing;
      targetY = Math.min(this.floorY, this.y - (Math.sin(rad) > 0 ? Math.sin(rad) * 160 : 120));
    } else if (moveKey === 'SUPER_DASH') {
      targetX = this.x + Math.cos(rad) * 300 * this.facing;
      targetY = Math.min(this.floorY, this.y - Math.sin(rad) * 180);
    } else if (moveKey === 'DOUBLE_JUMP') {
      targetX = this.x + Math.cos(rad) * 140 * this.facing;
      targetY = Math.min(this.floorY, this.y - 140);
    } else if (moveKey === 'GHOST_STEP') {
      targetX = this.x + Math.cos(rad) * 110 * this.facing;
      targetY = Math.min(this.floorY, Math.max(160, this.y - Math.sin(rad) * 90));
    } else if (moveKey === 'SHADOW_TELEPORT') {
      targetX = Math.min(960, Math.max(64, this.x + Math.cos(rad) * 160 * this.facing));
      targetY = Math.min(this.floorY, Math.max(160, this.y - Math.sin(rad) * 140));
    } else if (moveKey === 'DIVE_KICK') {
      targetX = this.x + Math.cos(rad) * 120 * this.facing;
      targetY = this.floorY;
    } else if (moveKey === 'COMET_CRASH') {
      targetX = this.x + Math.cos(rad) * 150 * this.facing;
      targetY = this.floorY;
    } else {
      targetX = this.x + (moveData.moveDist || 0) * this.facing;
      targetY = this.y + (moveData.jumpY ? moveData.jumpY * 2.5 : 0);
    }

    if (moveData.category === 'movement' || moveKey === 'DIVE_KICK' || moveKey === 'COMET_CRASH') {
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

    if (moveKey === 'KI_BLAST' || moveKey === 'FIRE_BURST') {
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.moveTo(this.x + this.facing * 30, this.y - 45);
      ctx.lineTo(this.x + Math.cos(rad) * 360 * this.facing, (this.y - 45) - Math.sin(rad) * 360);
      ctx.stroke();
    } else if (moveKey === 'JUDGMENT_CUT' || moveKey === 'VOID_CLEAVE') {
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

if (typeof window !== 'undefined') {
  window.Particle = Particle;
  window.DamageText = DamageText;
  window.Projectile = Projectile;
  window.SpatialRift = SpatialRift;
  window.TacticalFighter = TacticalFighter;
}
if (typeof module !== 'undefined') {
  module.exports = { Particle, DamageText, Projectile, SpatialRift, TacticalFighter };
}
