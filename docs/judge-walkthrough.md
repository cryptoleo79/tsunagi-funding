# Judge Walkthrough

## Quick start

Run `npm install && npm run dev`, then open http://localhost:3000.

## Recommended click path

1. **Homepage** (`/`) — product overview with featured campaign, how it works,
   why oracle-native crowdfunding, closing soon, and all campaigns.

2. **Campaign detail** (`/campaigns/demo-1`) — the Afrobeats on Chain campaign
   with story, supporter perks, use of funds, updates, supporters, and FAQ.
   The sidebar shows the live oracle rate. Click "Settle Campaign".

3. **Settlement — funded** (`/campaigns/demo-1/close`) — the settlement
   decision shows the 5-step math, threshold bar, and verdict. Below, the
   Settlement Certificate lists every datum field with a "Why this price is
   trustworthy" explanation. Use the links at the bottom to try other
   settlements.

4. **Settlement — refund** (`/campaigns/demo-2/close`) — same oracle, same
   math, different outcome. The Accra Summit falls short of its $10k goal,
   resulting in "Supporters Refunded".

5. **Live Oracle Proof** (`/demo/oracle-proof`) — interactive oracle status
   panel with refresh, two outcome examples, and technical details. Links at
   the bottom connect back to live settlements.

6. **Oracle API** — open `/api/oracle` or run:

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
- The Settlement Certificate includes raw integer, precision, source, timestamp
- Different campaigns produce different settlement outcomes
- Each campaign page shows tailored supporter perks and a refund protection line
- Navigation between settlements is seamless (links at bottom of each close page)
