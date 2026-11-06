// ============================================================================
// BỘ NÃO QUẢN LÝ VÒNG LẶP TU TIÊN MUD (CULTIVATION MUD ENGINE)
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

  // ── LƯU TRỮ VĨNH VIỄN DI SẢN LUÂN HỒI (LOCALSTORAGE) ──
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

  // ── KHỞI TẠO KIẾP SỐNG MỚI (NEW REINCARNATION) ──
  createNewLife(customName, selectedTalentIds = []) {
    const defaultNames = ['Hàn Lập', 'Bạch Tiểu Thuần', 'Cố Trường Sinh', 'Lăng Tiêu', 'Mộ Dung Trần', 'Diệp Phàm', 'Sở Phong'];
    const finalName = (customName && customName.trim()) ? customName.trim() : defaultNames[Math.floor(Math.random() * defaultNames.length)];

    // Roll Background
    const bg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    // Roll Spirit Root (Weighted based on unlocked heritage)
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

    this.addHistory(`[Khởi Điểm Tiên Lộ] Năm 16 tuổi, ${this.player.name} mang xuất thân [${bg.name}], thức tỉnh [${spiritRoot.name}]. Rời khỏi cố hương, chính thức bước chân vào con đường nghịch thiên tu hành!`);

    this.triggerInitialWelcomeEvent();
  }

  // ── TÍNH TOÁN LẠI TỔNG CHỈ SỐ KHI THAY ĐỒ ──
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

  // ── SỰ KIỆN KHỞI ĐẦU ──
  triggerInitialWelcomeEvent() {
    this.currentEvent = {
      id: 'khoi_dau_tien_duyen',
      title: 'Thiên Duyên Khởi Điểm',
      text: `Gió lạnh thổi qua sườn núi Thanh Vân. Bạn đứng trước tấm bia đá phân ranh giới giữa cõi phàm và tiên môn. Trong tay áo bạn chỉ có vài hạt linh đan sơ cấp cùng một viên truyền tống ngọc giản tàn khuyết. Con đường tu chân vô tận phía trước đang rộng mở đón chờ!`,
      choices: [
        {
          text: '【 Tìm một nơi thanh tịnh đả tọa thổ nạp tu luyện 】',
          type: 'AUTO',
          successText: 'Bạn tìm thấy một thạch động hẻo lánh kín gió, xếp bằng thổ nạp linh khí thiên địa suốt một năm đầu đời. Chân khí lưu chuyển, tu vi khẽ tăng tiến!',
          successEffects: { exp: 60, lifespan: 0, stones: 10 }
        },
        {
          text: '【 Xuống núi đi dạo phường thị tìm hiểu tin tức 】',
          type: 'AUTO',
          successText: 'Hòa vào dòng người tu sĩ tấp nập tại phường thị chân núi, bạn nghe ngóng được vô số lời đồn về bảo tàng và bí cảnh viễn cổ, tầm mắt mở rộng.',
          successEffects: { skill: 4, stones: 20, exp: 30 }
        }
      ]
    };
  }

  // ── HÀNH ĐỘNG: TĨNH TỌA TU LUYỆN 1 NĂM (PASS TIME / MEDITATE) ──
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

    // Natural small stone / resource gathering
    const earnedStones = Math.floor(Math.random() * 8) + 4;
    this.player.stones += earnedStones;

    // Heal 25% max HP naturally when meditating
    this.player.hp = Math.min(this.player.maxHp, this.player.hp + Math.round(this.player.maxHp * 0.25));

    this.addHistory(`[Năm ${this.player.age} Tuổi] Tĩnh tọa thổ nạp linh khí trọn một năm, tích lũy thêm +${gainedExp} Tu Vi và +${earnedStones} Linh Thạch.`);

    // Check Lifespan exhaustion (Tọa hóa chết già)
    if (this.player.age >= this.player.lifespan) {
      this.handleDeath('Thọ nguyên cạn kiệt, chưa kịp phá cảnh đã tọa hóa quy thiên.');
      return;
    }

    // Check Auto-Breakthrough readiness
    if (this.player.exp >= curRealm.expRequired && this.player.realmIndex < REALMS.length - 1) {
      this.triggerBreakthroughPrompt();
      return;
    }

    // 60% chance to trigger a random world event
    if (Math.random() < 0.65) {
      this.triggerRandomEvent();
    } else {
      this.currentEvent = {
        id: 'tinh_toa_an_nhien',
        title: 'Tu Luyện Tĩnh Lặng',
        text: `Năm thứ ${this.player.age} trôi qua êm đềm như nước chảy. Bạn bế quan đả tọa, lắng nghe tiếng thông reo và cảm ngộ tuần hoàn thiên địa, tu vi ngày một thâm hậu.`,
        choices: [
          {
            text: '【 Tiếp tục bế quan khổ tu thêm một năm 】',
            type: 'ACTION_CULTIVATE'
          },
          {
            text: '【 Rời động phủ xuất ngoại tầm bảo lịch luyện 】',
            type: 'ACTION_EXPLORE'
          }
        ]
      };
    }
  }

  // ── KÍCH HOẠT SỰ KIỆN KỲ NGỘ NGẪU NHIÊN ──
  triggerRandomEvent() {
    const curLevel = this.player.realmIndex;
    const eligibleEvents = CULTIVATION_EVENTS.filter(ev => curLevel >= ev.minLevel && curLevel <= ev.maxLevel);

    if (eligibleEvents.length === 0) {
      this.cultivateOneYear();
      return;
    }

    // Luck perk bonus
    const chosen = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
    this.currentEvent = chosen;
  }

  // ── XỬ LÝ LỰA CHỌN PHÂN NHÁNH CỦA NGƯỜI CHƠI ──
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
      this.addHistory(`[Kỳ Ngộ] ${choice.successText}`);
      this.currentEvent = {
        id: 'ket_qua_ky_ngo',
        title: 'Kết Quả Hành Động',
        text: choice.successText,
        choices: [{ text: '【 Tiếp tục hành trình tu đạo 】', type: 'ACTION_EXPLORE' }]
      };
      return { type: 'AUTO', success: true };
    }

    if (choice.type === 'STAT_CHECK') {
      const playerVal = this.player[choice.stat] || 0;
      const isSuccess = playerVal >= choice.reqVal || (Math.random() < 0.25); // small miracle chance

      if (isSuccess) {
        this.applyEffects(choice.successEffects);
        this.addHistory(`[Thành Công] ${choice.successText}`);
        this.currentEvent = {
          id: 'ket_qua_kiem_tra',
          title: 'Vượt Qua Thử Thách!',
          text: choice.successText,
          choices: [{ text: '【 Tiếp tục cất bước 】', type: 'ACTION_EXPLORE' }]
        };
        return { type: 'STAT_CHECK', success: true };
      } else {
        this.applyEffects(choice.failEffects);
        this.addHistory(`[Thất Bại] ${choice.failText}`);

        if (this.player.hp <= 0) {
          this.handleDeath('Thương thế quá nặng, kinh mạch vỡ nát tử trận trong kỳ ngộ.');
          return { type: 'DEATH' };
        }

        this.currentEvent = {
          id: 'that_bai_thu_thach',
          title: 'Thất Bại Trọng Thương',
          text: choice.failText,
          choices: [{ text: '【 Trở về động phủ dưỡng thương 】', type: 'ACTION_CULTIVATE' }]
        };
        return { type: 'STAT_CHECK', success: false };
      }
    }

    if (choice.type === 'COST_CHECK') {
      const curStones = this.player.stones || 0;
      if (curStones >= choice.costVal) {
        this.player.stones -= choice.costVal;
        this.applyEffects(choice.successEffects);
        this.addHistory(`[Giao Dịch] ${choice.successText}`);
        this.currentEvent = {
          id: 'ket_qua_giao_dich',
          title: 'Giao Dịch Hoàn Tất',
          text: choice.successText,
          choices: [{ text: '【 Rời khỏi nơi này 】', type: 'ACTION_EXPLORE' }]
        };
        return { type: 'COST_CHECK', success: true };
      } else {
        this.applyEffects(choice.failEffects);
        this.currentEvent = {
          id: 'that_bai_giao_dich',
          title: 'Không Đủ Tài Nguyên',
          text: choice.failText,
          choices: [{ text: '【 Lặng lẽ lui ra 】', type: 'ACTION_EXPLORE' }]
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
        this.addHistory(`[Trảm Sát] Đánh bại [${enemy.name}], nhận +${battleResult.expReward} Tu Vi, +${battleResult.stonesReward} Linh Thạch${battleResult.dropItem ? `, thu hoạch [${ITEMS_CATALOG[battleResult.dropItem]?.name}]` : ''}!`);

        this.currentEvent = {
          id: 'chien_thang_chien_dau',
          title: 'Đại Thắng Cường Địch!',
          text: choice.successText,
          choices: [{ text: '【 Thu thập chiến lợi phẩm, rời đi 】', type: 'ACTION_EXPLORE' }]
        };
        return { type: 'COMBAT', winner: 'PLAYER', logs: battleResult.logs };
      } else if (battleResult.winner === 'REVIVED') {
        this.currentEvent = {
          id: 'hoi_sinh_ky_tich',
          title: 'Trùng Sinh Huyền Kỳ!',
          text: 'Nhờ bảo vật [Tiên Nhân Hộ Thể] che chở, bạn thoát chết trong gang tấc. Hãy cẩn trọng hơn trên con đường nghịch thiên!',
          choices: [{ text: '【 Rút lui dưỡng thương 】', type: 'ACTION_CULTIVATE' }]
        };
        return { type: 'COMBAT', winner: 'REVIVED', logs: battleResult.logs };
      } else if (battleResult.winner === 'ENEMY') {
        this.handleDeath(`Tử trận dưới tay [${enemy.name}] trong trận sinh tử đại chiến.`);
        return { type: 'COMBAT', winner: 'ENEMY', logs: battleResult.logs };
      } else {
        // Draw
        this.addHistory(`[Bất Phân Thắng Bại] Đấu pháp cầm hòa cùng [${enemy.name}], rút lui an toàn.`);
        this.currentEvent = {
          id: 'hoa_hoan_chien_dau',
          title: 'Hòa Hoãn Bất Phân Thắng Bại',
          text: 'Hai bên bất phân thắng bại, đồng thời thu kiếm rút lui an toàn.',
          choices: [{ text: '【 Tiếp tục bế quan 】', type: 'ACTION_CULTIVATE' }]
        };
        return { type: 'COMBAT', winner: 'DRAW', logs: battleResult.logs };
      }
    }

    return null;
  }

  // ── ÁP DỤNG HIỆU ỨNG TĂNG GIẢM CHỈ SỐ ──
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

  // ── ĐỘT PHÁ CẢNH GIỚI (REALM ASCENSION) ──
  triggerBreakthroughPrompt() {
    const nextRealm = REALMS[this.player.realmIndex + 1];
    if (!nextRealm) return;

    this.currentEvent = {
      id: 'dot_pha_canh_gioi',
      title: `Đột Phá Cảnh Giới: [${nextRealm.name}]`,
      text: `Tu vi của bạn đã đạt đến cảnh giới viên mãn! Khí hải cuộn trào tựa sóng biển gầm rú. Thời khắc phá vỡ gông cùm phàm thể đã tới!${nextRealm.tribulation ? ` Cảnh giới này dẫn phát Thiên Kiếp Lôi Đình (sát thương dự kiến: ~${nextRealm.tribulationDamage} HP).` : ''}`,
      choices: [
        {
          text: `【 Vận toàn lực đả thông kinh mạch đột phá lên ${nextRealm.name} 】`,
          type: 'BREAKTHROUGH_ATTEMPT'
        },
        {
          text: '【 Cố nén tu vi, tích lũy thêm đan dược trước khi phá cảnh 】',
          type: 'ACTION_CULTIVATE'
        }
      ]
    };
  }

  executeBreakthrough() {
    const curRealm = REALMS[this.player.realmIndex];
    const nextRealm = REALMS[this.player.realmIndex + 1];
    if (!nextRealm) return false;

    // Tribulation Check
    if (nextRealm.tribulation) {
      let tribDmg = nextRealm.tribulationDamage || 200;
      // Talent resistance
      if (this.player.hasTalent('tien_nhan_ho_the')) tribDmg = Math.round(tribDmg * 0.65);
      // Defense absorption
      tribDmg = Math.max(30, tribDmg - Math.round(this.player.def * 0.45));

      this.player.hp -= tribDmg;

      if (this.player.hp <= 0) {
        this.handleDeath(`Độ kiếp thất bại! Thiên lôi đánh nát đạo cơ, hồn phi phách tán khi cố gắng đột phá ${nextRealm.name}.`);
        return false;
      }
    }

    // Success!
    this.player.realmIndex++;
    this.player.exp = 0;
    this.player.lifespan = Math.max(this.player.lifespan, nextRealm.lifespan);

    if (this.player.realmIndex > this.highestRealmIndex) {
      this.highestRealmIndex = this.player.realmIndex;
    }

    this.recalculateTotalStats();
    this.player.hp = this.player.maxHp; // Full restore upon breakthrough

    this.addHistory(`[Đại Đột Phá] Đạo cơ viên mãn! Chính thức bước chân vào cảnh giới [${nextRealm.name}]. Thọ nguyên tăng lên ${this.player.lifespan} tuổi!`);

    this.currentEvent = {
      id: 'dot_pha_thanh_cong',
      title: 'Đột Phá Thành Công!',
      text: `Tiên quang tắm rửa toàn thân! Thể phách lột xác thoát thai hoán cốt, linh thức khuếch tán ra ngoài mười dặm. Bạn đã chính thức bước lên tầng thứ [${nextRealm.name}]!`,
      choices: [{ text: '【 Củng cố cảnh giới mới 】', type: 'ACTION_CULTIVATE' }]
    };

    return true;
  }

  // ── SỬ DỤNG VẬT PHẨM (USE INVENTORY ITEM) ──
  useItem(itemId, itemIdx) {
    if (!this.player || !ITEMS_CATALOG[itemId]) return;
    const item = ITEMS_CATALOG[itemId];

    if (item.type === 'CONSUMABLE') {
      if (item.effect.healHp) {
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + item.effect.healHp);
        this.addHistory(`[Sử Dụng] Uống ${item.name}, hồi phục +${item.effect.healHp} Khí Huyết.`);
      }
      if (item.effect.healHpPercent) {
        this.player.hp = this.player.maxHp;
        this.addHistory(`[Sử Dụng] Uống ${item.name}, toàn bộ Khí Huyết hoàn toàn hồi phục!`);
      }
      if (item.effect.addExp) {
        this.player.exp += item.effect.addExp;
        this.addHistory(`[Sử Dụng] Luyện hóa ${item.name}, nhận thêm +${item.effect.addExp} Tu Vi.`);
      }
      if (item.effect.addLifespan) {
        this.player.lifespan += item.effect.addLifespan;
        this.addHistory(`[Sử Dụng] Uống ${item.name}, thọ mệnh kéo dài thêm +${item.effect.addLifespan} năm!`);
      }

      this.player.inventory.splice(itemIdx, 1);
      this.recalculateTotalStats();
    } else if (item.type === 'WEAPON') {
      const old = this.player.equipment.weapon;
      this.player.equipment.weapon = item;
      this.player.inventory.splice(itemIdx, 1);
      if (old) this.player.inventory.push(old.id);
      this.addHistory(`[Trang Bị] Tay cầm [${item.name}], sát khí bừng bừng!`);
      this.recalculateTotalStats();
    } else if (item.type === 'ARMOR') {
      const old = this.player.equipment.armor;
      this.player.equipment.armor = item;
      this.player.inventory.splice(itemIdx, 1);
      if (old) this.player.inventory.push(old.id);
      this.addHistory(`[Trang Bị] Mặc lên [${item.name}], phòng ngự gia cố vững chắc!`);
      this.recalculateTotalStats();
    } else if (item.type === 'MANUAL') {
      const old = this.player.equipment.manual;
      this.player.equipment.manual = item;
      this.player.inventory.splice(itemIdx, 1);
      if (old) this.player.inventory.push(old.id);
      this.addHistory(`[Lĩnh Ngộ] Đặt [${item.name}] làm công pháp bản mệnh, pháp tắc nhập thể!`);
      this.recalculateTotalStats();
    }
  }

  // ── TỌA HÓA / TỬ TRẬN & TỔNG KẾT LUÂN HỒI (DEATH & REINCARNATION) ──
  handleDeath(reason) {
    this.totalReincarnations++;
    const curRealm = REALMS[this.player.realmIndex];

    // Calculate Heritage Points (Đạo Ngân)
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
      title: 'Tọa Hóa Luân Hồi - Kết Thúc Kiếp Này',
      text: `[Đạo Lộ Vẫn Lạc] ${this.player.name} tại năm ${this.player.age} tuổi đã dừng lại bước chân trên con đường tu tiên. Nguyên nhân: ${reason}\n\nTổng kết kiếp này:\n- Tuổi thọ đạt được: ${this.player.age} năm\n- Cảnh giới đạt tới: ${curRealm.name}\n- Điểm Đạo Ngân quy đổi: +${earnedPoints} Điểm Di Sản Luân Hồi`,
      choices: [
        {
          text: '【 Bước vào Luân Hồi Điện chuẩn bị chuyển thế kiếp sau 】',
          type: 'OPEN_REINCARNATION_HALL'
        }
      ]
    };

    this.addHistory(`[Vẫn Lạc] ${reason} Hưởng thọ ${this.player.age} tuổi. Chân linh quy về luân hồi.`);
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

