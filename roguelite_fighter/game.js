/**
 * ============================================================================
 * YOMI ROGUE : Tactical Simultaneous Turn-Based Fighting Roguelite
 * Modular Main Game Engine (AimWheel, YomiEngine, UI & Progression)
 * ============================================================================
 */

// ── 1. YOMI HUSTLE AIM WHEEL (VECTOR & ANGLE CONTROLLER) ─────────────────────
class AimWheel {
  constructor(canvasId, readoutId, onAngleChange) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.readout = document.getElementById(readoutId);
    this.angleDeg = 0;
    this.isDragging = false;
    this.onAngleChange = onAngleChange;

    if (this.canvas) {
      this.bindEvents();
      this.draw();
    }
  }

  bindEvents() {
    const handleMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const rad = Math.atan2(dy, dx);
      let deg = Math.round(rad * (180 / Math.PI));
      this.angleDeg = -deg;

      this.updateReadout();
      this.draw();
      if (this.onAngleChange) this.onAngleChange(this.angleDeg);
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      handleMove(e);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) handleMove(e);
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.isDragging = true;
        handleMove(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) {
        handleMove(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  setAngle(deg) {
    this.angleDeg = Math.round(deg);
    this.updateReadout();
    this.draw();
    if (this.onAngleChange) this.onAngleChange(this.angleDeg);
  }

  updateReadout() {
    if (!this.readout) return;
    let dir = 'FWD';
    const a = this.angleDeg;
    if (a >= 68 && a <= 112) dir = 'HIGH';
    else if (a >= 23 && a < 68) dir = 'UP-FWD';
    else if (a > -23 && a < 23) dir = 'FWD';
    else if (a <= -23 && a > -68) dir = 'LOW-FWD';
    else if (a <= -68 && a >= -112) dir = 'DOWN';
    else if (a < -112 && a >= -157) dir = 'LOW-BACK';
    else if (a > 112 && a <= 157) dir = 'UP-BACK';
    else dir = 'BACK';

    const sign = a > 0 ? '+' : '';
    this.readout.innerText = `${sign}${a}° [${dir}]`;
  }

  draw() {
    if (!this.ctx) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = w / 2 - 4;

    this.ctx.clearRect(0, 0, w, h);

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.fillStyle = '#080d15';
    this.ctx.fill();
    this.ctx.strokeStyle = '#223044';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const tickAngle = (i * Math.PI) / 4;
      const innerR = r - 5;
      this.ctx.beginPath();
      this.ctx.moveTo(cx + Math.cos(tickAngle) * innerR, cy + Math.sin(tickAngle) * innerR);
      this.ctx.lineTo(cx + Math.cos(tickAngle) * r, cy + Math.sin(tickAngle) * r);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    this.ctx.beginPath();
    this.ctx.moveTo(cx - r, cy);
    this.ctx.lineTo(cx + r, cy);
    this.ctx.moveTo(cx, cy - r);
    this.ctx.lineTo(cx + r, cy);
    this.ctx.stroke();

    const rad = -this.angleDeg * (Math.PI / 180);
    const pointerLen = r - 6;
    const px = cx + Math.cos(rad) * pointerLen;
    const py = cy + Math.sin(rad) * pointerLen;

    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 8;
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(px, py);
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    this.ctx.beginPath();
    this.ctx.arc(px, py, 4.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffd166';
    this.ctx.shadowColor = '#ffd166';
    this.ctx.shadowBlur = 6;
    this.ctx.fill();
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fill();
  }
}

// ── 2. MAIN YOMI ENGINE CLASS ────────────────────────────────────────────────
class YomiEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Tactical State Machine: 'DECISION' | 'SIMULATING' | 'ROUND_OVER' | 'REPLAY'
    this.turnState = 'DECISION';
    this.previousState = 'DECISION';
    this.overlayBeforeReplay = null;

    // Entities & Combat System
    this.player = null;
    this.enemy = null;
    this.projectiles = [];
    this.spatialRifts = [];
    this.particles = [];
    this.damageTexts = [];

    // Aim & Move Selections
    this.selectedPlayerMove = 'QUICK_JAB';
    this.selectedAimAngle = 0;
    this.selectedEnemyMove = 'STEP_FWD';

    // Replay Recording System
    this.replayFrames = [];
    this.replayIndex = 0;
    this.isReplayPlaying = false;
    this.replaySpeed = 1.0;

    // Roguelite Expedition State
    this.currentFloor = 1;
    this.floorStage = 1; // 1 to 10
    this.currentOpponentData = null;
    this.gold = 50;

    // Move & Deck Management (Deck Limit: 11 active combat moves)
    this.ownedMoves = new Set([
      'STEP_FWD', 'STEP_BACK', 'JUMP', 'DASH', 'AIR_RECOVERY',
      'BLOCK', 'PARRY',
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'KI_BLAST', 'DRAGON_UPPER'
    ]);
    this.equippedMoves = new Set([
      'JUMP', 'DASH', 'AIR_RECOVERY',
      'BLOCK', 'PARRY',
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'KI_BLAST', 'DRAGON_UPPER'
    ]);
    this.moveUpgrades = new Map();
    this.apexMoves = new Set();
    this.activePerks = new Set();
    this.relics = new Set();

    // Meta Dojo Persistence
    this.meta = {
      shards: 0,
      upgrades: { hp: 0, sp: 0, crit: 0, def: 0 }
    };
    this.loadMeta();

    // Visual FX
    this.screenShake = { duration: 0, intensity: 0 };
    this.hitStop = 0;
    this.simFramesLeft = 0;
    this.comboCount = 0;
    this.comboTimeout = null;

    // Shop state
    this.activeShopTab = 'armory';

    // Initialize UI and Game Loop
    this.setupUI();
    this.setupReplayControls();
  }

  loadMeta() {
    try {
      const saved = localStorage.getItem('yomi_rogue_meta_v3');
      if (saved) {
        this.meta = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Unable to load meta storage', e);
    }
  }

  saveMeta() {
    try {
      localStorage.setItem('yomi_rogue_meta_v3', JSON.stringify(this.meta));
    } catch (e) {
      console.warn('Unable to save meta storage', e);
    }
  }

  getMoveData(moveKey, isPlayer) {
    const base = MOVES[moveKey];
    if (!base) return null;

    if (isPlayer) {
      if (this.apexMoves && this.apexMoves.has(moveKey)) {
        const apex = APEX_UPGRADES_CATALOG[moveKey];
        if (apex) return { ...base, ...apex.buffs, isApex: true, name: apex.name, shortName: base.shortName };
      }
      if (this.moveUpgrades && this.moveUpgrades.has(moveKey)) {
        const upg = this.moveUpgrades.get(moveKey);
        return { ...base, ...upg.buffs, isUpgraded: true, name: upg.name, shortName: base.shortName };
      }
    }
    return base;
  }

  setupUI() {
    this.aimWheel = new AimWheel('aim-canvas', 'aim-readout', (angle) => {
      this.selectedAimAngle = angle;
    });

    document.querySelectorAll('.btn-move').forEach(btn => {
      this.wireMoveButton(btn);
    });

    const btnLockIn = document.getElementById('btn-lock-in');
    if (btnLockIn) {
      btnLockIn.addEventListener('click', () => {
        SFX.init();
        this.lockInTurn();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        if (this.turnState === 'REPLAY') {
          e.preventDefault();
          this.isReplayPlaying = !this.isReplayPlaying;
          const playIcon = document.getElementById('replay-play-icon');
          if (playIcon) playIcon.innerText = this.isReplayPlaying ? 'PAUSE' : 'PLAY';
        } else if (this.turnState === 'DECISION') {
          e.preventDefault();
          SFX.init();
          this.lockInTurn();
        }
      } else if (e.code === 'Enter' && this.turnState === 'DECISION') {
        e.preventDefault();
        SFX.init();
        this.lockInTurn();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        if (this.turnState === 'REPLAY') {
          this.exitReplay();
        } else if (this.replayFrames.length > 0) {
          SFX.init();
          this.startReplay();
        }
      } else if (e.code === 'KeyD') {
        e.preventDefault();
        const deckModal = document.getElementById('screen-deck-modal');
        if (deckModal && deckModal.classList.contains('active')) {
          this.closeDeckModal();
        } else if (this.turnState === 'DECISION') {
          this.openDeckModal();
        }
      } else if (e.code === 'Escape') {
        e.preventDefault();
        const deckModal = document.getElementById('screen-deck-modal');
        const swapModal = document.getElementById('screen-deck-swap');
        if (deckModal && deckModal.classList.contains('active')) {
          this.closeDeckModal();
        } else if (swapModal && swapModal.classList.contains('active')) {
          swapModal.classList.remove('active');
        } else if (this.turnState === 'REPLAY') {
          this.exitReplay();
        }
      }
    });

    // Start Screen
    const btnStart = document.getElementById('btn-start-run');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        SFX.init();
        document.getElementById('screen-title').classList.remove('active');
        this.startExpedition();
      });
    }

    // Dojo Screen
    const btnDojo = document.getElementById('btn-open-dojo');
    if (btnDojo) {
      btnDojo.addEventListener('click', () => {
        SFX.init();
        this.openDojoScreen();
      });
    }

    const btnCloseDojo = document.getElementById('btn-close-dojo');
    if (btnCloseDojo) {
      btnCloseDojo.addEventListener('click', () => {
        document.getElementById('screen-dojo').classList.remove('active');
      });
    }

    // Replay Buttons Across All Screens
    const btnTopReplay = document.getElementById('btn-top-replay');
    if (btnTopReplay) {
      btnTopReplay.addEventListener('click', () => {
        SFX.init();
        if (this.turnState === 'REPLAY') {
          this.exitReplay();
        } else {
          this.startReplay();
        }
      });
    }

    const btnTopDeck = document.getElementById('btn-top-deck');
    if (btnTopDeck) {
      btnTopDeck.addEventListener('click', () => {
        SFX.init();
        this.openDeckModal();
      });
    }

    const btnCloseDeckModal = document.getElementById('btn-close-deck-modal');
    if (btnCloseDeckModal) {
      btnCloseDeckModal.addEventListener('click', () => {
        this.closeDeckModal();
      });
    }

    const btnDraftReplay = document.getElementById('btn-draft-replay');
    if (btnDraftReplay) {
      btnDraftReplay.addEventListener('click', () => {
        SFX.init();
        this.startReplay();
      });
    }

    const btnVictoryReplay = document.getElementById('btn-victory-replay');
    if (btnVictoryReplay) {
      btnVictoryReplay.addEventListener('click', () => {
        SFX.init();
        this.startReplay();
      });
    }

    const btnGameOverReplay = document.getElementById('btn-gameover-replay');
    if (btnGameOverReplay) {
      btnGameOverReplay.addEventListener('click', () => {
        SFX.init();
        this.startReplay();
      });
    }

    const btnGameOverDojo = document.getElementById('btn-gameover-dojo');
    if (btnGameOverDojo) {
      btnGameOverDojo.addEventListener('click', () => {
        SFX.init();
        document.getElementById('screen-gameover').classList.remove('active');
        this.openDojoScreen();
      });
    }

    // Victory Screen: Next Floor / Sanctuary Shop
    const btnNextFloor = document.getElementById('btn-next-floor');
    if (btnNextFloor) {
      btnNextFloor.addEventListener('click', () => {
        document.getElementById('screen-victory').classList.remove('active');
        this.openShop();
      });
    }

    const btnRetry = document.getElementById('btn-retry-run');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        document.getElementById('screen-gameover').classList.remove('active');
        this.startExpedition();
      });
    }

    // Sanctuary Shop Tabs & Exit Buttons
    const tabArmory = document.getElementById('tab-shop-armory');
    if (tabArmory) {
      tabArmory.addEventListener('click', () => {
        this.activeShopTab = 'armory';
        this.renderShopTab();
      });
    }

    const tabSupplies = document.getElementById('tab-shop-supplies');
    if (tabSupplies) {
      tabSupplies.addEventListener('click', () => {
        this.activeShopTab = 'supplies';
        this.renderShopTab();
      });
    }

    const tabDeck = document.getElementById('tab-shop-deck');
    if (tabDeck) {
      tabDeck.addEventListener('click', () => {
        this.activeShopTab = 'deck';
        this.renderShopTab();
      });
    }

    const btnLeaveShop = document.getElementById('btn-leave-shop');
    if (btnLeaveShop) {
      btnLeaveShop.addEventListener('click', () => {
        document.getElementById('screen-shop').classList.remove('active');
        this.currentFloor++;
        this.floorStage = 1;
        this.initStage(this.currentFloor, this.floorStage);
      });
    }
  }

  wireMoveButton(btn) {
    btn.addEventListener('click', () => {
      SFX.init();
      const mKey = btn.dataset.move;
      const mData = this.getMoveData(mKey, true);
      if (!mData) return;

      // SP VALIDATION SAFEGUARD
      if (mData.superCost > 0 && this.player && this.player.superMeter < mData.superCost) {
        SFX.playPunch(80);
        this.addDamageText(this.player.x, this.player.y - 65, `NEEDS ${mData.superCost} SP!`, '#ff3366', true);
        return;
      }

      document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      this.selectedPlayerMove = mKey;

      const descEl = document.getElementById('move-desc');
      if (descEl) {
        const vfxTag = this.getMoveVFXTag(mKey);
        descEl.innerText = `${mData.name}: ${mData.desc}`;
        descEl.title = `${mData.name} [VFX: ${vfxTag}] - ${mData.desc}`;
      }
    });
  }

  getMoveVFXTag(moveKey) {
    const k = (moveKey || '').toUpperCase();
    if (k === 'BLOCK' || k === 'AEGIS_REFLECT') return 'Pixel Hex Shield';
    if (k === 'PARRY') return 'Pixel Parry Flash';
    if (k === 'KI_BLAST' || k === 'SONIC_PALM') return 'Pixel Energy Spark';
    if (['DRAGON_UPPER', 'LAUNCHER', 'FIRE_BURST', 'FROSTFIRE_BURST'].includes(k) || k.includes('DRAGON') || k.includes('LAUNCHER') || k.includes('FIRE') || k.includes('BURST')) return 'Pixel Flame Pillar';
    if (['THUNDER_GALE', 'LIGHTNING_PALM', 'THUNDER_METEOR'].includes(k) || k.includes('THUNDER') || k.includes('LIGHTNING')) return 'Pixel Lightning Arc';
    if (['VOID_CLEAVE', 'JUDGMENT_CUT', 'EVENT_HORIZON_SLASH', 'CHRONO_JUDGMENT'].includes(k) || k.includes('VOID') || k.includes('JUDGMENT') || k.includes('HORIZON')) return 'Pixel Void Rift';
    if (['COMET_CRASH', 'GROUND_POUND', 'METEOR_STRIKE', 'GRAVITY_CRUSH', 'TEMPEST_QUAKE'].includes(k) || k.includes('COMET') || k.includes('GROUND') || k.includes('METEOR') || k.includes('GRAVITY')) return 'Pixel Ground Slam';
    if (k === 'GLACIAL_SPIKE' || k.includes('GLACIAL') || k.includes('FROST')) return 'Pixel Energy Spark';
    if (['QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'PHANTOM_SLIDE', 'BLADE_COUNTER', 'WHIRLWIND', 'DIVE_KICK', 'BLOOD_RUSH', 'CARMINE_HARVEST'].includes(k) || k.includes('SLASH') || k.includes('JAB') || k.includes('SWEEP') || k.includes('BLOOD') || k.includes('HARVEST')) return 'Pixel Blade Slash';
    return 'Pixel Hit Spark';
  }

  getMoveIconSVG(moveKey) {
    const icons = {
      STEP_FWD: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      STEP_BACK: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
      JUMP: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
      DASH: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>',
      AIR_RECOVERY: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>',
      SUPER_DASH: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14l8-8 8 8M4 19l8-8 8 8"/></svg>',
      DOUBLE_JUMP: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6M18 9l-6-6-6 6"/></svg>',
      GHOST_STEP: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>',
      SHADOW_TELEPORT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg>',
      BLOCK: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      PARRY: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M5 5l14 14M5 19l14-14"/></svg>',
      AEGIS_REFLECT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v8M8 12h8"/></svg>',
      QUICK_JAB: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
      HEAVY_SLASH: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4l5.5 5.5-11 11H3.5v-5.5l11-11z"/></svg>',
      SWEEP: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h12l6 4M6 13l4 4"/></svg>',
      LAUNCHER: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V3m0 0l-5 5m5-5l5 5"/></svg>',
      BLADE_COUNTER: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l14 14M19 5L5 19"/></svg>',
      WHIRLWIND: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>',
      DIVE_KICK: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10M17 7v10H7"/></svg>',
      KI_BLAST: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      DRAGON_UPPER: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>',
      FIRE_BURST: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
      LIGHTNING_PALM: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      THUNDER_GALE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 13h6l-1 9 9-11h-6l1-9z"/></svg>',
      VOID_CLEAVE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L20 4M9 20l11-11M4 15L15 4"/></svg>',
      JUDGMENT_CUT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M7 7l10 10M7 17L17 7"/></svg>',
      COMET_CRASH: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5l-7 7M15 3l-3 3M21 9l-3 3M11 13a4 4 0 1 1-4-4 4 4 0 0 1 4 4z"/></svg>',
      PHANTOM_SLIDE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17l10 4 10-4M2 12l10 4 10-4M2 7l10 4 10-4"/></svg>',
      GROUND_POUND: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v13m-6-4l6 6 6-6M4 21h16"/></svg>',
      METEOR_STRIKE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>',
      SOUL_REAP: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3a7.5 7.5 0 0 0-7 10.3L3 21l2 2 7.7-5.5A7.5 7.5 0 1 0 15.5 3z"/></svg>',
      CHRONO_STASIS: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M4 4l16 16"/></svg>',
      PHOENIX_KICK: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2 4 5 7 9 7-3 3-5 7-5 12-2-4-5-7-9-7 3-3 5-7 5-12z"/></svg>',
      SHADOW_PULL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
      SOLAR_SUPERNOVA: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>',
      TEMPEST_QUAKE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16M7 9h10M9 14h6M11 19h2M2 22h20"/></svg>',
      RAIKIRI_WARP: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8zM19 5l3 3-3 3"/></svg>',
      MIRAGE_RIPOSTE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4l5.5 5.5-11 11H3.5v-5.5l11-11zM4 4l16 16"/></svg>',
      VALKYRIE_ASCENT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6zM12 14v8M8 18h8"/></svg>',

      // ── 4 NEW BASE & UNLOCKABLE MOVES ──
      GLACIAL_SPIKE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L8 14h8l-4-12zM5 14l-2 8h18l-2-8H5z"/></svg>',
      SONIC_PALM: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
      GRAVITY_CRUSH: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v14M6 10l6 6 6-6M3 21h18"/></svg>',
      BLOOD_RUSH: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',

      // ── 5 NEW TIER 3 PINNACLE FUSIONS ──
      FROSTFIRE_BURST: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2 4 5 7 9 7-3 3-5 7-5 12-2-4-5-7-9-7 3-3 5-7 5-12zM12 12v10M7 17h10"/></svg>',
      EVENT_HORIZON_SLASH: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16M4 20L20 4"/></svg>',
      CHRONO_JUDGMENT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M3 3l18 18M21 3L3 21"/></svg>',
      THUNDER_METEOR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8zM19 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>',
      CARMINE_HARVEST: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3a7.5 7.5 0 0 0-7 10.3L3 21l2 2 7.7-5.5A7.5 7.5 0 1 0 15.5 3zM18 6l3 3"/></svg>'
    };
    return icons[moveKey] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';
  }

  rebuildMoveButtons() {
    const moveCat = document.getElementById('movement-btns');
    const defCat = document.getElementById('defense-btns');
    const atkCat = document.getElementById('attack-btns');
    const spCat = document.getElementById('special-btns');

    if (!moveCat || !defCat || !atkCat || !spCat) return;

    moveCat.innerHTML = '';
    defCat.innerHTML = '';
    atkCat.innerHTML = '';
    spCat.innerHTML = '';

    this.equippedMoves.forEach(moveKey => {
      const moveData = this.getMoveData(moveKey, true);
      if (!moveData) return;

      let targetContainer = atkCat;
      if (moveData.category === 'movement' || moveData.type === 'MOVEMENT') {
        targetContainer = moveCat;
      } else if (moveData.category === 'defense' || moveData.type === 'DEFENSE') {
        targetContainer = defCat;
      } else if (moveData.type === 'SPECIAL' || moveData.superCost > 0) {
        targetContainer = spCat;
      }

      const btn = document.createElement('button');
      btn.className = 'btn-move';
      if (moveData.isApex) btn.classList.add('apex-move');
      else if (moveData.isFusion) btn.classList.add('fusion-move');
      else if (moveData.isUpgraded) btn.classList.add('upgraded-move');

      if (moveData.type === 'SPECIAL') btn.classList.add('special-btn');
      btn.dataset.move = moveKey;

      // Frame & Spec Tag
      let frameText = 'Mobility';
      const startupVal = (moveData.startup !== undefined && moveData.startup !== null) ? moveData.startup : 0;
      if (moveData.superCost > 0) frameText = `${moveData.superCost} SP`;
      else if (moveData.damage > 0) frameText = `${startupVal}f • ${moveData.damage} Dmg`;
      else if (moveKey === 'PARRY') frameText = 'Frame Trap';
      else if (moveKey === 'BLOCK') frameText = 'Guard 80%';
      else if (moveKey === 'AIR_RECOVERY' || moveKey === 'VALKYRIE_ASCENT' || moveData.isAirTech) frameText = 'Air Tech';

      const svgIcon = this.getMoveIconSVG(moveKey);
      const label = moveData.shortName || moveData.name.split(' ')[0] || moveKey;
      let badgeHtml = '';
      if (moveData.isApex) badgeHtml = '<span class="move-badge badge-apex">APEX</span>';
      else if (moveData.isFusion) badgeHtml = '<span class="move-badge badge-fusion">FUSION</span>';
      else if (moveData.isUpgraded) badgeHtml = '<span class="move-badge badge-upg">UPG</span>';

      btn.innerHTML = `
        <div class="move-header">
          <span class="move-icon">${svgIcon}</span>
          <span class="move-name">${label}</span>
          ${badgeHtml}
        </div>
        <span class="move-frames">${frameText}</span>
      `;

      // Check SP sufficiency
      if (moveData.superCost > 0 && this.player && this.player.superMeter < moveData.superCost) {
        btn.classList.add('insufficient-sp');
      }

      this.wireMoveButton(btn);
      targetContainer.appendChild(btn);
    });

    // Ensure a valid affordable move is selected
    const selectedBtn = document.querySelector(`.btn-move[data-move="${this.selectedPlayerMove}"]`);
    if (selectedBtn && !selectedBtn.classList.contains('insufficient-sp')) {
      document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
      selectedBtn.classList.add('selected');
    } else {
      const fallbackBtn = document.querySelector('.btn-move:not(.insufficient-sp)') || document.querySelector('.btn-move');
      if (fallbackBtn) {
        document.querySelectorAll('.btn-move').forEach(b => b.classList.remove('selected'));
        fallbackBtn.classList.add('selected');
        this.selectedPlayerMove = fallbackBtn.dataset.move;
        const mData = this.getMoveData(this.selectedPlayerMove, true);
        if (mData) {
          const descEl = document.getElementById('move-desc');
          if (descEl) {
            const vfxTag = this.getMoveVFXTag(this.selectedPlayerMove);
            descEl.innerText = `${mData.name}: ${mData.desc}`;
            descEl.title = `${mData.name} [VFX: ${vfxTag}] - ${mData.desc}`;
          }
        }
      }
    }
  }

  showCombatToast(msg) {
    const el = document.getElementById('combat-toast');
    if (!el) return;
    el.innerText = msg;
    el.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      el.classList.remove('show');
    }, 2400);
  }

  unlockMove(moveKey) {
    this.ownedMoves.add(moveKey);
    const MAX_EQUIPPED = 14;

    if (this.equippedMoves.size < MAX_EQUIPPED) {
      this.equippedMoves.add(moveKey);
      const mData = this.getMoveData(moveKey, true);
      const mName = mData ? mData.name : moveKey;
      this.showCombatToast(`[SKILL] Equipped: ${mName}`);
      this.rebuildMoveButtons();
      this.updateHUD();
    } else {
      this.openDeckReplacementModal(moveKey);
    }
  }

  openDeckReplacementModal(newMoveKey) {
    const modal = document.getElementById('screen-deck-swap');
    if (!modal) return;
    const mData = this.getMoveData(newMoveKey, true);
    const mName = mData ? mData.name : newMoveKey;
    const nameEl = document.getElementById('swap-new-move-name');
    if (nameEl) nameEl.innerText = mName;

    const grid = document.getElementById('swap-deck-grid');
    if (grid) {
      grid.innerHTML = '';
      Array.from(this.equippedMoves).forEach(eqKey => {
        const eqData = this.getMoveData(eqKey, true);
        if (!eqData) return;
        const card = document.createElement('div');
        card.className = 'deck-item equipped';
        card.innerHTML = `
          <span class="deck-tag tag-equipped">CLICK TO REPLACE</span>
          <div style="font-size: 13px; font-weight: 700; color: #fff;">${eqData.name}</div>
          <div style="font-size: 11px; color: var(--accent-cyan); font-family: 'JetBrains Mono', monospace;">
            ${eqData.damage > 0 ? `${(eqData.startup !== undefined && eqData.startup !== null) ? eqData.startup : 0}f • ${eqData.damage} Dmg` : 'Mobility / Guard'}
          </div>
          <div style="font-size: 10px; color: #94a3b8; line-height: 1.3;">${eqData.desc}</div>
        `;
        card.addEventListener('click', () => {
          this.equippedMoves.delete(eqKey);
          this.equippedMoves.add(newMoveKey);
          this.rebuildMoveButtons();
          this.updateHUD();
          modal.classList.remove('active');
          this.showCombatToast(`[SWAP] ${eqData.name} -> ${mName}`);
        });
        grid.appendChild(card);
      });
    }

    const btnStash = document.getElementById('btn-swap-send-stash');
    if (btnStash) {
      btnStash.onclick = () => {
        modal.classList.remove('active');
        this.showCombatToast(`${mName} sent to Stash!`);
      };
    }

    modal.classList.add('active');
  }

  openDeckModal() {
    const modal = document.getElementById('screen-deck-modal');
    if (!modal) return;
    this.renderDeckModalGrid();
    modal.classList.add('active');
  }

  closeDeckModal() {
    const modal = document.getElementById('screen-deck-modal');
    if (modal) modal.classList.remove('active');
    this.rebuildMoveButtons();
    this.updateHUD();
  }

  renderDeckModalGrid() {
    const container = document.getElementById('modal-deck-grid');
    const countEl = document.getElementById('modal-deck-count');
    if (!container) return;
    container.innerHTML = '';
    if (countEl) countEl.innerText = `${this.equippedMoves.size} / 14 Moves (Owned: ${this.ownedMoves.size})`;

    Array.from(this.ownedMoves).forEach(moveKey => {
      const moveData = this.getMoveData(moveKey, true);
      if (!moveData) return;
      const isEquipped = this.equippedMoves.has(moveKey);
      const card = document.createElement('div');
      card.className = `deck-item ${isEquipped ? 'equipped' : 'stashed'}`;
      const tagClass = isEquipped ? 'tag-equipped' : 'tag-stashed';
      const tagText = isEquipped ? 'EQUIPPED (CLICK TO BENCH)' : 'STASHED (CLICK TO EQUIP)';

      card.innerHTML = `
        <span class="deck-tag ${tagClass}">${tagText}</span>
        <div style="font-size: 13px; font-weight: 700; color: #fff;">${moveData.name}</div>
        <div style="font-size: 11px; color: var(--accent-cyan); font-family: 'JetBrains Mono', monospace;">
          ${moveData.damage > 0 ? `${(moveData.startup !== undefined && moveData.startup !== null) ? moveData.startup : 0}f • ${moveData.damage} Dmg` : 'Mobility / Guard'}
        </div>
        <div style="font-size: 10px; color: #94a3b8; line-height: 1.3;">${moveData.desc}</div>
      `;

      card.addEventListener('click', () => {
        if (isEquipped) {
          if (this.equippedMoves.size <= 4) {
            this.showCombatToast('[WARNING] Minimum 4 equipped moves required!');
            return;
          }
          this.equippedMoves.delete(moveKey);
        } else {
          if (this.equippedMoves.size >= 14) {
            this.showCombatToast('[WARNING] Deck full (14/14)! Bench a move first.');
            return;
          }
          this.equippedMoves.add(moveKey);
        }
        this.renderDeckModalGrid();
        this.rebuildMoveButtons();
        this.updateHUD();
      });

      container.appendChild(card);
    });
  }

  upgradeMove(moveKey) {
    if (MOVE_UPGRADES_CATALOG[moveKey]) {
      this.moveUpgrades.set(moveKey, MOVE_UPGRADES_CATALOG[moveKey]);
      this.rebuildMoveButtons();
    }
  }

  startExpedition() {
    this.currentFloor = 1;
    this.floorStage = 1;
    this.gold = 50;
    this.activePerks.clear();
    this.relics.clear();
    this.moveUpgrades.clear();
    this.apexMoves.clear();

    // Reset standard starting deck
    this.ownedMoves = new Set([
      'STEP_FWD', 'STEP_BACK', 'JUMP', 'DASH', 'AIR_RECOVERY',
      'BLOCK', 'PARRY',
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'KI_BLAST', 'DRAGON_UPPER'
    ]);
    this.equippedMoves = new Set([
      'JUMP', 'DASH', 'AIR_RECOVERY',
      'BLOCK', 'PARRY',
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'KI_BLAST', 'DRAGON_UPPER'
    ]);

    this.initStage(this.currentFloor, this.floorStage);
  }

  initStage(floorNum, stageNum) {
    this.currentFloor = floorNum || 1;
    this.floorStage = stageNum || 1;
    this.enemyLastMoveKey = null;

    // Generate enemy from 10-stage pool
    const enemyData = generateEnemyData(this.currentFloor, this.floorStage);
    this.currentOpponentData = enemyData;

    // Instantiate Fighters
    this.player = new TacticalFighter('HUSTLER', 240, true, '#00f0ff');
    this.enemy = new TacticalFighter(enemyData.name, 784, false, enemyData.color);

    // Apply custom visual colors
    if (enemyData.bodyColor) this.enemy.bodyColor = enemyData.bodyColor;
    if (enemyData.headColor) this.enemy.headColor = enemyData.headColor;
    if (enemyData.accentColor) this.enemy.accentColor = enemyData.accentColor;

    // Apply Meta & Relic upgrades to Player
    const metaHp = (this.meta.upgrades.hp || 0) * 15;
    const relicHp = this.hasPerk('dragon_bone_charm') ? 45 : 0;
    const titanHp = this.hasPerk('titan_vitality') ? 35 : 0;
    this.player.maxHp = 100 + metaHp + relicHp + titanHp;
    this.player.hp = this.player.maxHp;

    const metaSp = (this.meta.upgrades.sp || 0) * 15;
    const perkSp = this.hasPerk('ki_battery') ? 25 : 0;
    this.player.maxSuper = 100 + metaSp + perkSp;

    // Starting SP from Relics / Passives
    let startSp = 0;
    if (this.hasPerk('ki_battery')) startSp += 15;
    if (this.hasPerk('ki_reactor_core')) startSp += 40;
    if (this.relics.has('ki_start')) startSp += 50;
    this.player.superMeter = Math.min(this.player.maxSuper, startSp);

    // Enemy Stats
    this.enemy.maxHp = enemyData.maxHp;
    this.enemy.hp = enemyData.maxHp;
    this.enemy.superMeter = enemyData.isBoss ? 40 : 10;
    if (this.hasPerk('temporal_compass')) {
      this.enemy.hitstunFrames = 2;
    }

    // Stage HUD Updates
    const stagePill = document.getElementById('stage-display');
    if (stagePill) {
      stagePill.innerText = `FLOOR ${this.currentFloor} • STAGE ${this.floorStage} / 10`;
    }

    const p2Name = document.getElementById('p2-name');
    if (p2Name) p2Name.innerText = enemyData.name.toUpperCase();

    const p2Arch = document.getElementById('p2-archetype');
    if (p2Arch) {
      const archTag = enemyData.archetype ? ` • ${enemyData.archetype.toUpperCase()}` : '';
      p2Arch.innerText = enemyData.title ? `${enemyData.title.toUpperCase()}${archTag}` : (enemyData.isBoss ? 'BOSS' : 'FIGHTER');
      p2Arch.className = enemyData.isBoss ? 'boss-archetype-pill is-boss' : 'boss-archetype-pill';
    }

    // Reset Combat States
    this.projectiles = [];
    this.spatialRifts = [];
    this.particles = [];
    this.damageTexts = [];
    this.replayFrames = [];
    this.comboCount = 0;
    if (window.PixelFX) window.PixelFX.clear();

    // Record initial frame 0 so replay is ready even at match start
    this.recordFrame();

    this.rebuildMoveButtons();
    this.updateHUD();
    this.openDecisionTurn();
  }

  hasPerk(id) {
    return this.activePerks.has(id) || this.relics.has(id);
  }

  openDecisionTurn() {
    this.turnState = 'DECISION';
    const tacPanel = document.getElementById('tactical-panel');
    if (tacPanel) tacPanel.classList.remove('hidden');

    this.player.facing = this.player.x < this.enemy.x ? 1 : -1;
    this.enemy.facing = this.enemy.x < this.player.x ? 1 : -1;

    // Vulnerable State Lifecycle and Whiff Detection for Mobility Attacks
    [this.player, this.enemy].forEach(f => {
      if (!f) return;
      if (f.moveKey) {
        const isMob = ['DIVE_KICK', 'COMET_CRASH', 'PHANTOM_SLIDE', 'SWEEP', 'THUNDER_GALE'].includes(f.moveKey) ||
          (f.currentMove && (f.currentMove.moveDist > 0 || f.currentMove.spikesDown));
        if (isMob && !f.hasHit) {
          f.isVulnerable = true;
          f.vulnerableTurns = 0;
          this.addDamageText(f.x, f.y - 75, 'WHIFF VULNERABLE!', '#ff5555', true);
          this.spawnSparks(f.x, f.y - 45, '#ff5555', 8);
        }
      }
      if (f.isVulnerable) {
        f.vulnerableTurns = (f.vulnerableTurns || 0) + 1;
        if (f.vulnerableTurns > 1) {
          f.isVulnerable = false;
          f.vulnerableTurns = 0;
        }
      }
    });

    // Tactical Foresight Passive Perk
    if (this.hasPerk('tactical_foresight')) {
      if (this.player.hitstunFrames > 0) this.player.hitstunFrames = Math.max(0, this.player.hitstunFrames - 1);
      else this.enemy.hitstunFrames += 1;
    }

    // Update Advantage Pill
    const advTag = document.getElementById('advantage-display');
    if (advTag) {
      if (this.enemy.hitstunFrames > 0) {
        advTag.innerText = `+${this.enemy.hitstunFrames}F COMBO ADVANTAGE`;
        advTag.className = 'frame-advantage-tag adv-plus';
      } else if (this.player.hitstunFrames > 0) {
        advTag.innerText = `-${this.player.hitstunFrames}F DISADVANTAGE`;
        advTag.className = 'frame-advantage-tag adv-minus';
      } else {
        advTag.innerText = 'NEUTRAL FRAME';
        advTag.className = 'frame-advantage-tag';
      }
    }

    // Refresh Move Buttons for SP states
    this.rebuildMoveButtons();
  }

  // ── INTELLIGENT SCALING AI (POOL & TIER BASED, ANTI-TURTLING, AIR RECOVERY, DYNAMIC FOSTERING) ──────
  chooseAIMove() {
    const opp = this.currentOpponentData || {};
    const movePool = [...(opp.moves || ['STEP_FWD', 'QUICK_JAB', 'HEAVY_SLASH', 'BLOCK']), 'AIR_RECOVERY'];
    const aiTier = opp.aiTier || 'BALANCED';
    const bossKey = opp.catalogKey || '';
    const archetype = opp.archetype || 'all_rounder';
    const dist = Math.abs(this.enemy.x - this.player.x);
    const rand = Math.random();
    const playerInHitstun = this.player.hitstunFrames > 0;
    const playerAirborne = this.player.isAirborne || this.player.y < this.player.floorY - 10;
    const playerVulnerable = !!this.player.isVulnerable;
    const enemyAirborne = this.enemy.isAirborne || this.enemy.y < this.enemy.floorY - 10;
    const enemyInHitstun = this.enemy.hitstunFrames > 0;

    // Progression scaling: Reaction accuracy & Air Tech proficiency by Tier
    const tierReactionRates = {
      NOVICE: 0.38,
      BALANCED: 0.62,
      AGGRESSIVE: 0.78,
      TACTICAL: 0.86,
      VETERAN: 0.93,
      BOSS: 0.99
    };
    const reactionRate = tierReactionRates[aiTier] || 0.70;

    const airTechRates = {
      NOVICE: 0.35,
      BALANCED: 0.60,
      AGGRESSIVE: 0.75,
      TACTICAL: 0.85,
      VETERAN: 0.92,
      BOSS: 0.99
    };
    const airTechRate = airTechRates[aiTier] || 0.60;

    // Helper: Pick best available move matching conditions and having enough SP
    const canUse = (key, minSp = 0) => {
      if (!movePool.includes(key)) return false;
      const mData = this.getMoveData(key, false);
      const cost = (mData && mData.superCost > 0) ? mData.superCost : 0;
      const required = Math.max(minSp, cost);
      if (required > 0 && this.enemy.superMeter < required) return false;
      return true;
    };

    // 0. AERIAL UKEMI RECOVERY: Break out of juggle combos and aerial tumble
    if (enemyAirborne && enemyInHitstun) {
      if (Math.random() < airTechRate) {
        if (canUse('VALKYRIE_ASCENT')) return 'VALKYRIE_ASCENT';
        if (canUse('AIR_RECOVERY')) return 'AIR_RECOVERY';
      }
    }

    // Defensive moves definition & Anti-Turtling System
    const defensiveMoves = ['BLOCK', 'PARRY', 'AEGIS_REFLECT', 'BLADE_COUNTER', 'MIRAGE_RIPOSTE'];
    const wasDefending = defensiveMoves.includes(this.enemyLastMoveKey);
    const isBerserker = bossKey === 'boss_crimson_oni' || archetype === 'berserker';
    const allowDefense = !wasDefending && !playerInHitstun && !playerAirborne && !playerVulnerable && !isBerserker;

    // Grounded hitstun defense: can attempt block or step back
    if (this.enemy.hitstunFrames > 0 && !enemyAirborne) {
      if (allowDefense && movePool.includes('BLOCK')) return 'BLOCK';
      if (allowDefense && movePool.includes('PARRY') && rand < 0.25) return 'PARRY';
      return movePool.includes('STEP_BACK') ? 'STEP_BACK' : 'STEP_FWD';
    }

    // SITUATIONAL REACTION 1: FREE AIR COMBAT (Enemy is in mid-air, not stunned)
    if (enemyAirborne) {
      if (dist < 130) {
        if (canUse('GRAVITY_CRUSH')) return 'GRAVITY_CRUSH';
        if (canUse('THUNDER_METEOR')) return 'THUNDER_METEOR';
        if (canUse('COMET_CRASH')) return 'COMET_CRASH';
        if (canUse('TEMPEST_QUAKE')) return 'TEMPEST_QUAKE';
        if (canUse('DIVE_KICK')) return 'DIVE_KICK';
        if (canUse('GROUND_POUND')) return 'GROUND_POUND';
        if (canUse('PHOENIX_KICK')) return 'PHOENIX_KICK';
      }
      if (canUse('VALKYRIE_ASCENT') && rand < 0.4) return 'VALKYRIE_ASCENT';
      if (canUse('AIR_RECOVERY') && rand < 0.4) return 'AIR_RECOVERY';
      if (canUse('SUPER_DASH')) return 'SUPER_DASH';
      if (canUse('KI_BLAST')) return 'KI_BLAST';
    }

    // SITUATIONAL REACTION 2: PUNISH & HIT-CONFIRM (Scaled by reaction accuracy)
    if ((playerInHitstun || playerVulnerable) && Math.random() < reactionRate) {
      if (dist < 95) {
        if (canUse('CARMINE_HARVEST')) return 'CARMINE_HARVEST';
        if (canUse('EVENT_HORIZON_SLASH')) return 'EVENT_HORIZON_SLASH';
        if (canUse('CHRONO_JUDGMENT')) return 'CHRONO_JUDGMENT';
        if (canUse('THUNDER_METEOR')) return 'THUNDER_METEOR';
        if (canUse('FROSTFIRE_BURST')) return 'FROSTFIRE_BURST';
        if (canUse('SOLAR_SUPERNOVA')) return 'SOLAR_SUPERNOVA';
        if (canUse('RAIKIRI_WARP')) return 'RAIKIRI_WARP';
        if (canUse('VOID_CLEAVE')) return 'VOID_CLEAVE';
        if (canUse('BLOOD_RUSH')) return 'BLOOD_RUSH';
        if (canUse('SONIC_PALM')) return 'SONIC_PALM';
        if (canUse('DRAGON_UPPER')) return 'DRAGON_UPPER';
        if (canUse('PHOENIX_KICK')) return 'PHOENIX_KICK';
        if (canUse('SOUL_REAP')) return 'SOUL_REAP';
        if (canUse('JUDGMENT_CUT')) return 'JUDGMENT_CUT';
        if (canUse('TEMPEST_QUAKE')) return 'TEMPEST_QUAKE';
        if (canUse('COMET_CRASH')) return 'COMET_CRASH';
        if (canUse('THUNDER_GALE')) return 'THUNDER_GALE';
        if (canUse('METEOR_STRIKE')) return 'METEOR_STRIKE';
        if (canUse('HEAVY_SLASH')) return 'HEAVY_SLASH';
        if (canUse('LAUNCHER')) return 'LAUNCHER';
        if (canUse('LIGHTNING_PALM')) return 'LIGHTNING_PALM';
        return canUse('QUICK_JAB') ? 'QUICK_JAB' : 'STEP_FWD';
      } else {
        if (canUse('EVENT_HORIZON_SLASH')) return 'EVENT_HORIZON_SLASH';
        if (canUse('FROSTFIRE_BURST')) return 'FROSTFIRE_BURST';
        if (canUse('GLACIAL_SPIKE')) return 'GLACIAL_SPIKE';
        if (canUse('CHRONO_STASIS')) return 'CHRONO_STASIS';
        if (canUse('SHADOW_PULL')) return 'SHADOW_PULL';
        if (canUse('RAIKIRI_WARP')) return 'RAIKIRI_WARP';
        if (canUse('PHANTOM_SLIDE')) return 'PHANTOM_SLIDE';
        if (canUse('SUPER_DASH')) return 'SUPER_DASH';
        if (canUse('BLOOD_RUSH')) return 'BLOOD_RUSH';
        if (canUse('GHOST_STEP')) return 'GHOST_STEP';
        if (canUse('DASH')) return 'DASH';
        return 'STEP_FWD';
      }
    }

    // SITUATIONAL REACTION 3: ANTI-AIR (Scaled by reaction accuracy)
    if (playerAirborne && dist < 210 && Math.random() < reactionRate) {
      if (canUse('VALKYRIE_ASCENT')) return 'VALKYRIE_ASCENT';
      if (canUse('PHOENIX_KICK')) return 'PHOENIX_KICK';
      if (canUse('DRAGON_UPPER')) return 'DRAGON_UPPER';
      if (canUse('LAUNCHER')) return 'LAUNCHER';
      if (canUse('GRAVITY_CRUSH')) return 'GRAVITY_CRUSH';
      if (canUse('METEOR_STRIKE')) return 'METEOR_STRIKE';
      if (canUse('THUNDER_METEOR')) return 'THUNDER_METEOR';
      if (canUse('SOLAR_SUPERNOVA')) return 'SOLAR_SUPERNOVA';
      if (canUse('KI_BLAST')) return 'KI_BLAST';
      if (canUse('GHOST_STEP')) return 'GHOST_STEP';
      if (canUse('DASH')) return 'DASH';
    }

    // SITUATIONAL REACTION 4: GUARD BREAKER & CROSS-UP (Scaled by reaction accuracy)
    const wasPlayerDefending = this.player.isBlocking || this.player.isParrying || 
      (this.player.moveKey && ['BLOCK', 'PARRY', 'AEGIS_REFLECT', 'BLADE_COUNTER', 'MIRAGE_RIPOSTE'].includes(this.player.moveKey));
    if (wasPlayerDefending && dist < 170 && Math.random() < reactionRate) {
      if (canUse('SONIC_PALM')) return 'SONIC_PALM'; // Unblockable acoustic shockwave!
      if (canUse('EVENT_HORIZON_SLASH')) return 'EVENT_HORIZON_SLASH'; // Unblockable dimensional rift!
      if (canUse('MIRAGE_RIPOSTE')) return 'MIRAGE_RIPOSTE';
      if (canUse('SHADOW_PULL')) return 'SHADOW_PULL';
      if (canUse('RAIKIRI_WARP')) return 'RAIKIRI_WARP';
      if (canUse('PHANTOM_SLIDE')) return 'PHANTOM_SLIDE'; // Crosses up behind guard
      if (canUse('GHOST_STEP')) return 'GHOST_STEP';
      if (canUse('SHADOW_TELEPORT')) return 'SHADOW_TELEPORT';
      if (canUse('SWEEP')) return 'SWEEP'; // Hits low through high guard
      if (canUse('VOID_CLEAVE')) return 'VOID_CLEAVE';
      if (canUse('JUDGMENT_CUT')) return 'JUDGMENT_CUT';
    }

    // SITUATIONAL REACTION 5: CORNER ESCAPE (Enemy trapped near edge)
    const isCornered = (this.enemy.x < 130 && this.enemy.facing === 1) || (this.enemy.x > 890 && this.enemy.facing === -1);
    if (isCornered) {
      if (canUse('SHADOW_TELEPORT')) return 'SHADOW_TELEPORT';
      if (canUse('GHOST_STEP')) return 'GHOST_STEP';
      if (canUse('PHANTOM_SLIDE')) return 'PHANTOM_SLIDE';
      if (canUse('SUPER_DASH')) return 'SUPER_DASH';
      if (canUse('DOUBLE_JUMP')) return 'DOUBLE_JUMP';
      if (canUse('JUMP')) return 'JUMP';
    }

    // TIER AND ARCHETYPE BASED TACTICS

    // 1. BOSS AI (Dynamic, specialized per archetype)
    if (aiTier === 'BOSS') {
      // 1.1 BERSERKER (Crimson Oni Goryo, Blood Wraith Vane) - Relentless rushdown, zero defense, brute force
      if (archetype === 'berserker' || archetype === 'blood_wraith' || bossKey === 'boss_blood_wraith') {
        if (dist > 180) {
          if (canUse('CARMINE_HARVEST') && rand < 0.65) return 'CARMINE_HARVEST';
          if (canUse('SOLAR_SUPERNOVA') && rand < 0.6) return 'SOLAR_SUPERNOVA';
          if (canUse('BLOOD_RUSH')) return 'BLOOD_RUSH';
          if (canUse('SUPER_DASH')) return 'SUPER_DASH';
          if (canUse('DRAGON_UPPER')) return 'DRAGON_UPPER';
          return 'DASH';
        }
        if (dist >= 85) {
          if (canUse('CARMINE_HARVEST') && rand < 0.6) return 'CARMINE_HARVEST';
          if (canUse('BLOOD_RUSH') && rand < 0.55) return 'BLOOD_RUSH';
          if (canUse('SOUL_REAP') && rand < 0.5) return 'SOUL_REAP';
          if (canUse('SOLAR_SUPERNOVA') && rand < 0.45) return 'SOLAR_SUPERNOVA';
          if (canUse('PHOENIX_KICK') && rand < 0.45) return 'PHOENIX_KICK';
          if (canUse('METEOR_STRIKE') && rand < 0.5) return 'METEOR_STRIKE';
          if (canUse('SWEEP') && rand < 0.4) return 'SWEEP';
          if (canUse('LIGHTNING_PALM') && rand < 0.4) return 'LIGHTNING_PALM';
          return canUse('SUPER_DASH') ? 'SUPER_DASH' : 'STEP_FWD';
        }
        if (canUse('CARMINE_HARVEST') && rand < 0.55) return 'CARMINE_HARVEST';
        if (canUse('BLOOD_RUSH') && rand < 0.5) return 'BLOOD_RUSH';
        if (canUse('SOUL_REAP') && rand < 0.45) return 'SOUL_REAP';
        if (canUse('TEMPEST_QUAKE') && rand < 0.45) return 'TEMPEST_QUAKE';
        if (canUse('GROUND_POUND') && rand < 0.4) return 'GROUND_POUND';
        if (canUse('METEOR_STRIKE') && rand < 0.45) return 'METEOR_STRIKE';
        if (canUse('DRAGON_UPPER') && rand < 0.4) return 'DRAGON_UPPER';
        if (canUse('PHOENIX_KICK') && rand < 0.4) return 'PHOENIX_KICK';
        if (canUse('SWEEP')) return 'SWEEP';
        return 'QUICK_JAB';
      }

      // 1.2 SHINOBI (Shadow Lotus Ayame, Soul Harvester Thanatos) - Phase slides, cross-ups, counter frame traps
      if (archetype === 'shinobi') {
        if (dist > 190) {
          if (canUse('RAIKIRI_WARP') && rand < 0.6) return 'RAIKIRI_WARP';
          if (canUse('SHADOW_TELEPORT') && rand < 0.6) return 'SHADOW_TELEPORT';
          if (canUse('GHOST_STEP')) return 'GHOST_STEP';
          return 'STEP_FWD';
        }
        if (dist >= 85) {
          if (canUse('SOUL_REAP') && rand < 0.5) return 'SOUL_REAP';
          if (canUse('PHANTOM_SLIDE') && rand < 0.55) return 'PHANTOM_SLIDE';
          if (canUse('JUDGMENT_CUT') && rand < 0.4) return 'JUDGMENT_CUT';
          if (canUse('DIVE_KICK') && rand < 0.45) return 'DIVE_KICK';
          if (canUse('THUNDER_GALE') && rand < 0.4) return 'THUNDER_GALE';
          if (canUse('GHOST_STEP') && rand < 0.5) return 'GHOST_STEP';
          return rand < 0.4 ? 'STEP_BACK' : 'STEP_FWD';
        }
        if (allowDefense && rand < 0.35) {
          if (canUse('MIRAGE_RIPOSTE')) return 'MIRAGE_RIPOSTE';
          if (canUse('BLADE_COUNTER')) return 'BLADE_COUNTER';
          if (canUse('PARRY')) return 'PARRY';
        }
        if (canUse('RAIKIRI_WARP')) return 'RAIKIRI_WARP';
        if (canUse('SOUL_REAP')) return 'SOUL_REAP';
        if (canUse('THUNDER_GALE')) return 'THUNDER_GALE';
        if (canUse('VOID_CLEAVE')) return 'VOID_CLEAVE';
        if (canUse('QUICK_JAB')) return 'QUICK_JAB';
        return 'STEP_BACK';
      }

      // 1.3 ZONER & SINGULARITY (Void Lord Malakor, Chronomancer Aeon, Singularity Gorgon) - Spacing control, spatial tears
      if (archetype === 'zoner' || archetype === 'singularity' || bossKey === 'boss_singularity_gorgon') {
        if (dist < 100) {
          if (canUse('GRAVITY_CRUSH') && rand < 0.55) return 'GRAVITY_CRUSH';
          if (canUse('SHADOW_TELEPORT')) return 'SHADOW_TELEPORT';
          if (canUse('GHOST_STEP')) return 'GHOST_STEP';
          if (canUse('WHIRLWIND')) return 'WHIRLWIND';
          return 'STEP_BACK';
        }
        if (dist > 200) {
          if (canUse('EVENT_HORIZON_SLASH') && rand < 0.6) return 'EVENT_HORIZON_SLASH';
          if (canUse('CHRONO_JUDGMENT') && rand < 0.55) return 'CHRONO_JUDGMENT';
          if (canUse('THUNDER_METEOR') && rand < 0.5) return 'THUNDER_METEOR';
          if (canUse('CHRONO_STASIS') && rand < 0.55) return 'CHRONO_STASIS';
          if (canUse('SHADOW_PULL') && rand < 0.5) return 'SHADOW_PULL';
          if (canUse('JUDGMENT_CUT') && rand < 0.5) return 'JUDGMENT_CUT';
          if (canUse('VOID_CLEAVE') && rand < 0.45) return 'VOID_CLEAVE';
          if (canUse('FIRE_BURST') && rand < 0.4) return 'FIRE_BURST';
          if (canUse('KI_BLAST')) return 'KI_BLAST';
        }
        if (canUse('EVENT_HORIZON_SLASH') && rand < 0.55) return 'EVENT_HORIZON_SLASH';
        if (canUse('CHRONO_JUDGMENT') && rand < 0.5) return 'CHRONO_JUDGMENT';
        if (canUse('GRAVITY_CRUSH') && rand < 0.45) return 'GRAVITY_CRUSH';
        if (canUse('CHRONO_STASIS') && rand < 0.5) return 'CHRONO_STASIS';
        if (canUse('SHADOW_PULL') && rand < 0.45) return 'SHADOW_PULL';
        if (canUse('VOID_CLEAVE') && rand < 0.5) return 'VOID_CLEAVE';
        if (canUse('JUDGMENT_CUT') && rand < 0.5) return 'JUDGMENT_CUT';
        if (canUse('THUNDER_GALE') && rand < 0.4) return 'THUNDER_GALE';
        return rand < 0.5 ? 'STEP_BACK' : 'STEP_FWD';
      }

      // 1.4 AERIAL DOMINATOR (Solar Seraph Uriel) - Sky leaps, starlight dives, comet crashes
      if (archetype === 'aerial') {
        if (!enemyAirborne && dist > 90) {
          if (canUse('VALKYRIE_ASCENT') && rand < 0.5) return 'VALKYRIE_ASCENT';
          if (canUse('DOUBLE_JUMP')) return 'DOUBLE_JUMP';
          if (canUse('JUMP')) return 'JUMP';
        }
        if (dist < 140) {
          if (canUse('VALKYRIE_ASCENT') && rand < 0.45) return 'VALKYRIE_ASCENT';
          if (canUse('PHOENIX_KICK') && rand < 0.5) return 'PHOENIX_KICK';
          if (canUse('COMET_CRASH')) return 'COMET_CRASH';
          if (canUse('DIVE_KICK')) return 'DIVE_KICK';
          if (canUse('DRAGON_UPPER')) return 'DRAGON_UPPER';
        }
        if (canUse('FIRE_BURST')) return 'FIRE_BURST';
        if (canUse('SUPER_DASH')) return 'SUPER_DASH';
        return 'STEP_FWD';
      }

      // 1.5 JUGGERNAUT / TANK / COLOSSUS (Abyssal Sovereign Dagon, Frost Colossus Ymir) - Heavy armor
      if (archetype === 'juggernaut' || archetype === 'tank' || archetype === 'colossus' || bossKey === 'boss_frost_colossus') {
        if (dist > 180) {
          if (canUse('FROSTFIRE_BURST') && rand < 0.55) return 'FROSTFIRE_BURST';
          if (canUse('GLACIAL_SPIKE') && rand < 0.55) return 'GLACIAL_SPIKE';
          if (canUse('TEMPEST_QUAKE') && rand < 0.5) return 'TEMPEST_QUAKE';
          if (canUse('SUPER_DASH') && rand < 0.6) return 'SUPER_DASH';
          if (canUse('FIRE_BURST') && rand < 0.45) return 'FIRE_BURST';
          return 'STEP_FWD';
        }
        if (allowDefense && rand < 0.32) {
          if (canUse('AEGIS_REFLECT')) return 'AEGIS_REFLECT';
          if (canUse('BLOCK')) return 'BLOCK';
        }
        if (dist < 130) {
          if (canUse('FROSTFIRE_BURST') && rand < 0.5) return 'FROSTFIRE_BURST';
          if (canUse('GLACIAL_SPIKE') && rand < 0.45) return 'GLACIAL_SPIKE';
          if (canUse('TEMPEST_QUAKE') && rand < 0.5) return 'TEMPEST_QUAKE';
          if (canUse('GROUND_POUND') && rand < 0.45) return 'GROUND_POUND';
          if (canUse('METEOR_STRIKE') && rand < 0.4) return 'METEOR_STRIKE';
          if (canUse('COMET_CRASH') && rand < 0.4) return 'COMET_CRASH';
          if (canUse('HEAVY_SLASH')) return 'HEAVY_SLASH';
        }
        return canUse('SUPER_DASH') ? 'SUPER_DASH' : 'STEP_FWD';
      }
        return canUse('SUPER_DASH') ? 'SUPER_DASH' : 'STEP_FWD';
      }

      // 1.6 COUNTER / SHOGUN (Iron Shogun Raiden) - Frame traps, parry baiting, punishing cleaves
      if (archetype === 'counter') {
        if (dist < 120 && allowDefense && rand < 0.35) {
          if (canUse('MIRAGE_RIPOSTE')) return 'MIRAGE_RIPOSTE';
          if (canUse('BLADE_COUNTER')) return 'BLADE_COUNTER';
          if (canUse('PARRY')) return 'PARRY';
        }
        if (dist < 110) {
          if (canUse('RAIKIRI_WARP') && rand < 0.45) return 'RAIKIRI_WARP';
          if (canUse('HEAVY_SLASH') && rand < 0.45) return 'HEAVY_SLASH';
          if (canUse('DRAGON_UPPER') && rand < 0.4) return 'DRAGON_UPPER';
          if (canUse('GROUND_POUND')) return 'GROUND_POUND';
        }
        if (dist >= 110 && dist < 200) {
          if (canUse('LAUNCHER') && rand < 0.45) return 'LAUNCHER';
          if (canUse('DASH') && rand < 0.6) return 'DASH';
        }
        return 'STEP_FWD';
      }

      // 1.7 SUPREME / ALL-ROUNDER (Celestial Emperor Zenith) - Master of all martial arts
      if (dist < 120 && canUse('SOLAR_SUPERNOVA') && rand < 0.6) return 'SOLAR_SUPERNOVA';
      if (dist < 110 && canUse('VALKYRIE_ASCENT') && rand < 0.5) return 'VALKYRIE_ASCENT';
      if (dist < 120 && canUse('VOID_CLEAVE')) return 'VOID_CLEAVE';
      if (dist < 110 && canUse('DRAGON_UPPER')) return 'DRAGON_UPPER';
      if (dist < 140 && canUse('THUNDER_GALE')) return 'THUNDER_GALE';
      if (dist < 120 && canUse('COMET_CRASH')) return 'COMET_CRASH';
      if (dist > 180 && canUse('RAIKIRI_WARP') && rand < 0.55) return 'RAIKIRI_WARP';
      if (dist > 180 && canUse('SUPER_DASH') && rand < 0.65) return 'SUPER_DASH';
      if (dist > 160 && canUse('GHOST_STEP') && rand < 0.5) return 'GHOST_STEP';
      if (dist < 100 && allowDefense && rand < 0.22) {
        if (canUse('MIRAGE_RIPOSTE')) return 'MIRAGE_RIPOSTE';
        if (canUse('AEGIS_REFLECT')) return 'AEGIS_REFLECT';
        if (canUse('PARRY')) return 'PARRY';
      }
      return canUse('SUPER_DASH') ? 'SUPER_DASH' : 'STEP_FWD';
    }

    // 2. VETERAN AI (High tier elite enemies)
    if (aiTier === 'VETERAN') {
      if (dist > 180) {
        if (canUse('SUPER_DASH')) return 'SUPER_DASH';
        if (canUse('GHOST_STEP') && rand < 0.5) return 'GHOST_STEP';
        if (canUse('DASH')) return 'DASH';
        return 'STEP_FWD';
      }
      if (dist >= 85) {
        if (canUse('PHANTOM_SLIDE') && rand < 0.4) return 'PHANTOM_SLIDE';
        if (canUse('SWEEP') && dist < 120 && rand < 0.45) return 'SWEEP';
        if (canUse('KI_BLAST') && rand < 0.4) return 'KI_BLAST';
        return canUse('DASH') ? 'DASH' : (rand < 0.4 ? 'STEP_BACK' : 'STEP_FWD');
      }
      // Close range
      if (allowDefense && rand < 0.14) {
        if (canUse('BLADE_COUNTER')) return 'BLADE_COUNTER';
        if (canUse('PARRY')) return 'PARRY';
        if (canUse('BLOCK')) return 'BLOCK';
      }
      if (canUse('LAUNCHER') && rand < 0.35) return 'LAUNCHER';
      if (canUse('HEAVY_SLASH') && rand < 0.5) return 'HEAVY_SLASH';
      return canUse('QUICK_JAB') ? 'QUICK_JAB' : 'STEP_FWD';
    }

    // 3. TACTICAL AI (Zoners and mid-range duelists)
    if (aiTier === 'TACTICAL') {
      if (dist > 160) {
        if (canUse('KI_BLAST') && rand < 0.55) return 'KI_BLAST';
        if (canUse('FIRE_BURST') && rand < 0.45) return 'FIRE_BURST';
        return 'STEP_FWD';
      }
      if (dist >= 85) {
        if (canUse('SWEEP') && rand < 0.4) return 'SWEEP';
        if (canUse('LIGHTNING_PALM') && rand < 0.35) return 'LIGHTNING_PALM';
        return rand < 0.5 ? 'STEP_FWD' : 'STEP_BACK';
      }
      if (allowDefense && rand < 0.15) {
        if (canUse('PARRY')) return 'PARRY';
        if (canUse('BLOCK')) return 'BLOCK';
      }
      if (canUse('LIGHTNING_PALM')) return 'LIGHTNING_PALM';
      if (canUse('SWEEP')) return 'SWEEP';
      return canUse('QUICK_JAB') ? 'QUICK_JAB' : 'HEAVY_SLASH';
    }

    // 4. AGGRESSIVE AI (Rushdown brawlers)
    if (aiTier === 'AGGRESSIVE') {
      if (dist > 160) {
        if (canUse('SUPER_DASH')) return 'SUPER_DASH';
        if (canUse('DASH')) return 'DASH';
        return 'STEP_FWD';
      }
      if (dist >= 85) {
        if (canUse('DIVE_KICK') && rand < 0.35) return 'DIVE_KICK';
        if (canUse('SWEEP') && rand < 0.4) return 'SWEEP';
        return canUse('DASH') ? 'DASH' : 'STEP_FWD';
      }
      if (canUse('METEOR_STRIKE')) return 'METEOR_STRIKE';
      if (canUse('GROUND_POUND') && rand < 0.4) return 'GROUND_POUND';
      if (canUse('LAUNCHER') && rand < 0.4) return 'LAUNCHER';
      if (canUse('HEAVY_SLASH') && rand < 0.5) return 'HEAVY_SLASH';
      return canUse('QUICK_JAB') ? 'QUICK_JAB' : 'STEP_FWD';
    }

    // 5. NOVICE / BALANCED AI
    if (dist > 130) return rand < 0.65 ? 'STEP_FWD' : 'STEP_BACK';
    if (dist < 75) {
      if (allowDefense && rand < 0.12 && canUse('BLOCK')) return 'BLOCK';
      if (canUse('SWEEP') && rand < 0.35) return 'SWEEP';
      return canUse('QUICK_JAB') ? 'QUICK_JAB' : 'HEAVY_SLASH';
    }
    return 'STEP_FWD';
  }

  getAIAimAngle(moveKey) {
    const dx = (this.player.x - this.enemy.x) * this.enemy.facing;
    const dy = -(this.player.y - this.enemy.y);
    const directAngle = Math.round(Math.atan2(dy, Math.max(1, dx)) * 180 / Math.PI);

    if (moveKey === 'AIR_RECOVERY' || moveKey === 'VALKYRIE_ASCENT') {
      const dist = Math.abs(this.enemy.x - this.player.x);
      // If player is close and trying to anti-air juggle, tech back and up
      if (dist < 160) {
        return 135;
      }
      // If safe, tech downward toward the ground
      return -60;
    }

    if (['JUMP', 'DOUBLE_JUMP'].includes(moveKey)) {
      return this.player.isAirborne ? Math.max(45, directAngle) : 45;
    }

    if (moveKey === 'DIVE_KICK' || moveKey === 'COMET_CRASH' || moveKey === 'GRAVITY_CRUSH' || moveKey === 'THUNDER_METEOR') {
      return Math.min(-30, Math.max(-85, directAngle));
    }

    if (moveKey === 'SWEEP' || moveKey === 'PHANTOM_SLIDE') {
      return -30;
    }

    if (moveKey === 'GLACIAL_SPIKE' || moveKey === 'FROSTFIRE_BURST') {
      return Math.min(25, Math.max(-30, directAngle));
    }

    if (moveKey === 'LAUNCHER' || moveKey === 'DRAGON_UPPER' || moveKey === 'PHOENIX_KICK') {
      return 60;
    }

    if (['KI_BLAST', 'FIRE_BURST', 'JUDGMENT_CUT', 'VOID_CLEAVE', 'DASH', 'SUPER_DASH', 'SHADOW_PULL', 'CHRONO_STASIS', 'SOUL_REAP', 'SOLAR_SUPERNOVA', 'RAIKIRI_WARP', 'SONIC_PALM', 'BLOOD_RUSH', 'EVENT_HORIZON_SLASH', 'CHRONO_JUDGMENT', 'CARMINE_HARVEST'].includes(moveKey)) {
      // Dynamic true elevation angle targeting!
      return Math.min(75, Math.max(-45, directAngle));
    }

    return 0;
  }

  lockInTurn() {
    if (this.turnState !== 'DECISION') return;

    // SP VALIDATION CHECK
    const pData = this.getMoveData(this.selectedPlayerMove, true);
    if (pData && pData.superCost > 0 && this.player.superMeter < pData.superCost) {
      SFX.playPunch(80);
      this.addDamageText(this.player.x, this.player.y - 65, `INSUFFICIENT SP (${pData.superCost})!`, '#ff3366', true);
      return;
    }

    SFX.playLockIn();
    this.turnState = 'SIMULATING';
    const tacPanel = document.getElementById('tactical-panel');
    if (tacPanel) tacPanel.classList.add('hidden');

    this.selectedEnemyMove = this.chooseAIMove();
    this.enemyLastMoveKey = this.selectedEnemyMove;
    const enemyAimAngle = this.getAIAimAngle(this.selectedEnemyMove);

    this.player.executeMove(this.selectedPlayerMove, this.selectedAimAngle);
    this.enemy.executeMove(this.selectedEnemyMove, enemyAimAngle);

    // Phantom Dash Trap Perk
    if (this.selectedPlayerMove === 'DASH' && this.hasPerk('phantom_dash')) {
      this.spawnSparks(this.player.x, this.player.y - 40, '#00f0ff', 16);
      this.projectiles.push(new Projectile(this.player.x, this.player.y - 40, 0, 0, true, 32, '#00f0ff'));
    }

    const eData = this.getMoveData(this.selectedEnemyMove, false);
    const pDur = (pData && pData.duration) || 16;
    const eDur = (eData && eData.duration) || 16;
    this.simFramesLeft = Math.max(pDur, eDur, 18);
  }

  recordFrame() {
    if (!this.player || !this.enemy) return;

    const snapshot = {
      p: {
        x: this.player.x,
        y: this.player.y,
        floorY: this.player.floorY,
        facing: this.player.facing,
        color: this.player.color,
        bodyColor: this.player.bodyColor,
        headColor: this.player.headColor,
        accentColor: this.player.accentColor,
        width: this.player.width,
        height: this.player.height,
        isAirborne: this.player.isAirborne,
        isInvulnerable: this.player.isInvulnerable,
        isBlocking: this.player.isBlocking,
        isParrying: this.player.isParrying,
        isVulnerable: this.player.isVulnerable,
        hitstunFrames: this.player.hitstunFrames,
        moveKey: this.player.moveKey,
        moveFrame: this.player.moveFrame,
        animTick: this.player.animTick,
        hp: this.player.hp,
        maxHp: this.player.maxHp,
        superMeter: this.player.superMeter,
        maxSuper: this.player.maxSuper,
        afterimages: this.player.afterimages.map(a => ({ ...a }))
      },
      e: {
        x: this.enemy.x,
        y: this.enemy.y,
        floorY: this.enemy.floorY,
        facing: this.enemy.facing,
        color: this.enemy.color,
        bodyColor: this.enemy.bodyColor,
        headColor: this.enemy.headColor,
        accentColor: this.enemy.accentColor,
        width: this.enemy.width,
        height: this.enemy.height,
        isAirborne: this.enemy.isAirborne,
        isInvulnerable: this.enemy.isInvulnerable,
        isBlocking: this.enemy.isBlocking,
        isParrying: this.enemy.isParrying,
        isVulnerable: this.enemy.isVulnerable,
        hitstunFrames: this.enemy.hitstunFrames,
        moveKey: this.enemy.moveKey,
        moveFrame: this.enemy.moveFrame,
        animTick: this.enemy.animTick,
        hp: this.enemy.hp,
        maxHp: this.enemy.maxHp,
        superMeter: this.enemy.superMeter,
        maxSuper: this.enemy.maxSuper,
        catalogKey: this.enemy.catalogKey,
        name: this.enemy.name,
        title: (this.currentOpponentData && this.currentOpponentData.title) || '',
        afterimages: this.enemy.afterimages.map(a => ({ ...a }))
      },
      projectiles: this.projectiles.map(pr => ({ x: pr.x, y: pr.y, radius: pr.radius, color: pr.color })),
      spatialRifts: this.spatialRifts.map(sr => ({ x: sr.x, y: sr.y, radius: sr.radius, life: sr.life, maxLife: sr.maxLife })),
      particles: this.particles.map(pt => ({ x: pt.x, y: pt.y, color: pt.color, size: pt.size, life: pt.life, maxLife: pt.maxLife })),
      damageTexts: this.damageTexts.map(dt => ({ x: dt.x, y: dt.y, text: dt.text, color: dt.color, life: dt.life, maxLife: dt.maxLife, isWeakpoint: dt.isWeakpoint }))
    };
    this.replayFrames.push(snapshot);
  }

  checkTacticalStrikes() {
    this.evaluateHit(this.player, this.enemy);
    this.evaluateHit(this.enemy, this.player);

    for (let i = this.spatialRifts.length - 1; i >= 0; i--) {
      const rift = this.spatialRifts[i];
      rift.update();
      if (!rift.hasHit && rift.life <= 14) {
        const target = rift.isPlayer ? this.enemy : this.player;
        const d = Math.hypot(rift.x - target.x, rift.y - (target.y - 45));
        if (d <= rift.radius + 25) {
          rift.hasHit = true;
          const dmg = target.takeHit(rift.damage, rift.isPlayer ? this.player : this.enemy, true);
          this.spawnSparks(target.x, target.y - 45, '#00f0ff', 24);
          if (typeof PixelFX !== 'undefined') {
            PixelFX.spawnVoidRift(target.x, target.y - 45, 1, 68);
          }
          if (rift.stasisFreeze) {
            target.hitstunFrames = Math.max(target.hitstunFrames, rift.stasisFreeze);
            this.addDamageText(target.x, target.y - 70, `${dmg} STASIS FREEZE!`, '#00f0ff', true);
          } else {
            this.addDamageText(target.x, target.y - 70, `${dmg} SPATIAL!`, '#00f0ff', true);
          }
        }
      }
      if (rift.life <= 0) this.spatialRifts.splice(i, 1);
    }
  }

  checkWeakpointHit(attacker, defender, move) {
    // 1. Whiff Punish: defender is actively in an attack animation
    if (defender.moveKey && defender.moveFrame > 0 && !defender.hasHit) {
      return { isWeakpoint: true, reason: 'WHIFF PUNISH' };
    }
    // 2. Anti-Air: defender is airborne and attacker aims high
    if (defender.isAirborne && attacker.aimAngle >= 25) {
      return { isWeakpoint: true, reason: 'ANTI-AIR WEAKPOINT' };
    }
    // 3. Low Sweep: defender is standing and attacker sweeps low
    if (!defender.isAirborne && !defender.isBlocking && (attacker.aimAngle <= -25 || (move.name && move.name.includes('Sweep')) || (move.name && move.name.includes('Slide')))) {
      return { isWeakpoint: true, reason: 'LOW SWEEP WEAKPOINT' };
    }
    // 4. Backstab / Blindside: Attacking from defender's back
    if ((defender.x - attacker.x) * defender.facing < 0) {
      return { isWeakpoint: true, reason: 'BACKSTAB WEAKPOINT' };
    }
    return { isWeakpoint: false };
  }

  evaluateHit(attacker, defender) {
    if (!attacker.currentMove || (attacker.currentMove.type !== 'ATTACK' && attacker.currentMove.type !== 'SPECIAL')) return;
    const move = attacker.currentMove;
    if (move.projectile || move.isSpatial) return;

    // Single-hit and multi-hit cap guard: prevent repeated damage on every active frame
    const maxHits = move.multiHitCount || 1;
    if (attacker.hasHit && (attacker.hitsDealt || 0) >= maxHits) return;

    const currentF = attacker.moveFrame;
    const startF = move.startup;
    const endF = startF + (move.activeFrames || 4);

    if (currentF >= startF && currentF <= endF) {
      // For multi-hit moves: enforce frame gap interval between hits
      if ((attacker.hitsDealt || 0) > 0) {
        const interval = move.hitInterval || 3;
        if (currentF - attacker.lastHitFrame < interval) return;
      }

      const dist = Math.abs(attacker.x - defender.x);
      const is360 = !!move.is360;
      const withinRange = is360 ? dist <= (move.range || 90) : dist <= (move.range || 75);

      if (withinRange) {
        attacker.hasHit = true;
        attacker.hitsDealt = (attacker.hitsDealt || 0) + 1;
        attacker.lastHitFrame = currentF;

        // Damage calculation (split base damage across hits for multi-hit moves)
        let baseDmg = move.damage;
        if (maxHits > 1) {
          baseDmg = Math.max(1, Math.round(baseDmg / maxHits));
        }
        let dmg = baseDmg + (attacker.hitsDealt === 1 ? attacker.atkBonus : 0);

        // WEAKPOINT HIT SYSTEM (Zero RNG, 100% Tactical & Deterministic)
        const wp = this.checkWeakpointHit(attacker, defender, move);
        const isWeakpoint = wp.isWeakpoint;

        if (isWeakpoint) {
          const wpBonus = (this.meta.upgrades.crit || 0) * 0.15;
          let wpMult = 1.65 + wpBonus;
          if (attacker.isPlayer && this.hasPerk('weakpoint_hunter')) wpMult += 0.35;
          if (attacker.isPlayer && this.hasPerk('weakpoint_prism')) wpMult += 0.50;

          dmg = Math.round(dmg * wpMult);
          defender.hitstunFrames += 4;
          SFX.playWeakpoint();
          if (typeof PixelFX !== 'undefined') {
            PixelFX.spawnCrit(defender.x, defender.y - 45, '#ffd166');
          }
          this.spawnSparks(defender.x, defender.y - 45, '#ffd166', 22);

          if (attacker.isPlayer && attacker.hitsDealt === 1) {
            this.gold += 8;
            if (this.hasPerk('weakpoint_prism')) attacker.superMeter = Math.min(attacker.maxSuper, attacker.superMeter + 15);
            this.updateHUD();
          }
        }

        if (attacker.isPlayer && this.hasPerk('berserk_core') && attacker.hp < attacker.maxHp * 0.5) {
          dmg *= 1.55;
        }

        // Momentum Engine Perk
        if (attacker.isPlayer && attacker.hasMomentumBoost) {
          dmg = Math.round(dmg * 1.25);
          attacker.hasMomentumBoost = false;
          this.addDamageText(attacker.x, attacker.y - 85, '+25% MOMENTUM!', '#00f0ff', true);
          this.spawnSparks(attacker.x, attacker.y - 45, '#00f0ff', 12);
        }

        // Consecutive Mobility Attack Spam Damage Decay
        if (attacker.hasSpamPenalty && (attacker.consecutiveMobilityCount || 0) > 1) {
          const decayMult = Math.max(0.4, 1.0 - 0.35 * Math.min(2, attacker.consecutiveMobilityCount - 1));
          dmg = Math.round(dmg * decayMult);
        }

        const isSpike = !!move.spikesDown;
        const isHeavy = !!move.launchesAir || (move.damage >= 24 && attacker.hitsDealt === maxHits);
        const realDmg = defender.takeHit(dmg, attacker, isHeavy, isSpike);

        // ── MOVE HIT IMPACT PIXEL VFX (FROM PATCH-GG/PIXELFX) ──
        if (typeof PixelFX !== 'undefined') {
          const mKey = (attacker.moveKey || (attacker.currentMove ? attacker.currentMove.shortName || attacker.currentMove.name : '') || '').toUpperCase();
          const pColorRamp = attacker.isPlayer 
            ? ['#ffffff', '#00f0ff', '#0077b6', '#03045e'] 
            : ['#ffffff', '#ff3366', '#990f30', '#3b000f'];

          const isSlash = ['QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'PHANTOM_SLIDE', 'BLADE_COUNTER', 'WHIRLWIND', 'DIVE_KICK', 'SOUL_REAP', 'MIRAGE_RIPOSTE', 'BLOOD_RUSH', 'CARMINE_HARVEST', 'SONIC_PALM'].includes(mKey) ||
            mKey.includes('SLASH') || mKey.includes('JAB') || mKey.includes('SWEEP') || mKey.includes('SLIDE') || mKey.includes('WHIRLWIND') || mKey.includes('RIPOSTE') || mKey.includes('REAP') || mKey.includes('MIRAGE') || mKey.includes('BLOOD') || mKey.includes('HARVEST') || mKey.includes('SONIC');

          const isFlame = ['DRAGON_UPPER', 'LAUNCHER', 'FIRE_BURST', 'PHOENIX_KICK', 'SOLAR_SUPERNOVA', 'VALKYRIE_ASCENT', 'FROSTFIRE_BURST'].includes(mKey) ||
            mKey.includes('DRAGON') || mKey.includes('LAUNCHER') || mKey.includes('FIRE') || mKey.includes('BURST') || mKey.includes('UPPER') || mKey.includes('PHOENIX') || mKey.includes('SUPERNOVA') || mKey.includes('VALKYRIE') || mKey.includes('FROSTFIRE');

          const isLightning = ['THUNDER_GALE', 'LIGHTNING_PALM', 'RAIKIRI_WARP', 'THUNDER_METEOR'].includes(mKey) ||
            mKey.includes('THUNDER') || mKey.includes('LIGHTNING') || mKey.includes('GALE') || mKey.includes('PALM') || mKey.includes('RAIKIRI') || mKey.includes('WARP');

          const isVoid = ['VOID_CLEAVE', 'JUDGMENT_CUT', 'CHRONO_STASIS', 'SHADOW_PULL', 'EVENT_HORIZON_SLASH', 'CHRONO_JUDGMENT'].includes(mKey) ||
            mKey.includes('VOID') || mKey.includes('JUDGMENT') || mKey.includes('CLEAVE') || mKey.includes('DIMENSIONAL') || mKey.includes('STASIS') || mKey.includes('PULL') || mKey.includes('HORIZON') || mKey.includes('CHRONO');

          const isSlam = ['COMET_CRASH', 'GROUND_POUND', 'METEOR_STRIKE', 'TEMPEST_QUAKE', 'GRAVITY_CRUSH'].includes(mKey) ||
            mKey.includes('COMET') || mKey.includes('GROUND') || mKey.includes('METEOR') || mKey.includes('POUND') || mKey.includes('STOMP') || mKey.includes('QUAKE') || mKey.includes('TEMPEST') || mKey.includes('GRAVITY') || mKey.includes('CRUSH');

          if (isSlash) {
            PixelFX.spawnSlash(defender.x, defender.y - 45, attacker.facing, attacker.aimAngle || 0, pColorRamp, (mKey === 'HEAVY_SLASH' || mKey.includes('SLASH')) ? 68 : 52);
          } else if (isFlame) {
            PixelFX.spawnFlamePillar(defender.x, defender.y, attacker.facing);
          } else if (isLightning) {
            PixelFX.spawnLightning(attacker.x, attacker.y - 45, defender.x, defender.y - 45);
          } else if (isVoid) {
            PixelFX.spawnVoidRift(defender.x, defender.y - 45, attacker.facing, 68);
          } else if (isSlam) {
            PixelFX.spawnGroundSlam(defender.x, defender.floorY, '#ffd166');
          } else {
            PixelFX.spawnHitSpark(defender.x, defender.y - 45, attacker.isPlayer ? '#00f0ff' : '#ff3366', isHeavy ? 24 : 16);
          }
        }

        const isAttackerMobility = ['DIVE_KICK', 'COMET_CRASH', 'PHANTOM_SLIDE', 'SWEEP', 'THUNDER_GALE'].includes(attacker.moveKey) ||
          (move.moveDist > 0 || move.spikesDown);

        // Guard Punish: If defender blocked or parried a mobility attack, attacker enters Vulnerable Punish state
        if (isAttackerMobility && (defender.isBlocking || defender.isParrying)) {
          attacker.isVulnerable = true;
          attacker.vulnerableTurns = 0;
          this.addDamageText(attacker.x, attacker.y - 80, 'GUARD PUNISHED!', '#ff4444', true);
          this.spawnSparks(attacker.x, attacker.y - 45, '#ff4444', 14);
        }

        if (realDmg > 0) {
          const meterGain = Math.round(16 / maxHits);
          attacker.superMeter = Math.min(attacker.maxSuper, attacker.superMeter + meterGain);

          if (attacker.isPlayer && (this.hasPerk('vampiric_edge') || move.siphonRatio)) {
            const ratio = (move.siphonRatio || 0) + (this.hasPerk('vampiric_edge') && isWeakpoint ? 0.1 : 0);
            if (ratio > 0) {
              const heal = Math.max(1, Math.round(realDmg * ratio));
              attacker.hp = Math.min(attacker.maxHp, attacker.hp + heal);
              this.addDamageText(attacker.x, attacker.y - 80, `+${heal} HP`, '#06d6a0');
            }
          }

          if (attacker.isPlayer && this.hasPerk('lightning_strike') && attacker.hitsDealt === 1) {
            this.spawnSparks(defender.x, defender.y - 45, '#ffd166', 15);
            defender.hp = Math.max(0, defender.hp - 16);
            this.addDamageText(defender.x + 20, defender.y - 50, '16 KINETIC', '#ffd166');
          }

          const txt = Math.round(realDmg).toString();
          this.addDamageText(defender.x, defender.y - 70, isWeakpoint ? `${txt} WEAKPOINT!` : txt, isWeakpoint ? '#ffd166' : '#fff', isWeakpoint);

          if (attacker.isPlayer) {
            this.comboCount++;
            this.showCombo(this.comboCount);
          }

          this.hitStop = isHeavy ? 4 : 2;
        }
      }
    }
  }

  showCombo(count) {
    const el = document.getElementById('combo-display');
    if (!el) return;
    el.innerText = `${count} HITS!`;
    el.classList.add('visible');
    clearTimeout(this.comboTimeout);
    this.comboTimeout = setTimeout(() => {
      el.classList.remove('visible');
      this.comboCount = 0;
    }, 1800);
  }

  addDamageText(x, y, text, color = '#fff', isWeakpoint = false) {
    this.damageTexts.push(new DamageText(x, y, text, color, isWeakpoint));
  }

  spawnSparks(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push(new Particle(
        x, y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        color,
        Math.random() * 3 + 1.5,
        Math.floor(Math.random() * 18 + 10)
      ));
    }
  }

  addScreenShake(intensity, duration) {
    this.screenShake.intensity = intensity;
    this.screenShake.duration = duration;
  }

  updateHUD() {
    if (!this.player || !this.enemy) return;

    // Player Bars
    const p1Hp = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    const p1Sp = Math.max(0, (this.player.superMeter / this.player.maxSuper) * 100);
    const p1HpBar = document.getElementById('p1-hp-bar');
    const p1HpTxt = document.getElementById('p1-hp-text');
    const p1SpBar = document.getElementById('p1-super-bar');
    const goldDisplay = document.getElementById('gold-display');

    if (p1HpBar) p1HpBar.style.width = `${p1Hp}%`;
    if (p1HpTxt) p1HpTxt.innerText = `${Math.ceil(this.player.hp)} / ${this.player.maxHp}`;
    if (p1SpBar) p1SpBar.style.width = `${p1Sp}%`;
    if (goldDisplay) goldDisplay.innerText = `${this.gold} Gold`;

    const hudDeckCount = document.getElementById('hud-deck-count');
    if (hudDeckCount) hudDeckCount.innerText = `${this.equippedMoves.size}/14`;

    // Enemy Bars
    const p2Hp = Math.max(0, (this.enemy.hp / this.enemy.maxHp) * 100);
    const p2Sp = Math.max(0, (this.enemy.superMeter / this.enemy.maxSuper) * 100);
    const p2HpBar = document.getElementById('p2-hp-bar');
    const p2HpTxt = document.getElementById('p2-hp-text');
    const p2SpBar = document.getElementById('p2-super-bar');

    if (p2HpBar) p2HpBar.style.width = `${p2Hp}%`;
    if (p2HpTxt) p2HpTxt.innerText = `${Math.ceil(this.enemy.hp)} / ${this.enemy.maxHp}`;
    if (p2SpBar) p2SpBar.style.width = `${p2Sp}%`;
  }

  update() {
    if (!this.player || !this.enemy) return;

    if (this.hitStop > 0) {
      this.hitStop--;
      return;
    }

    // Unconditional FX update so effects, particles, and damage numbers fade out cleanly rather than freezing
    if (window.PixelFX) {
      window.PixelFX.update(1 / 60);
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }
    for (let i = this.damageTexts.length - 1; i >= 0; i--) {
      this.damageTexts[i].update();
      if (this.damageTexts[i].life <= 0) this.damageTexts.splice(i, 1);
    }

    if (this.turnState === 'SIMULATING') {
      this.player.updateFramePhysics();
      this.enemy.updateFramePhysics();
      this.checkTacticalStrikes();

      // Projectiles update
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.update();
        const target = p.isPlayer ? this.enemy : this.player;
        const d = Math.hypot(p.x - target.x, p.y - (target.y - 45));
        if (d < p.radius + 30) {
          target.takeHit(p.damage, p.isPlayer ? this.player : this.enemy, false);
          this.spawnSparks(p.x, p.y, p.color, 14);
          if (p.pullsFoe) {
            const attacker = p.isPlayer ? this.player : this.enemy;
            target.x = attacker.x + attacker.facing * 85;
            target.vx = 0;
            this.addDamageText(target.x, target.y - 75, 'GRAVITY PULL!', '#9d4edd', true);
          }
          if (typeof PixelFX !== 'undefined') {
            PixelFX.spawnHitSpark(p.x, p.y, p.color, 24);
          }
          p.active = false;
        }
        if (!p.active) this.projectiles.splice(i, 1);
      }

      this.recordFrame();
      this.updateHUD();

      // Check Victory or Defeat
      if (this.player.hp <= 0 || this.enemy.hp <= 0) {
        this.turnState = 'ROUND_OVER';
        if (this.enemy.hp <= 0) {
          this.handleVictory();
        } else {
          this.handleDefeat();
        }
        return;
      }

      this.simFramesLeft--;
      if (this.simFramesLeft <= 0) {
        this.openDecisionTurn();
      }
    } else if (this.turnState === 'REPLAY') {
      this.updateReplay();
    }
  }

  handleVictory() {
    SFX.playFanfare();
    const shardsEarned = (this.currentFloor * 12) + (this.floorStage * 6);
    this.meta.shards += shardsEarned;
    this.saveMeta();

    const opp = this.currentOpponentData || {};
    const earnedGold = opp.goldReward || 30;
    this.gold += earnedGold;
    this.updateHUD();

    // Check if Stage 10 Boss was defeated
    if (this.floorStage >= 10) {
      if (this.currentFloor >= 3) {
        // Run Complete: Defeated Final Boss!
        this.showFinalVictory();
      } else {
        // Floor Clear: Open Floor Victory screen
        const vicSub = document.getElementById('victory-sub');
        if (vicSub) {
          vicSub.innerText = `Floor ${this.currentFloor} Cleared! ${opp.name} Defeated! +${earnedGold} Gold & +${shardsEarned} Ki Shards Earned!`;
        }
        const vicShards = document.getElementById('victory-shards');
        if (vicShards) {
          vicShards.innerText = `+${shardsEarned} Hustle Shards Acquired!`;
        }
        document.getElementById('screen-victory').classList.add('active');
      }
    } else {
      // Regular Stage Clear: Offer 3 Draft Rewards
      this.showDraftOverlay();
    }
  }

  showFinalVictory() {
    const vicEl = document.getElementById('screen-victory');
    if (vicEl) {
      document.getElementById('victory-headline').innerText = 'EXPEDITION COMPLETE!';
      document.getElementById('victory-sub').innerText = `You have defeated Emperor Zenith and become the Supreme God of Hustle!`;
      const btnNext = document.getElementById('btn-next-floor');
      if (btnNext) {
        btnNext.innerText = 'RESTART EXPEDITION';
        btnNext.onclick = () => {
          vicEl.classList.remove('active');
          this.startExpedition();
        };
      }
      vicEl.classList.add('active');
    }
  }

  handleDefeat() {
    SFX.playPunch(60);
    const shardsEarned = (this.currentFloor * 5) + (this.floorStage * 3);
    this.meta.shards += shardsEarned;
    this.saveMeta();

    const opp = this.currentOpponentData || {};
    const goSub = document.getElementById('gameover-sub');
    if (goSub) {
      goSub.innerText = `Fell in Floor ${this.currentFloor} (Stage ${this.floorStage}) to ${opp.name}`;
    }
    const goShards = document.getElementById('gameover-shards');
    if (goShards) {
      goShards.innerText = `+${shardsEarned} Hustle Shards Acquired!`;
    }
    document.getElementById('screen-gameover').classList.add('active');
  }

  // ── SANCTUARY SHOP & SKILL CUSTOMIZER ──────────────────────────────────────
  openShop() {
    this.hideAllOverlays();
    const goldTxt = document.getElementById('shop-gold-display');
    if (goldTxt) goldTxt.innerText = `${this.gold} Gold Available`;
    this.activeShopTab = 'armory';
    this.renderShopTab();
    document.getElementById('screen-shop').classList.add('active');
  }

  generateShopWares() {
    const wares = [];

    // Upgrades & Breakthroughs for owned moves
    this.ownedMoves.forEach(mKey => {
      if (!this.apexMoves.has(mKey)) {
        if (this.moveUpgrades.has(mKey)) {
          const moveData = this.getMoveData(mKey, true);
          wares.push({
            type: 'UPGRADE',
            moveKey: mKey,
            name: `${moveData ? moveData.name : mKey} Breakthrough [UPGRADE]`,
            badge: 'BREAKTHROUGH',
            badgeClass: 'tier-fusion',
            cost: 85,
            desc: 'Evolve this upgraded technique into a Hybrid Fusion or Apex Form!'
          });
        } else if (MOVE_UPGRADES_CATALOG[mKey]) {
          const upg = MOVE_UPGRADES_CATALOG[mKey];
          wares.push({
            type: 'UPGRADE',
            moveKey: mKey,
            name: upg.name,
            badge: 'UPGRADE',
            badgeClass: 'tier-upgrade',
            cost: 60,
            desc: upg.desc
          });
        }
      }
    });

    // Ready Fusion Breakthrough wares: If player holds both ingredient skills, offer Fusion in Shop!
    for (const [keyPair, recipe] of Object.entries(FUSION_RECIPES)) {
      const [m1, m2] = keyPair.split('+');
      if (this.ownedMoves.has(m1) && this.ownedMoves.has(m2) && !this.ownedMoves.has(recipe.targetKey)) {
        const targetMove = MOVES[recipe.targetKey];
        wares.push({
          type: 'UPGRADE',
          moveKey: m1,
          name: `${recipe.name}`,
          badge: 'FUSION BREAKTHROUGH',
          badgeClass: 'tier-fusion',
          cost: 95,
          desc: `Combine ingredients [${MOVES[m1]?.name || m1}] + [${MOVES[m2]?.name || m2}] into Tier 3 ${targetMove?.name || recipe.targetKey}!`
        });
      }
    }

    // Unowned moves from MOVES catalog (Fusion moves must be forged via Breakthrough!)
    Object.keys(MOVES).forEach(mKey => {
      if (!this.ownedMoves.has(mKey) && !mKey.includes('_UPG') && !MOVES[mKey].isFusion) {
        const mData = MOVES[mKey];
        wares.push({
          type: 'SKILL',
          moveKey: mKey,
          name: mData.name,
          badge: mData.category === 'movement' ? 'NEW MOBILITY' : 'NEW SKILL',
          badgeClass: 'tier-rare',
          cost: 70,
          desc: mData.desc
        });
      }
    });

    wares.sort(() => 0.5 - Math.random());
    return wares.slice(0, 4);
  }

  renderShopTab() {
    document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
    const armoryTab = document.getElementById('tab-shop-armory');
    const suppliesTab = document.getElementById('tab-shop-supplies');
    const deckTab = document.getElementById('tab-shop-deck');
    const waresView = document.getElementById('shop-wares-view');
    const deckView = document.getElementById('shop-deck-view');

    waresView.innerHTML = '';
    waresView.style.display = 'grid';
    deckView.style.display = 'none';

    if (this.activeShopTab === 'armory') {
      if (armoryTab) armoryTab.classList.add('active');
      const wares = this.generateShopWares();

      if (wares.length === 0) {
        waresView.innerHTML = `<div style="grid-column: 1 / -1; color: var(--accent-cyan); font-size: 14px; text-align: center; padding: 20px;">All available techniques in this tier are fully mastered!</div>`;
        return;
      }

      wares.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-header">
              <span class="perk-badge ${item.badgeClass}">${item.badge}</span>
              <span class="shop-price">${item.cost} G</span>
            </div>
            <div class="perk-name">${item.name}</div>
            <div class="perk-desc">${item.desc}</div>
          </div>
          <button class="btn-primary" style="margin-top: 12px; padding: 7px 16px; font-size: 12px;" ${this.gold < item.cost ? 'disabled' : ''}>
            PURCHASE
          </button>
        `;
        const btn = card.querySelector('button');
        if (this.gold >= item.cost) {
          btn.addEventListener('click', () => {
            this.gold -= item.cost;
            SFX.playCoin();
            document.getElementById('shop-gold-display').innerText = `${this.gold} Gold Available`;
            this.updateHUD();

            if (item.type === 'UPGRADE') {
              if (this.moveUpgrades.has(item.moveKey) || item.badge === 'FUSION BREAKTHROUGH') {
                this.openBreakthrough(item.moveKey);
              } else {
                this.upgradeMove(item.moveKey);
              }
            } else if (item.type === 'SKILL') {
              this.unlockMove(item.moveKey);
            }
            this.renderShopTab();
          });
        }
        waresView.appendChild(card);
      });

    } else if (this.activeShopTab === 'supplies') {
      if (suppliesTab) suppliesTab.classList.add('active');

      // PERMANENT RELICS (NO REDUNDANT 50% HP POTION!)
      SHOP_RELICS.forEach(relic => {
        const isBought = this.relics.has(relic.id);
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <div>
            <div class="shop-card-header">
              <span class="perk-badge tier-rare">RELIC</span>
              <span class="shop-price">${isBought ? 'OWNED' : `${relic.cost} G`}</span>
            </div>
            <div class="perk-name">${relic.name}</div>
            <div class="perk-desc">${relic.desc}</div>
          </div>
          <button class="btn-primary" style="margin-top: 12px; padding: 7px 16px; font-size: 12px;" ${isBought || this.gold < relic.cost ? 'disabled' : ''}>
            ${isBought ? 'ACQUIRED' : 'PURCHASE'}
          </button>
        `;
        const btn = card.querySelector('button');
        if (!isBought && this.gold >= relic.cost) {
          btn.addEventListener('click', () => {
            this.gold -= relic.cost;
            this.relics.add(relic.id);
            SFX.playCoin();

            // Instant relic effects
            if (relic.id === 'dragon_bone_charm' && this.player) {
              this.player.maxHp += 45;
              this.player.hp = this.player.maxHp;
            } else if (relic.id === 'ki_reactor_core' && this.player) {
              this.player.superMeter = Math.min(this.player.maxSuper, this.player.superMeter + 40);
            } else if (relic.id === 'apex_catalyst_stone') {
              const eligible = Array.from(this.ownedMoves).filter(k => !this.apexMoves.has(k));
              if (eligible.length > 0) {
                const upgraded = eligible.filter(k => this.moveUpgrades.has(k));
                const targetKey = upgraded.length > 0 ? upgraded[0] : eligible[0];
                this.openBreakthrough(targetKey);
              }
            }

            document.getElementById('shop-gold-display').innerText = `${this.gold} Gold Available`;
            this.updateHUD();
            this.renderShopTab();
          });
        }
        waresView.appendChild(card);
      });

    } else if (this.activeShopTab === 'deck') {
      if (deckTab) deckTab.classList.add('active');
      waresView.style.display = 'none';
      deckView.style.display = 'block';
      this.renderDeckCustomizer();
    }
  }

  renderDeckCustomizer() {
    const container = document.getElementById('deck-grid-container');
    if (!container) return;
    container.innerHTML = '';
    const deckCountEl = document.getElementById('deck-count-text');
    if (deckCountEl) {
      deckCountEl.innerText = `${this.equippedMoves.size} / 14 Active Moves (Owned: ${this.ownedMoves.size})`;
    }

    Array.from(this.ownedMoves).forEach(moveKey => {
      const moveData = this.getMoveData(moveKey, true);
      if (!moveData) return;

      const isEquipped = this.equippedMoves.has(moveKey);
      const card = document.createElement('div');
      card.className = `deck-item ${isEquipped ? 'equipped' : 'stashed'}`;

      const tagClass = isEquipped ? 'tag-equipped' : 'tag-stashed';
      const tagText = isEquipped ? 'EQUIPPED' : 'STASHED';

      card.innerHTML = `
        <span class="deck-tag ${tagClass}">${tagText}</span>
        <div style="font-size: 13px; font-weight: 700; color: #fff;">${moveData.name}</div>
        <div style="font-size: 11px; color: var(--accent-cyan); font-family: 'JetBrains Mono', monospace;">
          ${moveData.damage > 0 ? `${(moveData.startup !== undefined && moveData.startup !== null) ? moveData.startup : 0}f • ${moveData.damage} Dmg` : 'Mobility / Guard'}
        </div>
        <div style="font-size: 10px; color: #94a3b8; line-height: 1.3;">${moveData.desc}</div>
      `;

      card.addEventListener('click', () => {
        if (isEquipped) {
          if (this.equippedMoves.size <= 4) {
            if (deckCountEl) {
              deckCountEl.innerHTML = `<span style="color: #ff3366;">Minimum 4 combat moves required!</span>`;
              setTimeout(() => {
                if (deckCountEl) deckCountEl.innerText = `${this.equippedMoves.size} / 14 Active Moves (Owned: ${this.ownedMoves.size})`;
              }, 1800);
            }
            return;
          }
          this.equippedMoves.delete(moveKey);
        } else {
          if (this.equippedMoves.size >= 14) {
            if (deckCountEl) {
              deckCountEl.innerHTML = `<span style="color: #ff3366;">Deck Full (14/14)! Unequip a move first.</span>`;
              setTimeout(() => {
                if (deckCountEl) deckCountEl.innerText = `${this.equippedMoves.size} / 14 Active Moves (Owned: ${this.ownedMoves.size})`;
              }, 1800);
            }
            return;
          }
          this.equippedMoves.add(moveKey);
        }
        this.rebuildMoveButtons();
        this.updateHUD();
        this.renderDeckCustomizer();
      });

      container.appendChild(card);
    });
  }

  // ── SKILL BREAKTHROUGH: FUSION OR APEX ──────────────────────────────────────
  openBreakthrough(moveKey) {
    const moveData = this.getMoveData(moveKey, true);
    if (!moveData) return;

    document.getElementById('breakthrough-sub').innerText = `Choose the evolutionary path for ${moveData.name}:`;

    let matchedFusion = null;
    let partnerMoveKey = null;

    // Check FUSION_RECIPES
    for (const [keyPair, recipe] of Object.entries(FUSION_RECIPES)) {
      const [m1, m2] = keyPair.split('+');
      if (m1 === moveKey && this.ownedMoves.has(m2)) {
        matchedFusion = recipe;
        partnerMoveKey = m2;
        break;
      } else if (m2 === moveKey && this.ownedMoves.has(m1)) {
        matchedFusion = recipe;
        partnerMoveKey = m1;
        break;
      }
    }

    const fusionTitle = document.getElementById('fusion-title');
    const fusionDesc = document.getElementById('fusion-desc');
    const apexTitle = document.getElementById('apex-title');
    const apexDesc = document.getElementById('apex-desc');
    const btnFusion = document.getElementById('btn-opt-fusion');
    const btnApex = document.getElementById('btn-opt-apex');

    const apexUpg = APEX_UPGRADES_CATALOG[moveKey] || {
      name: `${moveData.name} [APEX]`,
      desc: '1f startup, doubled damage, super armor, +15f frame advantage.'
    };

    apexTitle.innerText = apexUpg.name;
    apexDesc.innerText = apexUpg.desc;

    // Condition Check: Does player own partner skill?
    if (matchedFusion && partnerMoveKey) {
      const partnerData = this.getMoveData(partnerMoveKey, true);
      const partnerName = partnerData ? partnerData.name : partnerMoveKey;
      fusionTitle.innerText = matchedFusion.name;
      fusionDesc.innerText = `${matchedFusion.desc} (Consumes: ${moveData.name} + ${partnerName})`;
      btnFusion.disabled = false;
      btnFusion.style.opacity = '1';
      btnFusion.style.cursor = 'pointer';
    } else {
      // Find required partner skill name if recipe exists
      let neededPartner = null;
      let potentialRecipe = null;
      for (const [keyPair, recipe] of Object.entries(FUSION_RECIPES)) {
        const [m1, m2] = keyPair.split('+');
        if (m1 === moveKey) { neededPartner = m2; potentialRecipe = recipe; break; }
        if (m2 === moveKey) { neededPartner = m1; potentialRecipe = recipe; break; }
      }

      if (potentialRecipe && neededPartner) {
        const neededData = MOVES[neededPartner] || { name: neededPartner };
        fusionTitle.innerText = `${potentialRecipe.name} (LOCKED)`;
        fusionDesc.innerText = `Requires partner technique: [${neededData.name}]. Acquire ${neededData.name} to fuse!`;
      } else {
        fusionTitle.innerText = `Elemental Resonance (No Recipe)`;
        fusionDesc.innerText = `No known hybrid fusion formula for ${moveData.name}. Choose Apex Breakthrough!`;
      }
      btnFusion.disabled = true;
      btnFusion.style.opacity = '0.4';
      btnFusion.style.cursor = 'not-allowed';
    }

    const newBtnFusion = btnFusion.cloneNode(true);
    const newBtnApex = btnApex.cloneNode(true);
    btnFusion.parentNode.replaceChild(newBtnFusion, btnFusion);
    btnApex.parentNode.replaceChild(newBtnApex, btnApex);

    if (matchedFusion && partnerMoveKey) {
      newBtnFusion.addEventListener('click', () => {
        SFX.playUpgradeFanfare();
        // CONSUME BOTH INGREDIENT SKILLS
        this.ownedMoves.delete(moveKey);
        this.ownedMoves.delete(partnerMoveKey);
        this.equippedMoves.delete(moveKey);
        this.equippedMoves.delete(partnerMoveKey);
        this.moveUpgrades.delete(moveKey);
        this.moveUpgrades.delete(partnerMoveKey);

        // ADD FUSED MOVE
        this.ownedMoves.add(matchedFusion.targetKey);
        this.equippedMoves.add(matchedFusion.targetKey);

        this.rebuildMoveButtons();
        document.getElementById('screen-breakthrough').classList.remove('active');
        if (this.turnState === 'ROUND_OVER' && document.getElementById('screen-shop').classList.contains('active')) {
          this.renderShopTab();
        }
      });
    }

    newBtnApex.addEventListener('click', () => {
      SFX.playUpgradeFanfare();
      this.apexMoves.add(moveKey);
      this.rebuildMoveButtons();
      document.getElementById('screen-breakthrough').classList.remove('active');
      if (this.turnState === 'ROUND_OVER' && document.getElementById('screen-shop').classList.contains('active')) {
        this.renderShopTab();
      }
    });

    document.getElementById('screen-breakthrough').classList.add('active');
  }

  // ── DRAFTING SCREEN: REWARDS WITH MOVE UPGRADES, SKILLS & BLESSINGS ────────
  showDraftOverlay() {
    const container = document.getElementById('buff-cards-container');
    container.innerHTML = '';

    const upgradeCandidates = [];
    const newMoveCandidates = [];
    const perkCandidates = [];

    // 1. Upgrades for owned moves
    this.ownedMoves.forEach(moveKey => {
      if (!this.apexMoves.has(moveKey)) {
        const moveData = this.getMoveData(moveKey, true);
        if (this.moveUpgrades.has(moveKey)) {
          upgradeCandidates.push({
            kind: 'UPGRADE',
            moveKey: moveKey,
            name: `${moveData ? moveData.name : moveKey} Breakthrough [UPGRADE]`,
            rarity: 'legendary',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
            badge: 'BREAKTHROUGH',
            desc: 'Ascend this upgraded technique into a Hybrid Fusion or Apex Mastery!'
          });
        } else if (MOVE_UPGRADES_CATALOG[moveKey]) {
          const upg = MOVE_UPGRADES_CATALOG[moveKey];
          upgradeCandidates.push({
            kind: 'UPGRADE',
            moveKey: moveKey,
            name: upg.name,
            rarity: 'rare',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
            badge: 'MOVE UPGRADE',
            desc: upg.desc
          });
        }
      }
    });

    // Ready Fusion Breakthrough candidates: If player holds both ingredient skills, offer Fusion Breakthrough directly!
    for (const [keyPair, recipe] of Object.entries(FUSION_RECIPES)) {
      const [m1, m2] = keyPair.split('+');
      if (this.ownedMoves.has(m1) && this.ownedMoves.has(m2) && !this.ownedMoves.has(recipe.targetKey)) {
        const targetMove = MOVES[recipe.targetKey];
        upgradeCandidates.push({
          kind: 'UPGRADE',
          moveKey: m1,
          name: `${recipe.name}`,
          rarity: 'legendary',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
          badge: 'FUSION BREAKTHROUGH',
          desc: `Combine ingredients [${MOVES[m1]?.name || m1}] + [${MOVES[m2]?.name || m2}] into Tier 3 ${targetMove?.name || recipe.targetKey}!`
        });
      }
    }

    // 2. Unowned skills from MOVES catalog (Excluding Fusion moves - Fusions must be forged via Breakthrough!)
    Object.keys(MOVES).forEach(mKey => {
      if (!this.ownedMoves.has(mKey) && !MOVES[mKey].isFusion) {
        const mData = MOVES[mKey];
        newMoveCandidates.push({
          kind: 'SKILL',
          moveKey: mKey,
          name: mData.name,
          rarity: 'rare',
          icon: this.getMoveIconSVG(mKey),
          badge: mData.category === 'movement' ? 'NEW MOBILITY' : 'NEW SKILL',
          desc: mData.desc
        });
      }
    });

    // 3. Passive Blessings
    ROGUELITE_PERKS.filter(p => !this.activePerks.has(p.id)).forEach(pk => {
      perkCandidates.push({
        kind: 'PERK',
        id: pk.id,
        name: pk.name,
        rarity: pk.tier,
        icon: pk.icon,
        badge: 'PASSIVE BLESSING',
        desc: pk.desc
      });
    });

    const randomThree = [];
    const popRandom = (arr) => {
      if (!arr || arr.length === 0) return null;
      const idx = Math.floor(Math.random() * arr.length);
      return arr.splice(idx, 1)[0];
    };

    const cardUpgrade = popRandom(upgradeCandidates);
    if (cardUpgrade) randomThree.push(cardUpgrade);

    const cardNewMove = popRandom(newMoveCandidates);
    if (cardNewMove) randomThree.push(cardNewMove);

    const remainingPool = [...upgradeCandidates, ...newMoveCandidates, ...perkCandidates];
    remainingPool.sort(() => 0.5 - Math.random());

    while (randomThree.length < 3 && remainingPool.length > 0) {
      randomThree.push(remainingPool.pop());
    }

    randomThree.sort(() => 0.5 - Math.random());

    randomThree.forEach(reward => {
      const card = document.createElement('div');
      card.className = 'perk-card';

      let tierClass = `tier-${reward.rarity}`;
      if (reward.kind === 'UPGRADE') {
        tierClass = (reward.badge === 'BREAKTHROUGH' || reward.badge === 'FUSION BREAKTHROUGH') ? 'tier-fusion' : 'tier-upgrade';
      }

      card.innerHTML = `
        <span class="perk-badge ${tierClass}">${reward.badge}</span>
        <div class="perk-icon">${reward.icon}</div>
        <div class="perk-name">${reward.name}</div>
        <div class="perk-desc">${reward.desc}</div>
      `;

      card.addEventListener('click', () => {
        if (reward.kind === 'UPGRADE') {
          if (this.moveUpgrades.has(reward.moveKey) || reward.badge === 'FUSION BREAKTHROUGH') {
            this.openBreakthrough(reward.moveKey);
          } else {
            this.upgradeMove(reward.moveKey);
          }
        } else if (reward.kind === 'SKILL') {
          this.unlockMove(reward.moveKey);
        } else {
          this.activePerks.add(reward.id);
        }
        document.getElementById('screen-draft').classList.remove('active');
        this.initStage(this.currentFloor, this.floorStage + 1);
      });

      container.appendChild(card);
    });

    document.getElementById('screen-draft').classList.add('active');
  }

  openDojoScreen() {
    const shardsEl = document.getElementById('dojo-shards');
    if (shardsEl) shardsEl.innerText = `Hustle Shards: ${this.meta.shards}`;
    const titleShards = document.getElementById('title-shards');
    if (titleShards) titleShards.innerText = `Hustle Shards: ${this.meta.shards}`;

    const grid = document.getElementById('dojo-upgrades-grid');
    if (grid) {
      grid.innerHTML = '';
      const upgrades = [
        { id: 'hp', name: 'Iron Body Conditioning', desc: '+15 Max HP per rank', cost: 20 + this.meta.upgrades.hp * 15, rank: this.meta.upgrades.hp },
        { id: 'sp', name: 'Ki Flow Reservoir', desc: '+15 Max SP per rank', cost: 25 + this.meta.upgrades.sp * 20, rank: this.meta.upgrades.sp },
        { id: 'crit', name: 'Precision Striker', desc: '+15% Weakpoint Damage per rank', cost: 30 + this.meta.upgrades.crit * 25, rank: this.meta.upgrades.crit },
        { id: 'def', name: 'Defensive Posture', desc: '+5% Damage Reduction per rank', cost: 25 + this.meta.upgrades.def * 20, rank: this.meta.upgrades.def }
      ];

      upgrades.forEach(u => {
        const card = document.createElement('div');
        card.className = 'dojo-card';
        card.innerHTML = `
          <div class="dojo-meta">
            <div class="dojo-title">${u.name}</div>
            <div class="dojo-tier">Rank ${u.rank} • ${u.desc}</div>
          </div>
          <button class="btn-primary" style="padding: 6px 14px; font-size: 11px;" ${this.meta.shards < u.cost ? 'disabled' : ''}>
            ${u.cost} Shards
          </button>
        `;
        const btn = card.querySelector('button');
        if (this.meta.shards >= u.cost) {
          btn.addEventListener('click', () => {
            this.meta.shards -= u.cost;
            this.meta.upgrades[u.id]++;
            this.saveMeta();
            SFX.playCoin();
            this.openDojoScreen();
          });
        }
        grid.appendChild(card);
      });
    }

    document.getElementById('screen-dojo').classList.add('active');
  }

  hideAllOverlays() {
    document.querySelectorAll('.overlay-screen').forEach(el => el.classList.remove('active'));
  }

  // ── REPLAY SYSTEM ─────────────────────────────────────────────────────────
  setupReplayControls() {
    const playBtn = document.getElementById('btn-replay-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isReplayPlaying = !this.isReplayPlaying;
        const playIcon = document.getElementById('replay-play-icon');
        if (playIcon) playIcon.innerText = this.isReplayPlaying ? 'PAUSE' : 'PLAY';
      });
    }

    const restartBtn = document.getElementById('btn-replay-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.replayIndex = 0;
        this.isReplayPlaying = true;
        const playIcon = document.getElementById('replay-play-icon');
        if (playIcon) playIcon.innerText = 'PAUSE';
      });
    }

    const scrubber = document.getElementById('replay-scrubber');
    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.replayIndex = Math.floor((val / 100) * Math.max(1, this.replayFrames.length - 1));
      });
    }

    const speedBtn = document.getElementById('btn-replay-speed');
    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        if (this.replaySpeed === 1.0) this.replaySpeed = 0.5;
        else if (this.replaySpeed === 0.5) this.replaySpeed = 2.0;
        else this.replaySpeed = 1.0;
        const speedLabel = document.getElementById('replay-speed-label');
        if (speedLabel) speedLabel.innerText = `${this.replaySpeed}x`;
      });
    }

    const exitBtn = document.getElementById('btn-replay-exit');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.exitReplay();
      });
    }
  }

  startReplay() {
    if (this.replayFrames.length === 0) {
      if (this.player) {
        this.addDamageText(this.player.x, this.player.y - 65, 'NO REPLAY DATA YET!', '#ffd166', true);
      }
      return;
    }

    if (window.PixelFX) window.PixelFX.clear();

    // Save whichever overlay was open (screen-draft, screen-victory, screen-gameover)
    this.overlayBeforeReplay = document.querySelector('.overlay-screen.active');
    if (this.overlayBeforeReplay) {
      this.overlayBeforeReplay.classList.remove('active');
    }

    this.previousState = this.turnState;
    this.turnState = 'REPLAY';
    this.replayIndex = 0;
    this.isReplayPlaying = true;

    // Show Replay HUD Bar
    const replayHud = document.getElementById('replay-hud');
    if (replayHud) replayHud.classList.remove('hidden');

    const tacPanel = document.getElementById('tactical-panel');
    if (tacPanel) tacPanel.classList.add('hidden');

    const btnTopReplay = document.getElementById('btn-top-replay');
    if (btnTopReplay) btnTopReplay.classList.add('hidden');

    const playIcon = document.getElementById('replay-play-icon');
    if (playIcon) playIcon.innerText = 'PAUSE';
  }

  exitReplay() {
    this.isReplayPlaying = false;
    const replayHud = document.getElementById('replay-hud');
    if (replayHud) replayHud.classList.add('hidden');

    const btnTopReplay = document.getElementById('btn-top-replay');
    if (btnTopReplay) btnTopReplay.classList.remove('hidden');

    if (window.PixelFX) window.PixelFX.clear();

    // 1. If an overlay was active before replay, restore it
    if (this.overlayBeforeReplay) {
      this.overlayBeforeReplay.classList.add('active');
      this.overlayBeforeReplay = null;
      this.turnState = 'ROUND_OVER';
      this.updateHUD();
      return;
    }

    // 2. Otherwise determine destination based on match outcome
    if (this.enemy && this.enemy.hp <= 0) {
      this.turnState = 'ROUND_OVER';
      if (this.floorStage >= 10) {
        if (this.currentFloor >= 3) {
          this.showFinalVictory();
        } else {
          const vicEl = document.getElementById('screen-victory');
          if (vicEl) vicEl.classList.add('active');
        }
      } else {
        this.showDraftOverlay();
      }
    } else if (this.player && this.player.hp <= 0) {
      this.turnState = 'ROUND_OVER';
      const goEl = document.getElementById('screen-gameover');
      if (goEl) goEl.classList.add('active');
    } else {
      // Mid-match: resume decision turn cleanly
      this.turnState = 'DECISION';
      const tacPanel = document.getElementById('tactical-panel');
      if (tacPanel) tacPanel.classList.remove('hidden');
      this.openDecisionTurn();
    }

    this.updateHUD();
  }

  updateReplay() {
    if (this.isReplayPlaying) {
      this.replayIndex += this.replaySpeed;
      if (this.replayIndex >= this.replayFrames.length) {
        this.replayIndex = this.replayFrames.length - 1;
        this.isReplayPlaying = false;
        const playIcon = document.getElementById('replay-play-icon');
        if (playIcon) playIcon.innerText = 'PLAY';
      }
    }

    const idx = Math.min(this.replayFrames.length - 1, Math.max(0, Math.floor(this.replayIndex)));
    const frame = this.replayFrames[idx];

    // Dynamic HUD updates during replay
    if (frame) {
      const p1Hp = Math.max(0, (frame.p.hp / frame.p.maxHp) * 100);
      const p1Sp = Math.max(0, (frame.p.superMeter / frame.p.maxSuper) * 100);
      const p1HpBar = document.getElementById('p1-hp-bar');
      const p1HpTxt = document.getElementById('p1-hp-text');
      const p1SpBar = document.getElementById('p1-super-bar');
      if (p1HpBar) p1HpBar.style.width = `${p1Hp}%`;
      if (p1HpTxt) p1HpTxt.innerText = `${Math.ceil(frame.p.hp)} / ${frame.p.maxHp}`;
      if (p1SpBar) p1SpBar.style.width = `${p1Sp}%`;

      const p2Hp = Math.max(0, (frame.e.hp / frame.e.maxHp) * 100);
      const p2Sp = Math.max(0, (frame.e.superMeter / frame.e.maxSuper) * 100);
      const p2HpBar = document.getElementById('p2-hp-bar');
      const p2HpTxt = document.getElementById('p2-hp-text');
      const p2SpBar = document.getElementById('p2-super-bar');
      if (p2HpBar) p2HpBar.style.width = `${p2Hp}%`;
      if (p2HpTxt) p2HpTxt.innerText = `${Math.ceil(frame.e.hp)} / ${frame.e.maxHp}`;
      if (p2SpBar) p2SpBar.style.width = `${p2Sp}%`;
    }

    const progress = (idx / Math.max(1, this.replayFrames.length - 1)) * 100;
    const scrubber = document.getElementById('replay-scrubber');
    if (scrubber) scrubber.value = progress;

    const timeEl = document.getElementById('replay-time-display');
    if (timeEl) {
      const curSec = Math.floor(idx / 60);
      const curFrames = idx % 60;
      const totalSec = Math.floor(this.replayFrames.length / 60);
      const totalFrames = this.replayFrames.length % 60;
      timeEl.innerText = `${curSec.toString().padStart(2, '0')}:${curFrames.toString().padStart(2, '0')} / ${totalSec.toString().padStart(2, '0')}:${totalFrames.toString().padStart(2, '0')}`;
    }
  }

  drawArena() {
    const floorIdx = Math.max(0, Math.min(2, (this.currentFloor || 1) - 1));
    const floorDef = FLOOR_DEFINITIONS[floorIdx] || FLOOR_DEFINITIONS[0];

    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    if (floorDef.bgTheme === 'dojo') {
      skyGrad.addColorStop(0, '#0d1527');
      skyGrad.addColorStop(0.7, '#162238');
      skyGrad.addColorStop(1, '#080d18');
    } else if (floorDef.bgTheme === 'rift') {
      skyGrad.addColorStop(0, '#1a0b2e');
      skyGrad.addColorStop(0.7, '#2d124d');
      skyGrad.addColorStop(1, '#0e051c');
    } else {
      skyGrad.addColorStop(0, '#041c2c');
      skyGrad.addColorStop(0.7, '#08334c');
      skyGrad.addColorStop(1, '#020e17');
    }
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Floor
    const floorY = 470;
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, floorY);
    this.ctx.lineTo(this.width, floorY);
    this.ctx.stroke();

    this.ctx.fillStyle = '#0b0f17';
    this.ctx.fillRect(0, floorY, this.width, this.height - floorY);

    // Perspective floor lines
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    for (let x = 0; x <= this.width; x += 55) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, floorY);
      this.ctx.lineTo(x - 60, this.height);
      this.ctx.stroke();
    }
  }

  render() {
    this.ctx.save();

    if (this.screenShake.duration > 0) {
      this.screenShake.duration--;
      const sx = (Math.random() - 0.5) * this.screenShake.intensity;
      const sy = (Math.random() - 0.5) * this.screenShake.intensity;
      this.ctx.translate(sx, sy);
    }

    this.drawArena();

    if (this.turnState === 'REPLAY') {
      const idx = Math.min(this.replayFrames.length - 1, Math.max(0, Math.floor(this.replayIndex)));
      const frame = this.replayFrames[idx];
      if (frame) {
        renderFighterModel(this.ctx, frame.p, true);
        renderFighterModel(this.ctx, frame.e, false);

        if (frame.spatialRifts) {
          frame.spatialRifts.forEach(sr => {
            this.ctx.save();
            const progress = 1 - (sr.life / (sr.maxLife || 20));
            this.ctx.globalAlpha = Math.sin(progress * Math.PI);
            this.ctx.strokeStyle = '#00f0ff';
            this.ctx.shadowColor = '#00f0ff';
            this.ctx.shadowBlur = 14;
            this.ctx.lineWidth = 2.5;
            this.ctx.beginPath();
            this.ctx.arc(sr.x, sr.y, sr.radius * (0.8 + progress * 0.4), 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
          });
        }

        frame.projectiles.forEach(p => {
          this.ctx.save();
          this.ctx.fillStyle = p.color;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        });
        frame.particles.forEach(pt => {
          this.ctx.save();
          this.ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
          this.ctx.fillStyle = pt.color;
          this.ctx.beginPath();
          this.ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        });
        frame.damageTexts.forEach(dt => {
          this.ctx.save();
          this.ctx.globalAlpha = Math.max(0, dt.life / dt.maxLife);
          this.ctx.font = dt.isWeakpoint ? 'bold 22px "Chakra Petch", sans-serif' : 'bold 16px "Chakra Petch", sans-serif';
          this.ctx.fillStyle = dt.color;
          this.ctx.fillText(dt.text, dt.x, dt.y);
          this.ctx.restore();
        });
      }
    } else {
      // Ghost Prediction in Decision mode
      if (this.turnState === 'DECISION' && this.player) {
        this.player.drawGhostPreview(this.ctx, this.selectedPlayerMove, this.selectedAimAngle);
      }

      // Live Entities
      this.projectiles.forEach(p => p.draw(this.ctx));
      this.spatialRifts.forEach(r => r.draw(this.ctx));
      if (this.player) this.player.draw(this.ctx);
      if (this.enemy) this.enemy.draw(this.ctx);
      this.particles.forEach(pt => pt.draw(this.ctx));
      this.damageTexts.forEach(dt => dt.draw(this.ctx));

      // PixelFX Layer (from patch-gg/pixelfx)
      if (window.PixelFX) {
        window.PixelFX.render(this.ctx);
      }
    }

    if (this.turnState === 'REPLAY' && window.PixelFX) {
      window.PixelFX.render(this.ctx);
    }

    this.ctx.restore();
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }
}

// Global Engine Instance
window.engine = new YomiEngine();
window.engine.loop();

if (typeof module !== 'undefined') {
  module.exports = { YomiEngine };
}
