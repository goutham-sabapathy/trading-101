---
title: "Market Internals"
parent: "Market Context & Internals"
---

# Market Internals (Generic Reference)

> Educational reference for using market internals to gauge whether index-level conditions support a trade setup.

## Purpose
Market internals help assess whether index-level conditions support or weaken a trade setup.

## Common Internals

- `TICK`: net upticks vs downticks across exchange constituents.
- `ADD` (Advance-Decline): breadth of advancing minus declining stocks.
- `TRIN` (Arms Index): breadth adjusted by volume flow.
- `VOLD`: advancing volume minus declining volume.

## Options-Related Internals

- Gamma exposure (GEX) context.
- Call/put wall zones and dealer hedging pressure.
- Volatility regime (e.g., VIX level and slope).

## Practical Use

- Use internals as regime filters, not standalone entry signals.
- Avoid taking short-vol positions when internals indicate unstable tape.
- Avoid overfitting thresholds; use broad bands and backtest.

## Related References

- [Indicators Reference](./indicators.md) — TICK, ADD, TRIN, VOLD, GEX detail
- [Regime Detection](./regime-detection.md) — internals as regime filters
- [SPY Premarket Trend Bias Engine](./spy-premarket-trend-bias-engine.md) — internals scoring in practice
- [Glossary](./glossary.md) — internals and positioning terms
