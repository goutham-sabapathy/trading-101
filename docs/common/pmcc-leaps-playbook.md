---
title: "LEAPS + PMCC Playbook"
parent: "Strategy Playbooks"
---

# LEAPS + PMCC Playbook (Poor Man's Covered Call)

> Educational reference for selecting and managing a Poor Man's Covered Call — a long **call diagonal**: own a deep-ITM LEAPS call as a stock substitute, and sell shorter-dated OTM calls against it for income. It is a **leveraged bullish** position; it makes money when the underlying grinds **up or sideways** and bleeds in downtrends. Only run it on names you are genuinely long-term bullish on.

## What a PMCC Is

Buy one deep-ITM LEAPS call (the long leg ≈ 100 shares of exposure for ~20–30% of the cash), then sell one near-dated OTM call against it (the income leg), rolling the short call each cycle.

```
Net debit       = LEAPS ask − short-call credit   (× 100)   ← your max risk
Long delta      ≈ 0.80–0.85    (LEAPS behaves like ~80–85 shares)
Leverage        ≈ (100 × share price) ÷ net debit  (~3–5×)
Breakeven (LEAPS expiry, before income) ≈ LEAPS strike + net-debit-per-share
Income / cycle  = short-call credit collected (offsets LEAPS theta)
Max loss        ≈ net debit (long leg goes ~worthless; short leg expires OTM)
```

The whole game: **the premium you collect on the short calls should out-earn the time decay on the LEAPS**, while the LEAPS captures the upside.

## Underlying Selection — What to Run It On

PMCC needs a stock you'd hold for 1–2 years that **trends up steadily**. Choppy or falling names kill it (the LEAPS bleeds while short-call income can't keep up).

| Check | Threshold | Why |
|---|---|---|
| Trend | **Spot > EMA50 > EMA200**, rising | PMCC is directional-long; never fight the primary trend |
| IV Rank (when buying the LEAPS) | **< 30–40** | You are *buying* a long-dated option — cheap vol = cheap LEAPS |
| Dividend yield | **Low / none** | LEAPS holder collects no dividend, and ex-div raises early-assignment risk on the short call |
| Quality | Durable FCF, moat, sane valuation | You hold the long leg for a year+ — see [Screener & Monitoring](./screener-and-monitoring.md) |
| Liquidity | LEAPS exist 12–24 mo out; tight spreads; OI > 500 | Diagonals are spread-sensitive on both legs |
| Best fits | Mega-cap quality, broad ETFs (QQQ/SPY) | Steady up-drift, deep option chains |

## The Long Leg (LEAPS)

| Parameter | Target | Why |
|---|---|---|
| DTE | **12–24 months** (≥ 365) | The further out, the slower the daily theta — buys time for the thesis |
| Delta | **0.80–0.85** | Deep ITM tracks the stock ~80–85% and carries little extrinsic |
| Extrinsic value | **As low as possible** (< ~10% of premium) | You're paying for *leverage*, not time — minimize the decaying part |
| Roll the LEAPS | When it drops below ~12 months or delta drifts < 0.70 | Keep it stock-like; don't let it become a fast-decaying gamble |

## The Short Leg (the income call)

| Parameter | Target | Why |
|---|---|---|
| DTE | **30–45 days** | Best theta-to-gamma balance |
| Delta | **0.20–0.30** | ~70–80% chance it expires OTM; leaves room for the LEAPS to gain |
| Strike rule | **(short strike − LEAPS strike) ≥ net debit** | Guarantees the spread can't be worth *less* than you paid on a sharp rally — avoids the "diagonal trap" where a fast melt-up caps you below cost |
| Strike vs resistance | At/above a known resistance | Sell calls into levels price struggles to clear |
| No earnings before short-call expiry | Hard no | Gap risk on the leg you're short |

## The One-Line Filter

> **Open a PMCC when:** the underlying is in a confirmed uptrend (spot > EMA50 > EMA200) · IV Rank < ~40 (cheap LEAPS) · low/no dividend · LEAPS at 0.80–0.85 delta and 12–24 mo out with minimal extrinsic · short call 30–45 DTE at 0.20–0.30 delta with (short − long strike) ≥ net debit · no earnings before the short-call expiry · **and** you'd be happy holding the LEAPS for a year.

## Management After Entry

| Situation | Action |
|---|---|
| Short call decayed to ~50% of max | Buy it back, re-sell the next 30–45 DTE cycle |
| Short call tested (stock rallies through it) | Roll **up-and-out** for a net credit; never roll for a debit that exceeds collected income |
| Stock dumps | The LEAPS loses (but < 100 shares would). Re-evaluate the thesis; sell lower short calls to keep collecting, or cut if the trend breaks |
| Ex-dividend approaching with short call ITM | Close/roll the short call before ex-div to dodge early assignment |
| LEAPS < ~12 months or delta < 0.70 | Roll the LEAPS further out / deeper ITM |
| Thesis broken (trend flips, support lost) | Close the whole diagonal — don't average a falling knife with leverage |

## Why It Beats a Full Covered Call (and where it doesn't)

- **Pro:** ~3–5× less capital for similar upside-with-income; higher return on capital.
- **Pro:** defined max loss (the net debit), unlike owning 100 shares.
- **Con:** no dividends; the LEAPS has theta (small if deep ITM/far-dated); a sharp gap down hurts more in % terms (leverage cuts both ways); requires active short-call management.

## Related References

- [Screener & Monitoring Checklist](./screener-and-monitoring.md) — selection screen and what to watch
- [Wheel Strategy Playbook](./wheel-playbook.md) — the income-via-ownership counterpart
- [Indicators Reference](./indicators.md) — IV Rank, delta, theta
- [Risk and Position Sizing](./risk-and-position-sizing.md)
- [Glossary](./glossary.md) — PMCC, LEAPS, diagonal definitions
