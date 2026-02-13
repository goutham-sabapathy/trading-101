# Rulebook: Earnings Options Recommendation Engine

## 1. Rule Categories

1. Universe rules
2. Screener rules
3. Strategy selection rules
4. Entry/exit rules
5. Adjustment rules
6. Risk override rules

## 2. Universe and Screener Rules

- Include only tickers with liquid options (OI, volume, spread thresholds).
- Require confirmed earnings timestamp and event confidence score.
- Require suitable expiries around event date.
- Exclude names with unresolved corporate-action conflicts.

## 3. Strategy Selection Rules (v1)

### Long Vol Setup (Long Straddle)
Use when:
- implied move is below historical realized event distribution,
- liquidity is high,
- and pre-event conditions do not invalidate pricing assumptions.

### Short Vol Setup (Defined-Risk Condor / Defined-Risk Short Straddle Equivalent)
Use when:
- implied move is rich vs historical realized,
- expected IV crush is strong,
- and spread/liquidity quality supports execution.

## 4. Entry Timing Rules

### Playbook A: IV Run-Up
- Typical window: `T-20` to `T-10`.
- Exit before earnings: `T-2` to `T-1`.

### Playbook B: Event Move Capture
- Typical entry: `T-1`.
- Exit: `T+0` or `T+1` by target/stop/time rule.

Actual playbook choice must be rule-driven per ticker/regime.

## 5. Exit Rules

- Hard stop loss.
- Profit target.
- Time stop (mandatory event deadline).
- Liquidity deterioration stop (if spreads exceed threshold).

## 6. Adjustment Rules

- Partial de-risking when one leg reaches defined gain threshold.
- For short structures, predefined hedge/roll logic only.
- No discretionary adjustments outside rulebook.

## 7. Risk Overrides

- Reject trade if max-loss exceeds configured limit.
- Reject trade if aggregate portfolio Greeks breach limits.
- Reject trade under abnormal volatility-regime kill-switch.

## 8. Explainability Requirement

Every fired rule must emit:
- rule id
- decision contribution
- input values and thresholds
- timestamp and rule version
