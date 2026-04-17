# Oracle Integration Notes

## Intended flow

1. Creator sets a campaign with a USD-denominated goal.
2. Backers pledge ADA to the campaign.
3. When the campaign closes, the settlement path is triggered.
4. The settlement reads the current ADA/USD price from the Charli3 on-chain feed.
5. `pledged_ada * ada_usd_price` is compared to `goal_usd`.
6. If the USD equivalent meets or exceeds the goal, funds are released to the creator.
7. If not, pledges are returned to backers.

## Why Charli3

Charli3 provides decentralized oracle feeds on Cardano. The ADA/USD feed
gives a verifiable, on-chain price that both parties can trust at settlement
time. This removes the need for either side to trust a centralized price
source.

## Current state

The oracle layer is structured as:

- `lib/oracle/types.ts` — shared types for oracle price data
- `lib/oracle/mock.ts` — returns realistic sample prices for the demo
- `lib/oracle/client.ts` — abstraction that will switch between mock and live
- `lib/oracle/charli3.ts` — placeholder for the live Charli3 adapter
- `lib/oracle/settlement.ts` — bridges oracle output into domain settlement input

## Live integration path

The Charli3 adapter will:

1. Connect to a Cardano node via Ogmios or Kupo
2. Query the feed UTxO by Charli3 policy ID and oracle address
3. Decode the inline datum to extract the price and timestamp
4. Validate freshness (reject stale prices beyond a configured window)
5. Return a structured `OraclePrice` for the settlement function
