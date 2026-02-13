# Indicators Reference (Generic)

## Breadth and Flow

| Indicator | What It Measures | Typical Interpretation |
|---|---|---|
| TICK | Real-time market pressure | High positive = broad buying pressure |
| ADD | Breadth direction | Rising positive breadth supports trend |
| TRIN | Breadth vs volume balance | Above 1 can indicate risk-off pressure |
| VOLD | Volume participation | Positive VOLD supports risk-on participation |

## Volatility Indicators

| Indicator | What It Measures | Typical Interpretation |
|---|---|---|
| IV Rank | Current IV vs 1Y range | High IV Rank may favor premium selling |
| IV Percentile | Frequency rank of IV | Helps compare current IV context |
| HV/RV | Realized volatility | Use against IV to assess richness/cheapness |

## Usage Notes

- Indicators are context tools; avoid single-indicator decisions.
- Keep threshold logic in rulebooks and version those thresholds.
- Validate indicator utility per ticker/regime via out-of-sample tests.
