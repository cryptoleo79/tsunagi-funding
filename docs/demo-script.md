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

## 3. Live oracle proof (60 seconds)

Open `/demo/oracle-proof`. Point out the oracle status panel:

- Mode shows "Live (Charli3)" with a green indicator
- The price is read from the real Charli3 ADA/USD feed on Cardano preprod
- Raw integer and precision show the unprocessed on-chain value
- Source includes the preprod slot number

Optionally run `curl http://localhost:3000/api/oracle` to show the raw
JSON response.

## 4. Settlement outcomes (60 seconds)

Use the preset buttons to show two scenarios:

- **"ADA at $0.68 (goal met)"** — the banner turns green: Campaign Funded.
  Funds are released to the creator.
- **"ADA at $0.45 (goal missed)"** — the banner turns amber: Supporters
  Refunded. Pledges are returned.

The settlement proof panel below shows the full breakdown: oracle source,
price, pledged ADA, USD equivalent, goal, and outcome.

## 5. Campaign flow (30 seconds)

Navigate to `/campaigns/demo-1` to show a campaign detail page with the
live oracle rate in the pledge panel. Click "Settle Campaign" to see the
settlement page using real oracle data.

## 6. Wrap-up (30 seconds)

The oracle is not a display widget — it is the mechanism that decides
every settlement. The full path from Kupo query to Plutus CBOR decode
to price extraction is live and verified on preprod.
