# Judge Walkthrough

## Quick start

Run `npm install && npm run dev`, then open http://localhost:3000.

## Where to click

1. **Homepage** (`/`) — overview of the product with three demo campaigns.
   The hero links directly to a campaign, the live oracle proof, and the
   settlement demo.

2. **Campaign detail** (`/campaigns/demo-1`) — shows the "Afrobeats on
   Chain" campaign with the live oracle rate in the pledge panel. Click
   "Settle Campaign" to proceed to settlement.

3. **Settlement** (`/campaigns/demo-1/close`) — the settlement page fetches
   the live oracle price and determines whether the campaign met its USD
   goal. The outcome banner shows "Campaign Funded" or "Supporters Refunded"
   with full proof details.

4. **Try a second campaign** — `/campaigns/demo-2/close` shows a campaign
   that falls short of its goal, resulting in a refund outcome.

5. **Oracle proof** (`/demo/oracle-proof`) — the live oracle status panel
   shows mode, price, feed, source, and timestamp. Below, two canned
   outcome cards show release vs refund.

6. **Oracle API** — open `/api/oracle` in a browser or run:

   ```bash
   curl http://localhost:3000/api/oracle
   ```

   Look for `"status": "live"` and a real ADA/USD price from Charli3 preprod.

## Demo campaigns

| Campaign | Expected outcome |
|---|---|
| Afrobeats on Chain (demo-1) | Funded — goal is met at current oracle rate |
| Cardano Summit Accra (demo-2) | Refund — goal is not met |
| Plutus Starter Kit (demo-3) | Borderline — depends on current rate |

## What to verify

- The `/api/oracle` response contains `"status": "live"` with a real price
- The settlement pages use the live oracle to determine outcomes
- The oracle proof page shows a green "Live" chip next to the title
- Different campaigns produce different settlement outcomes
