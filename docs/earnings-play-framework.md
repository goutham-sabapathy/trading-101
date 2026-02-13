# Earnings Trading Framework (Systematic Approach)

This document outlines a data-driven method for trading earnings.

---

# Step 1: Compare Expected Move vs Actual Move

For the last 8–12 earnings:

Collect:
- Price before earnings
- ATM straddle price (expected move)
- Actual next-day move %

If:
Actual move > Expected move → Buy premium favored
Actual move < Expected move → Sell premium favored

---

# Step 2: Measure IV Crush

Collect:
- IV 1 day before earnings
- IV 1 day after earnings

If IV crush > 30–40% consistently:
→ Selling premium has statistical edge

---

# Step 3: Strategy Selection Logic

Case A:
Expected move overpriced + Large IV crush
→ Iron Condor
→ Iron Butterfly
→ Short Strangle (defined risk preferred)

Case B:
Expected move underpriced + Big historical moves
→ Long Straddle
→ Long Strangle
→ Call/Put debit spread

Case C:
Strong post-earnings continuation
→ Trade breakout AFTER earnings
→ Avoid pre-earnings exposure

---

# Step 4: Risk Management Rules

- Risk max 1–2% of account per earnings trade
- Avoid illiquid options
- Avoid wide bid/ask spreads
- Never hold short naked options without defined risk

---

# Important Reality

Earnings trading edge comes from:
Implied move vs realized move comparison

Not from guessing direction.
