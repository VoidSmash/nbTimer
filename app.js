import { randomScrambleForEvent } from "https://cubing.net";

const BHAT_METHODS = [
  {
    id: "3x3", puzzle: "3x3x3", eventId: "333", twisty: "3x3x3",
    name: "Bhat (Standard / Bhat-Ω / Bhat-T)",
    stats: "38–42 STM | 11+ TPS | Sub-3.5s Ceiling",
    steps: [
      { title: "1. pFB (Pseudo First Block)", desc: "Build a 1x2x3 block on the left with any D-layer pseudo-offset (D, D', D2). Planned 100% in inspection." },
      { title: "2. EOdM + dBR Square", desc: "Orient all edges while solving DF/DB and a pseudo 1x2x2 block in the back-right using <R, r, U, M>." },
      { title: "3. ELS-CP (or Bhat-Ω / Bhat-T)", desc: "Insert the last slot while solving Corner Permutation (CP). In Bhat-Ω, leave D misaligned until the end; in Bhat-T, skip DFR if a U-block exists." },
      { title: "4. 2GLL + ADF", desc: "Solve the entire Last Layer in 1 look using pure <R, U> turns, snapping the D-offset on the last move." }
    ],
    algs: [
      { subset: "Bhat 2GLL (Sune)", name: "2GLL-S1", setup: "R U2 R' U' R U' R'", alg: "R U R' U R U2 R'" },
      { subset: "Bhat 2GLL (Anti-Sune)", name: "2GLL-AS1", setup: "R' U2 R U R' U R", alg: "R' U' R U' R' U2 R" },
      { subset: "Bhat ELS-CP", name: "ELS-CP #1 (D' Offset)", setup: "M' U' R' U r U R U' D'", alg: "D U R' U' r' U' R U M" },
      { subset: "Bhat-T (Tripod-2GLL)", name: "Tripod-2GLL #1", setup: "D' U R U' R' U R U2 R' U R U' R'", alg: "R U R' U' R U2 R' U' R U R' U' D" }
    ]
  },
  {
    id: "2x2", puzzle: "2x2x2", eventId: "222", twisty: "2x2x2",
    name: "Bhat (2x2)",
    stats: "~9.8 Moves | 14+ TPS | Sub-1.1s Ceiling",
    steps: [
      { title: "1. pFace (2.5 moves)", desc: "Build a 3/4 bottom face with any D-offset or 1 twisted bottom corner." },
      { title: "2. 1-Look TCLL-CP (7.5 moves)", desc: "Execute a single <R, U, F> trigger to twist the final D-corner, orient U, and solve permutation simultaneously." }
    ],
    algs: [
      { subset: "Bhat 2x2", name: "pFace Twist-1", setup: "R U' R' U' R U' R' U2", alg: "U2 R U R' U R U R'" }
    ]
  },
  {
    id: "skewb", puzzle: "Skewb", eventId: "skewb", twisty: "skewb",
    name: "Bhat (Skewb)",
    stats: "~9.0 Moves | 11+ TPS | Sub-1.2s Ceiling",
    steps: [
      { title: "1. pLayer (2.5 moves)", desc: "Build a pseudo-layer (3 solved bottom corners + 1 twisted corner, or misaligned center) to outpace EG for Skewb." },
      { title: "2. L5C-Cancel (6.5 moves)", desc: "Execute a rotationless Sledge/Hedge-cancel alg to twist the bottom corner, fix the center, and solve all 4 top corners in 1 look." }
    ],
    algs: [
      { subset: "Bhat Skewb", name: "pLayer Sledge-Cancel #1", setup: "R' L R L' R' L R L'", alg: "L R' L' R L R' L' R" }
    ]
  },
  {
    id: "pyra", puzzle: "Pyraminx", eventId: "pyraminx", twisty: "pyraminx",
    name: "Bhat (Pyraminx)",
    stats: "~8.0 Moves | 12+ TPS | Sub-1.2s Ceiling",
    steps: [
      { title: "1. Tips + pV (2.5 moves)", desc: "Solve tips while building a pseudo-V with 1 twisted center or flipped V-edge." },
      { title: "2. L4E-Cancel (5.5 moves)", desc: "Resolve the center/edge offset while solving the last 4 edges in 1 look." }
    ],
    algs: [
      { subset: "Bhat Pyraminx", name: "pV-Cancel #1", setup: "R U R' U R U R'", alg: "R U' R' U' R U' R'" }
    ]
  },
  {
    id: "fto", puzzle: "FTO", eventId: "fto", twisty: "fto",
    name: "Bhat (FTO)",
    stats: "~30 Moves | 9.5+ TPS | Sub-3.3s Ceiling",
    steps: [
      { title: "1. pBase + 2 Pairs", desc: "Build the bottom-left pseudo-block and first two center-edge pairs with zero rotations." },
      { title: "2. TO-Pair + <R,U,F> L3T", desc: "Insert the 3rd pair while orienting all remaining triangles, locking into pure 3-gen L3T." }
    ],
    algs: [
      { subset: "Bhat FTO L3T", name: "L3T 3-Cycle CW", setup: "R U R' U R U2 R'", alg: "R U2 R' U' R U' R'" }
    ]
  },
  {
    id: "sq1", puzzle: "Square-1", eventId: "sq1", twisty: "sq1",
    name: "Bhat (Square-1)",
    stats: "~17.5 Slices | 6.5+ SPS | Sub-3.8s Ceiling",
    steps: [
      { title: "1. CSP-Shape", desc: "Solve Cube Shape while guaranteeing even parity (zero parity algs ever)." },
      { title: "2. pFB + SB-EO", desc: "Build left and right 1x1x3 blocks with an unresolved D-offset while orienting edges." },
      { title: "3. pPLL + ADF", desc: "Solve remaining corners and edges in 1 algorithm that snaps the D-offset on the final slice." }
    ],
    algs: [
      { subset: "Bhat SQ1", name: "pLin Adj-Adj", setup: "/ (3,3) / (-1,0) / (2,-4) / (4,-2) / (0,-2) / (-4,2) / (1,-5) / (3,0) /", alg: "/ (-3,0) / (-1,5) / (4,-2) / (0,2) / (-4,2) / (-2,4) / (1,0) / (-3,-3) /" }
    ]
  },
  {
    id: "mega", puzzle: "Megaminx", eventId: "megaminx", twisty: "megaminx",
    name: "Bhat (Megaminx)",
    stats: "~102 Moves | 6.5+ TPS | Sub-17s Ceiling",
    steps: [
      { title: "1. pStar + F2L", desc: "Build a pseudo-aligned Star and first 5 F2L pairs front-to-back." },
      { title: "2. EO-S2L", desc: "Solve the first 3 S2L pairs while orienting all remaining gray Last Layer edges." },
      { title: "3. Mega-ELS-CP + <R,U> 2GLL", desc: "Permute all 5 LL corners on the final S2L slot for a 1-look <R,U> Last Layer." }
    ],
    algs: [
      { subset: "Bhat Mega-2GLL", name: "Mega-Sune", setup: "R U2' R' U' R U' R'", alg: "R U R' U R U2 R'" }
    ]
  },
  {
    id: "big", puzzle: "4x4x4 – 7x7x7", eventId: "444", twisty: "4x4x4",
    name: "Bhat (Big Cubes)",
    stats: "~115 Moves (4x4) | Sub-19s Ceiling",
    steps: [
      { title: "1. First 2 Centers + 3 Left-Block Edges", desc: "Pair DL, FL, and BL instead of a cross, leaving R and U free." },
      { title: "2. Last 4 Centers + 7 Edges", desc: "Pair all edges except DF and DB so you skip Step 1 (pFB) of Bhat completely." },
      { title: "3. Direct Bhat Finish", desc: "Jump straight into EOdM (fixing OLL parity simultaneously) → ELS-CP → 2GLL." }
    ],
    algs: [
      { subset: "Bhat Big-Cube Parity", name: "EOdM + OLL Parity Fix", setup: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'", alg: "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'" }
    ]
  }
];

let currentIdx = 0;
let trainerMethodIdx = 0;
let trainerAlgIdx = 0;
let currentScramble = "";
let solves = JSON.parse(localStorage.getItem("nbtimer_solves") || "[]");
let status = "idle"; // idle | holding | running
let startTime = 0;
let rafId = null;
let holdTimer = null;

function formatTime(ms) {
  if (ms === "DNF") return "DNF";
  const s = ms / 1000;
  const mins = Math.floor(s / 60);
  const secs = (s % 60).toFixed(2);
  return mins > 0 ? `${mins}:${secs.padStart(5, "0")}` : secs;
}

function renderTwisty(containerId, puzzle, setup, alg = "", controls = false) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  const p = document.createElement("twisty-player");
  p.setAttribute("puzzle", puzzle);
  p.setAttribute("experimental-setup-alg", setup);
  if (alg) p.setAttribute("alg", alg);
  p.setAttribute("background", "none");
  if (!controls) p.setAttribute("control-panel", "none");
  p.style.width = "100%";
  p.style.height = "250px";
  el.appendChild(p);
}

window.generateScramble = async function() {
  const m = BHAT_METHODS[currentIdx];
  document.getElementById("scramble-text").textContent = "Generating...";
  const scr = await randomScrambleForEvent(m.eventId);
  currentScramble = scr.toString();
  document.getElementById("scramble-text").textContent = currentScramble;
  renderTwisty("timer-twisty", m.twisty, currentScramble, "", false);
};

window.changeEvent = function() {
  currentIdx = Number(document.getElementById("event-select").value);
  renderSolves();
  window.generateScramble();
};

function calcAo(list, n) {
  if (list.length < n) return "-";
  const vals = list.slice(0, n).map(s => s.penalty === "DNF" ? Infinity : s.time + (s.penalty === "+2" ? 2000 : 0)).sort((a, b) => a - b);
  const trimmed = vals.slice(1, -1);
  if (trimmed.includes(Infinity)) return "DNF";
  return formatTime(trimmed.reduce((a, b) => a + b, 0) / trimmed.length);
}

function renderSolves() {
  const m = BHAT_METHODS[currentIdx];
  const filtered = solves.filter(s => s.puzzle === m.puzzle);
  document.getElementById("stat-ao5").textContent = calcAo(filtered, 5);
  document.getElementById("stat-ao12").textContent = calcAo(filtered, 12);

  const listEl = document.getElementById("solve-list");
  listEl.innerHTML = filtered.map((s, i) => `
    <div class="flex justify-between items-center bg-slate-800/60 px-3 py-1.5 rounded text-sm font-mono">
      <span class="text-slate-400">#${filtered.length - i}</span>
      <span>${s.penalty === "DNF" ? "DNF" : formatTime(s.time + (s.penalty === "+2" ? 2000 : 0))}${s.penalty === "+2" ? "+" : ""}</span>
      <div class="space-x-1 text-xs">
        <button onclick="togglePenalty(${s.id}, '+2')" class="px-1.5 py-0.5 bg-amber-600/30 text-amber-300 rounded">+2</button>
        <button onclick="togglePenalty(${s.id}, 'DNF')" class="px-1.5 py-0.5 bg-rose-600/30 text-rose-300 rounded">DNF</button>
      </div>
    </div>
  `).join("");
}

window.togglePenalty = function(id, type) {
  solves = solves.map(s => s.id === id ? { ...s, penalty: s.penalty === type ? null : type } : s);
  localStorage.setItem("nbtimer_solves", JSON.stringify(solves));
  renderSolves();
};

window.switchTab = function(tab) {
  ["timer", "methods", "trainer"].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle("hidden", t !== tab);
    const btn = document.getElementById(`nav-${t}`);
    btn.className = t === tab
      ? "px-4 py-1.5 rounded-lg font-medium bg-cyan-500 text-slate-950"
      : "px-4 py-1.5 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700";
  });
  if (tab === "methods") renderMethodTab(0);
  if (tab === "trainer") renderTrainerTab(0);
};

window.renderMethodTab = function(idx) {
  const m = BHAT_METHODS[idx];
