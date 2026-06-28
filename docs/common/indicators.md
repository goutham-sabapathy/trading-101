---
title: "Indicators Reference"
parent: "Foundations"
---

# Indicators Reference (Generic)

> Educational reference for the breadth, volatility, positioning, and regime indicators used across the playbooks.

## Breadth and Flow

| Indicator | What It Measures | Typical Interpretation |
|---|---|---|
| TICK | Real-time market pressure | High positive = broad buying pressure |
| ADD | Breadth direction | Rising positive breadth supports trend |
| TRIN | Breadth vs volume balance | Above 1 can indicate risk-off pressure |
| VOLD | Volume participation | Positive VOLD supports risk-on participation |

## Volatility Indicators

| Indicator | What It Measures | Typical Interpretation |
|---|---|---|
| IV | Implied volatility from option prices | Forward-looking risk pricing |
| HV / RV | Historical / realized volatility | Backward-looking actual moves |
| IV Rank | Current IV vs 1Y min/max range | High IV Rank may favor premium selling |
| IV Percentile | Frequency rank of IV vs past year | Distinct from IV Rank; uses cumulative distribution |
| IV / HV Ratio | IV ÷ HV | > 1.0 = options pricing more vol than recently realized |
| Variance Risk Premium (VRP) | Average IV − RV gap | Structural source of edge for net premium sellers |
| Volatility Skew | IV difference across strikes (same expiry) | Put skew = downside fear; **Call skew = upside demand / squeeze pressure** |
| Term Structure | IV across expirations | Contango (normal) vs backwardation (event-driven) |
| VIX Level + Slope | Index of S&P implied vol | Regime filter; sharp spikes = stress |

## Options Positioning Indicators

| Indicator | What It Measures | Typical Interpretation |
|---|---|---|
| Put/Call Ratio | Put volume / call volume (or OI) | > 1.0 = bearish positioning; < 0.7 = bullish |
| Max Pain | Strike with greatest aggregate option-holder loss at expiry | Magnet effect into low-catalyst expirations |
| Call Wall / Put Wall | Strike with extreme OI | Soft resistance / support from dealer hedging |
| GEX | Aggregate dealer gamma exposure | Positive GEX dampens vol; negative amplifies |

## Regime Indicators (see also: [Regime Detection](./regime-detection.md))

| Indicator | What It Measures | Typical Interpretation |
|---|---|---|
| Regime label (Bull / Bear / Sideways) | State from rolling returns or HMM | Drives strategy family selection |
| Persistence diagonal | P[regime → same regime] | > 75% = "sticky"; favors trend-following / premium-selling |
| Regime signal | P(Bull next) − P(Bear next), in [−1, 1] | Sign = direction; magnitude = conviction |
| Stationary distribution | Long-run fraction of time per regime | Bear baseline > 40% = tail-heavy; force defined-risk |
| Walk-forward Sharpe / Max Drawdown | Out-of-sample regime-signal backtest | Quality check on the regime classifier itself |

## Usage Notes

- Indicators are context tools; avoid single-indicator decisions.
- Keep threshold logic in rulebooks and version those thresholds.
- Validate indicator utility per ticker/regime via out-of-sample tests.
- Skew and term-structure inversions often signal known upcoming events (earnings, FDA, macro releases) — verify before assuming structural meaning.

## Related References

- [Regime Detection](./regime-detection.md) — regime indicators in context
- [Market Internals](./market-internals.md) — breadth and flow internals
- [Trading Strategies](./trading-strategies.md) — how indicators map to structures
- [Glossary](./glossary.md) — indicator and volatility definitions
