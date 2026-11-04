// ============================================================================
// ROGUELITE PERKS, BLESSINGS & SANCTUARY SHOP RELICS
// Clean vector SVG icons replacing all emojis
// ============================================================================

const PERK_ICONS = {
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
  vitality: '<svg viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  engine: '<svg viewBox="0 0 24 24" fill="none" stroke="#38ef7d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4M12 16h.01"/></svg>',
  mine: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="#b388ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  siphon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff0055" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  bone: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  reactor: '<svg viewBox="0 0 24 24" fill="none" stroke="#ffd166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M6 11v2M10 11v2M14 11v2"/></svg>',
  prism: '<svg viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 21L7.5 9M12 21l4.5-12"/></svg>',
  chrono: '<svg viewBox="0 0 24 24" fill="none" stroke="#b388ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  aegis: '<svg viewBox="0 0 24 24" fill="none" stroke="#38ef7d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 6v12"/></svg>',
  catalyst: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff00ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
};

const ROGUELITE_PERKS = [
  {
    id: 'ki_battery',
    name: 'Ki Battery Core',
    icon: PERK_ICONS.battery,
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Max Super SP increased by +25. Start every combat round with +15 SP.'
  },
  {
    id: 'weakpoint_hunter',
    name: 'Weakpoint Hunter',
    icon: PERK_ICONS.target,
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Striking enemy weakpoints deals +35% bonus damage and generates +8 SP.'
  },
  {
    id: 'titan_vitality',
    name: 'Titan Vitality',
    icon: PERK_ICONS.vitality,
    type: 'PASSIVE',
    tier: 'common',
    desc: 'Max HP permanently increased by +35. Fully restores health.'
  },
  {
    id: 'momentum_engine',
    name: 'Momentum Engine',
    icon: PERK_ICONS.engine,
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Executing a Dash or Jump increases your next attack damage by +25%.'
  },
  {
    id: 'iron_parry',
    name: 'Iron Retaliation',
    icon: PERK_ICONS.shield,
    type: 'PASSIVE',
    tier: 'common',
    desc: 'Successful Parry or Block reflects 12 unblockable damage back at the attacker.'
  },
  {
    id: 'phantom_dash',
    name: 'Phantom Trap Dash',
    icon: PERK_ICONS.mine,
    type: 'PASSIVE',
    tier: 'legendary',
    desc: 'Dashing leaves behind a lingering kinetic blast mine that detonates for 32 damage.'
  },
  {
    id: 'tactical_foresight',
    name: 'Tactical Foresight',
    icon: PERK_ICONS.eye,
    type: 'PASSIVE',
    tier: 'rare',
    desc: 'Always gain +2 Frame Advantage on Neutral reset (Turn 1 and post-knockdowns).'
  },
  {
    id: 'vampiric_edge',
    name: 'Soul Siphon',
    icon: PERK_ICONS.siphon,
    type: 'PASSIVE',
    tier: 'legendary',
    desc: 'Landing a weakpoint strike restores 10% of dealt damage directly as HP.'
  }
];

// SANCTUARY SHOP RELICS
const SHOP_RELICS = [
  {
    id: 'dragon_bone_charm',
    name: 'Dragon Bone Charm',
    icon: PERK_ICONS.bone,
    cost: 110,
    desc: 'Permanently increases Max HP by +45. Toughened bone forged in dragon flame.'
  },
  {
    id: 'ki_reactor_core',
    name: 'Overcharged Ki Reactor',
    icon: PERK_ICONS.reactor,
    cost: 130,
    desc: 'Start every battle with +40 Super SP ready to unleash devastating fusions.'
  },
  {
    id: 'weakpoint_prism',
    name: 'Prism of Critical Insight',
    icon: PERK_ICONS.prism,
    cost: 150,
    desc: 'Weakpoint strikes deal +50% bonus damage and grant +15 bonus SP.'
  },
  {
    id: 'temporal_compass',
    name: 'Temporal Chronometer',
    icon: PERK_ICONS.chrono,
    cost: 160,
    desc: 'Gain +2 Frame Advantage at the start of every combat exchange.'
  },
  {
    id: 'aegis_plating',
    name: 'Adamantine Bulwark',
    icon: PERK_ICONS.aegis,
    cost: 120,
    desc: 'Reduces all chip damage while blocking to zero. Guard cannot be broken.'
  },
  {
    id: 'apex_catalyst_stone',
    name: 'Apex Catalyst Stone',
    icon: PERK_ICONS.catalyst,
    cost: 180,
    desc: 'Immediately grants 1 free Breakthrough (Apex or Fusion) for any owned skill.'
  }
];

if (typeof window !== 'undefined') {
  window.PERK_ICONS = PERK_ICONS;
  window.ROGUELITE_PERKS = ROGUELITE_PERKS;
  window.SHOP_RELICS = SHOP_RELICS;
}
if (typeof module !== 'undefined') {
  module.exports = { PERK_ICONS, ROGUELITE_PERKS, SHOP_RELICS };
}
if (typeof module !== 'undefined') {
  module.exports = { ROGUELITE_PERKS, SHOP_RELICS };
}


