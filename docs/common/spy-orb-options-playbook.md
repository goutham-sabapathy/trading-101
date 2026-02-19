# SPY ORB Options Playbook

## Purpose
Reference setup for a rule-based SPY Opening Range Breakout (ORB) options trade.

## 1. Setup Overview

- Setup name: `SPY Opening Range Breakout (ORB)`
- Underlying: `SPY`
- Option tenor: `0DTE` or `1DTE`
- Option selection: target delta `0.30-0.40` (avoid lotto contracts)

## 2. Market Conditions (All Required)

1. Premarket range `< 0.6%`
2. No major scheduled news in the next `30` minutes
3. SPY is clearly above or below VWAP (no chop)

If any condition fails: no trade.

## 3. Opening Structure

- First `15` minutes define the ORB range.

## 4. Entry Rules

### Bullish (Call)

- Price breaks and closes above 15-minute high
- Volume expansion confirms break
- Enter at candle close

### Bearish (Put)

- Price breaks and closes below 15-minute low
- Volume expansion confirms break
- Enter at candle close

## 5. Stop Rules

Exit on the first trigger:

1. Option premium reaches `-30%`
2. Underlying breaks back into opening range

No stop widening.

## 6. Target and Exit Rules

Primary target:

- `+60%` premium (approximately `2R` if stop is `-30%`)

Optional management:

- Take `50%` partial at `+30%`
- Use VWAP or prior-day level as a structure-based exit

## 7. Position Sizing Rules

- Per-trade risk: `0.5%` of account
- Maximum entries: `2` trades per day
- Max daily loss: `1R`

If max daily loss is hit: stop trading for the day.

## 8. Execution Checklist

- Conditions valid? (`Y/N`)
- Entry trigger confirmed? (`Y/N`)
- Stop and target set before entry? (`Y/N`)
- Position size matches risk cap? (`Y/N`)
- Daily loss limit already reached? (`Y/N`)

## 9. Review Metrics

Track setup quality weekly:

- win rate
- average win (`R`)
- average loss (`R`)
- expectancy (`R`)
- rule violation count
- slippage and fill quality notes

## 10. Notes

This playbook is educational and process-focused. Validate with replay/backtest and paper trading before risking capital.
