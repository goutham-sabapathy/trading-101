# Earnings Automation Roadmap

Goal:
Build a data-driven earnings strategy engine.

---

# Phase 1 – Data Collector

Use:
- Python
- IBKR API
- Pandas

Collect:
- Earnings dates
- Price before earnings
- Next-day open
- ATM straddle price
- IV before
- IV after

Store in CSV.

---

# Phase 2 – Metrics Engine

Compute:
- Expected move %
- Actual move %
- IV crush %
- Overpricing/Underpricing ratio

---

# Phase 3 – Strategy Recommender

IF actual < expected consistently:
    Recommend: Sell premium

IF actual > expected consistently:
    Recommend: Buy premium

---

# Phase 4 – Backtest Simulator

Simulate:
- 1 contract
- Historical earnings
- Strategy P/L

---

# Phase 5 – Dashboard

Optional:
- Streamlit dashboard
- Earnings heatmap
- Volatility scoring system
