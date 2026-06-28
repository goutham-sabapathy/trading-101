---
title: "Earnings Playbook"
parent: "Strategy Playbooks"
---

# Earnings Playbook (Generic)

> Educational reference for analyzing earnings events and selecting strategy by historical pattern, not just IV environment.

## The Two Numbers That Drive Strategy Choice

For any earnings event, two historical statistics dominate strategy selection over the standard "high IV → sell premium" heuristic:

### 1) Direction Bias

```
Direction Bias = (number of UP D1 prints) / (last N prints)
```

Where `D1` is the next-trading-day return (close-to-close from the *anchor* price, defined below).

| Direction Bias | Tilt |
|---|---|
| ≥ 7/8 UP (≥ 87%) | Strong bullish bias — favor bull put spreads / long calls; deprioritize neutral structures |
| 5–6/8 UP | Mild bullish; iron condors still acceptable but skew them |
| ~4/8 either way | No directional edge; pure IV/PoP analysis |
| ≥ 7/8 DOWN | Strong bearish bias — favor bear call spreads / long puts |

### 2) Beat-Implied Rate

```
Beat-Implied Rate = (number of prints where |actual D1| > implied move) / (last N prints)
```

Where the *implied move* is the pre-event ATM-straddle-derived 1σ expectation.

| Beat-Implied Rate | Tilt |
|---|---|
| > 60% | Long premium has structural edge — actual exceeds implied. Long straddles / strangles or directional debit spreads. |
| 40–60% | No premium edge — IV environment alone drives choice. |
| < 40% | Short premium has structural edge — iron condors, credit spreads. Realized < implied historically. |

**Override rule:** If a stock has 6+/8 quarters where actual > implied **and** the IV environment is "high," **buying premium can still be the right play** despite the high IV. The structural realized-vs-implied gap beats the heuristic.

## The Mandatory 8-Quarter Table

For any pre-earnings analysis, build this:

```
| # | Quarter | Report Date | EPS Est | EPS Act | Surprise % | Anchor $ | Implied | D1 | D5 | Direction | Beat-Implied? |
```

- **Anchor $** — closing price the trading day before the release.
- **Implied** — ATM straddle / spot, *pre-event* (i.e., the day of the release, before the print).
- **D1** — return from anchor to next-day close.
- **D5** — return from anchor to 5-trading-day close.
- **Direction** — UP / DOWN based on D1 sign.
- **Beat-Implied?** — `✅` if `|D1| > implied`, `❌` if `|D1| < implied`.

## D1 vs D5 — Why It Matters

D1 captures the immediate IV-crush + initial directional reaction. D5 captures the market's digestion. They often diverge:

- **D1 small, D5 large** — slow-digestion stock (e.g., large-cap industrials). Short-premium structures should be **closed at D1 close**, not held to weekly expiry.
- **D1 large, D5 partial reversal** — fast money piles in then unwinds. Long-premium structures should harvest the D1 spike; don't hold for trend.
- **D1 large, D5 trend continuation** — narrative-driven move. Long calls / puts can extend.

## Strategy Backtest (Per Quarter)

For each of the last 8 quarters, evaluate which structure *would have won* at ~1σ implied strikes, weekly expiry, D1 close:

| Strategy | Wins if … |
|---|---|
| Iron Condor | `|D1| < implied` (any direction) |
| Bull Put Spread | D1 ≥ 0 (or modestly positive) |
| Bear Call Spread | D1 ≤ 0 (or modestly negative) |
| Long Straddle | `|D1| > implied` (any direction) |
| Long Call | D1 large positive (covers premium) |
| Long Put | D1 large negative (covers premium) |

Sum wins across the 8 quarters to get a **historical PoP per strategy**. Lead recommendations with the highest-PoP structure — don't default to "high IV = sell premium" without checking.

## Sector Read-Through

A print rarely happens in isolation. Before finalizing recommendations:

1. **Sector leader within ±3 trading days?** A bellwether print — for example, the largest-cap or most-watched name in the relevant cluster (semis, banks, consumer tech, wafer-fab equipment, etc.) — drives sympathy in peers.
2. **Macro releases within the window?** FOMC, CPI, PPI, GDP, NFP — any of these can dwarf single-stock prints.
3. **Same-day cluster?** Multiple sector peers on the same day = doubly correlated reactions.

Document which way the read-through flows: "X reports BEFORE this stock → reaction sets the tone" vs "this stock reports first → sets the tone for peers."

## Sell-the-News Pattern

Stocks with **consistent D1 weakness despite EPS beats** are exhibiting "sell the news" — positioning was already extreme entering the print. The trade tells:

- Direction Bias < 30% UP despite Beat Rate > 60% = textbook sell-the-news.
- Strategy: bear call spreads or iron condors with bearish skew, not bull put spreads.
- Why it happens: institutional positioning is fully extended; even good results aren't a marginal buy catalyst.

## Gap & Fill

Many stocks gap on D1 and then partially retrace by D5. If D1 and D5 frequently disagree in sign:

- Short-premium plays must close by D1 (D5 reversals can re-open breached strikes).
- Long-premium plays must be sized to take profit on D1 spike — don't trail for the full move.

## Pre-Earnings IV Behavior

Expect IV to rise into the print (especially in the final 5–7 trading days) and **crush** sharply on the open after the release. Two operational consequences:

1. **Build short-premium structures ~7–10 days before the print** to capture the IV expansion *and* the post-print crush.
2. **Never hold long premium through earnings** unless you've explicitly modeled the IV crush impact on your specific structure. Direction can be right and the position still loses if IV collapses faster than spot moves.

## Earnings Strategy Selection Matrix

| Direction Bias | Beat-Implied Rate | Lead Strategy |
|---|---|---|
| ≥ 7/8 UP | < 40% | **Bull put spread** at ~1σ strikes |
| ≥ 7/8 UP | > 60% | **Long call / bull debit spread** (cheap optionality on structural edge) |
| ~4/8 | < 40% | **Iron condor** at ~1σ strikes |
| ~4/8 | > 60% | **Long straddle / strangle** |
| ≥ 7/8 DOWN | < 40% | **Bear call spread** at ~1σ strikes |
| ≥ 7/8 DOWN | > 60% | **Long put / bear debit spread** |

> Always cross-check with the current Markov regime — earnings tilts can be overridden by a sticky-regime hard gate (e.g., never sell calls in sticky bull, never sell puts in sticky bear).

## Required Pre-Trade Documentation

For each earnings setup, record:

- Confirmed earnings date and BMO/AMC timing
- Anchor price (yesterday's close)
- Implied move from two independent sources (flag any > 2% spread)
- 8-quarter historical table with both required statistics
- Strategy backtest table and identified lead strategy
- Sector read-through events within ±3 trading days
- Existing portfolio positions correlated to this print
- Specific strikes, expiry, credit/debit, breakeven, max profit, max loss, PoP

If any field is missing, the trade is not ready.

## See Also

- [Trading Strategies](./trading-strategies.md) — named-spread mechanics
- [Indicators Reference](./indicators.md) — IV, skew, term structure
- [Regime Detection](./regime-detection.md) — Markov overlay that can override the earnings tilt
