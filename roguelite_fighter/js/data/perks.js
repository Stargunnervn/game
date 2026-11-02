// ============================================================================
// ROGUELITE PERKS, BLESSINGS & SANCTUARY SHOP RELICS
// ============================================================================

const ROGUELITE_PERKS = [
  {
    id: 'ki_battery',
    name: 'Ki Battery Core',
    icon: '⚡',
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Max Super SP increased by +25. Start every combat round with +15 SP.'
  },
  {
    id: 'weakpoint_hunter',
    name: 'Weakpoint Hunter',
    icon: '🎯',
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Striking enemy weakpoints deals +35% bonus damage and generates +8 SP.'
  },
  {
    id: 'titan_vitality',
    name: 'Titan Vitality',
    icon: '❤️',
    type: 'PASSIVE',
    tier: 'common',
    desc: 'Max HP permanently increased by +35. Fully restores health.'
  },
  {
    id: 'momentum_engine',
    name: 'Momentum Engine',
    icon: '🚀',
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Executing a Dash or Jump increases your next attack damage by +25%.'
  },
  {
    id: 'iron_parry',
    name: 'Iron Retaliation',
    icon: '🛡️',
    type: 'PASSIVE',
    tier: 'common',
    desc: 'Successful Parry or Block reflects 12 unblockable damage back at the attacker.'
  },
  {
    id: 'phantom_dash',
    name: 'Phantom Trap Dash',
    icon: '💥',
    type: 'PASSIVE',
    tier: 'legendary',
    desc: 'Dashing leaves behind a lingering kinetic blast mine that detonates for 32 damage.'
  },
  {
    id: 'tactical_foresight',
    name: 'Tactical Foresight',
    icon: '👁️',
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Always gain +2 Frame Advantage on Neutral reset (Turn 1 and post-knockdowns).'
  },
  {
    id: 'vampiric_edge',
    name: 'Soul Siphon',
    icon: '🩸',
    type: 'PASSIVE',
    tier: 'legendary',
    desc: 'Landing a weakpoint strike restores 10% of dealt damage directly as HP.'
  }
];

// ── SANCTUARY SHOP RELICS (REPLACED REDUNDANT 50% HP HEAL) ──
const SHOP_RELICS = [
  {
    id: 'dragon_bone_charm',
    name: 'Dragon Bone Charm',
    icon: '🦴',
    cost: 110,
    desc: 'Permanently increases Max HP by +45. Toughened bone forged in dragon flame.'
  },
  {
    id: 'ki_reactor_core',
    name: 'Overcharged Ki Reactor',
    icon: '🔋',
    cost: 130,
    desc: 'Start every battle with +40 Super SP ready to unleash devastating fusions.'
  },
  {
    id: 'weakpoint_prism',
    name: 'Prism of Critical Insight',
    icon: '💎',
    cost: 150,
    desc: 'Weakpoint strikes deal +50% bonus damage and grant +15 bonus SP.'
  },
  {
    id: 'temporal_compass',
    name: 'Temporal Chronometer',
    icon: '⏳',
    cost: 160,
    desc: 'Gain +2 Frame Advantage at the start of every combat exchange.'
  },
  {
    id: 'aegis_plating',
    name: 'Adamantine Bulwark',
    icon: '🛡️',
    cost: 120,
    desc: 'Reduces all chip damage while blocking to zero. Guard cannot be broken.'
  },
  {
    id: 'apex_catalyst_stone',
    name: 'Apex Catalyst Stone',
    icon: '🔮',
    cost: 180,
    desc: 'Immediately grants 1 free Breakthrough (Apex or Fusion) for any owned skill.'
  }
];

if (typeof window !== 'undefined') {
  window.ROGUELITE_PERKS = ROGUELITE_PERKS;
  window.SHOP_RELICS = SHOP_RELICS;
}
if (typeof module !== 'undefined') {
  module.exports = { ROGUELITE_PERKS, SHOP_RELICS };
}


