# Market Structure: CHoCH vs BOS

> Educational reference. Describes price-action market-structure concepts in their most common usage. Labels and rules vary slightly across teaching styles; the definitions below follow the mainstream Smart-Money / ICT convention.

Market structure reads a chart as a sequence of **swing highs** and **swing lows**. The relationship between consecutive swings tells you whether a trend is *continuing* or *changing character*. Two events describe every meaningful break of a prior swing level:

- **BOS** (Break of Structure) — a break **in the direction of the existing trend**. It *confirms* the trend.
- **CHoCH** (Change of Character) — a break **against the existing trend**. It is the first *warning* of a potential reversal.

The only difference between them is **which direction** the broken swing was relative to the prevailing trend. Same mechanic (price closes through a prior swing); opposite meaning.

## Definitions

| Term | Signals | Triggered when price breaks the previous swing... | Implication |
| --- | --- | --- | --- |
| **BOS** (Break of Structure) | Trend **continuation** | high/low in the **same** direction as the trend | Confirms current structure; trade *with* the trend |
| **CHoCH** (Change of Character) | Potential **reversal** | high/low in the **opposite** direction to the trend | Warns structure may be flipping; stand aside or look for the new direction |

A useful mental rule:

- In an **uptrend** (higher highs + higher lows): breaking the **prior high** = BOS (up continues). Breaking the **last higher low** = CHoCH (up may be ending).
- In a **downtrend** (lower lows + lower highs): breaking the **prior low** = BOS (down continues). Breaking the **last lower high** = CHoCH (down may be ending).

## Uptrend example

Price makes higher highs (`HH`) and higher lows (`HL`). Each `HH` that takes out the prior high is a BOS. The trend's character only changes when price drops through the **last `HL`** — that break is the CHoCH, and the following swing is a lower high (`LH`) confirming the shift.

![Uptrend market structure: successive BOS breaks confirm the uptrend, then a break below the last higher low marks the CHoCH reversal](./assets/choch-bos-uptrend.svg)

## Downtrend example

The mirror image. Price makes lower lows (`LL`) and lower highs (`LH`); each `LL` is a BOS. Character changes when price rallies through the **last `LH`** — the CHoCH — and the following swing prints a higher low (`HL`).

![Downtrend market structure: successive BOS breaks confirm the downtrend, then a break above the last lower high marks the CHoCH reversal](./assets/choch-bos-downtrend.svg)

## How structure traders use it

- **CHoCH = early, BOS = confirmation.** A CHoCH is the *first* sign of a reversal but is lower-confidence on its own. Many wait for price to then build a fresh BOS in the new direction before committing.
- **Read it top-down.** Establish the higher-timeframe (HTF) trend first, then use a lower timeframe to time entries. A CHoCH on the lower timeframe that aligns with an HTF point of interest (POI) is higher quality than one in the middle of nowhere.
- **Confluence beats labels.** A CHoCH lands best when it occurs at a **supply/demand zone**, fills or leaves a **fair value gap (FVG)**, or sweeps obvious **liquidity** (stop-runs above highs / below lows) just before reversing.
- **Mind the timeframe.** A CHoCH on a 5-minute chart can be noise inside an intact higher-timeframe trend — i.e., just a pullback (and the start of a new HL/LH), not a true reversal.

### MSS — a note on terminology

Some traders use **MSS** (Market Structure Shift) interchangeably with CHoCH. Where a distinction is drawn, MSS usually refers to a stronger, *impulsive* break that decisively shifts structure (often with a displacement candle / FVG), whereas CHoCH can be any opposite-direction break of the last protected swing.

## Related concepts

| Term | Meaning |
| --- | --- |
| `HH` / `HL` | Higher high / higher low — the building blocks of an uptrend. |
| `LL` / `LH` | Lower low / lower high — the building blocks of a downtrend. |
| `POI` (Point of Interest) | A price area expected to react — typically a supply/demand zone or order block, usually identified on a higher timeframe (`HTF POI`). |
| `Supply / Demand Zone` | Area where prior selling/buying was strong enough to move price; a candidate reversal/reaction zone. |
| `FVG` (Fair Value Gap) | A price imbalance (three-candle gap) that price often returns to fill. |
| `Liquidity` (`LIQ`) | Clusters of resting stop orders, typically just beyond obvious swing highs/lows, that price tends to "sweep" before reversing. |
| `MSS` (Market Structure Shift) | A strong, often impulsive opposite-direction break; sometimes used as a synonym for CHoCH. |

## See also

- [Market Internals](./market-internals.md)
- [Indicators Reference](./indicators.md)
- [Trading Strategies](./trading-strategies.md)
- [Glossary](./glossary.md) — *Market Structure (Price Action)* section
