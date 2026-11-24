'use strict';

// Country polygons: public GeoJSON (downloaded in the browser).
// Names follow the source's English country names. Aliases account for variants.
const GEOJSON_SOURCES = [
  './data/countries.geojson',
  'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
  'https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json',
  'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
];

const BANK = {
  foods: { name: 'Street Food Fiesta', items: [
      { id: 'baklava', name: 'Baklava', country: 'Turkey', continent: 'Asia / Europe', emoji: '🍯', wiki: 'Baklava', fact: 'Layered filo pastry with nuts and syrup, a shared heritage of the region.' },
      { id: 'pasta', name: 'Pasta', country: 'Italy', continent: 'Europe', emoji: '🍝', wiki: 'Pasta', fact: 'Italy has hundreds of pasta shapes.' },
      { id: 'sushi', name: 'Sushi', country: 'Japan', continent: 'Asia', emoji: '🍣', wiki: 'Sushi', fact: 'Vinegared rice with fish became an icon of Japan.' },
      { id: 'taco', name: 'Taco', country: 'Mexico', continent: 'North America', emoji: '🌮', wiki: 'Taco', fact: 'Tacos are folded tortillas with endless fillings.' },
      { id: 'croissant', name: 'Croissant', country: 'France', continent: 'Europe', emoji: '🥐', wiki: 'Croissant', fact: 'French bakeries perfected it, with Austrian roots.' },
      { id: 'paella', name: 'Paella', country: 'Spain', continent: 'Europe', emoji: '🥘', wiki: 'Paella', fact: 'Paella comes from Valencia, cooked in a wide pan.' },
      { id: 'kimchi', name: 'Kimchi', country: 'South Korea', continent: 'Asia', emoji: '🥬', wiki: 'Kimchi', fact: 'Fermented vegetables served with almost every Korean meal.' },
      { id: 'padthai', name: 'Pad Thai', country: 'Thailand', continent: 'Asia', emoji: '🍜', wiki: 'Pad_thai', fact: 'Stir-fried rice noodles, a Thai street-food classic.' },
      { id: 'butterchicken', name: 'Butter Chicken', country: 'India', continent: 'Asia', emoji: '🍛', wiki: 'Butter_chicken', fact: 'This creamy tomato curry was born in Delhi.' },
      { id: 'ceviche', name: 'Ceviche', country: 'Peru', continent: 'South America', emoji: '🐟', wiki: 'Ceviche', fact: 'Raw fish cured in lime juice is a Peruvian favourite.' },
      { id: 'poutine', name: 'Poutine', country: 'Canada', continent: 'North America', emoji: '🍟', wiki: 'Poutine', fact: 'Fries, cheese curds and gravy from Quebec.' },
      { id: 'pierogi', name: 'Pierogi', country: 'Poland', continent: 'Europe', emoji: '🥟', wiki: 'Pierogi', fact: 'Stuffed dumplings are a Polish comfort food.' },
      { id: 'fishchips', name: 'Fish and Chips', country: 'United Kingdom', continent: 'Europe', emoji: '🐠', wiki: 'Fish_and_chips', fact: 'A British takeaway tradition.' },
      { id: 'pretzel', name: 'Pretzel', country: 'Germany', continent: 'Europe', emoji: '🥨', wiki: 'Pretzel', fact: 'Soft pretzels are a Bavarian favourite.' },
      { id: 'moussaka', name: 'Moussaka', country: 'Greece', continent: 'Europe', emoji: '🍆', wiki: 'Moussaka', fact: 'Layers of aubergine and creamy bechamel.' }
    ] },
  landmarks: { name: 'Wonders of the World', items: [
      { id: 'eiffel', name: 'Eiffel Tower', country: 'France', continent: 'Europe', emoji: '🗼', wiki: 'Eiffel_Tower', fact: 'Built for the 1889 World’s Fair in Paris.' },
      { id: 'colosseum', name: 'Colosseum', country: 'Italy', continent: 'Europe', emoji: '🏟️', wiki: 'Colosseum', fact: 'An ancient Roman amphitheatre in Rome.' },
      { id: 'fuji', name: 'Mount Fuji', country: 'Japan', continent: 'Asia', emoji: '🗻', wiki: 'Mount_Fuji', fact: 'Japan’s highest mountain and a UNESCO site.' },
      { id: 'liberty', name: 'Statue of Liberty', country: 'United States', continent: 'North America', emoji: '🗽', wiki: 'Statue_of_Liberty', fact: 'Stands in New York Harbor.' },
      { id: 'pyramids', name: 'Pyramids of Giza', country: 'Egypt', continent: 'Africa', emoji: '🔺', wiki: 'Great_Pyramid_of_Giza', fact: 'Over 4,500 years old on the Giza Plateau.' },
      { id: 'taj', name: 'Taj Mahal', country: 'India', continent: 'Asia', emoji: '🕌', wiki: 'Taj_Mahal', fact: 'A marble mausoleum in Agra.' },
      { id: 'wall', name: 'Great Wall', country: 'China', continent: 'Asia', emoji: '🧱', wiki: 'Great_Wall_of_China', fact: 'Walls stretching thousands of kilometres.' },
      { id: 'machu', name: 'Machu Picchu', country: 'Peru', continent: 'South America', emoji: '⛰️', wiki: 'Machu_Picchu', fact: 'An Inca citadel high in the Andes.' },
      { id: 'christ', name: 'Christ the Redeemer', country: 'Brazil', continent: 'South America', emoji: '✝️', wiki: 'Christ_the_Redeemer_(statue)', fact: 'Overlooks Rio de Janeiro from Corcovado.' },
      { id: 'opera', name: 'Sydney Opera House', country: 'Australia', continent: 'Oceania', emoji: '🎭', wiki: 'Sydney_Opera_House', fact: 'Famous for its sail-shaped roofs.' },
      { id: 'petra', name: 'Petra', country: 'Jordan', continent: 'Asia', emoji: '🏜️', wiki: 'Petra', fact: 'A rose-red city carved into rock.' },
      { id: 'angkor', name: 'Angkor Wat', country: 'Cambodia', continent: 'Asia', emoji: '🛕', wiki: 'Angkor_Wat', fact: 'The largest religious monument in the world.' },
      { id: 'bigben', name: 'Big Ben', country: 'United Kingdom', continent: 'Europe', emoji: '🕰️', wiki: 'Big_Ben', fact: 'The famous bell of the Elizabeth Tower in London.' },
      { id: 'hagia', name: 'Hagia Sophia', country: 'Turkey', continent: 'Asia / Europe', emoji: '🕌', wiki: 'Hagia_Sophia', fact: 'Built in 537 in Istanbul.' },
      { id: 'sagrada', name: 'Sagrada Família', country: 'Spain', continent: 'Europe', emoji: '⛪', wiki: 'Sagrada_Família', fact: 'Gaudí’s basilica in Barcelona, still being built.' }
    ] },
  nature: { name: 'Wild Planet', items: [
      { id: 'kangaroo', name: 'Kangaroo', country: 'Australia', continent: 'Oceania', emoji: '🦘', wiki: 'Kangaroo', fact: 'Native to Australia and famous for hopping.' },
      { id: 'panda', name: 'Giant Panda', country: 'China', continent: 'Asia', emoji: '🐼', wiki: 'Giant_panda', fact: 'Lives in the mountain forests of China.' },
      { id: 'kiwi', name: 'Kiwi Bird', country: 'New Zealand', continent: 'Oceania', emoji: '🐦', wiki: 'Kiwi_(bird)', fact: 'A flightless bird found only in New Zealand.' },
      { id: 'lemur', name: 'Lemur', country: 'Madagascar', continent: 'Africa', emoji: '🐒', wiki: 'Lemur', fact: 'Wild lemurs live only on Madagascar.' },
      { id: 'llama', name: 'Llama', country: 'Peru', continent: 'South America', emoji: '🦙', wiki: 'Llama', fact: 'Domesticated in the Andes long ago.' },
      { id: 'polar', name: 'Polar Bear', country: 'Canada', continent: 'North America', emoji: '🐻‍❄️', wiki: 'Polar_bear', fact: 'An Arctic hunter, also found in Russia and Norway.', alt: ['Russia','Norway'] },
      { id: 'tiger', name: 'Bengal Tiger', country: 'India', continent: 'Asia', emoji: '🐯', wiki: 'Bengal_tiger', fact: 'India is home to most wild tigers.', alt: ['Bangladesh'] },
      { id: 'komodo', name: 'Komodo Dragon', country: 'Indonesia', continent: 'Asia', emoji: '🦎', wiki: 'Komodo_dragon', fact: 'The largest living lizard.' },
      { id: 'tortoise', name: 'Galápagos Tortoise', country: 'Ecuador', continent: 'South America', emoji: '🐢', wiki: 'Galápagos_tortoise', fact: 'Giant tortoises of the Galápagos Islands.' },
      { id: 'eagle', name: 'Bald Eagle', country: 'United States', continent: 'North America', emoji: '🦅', wiki: 'Bald_eagle', fact: 'The national bird of the USA.' },
      { id: 'gorilla', name: 'Mountain Gorilla', country: 'Rwanda', continent: 'Africa', emoji: '🦍', wiki: 'Mountain_gorilla', fact: 'Lives in misty volcanic forests.', alt: ['Uganda','Democratic Republic of the Congo'] },
      { id: 'axolotl', name: 'Axolotl', country: 'Mexico', continent: 'North America', emoji: '🦎', wiki: 'Axolotl', fact: 'The salamander that never grows up.' },
      { id: 'crane', name: 'Red-crowned Crane', country: 'Japan', continent: 'Asia', emoji: '🦢', wiki: 'Red-crowned_crane', fact: 'A symbol of luck and long life in Japan.' },
      { id: 'lion', name: 'African Lion', country: 'Kenya', continent: 'Africa', emoji: '🦁', wiki: 'Lion', fact: 'Lives on the savannas of East Africa.', alt: ['Tanzania'] },
      { id: 'capy', name: 'Capybara', country: 'Brazil', continent: 'South America', emoji: '🐹', wiki: 'Capybara', fact: 'The world’s largest rodent.', alt: ['Argentina','Colombia','Venezuela'] }
    ] }
};

const THEMES = {
  foods: { fill: '#4a2433', line: '#c97b5a', hover: '#7a3a45', ok: '#f2a541', okLine: '#ffe2a4' },
  landmarks: { fill: '#1c4458', line: '#6e97a9', hover: '#477a88', ok: '#326d68', okLine: '#7ac5a9' },
  nature: { fill: '#1b4a3a', line: '#6fb08a', hover: '#2f7a55', ok: '#7fe0a0', okLine: '#d3f7bd' }
};

const COORDS = {
  Turkey: [39, 35], Italy: [42.8, 12.5], Japan: [37.4, 137], Mexico: [23.7, -102], France: [46.4, 2.5],
  'United States': [39, -98], Egypt: [26.8, 30.7], Australia: [-25, 133], China: [35, 103],
  'New Zealand': [-41, 173], Madagascar: [-19, 47], Peru: [-10, -75], Spain: [40.2, -3.7],
  'South Korea': [36.5, 127.8], Thailand: [15.3, 101], India: [22, 79], Canada: [58, -100],
  Poland: [52, 19.4], 'United Kingdom': [54, -2.5], Germany: [51, 10.4], Greece: [39, 22],
  Brazil: [-10, -52], Jordan: [31, 36.5], Cambodia: [12.7, 104.9], Indonesia: [-2, 117],
  Ecuador: [-1.4, -78.4], Rwanda: [-1.95, 29.9], Kenya: [0.5, 38]
};

// Hints per card: 1) continent costs points, 2) first letter costs seconds, 3) the country flashes on the map.
const HINT_COST = [{ pts: 40, sec: 0 }, { pts: 0, sec: 8 }, { pts: 60, sec: 0 }];

const DIFFICULTIES = {
  easy: { label: 'Explorer', seconds: 120, multiplier: 1, tooltips: 'permanent', maxHints: 3 },
  medium: { label: 'Adventurer', seconds: 90, multiplier: 1.5, tooltips: 'hover', maxHints: 2 },
  hard: { label: 'Legend', seconds: 60, multiplier: 2, tooltips: 'none', maxHints: 1 }
};

// Differences in Natural Earth / GeoJSON country naming conventions.
const NAME_ALIASES = {
  'united republic of tanzania': 'tanzania',
  'turkey': 'turkey', 'türkiye': 'turkey', 'turkiye': 'turkey', 'republic of türkiye': 'turkey',
  'united states of america': 'united states', 'usa': 'united states',
  'the united states of america': 'united states',
  'people’s republic of china': 'china', 'people\'s republic of china': 'china',
  'egypt arab rep': 'egypt', 'egypt arab rep.': 'egypt',
  'république française': 'france', 'republic of france': 'france'
};

const $ = (id) => document.getElementById(id);
const screens = ['homeScreen', 'gameScreen', 'endScreen'];
let category = 'foods';
let difficulty = 'easy';
let playerName = '';
let map = null;
let countriesLayer = null;
let countriesData = null;
let selectedId = null;
let selectedCountryLayer = null;
let game = null;
let activeHint = false;
let gameSequence = 0;
let tooltipMarkers = [];
let pinMarkers = [];
let labelLayer = null;
let baseLayers = {};
let layerControl = null;
let lightMap = false;
let osmOn = false;
let labelItems = [];
const SHORT = { 'United States of America': 'USA', 'Democratic Republic of the Congo': 'DR Congo', 'United Republic of Tanzania': 'Tanzania', 'Republic of the Congo': 'Congo', 'Czech Republic': 'Czechia', 'United Arab Emirates': 'UAE', 'Bosnia and Herzegovina': 'Bosnia' };
let deck = [];
let matchedCountries = new Set();
const photoCache = new Map();

const canonical = (value) => {
  const raw = String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
  return NAME_ALIASES[raw] || raw;
};

function showScreen(id) {
  screens.forEach((key) => $(key).classList.toggle('hidden', key !== id));
  $('homeBtn').classList.toggle('hidden', id === 'homeScreen');
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Closure: state is private. Only methods below may change score, lives and timer.
function createGameSession(config) {
  let score = 0;
  let lives = config.lives ?? 3;
  let seconds = config.seconds;
  let matched = 0;
  let mistakes = 0;
  let timerId = null;
  let finished = false;
  let hintUsed = false;
  let streak = 0;
  const hints = {};
  let penalty = 0;

  return {
    getSnapshot: () => ({ streak, score, lives, seconds, matched, mistakes, finished, hintUsed }),
    addSuccess() {
      if (finished) return;
      streak++;
      score += Math.round((100 + Math.floor(seconds / 5)) * config.multiplier) + (streak - 1) * 10;
      matched++;
    },
    addMistake() {
      if (finished) return;
      lives = Math.max(0, lives - 1);
      mistakes++;
      streak = 0;
      score = Math.max(0, score - 25);
    },
    hintLevel: (id) => hints[id] || 0,
    useHint(id) {
      const level = hints[id] || 0;
      if (finished || level >= config.maxHints) return 0;
      const cost = HINT_COST[level];
      hints[id] = level + 1;
      score = Math.max(0, score - cost.pts);
      penalty += cost.sec;
      seconds = Math.max(0, seconds - cost.sec);
      return level + 1;
    },
    tick(onTick, onTimeout) {
      if (finished || timerId !== null) return;
      const start = Date.now();
      const base = seconds;
      timerId = window.setInterval(() => {
        if (finished) return;
        seconds = Math.max(0, base - Math.floor((Date.now() - start) / 1000) - penalty);
        onTick();
        if (seconds <= 0) onTimeout();
      }, 200);
    },
    stop() {
      finished = true;
      if (timerId !== null) window.clearInterval(timerId);
      timerId = null;
    }
  };
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function updateHUD() {
  if (!game) return;
  const s = game.getSnapshot();
  
  $('hudScore').textContent = String(pointsWon + s.score).padStart(4, '0');
  $('hudTime').textContent = formatTime(s.seconds);
  $('hudLives').textContent = `${'♥ '.repeat(s.lives)}${'♡ '.repeat(3 - s.lives)}`.trim();
  $('hudLives').setAttribute('aria-label', `${s.lives} lives`);
  $('timerWrap').classList.toggle('danger', s.seconds <= 15);
  $('progressText').textContent = `${s.matched} OF 5 DISCOVERIES`;
  $('progressFill').style.width = `${(s.matched / 5) * 100}%`;
  updateHintButton();
}

function updateHintButton() {
  const btn = $('hintBtn');
  const item = currentItems.find((i) => i.id === selectedId);
  const used = item && game ? game.hintLevel(item.id) : 0;
  const over = !game || game.getSnapshot().finished;
  let html;
  const maxHints = DIFFICULTIES[difficulty].maxHints;
  if (used >= maxHints) html = '✧ No more hints for this card';
  else {
    const c = HINT_COST[used];
    html = `✧ Hint ${used + 1}/${maxHints} <span>${c.pts ? '−' + c.pts + ' pts' : '−' + c.sec + ' sec'}</span>`;
  }
  if (btn.innerHTML !== html) btn.innerHTML = html;
  btn.disabled = over || used >= maxHints;
}

function setFeedback(message, type = '') {
  const element = $('feedback');
  element.textContent = message;
  element.className = type;
}

function setupHomeEvents() {
  document.querySelectorAll('.category').forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.category;
    document.body.dataset.theme = category;
    document.querySelectorAll('.category').forEach((other) => {
      const selected = other === button;
      other.classList.toggle('selected', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
  }));

  // The playful difficulty pills update the existing difficulty <select>.
  // Keeping that select preserves the original scoring and timer logic.
  document.querySelectorAll('.difficulty-pill').forEach((button) => {
    button.addEventListener('click', () => {
      $('difficulty').value = button.dataset.difficulty;
      $('difficulty').dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  $('difficulty').addEventListener('change', (event) => {
    difficulty = event.target.value;
    document.querySelectorAll('.difficulty-pill').forEach((button) => {
      const active = button.dataset.difficulty === difficulty;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const descriptions = { easy: '120 sec · Labels · 3 hints per card', medium: '90 sec · Hover names · 2 hints', hard: '60 sec · No labels · 1 hint' };
    $('difficultyInfo').textContent = descriptions[difficulty];
  });

  $('startBtn').addEventListener('click', () => startGame());
  $('playerName').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') startGame();
  });
  $('homeBtn').addEventListener('click', returnToMenu);
  $('returnHomeBtn').addEventListener('click', returnToMenu);
  $('playAgainBtn').addEventListener('click', startGame);
  $('hintBtn').addEventListener('click', revealHint);
}

function returnToMenu() {
  gameSequence++;
  if (game) game.stop();
  if (selectedCountryLayer) selectedCountryLayer = null;
  showScreen('homeScreen');
}

async function loadGeoJSON() {
  if (countriesData) return countriesData;
  for (const url of GEOJSON_SOURCES) {
    try {
      const response = await fetch(url, { cache: 'force-cache' });
      if (!response.ok) continue;
      const data = await response.json();
      if (data.type !== 'FeatureCollection' || !Array.isArray(data.features) || data.features.length < 100) continue;
      countriesData = data;
      return data;
    } catch (error) { console.info('Trying another map source:', url); }
  }
  throw new Error('The country boundary data could not be loaded. Please check your connection and try again.');
}

function countryName(feature) {
  const props = feature.properties || {};
  return props.name || props.ADMIN || props.ADMIN_EN || props.NAME || props.name_en || 'Unknown';
}

function baseCountryStyle(feature) {
  const T = THEMES[category];
  const done = matchedCountries.has(canonical(countryName(feature)));
  return { color: done ? T.okLine : (lightMap ? 'rgba(30,30,30,.55)' : 'rgba(255,255,255,.6)'), weight: done ? 2 : 0.8, opacity: .9, fillColor: done ? T.ok : T.fill, fillOpacity: done ? .62 : .05 };
}

let matchedIds = new Set();
let currentItems = [];
let round = 1;
let overallMatches = 0;
let pointsWon = 0;
let remainingLives = 3;
let totalMistakes = 0;
let bestStreak = 0;
let roundStartTime = 0;
let earnedAchievements = new Set();
let achievementTimer = null;

const ACHIEVEMENTS = {
  first: { icon: '🧭', name: 'First Discovery', description: 'Find your first correct country.' },
  perfect: { icon: '⭐', name: 'Perfect Round', description: 'Complete a round without mistakes.' },
  speed: { icon: '⚡', name: 'Speed Runner', description: 'Complete five matches within 25 seconds.' },
  combo: { icon: '🔥', name: 'Combo Master', description: 'Make five correct matches in a row.' },
  explorer: { icon: '🌍', name: 'World Explorer', description: 'Complete all 15 discoveries.' }
};

function achievementKey() {
  return `worldmatch-achievements-${playerName.trim().toLowerCase()}`;
}
function awardAchievement(id) {
  if (earnedAchievements.has(id)) return;
  earnedAchievements.add(id);
  try {
    const saved = new Set(JSON.parse(localStorage.getItem(achievementKey()) || '[]'));
    saved.add(id);
    localStorage.setItem(achievementKey(), JSON.stringify([...saved]));
  } catch (e) { /* Storage may be disabled */ }
  const badge = ACHIEVEMENTS[id];
  const toast = $('achievementToast');
  toast.replaceChildren();
  const icon = document.createElement('span');
  icon.className = 'badge-icon'; icon.textContent = badge.icon;
  const copy = document.createElement('span');
  const heading = document.createElement('strong'); heading.textContent = 'ACHIEVEMENT UNLOCKED';
  const title = document.createElement('span'); title.textContent = badge.name;
  copy.append(heading, title);
  toast.append(icon, copy);
  toast.classList.add('visible');
  if (achievementTimer) clearTimeout(achievementTimer);
  achievementTimer = setTimeout(() => toast.classList.remove('visible'), 2700);
}
function showAchievementResults() {
  const container = $('achievementResults');
  container.replaceChildren();
  let saved = new Set();
  try { saved = new Set(JSON.parse(localStorage.getItem(achievementKey()) || '[]')); } catch (e) {}
  Object.entries(ACHIEVEMENTS).forEach(([id, badge]) => {
    const unlocked = saved.has(id);
    const chip = document.createElement('div');
    chip.className = `achievement-chip ${unlocked ? 'unlocked' : 'locked'}`;
    const symbol = document.createElement('span'); symbol.className = 'achievement-symbol'; symbol.textContent = unlocked ? badge.icon : '🔒';
    const words = document.createElement('span');
    const name = document.createElement('strong'); name.textContent = badge.name;
    const desc = document.createElement('small'); desc.textContent = badge.description;
    words.append(name, desc); chip.append(symbol, words); container.append(chip);
  });
  $('achievementsCount').textContent = `${saved.size} / ${Object.keys(ACHIEVEMENTS).length} unlocked`;
}

// Every difficulty uses all 15 discoveries. Easier items come first in Explorer mode,
// while Legend begins with the more unusual items, putting more pressure on time.
function buildDeck() {
  const items = BANK[category].items;
  const tiers = [items.slice(0, 5), items.slice(5, 10), items.slice(10, 15)];
  if (difficulty === 'hard') tiers.reverse();
  if (difficulty === 'medium') return shuffle(items);
  return tiers.flatMap(tier => shuffle(tier));
}

async function startGame() {
  const requestedName = $('playerName').value.trim();
  if (!requestedName) {
    $('playerName').placeholder = 'Please type your name first';
    $('playerName').focus();
    return;
  }
  playerName = requestedName;
  difficulty = $('difficulty').value;   // keep in sync with the menu
  gameSequence++;
  const thisGame = gameSequence;
  if (game) game.stop();
  round = 1;
  overallMatches = 0;
  pointsWon = 0;
  remainingLives = 3;
  totalMistakes = 0;
  bestStreak = 0;
  earnedAchievements = new Set();
  $('achievementToast').classList.remove('visible');
  matchedIds = new Set();
  matchedCountries = new Set();
  selectedId = null;
  activeHint = false;
  deck = buildDeck();
  document.body.dataset.theme = category;
  showScreen('gameScreen');
  $('hudPlayer').textContent = playerName;
  $('gameCategoryTitle').innerHTML = `${BANK[category].name} <span>✦</span>`;
  $('mapLoading').classList.remove('hidden', 'error');
  $('mapLoading').textContent = 'Loading countries…';
  setFeedback('Loading the interactive map…');
  try {
    if (typeof L === 'undefined') throw new Error('The Leaflet map library did not load. Please connect to the internet and refresh.');
    const geojson = await loadGeoJSON();
    if (thisGame !== gameSequence) return;
    initializeMap(geojson);
    beginRound();
    $('mapLoading').classList.add('hidden');
  } catch (error) {
    if (thisGame !== gameSequence) return;
    $('mapLoading').classList.add('error');
    $('mapLoading').textContent = error.message;
    setFeedback('Could not load map data. Use Main menu and try again.', 'error');
    console.error(error);
  }
}

function labelInfo(feature) {
  const g = feature.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  let best = null, bestArea = -1;
  polys.forEach((p) => {
    const lngs = p[0].map((c) => c[0]), lats = p[0].map((c) => c[1]);
    const w = Math.max(...lngs) - Math.min(...lngs), h = Math.max(...lats) - Math.min(...lats);
    if (w * h > bestArea) {
      bestArea = w * h;
      best = [(Math.max(...lats) + Math.min(...lats)) / 2, (Math.max(...lngs) + Math.min(...lngs)) / 2];
    }
  });
  const minZoom = bestArea > 200 ? 2 : bestArea > 40 ? 3 : bestArea > 8 ? 4 : bestArea > 2 ? 5 : 6;
  return best ? { name: SHORT[countryName(feature)] || countryName(feature), pos: best, minZoom } : null;
}

function updateLabels() {
  if (!map || !labelLayer) return;
  labelLayer.clearLayers();
  if (osmOn) return; // OpenStreetMap already draws its own names
  if (DIFFICULTIES[difficulty].tooltips !== 'permanent') return;
  const z = map.getZoom();
  labelItems.filter((l) => l.minZoom <= z).forEach((l) => {
    L.marker(l.pos, { interactive: false, keyboard: false, icon: L.divIcon({ className: 'cname', html: `<span style="font-size:${z <= 2 ? 9 : z === 3 ? 10 : 11}px">${l.name}</span>`, iconSize: [0, 0] }) }).addTo(labelLayer);
  });
}

// Easy: light map with our own country names by default. Hard: no OSM option, because OSM prints country names.
function applyBasemap() {
  if (layerControl) map.removeControl(layerControl);
  Object.values(baseLayers).forEach((l) => { if (map.hasLayer(l)) map.removeLayer(l); });
  const options = { ...baseLayers };
  const start = difficulty === 'easy' ? baseLayers['🗺️ Light'] : baseLayers['🛰️ Satellite'];
  start.addTo(map);
  lightMap = start === baseLayers['🗺️ Light'];
  osmOn = false;
  layerControl = L.control.layers(options, null, { position: 'topright' }).addTo(map);
  if (countriesLayer) countriesLayer.setStyle(baseCountryStyle);
}

function initializeMap(geojson) {
  if (!map) {
    map = L.map('map', { zoomControl: false, attributionControl: true, minZoom: 1, maxZoom: 7, worldCopyJump: true, maxBounds: [[-87,-220],[87,220]], maxBoundsViscosity: .65, scrollWheelZoom: true });
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 7, attribution: 'Imagery © Esri' });
    const light = L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager_nolabels/{z}/{x}/{y}{r}.png', { maxZoom: 7, subdomains: 'abcd', attribution: '© OpenStreetMap © CARTO' });
    baseLayers = { '🛰️ Satellite': sat, '🗺️ Light': light };
    map.on('baselayerchange', (e) => {
      lightMap = e.layer === light;
      osmOn = false;
      if (countriesLayer) countriesLayer.setStyle(baseCountryStyle);
      updateLabels();
    });
    labelLayer = L.layerGroup().addTo(map);
    map.on('zoomend', updateLabels);
    map.attributionControl.setPrefix('');
    map.attributionControl.addAttribution('Country boundaries: Natural Earth / public GeoJSON · Leaflet');
  }
  if (countriesLayer) map.removeLayer(countriesLayer);
  countriesLayer = L.geoJSON(geojson, {
    style: baseCountryStyle,
    onEachFeature(feature, layer) {
      const label = countryName(feature);
      layer.on('mouseover', () => {
        if (game?.getSnapshot().finished || layer._glow) return;
        layer.setStyle({ fillColor: THEMES[category].hover, color: '#fff1cf', weight: 1.5, fillOpacity: .4 });
        layer.bringToFront();
      });
      layer.on('mouseout', () => {
        if (!layer._glow) countriesLayer.resetStyle(layer);
      });
      layer.on('click', () => answerForCountry(label, layer));
      if (DIFFICULTIES[difficulty].tooltips === 'hover') layer.bindTooltip(label, { className: 'country-tooltip', sticky: true });
    }
  }).addTo(map);
  applyBasemap();
  labelItems = geojson.features.map(labelInfo).filter(Boolean);
  map.setView([18, 12], 2);
  updateLabels();
  window.requestAnimationFrame(() => map.invalidateSize());
}

function drawEasyLabels() {
  updateLabels();
}

function beginRound() {
  const config = DIFFICULTIES[difficulty];
  const adjusted = { ...config, lives: remainingLives, seconds: Math.max(30, config.seconds - (round - 1) * 10) };
  game = createGameSession(adjusted);
  roundStartTime = Date.now();
  matchedIds = new Set();
  selectedId = null;
  activeHint = false;
  currentItems = shuffle(deck.slice((round - 1) * 5, round * 5));
  matchedCountries = new Set();
  pinMarkers.forEach((m) => map.removeLayer(m));
  pinMarkers = [];
  $('roundText').textContent = `ROUND ${round} / 3`;
  $('cardsNote').textContent = 'Choose a card to get started ↘';
  $('mapGuide').textContent = 'Select a card, then click its country';
  renderCards();
  countriesLayer?.setStyle(baseCountryStyle);
  drawEasyLabels();
  updateHUD();
  setFeedback(`Round ${round}: Match all five discoveries before the time runs out.`);
  const runningGame = game;
  const runId = gameSequence;
  game.tick(() => {
    if (game !== runningGame || runId !== gameSequence) return;
    updateHUD();
  }, () => {
    if (game === runningGame && runId === gameSequence) finishGame('Time is up!');
  });
}

// Wikipedia REST API: fetch a thumbnail, keep the emoji if anything fails.
async function wikiThumb(title) {
  if (photoCache.has(title)) return photoCache.get(title);
  let src = null;
  try {
    const r = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title));
    if (r.ok) { const j = await r.json(); src = (j.thumbnail && j.thumbnail.source) || null; }
  } catch (e) { /* offline: emoji fallback */ }
  photoCache.set(title, src);
  return src;
}

function loadPhoto(item, pic) {
  wikiThumb(item.wiki).then((src) => {
    if (!src) return;
    const img = new Image();
    img.alt = item.name;
    img.onload = () => pic.replaceWith(img);
    img.src = src;
  });
}

function addPin(item, layer) {
  const pos = COORDS[item.country] || layer.getBounds().getCenter();
  const pin = L.marker(pos, { icon: L.divIcon({ className: 'pin', html: `<span>${item.emoji}</span>`, iconSize: [38, 38], iconAnchor: [19, 19] }), interactive: false }).addTo(map);
  pinMarkers.push(pin);
  map.flyTo(pos, 4, { duration: .8 });
  window.setTimeout(() => map.flyTo([18, 12], 2, { duration: .9 }), 1600);
}

function renderCards() {
  const host = $('itemCards');
  host.replaceChildren();
  currentItems.forEach((item, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'item-card';
    card.dataset.id = item.id;
    card.setAttribute('aria-label', `Select ${item.name}`);
    const indexEl = document.createElement('span');
    indexEl.className = 'item-index';
    indexEl.textContent = String(index + 1).padStart(2, '0');
    card.append(indexEl);
    const pic = document.createElement('div');
    pic.className = 'item-emoji';
    pic.textContent = item.emoji;
    card.append(pic);
    loadPhoto(item, pic);
    const caption = document.createElement('div');
    caption.className = 'item-caption';
    caption.textContent = item.name;
    card.append(caption);
    card.addEventListener('click', () => selectCard(item.id));
    host.append(card);
  });
}

function selectCard(id) {
  if (!game || game.getSnapshot().finished || matchedIds.has(id)) return;
  selectedId = id;
  document.querySelectorAll('.item-card').forEach(card => card.classList.toggle('selected', card.dataset.id === id));
  const item = currentItems.find(i => i.id === id);
  $('mapGuide').textContent = `Locate: ${item.name}`;
  $('cardsNote').textContent = `${item.name} selected ✓`;
  setFeedback(`Now click ${item.name}'s country on the map.`);
  updateHintButton();
}

function answerForCountry(label, layer) {
  if (!game || game.getSnapshot().finished) return;
  if (!selectedId) {
    setFeedback('Choose a discovery card first!', 'error');
    return;
  }
  const item = currentItems.find(i => i.id === selectedId);
  if (!item || matchedIds.has(item.id)) return;
  const good = [item.country, ...(item.alt || [])].some((c) => canonical(c) === canonical(label));
  const card = document.querySelector(`.item-card[data-id="${selectedId}"]`);
  if (good) {
    game.addSuccess();
    matchedIds.add(item.id);
    matchedCountries.add(canonical(label));
    overallMatches++;
    const streak = game.getSnapshot().streak;
    bestStreak = Math.max(bestStreak, streak);
    if (overallMatches === 1) awardAchievement('first');
    if (streak >= 5) awardAchievement('combo');
    layer.setStyle({ fillColor: '#3a9e83', color: '#d9ffd6', fillOpacity: .95, weight: 2 });
    card?.classList.remove('selected');
    card?.classList.add('matched');
    if (card) card.disabled = true;
    selectedId = null;
    $('mapGuide').textContent = 'Well done! Choose another card';
    $('cardsNote').textContent = 'Beautifully matched ✨';
    setFeedback(`✓ Correct!${game.getSnapshot().streak > 1 ? ' 🔥 Streak x' + game.getSnapshot().streak : ''} ${item.name} → ${item.country}. ${item.fact}`, 'success');
    countriesLayer?.resetStyle(layer);
    addPin(item, layer);
    updateHUD();
    if (game.getSnapshot().matched === currentItems.length) {
      const finishedRound = game;
      finishedRound.stop();
      pointsWon += finishedRound.getSnapshot().score;
      if (finishedRound.getSnapshot().mistakes === 0) awardAchievement('perfect');
      if ((Date.now() - roundStartTime) <= 25000) awardAchievement('speed');
      if (round === 3) {
        awardAchievement('explorer');
        finishGame('You explored the whole world!', true);
      } else {
        setFeedback(`✦ Round ${round} completed! Next round begins shortly…`, 'success');
        const currentRun = gameSequence;
        window.setTimeout(() => {
          if (currentRun !== gameSequence || game !== finishedRound) return;
          round++;
          beginRound();
        }, 1800);
      }
    }
  } else {
    game.addMistake();
    remainingLives = game.getSnapshot().lives;
    totalMistakes++;
    card?.classList.add('wrong');
    window.setTimeout(() => card?.classList.remove('wrong'), 400);
    setFeedback(`✕ Not quite! ${item.name} does not match ${label}. Try again.`, 'error');
    updateHUD();
    if (game.getSnapshot().lives === 0) finishGame('No lives left!');
  }
}

function revealHint() {
  if (!game || !selectedId) {
    setFeedback('Select a card first to get a hint.', 'error');
    return;
  }
  const item = currentItems.find((i) => i.id === selectedId);
  const level = game.useHint(item.id);
  if (!level) return;
  if (level === 1) {
    setFeedback(`✧ Hint 1: ${item.name} is associated with ${item.continent}. (−${HINT_COST[0].pts} pts)`, 'success');
  } else if (level === 2) {
    const letters = item.country.replace(/ /g, '').length;
    setFeedback(`✧ Hint 2: the country starts with “${item.country[0]}” and has ${letters} letters. (−${HINT_COST[1].sec} sec)`, 'success');
  } else {
    setFeedback(`✧ Hint 3: look at the glowing country! (−${HINT_COST[2].pts} pts)`, 'success');
    countriesLayer.eachLayer((l) => {
      if (canonical(countryName(l.feature)) !== canonical(item.country)) return;
      l._glow = true;
      l.setStyle({ fillColor: '#ffd45c', fillOpacity: .75, color: '#fff', weight: 3 });
      window.setTimeout(() => { l._glow = false; countriesLayer.resetStyle(l); }, 2500);
    });
    if (COORDS[item.country]) map.flyTo(COORDS[item.country], 3, { duration: .8 });
  }
  updateHUD();
}

function finishGame(message, alreadyStopped = false) {
  if (!game) return;
  if (!alreadyStopped && game.getSnapshot().finished) return;
  const finalSnapshot = game.getSnapshot();
  if (!alreadyStopped) {
    pointsWon += finalSnapshot.score;
    game.stop();
  }
  // Scoped local record. This is a same-browser leaderboard, not an online multiplayer score.
  const key = `worldmatch-best-${category}-${difficulty}`;
  let previous = 0;
  try { previous = Number(localStorage.getItem(key) || 0); } catch (e) { /* private browsing */ }
  const record = pointsWon > previous;
  if (record) {
    try { localStorage.setItem(key, String(pointsWon)); } catch (e) { /* private browsing */ }
  }
  $('endTitle').textContent = message;
  $('endSubtitle').textContent = `You completed ${overallMatches} of 15 discoveries in ${BANK[category].name}.`;
  $('endScore').textContent = String(pointsWon).padStart(4, '0');
  $('endPlayer').textContent = playerName;
  $('endCorrect').textContent = `${overallMatches} / 15`;
  $('endBest').textContent = String(Math.max(pointsWon, previous)).padStart(4, '0');
  $('newRecord').classList.toggle('hidden', !record);
  $('endAccuracy').textContent = `${Math.round(overallMatches / Math.max(1, overallMatches + totalMistakes) * 100)}%`;
  $('endCombo').textContent = `${bestStreak}×`;
  showAchievementResults();
  let top = [];
  try { top = JSON.parse(localStorage.getItem('worldmatch-top') || '[]'); } catch (e) { /* ignore */ }
  top.push({ n: playerName, s: pointsWon, c: BANK[category].name });
  top = top.sort((a, b) => b.s - a.s).slice(0, 5);
  try { localStorage.setItem('worldmatch-top', JSON.stringify(top)); } catch (e) { /* ignore */ }
  $('topList').replaceChildren(...top.map((t) => { const li = document.createElement('li'); li.textContent = `${t.n} · ${t.s} · ${t.c}`; return li; }));
  showScreen('endScreen');
}

document.body.dataset.theme = 'foods';
setupHomeEvents();
