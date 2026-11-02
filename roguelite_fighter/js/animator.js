// ============================================================================
// PROCEDURAL MARTIAL ARTS FIGHTER ANIMATOR (ANIME RIG)
// ============================================================================

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
  } else if (f.isBlocking || f.isParrying || moveKey === 'BLOCK' || moveKey === 'PARRY' || moveKey === 'AEGIS_REFLECT') {
    bodyAngle = -0.1 * facing;
    lArmAngle = 1.2 * facing;
    rArmAngle = 1.0 * facing;
  } else if ((moveKey === 'QUICK_JAB' || moveKey === 'THUNDER_GALE' || moveKey === 'LIGHTNING_PALM' || moveKey === 'KI_BLAST' || moveKey === 'FIRE_BURST') && moveFrame > 0 && moveFrame <= 9) {
    bodyAngle = 0.22 * facing;
    punchReach = 36 * facing;
    rArmAngle = 1.4 * facing;
  } else if ((moveKey === 'HEAVY_SLASH' || moveKey === 'VOID_CLEAVE' || moveKey === 'WHIRLWIND' || moveKey === 'JUDGMENT_CUT' || moveKey === 'BLADE_COUNTER') && moveFrame > 0 && moveFrame <= 15) {
    bodyAngle = 0.35 * facing;
    bladeSlashArc = (moveFrame / 15) * Math.PI * 1.5;
    rArmAngle = -0.8 * facing + (moveFrame / 15) * 2.4 * facing;
  } else if ((moveKey === 'SWEEP' || moveKey === 'PHANTOM_SLIDE') && moveFrame > 0) {
    bobY = 16;
    lLegAngle = 1.4 * facing;
    rLegAngle = -1.1 * facing;
  } else if ((moveKey === 'LAUNCHER' || moveKey === 'COMET_CRASH' || moveKey === 'DRAGON_UPPER' || moveKey === 'METEOR_STRIKE' || moveKey === 'GROUND_POUND') && moveFrame > 0) {
    bodyAngle = -0.25 * facing;
    rArmAngle = -2.0 * facing;
    bobY = -14;
  } else if ((moveKey === 'DASH' || moveKey === 'SUPER_DASH' || moveKey === 'GHOST_STEP' || moveKey === 'SHADOW_TELEPORT') && moveFrame > 0) {
    bodyAngle = 0.45 * facing;
    bobY = 6;
    lLegAngle = -0.9 * facing;
    rLegAngle = 1.3 * facing;
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
  const darkSuit = f.bodyColor || (isPlayer ? '#0f172a' : '#1e1124');
  const accentTrim = f.accentColor || (isPlayer ? '#38bdf8' : '#fb7185');

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

if (typeof window !== 'undefined') {
  window.renderFighterModel = renderFighterModel;
}
if (typeof module !== 'undefined') {
  module.exports = { renderFighterModel };
}


