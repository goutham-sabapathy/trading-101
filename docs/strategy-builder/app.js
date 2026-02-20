const presetSelect = document.getElementById("preset");
const spotInput = document.getElementById("spot");
const rangePctInput = document.getElementById("rangePct");
const legsBody = document.querySelector("#legsTable tbody");
const canvas = document.getElementById("payoffCanvas");
const summary = document.getElementById("summary");
const notes = document.getElementById("notes");
const scenarioSelect = document.getElementById("scenario");
const daysToExpiryInput = document.getElementById("daysToExpiry");
const volatilityInput = document.getElementById("volatility");
const simulateBtn = document.getElementById("simulateBtn");
const timeDecayCanvas = document.getElementById("timeDecayCanvas");

const PRESETS = {
  long_call: {
    label: "Long Call",
    spot: 100,
    legs: [{ side: "buy", type: "call", strike: 100, premium: 5, qty: 1 }],
    note: "Directional bullish trade with limited downside and unlimited upside."
  },
  long_put: {
    label: "Long Put",
    spot: 100,
    legs: [{ side: "buy", type: "put", strike: 100, premium: 4.5, qty: 1 }],
    note: "Directional bearish trade with limited downside and large downside participation."
  },
  bull_call_spread: {
    label: "Bull Call Spread",
    spot: 100,
    legs: [
      { side: "buy", type: "call", strike: 95, premium: 8, qty: 1 },
      { side: "sell", type: "call", strike: 105, premium: 3.8, qty: 1 }
    ],
    note: "Defined-risk bullish strategy with capped upside and lower cost than naked long call."
  },
  bear_put_spread: {
    label: "Bear Put Spread",
    spot: 100,
    legs: [
      { side: "buy", type: "put", strike: 105, premium: 7.5, qty: 1 },
      { side: "sell", type: "put", strike: 95, premium: 3.2, qty: 1 }
    ],
    note: "Defined-risk bearish structure that lowers premium outlay versus long put."
  },
  long_straddle: {
    label: "Long Straddle",
    spot: 100,
    legs: [
      { side: "buy", type: "call", strike: 100, premium: 6.2, qty: 1 },
      { side: "buy", type: "put", strike: 100, premium: 5.8, qty: 1 }
    ],
    note: "Long-volatility strategy that benefits from large move in either direction."
  },
  long_strangle: {
    label: "Long Strangle",
    spot: 100,
    legs: [
      { side: "buy", type: "call", strike: 106, premium: 3.7, qty: 1 },
      { side: "buy", type: "put", strike: 94, premium: 3.4, qty: 1 }
    ],
    note: "Cheaper than straddle but needs larger move to reach break-even."
  },
  iron_condor: {
    label: "Iron Condor",
    spot: 100,
    legs: [
      { side: "buy", type: "put", strike: 90, premium: 1.0, qty: 1 },
      { side: "sell", type: "put", strike: 95, premium: 2.1, qty: 1 },
      { side: "sell", type: "call", strike: 105, premium: 2.0, qty: 1 },
      { side: "buy", type: "call", strike: 110, premium: 0.9, qty: 1 }
    ],
    note: "Defined-risk short-volatility setup with a broad profitable middle range."
  },
  iron_butterfly: {
    label: "Iron Butterfly",
    spot: 100,
    legs: [
      { side: "buy", type: "put", strike: 92, premium: 1.1, qty: 1 },
      { side: "sell", type: "put", strike: 100, premium: 4.5, qty: 1 },
      { side: "sell", type: "call", strike: 100, premium: 4.6, qty: 1 },
      { side: "buy", type: "call", strike: 108, premium: 1.2, qty: 1 }
    ],
    note: "High-credit defined-risk short-volatility trade with tighter profit zone than condor."
  }
};

let currentPresetKey = "long_straddle";
let legs = [];
let simulationInterval = null;
let currentDays = 30;
let currentVolatility = 0.25;

const RISK_FREE_RATE = 0.05; // Risk-free rate used in options pricing

const SCENARIOS = {
  neutral: {
    label: "Neutral Market",
    drift: 0,
    volatility: 0.20,
    description: "Low volatility, range-bound market with minimal directional bias"
  },
  bullish: {
    label: "Bullish Trend",
    drift: 0.002,
    volatility: 0.18,
    description: "Steady upward price movement with moderate volatility"
  },
  bearish: {
    label: "Bearish Trend",
    drift: -0.002,
    volatility: 0.22,
    description: "Steady downward price movement with elevated volatility"
  },
  high_vol: {
    label: "High Volatility",
    drift: 0,
    volatility: 0.45,
    description: "Large price swings, elevated IV - good for long straddles/strangles"
  },
  vol_crush: {
    label: "Volatility Crush",
    drift: 0.001,
    volatility: 0.12,
    description: "Post-event IV collapse - benefits short volatility strategies"
  }
};

function formatMoney(value) {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(value).toFixed(2)}`;
}

function parseNum(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function normalizeLeg(leg) {
  const basePremium = Math.max(0.01, parseNum(leg.entryPremium ?? leg.premium ?? leg.markPremium, 1));
  return {
    ...leg,
    strike: Math.max(0.01, parseNum(leg.strike, 100)),
    qty: Math.max(1, Math.round(parseNum(leg.qty, 1))),
    entryPremium: basePremium,
    markPremium: Math.max(0.01, parseNum(leg.markPremium, basePremium)),
    premium: basePremium
  };
}

function cloneLegs(sourceLegs) {
  return sourceLegs.map((leg) => normalizeLeg(leg));
}

function getEntryPremium(leg) {
  return Math.max(0.01, parseNum(leg.entryPremium ?? leg.premium, 1));
}

function setEntryPremium(leg, premium) {
  const cleanPremium = Math.max(0.01, parseNum(premium, 1));
  leg.entryPremium = cleanPremium;
  leg.premium = cleanPremium;
  leg.markPremium = cleanPremium;
}

function sanitizeOptionInputs(S, K, T, sigma) {
  return {
    S: Math.max(0.01, parseNum(S, 0.01)),
    K: Math.max(0.01, parseNum(K, 0.01)),
    T: Math.max(0, parseNum(T, 0)),
    sigma: Math.max(0.0001, parseNum(sigma, 0.0001))
  };
}

// Black-Scholes approximation for option pricing
function blackScholesCall(S, K, T, r, sigma) {
  ({ S, K, T, sigma } = sanitizeOptionInputs(S, K, T, sigma));
  if (T <= 0) return Math.max(S - K, 0);
  
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  return S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
}

function blackScholesPut(S, K, T, r, sigma) {
  ({ S, K, T, sigma } = sanitizeOptionInputs(S, K, T, sigma));
  if (T <= 0) return Math.max(K - S, 0);
  
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  return K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1);
}

// Cumulative distribution function for standard normal
function normCDF(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
}

// Calculate Greeks
function calculateDelta(S, K, T, r, sigma, type) {
  ({ S, K, T, sigma } = sanitizeOptionInputs(S, K, T, sigma));
  if (T <= 0) return type === "call" ? (S > K ? 1 : 0) : (S < K ? -1 : 0);
  
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  
  if (type === "call") {
    return normCDF(d1);
  } else {
    return normCDF(d1) - 1;
  }
}

function calculateTheta(S, K, T, r, sigma, type) {
  ({ S, K, T, sigma } = sanitizeOptionInputs(S, K, T, sigma));
  if (T <= 0) return 0;
  
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const pdf_d1 = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-d1 * d1 / 2);
  
  if (type === "call") {
    const theta = (-S * pdf_d1 * sigma / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normCDF(d2)) / 365;
    return theta;
  } else {
    const theta = (-S * pdf_d1 * sigma / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * normCDF(-d2)) / 365;
    return theta;
  }
}

function calculateVega(S, K, T, r, sigma) {
  ({ S, K, T, sigma } = sanitizeOptionInputs(S, K, T, sigma));
  if (T <= 0) return 0;
  
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const pdf_d1 = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-d1 * d1 / 2);
  
  return S * pdf_d1 * Math.sqrt(T) / 100; // Vega per 1% change in volatility
}

// Update premium based on current market conditions
function updatePremium(leg, spot, days, vol) {
  const T = Math.max(0, parseNum(days, 0)) / 365;
  
  const theoreticalPrice = leg.type === "call" 
    ? blackScholesCall(spot, leg.strike, T, RISK_FREE_RATE, vol)
    : blackScholesPut(spot, leg.strike, T, RISK_FREE_RATE, vol);
  
  return Math.max(0.01, theoreticalPrice);
}

function optionPayoff(leg, stockPrice) {
  const intrinsic = leg.type === "call"
    ? Math.max(stockPrice - leg.strike, 0)
    : Math.max(leg.strike - stockPrice, 0);

  const multiplier = leg.side === "buy" ? 1 : -1;
  return multiplier * leg.qty * (intrinsic - getEntryPremium(leg));
}

function totalPayoff(stockPrice) {
  return legs.reduce((sum, leg) => sum + optionPayoff(leg, stockPrice), 0);
}

function priceRange() {
  const spot = Math.max(parseNum(spotInput.value, 100), 1);
  const pct = Math.min(Math.max(parseNum(rangePctInput.value, 35), 10), 80) / 100;
  const min = Math.max(0.01, spot * (1 - pct));
  const max = spot * (1 + pct);
  return { min, max, spot };
}

function buildCurvePoints() {
  const { min, max } = priceRange();
  const points = [];
  const steps = 180;

  for (let i = 0; i <= steps; i += 1) {
    const x = min + ((max - min) * i) / steps;
    points.push({ x, y: totalPayoff(x) });
  }

  return points;
}

function approxBreakEvens(points) {
  const result = [];
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    if ((a.y <= 0 && b.y >= 0) || (a.y >= 0 && b.y <= 0)) {
      const dy = b.y - a.y;
      const ratio = dy === 0 ? 0 : (0 - a.y) / dy;
      const x = a.x + (b.x - a.x) * ratio;
      result.push(x);
    }
  }
  return [...new Set(result.map((v) => v.toFixed(2)))].map(Number);
}

function drawChart() {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const margin = { top: 24, right: 26, bottom: 46, left: 64 };

  const points = buildCurvePoints();
  const ys = points.map((p) => p.y);
  const xs = points.map((p) => p.x);

  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }

  const padY = (maxY - minY) * 0.15;
  minY -= padY;
  maxY += padY;

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  const mapX = (x) => margin.left + ((x - minX) / (maxX - minX)) * (width - margin.left - margin.right);
  const mapY = (y) => height - margin.bottom - ((y - minY) / (maxY - minY)) * (height - margin.top - margin.bottom);

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#e9e4d8";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 6; i += 1) {
    const y = margin.top + ((height - margin.top - margin.bottom) * i) / 6;
    ctx.beginPath();
    ctx.moveTo(margin.left, y);
    ctx.lineTo(width - margin.right, y);
    ctx.stroke();
  }

  const zeroY = mapY(0);
  const spot = parseNum(spotInput.value, 100);
  const spotX = mapX(spot);

  ctx.strokeStyle = "#cfd6dd";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(margin.left, zeroY);
  ctx.lineTo(width - margin.right, zeroY);
  ctx.stroke();

  ctx.strokeStyle = "#f0a16f";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(spotX, margin.top);
  ctx.lineTo(spotX, height - margin.bottom);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.lineWidth = 2.6;
  ctx.strokeStyle = "#0e7a78";
  ctx.beginPath();
  points.forEach((point, idx) => {
    const x = mapX(point.x);
    const y = mapY(point.y);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  const payoffAtSpot = totalPayoff(spot);
  ctx.fillStyle = payoffAtSpot >= 0 ? "#14854f" : "#bf3341";
  ctx.beginPath();
  ctx.arc(spotX, mapY(payoffAtSpot), 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#4d5560";
  ctx.font = "12px JetBrains Mono";
  ctx.fillText(`S: ${spot.toFixed(2)}`, Math.max(margin.left, Math.min(spotX - 22, width - margin.right - 52)), height - 16);
  ctx.fillText("P/L 0", 16, zeroY + 4);
  ctx.fillText(minX.toFixed(0), margin.left - 6, height - 16);
  ctx.fillText(maxX.toFixed(0), width - margin.right - 28, height - 16);

  const breakEvens = approxBreakEvens(points);
  breakEvens.forEach((be) => {
    const x = mapX(be);
    ctx.strokeStyle = "#68727d";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, zeroY - 8);
    ctx.lineTo(x, zeroY + 8);
    ctx.stroke();
  });

  const maxProfit = Math.max(...ys);
  const maxLoss = Math.min(...ys);
  
  // Calculate total Greeks
  const spotPrice = parseNum(spotInput.value, 100);
  const days = Math.max(0, parseNum(daysToExpiryInput.value, currentDays));
  const vol = Math.max(0.0001, parseNum(volatilityInput.value, currentVolatility) / 100); // Convert from percentage to decimal
  const T = days / 365;
  
  let totalDelta = 0, totalTheta = 0, totalVega = 0;
  legs.forEach((leg) => {
    const multiplier = leg.side === "buy" ? 1 : -1;
    totalDelta += multiplier * leg.qty * calculateDelta(spotPrice, leg.strike, T, RISK_FREE_RATE, vol, leg.type);
    totalTheta += multiplier * leg.qty * calculateTheta(spotPrice, leg.strike, T, RISK_FREE_RATE, vol, leg.type);
    totalVega += multiplier * leg.qty * calculateVega(spotPrice, leg.strike, T, RISK_FREE_RATE, vol);
  });

  const selectedScenario = scenarioSelect && SCENARIOS[scenarioSelect.value] ? SCENARIOS[scenarioSelect.value] : null;

  summary.textContent = `Spot P/L ${formatMoney(payoffAtSpot)} | Max ${formatMoney(maxProfit)} / ${formatMoney(maxLoss)} | Δ: ${totalDelta.toFixed(2)} | Θ: ${totalTheta.toFixed(2)} | ν: ${totalVega.toFixed(2)}`;

  notes.innerHTML = [
    `<span class="tag pos">Breakeven(s): ${breakEvens.length ? breakEvens.join(", ") : "none in current range"}</span>`,
    `<span class="tag neg">Range: ${minX.toFixed(1)} - ${maxX.toFixed(1)}</span>`,
    selectedScenario ? `<span class="tag scenario">${selectedScenario.description}</span>` : "",
    PRESETS[currentPresetKey].note
  ].filter(Boolean).join(" ");
}

function renderLegRow(leg, index) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>
      <select data-field="side" data-index="${index}">
        <option value="buy" ${leg.side === "buy" ? "selected" : ""}>Buy</option>
        <option value="sell" ${leg.side === "sell" ? "selected" : ""}>Sell</option>
      </select>
    </td>
    <td>
      <select data-field="type" data-index="${index}">
        <option value="call" ${leg.type === "call" ? "selected" : ""}>Call</option>
        <option value="put" ${leg.type === "put" ? "selected" : ""}>Put</option>
      </select>
    </td>
    <td><input data-field="strike" data-index="${index}" type="number" step="0.5" min="0.01" value="${leg.strike}"></td>
    <td><input data-field="premium" data-index="${index}" type="number" step="0.05" min="0.01" value="${getEntryPremium(leg)}"></td>
    <td><input data-field="qty" data-index="${index}" type="number" step="1" min="1" value="${leg.qty}"></td>
    <td><button data-remove="${index}" class="remove">x</button></td>
  `;

  return tr;
}

function renderLegs() {
  legsBody.innerHTML = "";
  legs.forEach((leg, i) => legsBody.appendChild(renderLegRow(leg, i)));
}

function applyPreset(presetKey) {
  const preset = PRESETS[presetKey];
  currentPresetKey = presetKey;
  spotInput.value = preset.spot;
  legs = cloneLegs(preset.legs);
  renderLegs();
  drawChart();
  drawTimeDecayChart();
}

function setupPresetOptions() {
  Object.entries(PRESETS).forEach(([key, preset]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = preset.label;
    presetSelect.appendChild(option);
  });

  presetSelect.value = currentPresetKey;
}

function setupScenarioOptions() {
  Object.entries(SCENARIOS).forEach(([key, scenario]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = scenario.label;
    scenarioSelect.appendChild(option);
  });
  
  scenarioSelect.value = "neutral";
}

function drawTimeDecayChart() {
  if (!timeDecayCanvas) return;
  
  const ctx = timeDecayCanvas.getContext("2d");
  const width = timeDecayCanvas.width;
  const height = timeDecayCanvas.height;
  const margin = { top: 20, right: 20, bottom: 35, left: 50 };
  
  const spot = parseNum(spotInput.value, 100);
  const currentDaysToExpiry = Math.max(0, parseNum(daysToExpiryInput.value, currentDays));
  const safeTotalDays = Math.max(currentDaysToExpiry, 0.0001);
  const vol = Math.max(0.0001, parseNum(volatilityInput.value, currentVolatility) / 100); // Convert from percentage to decimal
  
  // Calculate P/L over time (from now until expiry)
  const points = [];
  const steps = 30;
  
  for (let i = 0; i <= steps; i++) {
    const daysPassed = (currentDaysToExpiry * i) / steps;
    const daysRemaining = currentDaysToExpiry - daysPassed;
    let totalPL = 0;
    
    legs.forEach((leg) => {
      const premium = updatePremium(leg, spot, daysRemaining, vol);
      const multiplier = leg.side === "buy" ? 1 : -1;
      totalPL += multiplier * leg.qty * (premium - getEntryPremium(leg));
    });
    
    points.push({ x: daysPassed, y: totalPL });
  }
  
  const ys = points.map((p) => p.y);
  let minY = Math.min(...ys, 0);
  let maxY = Math.max(...ys, 0);
  
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }
  
  const padY = (maxY - minY) * 0.15;
  minY -= padY;
  maxY += padY;
  
  const mapX = (x) => margin.left + (x / safeTotalDays) * (width - margin.left - margin.right);
  const mapY = (y) => height - margin.bottom - ((y - minY) / (maxY - minY)) * (height - margin.top - margin.bottom);
  
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  
  // Grid lines
  ctx.strokeStyle = "#e9e4d8";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = margin.top + ((height - margin.top - margin.bottom) * i) / 4;
    ctx.beginPath();
    ctx.moveTo(margin.left, y);
    ctx.lineTo(width - margin.right, y);
    ctx.stroke();
  }
  
  // Zero line
  const zeroY = mapY(0);
  ctx.strokeStyle = "#cfd6dd";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(margin.left, zeroY);
  ctx.lineTo(width - margin.right, zeroY);
  ctx.stroke();
  
  // Plot curve
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = "#8e44ad";
  ctx.beginPath();
  points.forEach((point, idx) => {
    const x = mapX(point.x);
    const y = mapY(point.y);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  
  // Labels
  ctx.fillStyle = "#4d5560";
  ctx.font = "11px JetBrains Mono";
  ctx.fillText("Days Passed", width / 2 - 30, height - 8);
  ctx.fillText("0", margin.left - 5, height - 15);
  ctx.fillText(currentDaysToExpiry.toFixed(1), width - margin.right - 22, height - 15);
  ctx.fillText("P/L", 8, margin.top + 5);
}

function simulateScenario() {
  const scenario = SCENARIOS[scenarioSelect.value];
  
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulateBtn.textContent = "Start Simulation";
    simulationInterval = null;
    return;
  }
  
  simulateBtn.textContent = "Stop Simulation";
  currentVolatility = scenario.volatility;
  volatilityInput.value = (scenario.volatility * 100).toFixed(0);
  
  let ticks = 0;
  simulationInterval = setInterval(() => {
    ticks++;
    
    // Update spot price with drift and random walk
    const currentSpot = parseNum(spotInput.value, 100);
    const dt = 1 / 252; // Daily time step
    const randomShock = (Math.random() - 0.5) * 2;
    const newSpot = currentSpot * (1 + scenario.drift + scenario.volatility * Math.sqrt(dt) * randomShock);
    
    spotInput.value = Math.max(0.01, newSpot).toFixed(2);
    
    // Update days to expiry
    const currentDaysVal = parseNum(daysToExpiryInput.value, currentDays);
    if (currentDaysVal > 0) {
      daysToExpiryInput.value = Math.max(0, currentDaysVal - 0.5).toFixed(1);
    }
    
    // Update premiums
    updateAllPremiums();
    
    drawChart();
    drawTimeDecayChart();
    
    // Stop after 60 ticks or when expiry is reached
    if (ticks >= 60 || parseNum(daysToExpiryInput.value, 0) <= 0) {
      clearInterval(simulationInterval);
      simulateBtn.textContent = "Start Simulation";
      simulationInterval = null;
    }
  }, 300);
}

function updateAllPremiums() {
  const spot = parseNum(spotInput.value, 100);
  const days = Math.max(0, parseNum(daysToExpiryInput.value, currentDays));
  const vol = Math.max(0.0001, parseNum(volatilityInput.value, currentVolatility) / 100);

  legs.forEach((leg) => {
    leg.markPremium = updatePremium(leg, spot, days, vol);
  });
}

function bindEvents() {
  presetSelect.addEventListener("change", (e) => {
    applyPreset(e.target.value);
  });

  document.getElementById("reset").addEventListener("click", () => {
    applyPreset(currentPresetKey);
  });

  document.getElementById("addLeg").addEventListener("click", () => {
    legs.push(normalizeLeg({ side: "buy", type: "call", strike: parseNum(spotInput.value, 100), premium: 1, qty: 1 }));
    renderLegs();
    drawChart();
    drawTimeDecayChart();
  });

  legsBody.addEventListener("input", (e) => {
    const idx = parseNum(e.target.dataset.index, -1);
    const field = e.target.dataset.field;
    if (idx < 0 || !legs[idx] || !field) return;

    if (field === "side" || field === "type") {
      legs[idx][field] = e.target.value;
    } else if (field === "strike") {
      legs[idx].strike = Math.max(0.01, parseNum(e.target.value, legs[idx].strike));
    } else if (field === "qty") {
      legs[idx].qty = Math.max(1, Math.round(parseNum(e.target.value, legs[idx].qty)));
    } else if (field === "premium") {
      setEntryPremium(legs[idx], parseNum(e.target.value, getEntryPremium(legs[idx])));
    } else {
      legs[idx][field] = parseNum(e.target.value, legs[idx][field]);
    }
    drawChart();
    drawTimeDecayChart();
  });

  legsBody.addEventListener("click", (e) => {
    const index = e.target.dataset.remove;
    if (index === undefined) return;
    legs.splice(parseNum(index, -1), 1);
    if (legs.length === 0) {
      legs.push(normalizeLeg({ side: "buy", type: "call", strike: parseNum(spotInput.value, 100), premium: 1, qty: 1 }));
    }
    renderLegs();
    drawChart();
    drawTimeDecayChart();
  });

  [spotInput, rangePctInput, daysToExpiryInput, volatilityInput].forEach((el) => {
    el.addEventListener("input", () => {
      drawChart();
      drawTimeDecayChart();
    });
  });
  
  scenarioSelect.addEventListener("change", () => {
    const scenario = SCENARIOS[scenarioSelect.value];
    volatilityInput.value = (scenario.volatility * 100).toFixed(0);
    currentVolatility = scenario.volatility;
    updateAllPremiums();
    drawChart();
    drawTimeDecayChart();
  });
  
  simulateBtn.addEventListener("click", simulateScenario);

  window.addEventListener("resize", () => {
    drawChart();
    drawTimeDecayChart();
  });
}

setupPresetOptions();
setupScenarioOptions();
bindEvents();
applyPreset(currentPresetKey);
drawTimeDecayChart();
