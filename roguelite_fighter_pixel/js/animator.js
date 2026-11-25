// =============================================================================
// PIXEL FIGHTER ANIMATOR - Offscreen-Cached Crisp Pixel Art Renderer
// Supports 13 animation states, live idle breathing during DECISION phase,
// complete 55-move mapping, and subtle squash-and-stretch juice.
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
  if (f._debugSpriteKey) return f._debugSpriteKey;
  if (f.catalogKey && SPRITE_KEY_MAP[f.catalogKey]) return SPRITE_KEY_MAP[f.catalogKey];
  if (f.name) {
    const k = SPRITE_KEY_MAP[f.name] || SPRITE_NAME_MAP[f.name];
    if (k) return k;
  }
  return isPlayer ? 'hustler' : 'generic_enemy';
}

const MOVE_TO_ANIM = {
  // Dash / Blitz
  DASH: 'dash', SUPER_DASH: 'dash', GHOST_STEP: 'dash', SHADOW_TELEPORT: 'dash',
  RAIKIRI_WARP: 'dash', BLOOD_RUSH: 'dash',
  // Defense
  BLOCK: 'block', PARRY: 'block', AEGIS_REFLECT: 'block',
  // Light attacks
  QUICK_JAB: 'attack_light', LIGHTNING_PALM: 'attack_light', SONIC_PALM: 'attack_light',
  THUNDER_GALE: 'attack_light', BLADE_COUNTER: 'attack_light', MIRAGE_RIPOSTE: 'attack_light',
  // Heavy slashes & slams
  HEAVY_SLASH: 'attack_heavy', JUDGMENT_CUT: 'attack_heavy', WHIRLWIND: 'attack_heavy',
  METEOR_STRIKE: 'attack_heavy', GROUND_POUND: 'attack_heavy', SOUL_REAP: 'attack_heavy',
  VOID_CLEAVE: 'attack_heavy', TEMPEST_QUAKE: 'attack_heavy', EVENT_HORIZON_SLASH: 'attack_heavy',
  CHRONO_JUDGMENT: 'attack_heavy', THUNDER_METEOR: 'attack_heavy', CARMINE_HARVEST: 'attack_heavy',
  INDRA_MJOLNIR_CATACLYSM: 'attack_heavy', ASURA_OMNI_DIVINE_PUNISH: 'attack_heavy',
  // Kicks & sweeps
  SWEEP: 'attack_kick', DIVE_KICK: 'attack_kick', PHOENIX_KICK: 'attack_kick',
  PHANTOM_SLIDE: 'attack_kick',
  // Uppercuts & aerial ascents
  LAUNCHER: 'attack_upper', DRAGON_UPPER: 'attack_upper', COMET_CRASH: 'attack_upper',
  VALKYRIE_ASCENT: 'attack_upper', VALKYRIE_RAGNAROK_GENESIS: 'attack_upper',
  // Energy blasts & cosmic specials
  KI_BLAST: 'attack_special', FIRE_BURST: 'attack_special', CHRONO_STASIS: 'attack_special',
  SHADOW_PULL: 'attack_special', GLACIAL_SPIKE: 'attack_special', GRAVITY_CRUSH: 'attack_special',
  SOLAR_SUPERNOVA: 'attack_special', FROSTFIRE_BURST: 'attack_special',
  COSMIC_HYPERNOVA_ZERO: 'attack_special', SINGULARITY_EVENT_HORIZON_ZERO: 'attack_special',
  CHRONO_CONTINUUM_EXECUTION: 'attack_special',
};

function getAnimState(f) {
  if (f._debugAnimState) return f._debugAnimState;
  if (f.hp !== undefined && f.hp <= 0) return 'death';
  if ((f.hitstunFrames || 0) > 0) return 'hit';
  if (f.isBlocking || f.isParrying) return 'block';
  const mk = f.moveKey;
  if (mk && MOVE_TO_ANIM[mk]) return MOVE_TO_ANIM[mk];
  if (mk && (mk === 'STEP_FWD' || mk === 'STEP_BACK')) return 'walk';
  if (f.isAirborne || (f.y !== undefined && f.floorY !== undefined && f.y < f.floorY - 5)) return 'jump';
  if (Math.abs(f.vx || 0) > 5) return 'dash';
  if (Math.abs(f.vx || 0) > 2.5) return 'run';
  if (Math.abs(f.vx || 0) > 0.1) return 'walk';
  return 'idle';
}

function getAnimFrame(f, state, stateFrameCount, isPlayer) {
  const tick = f.animTick || 0;
  // Use live wall-clock tick for idle/block so fighters visibly breathe even in DECISION phase
  const liveTick = Math.floor(performance.now() / 110) + (isPlayer ? 0 : 3);

  if (state === 'death') return Math.min(Math.floor(tick / 8), stateFrameCount - 1);
  if (f._debugAnimState) return liveTick % stateFrameCount;
  if (state === 'hit') return Math.floor(tick / 4) % stateFrameCount;
  if (state === 'block') return liveTick % stateFrameCount;
  if (state === 'idle') return liveTick % stateFrameCount;
  if (state === 'dash') return Math.floor(tick / 3) % stateFrameCount;
  if (state === 'run') return Math.floor(tick / 4) % stateFrameCount;
  if (state === 'walk') return Math.floor(tick / 5) % stateFrameCount;
  if (state.startsWith('attack_')) {
    const mf = f.moveFrame || 0;
    return Math.min(Math.floor(mf / 3), stateFrameCount - 1);
  }
  return Math.floor(tick / 6) % stateFrameCount;
}

// ---------------------------------------------------------------------------
// OFFSCREEN CANVAS CACHE
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

  // Ground shadow
  const shadowScale = Math.max(0.35, 1 - (floorY - y) / 320);
  const sw = Math.round((24 * shadowScale) / 2) * 2;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(x - sw, floorY - 2, sw * 2, 4);
  ctx.fillRect(x - sw + 4, floorY + 2, (sw - 4) * 2, 2);

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
    const frameIdx = getAnimFrame(f, state, stateFrames.length, isPlayer);
    const frame = stateFrames[Math.min(frameIdx, stateFrames.length - 1)];
    const cacheKey = `${spriteKey}:${state}:${frameIdx}`;
    const spriteCanvas = getCachedSpriteCanvas(cacheKey, frame);

    // Afterimages
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

    // Subtle Squash & Stretch anchored at feet (x, y)
    let sx = 1, sy = 1;
    if (state === 'attack_heavy' && frameIdx === 1) { sx = 1.08; sy = 0.94; }
    else if (state === 'attack_upper' && frameIdx === 1) { sx = 0.92; sy = 1.08; }
    else if (state === 'dash') { sx = 1.1; sy = 0.92; }
    else if (state === 'hit' && frameIdx === 0) { sx = 0.94; sy = 1.06; }

    const drawW = Math.round(W * sx);
    const drawH = Math.round(H * sy);
    const drawX = x - Math.round(drawW / 2);
    const drawY = y - drawH;

    if ((f.hitstunFrames || 0) > 0) ctx.filter = 'brightness(3) saturate(0)';

    if (spriteCanvas) {
      drawCachedSprite(ctx, spriteCanvas, drawX, drawY, drawW, drawH, flipX);
    }

    ctx.filter = 'none';
    ctx.globalAlpha = 1.0;

    // Dust puffs on run / dash
    if ((state === 'run' || state === 'dash') && y >= floorY - 2 && animTick % 4 < 2) {
      ctx.fillStyle = 'rgba(200, 220, 240, 0.5)';
      const dustX = x - facing * 18 - (animTick % 4) * facing * 3;
      ctx.fillRect(dustX, floorY - 6, 4, 4);
      ctx.fillRect(dustX - facing * 6, floorY - 4, 4, 2);
    }

    // Super meter pixel aura
    if ((f.superMeter || 0) >= 80) {
      ctx.save();
      const livePulse = Math.floor(performance.now() / 120);
      ctx.globalAlpha = (livePulse % 2 === 0) ? 0.45 : 0.25;
      ctx.fillStyle = isPlayer ? '#00f0ff' : '#ff3366';
      for (let i = 0; i < 4; i++) {
        const sxSpark = drawX + 16 + ((i * 19 + livePulse * 6) % 64);
        const sySpark = drawY + drawH - ((livePulse * 8 + i * 23) % 88);
        ctx.fillRect(Math.round(sxSpark / 2) * 2, Math.round(sySpark / 2) * 2, 4, 4);
      }
      ctx.restore();
    }

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

function renderFighterOverlays(ctx, f, x, y, facing) {
  if (f.isBlocking || f.isParrying) {
    ctx.save();
    const col = f.isParrying ? '#00f0ff' : '#ffd166';
    ctx.fillStyle = col;
    const sx = facing * 24;
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
    ctx.fillRect(-30, -48, 8, 4);
    ctx.fillRect(-30, -48, 4, 8);
    ctx.fillRect(22, -48, 8, 4);
    ctx.fillRect(26, -48, 4, 8);
    ctx.restore();
  }
}
