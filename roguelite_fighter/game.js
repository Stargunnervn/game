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

    // Move & Deck Management
    this.ownedMoves = new Set([
      'STEP_FWD', 'STEP_BACK', 'JUMP', 'DASH',
      'BLOCK', 'PARRY',
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'KI_BLAST', 'DRAGON_UPPER'
    ]);
    this.equippedMoves = new Set([
      'STEP_FWD', 'STEP_BACK', 'JUMP', 'DASH',
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
          if (playIcon) playIcon.innerText = this.isReplayPlaying ? '⏸ PAUSE' : '▶ PLAY';
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
          this.replayIndex = 0;
          this.isReplayPlaying = true;
          const playIcon = document.getElementById('replay-play-icon');
          if (playIcon) playIcon.innerText = '⏸ PAUSE';
        } else if (this.replayFrames.length > 0) {
          SFX.init();
          this.startReplay();
        }
      } else if (e.code === 'Escape' && this.turnState === 'REPLAY') {
        e.preventDefault();
        this.exitReplay();
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
        this.startReplay();
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
        descEl.innerText = `${mData.name} (${mData.desc})`;
      }
    });
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
      if (moveData.superCost > 0) frameText = `${moveData.superCost} SP`;
      else if (moveData.damage > 0) frameText = `${moveData.startup}f • ${moveData.damage} Dmg`;
      else if (moveKey === 'PARRY') frameText = 'Frame Trap';
      else if (moveKey === 'BLOCK') frameText = 'Guard 80%';

      const label = moveData.shortName || moveData.name.split(' ')[0] || moveKey;
      const badge = moveData.isApex ? '⚔️' : (moveData.isFusion ? '🔮' : (moveData.isUpgraded ? '★' : ''));

      btn.innerHTML = `
        <span>${label} ${badge}</span>
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
          if (descEl) descEl.innerText = `${mData.name} (${mData.desc})`;
        }
      }
    }
  }

  unlockMove(moveKey) {
    this.ownedMoves.add(moveKey);
    this.equippedMoves.add(moveKey);
    this.rebuildMoveButtons();
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
      'STEP_FWD', 'STEP_BACK', 'JUMP', 'DASH',
      'BLOCK', 'PARRY',
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'KI_BLAST', 'DRAGON_UPPER'
    ]);
    this.equippedMoves = new Set([
      'STEP_FWD', 'STEP_BACK', 'JUMP', 'DASH',
      'BLOCK', 'PARRY',
      'QUICK_JAB', 'HEAVY_SLASH', 'SWEEP', 'LAUNCHER',
      'KI_BLAST', 'DRAGON_UPPER'
    ]);

    this.initStage(this.currentFloor, this.floorStage);
  }

  initStage(floorNum, stageNum) {
    this.currentFloor = floorNum || 1;
    this.floorStage = stageNum || 1;

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
    this.player.maxHp = 100 + metaHp + relicHp;
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

    // Stage HUD Updates
    const stagePill = document.getElementById('stage-display');
    if (stagePill) {
      stagePill.innerText = `FLOOR ${this.currentFloor} • STAGE ${this.floorStage} / 10`;
    }

    const p2Name = document.getElementById('p2-name');
    if (p2Name) p2Name.innerText = enemyData.name.toUpperCase();

    const p2Arch = document.getElementById('p2-archetype');
    if (p2Arch) {
      p2Arch.innerText = enemyData.title ? enemyData.title.toUpperCase() : (enemyData.isBoss ? 'BOSS' : 'FIGHTER');
      p2Arch.className = enemyData.isBoss ? 'boss-archetype-pill is-boss' : 'boss-archetype-pill';
    }

    // Reset Combat States
    this.projectiles = [];
    this.spatialRifts = [];
    this.particles = [];
    this.damageTexts = [];
    this.replayFrames = [];
    this.comboCount = 0;

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

  // ── INTELLIGENT SCALING AI (POOL & TIER BASED) ──────────────────────────────
  chooseAIMove() {
    const opp = this.currentOpponentData || {};
    const movePool = opp.moves || ['STEP_FWD', 'QUICK_JAB', 'HEAVY_SLASH', 'BLOCK'];
    const aiTier = opp.aiTier || 'BALANCED';
    const dist = Math.abs(this.enemy.x - this.player.x);
    const rand = Math.random();
    const playerInHitstun = this.player.hitstunFrames > 0;

    // Defense if stunned
    if (this.enemy.hitstunFrames > 0) {
      return movePool.includes('BLOCK') ? 'BLOCK' : 'STEP_BACK';
    }

    // 1. NOVICE AI
    if (aiTier === 'NOVICE') {
      if (playerInHitstun) {
        return (movePool.includes('QUICK_JAB') && rand < 0.7) ? 'QUICK_JAB' : 'STEP_FWD';
      }
      if (dist > 140) return rand < 0.6 ? 'STEP_FWD' : 'STEP_BACK';
      if (dist < 75) return rand < 0.45 ? 'QUICK_JAB' : (rand < 0.75 ? 'SWEEP' : 'BLOCK');
      return 'STEP_FWD';
    }

    // 2. AGGRESSIVE AI
    if (aiTier === 'AGGRESSIVE') {
      if (dist > 180) {
        if (movePool.includes('SUPER_DASH')) return 'SUPER_DASH';
        if (movePool.includes('DASH')) return 'DASH';
        return 'STEP_FWD';
      }
      if (dist < 90) {
        if (this.enemy.superMeter >= 25 && movePool.includes('METEOR_STRIKE')) return 'METEOR_STRIKE';
        if (movePool.includes('GROUND_POUND')) return 'GROUND_POUND';
        if (movePool.includes('LAUNCHER')) return 'LAUNCHER';
        return 'QUICK_JAB';
      }
      return movePool.includes('HEAVY_SLASH') ? 'HEAVY_SLASH' : 'QUICK_JAB';
    }

    // 3. TACTICAL AI
    if (aiTier === 'TACTICAL') {
      if (dist > 160) {
        if (this.enemy.superMeter >= 20 && movePool.includes('KI_BLAST')) return 'KI_BLAST';
        if (movePool.includes('FIRE_BURST')) return 'FIRE_BURST';
        return 'STEP_FWD';
      }
      if (dist < 80) {
        if (rand < 0.35 && movePool.includes('PARRY')) return 'PARRY';
        if (movePool.includes('LIGHTNING_PALM')) return 'LIGHTNING_PALM';
        if (movePool.includes('SWEEP')) return 'SWEEP';
        return 'BLOCK';
      }
      return 'STEP_BACK';
    }

    // 4. VETERAN AI
    if (aiTier === 'VETERAN') {
      if (playerInHitstun) {
        if (this.enemy.superMeter >= 35 && movePool.includes('JUDGMENT_CUT')) return 'JUDGMENT_CUT';
        if (movePool.includes('LAUNCHER')) return 'LAUNCHER';
        return 'HEAVY_SLASH';
      }
      if (dist > 160) {
        if (movePool.includes('GHOST_STEP')) return 'GHOST_STEP';
        if (movePool.includes('DASH')) return 'DASH';
        return 'STEP_FWD';
      }
      if (dist <= 85) {
        if (rand < 0.35 && movePool.includes('BLADE_COUNTER')) return 'BLADE_COUNTER';
        if (rand < 0.6 && movePool.includes('QUICK_JAB')) return 'QUICK_JAB';
        return movePool.includes('HEAVY_SLASH') ? 'HEAVY_SLASH' : 'PARRY';
      }
    }

    // 5. BOSS AI (Floor 1, 2, 3 Bosses)
    if (aiTier === 'BOSS') {
      // Check for High Super Apex / Fused Skills
      if (this.enemy.superMeter >= 50 && movePool.includes('THUNDER_GALE')) return 'THUNDER_GALE';
      if (this.enemy.superMeter >= 50 && movePool.includes('VOID_CLEAVE')) return 'VOID_CLEAVE';
      if (this.enemy.superMeter >= 50 && movePool.includes('COMET_CRASH')) return 'COMET_CRASH';
      if (this.enemy.superMeter >= 60 && movePool.includes('DRAGON_UPPER')) return 'DRAGON_UPPER';
      if (this.enemy.superMeter >= 35 && movePool.includes('JUDGMENT_CUT')) return 'JUDGMENT_CUT';

      if (dist > 200) {
        if (movePool.includes('SUPER_DASH')) return 'SUPER_DASH';
        if (movePool.includes('GHOST_STEP')) return 'GHOST_STEP';
        return 'DASH';
      }
      if (dist < 90) {
        if (rand < 0.35 && movePool.includes('AEGIS_REFLECT')) return 'AEGIS_REFLECT';
        if (rand < 0.5 && movePool.includes('BLADE_COUNTER')) return 'BLADE_COUNTER';
        if (rand < 0.75 && movePool.includes('HEAVY_SLASH')) return 'HEAVY_SLASH';
        return 'LAUNCHER';
      }
      return 'QUICK_JAB';
    }

    // Fallback: pick any valid move from enemy's pool
    return movePool[Math.floor(Math.random() * movePool.length)];
  }

  getAIAimAngle(moveKey) {
    if (['JUMP', 'DOUBLE_JUMP'].includes(moveKey)) {
      return this.player.isAirborne ? 65 : 45;
    }
    if (moveKey === 'DIVE_KICK' || moveKey === 'COMET_CRASH') {
      return -50;
    }
    if (moveKey === 'SWEEP' || moveKey === 'PHANTOM_SLIDE') {
      return -30;
    }
    if (moveKey === 'LAUNCHER' || moveKey === 'DRAGON_UPPER') {
      return 60;
    }
    if (['KI_BLAST', 'FIRE_BURST', 'JUDGMENT_CUT', 'VOID_CLEAVE'].includes(moveKey)) {
      return this.player.isAirborne ? -30 : 15;
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
        hitstunFrames: this.enemy.hitstunFrames,
        moveKey: this.enemy.moveKey,
        moveFrame: this.enemy.moveFrame,
        animTick: this.enemy.animTick,
        hp: this.enemy.hp,
        maxHp: this.enemy.maxHp,
        superMeter: this.enemy.superMeter,
        maxSuper: this.enemy.maxSuper,
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
          this.addDamageText(target.x, target.y - 70, `${dmg} SPATIAL!`, '#00f0ff', true);
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

    const currentF = attacker.moveFrame;
    const startF = move.startup;
    const endF = startF + (move.activeFrames || 4);

    if (currentF >= startF && currentF <= endF) {
      const dist = Math.abs(attacker.x - defender.x);
      const is360 = !!move.is360;
      const withinRange = is360 ? dist <= (move.range || 90) : dist <= (move.range || 75);

      if (withinRange) {
        let dmg = move.damage + attacker.atkBonus;

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
          this.spawnSparks(defender.x, defender.y - 45, '#ffd166', 22);

          if (attacker.isPlayer) {
            this.gold += 8;
            if (this.hasPerk('weakpoint_prism')) attacker.superMeter = Math.min(attacker.maxSuper, attacker.superMeter + 15);
            this.updateHUD();
          }
        }

        if (attacker.isPlayer && this.hasPerk('berserk_core') && attacker.hp < attacker.maxHp * 0.5) {
          dmg *= 1.55;
        }

        const isSpike = !!move.spikesDown;
        const isHeavy = !!move.launchesAir || move.damage >= 24;
        const realDmg = defender.takeHit(dmg, attacker, isHeavy, isSpike);

        if (realDmg > 0) {
          attacker.superMeter = Math.min(attacker.maxSuper, attacker.superMeter + 16);

          if (attacker.isPlayer && this.hasPerk('vampiric_edge') && isWeakpoint) {
            const heal = Math.max(1, Math.round(realDmg * 0.1));
            attacker.hp = Math.min(attacker.maxHp, attacker.hp + heal);
            this.addDamageText(attacker.x, attacker.y - 80, `+${heal} HP`, '#06d6a0');
          }

          if (attacker.isPlayer && this.hasPerk('lightning_strike')) {
            this.spawnSparks(defender.x, defender.y - 45, '#ffd166', 15);
            defender.hp = Math.max(0, defender.hp - 16);
            this.addDamageText(defender.x + 20, defender.y - 50, '16 ⚡', '#ffd166');
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
    if (goldDisplay) goldDisplay.innerText = `🪙 ${this.gold} Gold`;

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
          p.active = false;
        }
        if (!p.active) this.projectiles.splice(i, 1);
      }

      // Particles & Texts
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        if (this.particles[i].life <= 0) this.particles.splice(i, 1);
      }
      for (let i = this.damageTexts.length - 1; i >= 0; i--) {
        this.damageTexts[i].update();
        if (this.damageTexts[i].life <= 0) this.damageTexts.splice(i, 1);
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
    if (goldTxt) goldTxt.innerText = `🪙 ${this.gold} Gold Available`;
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
            name: `${moveData ? moveData.name : mKey} Breakthrough 🔮`,
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
            badge: 'UPGRADE ★',
            badgeClass: 'tier-upgrade',
            cost: 60,
            desc: upg.desc
          });
        }
      }
    });

    // Unowned moves from MOVES catalog
    Object.keys(MOVES).forEach(mKey => {
      if (!this.ownedMoves.has(mKey) && !mKey.includes('_UPG') && !['THUNDER_GALE', 'VOID_CLEAVE', 'COMET_CRASH', 'PHANTOM_SLIDE', 'AEGIS_REFLECT'].includes(mKey)) {
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
              <span class="shop-price">🪙 ${item.cost} G</span>
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
            document.getElementById('shop-gold-display').innerText = `🪙 ${this.gold} Gold Available`;
            this.updateHUD();

            if (item.type === 'UPGRADE') {
              if (this.moveUpgrades.has(item.moveKey)) {
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
              <span class="perk-badge tier-rare">${relic.icon} RELIC</span>
              <span class="shop-price">${isBought ? 'OWNED' : `🪙 ${relic.cost} G`}</span>
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
            }

            document.getElementById('shop-gold-display').innerText = `🪙 ${this.gold} Gold Available`;
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
    container.innerHTML = '';
    document.getElementById('deck-count-text').innerText = `${this.equippedMoves.size} / ${this.ownedMoves.size} Moves`;

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
          ${moveData.damage > 0 ? `${moveData.startup}f • ${moveData.damage} Dmg` : 'Mobility / Guard'}
        </div>
        <div style="font-size: 10px; color: #94a3b8; line-height: 1.3;">${moveData.desc}</div>
      `;

      card.addEventListener('click', () => {
        if (isEquipped) {
          if (this.equippedMoves.size <= 4) return; // Keep minimum loadout
          this.equippedMoves.delete(moveKey);
        } else {
          this.equippedMoves.add(moveKey);
        }
        this.rebuildMoveButtons();
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
      name: `${moveData.name} [APEX ⚔️]`,
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
            name: `${moveData ? moveData.name : moveKey} Breakthrough 🔮`,
            rarity: 'legendary',
            icon: '🔮',
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
            icon: '⭐',
            badge: 'MOVE UPGRADE ★',
            desc: upg.desc
          });
        }
      }
    });

    // 2. Unowned skills from MOVES catalog
    Object.keys(MOVES).forEach(mKey => {
      if (!this.ownedMoves.has(mKey) && !['THUNDER_GALE', 'VOID_CLEAVE', 'COMET_CRASH', 'PHANTOM_SLIDE', 'AEGIS_REFLECT'].includes(mKey)) {
        const mData = MOVES[mKey];
        newMoveCandidates.push({
          kind: 'SKILL',
          moveKey: mKey,
          name: mData.name,
          rarity: 'rare',
          icon: mData.category === 'movement' ? '🚀' : '⚔️',
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
        tierClass = reward.badge === 'BREAKTHROUGH' ? 'tier-fusion' : 'tier-upgrade';
      }

      card.innerHTML = `
        <span class="perk-badge ${tierClass}">${reward.badge}</span>
        <div class="perk-icon">${reward.icon}</div>
        <div class="perk-name">${reward.name}</div>
        <div class="perk-desc">${reward.desc}</div>
      `;

      card.addEventListener('click', () => {
        if (reward.kind === 'UPGRADE') {
          if (this.moveUpgrades.has(reward.moveKey)) {
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
    if (shardsEl) shardsEl.innerText = `Hustle Shards: ${this.meta.shards} 💎`;
    const titleShards = document.getElementById('title-shards');
    if (titleShards) titleShards.innerText = `Hustle Shards: ${this.meta.shards} 💎`;

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
            ${u.cost} 💎
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
        if (playIcon) playIcon.innerText = this.isReplayPlaying ? '⏸ PAUSE' : '▶ PLAY';
      });
    }

    const restartBtn = document.getElementById('btn-replay-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.replayIndex = 0;
        this.isReplayPlaying = true;
        const playIcon = document.getElementById('replay-play-icon');
        if (playIcon) playIcon.innerText = '⏸ PAUSE';
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
    if (playIcon) playIcon.innerText = '⏸ PAUSE';
  }

  exitReplay() {
    const replayHud = document.getElementById('replay-hud');
    if (replayHud) replayHud.classList.add('hidden');

    const btnTopReplay = document.getElementById('btn-top-replay');
    if (btnTopReplay) btnTopReplay.classList.remove('hidden');

    // Restore any overlay that was open before entering replay
    if (this.overlayBeforeReplay) {
      this.overlayBeforeReplay.classList.add('active');
      this.overlayBeforeReplay = null;
    } else if (this.previousState === 'DECISION') {
      const tacPanel = document.getElementById('tactical-panel');
      if (tacPanel) tacPanel.classList.remove('hidden');
    }

    this.turnState = this.previousState || 'DECISION';
    this.updateHUD();
  }

  updateReplay() {
    if (this.isReplayPlaying) {
      this.replayIndex += this.replaySpeed;
      if (this.replayIndex >= this.replayFrames.length) {
        this.replayIndex = this.replayFrames.length - 1;
        this.isReplayPlaying = false;
        const playIcon = document.getElementById('replay-play-icon');
        if (playIcon) playIcon.innerText = '▶ PLAY';
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
