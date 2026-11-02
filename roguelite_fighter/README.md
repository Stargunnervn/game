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

## 3. Roguelite Progression & Expanded Draft Rewards

### 5-Stage Gauntlet:
1. **Stage 1:** Shaolin Novice
2. **Stage 2:** Wandering Ronin
3. **Stage 3:** Armored Colossus
4. **Stage 4:** Shadow Assassin
5. **Stage 5:** Grandmaster Vane (Final Boss)

### Tactical Synergy Drafts (Active Skills + Passive Blessings):
After clearing each round, choose 1 of 3 random cards from the drafting pool:

#### A. New Active Attack Skills (Unlocked into your moveset):
- **Judgment Cut (Legendary, 35 SP):** Creates a spatial distortion sphere slicing at your aimed coordinates.
- **Falcon Dive Kick (Rare, 0 SP):** Downward plunging diagonal kick that spikes opponents into the floor.
- **Cyclone Blade (Rare, 20 SP):** 360° spinning blade that vacuums nearby enemies in and delivers 3 quick strikes.
- **Meteor Blow (Rare, 25 SP):** Armored lunging strike that absorbs light attacks and deals 34 heavy damage.
- **Thunder Palm (Common, 15 SP):** Blazing fast 4f electrified palm thrust with 28f frame advantage stun.

#### B. New Active Movement Skills (Unlocked into your moveset):
- **Shadow Blink (Rare, 20 SP):** Instant teleportation along your aim wheel vector.
- **Hyper Rocket Dash (Common, 0 SP):** Extreme-velocity blitz covering 260px distance with invulnerability.
- **Sky Leap (Common, 0 SP):** High directional leap allowing multi-angle airborne repositioning.

#### C. Passive Blessings:
- **Vampiric Touch:** Siphon 14% of dealt damage as health.
- **Thunder Step:** Strikes discharge chain lightning for +16 bonus shock damage.
- **Aegis Parry:** +25% defense; parrying reflects 25 unblockable damage back.
- **Phantom Afterimage:** Dashing leaves an explosive decoy behind.
- **Overdrive Berserk:** +55% damage when HP falls below 50%.
- **Executioner Precision:** +25% Critical Chance, dealing 240% lethal damage.
- **Titan Vitality:** +50 Max HP and full heal.

### The Ancient Dojo (Meta Progression):
- Earn **Hustle Shards (💎)** across runs.
- Purchase permanent conditioning in the Dojo: Max HP, Base Attack Power, Critical Rate, and Super Meter Generation. Progress is saved automatically in your browser's local storage.
