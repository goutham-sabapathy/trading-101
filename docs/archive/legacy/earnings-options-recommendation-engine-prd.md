# Earnings Options Recommendation Engine - PRD and High-Level Design

## 1) Purpose
Build a rule-based earnings options recommendation engine that:
- screens stocks for earnings opportunities,
- recommends strategy + timing (entry/exit),
- proposes adjustments as conditions change,
- and explains the reason behind each recommendation.

This system is focused on U.S. stocks and earnings events.

## 2) Product Vision
Create a decision system that can answer, for each ticker around earnings:
- Should we trade this earnings event or skip it?
- If yes, which strategy fits best (long straddle, iron condor, etc.)?
- Exactly when should we enter and exit?
- What risk controls and hedges are required?
- If market conditions change, what adjustment should be made?

## 3) Key User Outcomes
The user wants to:
- exploit stock price move opportunities around earnings,
- exploit implied volatility dynamics (run-up / crush),
- receive concrete, rule-based recommendations,
- avoid discretionary, gut-feel trading decisions.

## 4) Scope
### In scope (v1)
- Earnings-event screener
- Rule-based strategy selector
- Rule-based entry/exit engine
- Rule-based adjustment engine
- Backtest framework for historical earnings events
- Recommendation output with rationale and risk metrics

### Out of scope (v1)
- Fully automated broker execution
- Non-earnings macro/event trading
- Reinforcement learning or fully black-box AI decisions

## 5) Core Modules
1. Universe and Screener Module
2. Data Ingestion and Normalization Module
3. Feature Engineering Module
4. Strategy Selection Engine
5. Entry/Exit Timing Engine
6. Position Adjustment and Hedge Engine
7. Risk Management and Portfolio Constraints Module
8. Backtesting and Evaluation Module
9. Recommendation API/UI Layer

## 6) Screener Requirements (Rule-Based)
The screener should rank and select candidates using rules such as:
- Market-cap bucket (e.g., mega-cap > $1T, mid-cap growth, etc.)
- Options liquidity minimums:
  - average option volume threshold,
  - open interest threshold,
  - max bid/ask spread threshold.
- Upcoming earnings date/time known with confidence
- Availability of suitable expiries around event date
- Volatility profile conditions
- Exclusion rules (earnings date ambiguity, illiquid options, halted stocks)

Output of screener:
- ticker,
- earnings date/time,
- score,
- reason codes (why included/excluded).

## 7) Data Requirements
### Market/Event Data
- Earnings calendar and timing (BMO/AMC)
- Historical earnings dates and results
- Analyst estimates/forecast context
- Expected move (derived from ATM straddle pricing)
- Actual post-earnings move history

### Options Data
- Full option chain (calls/puts across expiries)
- IV, Greeks, OI, volume, bid/ask spreads
- Term structure and skew/smile metrics

### Underlying Data
- OHLCV price history
- Realized volatility measures
- Gap statistics around prior earnings

### Macro/Regime Data
- VIX and broad market volatility regime
- Sector-relative behavior

## 8) Feature Set (Examples)
- `implied_move_pct` = near-event ATM straddle / stock price
- `hist_earnings_move_pct_p50/p75/p90`
- `implied_vs_realized_ratio`
- `iv_rank`, `iv_percentile`
- `term_structure_slope`
- `skew_metric`
- `liquidity_score`
- `days_to_earnings`
- `event_confidence_score`

## 9) Strategy Universe (Initial)
1. Long Straddle (long volatility)
2. Iron Condor (short volatility, defined risk)
3. Risk-defined short straddle equivalent via wings (no naked short in v1)

Each strategy should have:
- eligibility rules,
- strike selection rules,
- expiry selection rules,
- entry timing window,
- exit timing rules,
- adjustment rules,
- max-loss/capital allocation constraints.

## 10) Example Timing Playbooks
### Playbook A: Pre-earnings IV run-up trade
- Candidate when IV is expected to expand into earnings.
- Entry window: typically T-20 to T-10 (ticker-specific rules).
- Exit window: typically T-2 to T-1 (close before event).
- Goal: profit from IV expansion, avoid event gap risk.

### Playbook B: Earnings move capture
- Candidate when implied move appears underpriced vs historical event move.
- Entry window: T-1 to event close.
- Exit rule: T+0 or T+1, or earlier/later by profit/stop rules.
- Goal: capture realized event move.

Note: Final windows must be data-driven per ticker/regime and validated via backtests.

## 11) Entry/Exit Rule Framework
Each recommendation should specify:
- exact date/time window,
- preferred strike logic (ATM, delta-based, wings distance),
- target debit/credit range,
- hard stop, soft stop, time stop,
- profit targets,
- mandatory exit deadline.

Rule output example:
- `enter_if`: liquidity + volatility + days-to-earnings conditions true
- `exit_if`: target reached OR stop breached OR time deadline hit
- `adjust_if`: predefined trigger conditions met

## 12) Adjustment and Hedge Rules
Examples to implement:
- If one side of long straddle appreciates early beyond threshold:
  - take partial profit on winner,
  - retain opposite leg only if risk limits remain valid.
- If short premium structure is threatened:
  - adjust with predefined wing roll / delta hedge rules,
  - reduce size when gamma/vega limits are breached.
- No discretionary adjustments outside rulebook in v1.

## 13) Risk Management Requirements
### Trade-level
- max loss per trade as % of portfolio
- max premium paid/collected per event
- min liquidity score required

### Portfolio-level
- max concurrent earnings positions
- max sector concentration
- aggregate delta/vega/gamma limits
- hard kill-switch for abnormal volatility regimes

## 14) Recommendation Output Contract
For every recommendation, return:
- ticker
- earnings event metadata
- strategy and rationale
- strikes/expiry
- entry window
- exit + adjustment rules
- expected move context
- confidence score
- risk metrics (max loss, break-even zones, scenario outcomes)
- reason codes + rule audit trail

## 15) Backtesting Requirements
- Event-driven backtest across multiple years
- Include realistic assumptions:
  - slippage,
  - bid/ask spread crossing,
  - commissions/fees,
  - assignment/exercise edge cases.
- Evaluate by:
  - win rate,
  - expectancy,
  - max drawdown,
  - Sharpe/Sortino,
  - regime-specific robustness.

Validation approach:
- in-sample calibration,
- out-of-sample testing,
- walk-forward validation.

## 16) Non-Functional Requirements
- Deterministic and explainable decisions
- Versioned rule sets and reproducible outputs
- Data quality checks and missing-data handling
- Low-latency recommendation refresh before events
- Auditability for every recommendation change

## 17) Suggested Phased Delivery Plan
### Phase 0: Discovery and Data Setup
- Finalize data providers
- Build schemas and ingestion jobs
- Implement data quality checks

### Phase 1: Screener + Basic Rule Engine
- Implement universe/screener
- Build initial features
- Add basic strategy eligibility logic

### Phase 2: Entry/Exit + Risk Layer
- Implement timing rules
- Implement trade and portfolio constraints
- Produce explainable recommendation outputs

### Phase 3: Backtesting and Calibration
- Run historical earnings event backtests
- Tune thresholds and remove weak rules

### Phase 4: Paper Trading and Monitoring
- Shadow recommendations in near real-time
- Monitor drift and rule stability

### Phase 5: Production Readiness
- Add deployment hardening, alerting, and governance
- Optional broker integration after stable paper results

## 18) Key Open Decisions
1. Which data providers to use for:
   - earnings events,
   - option chains with Greeks/IV,
   - historical fundamentals and estimates.
2. Initial universe size (e.g., top 50, top 200, or custom watchlist).
3. Allowed strategy set for v1 (defined-risk only recommended).
4. Capital/risk limits and position sizing policy.

## 19) Immediate Next Step
Prepare a Technical Design Document (TDD) with:
- system architecture diagram,
- data model/schema,
- rule DSL structure,
- API contracts,
- backtest engine specification,
- milestone-level implementation tickets.
