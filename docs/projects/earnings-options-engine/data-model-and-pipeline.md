# Data Model and Pipeline

## 1. Data Needed

### Event Data
- earnings date/time (`BMO`/`AMC`)
- analyst estimate context
- reported values and surprise data (where available)

### Underlying Data
- OHLCV
- adjusted price series
- realized volatility windows

### Options Data
- chain snapshots by timestamp
- IV, Greeks, bid/ask, open interest, volume
- expiry and strike metadata

### Regime Data
- VIX and related volatility benchmarks
- sector/index context

## 2. Canonical Entities

1. `instrument_master`
2. `earnings_events`
3. `underlying_bars`
4. `option_contract_master`
5. `option_quotes`
6. `feature_snapshots`
7. `recommendations`
8. `rule_versions`

## 3. Collection Plan

1. Daily universe refresh.
2. Earnings calendar refresh with conflict resolution.
3. Intraday option-chain snapshots for upcoming events.
4. End-of-day data consolidation and quality checks.

## 4. Curation Plan

- Symbol mapping to canonical ticker format.
- Timestamp normalization to exchange timezone.
- Event timestamp reconciliation across sources.
- Deduplication by (`ticker`, `event_time`, `source`, `ingest_time`).
- Quality scoring per record and source.

## 5. Feature Curation

Examples:

- `implied_move_pct`
- `actual_move_history_p50/p75/p90`
- `implied_vs_realized_ratio`
- `iv_rank`, `iv_percentile`
- `term_structure_slope`
- `liquidity_score`
- `event_confidence_score`

## 6. Data Quality Gates

- Reject incomplete option records lacking bid/ask or IV.
- Flag stale option quotes beyond freshness threshold.
- Reject ambiguous earnings timestamps until reconciled.
- Block recommendation generation when critical data quality score is below threshold.
