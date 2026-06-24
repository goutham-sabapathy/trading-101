# Trading Glossary (Generic)

> Educational reference. Definitions describe concepts in their most common usage; specific platforms or strategies may use them more narrowly.

## Options — Basics

- `ATM` (At-the-money): Option strike near the current underlying price.
- `ITM` (In-the-money): Call with strike below spot, or put with strike above spot (intrinsic value > 0).
- `OTM` (Out-of-the-money): Call with strike above spot, or put with strike below spot (intrinsic value = 0).
- `DTE` (Days to Expiration): Calendar days remaining until the option expires.
- `Strike`: The fixed price at which the option's right can be exercised.
- `Premium`: The price paid (debit) or received (credit) for an option contract.
- `Width`: Distance in dollars between the long and short strikes of a vertical spread (e.g., a $440/$460 spread has width $20).
- `Wing`: Either of the long protective strikes in a multi-leg structure (the strikes that cap loss).
- `Credit / Debit`: A position is a *credit spread* if entered for net cash received; *debit spread* if entered for net cash paid.
- `Assignment`: Obligation to fulfill the option (deliver shares for short call, buy shares for short put) when the holder exercises.
- `Roll`: Closing an existing option and opening a new one with a different strike or expiration to manage the position.

## Options — Spreads & Structures

- `Bull Put Spread (BPS)`: Sell a put + buy a lower-strike put, same expiry. Credit. Profits if underlying stays above the short strike. Defined risk.
- `Bear Call Spread (BCS)`: Sell a call + buy a higher-strike call, same expiry. Credit. Profits if underlying stays below the short strike. Defined risk.
- `Bull Call Spread`: Buy a call + sell a higher-strike call. Debit. Profits if underlying rises toward the short strike.
- `Bear Put Spread`: Buy a put + sell a lower-strike put. Debit. Profits if underlying falls toward the short strike.
- `Iron Condor`: Bull put spread + bear call spread, both OTM, same expiry. Credit. Profits if underlying stays between the short strikes.
- `Iron Butterfly`: Same as iron condor but the short strikes are at the same price (ATM). Larger credit, narrower profit zone.
- `Short Strangle`: Sell an OTM call + sell an OTM put (no long wings). Undefined risk.
- `Long Straddle`: Buy ATM call + buy ATM put. Profits if move exceeds combined premium in either direction.
- `Long Strangle`: Buy OTM call + buy OTM put. Cheaper than a straddle, requires larger move to profit.
- `Calendar Spread`: Sell near-dated option + buy farther-dated option, same strike. Profits from time decay differential and steady IV.
- `Call Diagonal / Put Diagonal`: Like a calendar but with different strikes (one OTM, one further out and longer-dated).
- `Cash-Secured Put (CSP)`: Sell a put while holding enough cash to buy the shares if assigned. Income strategy; effectively "get paid to set a limit-buy."
- `Covered Call`: Sell a call against owned shares. Income strategy; caps upside above strike.

## The Greeks (sensitivities)

- `Delta`: Change in option price per $1 move in the underlying. Calls: 0 to +1. Puts: 0 to −1. Also a rough proxy for "probability of finishing ITM" (e.g., 0.30 delta ≈ 30% chance ITM at expiry).
- `Gamma`: Rate of change of delta. Highest near ATM and near expiry.
- `Theta`: Daily decay of option price from time alone. Negative for long options, positive for short options.
- `Vega`: Change in option price per 1 vol-point change in IV. Long options have positive vega; short options have negative vega.
- `Rho`: Sensitivity to interest rates. Usually small for short-dated equity options.

## Volatility

- `IV` (Implied Volatility): Annualized volatility implied by the current option price, solved from a pricing model.
- `HV / RV` (Historical / Realized Volatility): Annualized volatility computed from actual historical returns.
- `IV / HV gap` or `Variance Risk Premium (VRP)`: The structural tendency of IV to exceed RV, on average. The "premium" buyers pay for protection against tail risk — the structural source of edge for net premium sellers.
- `IV Rank`: Where today's IV sits within its 52-week range. IV Rank 80% = today's IV is higher than 80% of the past year's readings.
- `IV Percentile`: Fraction of days in the past year where IV was *below* current. Distinct from IV Rank (which is a min/max scaling).
- `IV Crush`: Sharp decline in IV after the resolution of a known event (earnings, FDA decision, FOMC). Hurts long premium even when direction is right.
- `Volatility Skew`: Difference in IV across strikes at the same expiry. Equity index puts are usually more expensive than calls (negative / put skew). When **calls are more expensive than puts (call skew)** it signals demand for upside / squeeze pressure.
- `Term Structure`: Shape of IV across expirations. *Contango* = back-month IV higher than front-month (normal). *Backwardation* = front-month higher (event-driven, e.g., earnings within the front cycle).
- `Expected Move`: 1σ move implied by ATM straddle pricing. Approximately `straddle price / spot`. The market's consensus range over the option's life.
- `1σ / 2σ`: One / two standard deviations. Under a log-normal assumption, ~68% of outcomes lie within 1σ, ~95% within 2σ.
- `Vol Crush` / `Event Vol Crush`: Specific case of IV crush tied to a binary event resolving.

## Trade Quality Metrics

- `PoP` (Probability of Profit): Estimated probability the trade closes profitable. For short-premium spreads, commonly approximated by `1 − |short strike delta|` (chance the short strike expires OTM) or `credit / width` for vertical spreads.
- `RR` (Risk/Reward Ratio): `max loss / max profit`. An 8:1 RR means you must win 8 out of 9 trades to break even.
- `Max Profit / Max Loss`: Defined-risk structures have hard caps; undefined-risk structures (short strangles, short puts unsecured) do not.
- `Breakeven`: Underlying price at expiry where P&L = 0. For credit spreads, `short strike ± credit`. For debit spreads, `long strike ± debit`.
- `Defined Risk`: Position with a known, bounded maximum loss. Required for any strategy facing tail-event-prone underlyings.
- `Kelly Criterion / Kelly Sizing`: Mathematical formula for the bet size that maximizes long-run geometric growth given edge and odds. In practice, traders use *fractional Kelly* (¼ to ½ Kelly) to reduce drawdown.

## Pricing Models

- `Black-Scholes`: Closed-form European-option pricing model. Inputs: spot, strike, time, IV, rate, dividend. Assumes log-normal returns and constant volatility — both broken in practice but the model remains the industry baseline for IV/Greeks.
- `Log-Normal Returns Assumption`: The model's assumption that log-returns are normally distributed. Real markets have fatter tails (left especially) and skew, so true probabilities deviate from model probabilities at the extremes.
- `Jump Risk`: Idiosyncratic single-day moves not captured by diffusion-based models (e.g., short reports, surprise M&A, regulatory headlines). The reason "modeled PoP" often overstates true PoP for premium sellers.

## Options Flow & Positioning

- `Open Interest (OI)`: Total open contracts at a strike/expiry. Built up over time.
- `Put/Call Ratio (P/C)`: Total puts / total calls (volume or OI). > 1.0 = bearish positioning; < 0.7 = bullish positioning.
- `Max Pain`: Strike at which the most options expire worthless — the price level that minimizes payout to option holders. Often acts as a magnet into expiry in low-catalyst weeks.
- `Call Wall / Put Wall`: Strikes with extreme OI, treated as soft resistance (call wall) or support (put wall) due to dealer hedging flows.
- `GEX` (Gamma Exposure): Aggregate dealer gamma positioning. Positive GEX dampens volatility (dealers buy dips / sell rips); negative GEX amplifies it.
- `Unusual Options Activity` / `Sweep`: Large, urgent option trades (often crossing the spread at multiple exchanges simultaneously) that signal directional conviction from informed flow.
- `Liquidity Score`: Composite of bid/ask spread tightness, volume, and open interest quality. Low liquidity = wide spreads = higher slippage.

## Earnings & Events

- `BMO / AMC`: Before market open / after market close earnings release timing.
- `Whisper Number`: Unofficial consensus estimate, often more aggressive than published consensus.
- `Beat / Miss`: Reported EPS or revenue above / below consensus.
- `Beat-Implied Rate`: Across recent earnings prints, the % of times the actual D1 move exceeded the pre-event implied move. A high rate (>60%) is a structural tell that long-premium has edge into earnings; a low rate (<40%) tells you premium sellers have edge.
- `Direction Bias`: Across recent earnings prints, the % of D1 moves that were UP (or DOWN). 7+ out of 8 in one direction is a strong directional bias and tilts strategy selection away from neutral.
- `D1 / D5`: Post-earnings 1-day and 5-day moves. D5 often reverses D1 partially or fully; defines whether the play is short-term "harvest the crush" or longer "trend follow."
- `Anchor Price`: Closing price the trading day before an earnings release — the reference price for measuring D1/D5 reaction.
- `Sympathy Move`: Price reaction in a correlated ticker driven by another stock's news or earnings — for example, a wafer-fab equipment supplier reacting to a leading-edge customer's results.
- `Read-Through`: Same idea framed as "what does X's print tell us about Y?" — common in sector clusters (semis, banks, hyperscalers, payments).
- `Sell-the-News`: Pattern where a stock falls on a beat (or rises on a miss) because positioning was already extreme.
- `Gap & Fill`: Tendency for an earnings gap to be partially or fully retraced within several sessions.

## Market Structure (Price Action)

See [Market Structure: CHoCH vs BOS](./market-structure-choch-bos.md) for diagrams and worked examples.

- `Swing High / Swing Low`: A local price peak / trough used as a structural reference point.
- `HH / HL`: Higher high / higher low. A sequence of both defines an uptrend.
- `LL / LH`: Lower low / lower high. A sequence of both defines a downtrend.
- `BOS` (Break of Structure): Price breaks a prior swing **in the direction of the trend** — confirms continuation (new HH in an uptrend, new LL in a downtrend).
- `CHoCH` (Change of Character): Price breaks a prior swing **against the trend** (below the last HL in an uptrend, above the last LH in a downtrend) — first warning of a potential reversal.
- `MSS` (Market Structure Shift): A strong, often impulsive opposite-direction break; sometimes used as a synonym for CHoCH, sometimes reserved for the more decisive version (with displacement / FVG).
- `POI` (Point of Interest): A price area expected to react — supply/demand zone or order block — often marked on a higher timeframe (`HTF POI`).
- `Supply / Demand Zone`: Area of prior strong selling / buying; a candidate reaction or reversal zone.
- `FVG` (Fair Value Gap): A three-candle price imbalance that price often returns to fill.
- `Liquidity` (`LIQ`): Clusters of resting stop orders just beyond obvious swing highs/lows; price tends to "sweep" them before reversing.

## Regime & Statistical Concepts

- `Regime`: A persistent statistical state of the market — typically Bull, Bear, or Sideways — defined by rolling-return rules or unsupervised clustering.
- `Markov Regime Model`: Assumes the next regime depends only on the current regime (memoryless). Estimated via a transition matrix of regime-to-regime probabilities.
- `Transition Matrix`: 3×3 (or N×N) matrix where entry `(i, j)` is the probability of moving from regime `i` to regime `j` in one step.
- `Persistence Diagonal`: The diagonal of the transition matrix — `P[Bull → Bull]`, `P[Bear → Bear]`, `P[Sideways → Sideways]`. High persistence (> 75%) means the current regime is "sticky."
- `Stationary Distribution`: Long-run probability of being in each regime. The fraction of time the system spends in each state over an infinite horizon. Solves `π × T = π`.
- `Sticky Bull / Sticky Bear`: Regime with persistence diagonal > 75%. The state tends to self-perpetuate; bullish/bearish strategies are favored / disfavored accordingly.
- `Tail-Heavy Regime`: When the stationary probability of the Bear regime exceeds ~40%, suggesting the underlying spends a non-trivial fraction of time in drawdown. Justifies defined-risk-only constraints and reduced sizing.
- `Regime Signal`: A scalar summary, often `P(Bull next) − P(Bear next)`, in `[−1, +1]`. Positive = bullish conviction, negative = bearish.
- `Sizing Scalar`: A multiplier (0–1) applied to default contract counts based on regime risk. Common form: `max(0, 1 − bear_baseline)`. Tail-heavy regimes hard-cap to 0.5 or 0.
- `Hidden Markov Model (HMM)`: A regime model where the regime itself is unobserved (latent) and inferred from returns via Baum-Welch / forward-backward. Adds expressiveness vs explicit-rule regime labels.
- `Walk-Forward Backtest`: Out-of-sample evaluation where the model is re-fit on a rolling window and tested on the next period — never uses future data to make past decisions.
- `Sharpe Ratio`: `(mean return − risk-free) / standard deviation of returns`, annualized. Quality measure for a return stream. > 1.0 is good; > 2.0 is rare.
- `Max Drawdown`: Largest peak-to-trough decline over the backtest period. Drawdown discipline is usually a tighter constraint than Sharpe in practice.

## Risk & Process

- `Defined Risk Only`: A rule used in regimes/tickers with documented tail risk — forbid undefined-risk structures (short strangles, naked short options).
- `Hard Gate`: A non-negotiable rule that blocks certain strategy families based on state (e.g., "no bullish premium-selling in sticky bear").
- `Conviction (HIGH / MED / LOW)`: Subjective grade of trade quality combining edge, fit, and timing.
- `Time Stop`: Exit rule based on calendar/DTE, not P&L (e.g., "close all credit spreads at 21 DTE regardless").
- `Profit Target`: Mechanical exit at a percentage of max profit (commonly 50% for credit spreads).
- `Stop Loss`: Mechanical exit at a percentage of max loss or credit received (commonly −150% to −200% of credit).
