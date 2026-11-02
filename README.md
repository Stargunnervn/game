# ARCADE VAULT: Web Games Portal

A centralized browser gaming portal hosted directly via GitHub Pages. All games in this repository run purely in client-side HTML5 Canvas, JavaScript, and Web Audio API with zero external dependencies.

---

## Play Online
Visit the live portal on GitHub Pages to play any game directly in your browser.

---

## Games Catalog

### 1. [YOMI ROGUE: Tactical Turn-Based Fighter](./roguelite_fighter/)
- **Genre:** Simultaneous Turn-Based Fighting Roguelite
- **Inspiration:** *Your Only Move Is Hustle (YOMI Hustle)*
- **Key Features:**
  - Simultaneous frame-by-frame decision phase with **LOCK IN** (`Space` / `Enter`).
  - Circular **Aim Wheel** for launch angles, aerial juggles, and floor spikes.
  - Holographic **Ghost Prediction Preview** showing projected hitboxes and positions.
  - Roguelite drafting system offering both **Active Skill Unlocks** and **Passive Blessings**.
  - Persistent Dojo meta-progression across runs.

---

## Adding New Games
To add a new game to this portal:
1. Create a dedicated folder under root (e.g., `./my_new_game/`).
2. Add your game assets and an `index.html` entrypoint.
3. Add a new game card to the root [`index.html`](./index.html) linking to `./my_new_game/index.html`.
4. Commit and push: GitHub Pages automatically deploys the updated portal!

