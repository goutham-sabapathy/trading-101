# SPY Premarket Trend Bias Engine

Rule-based, calculation-only, IBKR-first, and incremental by design.

## Objective

Build a local SPY premarket analysis engine that outputs:

- `Bullish`, `Bearish`, or `Neutral`
- total score
- clear reason drivers

Constraints:

- no ML
- no prediction claims
- SPY focus only
- free-first approach
- IBKR (TWS) as primary source
- incremental phase build
- TradingView parity for visual validation

## Core Philosophy

This engine does not attempt to predict outcomes.

It measures:

- current positioning
- structure context
- internals alignment
- participation breadth

Core question:

"Is today structurally aligned for trend up, trend down, or chop?"

## Data Categories (Priority)

### Tier 1: Core Trend Drivers (Required)

#### SPY Structure Inputs

- prior day high, low, close
- prior day VWAP
- daily EMA 20
- premarket price
- gap % vs prior close
- distance from prior high/low

#### ES Structure Inputs

- overnight % change
- overnight high/low
- Globex VWAP (optional)
- relative strength vs SPY

Purpose:

- classify gap continuation vs mean reversion risk
- detect SPY/ES alignment or divergence

### Tier 2: Market Internals Confirmation

- NYSE TICK
- ADD (Advance/Decline)
- TRIN
- VIX change vs prior close

Purpose:

- confirm or invalidate price-side bias
- separate trend day context from chop context

Reference interpretation:

| Indicator | Bullish Context | Bearish Context |
|---|---|---|
| TICK | sustained > +200 | sustained < -200 |
| TRIN | < 1 | > 1 |
| ADD | strong positive | strong negative |
| VIX | flat/down | rising |

### Tier 3: SPY Heavyweight Alignment

Track top SPY weights (example basket):

- AAPL, MSFT, NVDA, AMZN, META, GOOGL, TSLA, BRK.B, JPM, UNH

Metrics:

- % green vs % red
- average % move
- optional weighted alignment score

Purpose:

SPY trend quality improves when key weights align.

## Out of Scope for Initial Version

- ML models
- social sentiment streams
- options flow alert feeds
- institutional sweep tagging
- footprint delta analytics
- prebuilt GEX dashboards

These are later-stage enhancements.

## IBKR Capability and Cost Notes

### IBKR Can Provide

- SPY real-time quotes
- ES futures quotes
- historical bars
- options chains and Greeks
- open interest
- market internals visibility in TWS

### Typical Retail Data Cost Range

| Data | Approx Monthly Cost |
|---|---|
| US equity + futures L1 | $10-20 |
| CME futures | $5-10 |
| CBOE options | $5-10 |

Estimated combined range: roughly `$15-30/month` depending on exact subscriptions.

### IBKR Limitations (Directly)

- no prebuilt GEX metric
- no institutional flow labeling
- no true footprint-style bid/ask delta analytics

## Incremental Build Plan

### Phase 0: Setup (0.5 Day)

- install `ib-insync`, `pandas`, `numpy`, `pandas-ta`
- validate TWS API access
- validate SPY and ES retrieval
- define windows:
  - SPY premarket: `04:00-09:29 ET`
  - ES overnight: `18:00-09:29 ET`

Output:

- local data pull works end-to-end

### Phase 1: Price Structure Engine (Day 1)

Data:

- SPY daily bars
- SPY premarket snapshot
- ES overnight % move

Rules:

- gap direction
- above/below VWAP
- above/below EMA20
- ES alignment check

Example output:

```json
{
  "bias": "Bullish",
  "score": 2,
  "drivers": [
    "Gap up above VWAP",
    "ES overnight positive"
  ]
}
```

### Phase 2: Internals Layer (Day 2)

Add scoring:

- TICK alignment
- TRIN alignment
- ADD alignment
- VIX direction

Scoring baseline:

- aligned internal: `+1`
- opposing internal: `-1`

Output example:

```json
{
  "bias": "Bullish",
  "score": 5,
  "price_score": 2,
  "internals_score": 3,
  "drivers": []
}
```

### Phase 3: Heavyweight Confirmation (Day 3)

Add top holdings breadth:

- >= 70% green: `+2`
- <= 30% green: `-2`

Goal:

- reduce false SPY bias when index components are mixed

### Phase 4: Logging and Persistence (0.5 Day)

Store daily:

- raw inputs
- bias
- score
- day outcome markers

Track:

- directional hit rate by bias
- false positive rate
- trend day capture rate

### Phase 5: TradingView Parity (Day 4-5)

Mirror rules in Pine Script using:

- SPY
- ES1!
- $TICK
- $ADD
- $TRIN
- VIX

Display:

- bias label
- score
- state color coding

Purpose:

- visual calibration
- threshold tuning
- regime sanity checks

## TradingView vs IBKR Architecture

| Feature | IBKR + Python | TradingView |
|---|---|---|
| Custom computation | High control | Limited |
| Options chain access | Yes | No |
| Persistent database | Yes | No |
| Visual validation | Moderate | Strong |
| Automation potential | High | Limited |

Recommended operating model:

- compute in Python
- validate visually in TradingView
- compare outputs for at least 30 sessions

## Example Scoring Model

### Price Score (max +/-4)

- above VWAP: `+1`
- above EMA20: `+1`
- gap > 0.3% aligned with ES: `+2`

### Internals Score (max +/-4)

- positive TICK: `+1`
- TRIN < 1: `+1`
- positive ADD: `+1`
- VIX down: `+1`

### Heavyweights Score (max +/-4)

- >= 70% aligned: `+2`
- major leaders aligned: `+2`

### Bias Mapping

- score `>= +5`: `Bullish`
- score `<= -5`: `Bearish`
- otherwise: `Neutral`

## Future Upgrade Path

Only after logging at least 30 sessions:

1. DXY filter
2. 10Y yield filter
3. DIY GEX approximation layer
4. cross-asset divergence checks
5. explicit regime classifier (trend/chop)

## Key Principle

If price structure, internals, and heavyweights align, the bias quality materially improves.

Do not over-engineer before validating Phase 1-3 across enough sessions.
