// ============================================================================
// UI CONTROLLER & EVENT WIRING (MAIN)
// Zero emojis, Zero em dashes.
// ============================================================================

(function () {
  'use strict';

  // Initialize Engine
  const engine = new TuTienEngine();

  // Random cultivator names
  const RANDOM_NAMES = [
    'Han Li', 'Bai Xiaochun', 'Gu Changsheng', 'Ling Xiao', 
    'Murong Chen', 'Ye Fan', 'Satan', 'Lin Dong', 
    'Xiao Yan', 'Shi Hao', 'Ji Ning', 'Sheng Chen'
  ];

  // DOM Elements References
  const elements = {
    // Top & Theme
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    restartBtn: document.getElementById('restartBtn'),

    // Profile
    charName: document.getElementById('charName'),
    charRealm: document.getElementById('charRealm'),
    charLifespan: document.getElementById('charLifespan'),
    charSpiritRoot: document.getElementById('charSpiritRoot'),
    charStones: document.getElementById('charStones'),
    charHeritagePoints: document.getElementById('charHeritagePoints'),
    charBackgroundLore: document.getElementById('charBackgroundLore'),

    // Gauges
    hpGaugeFill: document.getElementById('hpGaugeFill'),
    hpGaugeText: document.getElementById('hpGaugeText'),
    expGaugeFill: document.getElementById('expGaugeFill'),
    expGaugeText: document.getElementById('expGaugeText'),

    // Narrative & Choices
    eventTitle: document.getElementById('eventTitle'),
    eventPassage: document.getElementById('eventPassage'),
    choicesContainer: document.getElementById('choicesContainer'),

    // Stats Matrix
    statAtk: document.getElementById('statAtk'),
    statDef: document.getElementById('statDef'),
    statStrike: document.getElementById('statStrike'),
    statDodge: document.getElementById('statDodge'),
    statSkill: document.getElementById('statSkill'),

    // Equipment
    equipWeapon: document.getElementById('equipWeapon'),
    equipArmor: document.getElementById('equipArmor'),
    equipManual: document.getElementById('equipManual'),

    // Actions
    btnCultivateYear: document.getElementById('btnCultivateYear'),
    btnExploreWorld: document.getElementById('btnExploreWorld'),
    btnBreakthrough: document.getElementById('btnBreakthrough'),

    // Bottom Navigation
    navHomeBtn: document.getElementById('navHomeBtn'),
    navReviewBtn: document.getElementById('navReviewBtn'),
    navArchivesBtn: document.getElementById('navArchivesBtn'),
    navHeritageBtn: document.getElementById('navHeritageBtn'),

    // Modals
    inventoryModal: document.getElementById('inventoryModal'),
    inventoryItemsList: document.getElementById('inventoryItemsList'),

    chronicleModal: document.getElementById('chronicleModal'),
    chronicleHistoryList: document.getElementById('chronicleHistoryList'),

    combatModal: document.getElementById('combatModal'),
    combatStreamBox: document.getElementById('combatStreamBox'),
    combatCloseBtn: document.getElementById('combatCloseBtn'),
    combatFinishBtn: document.getElementById('combatFinishBtn'),

    heritageModal: document.getElementById('heritageModal'),
    heritageModalPoints: document.getElementById('heritageModalPoints'),
    heritagePerksList: document.getElementById('heritagePerksList'),
    btnStartNewRunFromHeritage: document.getElementById('btnStartNewRunFromHeritage'),

    newRunModal: document.getElementById('newRunModal'),
    inputNewName: document.getElementById('inputNewName'),
    btnRandomName: document.getElementById('btnRandomName'),
    startingTalentsSelection: document.getElementById('startingTalentsSelection'),
    btnConfirmNewRun: document.getElementById('btnConfirmNewRun')
  };

  // ── THEME CONTROLLER ──
  function initTheme() {
    const savedTheme = localStorage.getItem('tutien_mud_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('tutien_mud_theme', target);
  }

  // ── MODAL HELPERS ──
  function openModal(modalEl) {
    if (modalEl) modalEl.classList.add('open');
  }

  function closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove('open');
  }

  function setupModalCloseListeners() {
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const modal = document.getElementById(modalId);
        if (modal) closeModal(modal);
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay && overlay.id !== 'newRunModal') {
          closeModal(overlay);
        }
      });
    });
  }

  // ── LOCAL STORAGE SAVE / RESTORE RUN ──
  function saveActiveRun() {
    if (!engine.player) return;
    try {
      const runData = {
        player: engine.player,
        currentEvent: engine.currentEvent,
        eventHistory: engine.eventHistory,
        recentEventIds: engine.recentEventIds || [],
        completedUniqueEvents: engine.completedUniqueEvents || []
      };
      localStorage.setItem('tutien_mud_active_run_v1', JSON.stringify(runData));
    } catch (e) {
      console.warn('Cannot save active run', e);
    }
  }

  function loadActiveRun() {
    try {
      const saved = localStorage.getItem('tutien_mud_active_run_v1');
      if (saved) {
        const data = JSON.parse(saved);
        if (data && data.player && data.player.name) {
          engine.player = data.player;
          engine.currentEvent = data.currentEvent;
          engine.eventHistory = data.eventHistory || [];
          engine.recentEventIds = data.recentEventIds || [];
          engine.completedUniqueEvents = data.completedUniqueEvents || [];

          // Re-attach methods to player object
          engine.player.hasTalent = (tId) => engine.player.talents.some(t => t.id === tId);
          engine.player.hasItem = (itemId) => {
            const inInv = engine.player.inventory.includes(itemId);
            const inEquip = Object.values(engine.player.equipment).some(eq => eq && eq.id === itemId);
            return inInv || inEquip;
          };
          return true;
        }
      }
    } catch (e) {
      console.warn('Cannot restore active run', e);
    }
    return false;
  }

  // ── NEW RUN DIALOG ──
  function promptNewRun() {
    // Roll default name
    elements.inputNewName.value = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];

    // Populate starting talents
    elements.startingTalentsSelection.innerHTML = '';
    const availableTalents = TALENTS.filter(t => !t.permanentHeritage);

    availableTalents.forEach(t => {
      const isHeritageUnlocked = engine.unlockedHeritage.includes(t.id);
      const row = document.createElement('label');
      row.style.display = 'flex';
      row.style.alignItems = 'flex-start';
      row.style.gap = '8px';
      row.style.cursor = 'pointer';
      row.style.fontSize = '14px';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = t.id;
      checkbox.name = 'starting_talent';
      if (isHeritageUnlocked) {
        checkbox.checked = true;
        checkbox.disabled = true;
      }

      const textWrap = document.createElement('div');
      textWrap.innerHTML = `<strong>${t.name}</strong>: ${t.desc} ${isHeritageUnlocked ? '<span style="color:var(--text-teal); font-weight:bold;">(Unlocked Heritage)</span>' : ''}`;

      row.appendChild(checkbox);
      row.appendChild(textWrap);
      elements.startingTalentsSelection.appendChild(row);
    });

    openModal(elements.newRunModal);
  }

  function confirmNewRun() {
    const customName = elements.inputNewName.value.trim() || 'Han Li';
    const checkedBoxes = Array.from(elements.startingTalentsSelection.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)'));

    if (checkedBoxes.length > 3) {
      alert('You may only select up to 3 starting talents!');
      return;
    }

    const selectedIds = checkedBoxes.map(cb => cb.value);
    engine.createNewLife(customName, selectedIds);
    saveActiveRun();
    closeModal(elements.newRunModal);
    renderAll();
  }

  // ── RENDER ENGINE STATE TO UI ──
  function renderAll() {
    const p = engine.player;
    if (!p) return;

    const curRealm = REALMS[p.realmIndex] || REALMS[0];

    // Profile header
    elements.charName.textContent = p.name;
    elements.charRealm.textContent = curRealm.name;
    elements.charLifespan.textContent = `${p.age} / ${p.lifespan} Years`;
    if (p.age >= p.lifespan * 0.85) {
      elements.charLifespan.classList.add('alert-danger');
    } else {
      elements.charLifespan.classList.remove('alert-danger');
    }

    elements.charSpiritRoot.textContent = p.spiritRoot.name;
    elements.charStones.textContent = `${p.stones}`;
    elements.charHeritagePoints.textContent = `${engine.heritagePoints} Pts`;
    elements.charBackgroundLore.textContent = `[${p.background.name}] ${p.background.desc}`;

    // Gauges
    const hpPct = Math.max(0, Math.min(100, (p.hp / p.maxHp) * 100));
    elements.hpGaugeFill.style.width = `${hpPct}%`;
    elements.hpGaugeText.textContent = `${p.hp} / ${p.maxHp}`;

    const expReq = curRealm.expRequired;
    const expPct = expReq > 0 ? Math.max(0, Math.min(100, (p.exp / expReq) * 100)) : 100;
    elements.expGaugeFill.style.width = `${expPct}%`;
    elements.expGaugeText.textContent = expReq > 0 ? `${p.exp} / ${expReq}` : 'Culmination';

    // Stats Matrix
    elements.statAtk.textContent = `+ ${p.atk}`;
    elements.statDef.textContent = `+ ${p.def}`;
    elements.statStrike.textContent = `+ ${p.strike} %`;
    elements.statDodge.textContent = `+ ${p.dodge} %`;
    elements.statSkill.textContent = `+ ${p.skill}`;

    // Equipment Readout
    elements.equipWeapon.textContent = p.equipment.weapon ? p.equipment.weapon.name : 'Unarmed';
    elements.equipArmor.textContent = p.equipment.armor ? p.equipment.armor.name : 'Cloth Robe';
    elements.equipManual.textContent = p.equipment.manual ? p.equipment.manual.name : 'Basic Breathing';

    // Breakthrough Button Visibility
    if (p.exp >= expReq && p.realmIndex < REALMS.length - 1) {
      elements.btnBreakthrough.style.display = 'block';
    } else {
      elements.btnBreakthrough.style.display = 'none';
    }

    // Render Event & Choices
    renderCurrentEvent();
  }

  // ── RENDER EVENT PASSAGE & CHOICES ──
  function renderCurrentEvent() {
    const ev = engine.currentEvent;
    if (!ev) {
      elements.eventTitle.textContent = 'Serene Meditation';
      elements.eventPassage.textContent = 'You are meditating peacefully in your mountain cave, listening to the pine winds...';
      elements.choicesContainer.innerHTML = '';
      return;
    }

    elements.eventTitle.textContent = ev.title || 'Cosmic Encounter';

    // Format text with subtle highlight tags
    let formattedText = ev.text || '';
    formattedText = formattedText.replace(/\[(.*?)\]/g, '<span class="hl-purple">[$1]</span>');
    formattedText = formattedText.replace(/\+([0-9]+)\s(Exp|Cultivation Exp|Spirit Stones|HP)/gi, '<span class="hl-teal">+$1 $2</span>');

    elements.eventPassage.innerHTML = formattedText;

    // Render Choices
    elements.choicesContainer.innerHTML = '';
    if (ev.choices && ev.choices.length > 0) {
      ev.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mud-choice-btn';

        // Dark style for alternate/retreat choices
        if (choice.text.includes('retreat') || choice.text.includes('withdraw') || choice.text.includes('Depart') || index > 1) {
          btn.classList.add('choice-dark');
        }

        let choiceHtml = choice.text;

        // Subtext clues
        let subtext = '';
        if (choice.type === 'STAT_CHECK') {
          const statNames = { atk: 'Attack', def: 'Defense', strike: 'Strike', dodge: 'Dodge', skill: 'Skill' };
          subtext = `(Requirement: ${statNames[choice.stat] || choice.stat} >= ${choice.reqVal} • Current: ${engine.player[choice.stat] || 0})`;
        } else if (choice.type === 'COST_CHECK') {
          subtext = `(Cost: ${choice.costVal} Spirit Stones • Current: ${engine.player.stones})`;
        } else if (choice.type === 'COMBAT') {
          const enemy = ENEMIES_CATALOG[choice.enemyId];
          subtext = `(Combat: Target ${enemy ? enemy.name : 'Adversary'} • Perilous)`;
        }

        if (subtext) {
          choiceHtml += `<span class="choice-subtext">${subtext}</span>`;
        }

        btn.innerHTML = choiceHtml;
        btn.addEventListener('click', () => handleChoiceClick(choice, index));
        elements.choicesContainer.appendChild(btn);
      });
    }
  }

  // ── HANDLE CHOICE INTERACTION ──
  function handleChoiceClick(choice, choiceIndex) {
    if (!engine.player) return;

    if (choice.type === 'BREAKTHROUGH_ATTEMPT') {
      const success = engine.executeBreakthrough();
      saveActiveRun();
      renderAll();
      return;
    }

    if (choice.type === 'OPEN_REINCARNATION_HALL') {
      openHeritageHall();
      return;
    }

    const result = engine.executeChoice(choiceIndex);
    saveActiveRun();

    if (result && result.type === 'COMBAT' && result.logs) {
      playCombatLogStream(result.logs, () => {
        saveActiveRun();
        renderAll();
      });
    } else {
      renderAll();
    }
  }

  // ── COMBAT LOG STREAMING SIMULATOR ──
  function playCombatLogStream(logs, onComplete) {
    elements.combatStreamBox.innerHTML = '';
    elements.combatCloseBtn.style.display = 'none';
    elements.combatFinishBtn.style.display = 'none';
    openModal(elements.combatModal);

    let logIdx = 0;
    const streamInterval = setInterval(() => {
      if (logIdx < logs.length) {
        const item = logs[logIdx];
        const logLine = document.createElement('div');
        logLine.className = `log-${item.type || 'info'}`;
        logLine.textContent = item.text;
        elements.combatStreamBox.appendChild(logLine);
        elements.combatStreamBox.scrollTop = elements.combatStreamBox.scrollHeight;
        logIdx++;
      } else {
        clearInterval(streamInterval);
        elements.combatCloseBtn.style.display = 'inline-block';
        elements.combatFinishBtn.style.display = 'inline-block';
        if (onComplete) onComplete();
      }
    }, 70);

    // Skip stream if user clicks close
    elements.combatFinishBtn.onclick = () => {
      clearInterval(streamInterval);
      closeModal(elements.combatModal);
      if (onComplete) onComplete();
    };
  }

  // ── INVENTORY MODAL (ARCHIVES / STORAGE POUCH) ──
  function openInventory() {
    if (!engine.player) return;
    elements.inventoryItemsList.innerHTML = '';

    if (engine.player.inventory.length === 0) {
      elements.inventoryItemsList.innerHTML = '<div style="color:var(--text-muted); font-size:14px; text-align:center; padding:20px 0;">Storage pouch is empty. No spiritual items found.</div>';
      openModal(elements.inventoryModal);
      return;
    }

    engine.player.inventory.forEach((itemId, idx) => {
      const item = ITEMS_CATALOG[itemId];
      if (!item) return;

      const card = document.createElement('div');
      card.className = 'inv-item-card';

      let statsTxt = '';
      if (item.stats) {
        const statParts = [];
        if (item.stats.atk) statParts.push(`Atk +${item.stats.atk}`);
        if (item.stats.def) statParts.push(`Def +${item.stats.def}`);
        if (item.stats.strike) statParts.push(`Strike +${item.stats.strike}%`);
        if (item.stats.dodge) statParts.push(`Dodge +${item.stats.dodge}%`);
        if (item.stats.skill) statParts.push(`Skill +${item.stats.skill}`);
        if (item.stats.hp) statParts.push(`HP +${item.stats.hp}`);
        statsTxt = statParts.join(' • ');
      }

      card.innerHTML = `
        <div class="inv-item-info">
          <div class="inv-item-name">[${item.name}] <span style="font-size:12px; font-weight:normal; color:var(--text-muted);">(${item.tier})</span></div>
          <div class="inv-item-desc">${item.desc}</div>
          ${statsTxt ? `<div class="inv-item-stats">${statsTxt}</div>` : ''}
        </div>
        <div>
          <button class="btn-ancient btn-use-item" type="button">${item.type === 'CONSUMABLE' ? 'Use' : 'Equip'}</button>
        </div>
      `;

      card.querySelector('.btn-use-item').addEventListener('click', () => {
        engine.useItem(itemId, idx);
        saveActiveRun();
        renderAll();
        openInventory(); // Refresh modal
      });

      elements.inventoryItemsList.appendChild(card);
    });

    openModal(elements.inventoryModal);
  }

  // ── CHRONICLE MODAL (REVIEW) ──
  function openChronicle() {
    elements.chronicleHistoryList.innerHTML = '';

    if (engine.eventHistory.length === 0) {
      elements.chronicleHistoryList.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:15px 0;">No chronicles recorded yet.</div>';
      openModal(elements.chronicleModal);
      return;
    }

    engine.eventHistory.forEach((record) => {
      const entry = document.createElement('div');
      entry.style.borderBottom = '1px dashed var(--border-main)';
      entry.style.paddingBottom = '4px';
      entry.textContent = record;
      elements.chronicleHistoryList.appendChild(entry);
    });

    openModal(elements.chronicleModal);
  }

  // ── HERITAGE HALL MODAL (FILE READING) ──
  function openHeritageHall() {
    elements.heritageModalPoints.textContent = engine.heritagePoints;
    elements.heritagePerksList.innerHTML = '';

    const heritageTalents = TALENTS.filter(t => t.permanentHeritage);

    heritageTalents.forEach(t => {
      const isUnlocked = engine.unlockedHeritage.includes(t.id);
      const card = document.createElement('div');
      card.className = `perk-card ${isUnlocked ? 'unlocked' : ''}`;

      card.innerHTML = `
        <div>
          <div style="font-weight:700; color:var(--text-purple);">${t.name}</div>
          <div style="font-size:13px; color:var(--text-muted);">${t.desc}</div>
          <div style="font-size:12px; font-weight:bold; color:var(--text-gold);">Cost: ${t.cost} Heritage Points</div>
        </div>
        <div>
          ${isUnlocked
            ? '<span style="color:#15803d; font-weight:700; font-size:13px;">UNLOCKED</span>'
            : `<button class="btn-ancient btn-unlock-perk" type="button" ${engine.heritagePoints < t.cost ? 'disabled' : ''}>Unlock</button>`
          }
        </div>
      `;

      const unlockBtn = card.querySelector('.btn-unlock-perk');
      if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
          if (engine.heritagePoints >= t.cost) {
            engine.heritagePoints -= t.cost;
            engine.unlockedHeritage.push(t.id);
            engine.saveGlobalHeritage();
            openHeritageHall();
            renderAll();
          }
        });
      }

      elements.heritagePerksList.appendChild(card);
    });

    openModal(elements.heritageModal);
  }

  // ── WIRE EVENT LISTENERS ──
  function setupEventListeners() {
    // Top bar
    elements.themeToggleBtn.addEventListener('click', toggleTheme);
    elements.restartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to end this cultivation life and enter the Reincarnation cycle?')) {
        engine.handleDeath('Voluntarily ended cultivation, true soul returning to Reincarnation Hall.');
        saveActiveRun();
        renderAll();
        openHeritageHall();
      }
    });

    // Quick Actions
    elements.btnCultivateYear.addEventListener('click', () => {
      engine.cultivateOneYear();
      saveActiveRun();
      renderAll();
    });

    elements.btnExploreWorld.addEventListener('click', () => {
      engine.triggerRandomEvent();
      saveActiveRun();
      renderAll();
    });

    elements.btnBreakthrough.addEventListener('click', () => {
      engine.triggerBreakthroughPrompt();
      saveActiveRun();
      renderAll();
    });

    // Bottom Navigation (Home, Review, Archives, File reading)
    elements.navHomeBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    elements.navReviewBtn.addEventListener('click', openChronicle);
    elements.navArchivesBtn.addEventListener('click', openInventory);
    elements.navHeritageBtn.addEventListener('click', openHeritageHall);

    // Heritage Start New Run
    elements.btnStartNewRunFromHeritage.addEventListener('click', () => {
      closeModal(elements.heritageModal);
      promptNewRun();
    });

    // New Run Dialog
    elements.btnRandomName.addEventListener('click', () => {
      elements.inputNewName.value = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    });

    elements.btnConfirmNewRun.addEventListener('click', confirmNewRun);

    // Modals close wiring
    setupModalCloseListeners();
  }

  // ── INITIALIZATION ──
  function init() {
    initTheme();
    setupEventListeners();

    const restored = loadActiveRun();
    if (!restored || !engine.player) {
      promptNewRun();
    } else {
      renderAll();
    }
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
