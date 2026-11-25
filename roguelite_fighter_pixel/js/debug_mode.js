// =============================================================================
// DEBUG MODE PANEL - Test animations, bosses, 4 floors x 10 nodes, skills & fusions
// Toggle with F9 / backtick (`) or the DEBUG button on the top banner.
// Press ESC or click CLOSE OVERLAYS to close any open modal (Shop/Draft/etc).
// =============================================================================

(function initDebugMode() {
  let _open = false;
  let _godMode = false;
  let _godTimer = null;

  const ALL_SPRITES = [
    'hustler', 'iron_shogun', 'crimson_oni', 'shadow_kunoichi',
    'void_phantom_lord', 'abyssal_leviathan', 'soul_reaper',
    'celestial_emperor', 'seraph_archon', 'chronos_titan', 'generic_enemy'
  ];

  const ALL_ANIM_STATES = [
    'idle', 'walk', 'run', 'dash', 'jump',
    'attack_light', 'attack_heavy', 'attack_kick',
    'attack_upper', 'attack_special', 'block', 'hit', 'death'
  ];

  function closeAllOverlaysAndResume() {
    const e = window.engine;
    if (e) {
      e.isReplayPlaying = false;
      e.overlayBeforeReplay = null;
      if (e.hideAllOverlays) e.hideAllOverlays();
    }
    const replayHud = document.getElementById('replay-hud');
    if (replayHud) replayHud.classList.add('hidden');
    const btnTopReplay = document.getElementById('btn-top-replay');
    if (btnTopReplay) btnTopReplay.classList.remove('hidden');
    const btnTopDeck = document.getElementById('btn-top-deck');
    if (btnTopDeck) btnTopDeck.classList.remove('hidden');
    const advDisplay = document.getElementById('advantage-display');
    if (advDisplay) advDisplay.classList.remove('hidden');

    document.querySelectorAll('.overlay-screen').forEach(el => el.classList.remove('active'));
    const tacPanel = document.getElementById('tactical-panel');
    if (tacPanel) tacPanel.classList.remove('hidden');
    if (e && (e.turnState === 'REPLAY' || (e.turnState === 'ROUND_OVER' && e.enemy && e.enemy.hp > 0))) {
      e.turnState = 'DECISION';
      if (e.openDecisionTurn) e.openDecisionTurn();
    }
  }

  function createUI() {
    const banner = document.getElementById('pixel-build-banner');
    if (banner) {
      const btn = document.createElement('button');
      btn.id = 'btn-debug-toggle';
      btn.textContent = 'DEBUG (F9)';
      btn.style.cssText = 'margin-left:14px;padding:2px 8px;background:#7b2cbf;color:#fff;border:1px solid #c77dff;border-radius:3px;font-size:11px;font-weight:bold;cursor:pointer;';
      btn.onclick = togglePanel;
      banner.appendChild(btn);
    }

    const panel = document.createElement('div');
    panel.id = 'debug-panel';
    panel.style.cssText = [
      'display:none',
      'position:fixed',
      'top:34px',
      'right:10px',
      'width:360px',
      'max-height:86vh',
      'overflow-y:auto',
      'background:rgba(12, 16, 28, 0.96)',
      'border:2px solid #00f0ff',
      'border-radius:6px',
      'padding:10px',
      'z-index:99999',
      'color:#e2e8f0',
      'font-family:monospace',
      'font-size:11px',
      'box-shadow:0 8px 30px rgba(0,0,0,0.85)'
    ].join(';');

    const floorRowsHtml = [1, 2, 3, 4].map(f => {
      const btns = Array.from({ length: 10 }, (_, idx) => {
        const s = idx + 1;
        const bg = s === 10 ? '#991b1b' : (s === 5 ? '#92400e' : '#1e293b');
        const label = s === 10 ? '10B' : (s === 5 ? '5M' : `${s}`);
        return `<button class="dbg-stage-btn" data-f="${f}" data-s="${s}" title="Floor ${f} Stage ${s}" style="background:${bg};color:#fff;border:1px solid #475569;padding:3px 0;cursor:pointer;font-size:10px;">${label}</button>`;
      }).join('');
      return `
        <div style="display:grid;grid-template-columns:30px repeat(10, 1fr);gap:2px;align-items:center;margin-bottom:3px;">
          <span style="color:#00f0ff;font-weight:bold;">F${f}</span>
          ${btns}
        </div>
      `;
    }).join('');

    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #334155;padding-bottom:6px;margin-bottom:8px;">
        <strong style="color:#00f0ff;font-size:12px;">DEBUG SANDBOX</strong>
        <div style="display:flex;gap:4px;">
          <button id="dbg-close-overlays" style="background:#0284c7;color:#fff;border:none;padding:2px 7px;cursor:pointer;border-radius:3px;font-weight:bold;">Close UI (ESC)</button>
          <button id="dbg-close" style="background:#ef4444;color:#fff;border:none;padding:2px 7px;cursor:pointer;border-radius:3px;">X</button>
        </div>
      </div>

      <div style="margin-bottom:8px;">
        <div style="color:#ffd166;font-weight:bold;margin-bottom:4px;">1. ANIMATION & SPRITE PREVIEW</div>
        <div style="display:flex;gap:4px;margin-bottom:5px;">
          <select id="dbg-sprite-select" style="flex:1;background:#1e293b;color:#fff;border:1px solid #475569;padding:3px;">
            ${ALL_SPRITES.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
          <button id="dbg-sprite-reset" style="background:#334155;color:#fff;border:1px solid #64748b;padding:3px 6px;cursor:pointer;">Reset</button>
        </div>
        <div id="dbg-anim-btns" style="display:flex;flex-wrap:wrap;gap:3px;">
          ${ALL_ANIM_STATES.map(st => `<button class="dbg-anim-btn" data-st="${st}" style="background:#1e293b;color:#cbd5e1;border:1px solid #475569;padding:2px 5px;cursor:pointer;font-size:10px;">${st}</button>`).join('')}
          <button id="dbg-anim-clear" style="background:#7f1d1d;color:#fff;border:1px solid #ef4444;padding:2px 6px;cursor:pointer;font-size:10px;">AUTO</button>
        </div>
      </div>

      <div style="margin-bottom:8px;border-top:1px solid #334155;padding-top:6px;">
        <div style="color:#ffd166;font-weight:bold;margin-bottom:4px;">2. COMBAT & ECONOMY</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
          <button id="dbg-heal" style="background:#065f46;color:#fff;border:1px solid #10b981;padding:4px;cursor:pointer;">Full HP + 100 SP</button>
          <button id="dbg-kill" style="background:#991b1b;color:#fff;border:1px solid #ef4444;padding:4px;cursor:pointer;">1-Hit Kill Enemy</button>
          <button id="dbg-god" style="background:#1e293b;color:#fff;border:1px solid #f59e0b;padding:4px;cursor:pointer;">God Mode: OFF</button>
          <button id="dbg-gold" style="background:#78350f;color:#fde047;border:1px solid #f59e0b;padding:4px;cursor:pointer;">+500 Gold & Shards</button>
        </div>
      </div>

      <div style="margin-bottom:8px;border-top:1px solid #334155;padding-top:6px;">
        <div style="color:#ffd166;font-weight:bold;margin-bottom:4px;">3. SKILLS, DRAFT & FUSION</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
          <button id="dbg-draft" style="background:#4c1d95;color:#fff;border:1px solid #a855f7;padding:4px;cursor:pointer;">Open Draft</button>
          <button id="dbg-shop" style="background:#1e3a8a;color:#fff;border:1px solid #3b82f6;padding:4px;cursor:pointer;">Open Shop</button>
          <button id="dbg-upg-all" style="background:#0f766e;color:#fff;border:1px solid #14b8a6;padding:4px;cursor:pointer;">Upgrade All Owned</button>
          <button id="dbg-unlock-all" style="background:#374151;color:#fff;border:1px solid #9ca3af;padding:4px;cursor:pointer;">Unlock All Moves</button>
        </div>
      </div>

      <div style="border-top:1px solid #334155;padding-top:6px;">
        <div style="color:#ffd166;font-weight:bold;margin-bottom:4px;">4. JUMP TO FLOOR (1-4) & NODE (1-10)</div>
        ${floorRowsHtml}
      </div>
    `;

    document.body.appendChild(panel);
    wireEvents(panel);
    // Prevent Space/Enter from re-triggering the last clicked debug button
    panel.addEventListener('click', (ev) => {
      if (ev.target && ev.target.tagName === 'BUTTON') {
        ev.target.blur();
      }
    });
  }

  function wireEvents(panel) {
    panel.querySelector('#dbg-close').onclick = togglePanel;
    panel.querySelector('#dbg-close-overlays').onclick = closeAllOverlaysAndResume;

    const sprSel = panel.querySelector('#dbg-sprite-select');
    sprSel.onchange = () => {
      if (window.engine && window.engine.player) {
        window.engine.player._debugSpriteKey = sprSel.value;
      }
    };
    panel.querySelector('#dbg-sprite-reset').onclick = () => {
      if (window.engine && window.engine.player) {
        delete window.engine.player._debugSpriteKey;
      }
    };

    panel.querySelectorAll('.dbg-anim-btn').forEach(b => {
      b.onclick = () => {
        if (window.engine && window.engine.player) {
          window.engine.player._debugAnimState = b.dataset.st;
        }
      };
    });
    panel.querySelector('#dbg-anim-clear').onclick = () => {
      if (window.engine && window.engine.player) {
        delete window.engine.player._debugAnimState;
      }
    };

    panel.querySelector('#dbg-heal').onclick = () => {
      const e = window.engine;
      if (!e || !e.player) return;
      e.player.hp = e.player.maxHp;
      e.player.superMeter = e.player.maxSuper || 100;
      if (e.updateHUD) e.updateHUD();
    };

    panel.querySelector('#dbg-kill').onclick = () => {
      const e = window.engine;
      if (!e) return;
      if (e.enemy) e.enemy.hp = 0;
      if (e.enemy2) e.enemy2.hp = 0;
      if (e.handleRoundWin) e.handleRoundWin();
    };

    const godBtn = panel.querySelector('#dbg-god');
    godBtn.onclick = () => {
      _godMode = !_godMode;
      godBtn.textContent = `God Mode: ${_godMode ? 'ON' : 'OFF'}`;
      godBtn.style.background = _godMode ? '#b45309' : '#1e293b';
      if (_godMode && !_godTimer) {
        _godTimer = setInterval(() => {
          if (_godMode && window.engine && window.engine.player) {
            window.engine.player.hp = window.engine.player.maxHp;
          }
        }, 100);
      }
    };

    panel.querySelector('#dbg-gold').onclick = () => {
      const e = window.engine;
      if (!e) return;
      e.gold = (e.gold || 0) + 500;
      if (e.meta) e.meta.shards = (e.meta.shards || 0) + 500;
      if (e.updateHUD) e.updateHUD();
    };

    panel.querySelector('#dbg-draft').onclick = () => {
      const e = window.engine;
      if (!e) return;
      if (e.hideAllOverlays) e.hideAllOverlays();
      if (e.showDraftOverlay) e.showDraftOverlay();
    };

    panel.querySelector('#dbg-shop').onclick = () => {
      const e = window.engine;
      if (!e) return;
      if (e.hideAllOverlays) e.hideAllOverlays();
      if (e.openShop) e.openShop();
    };

    panel.querySelector('#dbg-upg-all').onclick = () => {
      const e = window.engine;
      if (!e || !e.ownedMoves) return;
      e.ownedMoves.forEach(mk => {
        if (typeof MOVE_UPGRADES_CATALOG !== 'undefined' && MOVE_UPGRADES_CATALOG[mk]) {
          e.moveUpgrades.add(mk);
        }
      });
      if (e.rebuildMoveButtons) e.rebuildMoveButtons();
    };

    panel.querySelector('#dbg-unlock-all').onclick = () => {
      const e = window.engine;
      if (!e || typeof MOVES === 'undefined') return;
      Object.keys(MOVES).forEach(mk => {
        if (!MOVES[mk].isTier4) {
          e.ownedMoves.add(mk);
          e.equippedMoves.add(mk);
        }
      });
      if (e.rebuildMoveButtons) e.rebuildMoveButtons();
    };

    panel.querySelectorAll('.dbg-stage-btn').forEach(b => {
      b.onclick = () => {
        const e = window.engine;
        if (!e) return;
        const f = parseInt(b.dataset.f, 10);
        const s = parseInt(b.dataset.s, 10);
        closeAllOverlaysAndResume();
        e.initStage(f, s);
      };
    });
  }

  function togglePanel() {
    _open = !_open;
    const p = document.getElementById('debug-panel');
    if (p) p.style.display = _open ? 'block' : 'none';
  }

  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'F9' || ev.key === '`') {
      togglePanel();
    } else if (ev.key === 'Escape') {
      closeAllOverlaysAndResume();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createUI);
  } else {
    createUI();
  }
})();
