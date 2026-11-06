// ============================================================================
// CULTIVATION MUD ENGINE CORE LOOP
// Zero emojis, Zero em dashes.
// ============================================================================

class TuTienEngine {
  constructor() {
    this.combatSim = new CombatSimulator();
    this.heritagePoints = 0;
    this.unlockedHeritage = [];
    this.totalReincarnations = 0;
    this.highestRealmIndex = 0;

    this.player = null;
    this.currentEvent = null;
    this.eventHistory = [];

    this.loadGlobalHeritage();
  }

  // ── LOAD GLOBAL REINCARNATION HERITAGE (LOCALSTORAGE) ──
  loadGlobalHeritage() {
    try {
      const saved = localStorage.getItem('tutien_mud_heritage_v1');
      if (saved) {
        const data = JSON.parse(saved);
        this.heritagePoints = data.heritagePoints || 0;
        this.unlockedHeritage = data.unlockedHeritage || [];
        this.totalReincarnations = data.totalReincarnations || 0;
        this.highestRealmIndex = data.highestRealmIndex || 0;
      }
    } catch (e) {
      console.warn('Cannot load heritage from localStorage', e);
    }
  }

  saveGlobalHeritage() {
    try {
      const data = {
        heritagePoints: this.heritagePoints,
        unlockedHeritage: this.unlockedHeritage,
        totalReincarnations: this.totalReincarnations,
        highestRealmIndex: this.highestRealmIndex
      };
      localStorage.setItem('tutien_mud_heritage_v1', JSON.stringify(data));
    } catch (e) {
      console.warn('Cannot save heritage', e);
    }
  }

  // ── INITIALIZE NEW LIFE (NEW REINCARNATION) ──
  createNewLife(customName, selectedTalentIds = []) {
    const defaultNames = ['Han Li', 'Bai Xiaochun', 'Gu Changsheng', 'Ling Xiao', 'Ye Fan', 'Satan', 'Sheng Chen'];
    const finalName = (customName && customName.trim()) ? customName.trim() : defaultNames[Math.floor(Math.random() * defaultNames.length)];

    // Roll Background
    const bg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    // Roll Spirit Root (Heritage perk can filter out impure roots)
    let rootPool = [...SPIRIT_ROOTS];
    if (this.unlockedHeritage.includes('talent_root_pure')) {
      rootPool = rootPool.filter(r => r.id !== 'ngu_hanh_tap_can');
    }
    const spiritRoot = rootPool[Math.floor(Math.random() * rootPool.length)];

    // Compile Active Talents (Selected starting + Unlocked permanent heritage)
    const activeTalents = TALENTS.filter(t => selectedTalentIds.includes(t.id) || this.unlockedHeritage.includes(t.id));

    const realm0 = REALMS[0];
    const baseStats = { ...realm0.baseStats };

    this.player = {
      name: finalName,
      age: 16,
      lifespan: realm0.lifespan,
      realmIndex: 0,
      exp: bg.bonus.exp || 0,
      stones: bg.bonus.stones || 30,
      background: bg,
      spiritRoot: spiritRoot,
      talents: activeTalents,
      hp: baseStats.hp + (bg.bonus.hp || 0),
      maxHp: baseStats.hp + (bg.bonus.hp || 0),
      atk: baseStats.atk + (bg.bonus.atk || 0),
      def: baseStats.def + (bg.bonus.def || 0),
      strike: baseStats.strike + (bg.bonus.strike || 0),
      dodge: baseStats.dodge + (bg.bonus.dodge || 0),
      skill: baseStats.skill + (bg.bonus.skill || 0),
      equipment: { weapon: null, armor: null, manual: null },
      inventory: ['kim_sang_duoc', 'tu_khi_dan'],
      reviveUsed: false,
      hasTalent: (talentId) => activeTalents.some(t => t.id === talentId),
      hasItem: (itemId) => {
        if (!this.player) return false;
        const inInv = this.player.inventory.includes(itemId);
        const inEquip = Object.values(this.player.equipment).some(eq => eq && eq.id === itemId);
        return inInv || inEquip;
      }
    };

    // Apply Spirit Root bonus
    if (spiritRoot.bonusAtk) this.player.atk += spiritRoot.bonusAtk;
    if (spiritRoot.bonusStrike) this.player.strike += spiritRoot.bonusStrike;

    // Apply Talent initial bonuses
    activeTalents.forEach(t => {
      if (t.effect.hp) { this.player.hp += t.effect.hp; this.player.maxHp += t.effect.hp; }
      if (t.effect.skill) this.player.skill += t.effect.skill;
      if (t.effect.strike) this.player.strike += t.effect.strike;
      if (t.effect.atkMult) this.player.atk = Math.round(this.player.atk * t.effect.atkMult);
      if (t.effect.defMult) this.player.def = Math.round(this.player.def * t.effect.defMult);
    });

    this.eventHistory = [];
    this.recalculateTotalStats();

    this.addHistory(`[Path of Ascension] At age 16, ${this.player.name} with [${bg.name}] heritage awakened [${spiritRoot.name}]. Leaving the mortal realm, officially stepping onto the defiant path of immortal cultivation!`);

    this.triggerInitialWelcomeEvent();
  }

  // ── RECALCULATE TOTAL STATS ──
  recalculateTotalStats() {
    if (!this.player) return;
    const curRealm = REALMS[this.player.realmIndex] || REALMS[0];
    let totalAtk = curRealm.baseStats.atk + (this.player.background.bonus.atk || 0);
    let totalDef = curRealm.baseStats.def + (this.player.background.bonus.def || 0);
    let totalStrike = curRealm.baseStats.strike + (this.player.background.bonus.strike || 0);
    let totalDodge = curRealm.baseStats.dodge + (this.player.background.bonus.dodge || 0);
    let totalSkill = curRealm.baseStats.skill + (this.player.background.bonus.skill || 0);
    let totalMaxHp = curRealm.baseStats.hp + (this.player.background.bonus.hp || 0);

    // Gear bonuses
    Object.values(this.player.equipment).forEach(item => {
      if (item && item.stats) {
        if (item.stats.atk) totalAtk += item.stats.atk;
        if (item.stats.def) totalDef += item.stats.def;
        if (item.stats.strike) totalStrike += item.stats.strike;
        if (item.stats.dodge) totalDodge += item.stats.dodge;
        if (item.stats.skill) totalSkill += item.stats.skill;
        if (item.stats.hp) totalMaxHp += item.stats.hp;
      }
    });

    // Talent Multipliers
    this.player.talents.forEach(t => {
      if (t.effect.hp) totalMaxHp += t.effect.hp;
      if (t.effect.skill) totalSkill += t.effect.skill;
      if (t.effect.strike) totalStrike += t.effect.strike;
      if (t.effect.atkMult) totalAtk = Math.round(totalAtk * t.effect.atkMult);
      if (t.effect.defMult) totalDef = Math.round(totalDef * t.effect.defMult);
    });

    this.player.atk = totalAtk;
    this.player.def = totalDef;
    this.player.strike = totalStrike;
    this.player.dodge = totalDodge;
    this.player.skill = totalSkill;
    this.player.maxHp = totalMaxHp;
    this.player.hp = Math.min(this.player.maxHp, this.player.hp);
  }

  // ── GENESIS WELCOME EVENT ──
  triggerInitialWelcomeEvent() {
    this.currentEvent = {
      id: 'khoi_dau_tien_duyen',
      title: 'Genesis of Immortal Affinity',
      text: `Cold winds sweep across the slopes of Mount Azure Cloud. You stand before an ancient boundary stele between mortal realm and immortal sects. In your sleeve are basic elixirs and a cracked teleportation jade slip. An endless path of cultivation lies ahead!`,
      choices: [
        {
          text: '【 Find a secluded grotto to meditate and gather Qi 】',
          type: 'AUTO',
          successText: 'You discover a secluded stone cave sheltered from the winds, sitting cross-legged to absorb spiritual Qi for a full year. Genuine Qi circulates steadily, cultivation slightly advancing!',
          successEffects: { exp: 60, lifespan: 0, stones: 10 }
        },
        {
          text: '【 Descend to the mountain market to seek rumors 】',
          type: 'AUTO',
          successText: 'Blending into the lively crowds of itinerant cultivators at the foothill bazaar, you hear countless legends of ancient ruins and lost realms, expanding your horizons.',
          successEffects: { skill: 4, stones: 20, exp: 30 }
        }
      ]
    };
  }

  // ── ACTION: MEDITATE ONE YEAR (+1 YEAR) ──
  cultivateOneYear() {
    if (!this.player) return;

    this.player.age += 1;
    const curRealm = REALMS[this.player.realmIndex];

    // Cultivation Rate calculation
    let rate = this.player.spiritRoot.cultivationRate || 1.0;
    if (this.player.hasTalent('dao_lu_dong_tam')) rate += 0.20;
    if (this.player.hasItem('truong_sinh_quyet')) rate += 0.15;

    // Gain exp: base 45 exp * realm multiplier * rate
    const gainedExp = Math.round((45 + (this.player.realmIndex * 35)) * rate);
    this.player.exp += gainedExp;

    // Natural resource gathering
    const earnedStones = Math.floor(Math.random() * 8) + 4;
    this.player.stones += earnedStones;

    // Heal 25% max HP naturally when meditating
    this.player.hp = Math.min(this.player.maxHp, this.player.hp + Math.round(this.player.maxHp * 0.25));

    this.addHistory(`[Age ${this.player.age}] Meditated in seclusion for one full year, gathering +${gainedExp} Exp and +${earnedStones} Spirit Stones.`);

    // Check Lifespan exhaustion
    if (this.player.age >= this.player.lifespan) {
      this.handleDeath('Lifespan exhausted before achieving realm breakthrough. Passed away peacefully in meditation.');
      return;
    }

    // Check Auto-Breakthrough readiness
    if (this.player.exp >= curRealm.expRequired && this.player.realmIndex < REALMS.length - 1) {
      this.triggerBreakthroughPrompt();
      return;
    }

    // 65% chance to trigger a random world encounter
    if (Math.random() < 0.65) {
      this.triggerRandomEvent();
    } else {
      this.currentEvent = {
        id: 'tinh_toa_an_nhien',
        title: 'Serene Meditation',
        text: `Year ${this.player.age} passes like tranquil flowing water. Meditating in your mountain cave, listening to pine breezes and harmonizing with cosmic rhythms, your cultivation deepens.`,
        choices: [
          {
            text: '【 Continue secluded meditation for another year 】',
            type: 'ACTION_CULTIVATE'
          },
          {
            text: '【 Leave the grotto to explore and hunt treasures 】',
            type: 'ACTION_EXPLORE'
          }
        ]
      };
    }
  }

  // ── TRIGGER RANDOM ENCOUNTER EVENT ──
  triggerRandomEvent() {
    const curLevel = this.player.realmIndex;
    const eligibleEvents = CULTIVATION_EVENTS.filter(ev => curLevel >= ev.minLevel && curLevel <= ev.maxLevel);

    if (eligibleEvents.length === 0) {
      this.cultivateOneYear();
      return;
    }

    const chosen = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
    this.currentEvent = chosen;
  }

  // ── EXECUTE CHOICE INTERACTION ──
  executeChoice(choiceIdx) {
    if (!this.currentEvent || !this.currentEvent.choices[choiceIdx]) return null;
    const choice = this.currentEvent.choices[choiceIdx];

    if (choice.type === 'ACTION_CULTIVATE') {
      this.cultivateOneYear();
      return { type: 'CULTIVATE' };
    }

    if (choice.type === 'ACTION_EXPLORE') {
      this.triggerRandomEvent();
      return { type: 'EXPLORE' };
    }

    if (choice.type === 'AUTO') {
      this.applyEffects(choice.successEffects);
      this.addHistory(`[Encounter] ${choice.successText}`);
      this.currentEvent = {
        id: 'ket_qua_ky_ngo',
        title: 'Outcome of Action',
        text: choice.successText,
        choices: [{ text: '【 Continue along the Dao path 】', type: 'ACTION_EXPLORE' }]
      };
      return { type: 'AUTO', success: true };
    }

    if (choice.type === 'STAT_CHECK') {
      const playerVal = this.player[choice.stat] || 0;
      const isSuccess = playerVal >= choice.reqVal || (Math.random() < 0.25); // miracle chance

      if (isSuccess) {
        this.applyEffects(choice.successEffects);
        this.addHistory(`[Success] ${choice.successText}`);
        this.currentEvent = {
          id: 'ket_qua_kiem_tra',
          title: 'Trial Overcome!',
          text: choice.successText,
          choices: [{ text: '【 Move forward 】', type: 'ACTION_EXPLORE' }]
        };
        return { type: 'STAT_CHECK', success: true };
      } else {
        this.applyEffects(choice.failEffects);
        this.addHistory(`[Failed] ${choice.failText}`);

        if (this.player.hp <= 0) {
          this.handleDeath('Injuries were fatal. Meridians shattered in the encounter, perishing on the spot.');
          return { type: 'DEATH' };
        }

        this.currentEvent = {
          id: 'that_bai_thu_thach',
          title: 'Grievously Wounded',
          text: choice.failText,
          choices: [{ text: '【 Return to grotto to recuperate 】', type: 'ACTION_CULTIVATE' }]
        };
        return { type: 'STAT_CHECK', success: false };
      }
    }

    if (choice.type === 'COST_CHECK') {
      const curStones = this.player.stones || 0;
      if (curStones >= choice.costVal) {
        this.player.stones -= choice.costVal;
        this.applyEffects(choice.successEffects);
        this.addHistory(`[Transaction] ${choice.successText}`);
        this.currentEvent = {
          id: 'ket_qua_giao_dich',
          title: 'Transaction Complete',
          text: choice.successText,
          choices: [{ text: '【 Depart from here 】', type: 'ACTION_EXPLORE' }]
        };
        return { type: 'COST_CHECK', success: true };
      } else {
        this.applyEffects(choice.failEffects);
        this.currentEvent = {
          id: 'that_bai_giao_dich',
          title: 'Insufficient Resources',
          text: choice.failText,
          choices: [{ text: '【 Withdraw quietly 】', type: 'ACTION_EXPLORE' }]
        };
        return { type: 'COST_CHECK', success: false };
      }
    }

    if (choice.type === 'COMBAT') {
      const enemy = ENEMIES_CATALOG[choice.enemyId];
      if (!enemy) return null;

      const battleResult = this.combatSim.simulate(this.player, enemy);
      this.player.hp = battleResult.playerHp;

      if (battleResult.winner === 'PLAYER') {
        this.player.exp += battleResult.expReward;
        this.player.stones += battleResult.stonesReward;
        if (battleResult.dropItem) {
          this.player.inventory.push(battleResult.dropItem);
        }
        this.addHistory(`[Vanquished] Defeated [${enemy.name}], earning +${battleResult.expReward} Exp, +${battleResult.stonesReward} Spirit Stones${battleResult.dropItem ? `, obtained [${ITEMS_CATALOG[battleResult.dropItem]?.name}]` : ''}!`);

        this.currentEvent = {
          id: 'chien_thang_chien_dau',
          title: 'Glorious Victory!',
          text: choice.successText,
          choices: [{ text: '【 Collect spoils and depart 】', type: 'ACTION_EXPLORE' }]
        };
        return { type: 'COMBAT', winner: 'PLAYER', logs: battleResult.logs };
      } else if (battleResult.winner === 'REVIVED') {
        this.currentEvent = {
          id: 'hoi_sinh_ky_tich',
          title: 'Miraculous Rebirth!',
          text: 'Shielded by the [Immortal Protective Ward], you escaped death by a hair. Tread carefully on this defiant path!',
          choices: [{ text: '【 Retreat to heal wounds 】', type: 'ACTION_CULTIVATE' }]
        };
        return { type: 'COMBAT', winner: 'REVIVED', logs: battleResult.logs };
      } else if (battleResult.winner === 'ENEMY') {
        this.handleDeath(`Perished under the blades of [${enemy.name}] in a battle to the death.`);
        return { type: 'COMBAT', winner: 'ENEMY', logs: battleResult.logs };
      } else {
        // Draw
        this.addHistory(`[Draw] Clashed evenly with [${enemy.name}], disengaging safely.`);
        this.currentEvent = {
          id: 'hoa_hoan_chien_dau',
          title: 'Even Standoff',
          text: 'Neither side could overcome the other, disengaging safely.',
          choices: [{ text: '【 Return to seclusion 】', type: 'ACTION_CULTIVATE' }]
        };
        return { type: 'COMBAT', winner: 'DRAW', logs: battleResult.logs };
      }
    }

    return null;
  }

  // ── APPLY STAT EFFECTS ──
  applyEffects(eff) {
    if (!eff || !this.player) return;
    if (eff.exp) this.player.exp = Math.max(0, this.player.exp + eff.exp);
    if (eff.stones) this.player.stones = Math.max(0, this.player.stones + eff.stones);
    if (eff.hp) this.player.hp = Math.max(0, Math.min(this.player.maxHp, this.player.hp + eff.hp));
    if (eff.atk) this.player.atk += eff.atk;
    if (eff.def) this.player.def += eff.def;
    if (eff.strike) this.player.strike += eff.strike;
    if (eff.dodge) this.player.dodge += eff.dodge;
    if (eff.skill) this.player.skill += eff.skill;
    if (eff.lifespan) this.player.lifespan += eff.lifespan;

    if (eff.addItem && ITEMS_CATALOG[eff.addItem]) {
      this.player.inventory.push(eff.addItem);
    }

    this.recalculateTotalStats();
  }

  // ── REALM ASCENSION & BREAKTHROUGH ──
  triggerBreakthroughPrompt() {
    const nextRealm = REALMS[this.player.realmIndex + 1];
    if (!nextRealm) return;

    this.currentEvent = {
      id: 'dot_pha_canh_gioi',
      title: `Realm Breakthrough: [${nextRealm.name}]`,
      text: `Your cultivation has reached culmination! Vital Qi roars like ocean waves in your dantian. The moment to shatter mortal shackles has arrived!${nextRealm.tribulation ? ` This breakthrough triggers Heavenly Lightning Tribulation (Estimated damage: ~${nextRealm.tribulationDamage} HP).` : ''}`,
      choices: [
        {
          text: `【 Channel all genuine Qi to break through to ${nextRealm.name} 】`,
          type: 'BREAKTHROUGH_ATTEMPT'
        },
        {
          text: '【 Temporarily hold back to gather more protective elixirs 】',
          type: 'ACTION_CULTIVATE'
        }
      ]
    };
  }

  executeBreakthrough() {
    const nextRealm = REALMS[this.player.realmIndex + 1];
    if (!nextRealm) return false;

    // Tribulation Check
    if (nextRealm.tribulation) {
      let tribDmg = nextRealm.tribulationDamage || 200;
      if (this.player.hasTalent('tien_nhan_ho_the')) tribDmg = Math.round(tribDmg * 0.65);
      tribDmg = Math.max(30, tribDmg - Math.round(this.player.def * 0.45));

      this.player.hp -= tribDmg;

      if (this.player.hp <= 0) {
        this.handleDeath(`Tribulation failed! Heavenly lightning shattered your Dao foundation while attempting to ascend to ${nextRealm.name}.`);
        return false;
      }
    }

    // Success
    this.player.realmIndex++;
    this.player.exp = 0;
    this.player.lifespan = Math.max(this.player.lifespan, nextRealm.lifespan);

    if (this.player.realmIndex > this.highestRealmIndex) {
      this.highestRealmIndex = this.player.realmIndex;
    }

    this.recalculateTotalStats();
    this.player.hp = this.player.maxHp; // Full restore upon breakthrough

    this.addHistory(`[Grand Breakthrough] Dao foundation perfected! Officially stepped into [${nextRealm.name}]. Lifespan extended to ${this.player.lifespan} years!`);

    this.currentEvent = {
      id: 'dot_pha_thanh_cong',
      title: 'Breakthrough Achieved!',
      text: `Bathed in celestial radiance! Your physique undergoes rebirth and divine sense expands outward for miles. You have ascended to [${nextRealm.name}]!`,
      choices: [{ text: '【 Consolidate the new realm 】', type: 'ACTION_CULTIVATE' }]
    };

    return true;
  }

  // ── USE INVENTORY ITEM ──
  useItem(itemId, itemIdx) {
    if (!this.player || !ITEMS_CATALOG[itemId]) return;
    const item = ITEMS_CATALOG[itemId];

    if (item.type === 'CONSUMABLE') {
      if (item.effect.healHp) {
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + item.effect.healHp);
        this.addHistory(`[Used] Ingested ${item.name}, recovering +${item.effect.healHp} HP.`);
      }
      if (item.effect.healHpPercent) {
        this.player.hp = this.player.maxHp;
        this.addHistory(`[Used] Ingested ${item.name}, fully restoring all HP!`);
      }
      if (item.effect.addExp) {
        this.player.exp += item.effect.addExp;
        this.addHistory(`[Refined] Refined ${item.name}, gaining +${item.effect.addExp} Cultivation Exp.`);
      }
      if (item.effect.addLifespan) {
        this.player.lifespan += item.effect.addLifespan;
        this.addHistory(`[Ingested] Ingested ${item.name}, extending lifespan by +${item.effect.addLifespan} years!`);
      }

      this.player.inventory.splice(itemIdx, 1);
      this.recalculateTotalStats();
    } else if (item.type === 'WEAPON') {
      const old = this.player.equipment.weapon;
      this.player.equipment.weapon = item;
      this.player.inventory.splice(itemIdx, 1);
      if (old) this.player.inventory.push(old.id);
      this.addHistory(`[Equipped] Wielding [${item.name}], battle aura surges!`);
      this.recalculateTotalStats();
    } else if (item.type === 'ARMOR') {
      const old = this.player.equipment.armor;
      this.player.equipment.armor = item;
      this.player.inventory.splice(itemIdx, 1);
      if (old) this.player.inventory.push(old.id);
      this.addHistory(`[Equipped] Donning [${item.name}], defense solidified!`);
      this.recalculateTotalStats();
    } else if (item.type === 'MANUAL') {
      const old = this.player.equipment.manual;
      this.player.equipment.manual = item;
      this.player.inventory.splice(itemIdx, 1);
      if (old) this.player.inventory.push(old.id);
      this.addHistory(`[Attuned] Set [${item.name}] as destiny manual, Dao laws resonate!`);
      this.recalculateTotalStats();
    }
  }

  // ── DEATH & REINCARNATION CYCLE ──
  handleDeath(reason) {
    this.totalReincarnations++;
    const curRealm = REALMS[this.player.realmIndex];

    // Calculate Heritage Points
    const earnedPoints = Math.round(
      (this.player.age * 0.8) +
      (this.player.realmIndex * 30) +
      (this.player.stones * 0.05) +
      (this.eventHistory.length * 2)
    );

    this.heritagePoints += earnedPoints;
    this.saveGlobalHeritage();

    this.currentEvent = {
      id: 'toa_hoa_luan_hoi',
      title: 'Reincarnation Cycle: Life Concluded',
      text: `[Dao Trail Fallen] ${this.player.name} ended the mortal journey at age ${this.player.age}. Cause: ${reason}\n\nLife Summary:\n- Age achieved: ${this.player.age} years\n- Realm attained: ${curRealm.name}\n- Heritage conversion: +${earnedPoints} Heritage Points`,
      choices: [
        {
          text: '【 Enter Reincarnation Hall to prepare next rebirth 】',
          type: 'OPEN_REINCARNATION_HALL'
        }
      ]
    };

    this.addHistory(`[Fallen] ${reason} Reached age ${this.player.age}. True soul returns to the reincarnation cycle.`);
  }

  addHistory(entry) {
    this.eventHistory.unshift(entry);
    if (this.eventHistory.length > 50) this.eventHistory.pop();
  }
}

if (typeof window !== 'undefined') {
  window.TuTienEngine = TuTienEngine;
}
if (typeof module !== 'undefined') {
  module.exports = { TuTienEngine };
}
