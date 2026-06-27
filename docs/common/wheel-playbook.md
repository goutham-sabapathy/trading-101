# Wheel Strategy Playbook (CSP → Covered Call)

> Educational reference for running the Wheel: sell cash-secured puts on a stock you'd own; if assigned, sell covered calls against the shares until called away; repeat. Income comes from premium in every phase. The put-selling leg is covered in depth by the [Cash-Secured Put Playbook](./cash-secured-put-playbook.md) — this doc covers the **full loop, wheel-specific stock selection, the covered-call leg, and assignment handling**.

## The Loop

```
1. Sell CSP  ──(expires OTM)──► keep premium, repeat step 1
      │
      └──(assigned)──► own 100 shares at strike;  cost basis = strike − premium
                          │
2. Sell Covered Call ──(expires OTM)──► keep premium, repeat step 2
                          │
                          └──(called away)──► shares sold at CC strike; back to step 1
```

You profit from premium at every step. The enemy is a single name that **craters and stays down** — you get assigned, then your covered-call strikes sit below your cost basis, and you're stuck selling calls for pennies or capping a loss. Stock selection is what prevents this.

## Why cash-secured, not margin

You flagged this and it's correct: running the put leg **fully cash-secured** (not naked on margin) means **no margin interest**, no margin-call risk, and the assignment is always fundable. The trade-off is capital efficiency — each CSP locks `strike × 100` in cash. Plan position count around that.

## Wheel-Specific Stock Selection

The CSP playbook screens the *entry*; the Wheel adds one dominant filter — **you may end up holding, so pick names that don't trap you.**

| Check | Threshold | Why (wheel-specific) |
|---|---|---|
| Would you own it? | **Yes, at the strike** | Non-negotiable — the wheel *expects* assignment |
| Drawdown profile | **Lower max drawdown / mean-reverting** | Your "covered calls should be quick" instinct: names that dip-and-recover get called away fast; names that fall-and-stay trap you |
| Support structure | Strong support at/above the put strike | A floor under the breakeven |
| IV Rank | **> 40–50** | Fatter premium — the wheel lives on premium income |
| Capital efficiency | Price range that lets you run **4–6 names**, not 1 | Diversification beats one big position getting stuck |
| Dividend | **Welcome** | You collect dividends during the covered-call (share-holding) phase |
| Avoid | High-beta momentum / story stocks, binary events | These gap down and don't come back — the classic wheel trap |

> The PMCC wants steady up-trenders with low IV; the Wheel wants quality range-bound names with higher IV. See the split screens in [Screener & Monitoring](./screener-and-monitoring.md).

## Phase 1 — Selling the Put

Use the [Cash-Secured Put Playbook](./cash-secured-put-playbook.md) in full. The condensed entry:

> Short-put delta **0.16–0.30** · 30–45 DTE · strike at/below 20-day support · IV/HV > 1.0 and IV Rank > 40 · annualized ROC > ~20% · spot > EMA20 > EMA50 · **no earnings before expiry** · close at ~50% profit · roll down-and-out if tested (for a credit).

(Wheel sellers often run a slightly higher delta — up to ~0.30 — than a pure premium-seller, because assignment is an acceptable outcome, not a failure.)

## Phase 2 — The Covered Call (after assignment)

You own 100 shares at `cost basis = put strike − premium collected`. Now sell calls against them.

| Parameter | Target | Why |
|---|---|---|
| Short-call strike | **At or above your cost basis** | Never cap a sale below what you paid — being called away should be a *win* |
| Delta | **0.20–0.30** | ~70–80% expire OTM; you keep the shares and the premium |
| DTE | **30–45 days** | Theta sweet spot |
| Strike vs resistance | At/above resistance | Sell into levels price struggles to clear |
| No earnings before expiry | Hard no | Gap risk while short the call |

**The cost-basis trap:** if the stock fell well below your basis, a call at your basis pays almost nothing. Don't sell calls *below* basis just to collect — that locks in a loss if assigned. Instead sell further out, wait for recovery, or keep lowering basis only via puts/premium, not by capping the upside.

## The One-Line Filters

> **Sell the put (Phase 1):** quality name you'd own · lower-drawdown / mean-reverting · IV Rank > 40 · delta 0.16–0.30 · 30–45 DTE · strike ≤ 20-day support · no earnings · fully cash-secured.

> **Sell the call (Phase 2):** strike ≥ cost basis · delta 0.20–0.30 · 30–45 DTE · at/above resistance · no earnings before expiry.

## Management

| Situation | Action |
|---|---|
| Put or call at ~50% max profit | Close early, redeploy the capital/shares |
| Put tested | Roll down-and-out for a credit, or accept assignment (you wanted the shares) |
| Assigned | Begin Phase 2 covered calls at/above cost basis |
| Called away | Realize the gain (premium + appreciation to strike); restart Phase 1 |
| Stock dumps hard, stuck below basis | Don't cap below basis. Keep collecting put-side premium / sell far-OTM calls; cut only if the **thesis** (not just price) is broken |
| Dividend during share phase | You keep it — adds to total return; watch ex-div for early call assignment |

## Related References

- [Cash-Secured Put Playbook](./cash-secured-put-playbook.md) — the put-leg selection engine (IV edge, RSI, support hierarchy, strike/PoP)
- [Screener & Monitoring Checklist](./screener-and-monitoring.md)
- [LEAPS + PMCC Playbook](./pmcc-leaps-playbook.md) — the leveraged-long counterpart
- [Risk and Position Sizing](./risk-and-position-sizing.md)
- [Glossary](./glossary.md) — Wheel, CSP, Covered Call definitions
