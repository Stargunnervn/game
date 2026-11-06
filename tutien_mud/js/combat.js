// ============================================================================
// AUTOMATED TEXT-LOG COMBAT SIMULATOR
// Zero emojis, Zero em dashes.
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

    this.addLog(`[BATTLE ENGAGED] You confront a lethal adversary: [${enemy.name} - ${enemy.title}]!`, 'info');
    this.addLog(`Foe: HP ${enemyHp}/${enemy.maxHp} • Attack ${enemy.atk} • Defense ${enemy.def}`, 'info');

    let turn = 1;
    const maxTurns = 30;

    // Determine Initiative based on Dodge/Agility and Skill
    const playerSpeed = (player.dodge || 10) + (player.skill || 10);
    const enemySpeed = (enemy.dodge || 10) + (enemy.skill || 10);
    let playerTurnFirst = playerSpeed >= enemySpeed;

    while (playerHp > 0 && enemyHp > 0 && turn <= maxTurns) {
      this.addLog(`--- Round ${turn} ---`, 'turn-header');

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
      this.addLog(`[VICTORY] [${enemy.name}] suffers a fatal strike and collapses in defeat, its spiritual aura extinguished!`, 'victory');
      const expReward = Math.round(enemy.dropExp * (player.hasTalent('thon_phe_ma_cong') ? 1.25 : 1.0));
      const stonesReward = enemy.dropStones || 15;
      const dropItem = enemy.dropItem || null;

      // Lifesteal talent
      if (player.hasTalent('thon_phe_ma_cong')) {
        const heal = Math.round(player.maxHp * 0.15);
        playerHp = Math.min(player.maxHp, playerHp + heal);
        this.addLog(`[Devouring Scripture] You siphon a wisp of vital essence, restoring ${heal} HP!`, 'heal');
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
        this.addLog(`[Immortal Protective Ward] Your ancestral talisman shatters with blinding light, resuscitating you with 50% HP!`, 'heal');
        return {
          winner: 'REVIVED',
          logs: this.logs,
          playerHp: playerHp,
          expReward: 0,
          stonesReward: 0,
          dropItem: null
        };
      }

      this.addLog(`[DEFEATED] Your protective Qi breaks under [${enemy.name}] onslaught. You fall severely wounded!`, 'defeat');
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
      this.addLog(`[STANDOFF] Both combatants clash fiercely for thirty rounds without a victor and disengage safely.`, 'info');
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
      this.addLog(`[DODGED] You swing your weapon, but [${enemy.name}] blurs into afterimages and evades cleanly!`, 'dodge');
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
      this.addLog(`[CRITICAL HIT] Surging Sword Qi pierces a vital node! You inflict [${baseDmg}] damage upon [${enemy.name}]! (${enemyHp}/${enemy.maxHp} HP left)`, 'player-crit');
    } else {
      this.addLog(`[ATTACK] You strike forward, dealing [${baseDmg}] damage to [${enemy.name}]. (${enemyHp}/${enemy.maxHp} HP left)`, 'player-hit');
    }

    // Double strike manual effect (Taiyi Sword Canon)
    if (player.hasItem && player.hasItem('thai_at_kiem_quyet') && Math.random() < 0.28) {
      const extraDmg = Math.round(baseDmg * 0.65);
      enemyHp = Math.max(0, enemyHp - extraDmg);
      this.addLog(`[Taiyi Sword Qi] A secondary blade aura tears through the air, inflicting an extra [${extraDmg}] damage!`, 'player-crit');
    }

    return enemyHp;
  }

  executeEnemyAttack(player, enemy, playerHp) {
    // 1. Dodge Check
    const dodgeChance = Math.min(0.40, Math.max(0.05, (player.dodge - (enemy.skill * 0.2)) / 100));
    if (Math.random() < dodgeChance) {
      this.addLog(`[PERFECT DODGE] [${enemy.name}] lunges savagely, but you glide aside like an ethereal dragon!`, 'dodge');

      // Counter attack from Eight Desolations Dragon Footwork
      if (player.hasItem && player.hasItem('bat_hoang_du_long')) {
        const counterDmg = Math.max(5, Math.round(player.atk * 0.5));
        enemy.hp = Math.max(0, enemy.hp - counterDmg);
        this.addLog(`[Dragon Glide Counter] Capitalizing on the enemy miss, your backhand counter-strike inflicts [${counterDmg}] damage!`, 'player-hit');
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
      this.addLog(`[ENEMY SKILL] [${enemy.name}] roars and executes [${enemy.specialSkill.name}], striking you for [${baseDmg}] damage! (${playerHp}/${player.maxHp} HP left)`, 'enemy-crit');
      if (enemy.specialSkill.lifesteal) {
        const stolen = Math.round(baseDmg * enemy.specialSkill.lifesteal);
        enemy.hp = Math.min(enemy.maxHp, enemy.hp + stolen);
        this.addLog(`[Lifesteal] Foe drains your vitality, recovering ${stolen} HP!`, 'enemy-hit');
      }
    } else {
      this.addLog(`[FOE STRIKES] [${enemy.name}] lands a blow upon your protective barrier, dealing [${baseDmg}] damage. (${playerHp}/${player.maxHp} HP left)`, 'enemy-hit');
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
