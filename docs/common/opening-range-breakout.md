# Opening-Range Breakout (Session Range)

> Educational reference. A generic intraday concept. For the SPY-specific options implementation (entries, stops, targets, contract selection), see the [SPY ORB Options Playbook](./spy-orb-options-playbook.md).

The **opening range** is the high and low formed in the **first 15–30 minutes** after the open. That range acts like a box: while price stays inside it the day is undecided, and a decisive break of one side often sets the session's direction.

## The setup

Mark the high and low of the opening window. Wait for a candle to **close beyond** one edge (not just wick through it). A close above the range high is a bullish breakout; a close below the range low is bearish. Entry is on the breakout close, stop is on the opposite side of the range, and the target is a multiple of the range height.

![Opening-range breakout: price chops inside the session range, then closes above the range high for a long entry, with stop below the range low and target a multiple of range height](./assets/opening-range-breakout.svg)

## Why it works

- **The open packs overnight order flow** — accumulated news and gaps resolve into a tight initial range.
- **Liquidity is highest at the open**, so breaks tend to be clean rather than choppy.
- **Algos and professionals watch these levels**, which makes them somewhat self-fulfilling.
- **The range gives a clear, defined-risk stop** — invalidation is the other side of the box.

## How to use it

1. Mark the **high and low** of the first 15–30 minutes.
2. Wait for a candle to **close beyond** one side (a wick alone is not a breakout).
3. Check that **volume is above average** on the breakout — a quiet break is often a fake.
4. Take **one trade per side, per session**. Don't chase a failed breakout back and forth.

## Trade plan (bullish breakout)

| Component | Rule |
| --- | --- |
| **Entry** | Candle **closes above** the range high. |
| **Stop** | Just **below the range low** (defines max risk = range height). |
| **Target** | **Range height × 1–2** projected from the breakout (scale out / trail the rest). |

The bearish plan is the mirror: enter on a close below the range low, stop above the range high, target range height × 1–2 to the downside.

## Risk notes

- **Trade the close, not the wick.** Intraday spikes routinely poke the level and reverse.
- **Volume must confirm.** A breakout on below-average volume is the classic failed-break trap.
- **Skip it around news.** A scheduled release at or near the open distorts the range — wait for it to settle.
- **One-and-done per side.** Repeated re-entries on the same failing level is how range days drain an account.
- Size every trade off the defined range risk — see [Risk and Position Sizing](./risk-and-position-sizing.md).

## See also

- [SPY ORB Options Playbook](./spy-orb-options-playbook.md) — the ticker-specific options version.
- [Trend Identification](./trend-identification.md)
- [Trading Discipline Framework](./trading-discipline-framework.md)
