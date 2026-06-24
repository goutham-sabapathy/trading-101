# Common Knowledge Base

A shared, vendor-neutral reference for trading concepts, strategy mechanics, and
rule-based decision frameworks. Use these as building blocks in project-specific
design docs — keep anything proprietary out of this repo.

The docs are grouped below by purpose. Start with **Foundations** if you are new;
jump to **Strategy Playbooks** or the **SPY Decision System** if you already know
the vocabulary.

---

## Foundations

Core vocabulary and the mechanics every other doc builds on.

- **[Glossary](./glossary.md)** — definitions for options, Greeks, volatility,
  flow/positioning, earnings, and regime/statistical terms. Read this first.
- **[Trading Strategies](./trading-strategies.md)** — strategy families plus the
  named-spread reference (verticals, CSP, covered call, diagonals, calendars) with
  construction, max profit/loss, breakeven, and an IV × direction selection matrix.
- **[Indicators Reference](./indicators.md)** — breadth/flow, volatility,
  options-positioning, and regime indicators with typical interpretations.

## Market Context & Internals

Reading the broader tape and the data behind it.

- **[Market Internals](./market-internals.md)** — TICK, ADD, TRIN, VOLD and
  options-related internals used as regime filters.
- **[Market Structure: CHoCH vs BOS](./market-structure-choch-bos.md)** — reading
  swing structure (HH/HL/LL/LH); how Break of Structure confirms a trend and Change
  of Character warns of reversal, with themed diagrams.
- **[Liquidity Sweeps & SMC Execution](./smc-liquidity-sweep.md)** — the stop-hunt
  model: sweep of equal highs/lows → CHoCH → FVG entry → stop/target, with bullish
  and bearish diagrams.
- **[Trend Identification](./trend-identification.md)** — six lenses on whether a
  trend is in force (structure/HH-HL, moving averages, crossovers, breakouts, volume,
  Fibonacci) and how to combine them.
- **[Regime Detection](./regime-detection.md)** — a Markov-style framework for
  labeling Bull/Bear/Sideways regimes and overlaying hard gates on strategy choice.
- **[Data Sources](./data-sources.md)** — provider options by data category and the
  curation standards for storing them.
- **[Tools Comparison](./tools-comparison.md)** — brokerage APIs, data platforms,
  and backtesting stacks with strengths and trade-offs.

## Strategy Playbooks (Generic)

Concrete, screen-and-select playbooks that apply across underlyings.

- **[Cash-Secured Put Playbook](./cash-secured-put-playbook.md)** — the full
  screening checklist for selling puts: volatility edge, strike placement, support
  hierarchy, trend filter, and post-entry management.
- **[Earnings Playbook](./earnings-playbook.md)** — selecting earnings structures by
  historical direction bias and beat-implied rate, the 8-quarter table, and IV-crush
  mechanics.
- **[Opening-Range Breakout](./opening-range-breakout.md)** — the generic session-range
  breakout setup: mark the first 15–30 min range, trade a confirmed close beyond it
  with defined risk.
- **[Bollinger Bands Squeeze](./bollinger-bands-squeeze.md)** — using band
  contraction/expansion as a volatility signal and trading the middle-band breakout.

## SPY-Specific Playbooks & Decision System

> **Ticker-specific.** Everything in this section is built and tuned for **SPY**.
> The underlying concepts (trend/volatility classification, opening-range breakouts,
> deterministic rule mapping) transfer to other liquid index products, but the
> thresholds, sessions, and heavyweight basket are SPY-specific — re-validate before
> applying elsewhere.

A connected, deterministic SPY pipeline (read the tape → classify state → select
structure), plus a standalone intraday setup.

- **[SPY Premarket Trend Bias Engine](./spy-premarket-trend-bias-engine.md)** —
  produces a premarket Bullish/Bearish/Neutral bias from price structure, internals,
  and heavyweight breadth.
- **[SPY Strategy Decision Matrix](./spy-strategy-decision-matrix.md)** — maps trend
  state × volatility regime × event risk to a preferred structure.
- **[SPY Recommendation Engine Rulebook](./spy-recommendation-engine-rulebook.md)** —
  the deterministic, non-ML logic (inputs, classification, sizing, guardrails) that
  implements the matrix.
- **[SPY ORB Options Playbook](./spy-orb-options-playbook.md)** — a standalone
  rule-based Opening Range Breakout options setup with entries, stops, targets, and
  sizing.

## Risk & Discipline

The rules that keep the rest of the system survivable.

- **[Risk and Position Sizing](./risk-and-position-sizing.md)** — trade-, portfolio-,
  and process-level risk controls.
- **[Trading Discipline Framework](./trading-discipline-framework.md)** — the
  R-unit model, setup criteria, daily guardrails, and discipline rules.
- **[Trading Journal Template](./trading-journal-template.md)** — a per-trade logging
  template and review cadence.

## Interactive Tools

- **[Options Strategy Builder](../strategy-builder/index.html)** — an in-browser
  payoff/Greeks visualizer with presets, scenario simulation, and a time-decay chart.

---

### Suggested reading paths

- **New to options:** Glossary → Trading Strategies → Indicators → Risk and Position Sizing → Trading Discipline.
- **Trading earnings:** Earnings Playbook → Trading Strategies → Indicators → Regime Detection.
- **Selling premium / the wheel:** Cash-Secured Put Playbook → Trading Strategies → Risk and Position Sizing.
- **Building the SPY engine:** Premarket Trend Bias Engine → Strategy Decision Matrix → Recommendation Engine Rulebook.
- **Price action / SMC:** Market Structure (CHoCH vs BOS) → Trend Identification → Liquidity Sweeps & SMC Execution.
