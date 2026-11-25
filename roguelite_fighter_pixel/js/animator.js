// =============================================================================
// PIXEL FIGHTER ANIMATOR - Canvas fillRect sprite renderer
// Reads pixel art frame data from FIGHTER_SPRITES (sprite_data.js).
// No PNG atlas needed - everything is drawn with fillRect.
// =============================================================================

// ---------------------------------------------------------------------------
// SPRITE KEY RESOLUTION
// ---------------------------------------------------------------------------

const SPRITE_KEY_MAP = {
  'HUSTLER':                  'hustler',
  'boss_iron_shogun':         'iron_shogun',
  'boss_crimson_oni':         'crimson_oni',
  'boss_shadow_kunoichi':     'shadow_kunoichi',
  'boss_void_phantom_lord':   'void_phantom_lord',
  'boss_abyssal_leviathan':   'abyssal_leviathan',
  'boss_soul_reaper':         'soul_reaper',
  'boss_celestial_emperor':   'celestial_emperor',
  'boss_seraph_archon':       'seraph_archon',
  'boss_chronos_titan':       'chronos_titan',
  'boss_frost_colossus':      'iron_shogun',
  'boss_blood_wraith':        'soul_reaper',
};

const SPRITE_NAME_MAP = {
  'Iron Shogun Raiden':        'iron_shogun',
  'Crimson Oni Goryo':         'crimson_oni',
  'Shadow Lotus Ayame':        'shadow_kunoichi',
  'Void Lord Malakor':         'void_phantom_lord',
  'Abyssal Sovereign Dagon':   'abyssal_leviathan',
  'Soul Harvester Thanatos':   'soul_reaper',
  'Celestial Emperor Zenith':  'celestial_emperor',
  'Seraph Archon Uriel':       'seraph_archon',
  'Chronos Titan Kronax':      'chronos_titan',
};

function resolveSpriteKey(f, isPlayer) {
  if (f.catalogKey && SPRITE_KEY_MAP[f.catalogKey]) return SPRITE_KEY_MAP[f.catalogKey];
  if (f.name) {
    const k = SPRITE_KEY_MAP[f.name] || SPRITE_NAME_MAP[f.name];
    if (k) return k;
  }
  return isPlayer ? 'hustler' : 'generic_enemy';
}

// ---------------------------------------------------------------------------
// ANIMATION STATE LOGIC
// ---------------------------------------------------------------------------

const ATTACK_LIGHT_MOVES = new Set([
  'QUICK_JAB','THUNDER_GALE','LIGHTNING_PALM','KI_BLAST','FIRE_BURST',
]);

const ATTACK_HEAVY_MOVES = new Set([
  'HEAVY_SLASH','VOID_CLEAVE','WHIRLWIND','JUDGMENT_CUT','BLADE_COUNTER',
  'LAUNCHER','COMET_CRASH','DRAGON_UPPER','METEOR_STRIKE','GROUND_POUND',
]);

function getAnimState(f) {
  if (f.hp !== undefined && f.hp <= 0) return 'death';
  if ((f.hitstunFrames || 0) > 0) return 'hit';
  if (f.isBlocking || f.isParrying) return 'block';
  const mk = f.moveKey;
  if (mk && ATTACK_LIGHT_MOVES.has(mk)) return 'attack_light';
  if (mk && ATTACK_HEAVY_MOVES.has(mk)) return 'attack_heavy';
  if (f.isAirborne || (f.y !== undefined && f.floorY !== undefined && f.y < f.floorY - 5)) return 'jump';
  if (Math.abs(f.vx || 0) > 3) return 'run';
  if (Math.abs(f.vx || 0) > 0.1) return 'walk';
  return 'idle';
}

function getAnimFrame(f, state, stateFrameCount) {
  const tick = f.animTick || 0;
  if (state === 'death' || state === 'hit') {
    // Clamp to last frame for death; cycle for hit
    if (state === 'death') return Math.min(Math.floor(tick / 10), stateFrameCount - 1);
    return Math.floor(tick / 6) % stateFrameCount;
  }
  if (state === 'attack_light' || state === 'attack_heavy') {
    const mf = f.moveFrame || 0;
    return Math.min(Math.floor(mf / 4), stateFrameCount - 1);
  }
  return Math.floor(tick / 8) % stateFrameCount;
}

// ---------------------------------------------------------------------------
// LOW-LEVEL PIXEL FRAME DRAWER
// ---------------------------------------------------------------------------

function drawPixelFrame(ctx, frameRows, drawX, drawY, scale, flipX) {
  const palette = window.PIXEL_PALETTE;
  if (!palette || !frameRows) return;
  const W = frameRows[0].length;
  const H = frameRows.length;
  for (let row = 0; row < H; row++) {
    const rowStr = frameRows[row];
    for (let col = 0; col < rowStr.length; col++) {
      const key = rowStr[col];
      if (key === '_') continue;
      const color = palette[key];
      if (!color) continue;
      const px = flipX ? drawX + (W - 1 - col) * scale : drawX + col * scale;
      const py = drawY + row * scale;
      ctx.fillStyle = color;
      ctx.fillRect(px, py, scale, scale);
    }
  }
}

// ---------------------------------------------------------------------------
// MAIN RENDER FUNCTION (replaces vector rig)
// ---------------------------------------------------------------------------

function renderFighterModel(ctx, f, isPlayer) {
  if (!f) return;
  // Dead fighters: show death animation (don't early-return - getAnimState handles it)
  // but if hp <= 0 and no death frames available, skip
  if (f.hp !== undefined && f.hp <= 0) {
    const sprites = window.FIGHTER_SPRITES;
    const sk = resolveSpriteKey(f, isPlayer);
    if (!sprites || !sprites[sk] || !sprites[sk].death) return;
  }

  ctx.save();

  const x = Math.round(f.x || 0);
  const y = Math.round(f.y || 0);
  const floorY = f.floorY || 470;
  const facing = f.facing || 1;
  const animTick = f.animTick || 0;
  const scale = 2;         // 2 canvas px per sprite px -> 96x96 on screen
  const W = 48 * scale;   // 96
  const H = 48 * scale;   // 96
  const flipX = facing === -1;

  // Ground shadow
  const shadowScale = Math.max(0.3, 1 - (floorY - y) / 320);
  ctx.beginPath();
  ctx.ellipse(x, floorY + 2, 28 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fill();

  // Afterimages (simple colored arc to avoid per-frame cost)
  if (f.afterimages && f.afterimages.length > 0) {
    f.afterimages.forEach(img => {
      ctx.save();
      ctx.globalAlpha = img.alpha * 0.4;
      ctx.fillStyle = img.color || '#00f0ff';
      ctx.beginPath();
      ctx.arc(img.x, img.y - 48, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // Invulnerability
  if (f.isInvulnerable) ctx.globalAlpha = 0.5;

  // Resolve sprite + state
  const sprites = window.FIGHTER_SPRITES;
  const spriteKey = resolveSpriteKey(f, isPlayer);
  const fighterSprites = sprites && sprites[spriteKey];
  const fallbackKey = isPlayer ? 'hustler' : 'generic_enemy';
  const resolvedSprites = fighterSprites || (sprites && sprites[fallbackKey]);

  if (resolvedSprites) {
    const state = getAnimState(f);
    const stateFrames = resolvedSprites[state] || resolvedSprites.idle || [];
    if (stateFrames.length === 0) {
      ctx.restore();
      return;
    }
    const frameIdx = getAnimFrame(f, state, stateFrames.length);
    const frame = stateFrames[Math.min(frameIdx, stateFrames.length - 1)];

    // Feet-anchored draw position: sprite's row 47 = ground level
    const drawX = x - W / 2;
    const drawY = y - H;

    // Hitstun white flash
    if ((f.hitstunFrames || 0) > 0) ctx.filter = 'brightness(3) saturate(0)';

    drawPixelFrame(ctx, frame, drawX, drawY, scale, flipX);

    ctx.filter = 'none';
    ctx.globalAlpha = 1.0;

    // Super glow aura
    if ((f.superMeter || 0) >= 80) {
      ctx.save();
      ctx.globalAlpha = 0.18 + 0.12 * Math.sin(animTick * 0.25);
      ctx.strokeStyle = isPlayer ? '#00f0ff' : '#ff3366';
      ctx.shadowColor = isPlayer ? '#00f0ff' : '#ff3366';
      ctx.shadowBlur = 32;
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX - 4, drawY - 4, W + 8, H + 8);
      ctx.restore();
    }

    // Overlays (block shield, parry arc)
    ctx.save();
    ctx.translate(x, y - 48);
    renderFighterOverlays(ctx, f, 0, 0, facing);
    ctx.restore();

  } else {
    // Fallback: colored placeholder block
    const color = f.color || (isPlayer ? '#00f0ff' : '#ff3366');
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(x - 22, y - H, 44, H);
    ctx.globalAlpha = 1.0;
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// OVERLAY RENDERER - block shield, parry arc, vulnerable flash
// ---------------------------------------------------------------------------

function renderFighterOverlays(ctx, f, x, y, facing) {
  if (f.isBlocking || f.isParrying) {
    ctx.save();
    ctx.strokeStyle = f.isParrying ? '#00f0ff' : '#ffd166';
    ctx.shadowColor  = f.isParrying ? '#00f0ff' : '#ffd166';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(18 * facing, 4, 38, -Math.PI / 2.3, Math.PI / 2.3, facing === -1);
    ctx.stroke();
    ctx.restore();
  }

  if (f.isVulnerable) {
    ctx.save();
    ctx.strokeStyle = '#ff2a55';
    ctx.shadowColor = '#ff2a55';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(0, -20, 44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }
}
