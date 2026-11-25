// =============================================================================
// PIXEL FIGHTER ANIMATOR - Offscreen-Cached Crisp Pixel Art Renderer
// Reads 48x48 frame grids from FIGHTER_SPRITES (sprite_data.js) and caches
// each frame into an offscreen <canvas> for fast 60fps drawImage rendering.
// =============================================================================

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
  if (state === 'death') return Math.min(Math.floor(tick / 10), stateFrameCount - 1);
  if (state === 'hit') return Math.floor(tick / 6) % stateFrameCount;
  if (state === 'attack_light' || state === 'attack_heavy') {
    const mf = f.moveFrame || 0;
    return Math.min(Math.floor(mf / 4), stateFrameCount - 1);
  }
  return Math.floor(tick / 8) % stateFrameCount;
}

// ---------------------------------------------------------------------------
// OFFSCREEN CANVAS CACHE (48x48 -> cached canvas)
// ---------------------------------------------------------------------------
const _spriteCanvasCache = new Map();

function getCachedSpriteCanvas(cacheKey, frameRows) {
  if (_spriteCanvasCache.has(cacheKey)) return _spriteCanvasCache.get(cacheKey);
  const palette = window.PIXEL_PALETTE;
  if (!palette || !frameRows || frameRows.length === 0) return null;

  const W = frameRows[0].length;
  const H = frameRows.length;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const cctx = c.getContext('2d');

  for (let row = 0; row < H; row++) {
    const rowStr = frameRows[row];
    for (let col = 0; col < W; col++) {
      const ch = rowStr[col];
      if (ch === '_') continue;
      const color = palette[ch];
      if (!color) continue;
      cctx.fillStyle = color;
      cctx.fillRect(col, row, 1, 1);
    }
  }

  _spriteCanvasCache.set(cacheKey, c);
  return c;
}

function drawCachedSprite(ctx, spriteCanvas, drawX, drawY, drawW, drawH, flipX) {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  if (flipX) {
    ctx.translate(drawX + drawW, drawY);
    ctx.scale(-1, 1);
    ctx.drawImage(spriteCanvas, 0, 0, drawW, drawH);
  } else {
    ctx.drawImage(spriteCanvas, drawX, drawY, drawW, drawH);
  }
  ctx.restore();
}

// ---------------------------------------------------------------------------
// MAIN RENDER FUNCTION
// ---------------------------------------------------------------------------
function renderFighterModel(ctx, f, isPlayer) {
  if (!f) return;
  if (f.hp !== undefined && f.hp <= 0) {
    const sprites = window.FIGHTER_SPRITES;
    const sk = resolveSpriteKey(f, isPlayer);
    if (!sprites || !sprites[sk] || !sprites[sk].death) return;
  }

  ctx.save();
  ctx.imageSmoothingEnabled = false;

  const x = Math.round(f.x || 0);
  const y = Math.round(f.y || 0);
  const floorY = f.floorY || 470;
  const facing = f.facing || 1;
  const animTick = f.animTick || 0;
  const scale = 2;
  const W = 48 * scale; // 96
  const H = 48 * scale; // 96
  const flipX = facing === -1;

  // Pixelated ground shadow (snapped to 2px grid)
  const shadowScale = Math.max(0.35, 1 - (floorY - y) / 320);
  const sw = Math.round((24 * shadowScale) / 2) * 2;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(x - sw, floorY - 2, sw * 2, 4);
  ctx.fillRect(x - sw + 4, floorY + 2, (sw - 4) * 2, 2);

  // Resolve sprite + state
  const sprites = window.FIGHTER_SPRITES;
  const spriteKey = resolveSpriteKey(f, isPlayer);
  const fallbackKey = isPlayer ? 'hustler' : 'generic_enemy';
  const resolvedSprites = (sprites && sprites[spriteKey]) || (sprites && sprites[fallbackKey]);

  if (resolvedSprites) {
    const state = getAnimState(f);
    const stateFrames = resolvedSprites[state] || resolvedSprites.idle || [];
    if (stateFrames.length === 0) {
      ctx.restore();
      return;
    }
    const frameIdx = getAnimFrame(f, state, stateFrames.length);
    const frame = stateFrames[Math.min(frameIdx, stateFrames.length - 1)];
    const cacheKey = `${spriteKey}:${state}:${frameIdx}`;
    const spriteCanvas = getCachedSpriteCanvas(cacheKey, frame);

    // Pixelated afterimages using cached sprite silhouette
    if (f.afterimages && f.afterimages.length > 0 && spriteCanvas) {
      f.afterimages.forEach(img => {
        ctx.save();
        ctx.globalAlpha = img.alpha * 0.35;
        const ax = Math.round(img.x) - W / 2;
        const ay = Math.round(img.y) - H;
        drawCachedSprite(ctx, spriteCanvas, ax, ay, W, H, flipX);
        ctx.restore();
      });
    }

    if (f.isInvulnerable) ctx.globalAlpha = 0.5;

    const drawX = x - W / 2;
    const drawY = y - H;

    if ((f.hitstunFrames || 0) > 0) ctx.filter = 'brightness(3) saturate(0)';

    if (spriteCanvas) {
      drawCachedSprite(ctx, spriteCanvas, drawX, drawY, W, H, flipX);
    }

    ctx.filter = 'none';
    ctx.globalAlpha = 1.0;

    // Pixel dust puffs when running on ground
    if (state === 'run' && y >= floorY - 2 && animTick % 6 < 3) {
      ctx.fillStyle = 'rgba(200, 220, 240, 0.45)';
      const dustX = x - facing * 18 - (animTick % 6) * facing * 2;
      ctx.fillRect(dustX, floorY - 6, 4, 4);
      ctx.fillRect(dustX - facing * 6, floorY - 4, 4, 2);
    }

    // Super meter pixel aura
    if ((f.superMeter || 0) >= 80) {
      ctx.save();
      const pulse = (Math.floor(animTick / 4) % 2 === 0);
      ctx.globalAlpha = pulse ? 0.45 : 0.25;
      ctx.fillStyle = isPlayer ? '#00f0ff' : '#ff3366';
      // Rising pixel aura sparks
      for (let i = 0; i < 4; i++) {
        const sx = drawX + 16 + ((i * 19 + animTick * 3) % 64);
        const sy = drawY + H - ((animTick * 4 + i * 23) % 88);
        ctx.fillRect(Math.round(sx / 2) * 2, Math.round(sy / 2) * 2, 4, 4);
      }
      ctx.restore();
    }

    // Overlays (block shield, parry arc)
    ctx.save();
    ctx.translate(x, y - 48);
    renderFighterOverlays(ctx, f, 0, 0, facing);
    ctx.restore();
  } else {
    const color = f.color || (isPlayer ? '#00f0ff' : '#ff3366');
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(x - 22, y - H, 44, H);
    ctx.globalAlpha = 1.0;
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// PIXEL OVERLAY RENDERER (Block shield, Parry flash, Vulnerable frame)
// ---------------------------------------------------------------------------
function renderFighterOverlays(ctx, f, x, y, facing) {
  if (f.isBlocking || f.isParrying) {
    ctx.save();
    const col = f.isParrying ? '#00f0ff' : '#ffd166';
    ctx.fillStyle = col;
    const sx = facing * 24;
    // Pixelated shield arc made of crisp 4x4 blocks
    for (let dy = -32; dy <= 32; dy += 6) {
      const curve = Math.round((1 - (dy * dy) / 1400) * 10) * facing;
      ctx.globalAlpha = f.isParrying ? 0.9 : 0.65;
      ctx.fillRect(sx + curve, dy, 4, 4);
    }
    ctx.restore();
  }

  if (f.isVulnerable) {
    ctx.save();
    ctx.fillStyle = '#ff2a55';
    // Pixelated exclamation / target corners
    ctx.fillRect(-30, -48, 8, 4);
    ctx.fillRect(-30, -48, 4, 8);
    ctx.fillRect(22, -48, 8, 4);
    ctx.fillRect(26, -48, 4, 8);
    ctx.restore();
  }
}
