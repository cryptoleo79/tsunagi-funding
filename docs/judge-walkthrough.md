# Judge Walkthrough

## Quick start

Run `npm install && npm run dev`, then open http://localhost:3000.

## Where to click

1. **Homepage** (`/`) — overview of the product, two demo campaigns, and
   a "Live Oracle Demo" button in the hero.

2. **Oracle API** — open `/api/oracle` in a browser or run:

   ```bash
   curl http://localhost:3000/api/oracle
   ```

   Look for `"status": "live"` and a real ADA/USD price from Charli3 preprod.

3. **Oracle demo** (`/demo/oracle-proof`) — the oracle status panel at the
   top shows the live feed: mode, price, raw integer, precision, source, and
   timestamp. Below, the settlement calculator lets you test release vs
   refund scenarios.

4. **Campaign detail** (`/campaigns/demo-1`) — shows a demo campaign with
   the live oracle rate in the pledge panel on the right. Click
   "Settle Campaign" to proceed to settlement.

5. **Settlement** (`/campaigns/demo-1/close`) — the settlement page fetches
   the live oracle price and determines whether the campaign met its USD
   goal. The outcome banner shows "Campaign Funded" or "Supporters Refunded"
   with full proof details.

## What to verify

- The `/api/oracle` response contains `"status": "live"` with a real price
- The oracle demo page shows a green dot next to "Live (Charli3)"
- The settlement proof panel shows the Charli3 source and slot number
- Changing the oracle price in the demo calculator flips the outcome
  between release and refund
