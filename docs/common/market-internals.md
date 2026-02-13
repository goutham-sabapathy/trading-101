# Market Internals (Generic Reference)

## Purpose
Market internals help assess whether index-level conditions support or weaken a trade setup.

## Common Internals

- `TICK`: net upticks vs downticks across exchange constituents.
- `ADD` (Advance-Decline): breadth of advancing minus declining stocks.
- `TRIN` (Arms Index): breadth adjusted by volume flow.
- `VOLD`: advancing volume minus declining volume.

## Options-Related Internals

- Gamma exposure (GEX) context.
- Call/put wall zones and dealer hedging pressure.
- Volatility regime (e.g., VIX level and slope).

## Practical Use

- Use internals as regime filters, not standalone entry signals.
- Avoid taking short-vol positions when internals indicate unstable tape.
- Avoid overfitting thresholds; use broad bands and backtest.
