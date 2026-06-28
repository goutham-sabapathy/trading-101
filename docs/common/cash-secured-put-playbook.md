---
title: "Cash-Secured Put Playbook"
parent: "Strategy Playbooks"
---

# Cash-Secured Put (CSP) Playbook (Generic)

> Educational reference for selecting and screening cash-secured puts. A CSP is an **obligation to buy** the underlying at the strike if assigned — so the first rule is: only sell on names you would genuinely accept owning at the breakeven price.

## What a CSP Is

You sell (write) a put and set aside the cash to buy 100 shares at the strike. You collect the premium up front. Two outcomes at expiry:

- **Stock stays above the strike** — put expires worthless, you keep the full premium. This is the goal.
- **Stock drops below the strike** — you are assigned and buy 100 shares at the strike, effective cost basis = `strike − premium` (the breakeven).

```
Collateral   = strike × 100               (cash secured)
Premium      = mid price × 100            (credit received)
Breakeven    = strike − premium-per-share (effective buy price if assigned)
Return on Collateral (ROC) = premium ÷ collateral
Annualized ROC = ROC × (365 ÷ DTE)
Max loss     = (strike − premium) × 100   (if stock goes to zero)
```

## The Volatility Edge — Is It Worth Selling?

A high *absolute* IV is not an edge by itself; many high-momentum names carry 70–130% realized vol, so their IV only looks high. The edge is when **implied vol is priced richer than realized vol**.

| Metric | Threshold | Why it matters |
|---|---|---|
| IV / HV ratio | **> 1.10** ideal · > 1.0 minimum | Below 1.0 you are selling vol cheaper than the stock actually moves — negative edge |
| IV Rank | **> 50**, ideally > 70 | Current IV is high vs its own trailing-year range — premium is fat |
| Variance Risk Premium (VRP) | Positive (IV − RV gap) | The structural reason net premium selling pays over time |

> See [Indicators Reference](./indicators.md) for IV / HV / IV Rank / VRP definitions.

## RSI — How a Put-Seller Reads It

RSI (Relative Strength Index, default 14-period) is a 0–100 momentum oscillator measuring the speed and size of recent up-moves vs down-moves.

| RSI zone | State | CSP implication |
|---|---|---|
| > 70 | Overbought | Risky to sell into — mean-reversion / pullback more likely; you can get tested fast |
| 55–70 | Strong bullish momentum | Fine for CSPs — trend up, but don't chase a blow-off top |
| 45–55 | Neutral midline | **Sweet spot** — healthy, not stretched either way |
| 30–45 | Weak / pulling back | Caution — possible early downtrend; only sell if support holds |
| < 30 | Oversold / falling knife | **Avoid** — do not sell puts into a crash; wait for a base |

> **Target band for CSP selling: RSI 40–65** — bullish-to-neutral, not overbought, not in freefall.

## The "Lows" Hierarchy — Which Support to Use

Shorter lows are noise; longer lows are structure. The CSP strike should sit **at or below a meaningful support** so there is a floor beneath the breakeven.

| Level | Lookback | Use for strike placement |
|---|---|---|
| Day low | intraday | Noise — ignore |
| Week low | ~5 days | Minor short-term pivot |
| **Month low** | **~20 days** | **Primary support** — strike should be ≤ this |
| 3-month low | ~60 days | Stronger floor — bonus cushion |
| 52-week low | ~1 year | Major structural floor |

## Strike Placement and Probability

| Check | Threshold | Why |
|---|---|---|
| Short-put delta | **0.10–0.20** | Delta ≈ probability ITM. 0.16 ≈ 1σ. Lower delta = further OTM = higher win rate, smaller premium |
| Probability of Profit (PoP) | **80–90%** | ≈ `1 − |delta|` for a short put |
| Distance OTM | **≥ 1σ** below spot | `1σ = spot × IV × √(DTE ÷ 365)` — strike outside the expected move |
| Strike vs support | At or below 20-day low | Structural floor below breakeven |

## Reward and Liquidity

| Check | Threshold | Why |
|---|---|---|
| Annualized ROC | **> 20%** | Below this the capital lockup is not worth the tail risk |
| Bid-ask spread | **< ~5%** of mid | Wide spreads erode edge on entry and exit |
| Open interest | > 100 at the strike | So you can roll or close without slippage |

## Trend Filter

| Check | Threshold | Why |
|---|---|---|
| RSI(14) | 40–65 | See RSI table above |
| EMA structure | **Spot > EMA20 > EMA50** | Confirmed uptrend — sell puts *with* the trend, not against it |

## Event / Risk Gates (Hard No-Go's)

| Gate | Rule | Why |
|---|---|---|
| Earnings in window | **No earnings before expiry** | Earnings = gap risk; the fat pre-event premium is an event mirage, not theta |
| DTE | **25–45 days** | Best theta-decay-to-gamma-risk balance for monthly CSPs |
| Willing to own? | **Yes, at the strike** | A CSP is an obligation to buy; only sell on names you'd hold at the breakeven |
| "Low collateral" ≠ low risk | Check the underlying, not just the dollar amount | Cheap collateral often comes from far-OTM strikes on high-vol names that can still drop 30%+ |

## The One-Line Filter

> **Sell a CSP when:** IV/HV > 1.0 · annualized ROC > 20% · short-put delta 0.10–0.20 · strike at/below the 20-day support · RSI 40–65 · spot > EMA20 > EMA50 · no earnings before expiry · **and** you'd own the stock at the strike.

## Management After Entry

| Situation | Action |
|---|---|
| Premium decayed to ~50% of max | Close early — lock the gain, free the collateral, redeploy |
| Strike tested (stock approaches/below strike) | Roll down-and-out (lower strike, later expiry) for a net credit, or accept assignment if still willing to own |
| Assigned | Hold shares or begin a covered-call cycle ("the wheel"); cost basis = breakeven |
| Thesis broken (support breaks, trend flips) | Close for a loss rather than rolling into a falling knife |

## Related References

- [Indicators Reference](./indicators.md) — IV, HV, IV Rank, VRP, skew, term structure
- [Risk and Position Sizing](./risk-and-position-sizing.md)
- [Earnings Playbook](./earnings-playbook.md) — why earnings-window premium is an event mirage
- [Trading Strategies](./trading-strategies.md)
- [Glossary](./glossary.md)
