# 🌍 WorldMatch — Match It. Find It. Explore It!
### 🎮 Ready for a World Adventure?



<p align="center">
  <a href="https://diclesahin.github.io/worldmatch/">
    <img
      src="https://img.shields.io/badge/PLAY%20THE%20GAME-START%20ADVENTURE!-F4C75E?style=for-the-badge"
      alt="PLAY THE GAME — START ADVENTURE"
      height="75"
    />
  </a>
</p>

**GMT 458 — Web GIS | Assignment 2: GeoGame | 2026–2027**

WorldMatch is an interactive, time-limited geography game developed with HTML, CSS, JavaScript, Leaflet and GeoJSON. Players select an illustrated discovery card and locate the associated country on a world map. The game combines geography, cultural knowledge, spatial interaction and a playful travel-arcade interface.


- **GitHub repository:** https://github.com/diclesahin/worldmatch
- **Play online (GitHub Pages):** https://diclesahin.github.io/worldmatch/

- **AI interaction:** `[2-3 days]`

> This README documents the current **Arcade Edition**. The menu is interactive HTML/CSS, not a static image. The project has no backend; saved scores and badges are local to the browser.

## 1. Project concept and functional requirements

The player must be able to:

1. Enter an explorer name and select one of three categories.
2. Choose a difficulty before starting.
3. Start a timed session on an interactive Leaflet world map.
4. Select one of five item cards and click the corresponding country polygon.
5. Receive visual and textual feedback for correct and incorrect answers.
6. Earn points, use hints, lose lives after mistakes and earn combo bonuses.
7. Progress through three rounds, each containing five matching tasks.
8. Unlock achievements, view results and a browser-local top-five scoreboard.
9. Restart the game or return to the menu.

### Categories and question count

| Category | Matching content | Tasks per full game |
|---|---|---:|
| **Street Food Fiesta** | Foods and associated countries | 15 |
| **Wonders of the World** | Landmarks and their locations | 15 |
| **Wild Planet** | Animals and associated countries | 15 |

There are **45 prepared tasks in total**, distributed across the three categories. One complete game uses **15 tasks from the selected category**, in **three rounds of five**. The player chooses a card, then clicks a country; the game does **not** use drag-and-drop.

For some foods and animal species, the association represents a recognizable cultural or geographical connection, not an exclusive origin or habitat.

## 2. Frontend design and layout sketches

### Opening screen — Travel Arcade

The home screen uses a dark navy travel-game background, a prominent WorldMatch logo, colorful illustrated category buttons, a player-name input, difficulty buttons and a bright **START ADVENTURE** button. Decorative travel routes, icons and feature chips establish the arcade style.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│      ✈            🌍 WORLDMATCH                       ✨              │
│               Match it. Find it. Explore it!                           │
│                 Ready for a world adventure?                            │
│                                                                            │
│ ┌───────────────────┐ ┌───────────────────┐ ┌─────────────────────────┐ │
│ │ 🍜 Street Food    │ │ 🏛 Wonders of     │ │ 🐾 Wild Planet          │ │
│ │ Fiesta            │ │ the World         │ │                         │ │
│ └───────────────────┘ └───────────────────┘ └─────────────────────────┘ │
│                                                                            │
│ Explorer name: [________________]   [Explorer] [Adventurer] [Legend]       │
│                          [ START ADVENTURE ✈ ]                            │
│       45 challenges · Timer · Achievements · Combo · Interactive map       │
└────────────────────────────────────────────────────────────────────────────┘
```

### Gameplay screen

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Category · Explorer name      SCORE 0500   TIME 01:20   LIVES ♥ ♥ ♥       │
│ ROUND 2 / 3          ━━━━━━━━░░░░░░░░         2 OF 5 DISCOVERIES          │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│                     INTERACTIVE LEAFLET WORLD MAP                         │
│               GeoJSON polygons · Click countries · Zoom                  │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│ Where does it belong?                                                     │
│ [Card 1]      [Card 2]      [Card 3]      [Card 4]      [Card 5]          │
│ [ HINT ]        Correct / incorrect feedback and learning facts           │
└────────────────────────────────────────────────────────────────────────────┘
```

The score in the gameplay HUD is intended to show **the cumulative total** (completed rounds plus the active round). The gameplay screenshot above is illustrative, not an actual screenshot.

### Results screen

```text
┌──────────────────────────────────────────────┐
│               JOURNEY COMPLETE             │
│                FINAL SCORE                 │
│                    1280                    │
│ Explorer · Discoveries · Personal best     │
│ Accuracy · Best combo · Achievements       │
│         Top 5 on this device               │
│ [ PLAY AGAIN ]     [ CHANGE CATEGORY ]     │
└──────────────────────────────────────────────┘
```

The responsive layout rearranges category cards and controls on narrow screens. Category and difficulty controls are actual buttons with selection styles and `aria-pressed` attributes.

## 3. Game progression, difficulty and time

| Difficulty | Round 1 | Round 2 | Round 3 | Country-name guidance | Hints per card | Point multiplier |
|---|---:|---:|---:|---|---:|---:|
| **Explorer (Easy)** | 120 s | 110 s | 100 s | Visible map labels | 3 | ×1 |
| **Adventurer (Medium)** | 90 s | 80 s | 70 s | Names on hover | 2 | ×1.5 |
| **Legend (Hard)** | 60 s | 50 s | 40 s | No country labels | 1 | ×2 |

Each round becomes 10 seconds shorter than the previous one. Explorer begins with the more familiar items; Legend begins with the less familiar items; Adventurer shuffles the complete set.

- **Lives:** Three lives are shared across the entire game. Lives do not reset between rounds.
- **Correct country:** Earns points, marks the card as completed and shows a short fact.
- **Incorrect country:** Loses one life, subtracts 25 points from the current round (not below zero), and resets the consecutive-correct streak.
- **Combo:** Each consecutive correct answer adds a streak-based bonus of 10 points per additional match within the round.
- **Time:** The countdown begins on each round. The game ends when the available time expires, all lives are lost, or all three rounds are completed.

### Scoring mechanism

The correct-match award is calculated in `createGameSession()`:

```js
Math.round((100 + Math.floor(seconds / 5)) * config.multiplier)
  + (streak - 1) * 10
```

Round scores are accumulated into the final score. The HUD displays the sum of completed-round scores and the active round's score in the corrected local version of `script.js`.

### Progressive hints

| Hint | What happens | Cost |
|---|---|---|
| 1 | Shows the item's continent | −40 points |
| 2 | Reveals the first letter and letter count of the country | −8 seconds |
| 3 | Temporarily highlights the correct country | −60 points |

Depending on difficulty, a card offers one, two or three of these hints. Hints are applied through the game-session methods and cannot be used indefinitely.

## 4. Achievements and results

Five achievements encourage replayability:

- **First Discovery:** Complete the first correct match.
- **Perfect Round:** Complete a five-card round without mistakes.
- **Speed Runner:** Complete a five-card round within 25 seconds.
- **Combo Master:** Make five consecutive correct matches within one round.
- **World Explorer:** Complete all fifteen matching tasks.

An achievement triggers a short notification and is stored using `localStorage` for the entered player name. The results page displays the final score, completed discoveries, accuracy, best combo, personal best, achievement collection and **top five scores on the same browser/device**. There is no online account or cross-device leaderboard.

## 5. JavaScript libraries and geographic data

- **Leaflet 1.9.4:** Builds the interactive map, displays country polygons, supports zooming and handles map/country interactions.
- **GeoJSON:** Provides country-border geometries that can be drawn as clickable polygon layers.
- **HTML5 / CSS3 / vanilla JavaScript:** Controls the layout, responsive design, game state, animations, events, timers and browser storage.
- **Wikipedia REST API / Wikimedia imagery:** Requests item thumbnails when available. An emoji fallback remains if an image request fails.

**Open country-boundary data sources (fallback order):**

1. Optional local file: `data/countries.geojson` (not included in the current ZIP).
2. [johan/world.geo.json](https://github.com/johan/world.geo.json).
3. A jsDelivr mirror of the above dataset.
4. [datasets/geo-countries](https://github.com/datasets/geo-countries).

The decorative **category images** (`assets/food-art.webp`, `assets/landmark-art.webp`, and `assets/wildlife-art.webp`) are local game assets derived from AI-generated design artwork. They are different from the item thumbnails loaded from Wikipedia. Map tiles, external fonts, GeoJSON and thumbnail requests can require an internet connection.

## 6. Technical implementation

### Three event handlers

**1. Category selection (`click`)** — In `setupHomeEvents()`, each `.category` button has a click listener. It updates the selected `category`, the theme (`document.body.dataset.theme`), the selected CSS class and the button's `aria-pressed` state.

**2. Start button (`click`)** — `startBtn.addEventListener('click', ...)` calls `startGame()`. It validates the entered name, reads the difficulty, prepares the shuffled task sequence, loads GeoJSON, initializes Leaflet and begins the timed round.

**3. Country polygon (`click`)** — Leaflet's `layer.on('click', ...)` passes a country to `answerForCountry()`. The answer is checked against the selected card, with compatible country-name aliases and some accepted alternate animal habitats. The game updates score, lives, feedback, progress and completion state.

Other handlers include difficulty-pill clicks, a `change` event on the underlying difficulty select, food/landmark/animal card clicks, hint clicks, replay/menu clicks and country hover events.

### Closures

`createGameSession(config)` creates **private variables** (`score`, `lives`, `seconds`, `matched`, `mistakes`, `timerId`, `streak` and hint usage). It returns methods such as `addSuccess()`, `addMistake()`, `useHint()`, `getSnapshot()`, `tick()` and `stop()`. These functions retain access to the original variables through a JavaScript closure. This keeps each round's score, timer and lives controlled instead of relying on direct changes to the underlying variables from any part of the application.

### DOM manipulation

The project uses:

- `document.getElementById()` to access interface controls and display areas.
- `addEventListener()` to respond to player interactions.
- `document.createElement()`, `append()` and `replaceChildren()` to generate cards and achievement elements.
- `textContent` to update scores, time, lives, progress, instructions and final results.
- `classList.add()`, `remove()` and `toggle()` to change screens, indicate selected cards and show notifications.
- `style.width` to update the progress bar.
- `aria-pressed` and `aria-label` to provide accessible interaction states.

## 7. Running the project

### Local development

1. Open the project folder in Visual Studio Code.
2. Start **Live Server** on `index.html`, or run:

```bash
python -m http.server 8000
```

3. If using the Python command, visit `http://localhost:8000`.
4. Enter a name, select a category and difficulty, and choose **START ADVENTURE**.

Opening the HTML directly through `file://` is not recommended because fetch requests may be restricted by the browser.

### GitHub Pages deployment

1. Create a GitHub repository for the game.
2. Commit `index.html`, `style.css`, `script.js`, `README.md` and the `assets/` directory to the repository root.
3. In **Settings → Pages**, choose deployment from the `main` branch and the root (`/`) directory, if supported by the repository's settings.
4. Open the published page and test each category, difficulty, three-round progression, achievements and results.
5. Submit the **repository URL** to the [GMT 458 peer-review platform](https://gmt458.hacettepe.edu.tr/).

### Git history

Development changes should be committed regularly with accurate descriptions, for example a commit for the menu redesign, one for gameplay fixes, and one for README changes. These are suggestions for future or real completed commits, not a claim that a particular commit history already exists.

## 8. AI use and what I learned

**AI assistant:** ChatGPT (OpenAI)

**Estimated active AI-assisted work and learning:** **Approximately 1–2 days**, as reported by the student. This is an approximate amount of active work, **not** a claim that the full project was developed in one uninterrupted session or that every minute was measured.

**Conversation URL:** `[ADD THE REAL SHARED CHATGPT CONVERSATION URL]`

AI assistance was used to explore the initial game concept, compare gameplay ideas, design a colorful arcade-style opening screen, discuss difficulty modes and achievement badges, explain JavaScript patterns, and identify changes during code testing. AI-generated illustration assets were used for the three category cards on the welcome screen.

The practical topics addressed during the development process included:

- How Leaflet and GeoJSON work together to make country shapes clickable.
- How JavaScript event handlers connect category cards, difficulty buttons, item cards and map selections.
- How `createGameSession()` uses **closures** to manage private score, time and life state.
- How the **DOM** can update a scoreboard and render cards without reloading the page.
- How browser `localStorage` can persist personal bests and badges.
- How to investigate bugs, including correcting the HUD so it displays the cumulative score across rounds.
- How a static HTML/CSS/JavaScript project can be tested locally and published with GitHub Pages.

**Student verification:** The student should confirm that the above points accurately reflect their own learning. AI suggestions must be reviewed and tested in the actual project. The final responsibility for correctness, references, project decisions and submission remains with the student.

## 9. Credits, limitations and attribution

- **Map library:** [Leaflet](https://leafletjs.com/).
- **Country geometry:** [johan/world.geo.json](https://github.com/johan/world.geo.json) and [datasets/geo-countries](https://github.com/datasets/geo-countries). The project uses generalized educational boundaries; geopolitical interpretations can differ.
- **Item photos:** Wikipedia/Wikimedia summaries, loaded dynamically when available. Photo availability and reuse terms depend on the specific source image.
- **Decorative category art:** AI-generated travel-arcade concept, adapted into `assets/*.webp`.
- **No backend:** Scores and achievements are stored in browser-local storage and can be lost when site data is cleared.
- **Network dependency:** External libraries, map layers, country data and photos may not load without internet access.

**Assignment submission deadline:** **29 November 2026, 21:00**.
