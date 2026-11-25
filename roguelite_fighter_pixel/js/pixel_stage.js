// =============================================================================
// PIXEL ART STAGE RENDERER (256x150 logical canvas scaled 4x to 1024x600)
// Themes: 'dojo', 'rift', 'cyber' (default/ocean)
// =============================================================================

const PixelStage = (() => {
  const LW = 256;
  const LH = 150;
  const FLOOR_PY = 118; // 118 * 4 = 472 (matches floorY = 470)
  const _cache = {};

  function _px(ctx, x, y, w, h, col) {
    ctx.fillStyle = col;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function _buildStaticStage(theme) {
    const c = document.createElement('canvas');
    c.width = LW;
    c.height = LH;
    const g = c.getContext('2d');

    if (theme === 'dojo') {
      // Sky bands (pixel gradient, no blur)
      _px(g, 0, 0, LW, 28, '#0b1021');
      _px(g, 0, 28, LW, 30, '#121b33');
      _px(g, 0, 58, LW, 30, '#192644');
      _px(g, 0, 88, LW, 30, '#213154');

      // Dither band transitions
      for (let x = 0; x < LW; x += 2) {
        _px(g, x, 27, 1, 1, '#121b33');
        _px(g, x + 1, 28, 1, 1, '#0b1021');
        _px(g, x, 57, 1, 1, '#192644');
        _px(g, x + 1, 87, 1, 1, '#213154');
      }

      // Stars
      [[20,12],[45,22],[78,8],[115,18],[155,10],[200,24],[235,14],[18,42],[240,38]].forEach(([sx, sy]) => {
        _px(g, sx, sy, 1, 1, '#cbd5e1');
      });

      // Full Moon (top right)
      const mx = 196, my = 28, mr = 14;
      for (let dy = -mr; dy <= mr; dy++) {
        for (let dx = -mr; dx <= mr; dx++) {
          if (dx * dx + dy * dy <= mr * mr) {
            const col = (dx + dy < -6) ? '#fef9c3' : (dx * dx + dy * dy > (mr - 2) * (mr - 2) ? '#eab308' : '#fde047');
            _px(g, mx + dx, my + dy, 1, 1, col);
          }
        }
      }

      // Distant Mountain Silhouette
      for (let x = 0; x < LW; x++) {
        const mh = Math.floor(14 + Math.sin(x * 0.04) * 8 + Math.cos(x * 0.11) * 4);
        _px(g, x, FLOOR_PY - 26 - mh, 1, mh + 26, '#0f172a');
      }

      // Pagoda Temple Silhouette (center-left)
      _px(g, 64, 52, 48, 66, '#131c31');
      // Pagoda curved roofs
      [50, 68, 86].forEach((ry, idx) => {
        const rw = 56 + idx * 8;
        const rx = 88 - rw / 2;
        _px(g, rx, ry, rw, 5, '#1e293b');
        _px(g, rx + 2, ry - 2, rw - 4, 2, '#334155');
        _px(g, rx - 3, ry + 1, 4, 2, '#334155');
        _px(g, rx + rw - 1, ry + 1, 4, 2, '#334155');
      });

      // Foreground Wooden Dojo Pillars (left & right)
      [18, 230].forEach(px => {
        _px(g, px, 0, 8, FLOOR_PY, '#451a1a');
        _px(g, px + 1, 0, 2, FLOOR_PY, '#7f1d1d');
        _px(g, px + 6, 0, 2, FLOOR_PY, '#290d0d');
        // Pillar base stone
        _px(g, px - 2, FLOOR_PY - 6, 12, 6, '#334155');
      });
      // Top beam
      _px(g, 0, 8, LW, 5, '#290d0d');
      _px(g, 0, 9, LW, 2, '#7f1d1d');

      // Wooden Plank Floor
      _px(g, 0, FLOOR_PY, LW, LH - FLOOR_PY, '#1e1b18');
      _px(g, 0, FLOOR_PY, LW, 2, '#78350f');
      _px(g, 0, FLOOR_PY + 2, LW, 1, '#b45309');
      for (let y = FLOOR_PY + 5; y < LH; y += 6) {
        _px(g, 0, y, LW, 1, '#120f0d');
      }
      for (let x = 0; x < LW; x += 24) {
        for (let y = FLOOR_PY + 3; y < LH; y++) {
          const offset = Math.floor((y - FLOOR_PY) * 0.6);
          _px(g, x - offset, y, 1, 1, '#29221d');
        }
      }

    } else if (theme === 'rift') {
      // Deep Void Sky
      _px(g, 0, 0, LW, 35, '#120621');
      _px(g, 0, 35, LW, 40, '#1f0b38');
      _px(g, 0, 75, LW, 43, '#2d124d');

      // Dimensional Tear (center sky)
      const cx = 128, cy = 44;
      for (let r = 24; r >= 4; r -= 4) {
        const col = r > 16 ? '#3b0764' : (r > 8 ? '#7e22ce' : '#d8b4fe');
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r * 1.4; dx <= r * 1.4; dx++) {
            if ((dx * dx) / 2 + dy * dy <= r * r * 0.5) {
              _px(g, cx + dx, cy + dy, 1, 1, col);
            }
          }
        }
      }

      // Jagged Crystal Spires in background
      [[28, 70, 14], [62, 82, 10], [188, 76, 12], [220, 64, 16]].forEach(([sx, sy, sw]) => {
        for (let y = sy; y < FLOOR_PY; y++) {
          const curW = Math.min(sw, Math.max(2, Math.floor((y - sy) * 0.6)));
          _px(g, sx - curW / 2, y, curW, 1, '#3b0764');
          _px(g, sx - curW / 2 + 1, y, Math.max(1, Math.floor(curW / 3)), 1, '#9333ea');
        }
      });

      // Ancient Stone Floor with Glowing Purple Runes
      _px(g, 0, FLOOR_PY, LW, LH - FLOOR_PY, '#150c24');
      _px(g, 0, FLOOR_PY, LW, 2, '#9333ea');
      _px(g, 0, FLOOR_PY + 2, LW, 1, '#4c1d95');
      for (let x = 8; x < LW; x += 28) {
        _px(g, x, FLOOR_PY + 6, 12, 2, '#6b21a8');
        _px(g, x + 4, FLOOR_PY + 12, 8, 2, '#a855f7');
      }

    } else if (theme === 'astral') {
      // Floor 3: Astral Citadel
      _px(g, 0, 0, LW, 38, '#090d24');
      _px(g, 0, 38, LW, 40, '#121b42');
      _px(g, 0, 78, LW, 40, '#1a2759');
      [[24,14],[60,26],[96,12],[140,20],[182,10],[220,24],[40,50],[210,48]].forEach(([sx, sy]) => {
        _px(g, sx, sy, 2, 2, '#fde047');
      });
      [34, 88, 168, 222].forEach(cx => {
        _px(g, cx - 5, 30, 10, FLOOR_PY - 30, '#1e293b');
        _px(g, cx - 3, 30, 3, FLOOR_PY - 30, '#475569');
        _px(g, cx - 7, 26, 14, 4, '#eab308');
        _px(g, cx - 7, FLOOR_PY - 5, 14, 5, '#eab308');
      });
      _px(g, 0, FLOOR_PY, LW, LH - FLOOR_PY, '#0f172a');
      _px(g, 0, FLOOR_PY, LW, 2, '#facc15');
      _px(g, 0, FLOOR_PY + 2, LW, 1, '#a16207');
      for (let x = 0; x < LW; x += 20) {
        _px(g, x, FLOOR_PY + 4, 1, LH - FLOOR_PY - 4, '#1e293b');
      }

    } else if (theme === 'singularity') {
      // Floor 4: Astral Singularity
      _px(g, 0, 0, LW, 40, '#07030f');
      _px(g, 0, 40, LW, 40, '#140524');
      _px(g, 0, 80, LW, 38, '#220836');
      const bx = 128, by = 42;
      for (let dx = -38; dx <= 38; dx++) {
        _px(g, bx + dx, by, 1, 2, Math.abs(dx) > 16 ? '#ff2a55' : '#000000');
      }
      for (let dy = -16; dy <= 16; dy++) {
        for (let dx = -16; dx <= 16; dx++) {
          const d2 = dx * dx + dy * dy;
          if (d2 <= 14 * 14) _px(g, bx + dx, by + dy, 1, 1, '#020205');
          else if (d2 <= 16 * 16) _px(g, bx + dx, by + dy, 1, 1, '#f43f5e');
        }
      }
      _px(g, 0, FLOOR_PY, LW, LH - FLOOR_PY, '#09030e');
      _px(g, 0, FLOOR_PY, LW, 2, '#ff2a55');
      _px(g, 0, FLOOR_PY + 2, LW, 1, '#9f1239');
      for (let x = 12; x < LW; x += 24) {
        _px(g, x, FLOOR_PY + 6, 10, 2, '#be123c');
      }

    } else {
      // Cyber / Neon City (Default)
      _px(g, 0, 0, LW, 40, '#04121e');
      _px(g, 0, 40, LW, 40, '#071e30');
      _px(g, 0, 80, LW, 38, '#0b2c45');

      // Distant Skyline
      const buildings = [
        [4, 48, 22], [28, 34, 26], [58, 56, 20], [82, 28, 28],
        [114, 46, 24], [142, 36, 30], [176, 52, 22], [202, 30, 26], [232, 44, 24]
      ];
      buildings.forEach(([bx, by, bw], idx) => {
        _px(g, bx, by, bw, FLOOR_PY - by, '#091524');
        _px(g, bx, by, 2, FLOOR_PY - by, '#0f233a');
        // Rooftop neon trim
        _px(g, bx, by, bw, 1, idx % 2 === 0 ? '#00f0ff' : '#ff2a55');
        // Pixel windows
        for (let wy = by + 5; wy < FLOOR_PY - 6; wy += 5) {
          for (let wx = bx + 4; wx < bx + bw - 4; wx += 4) {
            if (((wx * 7 + wy * 13) % 5) !== 0) {
              _px(g, wx, wy, 2, 2, ((wx + wy) % 3 === 0) ? '#38bdf8' : '#1e3a5f');
            }
          }
        }
      });

      // Metal Grid Floor
      _px(g, 0, FLOOR_PY, LW, LH - FLOOR_PY, '#070b12');
      _px(g, 0, FLOOR_PY, LW, 2, '#00f0ff');
      _px(g, 0, FLOOR_PY + 2, LW, 1, '#0369a1');
      for (let y = FLOOR_PY + 6; y < LH; y += 7) {
        _px(g, 0, y, LW, 1, '#0f1c2e');
      }
      for (let x = 0; x < LW; x += 18) {
        for (let y = FLOOR_PY + 3; y < LH; y++) {
          const dx = Math.floor((y - FLOOR_PY) * 0.5);
          _px(g, x - dx, y, 1, 1, '#112238');
        }
      }
    }

    return c;
  }

  function render(ctx, theme, tick) {
    const key = theme || 'cyber';
    if (!_cache[key]) {
      _cache[key] = _buildStaticStage(key);
    }

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(_cache[key], 0, 0, ctx.canvas.width, ctx.canvas.height);

    // Animated stage accents (drawn in 4x pixel blocks)
    const S = 4;
    if (key === 'dojo') {
      // Swaying red lanterns on left & right pillars
      const sway = Math.round(Math.sin(tick * 0.05));
      [22, 234].forEach(lx => {
        const px = (lx + sway) * S;
        const py = 18 * S;
        ctx.fillStyle = '#0d0e15';
        ctx.fillRect(px, py - 4, S, 4);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(px - S, py, 3 * S, 4 * S);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(px, py + S, S, 2 * S);
      });
    } else if (key === 'rift') {
      // Floating glowing purple shards
      for (let i = 0; i < 6; i++) {
        const rx = ((i * 41 + 20) % 240) * S;
        const ry = (60 + (i * 11 % 35) + Math.round(Math.sin(tick * 0.06 + i) * 3)) * S;
        ctx.fillStyle = i % 2 === 0 ? '#c084fc' : '#f472b6';
        ctx.fillRect(rx, ry, S, S * 2);
      }
    } else if (key === 'astral') {
      // Twinkling golden stars
      for (let i = 0; i < 4; i++) {
        if ((Math.floor(tick / 18) + i) % 2 === 0) {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect((30 + i * 62) * S, (16 + (i % 2) * 14) * S, S, S);
        }
      }
    } else if (key === 'singularity') {
      // Orbiting crimson singularity motes
      for (let i = 0; i < 6; i++) {
        const ang = tick * 0.04 + (i * Math.PI) / 3;
        const mx = Math.round(128 + Math.cos(ang) * 28) * S;
        const my = Math.round(42 + Math.sin(ang) * 10) * S;
        ctx.fillStyle = i % 2 === 0 ? '#ff2a55' : '#fde047';
        ctx.fillRect(mx, my, S, S);
      }
    } else {
      // Blinking neon rooftop beacons & drifting rain/sparks
      for (let i = 0; i < 4; i++) {
        if ((Math.floor(tick / 20) + i) % 2 === 0) {
          ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#ff2a55';
          ctx.fillRect((38 + i * 56) * S, 26 * S, S, S);
        }
      }
    }

    ctx.restore();
  }

  return { render };
})();

if (typeof window !== 'undefined') {
  window.PixelStage = PixelStage;
}
