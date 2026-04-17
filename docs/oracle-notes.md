# Oracle Integration Notes

## Intended flow

1. Creator sets a campaign with a USD-denominated goal.
2. Supporters pledge ADA to the campaign.
3. When the campaign closes, the settlement path is triggered.
4. The settlement reads the current ADA/USD price from the Charli3 on-chain feed.
5. `pledged_ada * ada_usd_price` is compared to `goal_usd`.
6. If the USD equivalent meets or exceeds the goal, funds are released to the creator.
7. If not, pledges are returned to supporters.

## Why Charli3

Charli3 provides decentralized oracle feeds on Cardano. The ADA/USD feed
gives a verifiable, on-chain price that both parties can trust at settlement
time. This removes the need for either side to trust a centralized price
source.

## Integration path

The oracle layer queries the Charli3 ADA/USD feed via Kupo:

1. Kupo indexes the Cardano chain and exposes a REST API for UTxO queries
2. The adapter queries UTxOs at the Charli3 oracle address, filtered by policy ID
3. The most recent UTxO is selected (highest slot)
4. The inline datum is fetched and decoded from CBOR (Plutus data format)
5. A heuristic decoder tries known Charli3 datum layouts to extract price and timestamp
6. If decoding succeeds, the live price is returned
7. If any step fails, the system falls back to mock data with an explicit reason

## File structure

- `lib/oracle/config.ts` — reads environment variables, determines oracle mode
- `lib/oracle/types.ts` — OraclePrice, OracleResult, Kupo response types
- `lib/oracle/decode.ts` — minimal Plutus CBOR decoder for datum extraction
- `lib/oracle/charli3.ts` — Kupo fetch, datum decode, price extraction
- `lib/oracle/client.ts` — mode switching (live vs mock) with fallback
- `lib/oracle/mock.ts` — static demo prices
- `lib/oracle/settlement.ts` — bridges oracle output into domain settlement
- `app/api/oracle/route.ts` — HTTP endpoint for client-side oracle queries

## Configuration

Set these environment variables in `.env.local`:

```
NEXT_PUBLIC_ORACLE_MODE=live
NEXT_PUBLIC_KUPO_URL=https://your-kupo-endpoint
NEXT_PUBLIC_CHARLI3_ADDRESS=addr_test1...
NEXT_PUBLIC_CHARLI3_POLICY_ID=abc123...
```

When mode is `mock` or when env vars are missing, the system uses
hardcoded demo prices and labels them clearly as mock data.

## Current state

- Kupo query path: implemented and verified on preprod
- CBOR datum decoder: implemented (handles integers, byte strings, arrays, maps, constructors)
- Charli3 ODV datum format: validated against real preprod UTxO data
- Price extraction: handles known Charli3 layouts including nested Constr/Map
- Fallback: graceful, with explicit reason shown in the UI
- Live: working on preprod with hosted Kupo endpoint

## What is not yet done

- Price staleness validation (rejecting prices older than a threshold)
- On-chain settlement transactions
