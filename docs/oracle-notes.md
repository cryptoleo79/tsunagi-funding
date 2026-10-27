# Oracle Integration Notes

## Implemented prototype flow

1. A demo campaign has a USD-denominated goal and sample ADA pledge amount.
2. At the close page, the app requests a Charli3 ADA/USD preprod price.
3. If the lookup is unavailable or mock mode is selected, it uses labeled mock data.
4. `pledged_ada * ada_usd_price` is compared to `goal_usd`.
5. The UI displays a release or refund scenario. No pledge custody, escrow,
   release or refund transaction is implemented.

## Why Charli3

Charli3 provides decentralized oracle feeds on Cardano. The ADA/USD feed
can provide a preprod price input for the demo calculation. This
prototype does not validate price freshness or produce a settlement receipt.

## Integration path

The oracle layer queries the Charli3 ADA/USD feed via Kupo:

1. Kupo indexes the Cardano chain and exposes a REST API for UTxO queries
2. The adapter queries UTxOs at the Charli3 oracle address, filtered by policy ID
3. The most recent UTxO is selected (highest slot)
4. The inline datum is fetched and decoded from CBOR (Plutus data format)
5. A heuristic decoder tries known Charli3 datum layouts to extract price and timestamp
6. If decoding succeeds, the preprod price is reported with `live` status
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
- Preprod lookup: previously exercised with a hosted Kupo endpoint; availability is configuration-dependent

## What is not yet done

- Price staleness validation (rejecting prices older than a threshold)
- Wallet pledge transactions, escrow and on-chain release/refund transactions
