# Tools Comparison (Generic)

## Brokerage / Execution APIs

| Tool | Strengths | Constraints | Best Use |
|---|---|---|---|
| IBKR API | Broad instrument coverage, mature | Steeper integration complexity | Production-grade data + execution |
| Tradier API | Simpler options API | Coverage/cost tradeoffs | Faster prototyping |

## Data Platforms

| Tool | Strengths | Constraints | Best Use |
|---|---|---|---|
| Yahoo/yfinance | Free and easy start | Data consistency limits | Early exploration only |
| Polygon | Strong developer UX | Paid for full depth/history | Scalable event research |
| ORATS/OptionMetrics | Options-specific depth | Costly | Serious options research |

## Research / Backtesting

| Tool | Strengths | Constraints | Best Use |
|---|---|---|---|
| Python + pandas | Flexible and transparent | Build many components yourself | Custom research engine |
| QuantConnect | Event/backtest framework | Platform conventions | Faster strategy iteration |
| Backtrader/custom | Full control | More engineering effort | Tailored internal pipeline |

## Recommendation

For this repo stage:
- Start with Python research stack + broker/API data.
- Keep adapters so data vendors can be swapped later.
