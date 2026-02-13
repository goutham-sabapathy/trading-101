# PRD: Earnings Options Recommendation Engine

## 1. Problem Statement
Manual earnings options trading is inconsistent and difficult to scale. The goal is to build a deterministic engine that recommends whether to trade an earnings event, which strategy to use, and how to manage the trade.

## 2. Goals

- Screen U.S. stocks for earnings opportunities using explicit rules.
- Recommend strategy type and structure (e.g., long straddle, iron condor).
- Produce exact entry/exit windows and adjustment rules.
- Enforce trade-level and portfolio-level risk constraints.
- Provide explainable recommendations with reason codes.

## 3. Non-Goals (v1)

- Fully automated live execution.
- Black-box ML decisioning.
- Non-earnings event trading.

## 4. Users

- Primary: discretionary/options trader seeking systematic support.
- Secondary: researcher validating rule performance over historical data.

## 5. Functional Requirements

1. Event screener with eligibility scoring.
2. Data ingestion for earnings, options, underlying, and volatility regime.
3. Feature computation for implied vs realized move, IV context, liquidity.
4. Strategy selector using rule-based decision logic.
5. Entry/exit engine with deterministic conditions.
6. Adjustment engine with predefined triggers.
7. Risk gate that can force no-trade.
8. Recommendation output with full audit trail.

## 6. Recommendation Output

Each recommendation must include:

- ticker and event timestamp
- strategy and contract structure
- entry window and sizing guidance
- exit criteria and deadline
- adjustment criteria
- max loss and key Greeks exposure
- confidence score
- reason codes and rule contributions

## 7. Success Metrics

- Win rate by strategy and regime.
- Expectancy per trade.
- Max drawdown.
- Sharpe/Sortino (event bucketed).
- Recommendation stability (signal flip rate pre-entry).
- Fill-quality slippage vs modeled assumptions.

## 8. Risks

- Data quality and timestamp conflicts.
- Regime shifts reducing rule edge.
- Overfitting thresholds to past earnings periods.
- Liquidity deterioration around specific events.

## 9. Open Decisions

1. Final provider set for options and historical IV depth.
2. Initial universe size and sector caps.
3. Acceptable latency for pre-event refresh.
4. Position sizing policy and account-level risk limits.
