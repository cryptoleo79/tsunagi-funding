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

Open the homepage. Show the featured campaign card with progress bar, the
"How it works" steps, and the "Why oracle-native crowdfunding" section.

Click into "Afrobeats on Chain" (`/campaigns/demo-1`). Point out:
- The campaign story, creator bio, and supporter perks
- The "What supporters receive" section with tailored bullet points
- The refund protection line at the bottom of that section
- The live oracle rate in the sidebar pledge panel (with a "Live" chip)

Click "Settle Campaign" to go to the close page.

## 4. Settlement (60 seconds)

The settlement page shows the outcome in one glance:

- The Settlement Decision card walks through the 5-step math with a
  threshold bar and verdict
- The Settlement Certificate below it shows every oracle field: campaign,
  goal, ADA price, raw integer, precision, source, timestamp, USD value,
  and final outcome
- The "Why this price is trustworthy" section explains the oracle's role

Use the links at the bottom to try the Accra Summit (`/campaigns/demo-2/close`):
- Same oracle, same math — but the goal is $10k, so the outcome is
  "Supporters Refunded"

## 5. Live oracle proof (30 seconds)

Open `/demo/oracle-proof`. The status panel shows the live Charli3 price
with source, timestamp, and a "Live" indicator. Below, two outcome cards
show how the same pledge amount produces release or refund at different
ADA/USD rates.

Optionally run `curl http://localhost:3000/api/oracle` to show the raw
JSON response.

## 6. Wrap-up (30 seconds)

The oracle is not decorative — it is the mechanism that decides every
settlement. The full path from Kupo query to Plutus CBOR datum decode
to price extraction is live on Cardano preprod. Every settlement includes
a certificate with the raw datum, precision, and source — fully verifiable.
