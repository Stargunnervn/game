# YOMI ROGUE: Tactical Turn-Based Fighting Roguelite

A simultaneous turn-based fighting roguelite inspired by **Your Only Move Is Hustle (YOMI Hustle)** and competitive fighting games.

---

## 1. How to Play
- Open [`index.html`](index.html) in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Brave) or double-click [`chay_game.bat`](chay_game.bat).
- No installations, downloads, or external dependencies required!

---

## 2. Core Mechanics (YOMI Hustle Style)

### Simultaneous Decision Phase
- At every neutral frame or exchange point, time pauses.
- **Select an action** from the bottom tactical command panel:
  - **Movement:** Step Forward (+1 Adv), Step Back, Tactical Jump, Phantom Dash (Invulnerable).
  - **Attacks:** Quick Jab (3f startup, fast priority), Heavy Blade Slash (7f startup, high damage), Low Sweep (5f, ground trip), Sky Launcher (9f, launches opponent into aerial juggle combo state).
  - **Defense:** Guard Stance (absorbs 80% damage), Instant Parry (frame-perfect parry window that stuns the attacker and grants +35f advantage).
  - **Specials:** Ki Blast (30 SP, ranged energy beam), Rising Dragon (60 SP, massive anti-air cyclone uppercut).
- **YOMI Hustle Aim Wheel (Direction & Vector Selector):**
  - Click or drag on the circular Aim Wheel dial to set your angle (-180° to +180°).
  - **Attacks:** Angling upward launches opponents high into the sky for juggle combos; angling downward spikes airborne foes directly into the floor with heavy impact; aiming forward deals maximum pushback! Projectiles like Ki Blast and Spatial Slash follow your aim line.
  - **Movement:** Directs your jump trajectory, dash angle, and teleport coordinates!
- **Ghost Prediction Preview:** As you click any move and adjust your aim wheel, a holographic ghost renders on-screen showing your exact projected destination and rotated strike hitboxes before you commit.
- **LOCK IN:** Click the **LOCK IN** button (or press `Space` / `Enter`). Both fighters execute their planned moves simultaneously!

### Frame Advantage & Combos
- **Advantage (+) vs Disadvantage (-):** If you hit an opponent or parry their strike, you recover earlier. You will see an indicator like `+18F COMBO ADVANTAGE`.
- During Advantage, your opponent is locked in Hitstun or Guard, allowing you to chain follow-up combo strikes (Air Juggles, Spikes, Wall Bounces, Super Finishers)!

---

## 3. Roguelite Progression & 3-Floor Gauntlet

### 3-Floor Gauntlet (Tier-Based Encounter Pools):
1. **Floor 1 (The Outskirts):**
   - Minion Encounters: Bandit Brawler, Spear Recruit, Rogue Monk.
   - Floor 1 Bosses: Shaolin Master, Wandering Ronin.
2. **Floor 2 (The Iron Citadel):**
   - Minion Encounters: Iron Sentinel, Katana Duelist, Shadow Acolyte.
   - Floor 2 Bosses: Armored Colossus, Thunder Shinobi.
3. **Floor 3 (The Void Sanctum):**
   - Minion Encounters: Void Stalker, Chaos Juggernaut, Grand Disciple.
   - Floor 3 Final Boss: Grandmaster Vane (Supreme Hustler).

---

## 4. Post-Boss Sanctuary Shop & Skill Deck Customizer

Upon conquering each Floor's Boss (Floors 1 & 2), the **Sanctuary Forge & Market** opens:
- **Currency (Gold 🪙):** Earned by winning encounters (+35 to +150 Gold) and executing tactical Weakpoint Hits (+8 Gold).
- **Skill Armory:** Purchase new combat techniques and upgrades with Gold.
- **Supplies & Relics:** Restorative potions, Max HP charms, and Ki starting crystals.
- **Skill Deck Customizer:** Freely toggle **Equip / Stash** on any unlocked technique to configure your active combat HUD loadout before embarking into the next floor!

---

## 5. Weakpoint Hit System (Zero RNG, 100% Deterministic)

Critical strike RNG has been completely replaced with a deterministic **Weakpoint Hit** mechanic:
- **Whiff Punish:** Striking an opponent who just missed an attack or is in recovery frames.
- **Anti-Air / High-Low Alignment:** Directing your Aim Wheel into high vulnerability zones against airborne opponents, or sweeping low against standing guards.
- **Blindside / Backstab:** Attacking an opponent from behind.
- **Rewards:** Guaranteed x1.65 damage, +4 frames of extra combo advantage, +8 Gold bonus, and golden cross-spark particle bursts!

---

## 6. Skill Breakthrough: Hybrid Fusion & Apex Ascension

When an already-upgraded move (`★`) is selected for evolution:
1. **Skill Fusion (🔮):** Merge two compatible moves to form an ultimate dual-element technique:
   - `Quick Jab` + `Ki Blast` = **Thunder Gale Barrage**
   - `Heavy Slash` + `Judgment Cut` = **Dimensional Void Cleave**
   - `Launcher` + `Dive Kick` = **Comet Crater Impact**
   - `Dash` + `Sweep` = **Phantom Ghost Slide**
   - `Block` + `Parry` = **Aegis Divine Counter**
2. **Apex Ascension (⚔️):** Transcend the skill to its mythic standalone form with 1f startup, doubled damage, and Super-Armor!

---

## 7. Procedural Martial Arts Animation

Capsule placeholders have been upgraded to dynamic anime martial artists with animated limbs, flowing wind bandanas, energetic punch extensions, luminous blade slash arcs, and forcefield block guards.

### The Ancient Dojo (Meta Progression):
- Earn **Hustle Shards (💎)** across runs.
- Purchase permanent conditioning in the Dojo: Max HP, Base Attack Power, Critical Rate, and Super Meter Generation. Progress is saved automatically in your browser's local storage.
