# Data Sources (Generic)

## Purpose
Reference data sources used across trading projects and define curation standards.

## Data Categories

1. Corporate events (earnings calendar, event timing)
2. Underlying prices (OHLCV, corporate actions)
3. Options chain (bid/ask, IV, Greeks, OI, volume)
4. Macroeconomic/volatility regime (VIX, rates)
5. Fundamentals and analyst estimates

## Source Options

| Category | Common Providers | Notes |
|---|---|---|
| Earnings calendar | Nasdaq, Yahoo, broker feeds, paid APIs | Must store event timestamp + BMO/AMC flag |
| OHLCV | Broker APIs, Yahoo, Polygon, Alpaca | Adjusted/unadjusted handling must be explicit |
| Options chain | Broker APIs, Tradier, Polygon, ORATS | Keep quote timestamp and spread quality |
| Historical IV/Greeks | Broker APIs, ORATS, OptionMetrics | Paid feeds often required for depth/history |
| Volatility regime | Cboe, FRED, broker feeds | Store daily close and intraday where needed |

## Curation Standards

- Store raw vendor payloads unchanged in a raw zone.
- Normalize to a curated schema with canonical symbols.
- Track source, extraction time, and quality flags for each row.
- Keep reconciliation logic for conflicting event timestamps.
- Apply survivorship-bias controls for universe selection.

## Minimum Quality Checks

- Missing fields by source/date
- Event timestamp conflicts across sources
- Option spread sanity checks
- Duplicate contract records
- Corporate action alignment checks
