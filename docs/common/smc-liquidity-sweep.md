# Liquidity Sweeps & SMC Execution

> Educational reference. Describes the Smart-Money-Concepts (SMC) "liquidity sweep" model in its common retail-taught form. It is a *framework for reading intent*, not a guarantee — sweeps fail, and what looks like a sweep in hindsight is often just trend continuation. Treat every level as probabilistic and always define risk.

A **liquidity sweep** (or "stop hunt" / "liquidity grab") is the idea that price is drawn to pools of resting orders — clusters of stop-losses and breakout orders sitting just beyond obvious highs and lows — *takes* that liquidity, and then reverses. The sweep is the trap; the trade is what you do *after* structure confirms the reversal.

This doc builds directly on [Market Structure: CHoCH vs BOS](./market-structure-choch-bos.md) — read that first.

## The anatomy of the move

| Stage | What happens | Why it matters |
| --- | --- | --- |
| **1. Liquidity builds** | Price forms obvious **equal highs (EQH)** or **equal lows (EQL)** — a level retail traders treat as support/resistance and cluster stops beyond. | The "obvious" level is exactly where stops pool. That pool is the target. |
| **2. The sweep** | Price spikes *through* the level, triggering those stops (and tempting breakout traders), then immediately rejects. | This is the **stop hunt** — liquidity is taken. A failed breakout is the tell. |
| **3. CHoCH** | Price reverses hard and **breaks structure in the opposite direction** (the Change of Character). | First confirmation the move has flipped. See [CHoCH vs BOS](./market-structure-choch-bos.md). |
| **4. Entry at the FVG** | Price pulls back into the **fair value gap / order block** left by the impulsive CHoCH leg. A limit order sits there. | Entry *with* the new direction, at a discount, with a tight invalidation. |
| **5. Stop & target** | Stop goes just beyond the **sweep extreme** (the safe zone past the wick). Target is the **opposite liquidity** pool. | Risk is defined by the trap that's now invalidated; reward is the next liquidity magnet. |

## Bullish setup

Price builds **equal lows** (retail support). A sweep spikes **below** them — triggering sell-stops — then rallies and breaks the prior swing high (**bullish CHoCH**). The pullback into the **FVG** is the long entry; stop sits below the sweep low; target is the liquidity resting above.

![Bullish liquidity sweep: price sweeps equal lows, prints a CHoCH, and a long is entered on the pullback into the FVG with stop below the sweep and target at upside liquidity](./assets/smc-liquidity-sweep-bullish.svg)

## Bearish setup

The mirror. Price builds **equal highs** (retail resistance). A sweep spikes **above** them — triggering buy-stops — then drops and breaks the prior swing low (**bearish CHoCH**). The pullback into the **FVG** is the short entry; stop sits above the sweep high; target is the liquidity resting below.

![Bearish liquidity sweep: price sweeps equal highs, prints a CHoCH, and a short is entered on the pullback into the FVG with stop above the sweep and target at downside liquidity](./assets/smc-liquidity-sweep-bearish.svg)

## Execution checklist

- **Was there real liquidity?** A sweep only matters if it took out an obvious level (equal highs/lows, a prior day high/low, a round number). No pool, no setup.
- **Did it reject, or just break?** A clean *close* beyond the level is a breakout, not a sweep. The sweep leaves a **wick** and reclaims the level fast.
- **Did structure actually flip (CHoCH)?** Without the opposite-direction break, you only have a guess. Wait for it.
- **Is the entry at a discount/premium?** Longs enter in the *lower* part of the leg (the FVG/order block), not chasing the top of the CHoCH candle.
- **Is the stop beyond the wick?** Placing it at the level (not past the sweep extreme) invites a second sweep of your own stop.
- **Is there room to the next liquidity?** If the opposite pool is close, the reward may not justify the risk. Size accordingly — see [Risk and Position Sizing](./risk-and-position-sizing.md).

## Caveats

- **Hindsight bias is severe here.** Every reversal *looks* like a sweep after the fact. Define the level and the invalidation *before* the move, or it is not a tradable rule.
- **Timeframe matters.** A sweep + CHoCH on a 1-minute chart is noise inside a higher-timeframe trend. Anchor to a higher-timeframe point of interest (POI).
- **Sweeps fail.** Price can take liquidity and *keep going* (a genuine breakout). The stop beyond the sweep extreme is what keeps a failed read survivable.

## See also

- [Market Structure: CHoCH vs BOS](./market-structure-choch-bos.md) — the structure-reading foundation (HH/HL/LL/LH, BOS, CHoCH, FVG, POI).
- [Trend Identification](./trend-identification.md)
- [Risk and Position Sizing](./risk-and-position-sizing.md)
- [Glossary](./glossary.md) — *Market Structure (Price Action)* section.
