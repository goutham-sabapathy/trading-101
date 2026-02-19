# SPY Recommendation Engine Rulebook (Deterministic)

## Purpose
Define concrete rule logic for a SPY-only, non-ML strategy recommendation engine.

## 1. Inputs

Required inputs per decision cycle:

- `spy_price`
- `ema20`
- `ema50`
- `vwap`
- `vix`
- `iv_rank`
- `event_within_48h` (`true`/`false`)
- `account_size`
- `risk_per_trade_percent`

Optional quality filters:

- premarket range percent
- prior-day range location
- session chop metric

## 2. Trend Classification Logic

```python
if spy_price > ema20 > ema50 and spy_price > vwap:
    trend = "strong_bull"
elif spy_price < ema20 < ema50 and spy_price < vwap:
    trend = "strong_bear"
elif spy_price > ema50:
    trend = "weak_bull"
elif spy_price < ema50:
    trend = "weak_bear"
else:
    trend = "neutral"
```

## 3. Volatility Regime Logic

```python
if vix > 30:
    vol = "extreme"
elif vix > 22 or iv_rank > 60:
    vol = "high"
elif vix < 16 or iv_rank < 30:
    vol = "low"
else:
    vol = "normal"
```

## 4. Event Risk Overlay

```python
if event_within_48h:
    short_premium_allowed = False
    size_multiplier = 0.5
    defined_risk_only = True
else:
    short_premium_allowed = True
    size_multiplier = 1.0
    defined_risk_only = True
```

## 5. Strategy Mapping

Use matrix lookup from:

- [`SPY Strategy Decision Matrix`](./spy-strategy-decision-matrix.md)

Example deterministic output payload:

```json
{
  "trend": "weak_bull",
  "vol_regime": "high",
  "event_risk": false,
  "strategy": "put_credit_spread",
  "dte": "30-45",
  "short_delta": "0.25-0.30",
  "target": "50% max profit",
  "stop": "2x credit received"
}
```

## 6. Position Sizing Layer

### Credit Spread

- `max_risk = account_size * risk_per_trade_percent`
- `max_loss_per_contract = spread_width * 100 - net_credit * 100`
- `contracts = floor(max_risk / max_loss_per_contract)`

If contracts = 0, reduce spread width or skip.

### Debit Structures

- risk equals premium paid
- `contracts = floor(max_risk / (debit * 100))`

## 7. Hard Risk Guardrails

### No Trade If

- premarket range > 0.8%
- high-impact macro event tomorrow
- intraday chop condition remains unresolved

### Portfolio Constraints

- maximum 3 concurrent SPY positions
- avoid expiry concentration above 50% of allocated options risk budget

## 8. Engine Output Contract

Each recommendation should emit:

- market state (`trend`, `vol_regime`, `event_risk`)
- chosen strategy and reason code
- structure fields (DTE, deltas, width/strikes guidance)
- risk plan (max loss, stop, target, size)
- gating checks passed/failed

## 9. What This Engine Is and Is Not

This engine does:

- align strategy to regime
- enforce consistent sizing and risk limits
- reduce emotional decision drift

This engine does not:

- predict direction with certainty
- remove all drawdowns
- guarantee profitability

## 10. Upgrade Backlog

1. regime-level historical expectancy tracking
2. implied vs realized volatility spread score
3. skew-aware strike adjustment
4. Kelly-fraction sizing overlay (bounded)
5. volatility-of-volatility guardrail
