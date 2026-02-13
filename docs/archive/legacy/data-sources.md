# Trading Data Sources Reference

This document explains where to obtain the data required for:

- Earnings trading
- Volatility analysis
- Expected vs actual move comparison
- Strategy selection
- Backtesting

---

# Core Data Requirements

To trade earnings systematically, we need:

1. Historical earnings dates
2. Historical price (OHLC)
3. Option chain (historical & current)
4. Implied volatility (historical)
5. Expected move (ATM straddle pricing)
6. IV crush data
7. Liquidity metrics (volume, open interest, bid/ask spread)

---

# Where To Get Each Data Type

## 1️⃣ Earnings Dates

Free Sources:
- Yahoo Finance
- TradingView
- Nasdaq earnings calendar

Programmatic:
- Yahoo Finance API (via yfinance)
- Polygon.io (paid)

---

## 2️⃣ Historical Stock Price (OHLC)

Free:
- Yahoo Finance (yfinance Python library)
- TradingView
- IBKR TWS

Programmatic:
- IBKR API (recommended)
- yfinance
- Polygon.io

---

## 3️⃣ Options Chain (Current)

Available From:
- Interactive Brokers (TWS)
- IBKR API
- TradingView (visual only)
- Yahoo Finance (limited)

---

## 4️⃣ Historical Implied Volatility (Important)

Available From:
- IBKR API
- OptionMetrics (paid)
- ORATS (paid)
- LiveVol (paid)

Free (Limited):
- TradingView IV indicator (select tickers)
- IBKR historical IV

---

## 5️⃣ Expected Move Calculation

Formula:
Expected Move ≈ ATM Straddle Price

How to calculate:
1. Find ATM call price
2. Find ATM put price
3. Add both premiums
4. Divide by stock price → % move

Data source:
- IBKR option chain
- TradingView options chain

---

## 6️⃣ IV Crush Data

Required:
- IV 1 day before earnings
- IV 1 day after earnings

Source:
- IBKR API
- ORATS (paid)

Compute:
IV Crush % = (IV_before - IV_after) / IV_before

---

## 7️⃣ Liquidity Metrics

Required:
- Open interest
- Volume
- Bid/ask spread

Source:
- IBKR
- TradingView
- Yahoo Finance (limited)

---

# Recommended Setup (Cost Efficient)

Since you have:
- IBKR
- TradingView

Best approach:
Use IBKR API + Python for:
- Historical IV
- Option chains
- Earnings event analysis

TradingView:
- Quick visual confirmation
- IV Rank
- Technical context
