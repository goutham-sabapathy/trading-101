# Trading Scenarios & Indicator Reference

## Summary of Trading Scenarios

| Market State    | GEX Sign        | Market Maker Behavior      | Trading Strategy                              |
|-----------------|------------------|-----------------------------|-----------------------------------------------|
| Stable          | Positive (+)     | Buy dips / Sell rips        | Credit Spreads, Iron Condors                  |
| Volatile        | Negative (-)     | Sell dips / Buy rips        | Long Options, Momentum, Scalping              |
| At Call Wall    | Positive (+)     | Hedging creates resistance  | Profit taking or Bearish reversal / Market internals |
| Breakout        | Squeeze          | Forced buying loop          | Riding the “vertical” price move              |

---

## Summary Table: Who is doing what?

| Scenario                  | Price Action                      | Market Maker Action           | Market Effect                    |
|---------------------------|-----------------------------------|------------------------------|----------------------------------|
| Approaching Call Wall     | Stock rises toward Wall           | Sell stock to trim hedge     | Resistance (Price stalls)        |
| Breaking Call Wall        | Stock blasts through              | Buy stock to chase Delta     | Acceleration (Melt-up)           |
| Approaching Put Wall      | Stock falls toward Wall           | Buy stock to cover shorts    | Support (Price bounces)          |

---

## Comparison Table – Indicators

| Indicator | Measures                  | Formula / Logic                             | Bullish Signal                       | Bearish Signal                     |
|-----------|---------------------------|---------------------------------------------|--------------------------------------|------------------------------------|
| **TICK**  | Immediate Momentum        | Upticks minus Downticks                     | High Positive (> +800)               | High Negative (< -800)             |
| **VOLD**  | Volume Flow               | Adv. Volume minus Decl. Volume              | Positive / Ratio > 3:1               | Negative / Ratio < -3:1            |
| **TRIN**  | Breadth vs. Volume        | (Adv/Decl Issues) / (Adv/Decl Vol)          | Below 1.0                            | Above 1.0                          |
| **ADD**   | Daily Breadth             | Advancing minus Declining Issues            | Rising / Positive                    | Falling / Negative                 |
