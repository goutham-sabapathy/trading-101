# SPY Strategy Decision Matrix (Rule-Based)

## Purpose
A deterministic matrix for selecting SPY options strategy based on:

1. Trend
2. Volatility regime
3. Event risk

This is a structure-selection framework, not a price-prediction model.

## 1. Trend Classification (SPY)

| Trend State | Objective Rule |
|---|---|
| Strong Bull | `price > ema20 > ema50` and price above VWAP |
| Weak Bull | `price > ema50` with mixed structure |
| Neutral | price between `ema20` and `ema50` or chopping around VWAP |
| Weak Bear | `price < ema50` with mixed structure |
| Strong Bear | `price < ema20 < ema50` and price below VWAP |

## 2. Volatility Regime

Use VIX as the core regime variable and IV Rank as confirmation.

| Volatility Regime | Definition |
|---|---|
| Low Vol | `vix < 16` or `iv_rank < 30` |
| Normal Vol | `16 <= vix <= 22` |
| High Vol | `vix > 22` or `iv_rank > 60` |
| Extreme Vol | `vix > 30` |

## 3. Event Risk Filter

If major macro event (CPI/FOMC/high-impact release) is within 48 hours:

- avoid short premium where possible
- reduce size by at least 50%
- prefer defined-risk structures

## 4. Strategy Matrix by Regime

### Low Vol Regime (IV usually cheaper)

| Trend | Preferred Strategy |
|---|---|
| Strong Bull | Long Call (30-45 DTE, around 0.40 delta) |
| Weak Bull | Call Debit Spread |
| Neutral | Calendar Spread |
| Weak Bear | Put Debit Spread |
| Strong Bear | Long Put |

Rationale: in lower-IV regimes, convex long-vol structures are often more favorable than aggressive premium selling.

### Normal Vol Regime

| Trend | Preferred Strategy |
|---|---|
| Strong Bull | Bull Put Credit Spread |
| Weak Bull | Put Credit Spread |
| Neutral | Iron Condor (wider wings) |
| Weak Bear | Call Credit Spread |
| Strong Bear | Bear Put Spread |

### High Vol Regime (premium richer)

| Trend | Preferred Strategy |
|---|---|
| Strong Bull | Put Credit Spread |
| Weak Bull | Put Credit Spread (conservative width) |
| Neutral | Iron Condor |
| Weak Bear | Call Credit Spread |
| Strong Bear | Call Credit Spread |

Guideline: use approximately 30-45 DTE and manage winners around 50-70% of max profit on short-premium structures.

### Extreme Vol Regime

Default posture is defensive.

- very small defined-risk structures only
- or wait for volatility contraction
- or use controlled directional debits after initial expansion settles

Capital preservation takes priority over opportunity capture.

## 5. Global Risk Controls

### No-Trade Conditions

- premarket range > 0.8%
- CPI/FOMC high-impact event tomorrow
- SPY remains inside prior-day range with chop behavior

### Portfolio Limits

- max 3 open SPY positions
- avoid expiration clustering that concentrates more than 50% risk budget into one expiry bucket

## 6. Operational Notes

- Use this matrix to select structure, not to force trades.
- If market state is ambiguous, reduce size or do not trade.
- Validate thresholds with historical testing and periodic recalibration.
