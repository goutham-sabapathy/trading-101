---
title: "Screener & Monitoring"
parent: "Strategy Playbooks"
---

# Screener & Monitoring Checklist

> Educational reference for picking candidates for the [LEAPS + PMCC](./pmcc-leaps-playbook.md) and [Wheel](./wheel-playbook.md) strategies, evaluating them for a long-term commitment, and tracking what can hurt an open position. The two strategies want **different stocks**, so this starts with two separate screens.

## Two Screens, Not One

| | **PMCC / LEAPS** (leveraged long) | **Wheel** (get-paid-to-own) |
|---|---|---|
| Profits from | Steady **up-trend** | **Flat / range-bound** + premium decay |
| Trend filter | Spot > EMA50 > EMA200, rising | Above 200-SMA, but range-bound is fine |
| IV Rank | **Low** (< 30–40) — buying cheap LEAPS | **High** (> 40–50) — selling fat premium |
| Drawdown profile | Steady drift up | **Low max drawdown / mean-reverting** (don't get trapped) |
| Dividend | Avoid (no collect + assignment risk) | Welcome (collect while holding) |
| Capital / position | Low (~20–30% of 100 shares) | High (`strike × 100`, cash-secured) |
| Typical names | Mega-cap quality, QQQ/SPY | Quality range-bound names; price range that allows 4–6 positions |

**Universal filters (both):** optionable with tight spreads and OI > 500 · avg volume > 1M · market cap > ~$10B · **no earnings inside the option cycle** · a level you can anchor the strike to.

**Where to run it:** Finviz / Barchart / TradingView for price + fundamentals; Market Chameleon / Barchart / Tastytrade / ThinkorSwim for the options layer (IV Rank, liquidity, expected move). See [Tools Comparison](./tools-comparison.md) and [Data Sources](./data-sources.md).

## Long-Term Quality Scorecard

For PMCC you hold the LEAPS 1–2 years; for the Wheel you may be assigned and *become* a holder. Either way, only commit to genuine quality.

| Dimension | Looking for | Red flag |
|---|---|---|
| **Profitability** | Positive, growing free cash flow; stable/expanding margins; ROIC > cost of capital | Cash burn, margin compression |
| **Balance sheet** | Net debt / EBITDA < ~3; healthy interest coverage | High debt in a rate-sensitive business |
| **Growth** | Durable revenue / EPS growth | Decelerating, single-customer dependence |
| **Moat** | Pricing power, switching costs, scale | Commodity, undifferentiated |
| **Valuation** | FCF yield / P/E / EV-EBITDA reasonable vs own history & peers | Priced for perfection (PMCC danger) |
| **Management** | Sane capital allocation, aligned insiders | Serial dilution, optics-only comp |

## Monitoring an Open Position

Grouped by how often it bites.

### Per position, every cycle
- **Earnings date** — the #1 single-stock risk. Confirm none falls inside the option's life before entering.
- **Ex-dividend date** — raises early-assignment risk on any ITM short call (PMCC and wheel Phase 2). Close/roll ITM short calls before ex-div.
- **The level at your strike** — support (puts) or resistance (short calls) still intact?

### Per name, ongoing
- **Insider transactions** (SEC Form 4) — cluster selling is a yellow flag. → *OpenInsider*.
- **Congressional trades** — *low-confidence sentiment overlay only, never a thesis.* → *Capitol Trades / Quiver Quant*.
- **Short interest & institutional (13F) shifts** — crowding / conviction signals.
- Guidance changes, analyst rating shifts, sector peer read-throughs.

### Macro / market-wide (moves every position at once)
- **FOMC dates + rate decisions**, **CPI / PCE**, **jobs report (NFP)** — spike IV and move everything; avoid opening new risk right before them.
- **VIX / broad IV regime** — when to lean aggressive (sell more premium) vs defensive.

**Calendars to bookmark:** Earnings Whispers (earnings) · Investing.com / ForexFactory (econ + Fed) · broker dividend calendar.

## Confidence Note

Fundamentals and macro/Fed events are high-signal. Insider, congressional, and social/flow data are **low-confidence overlays** — they can tilt sizing or timing but should never override the quant verdict (IV edge, trend, support, quality). Weight them accordingly.

## Related References

- [LEAPS + PMCC Playbook](./pmcc-leaps-playbook.md)
- [Wheel Strategy Playbook](./wheel-playbook.md)
- [Cash-Secured Put Playbook](./cash-secured-put-playbook.md)
- [Indicators Reference](./indicators.md) · [Data Sources](./data-sources.md) · [Tools Comparison](./tools-comparison.md)
- [Risk and Position Sizing](./risk-and-position-sizing.md)
