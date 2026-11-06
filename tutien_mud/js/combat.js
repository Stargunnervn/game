// ============================================================================
// HỆ THỐNG CHIẾN ĐẤU TEXT-LOG TỰ ĐỘNG (AUTO TEXT-LOG COMBAT SIMULATION)
// ============================================================================

class CombatSimulator {
  constructor() {
    this.logs = [];
  }

  simulate(player, enemyData) {
    this.logs = [];
    const enemy = { ...enemyData, hp: enemyData.hp || enemyData.maxHp };
    let playerHp = Math.max(1, player.hp);
    let enemyHp = enemy.hp;

    this.addLog(`[KHAI CHIẾN] Bạn tao ngộ cường địch: [${enemy.name} - ${enemy.title}]!`, 'info');
    this.addLog(`Địch thủ: Khí Huyết ${enemyHp}/${enemy.maxHp} • Công Kích ${enemy.atk} • Phòng Ngự ${enemy.def}`, 'info');

    let turn = 1;
    const maxTurns = 30;

    // Determine Initiative based on Dodge/Agility and Skill
    const playerSpeed = (player.dodge || 10) + (player.skill || 10);
    const enemySpeed = (enemy.dodge || 10) + (enemy.skill || 10);
    let playerTurnFirst = playerSpeed >= enemySpeed;

    while (playerHp > 0 && enemyHp > 0 && turn <= maxTurns) {
      this.addLog(`--- Hiệp Thứ ${turn} ---`, 'turn-header');

      if (playerTurnFirst) {
        // Player attacks first
        enemyHp = this.executePlayerAttack(player, enemy, enemyHp);
        if (enemyHp <= 0) break;

        playerHp = this.executeEnemyAttack(player, enemy, playerHp);
        if (playerHp <= 0) break;
      } else {
        // Enemy attacks first
        playerHp = this.executeEnemyAttack(player, enemy, playerHp);
        if (playerHp <= 0) break;

        enemyHp = this.executePlayerAttack(player, enemy, enemyHp);
        if (enemyHp <= 0) break;
      }

      turn++;
    }

    if (enemyHp <= 0) {
      this.addLog(`[ĐẠI THẮNG] [${enemy.name}] trúng một kích chí mạng gục ngã trong vũng máu, khí tức tiêu tán!`, 'victory');
      const expReward = Math.round(enemy.dropExp * (player.hasTalent('thon_phe_ma_cong') ? 1.25 : 1.0));
      const stonesReward = enemy.dropStones || 15;
      const dropItem = enemy.dropItem || null;

      // Lifesteal talent
      if (player.hasTalent('thon_phe_ma_cong')) {
        const heal = Math.round(player.maxHp * 0.15);
        playerHp = Math.min(player.maxHp, playerHp + heal);
        this.addLog(`[Thôn Phệ Ma Công] Bạn hấp thụ một tia huyết phách của kẻ địch, hồi phục ${heal} Khí Huyết!`, 'heal');
      }

      return {
        winner: 'PLAYER',
        logs: this.logs,
        playerHp: Math.max(1, playerHp),
        expReward,
        stonesReward,
        dropItem
      };
    } else if (playerHp <= 0) {
      // Check Revive Talent
      if (player.hasTalent('tien_nhan_ho_the') && !player.reviveUsed) {
        player.reviveUsed = true;
        playerHp = Math.round(player.maxHp * 0.5);
        this.addLog(`[Tiên Nhân Hộ Thể] Hộ phù tổ truyền vỡ nát phát ra hào quang bảo vệ tâm mạch, bạn trùng sinh với 50% Khí Huyết!`, 'heal');
        return {
          winner: 'REVIVED',
          logs: this.logs,
          playerHp: playerHp,
          expReward: 0,
          stonesReward: 0,
          dropItem: null
        };
      }

      this.addLog(`[TỬ CHIẾN THẤT BẠI] Bạn bị [${enemy.name}] phá vỡ hộ thân cương khí, trọng thương ngã xuống!`, 'defeat');
      return {
        winner: 'ENEMY',
        logs: this.logs,
        playerHp: 0,
        expReward: 0,
        stonesReward: 0,
        dropItem: null
      };
    } else {
      // Draw / Standoff after 30 turns
      this.addLog(`[HÒA HOÃN] Hai bên đấu pháp kịch liệt ba mươi hiệp không phân thắng bại, đồng thời nhảy lùi lại thoát khỏi chiến cuộc!`, 'info');
      return {
        winner: 'DRAW',
        logs: this.logs,
        playerHp: Math.max(1, playerHp),
        expReward: Math.round(enemy.dropExp * 0.4),
        stonesReward: Math.round((enemy.dropStones || 10) * 0.3),
        dropItem: null
      };
    }
  }

  executePlayerAttack(player, enemy, enemyHp) {
    // 1. Dodge Check
    const dodgeChance = Math.min(0.35, Math.max(0.05, (enemy.dodge - (player.skill * 0.2)) / 100));
    if (Math.random() < dodgeChance) {
      this.addLog(`[Né Tránh] Bạn vung pháp khí trảm kích, nhưng [${enemy.name}] thân pháp quỷ dị né tránh vào hư không!`, 'dodge');
      return enemyHp;
    }

    // 2. Critical Strike Check
    const critChance = Math.min(0.65, Math.max(0.05, (player.strike || 5) / 100));
    const isCrit = Math.random() < critChance;

    // 3. Base Damage formula
    const pAtk = player.atk || 15;
    const eDef = enemy.def || 8;
    let baseDmg = Math.max(4, Math.round((pAtk * (isCrit ? 1.85 : 1.0)) - (eDef * 0.52)));

    // Variance 0.9 - 1.15
    baseDmg = Math.max(3, Math.round(baseDmg * (0.9 + Math.random() * 0.25)));

    enemyHp = Math.max(0, enemyHp - baseDmg);

    if (isCrit) {
      this.addLog(`[BẠO KÍCH TRÍ MẠNG] Kiếm khí bùng nổ xuyên thủng điểm yếu! Bạn gây [${baseDmg}] sát thương lên [${enemy.name}]! (Còn ${enemyHp}/${enemy.maxHp} HP)`, 'player-crit');
    } else {
      this.addLog(`[Tấn Công] Bạn xuất chiêu chém tới, gây [${baseDmg}] sát thương lên [${enemy.name}]. (Còn ${enemyHp}/${enemy.maxHp} HP)`, 'player-hit');
    }

    // Double strike manual effect (Thai At Kiem Kinh)
    if (player.hasItem && player.hasItem('thai_at_kiem_quyet') && Math.random() < 0.28) {
      const extraDmg = Math.round(baseDmg * 0.65);
      enemyHp = Math.max(0, enemyHp - extraDmg);
      this.addLog(`[Thái Ất Kiếm Khí] Kiếm phổ phát động đạo kiếm khí thứ hai xé gió, chém thêm [${extraDmg}] sát thương!`, 'player-crit');
    }

    return enemyHp;
  }

  executeEnemyAttack(player, enemy, playerHp) {
    // 1. Dodge Check
    const dodgeChance = Math.min(0.40, Math.max(0.05, (player.dodge - (enemy.skill * 0.2)) / 100));
    if (Math.random() < dodgeChance) {
      this.addLog(`[Né Tránh Tuyệt Diệu] [${enemy.name}] hung hăng bổ nhào tới, bạn thân tựa du long nhẹ nhàng lách người né tránh an toàn!`, 'dodge');

      // Counter attack from Bat Hoang Du Long Bo
      if (player.hasItem && player.hasItem('bat_hoang_du_long')) {
        const counterDmg = Math.max(5, Math.round(player.atk * 0.5));
        enemy.hp = Math.max(0, enemy.hp - counterDmg);
        this.addLog(`[Du Long Phản Kích] Lợi dụng đối phương mất đà, bạn trở tay vung một kiếm phản kích gây [${counterDmg}] sát thương!`, 'player-hit');
      }

      return playerHp;
    }

    // 2. Special Skill of Enemy
    const hasSpecial = enemy.specialSkill && Math.random() < (enemy.specialSkill.chance || 0.25);
    const eAtk = enemy.atk || 12;
    const pDef = player.def || 6;
    const dmgMult = hasSpecial ? enemy.specialSkill.dmgMult : (Math.random() < (enemy.strike / 100) ? 1.6 : 1.0);

    let baseDmg = Math.max(3, Math.round((eAtk * dmgMult) - (pDef * 0.48)));
    baseDmg = Math.max(2, Math.round(baseDmg * (0.88 + Math.random() * 0.24)));

    playerHp = Math.max(0, playerHp - baseDmg);

    if (hasSpecial) {
      this.addLog(`[KỸ NĂNG ĐỊCH] [${enemy.name}] rống giận thi triển [${enemy.specialSkill.name}], oanh kích bạn nhận [${baseDmg}] sát thương! (Còn ${playerHp}/${player.maxHp} HP)`, 'enemy-crit');
      if (enemy.specialSkill.lifesteal) {
        const stolen = Math.round(baseDmg * enemy.specialSkill.lifesteal);
        enemy.hp = Math.min(enemy.maxHp, enemy.hp + stolen);
        this.addLog(`[Hút Máu] Đối thủ hấp thu sinh khí, hồi phục ${stolen} Khí Huyết!`, 'enemy-hit');
      }
    } else {
      this.addLog(`[Địch Đánh Trúng] [${enemy.name}] vung trảo kích trúng hộ thể linh quang, bạn chịu [${baseDmg}] tổn thất. (Còn ${playerHp}/${player.maxHp} HP)`, 'enemy-hit');
    }

    return playerHp;
  }

  addLog(text, type = 'normal') {
    this.logs.push({ text, type });
  }
}

if (typeof window !== 'undefined') {
  window.CombatSimulator = CombatSimulator;
}
if (typeof module !== 'undefined') {
  module.exports = { CombatSimulator };
}

