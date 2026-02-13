const presetSelect = document.getElementById("preset");
const spotInput = document.getElementById("spot");
const rangePctInput = document.getElementById("rangePct");
const legsBody = document.querySelector("#legsTable tbody");
const canvas = document.getElementById("payoffCanvas");
const summary = document.getElementById("summary");
const notes = document.getElementById("notes");

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

function cloneLegs(sourceLegs) {
  return sourceLegs.map((leg) => ({ ...leg }));
}

function formatMoney(value) {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(value).toFixed(2)}`;
}

function parseNum(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function optionPayoff(leg, stockPrice) {
  const intrinsic = leg.type === "call"
    ? Math.max(stockPrice - leg.strike, 0)
    : Math.max(leg.strike - stockPrice, 0);

  const multiplier = leg.side === "buy" ? 1 : -1;
  return multiplier * leg.qty * (intrinsic - leg.premium);
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
  summary.textContent = `Spot P/L ${formatMoney(payoffAtSpot)} | Approx Max ${formatMoney(maxProfit)} / ${formatMoney(maxLoss)}`;

  notes.innerHTML = [
    `<span class="tag pos">Breakeven(s): ${breakEvens.length ? breakEvens.join(", ") : "none in current range"}</span>`,
    `<span class="tag neg">Range: ${minX.toFixed(1)} - ${maxX.toFixed(1)}</span>`,
    PRESETS[currentPresetKey].note
  ].join(" ");
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
    <td><input data-field="strike" data-index="${index}" type="number" step="0.5" value="${leg.strike}"></td>
    <td><input data-field="premium" data-index="${index}" type="number" step="0.05" value="${leg.premium}"></td>
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

function bindEvents() {
  presetSelect.addEventListener("change", (e) => {
    applyPreset(e.target.value);
  });

  document.getElementById("reset").addEventListener("click", () => {
    applyPreset(currentPresetKey);
  });

  document.getElementById("addLeg").addEventListener("click", () => {
    legs.push({ side: "buy", type: "call", strike: parseNum(spotInput.value, 100), premium: 1, qty: 1 });
    renderLegs();
    drawChart();
  });

  legsBody.addEventListener("input", (e) => {
    const idx = parseNum(e.target.dataset.index, -1);
    const field = e.target.dataset.field;
    if (idx < 0 || !legs[idx] || !field) return;

    if (field === "side" || field === "type") {
      legs[idx][field] = e.target.value;
    } else {
      legs[idx][field] = parseNum(e.target.value, legs[idx][field]);
    }
    drawChart();
  });

  legsBody.addEventListener("click", (e) => {
    const index = e.target.dataset.remove;
    if (index === undefined) return;
    legs.splice(parseNum(index, -1), 1);
    if (legs.length === 0) {
      legs.push({ side: "buy", type: "call", strike: parseNum(spotInput.value, 100), premium: 1, qty: 1 });
    }
    renderLegs();
    drawChart();
  });

  [spotInput, rangePctInput].forEach((el) => {
    el.addEventListener("input", () => {
      drawChart();
    });
  });

  window.addEventListener("resize", () => {
    drawChart();
  });
}

setupPresetOptions();
bindEvents();
applyPreset(currentPresetKey);
