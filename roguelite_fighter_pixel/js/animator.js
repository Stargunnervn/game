// ============================================================================
// PIXEL SPRITE FIGHTER ANIMATOR (EXPERIMENTAL BUILD)
// Renders fighters using the pixel art spritesheet instead of the vector rig.
// Sprite atlas: assets/sprites/all_fighters.png (64x58 px spritesheet)
// Frame data:   assets/sprites/all_fighters.json
// ============================================================================

// -- Sprite atlas loader (singleton) ----------------------------------------

const PixelSprites = (() => {
  let _atlas = null;           // HTMLImageElement
  let _frames = null;          // from all_fighters.json "frames"
  let _ready = false;
  let _callbacks = [];

  function load(basePath) {
    if (_ready) return;
    basePath = basePath || '';
    fetch(basePath + 'assets/sprites/all_fighters.json')
      .then(r => r.json())
      .then(data => {
        _frames = data.frames;
        const img = new Image();
        img.onload = () => {
          _atlas = img;
          _ready = true;
          _callbacks.forEach(cb => cb());
          _callbacks = [];
        };
        img.src = basePath + 'assets/sprites/all_fighters.png';
      })
      .catch(err => {
        console.warn('[PixelSprites] Failed to load sprite atlas:', err);
      });
  }

  function onReady(cb) {
    if (_ready) { cb(); return; }
    _callbacks.push(cb);
  }

  function getFrame(key) {
    if (!_frames) return null;
    return _frames[key] ? _frames[key].frame : null;
  }

  return { load, onReady, getFrame, isReady: () => _ready, atlas: () => _atlas };
})();

// Load sprites relative to the page root on first script execution
PixelSprites.load('');

// -- Sprite key resolver ----------------------------------------------------
// Maps fighter catalog keys and display names to sprite atlas frame keys.

const SPRITE_KEY_MAP = {
  // Player
  'HUSTLER':                  'hustler',

  // Boss sprites (catalog key -> sprite key)
  'boss_iron_shogun':         'iron_shogun',
  'boss_crimson_oni':         'crimson_oni',
  'boss_shadow_kunoichi':     'shadow_kunoichi',
  'boss_void_phantom_lord':   'void_phantom_lord',
  'boss_abyssal_leviathan':   'abyssal_leviathan',
  'boss_soul_reaper':         'soul_reaper',
  'boss_celestial_emperor':   'celestial_emperor',
  'boss_seraph_archon':       'seraph_archon',
  'boss_chronos_titan':       'chronos_titan',
  'boss_frost_colossus':      'iron_shogun',   // reuse closest visual
  'boss_blood_wraith':        'soul_reaper',
};

// Name-based fallbacks (for when only display name is available)
const SPRITE_NAME_MAP = {
  'Iron Shogun Raiden':        'iron_shogun',
  'Crimson Oni Goryo':         'crimson_oni',
  'Shadow Lotus Ayame':        'shadow_kunoichi',
  'Void Lord Malakor':         'void_phantom_lord',
  'Abyssal Sovereign Dagon':   'abyssal_leviathan',
  'Soul Harvester Thanatos':   'soul_reaper',
  'Celestial Emperor Zenith':  'celestial_emperor',
};

function resolveSpriteKey(f) {
  // 1. Explicit spriteKey on fighter object
  if (f.spriteKey && PixelSprites.getFrame(f.spriteKey)) return f.spriteKey;
  // 2. catalogKey set by generateEnemyData
  if (f.catalogKey && SPRITE_KEY_MAP[f.catalogKey]) return SPRITE_KEY_MAP[f.catalogKey];
  // 3. Fighter name string (player uses 'HUSTLER')
  if (f.name) {
    const nameKey = SPRITE_KEY_MAP[f.name] || SPRITE_NAME_MAP[f.name];
    if (nameKey) return nameKey;
  }
  // 4. Generic fallback: player gets hustler, enemies get crimson_oni silhouette
  return f.isPlayer ? 'hustler' : 'crimson_oni';
}

// -- Pixel render scale ------------------------------------------------------
// The sprite frames are 14-16 x 18 px. We scale them up to match the vector rig
// hitbox (~80 x 90 px screen area). SCALE_X/Y are computed per-sprite.

const BASE_DISPLAY_H = 90;   // target display height in canvas pixels

// -- Main render function ---------------------------------------------------

function renderFighterModel(ctx, f, isPlayer) {
  if (!f || (f.hp !== undefined && f.hp <= 0)) return;

  ctx.save();

  const x = f.x;
  const y = f.y;
  const floorY = f.floorY || 470;
  const facing = f.facing || 1;
  const isAirborne = f.isAirborne || (y < floorY - 5);
  const hitstun = (f.hitstunFrames || 0) > 0;
  const animTick = f.animTick || 0;
  const moveKey = f.moveKey || null;
  const moveFrame = f.moveFrame || 0;
  const color = f.color || (isPlayer ? '#00f0ff' : '#ff3366');

  // Idle bob offset (matches original vector bob frequency)
  const bobY = Math.sin(animTick * 0.15) * 2.5;

  // Ground shadow
  ctx.beginPath();
  const shadowScale = Math.max(0.3, 1 - (floorY - y) / 320);
  ctx.ellipse(x, floorY + 2, 28 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fill();

  // Invulnerability semi-transparency
  if (f.isInvulnerable) ctx.globalAlpha = 0.5;

  // Afterimages
  if (f.afterimages && f.afterimages.length > 0) {
    f.afterimages.forEach(img => {
      ctx.save();
      ctx.globalAlpha = img.alpha * 0.4;
      ctx.fillStyle = img.color;
      ctx.beginPath();
      ctx.arc(img.x, img.y - 45, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // -- Sprite rendering -------------------------------------------------------
  if (PixelSprites.isReady()) {
    const spriteKey = resolveSpriteKey({ ...f, isPlayer });
    const frame = PixelSprites.getFrame(spriteKey);
    const atlas = PixelSprites.atlas();

    if (frame && atlas) {
      const scale = BASE_DISPLAY_H / frame.h;
      const dw = frame.w * scale;
      const dh = frame.h * scale;

      // Position: center sprite horizontally, feet at y+bobY
      const drawX = x - dw / 2;
      const drawY = y - dh + bobY;

      ctx.save();

      // Horizontal flip for facing direction
      if (facing === -1) {
        ctx.translate(x, 0);
        ctx.scale(-1, 1);
        ctx.translate(-x, 0);
      }

      // Hitstun flash: white tint via compositing
      if (hitstun) {
        ctx.filter = 'brightness(3) saturate(0)';
      }

      // Attack lean: slight horizontal scale squish toward target
      let attackSquishX = 1;
      let attackSquishY = 1;
      if (moveKey && moveFrame > 0 && moveFrame <= 9 &&
          ['QUICK_JAB','THUNDER_GALE','LIGHTNING_PALM','KI_BLAST','FIRE_BURST'].includes(moveKey)) {
        attackSquishX = 1.1;
        attackSquishY = 0.92;
      } else if (moveKey && moveFrame > 0 &&
          ['LAUNCHER','COMET_CRASH','DRAGON_UPPER','METEOR_STRIKE','GROUND_POUND'].includes(moveKey)) {
        attackSquishX = 0.88;
        attackSquishY = 1.12;
      }

      // Apply squish around sprite center
      if (attackSquishX !== 1 || attackSquishY !== 1) {
        ctx.translate(x, drawY + dh / 2);
        ctx.scale(attackSquishX, attackSquishY);
        ctx.translate(-x, -(drawY + dh / 2));
      }

      // Airborne stretch
      if (isAirborne) {
        ctx.translate(x, drawY + dh / 2);
        ctx.scale(0.9, 1.1);
        ctx.translate(-x, -(drawY + dh / 2));
      }

      // Color tint overlay for non-boss enemies (generic enemies use fighter color)
      const hasDedicatedSprite = SPRITE_KEY_MAP[f.catalogKey] !== undefined || isPlayer;
      if (!hasDedicatedSprite) {
        // Draw sprite, then multiply with enemy color using 'multiply' blend
        ctx.drawImage(atlas, frame.x, frame.y, frame.w, frame.h, drawX, drawY, dw, dh);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.55;
        ctx.fillRect(drawX, drawY, dw, dh);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;
      } else {
        ctx.drawImage(atlas, frame.x, frame.y, frame.w, frame.h, drawX, drawY, dw, dh);
      }

      ctx.filter = 'none';
      ctx.restore();

      // Blocking/parrying shield arc overlay (translate to fighter center for overlay offsets)
      ctx.save();
      ctx.translate(x, y - 48 + bobY);
      renderFighterOverlays(ctx, f, 0, 0, facing);
      ctx.restore();

      // Pixel glow aura for super meter
      if (f.superMeter && f.superMeter >= 80) {
        ctx.save();
        ctx.globalAlpha = 0.18 + 0.12 * Math.sin(animTick * 0.25);
        ctx.shadowColor = isPlayer ? '#00f0ff' : '#ff3366';
        ctx.shadowBlur = 32;
        ctx.strokeStyle = isPlayer ? '#00f0ff' : '#ff3366';
        ctx.lineWidth = 2;
        ctx.strokeRect(drawX - 4, drawY - 4, dw + 8, dh + 8);
        ctx.restore();
      }

    } else {
      // Atlas not ready or frame missing: render colored placeholder block
      _renderPlaceholder(ctx, f, x, y, bobY, color, isPlayer);
    }
  } else {
    // Sprites not yet loaded: render colored placeholder block
    _renderPlaceholder(ctx, f, x, y, bobY, color, isPlayer);
  }

  ctx.restore();
}

// Minimal stand-in while sprites load (matches rough fighter footprint)
function _renderPlaceholder(ctx, f, x, y, bobY, color, isPlayer) {
  ctx.save();
  const w = 44;
  const h = 90;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.7;
  ctx.fillRect(x - w / 2, y - h + bobY, w, h);
  ctx.restore();
}

// -- Overlay renderer (block shield, parry arc) --- unchanged from original --

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

  // Vulnerable flash
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
