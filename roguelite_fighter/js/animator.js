// ============================================================================
// MARTIAL ARTS FIGHTER ANIMATOR (RETRO PIXEL-ART AND VECTOR FRAME RIG)
// Generated with crsolver/claude-pxl and patch-gg/pixelfx
// ============================================================================

// Global mode: Pixel Art Mode (claude-pxl) vs Vector Frame Rig
if (typeof window !== 'undefined' && typeof window.pixelArtMode === 'undefined') {
  window.pixelArtMode = true;
}

const PIXEL_SPRITES = {};
const SPRITE_MAP = {
  'HUSTLER': 'hustler',
  'boss_iron_shogun': 'iron_shogun',
  'boss_crimson_oni': 'crimson_oni',
  'boss_shadow_kunoichi': 'shadow_kunoichi',
  'boss_void_phantom_lord': 'void_phantom_lord',
  'boss_abyssal_leviathan': 'abyssal_leviathan',
  'boss_soul_reaper': 'soul_reaper',
  'boss_celestial_emperor': 'celestial_emperor',
  'boss_seraph_archon': 'seraph_archon',
  'boss_chronos_titan': 'chronos_titan'
};

function getSpriteKeyForFighter(f, isPlayer) {
  if (isPlayer) return 'hustler';
  if (f && f.catalogKey && SPRITE_MAP[f.catalogKey]) return SPRITE_MAP[f.catalogKey];
  const n = ((f && f.name) || '').toLowerCase();
  if (n.includes('oni') || n.includes('goryo') || n.includes('demon')) return 'crimson_oni';
  if (n.includes('shogun') || n.includes('monk') || n.includes('samurai') || n.includes('dojo')) return 'iron_shogun';
  if (n.includes('ninja') || n.includes('kunoichi') || n.includes('ayame') || n.includes('assassin') || n.includes('duelist')) return 'shadow_kunoichi';
  if (n.includes('void') || n.includes('phantom') || n.includes('cultist') || n.includes('inquisitor')) return 'void_phantom_lord';
  if (n.includes('leviathan') || n.includes('dagon') || n.includes('abomination') || n.includes('behemoth')) return 'abyssal_leviathan';
  if (n.includes('reaper') || n.includes('thanatos') || n.includes('soul') || n.includes('stalker')) return 'soul_reaper';
  if (n.includes('emperor') || n.includes('valkyrie') || n.includes('saint') || n.includes('templar')) return 'celestial_emperor';
  if (n.includes('seraph') || n.includes('uriel') || n.includes('archon') || n.includes('angel')) return 'seraph_archon';
  if (n.includes('chronos') || n.includes('aeon') || n.includes('chrono') || n.includes('titan') || n.includes('weaver')) return 'chronos_titan';
  return 'hustler';
}

function loadPixelSprite(key) {
  if (PIXEL_SPRITES[key]) return PIXEL_SPRITES[key];
  if (typeof Image === 'undefined') return null;
  const img = new Image();
  img.src = `assets/sprites/sprites/${key}.png`;
  PIXEL_SPRITES[key] = img;
  return img;
}

// Preload all sprites
if (typeof window !== 'undefined') {
  ['hustler', 'iron_shogun', 'crimson_oni', 'shadow_kunoichi', 'void_phantom_lord', 'abyssal_leviathan', 'soul_reaper', 'celestial_emperor', 'seraph_archon', 'chronos_titan'].forEach(k => {
    loadPixelSprite(k);
  });
}

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
    bobY = 4 + (Math.random() - 0.5) * 4;
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

  // ── RETRO 16-BIT PIXEL ART RENDERING MODE (FROM CLAUDE-PXL) ──
  const usePixelArt = (typeof window !== 'undefined') && (window.pixelArtMode !== false);
  if (usePixelArt) {
    const sKey = getSpriteKeyForFighter(f, isPlayer);
    const spriteImg = loadPixelSprite(sKey);
    if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
      ctx.save();
      ctx.translate(x, y - 48 + bobY);
      ctx.rotate(bodyAngle);
      if (facing === -1) ctx.scale(-1, 1);

      ctx.imageSmoothingEnabled = false;
      const scale = 5.2;
      const sw = spriteImg.naturalWidth * scale;
      const sh = spriteImg.naturalHeight * scale;

      // Hitstun white flash
      if (hitstun) {
        ctx.filter = 'brightness(2.2) contrast(1.4)';
      }

      ctx.drawImage(spriteImg, -sw / 2, -sh / 2, sw, sh);
      ctx.restore();

      // Render Forcefield and Vulnerable state overlays
      renderFighterOverlays(ctx, f, x, y, facing);
      ctx.restore();
      return;
    }
  }

  // ── VECTOR FRAME RIG FALLBACK RENDERING MODE ──
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
  ctx.lineTo(-6 * facing + Math.cos(rArmAngle) * 20, 2 + Math.sin(rArmAngle) * 20);
  ctx.stroke();
  ctx.restore();

  // 3. Torso Gi / Armor
  ctx.save();
  ctx.fillStyle = darkSuit;
  ctx.beginPath();
  ctx.roundRect(-10 * facing, -14, 20, 36, 4);
  ctx.fill();

  ctx.strokeStyle = accentTrim;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-10 * facing, -4);
  ctx.lineTo(8 * facing, 18);
  ctx.stroke();

  ctx.fillStyle = mainColor;
  ctx.fillRect(-11 * facing, 16, 22, 6);
  ctx.restore();

  // 4. Head & Helmet/Mask
  ctx.save();
  ctx.translate(0, -22);
  ctx.rotate(headTilt);

  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  ctx.fillStyle = f.headColor || (isPlayer ? '#e0f2fe' : '#fbcfe8');
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, -3, 11, Math.PI, 0);
  ctx.fillStyle = darkSuit;
  ctx.fill();

  ctx.fillStyle = mainColor;
  ctx.fillRect(facing === 1 ? 2 : -8, -1, 6, 3);
  ctx.restore();

  // 5. Front Leg
  ctx.save();
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 6.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(3 * facing, 22);
  ctx.lineTo(3 * facing + Math.sin(lLegAngle) * 25, 46);
  ctx.stroke();
  ctx.fillStyle = accentTrim;
  ctx.fillRect(3 * facing + Math.sin(lLegAngle) * 25 - 3, 44, 8, 5);
  ctx.restore();

  // 6. Front Arm / Attack Striker
  ctx.save();
  ctx.strokeStyle = accentTrim;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  const fistX = punchReach ? punchReach : 6 * facing + Math.cos(lArmAngle) * 22;
  const fistY = punchReach ? 2 : 2 + Math.sin(lArmAngle) * 22;

  ctx.beginPath();
  ctx.moveTo(4 * facing, 2);
  ctx.lineTo(fistX, fistY);
  ctx.stroke();

  ctx.fillStyle = mainColor;
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

  ctx.restore();

  // Render Overlays
  renderFighterOverlays(ctx, f, x, y, facing);
  ctx.restore();
}

function renderFighterOverlays(ctx, f, x, y, facing) {
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

  // Vulnerable Punish State Indicator
  if (f.isVulnerable) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 51, 102, 0.85)';
    ctx.fillStyle = 'rgba(255, 51, 102, 0.16)';
    ctx.shadowColor = '#ff3366';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -10, 44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#ff3366';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ VULNERABLE', 0, -50);
    ctx.restore();
  }
}

if (typeof window !== 'undefined') {
  window.renderFighterModel = renderFighterModel;
  window.getSpriteKeyForFighter = getSpriteKeyForFighter;
}
if (typeof module !== 'undefined') {
  module.exports = { renderFighterModel, getSpriteKeyForFighter };
}
