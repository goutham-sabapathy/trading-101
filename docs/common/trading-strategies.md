# Trading Strategies (Generic Reference)

## Purpose
This document summarizes strategy families and when they are generally considered.

## Strategy Families

### 1) Directional
- Long stock / short stock
- Long call / long put
- Debit spreads

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
