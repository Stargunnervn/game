# YOMI ROGUE: Pixel Art Build (Experimental)

This is a separate experimental copy of the roguelite_fighter game that replaces
the procedural vector-rig renderer with pixel art sprite rendering.

## What Changed

- `js/animator.js` - Completely rewritten to load and render from the PNG sprite atlas
  instead of drawing the fighter limb-by-limb with Canvas arc/line/rect calls.
- `game.js` - Two lines added to propagate `catalogKey` from enemy data onto the
  TacticalFighter instance so the sprite resolver can pick the right sprite.
- `index.html` - Page title updated and purple "PIXEL ART BUILD" banner added.

## What Did NOT Change

All gameplay systems are identical to the main roguelite_fighter build:
- Turn resolution, move execution, hitstun, damage, super meter
- AI behavior tiers (NOVICE, AGGRESSIVE, BALANCED, TACTICAL, BOSS)
- Roguelite meta: floors, stages, gold, upgrades, perks, relics, fusions
- Particle FX, projectiles, spatial rifts, damage text, replay system

## Sprite Atlas

Location: `assets/sprites/all_fighters.png` (64x58 px spritesheet)
Frame manifest: `assets/sprites/all_fighters.json`

Named sprites: hustler, iron_shogun, crimson_oni, shadow_kunoichi,
void_phantom_lord, abyssal_leviathan, soul_reaper, celestial_emperor,
seraph_archon, chronos_titan, badge_sword, badge_shield

Generic enemies (no dedicated sprite) use the crimson_oni frame with
a color-tint multiply pass using their defined enemy color.

## Sprite Scale

Each sprite is 14-16 x 18 px raw. The renderer scales to a target display
height of 90 px (scale ~5x) to match the original fighter footprint.

## Status

Experimental - visual only. All gameplay verified identical to main build.
