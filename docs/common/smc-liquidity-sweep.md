---
title: "Liquidity Sweeps & SMC Execution"
parent: "Market Context & Internals"
---

# Liquidity Sweeps & SMC Execution

> Educational reference for liquidity sweeps and SMC execution — sweep, CHoCH, then entry into the FVG. Quick visual reference.

![Bullish liquidity sweep: price sweeps equal lows, prints a CHoCH, long entry on the pullback into the FVG with stop below the sweep and target at upside liquidity](./assets/smc-liquidity-sweep-bullish.svg)

![Bearish liquidity sweep: price sweeps equal highs, prints a CHoCH, short entry on the pullback into the FVG with stop above the sweep and target at downside liquidity](./assets/smc-liquidity-sweep-bearish.svg)

**When I use it**

- Setup = an obvious EQH/EQL gets **swept** (stop hunt), then structure **flips (CHoCH)**. No sweep + no CHoCH = no trade.
- Enter on the pullback into the **FVG**; stop just beyond the **sweep wick**; target the **opposite liquidity** pool.
- A clean *close* beyond the level is a real breakout, not a sweep — wait for the rejection.

## Related References

- [Market Structure: CHoCH vs BOS](./market-structure-choch-bos.md) — the CHoCH this setup builds on
- [Trend Identification](./trend-identification.md) — structure context for the flip
- [Glossary](./glossary.md) — liquidity sweep, FVG, EQH/EQL terms
