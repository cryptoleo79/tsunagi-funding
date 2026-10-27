# Judge Walkthrough

## Quick start

Run `npm install && npm run dev`, then open http://localhost:3000.
Campaigns, supporters and pledge amounts are demo data. No ADA is moved.

## Recommended click path

1. **Homepage** (`/`) — prototype overview and sample campaign cards.
2. **Campaign detail** (`/campaigns/demo-1`) — sample story and price-input
   panel. Check the `Live`, `Mock` or `Fallback` mode before interpreting the
   price. Click **Calculate Demo Outcome**.
3. **Outcome** (`/campaigns/demo-1/close`) — simulated threshold math and
   price/source/timestamp display. This is not a transaction certificate.
4. **Another outcome** (`/campaigns/demo-2/close`) — a different goal and
   sample ADA amount. The result depends on the price input.
5. **Oracle price demo** (`/demo/oracle-proof`) — inspect the reported mode,
   source and timestamp; refresh to request a new price.
6. **Oracle API** (`/api/oracle`) — inspect JSON `status` and source.
   A configured reachable preprod feed can report `"status": "live"`.
   Otherwise the API reports `mock` or `fallback` with a reason.

## Demo campaigns

| Campaign | Sample input |
|---|---|
| Afrobeats on Chain (`demo-1`) | $3,000 goal and 15,000 demo ADA |
| Cardano Summit Accra (`demo-2`) | $10,000 goal and 12,000 demo ADA |
| Plutus Starter Kit (`demo-3`) | $5,000 goal and 20,000 demo ADA |

## What to verify

- `/api/oracle` labels preprod, mock and fallback modes accurately.
- The close page computes `pledged_ada * ada_usd_price` against the USD goal.
- The outcome UI labels results as scenarios and does not claim a transfer.
- The UI does not claim to display an original raw datum: the API carries a
  normalized price, source and timestamp.
- All linked campaign IDs match `lib/domain/demo-data.ts`.
