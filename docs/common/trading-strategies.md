---
title: "Trading Strategies"
parent: "Foundations"
---

# Trading Strategies (Generic Reference)

> Educational reference for options strategy families, named vertical spreads, and when each is generally considered.

## Purpose
This document summarizes strategy families and when they are generally considered.

## Strategy Families

### 1) Directional
- Long stock / short stock
- Long call / long put
- Debit spreads (bull call, bear put)

Use when directional conviction is high and timing edge exists.

### 2) Volatility Expansion
- Long straddle
- Long strangle
- Calendar/diagonal variants

Use when implied volatility may rise or realized move may exceed implied move.

### 3) Volatility Contraction
- Iron condor
- Iron butterfly
- Defined-risk short straddle equivalents

Use when implied move appears expensive and IV crush is expected.

### 4) Post-Event Momentum/Mean Reversion
- Breakout continuation
- Reversal setups

Use after uncertainty clears and post-event regime is observable.

## Generic Strategy Selection Framework

1. Define objective: direction, volatility, or both.
2. Measure expected move vs historical realized move.
3. Check liquidity and execution quality.
4. Enforce risk limits before selecting strategy.
5. Define entry, exit, and adjustment logic before entry.

## Minimum Pre-Trade Checklist

- Event timing is confirmed.
- Liquidity thresholds are met.
- Max loss is known and acceptable.
- Time stop and hard stop are set.
- Exit criteria are mechanical, not discretionary.

---

## Named Vertical Spread Reference

Vertical spreads are the workhorse of defined-risk options trading. All four are pairs of same-expiry options at different strikes.

### Bull Put Spread (BPS) — Credit, Bullish/Neutral

| Field | Value |
|---|---|
| Construction | Sell put @ K_short, Buy put @ K_long where K_long < K_short |
| Net | Credit |
| Outlook | Bullish or sideways (underlying stays above K_short) |
| Max profit | Credit received |
| Max loss | (K_short − K_long) − credit |
| Breakeven | K_short − credit |
| Best regime | High IV + Bull or Sideways regime |
| PoP approx | `1 − |delta of K_short|` |

### Bear Call Spread (BCS) — Credit, Bearish/Neutral

| Field | Value |
|---|---|
| Construction | Sell call @ K_short, Buy call @ K_long where K_long > K_short |
| Net | Credit |
| Outlook | Bearish or sideways (underlying stays below K_short) |
| Max profit | Credit received |
| Max loss | (K_long − K_short) − credit |
| Breakeven | K_short + credit |
| Best regime | High IV + Bear or Sideways regime |
| PoP approx | `1 − |delta of K_short|` |

### Bull Call Spread — Debit, Directional Bullish

| Field | Value |
|---|---|
| Construction | Buy call @ K_long, Sell call @ K_short where K_short > K_long |
| Net | Debit |
| Outlook | Bullish (need underlying to rise toward K_short) |
| Max profit | (K_short − K_long) − debit |
| Max loss | Debit paid |
| Breakeven | K_long + debit |
| Best regime | Low/Moderate IV + Bull regime |

### Bear Put Spread — Debit, Directional Bearish

| Field | Value |
|---|---|
| Construction | Buy put @ K_long, Sell put @ K_short where K_short < K_long |
| Net | Debit |
| Outlook | Bearish (need underlying to fall toward K_short) |
| Max profit | (K_long − K_short) − debit |
| Max loss | Debit paid |
| Breakeven | K_long − debit |
| Best regime | Low/Moderate IV + Bear regime |

---

## Income / Wheel Strategies

### Cash-Secured Put (CSP)

| Field | Value |
|---|---|
| Construction | Sell put @ K, hold cash = K × 100 per contract |
| Net | Credit |
| Outlook | Bullish/neutral; willing to own at effective price (K − credit) |
| Max profit | Credit received |
| Max loss | (K − credit) × 100 per contract (if underlying → 0) |
| Capital | Full strike value tied up |
| Use case | Income on stocks you want to own at a discount; first leg of the "wheel" |

### Covered Call

| Field | Value |
|---|---|
| Construction | Own 100 shares + sell 1 call @ K |
| Net | Credit |
| Outlook | Neutral/mildly bullish; willing to cap upside above K |
| Max profit | (K − cost basis) + credit |
| Max loss | Cost basis − credit (full stock downside) |
| Use case | Yield enhancement on long stock; second leg of the "wheel" |

---

## Diagonal & Calendar Spreads

### Long Call Diagonal

| Field | Value |
|---|---|
| Construction | Buy back-month call @ K_long, Sell front-month call @ K_short ≥ K_long |
| Net | Debit |
| Outlook | Moderately bullish, gradual drift toward K_short |
| Max profit | Often realized when front-month expires near K_short and back-month still rich |
| Max loss | Debit paid (defined) |
| Use case | Bullish + benefit from front-month theta decay |

### Long Put Diagonal

Mirror of call diagonal for bearish drift.

### Calendar Spread

Same strike, different expiries (sell front, buy back). Profits from front-month theta and a relatively stable IV term structure.

---

## Strategy Selection: IV + Direction Matrix

| Outlook \ IV | Low IV | Moderate IV | High IV |
|---|---|---|---|
| Bullish | Long call, Bull call spread | Bull call spread, Call diagonal | **Bull put spread**, CSP |
| Bearish | Long put, Bear put spread | Bear put spread | **Bear call spread** |
| Neutral | Calendar spread | Iron condor (wide) | **Iron condor**, Iron butterfly |
| High-Vol Expected | Long straddle, Long strangle | Long strangle | (avoid — premium is rich) |

> See [Regime Detection](./regime-detection.md) for how to overlay a Markov regime filter on this matrix.

## Related References

- [Regime Detection](./regime-detection.md) — Markov overlay on the IV/direction matrix
- [Indicators Reference](./indicators.md) — IV, skew, and regime inputs
- [Cash-Secured Put Playbook](./cash-secured-put-playbook.md) — income-strategy deep dive
- [Risk and Position Sizing](./risk-and-position-sizing.md) — defined-risk and sizing rules
- [Glossary](./glossary.md) — spread and structure definitions
