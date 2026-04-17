# Demo Script

Target length: 3–4 minutes.

## 1. Intro (30 seconds)

TSUNAGI Funding is oracle-native crowdfunding on Cardano. Creators set a
campaign goal in USD, supporters back it in ADA, and at close the live
Charli3 ADA/USD oracle determines whether funds are released or refunded.

## 2. The problem (30 seconds)

ADA fluctuates. A campaign that looked fully funded yesterday might fall
short today — or vice versa. Without a trusted on-chain price, neither
creators nor supporters can agree on the outcome. The oracle provides a
verifiable settlement rate that both sides can trust.

## 3. Campaign flow (60 seconds)

Open the homepage. Show the three demo campaigns — each with a different
funding story. Click into "Afrobeats on Chain" (`/campaigns/demo-1`).

Point out:
- The campaign goal in USD
- The amount pledged in ADA
- The live oracle rate in the pledge panel (with a "Live" chip)

Click "Settle Campaign" to go to the close page.

## 4. Settlement (60 seconds)

The settlement page shows the outcome in one glance:

- "Campaign Funded" — the pledged ADA exceeded the USD goal at the current
  oracle rate. Funds are released to the creator.

Now go back and try the Accra Summit campaign (`/campaigns/demo-2/close`):

- "Supporters Refunded" — the pledged ADA fell short. Supporters get their
  ADA back.

The oracle determines both outcomes from the same live price feed.

## 5. Live oracle proof (30 seconds)

Open `/demo/oracle-proof`. The status panel shows the live Charli3 price
with source, timestamp, and a "Live" indicator. Below, two canned cards
show how the same pledge amount produces release or refund at different
ADA/USD rates.

Optionally run `curl http://localhost:3000/api/oracle` to show the raw
JSON response.

## 6. Wrap-up (30 seconds)

The oracle is not decorative — it is the mechanism that decides every
settlement. The full path from Kupo query to Plutus CBOR datum decode
to price extraction is live on Cardano preprod.
