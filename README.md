# TSUNAGI Funding

**Connecting People Through ADA Funding**

Oracle-native crowdfunding on Cardano. Creators set a campaign goal in USD,
supporters pledge in ADA, and at campaign close a live Charli3 ADA/USD oracle
rate determines whether the goal was met.

If `pledged_ada * ada_usd_price >= goal_usd`, funds are released to the creator.
Otherwise, backers are refunded.

## Why the oracle matters

Crowdfunding goals are naturally expressed in USD (or fiat), but Cardano
supporters pledge in ADA. The ADA/USD exchange rate moves. Without an oracle,
there is no trustworthy way to determine whether a campaign actually met its
USD target at the time of settlement.

Charli3 provides a decentralized, on-chain ADA/USD price feed. TSUNAGI Funding
uses this feed as the bridge between on-chain funding and real-world value.

## Product concept

TSUNAGI means "to connect" in Japanese. This platform connects:

- **Creators** who need funding for projects, content, and tools
- **Supporters** who back campaigns with ADA
- **The oracle** which bridges on-chain value and real-world pricing at settlement

## Current status

This is a hackathon build. The core domain logic, settlement engine, and
frontend are functional.

What works:
- Homepage with campaign listings
- Campaign creation form (demo mode)
- Campaign detail page with live/mock oracle rate panel
- Settlement page with outcome, proof display, and oracle status
- Interactive oracle demo page with live fetch and adjustable parameters
- Charli3 integration path: Kupo query, CBOR datum decode, price extraction
- Graceful fallback to mock data when live feed is unavailable

What is planned:
- Validate datum decode against a real Charli3 preprod UTxO
- Cardano wallet connection (CIP-30)
- On-chain pledge and settlement transactions
- Smart contract for escrow logic

## Local setup

```bash
git clone https://github.com/cryptoleo79/tsunagi-funding.git
cd tsunagi-funding
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

### Oracle configuration

To enable live oracle data, edit `.env.local`:

```
NEXT_PUBLIC_ORACLE_MODE=live
NEXT_PUBLIC_KUPO_URL=https://your-kupo-endpoint
NEXT_PUBLIC_CHARLI3_ADDRESS=addr_test1...
NEXT_PUBLIC_CHARLI3_POLICY_ID=abc123...
```

When mode is `mock` or env vars are missing, the app uses demo prices
and labels them clearly.

## Routes

| Route | Description |
|---|---|
| `/` | Homepage with campaign cards and product overview |
| `/campaigns/new` | Create a new campaign (demo mode) |
| `/campaigns/[id]` | Campaign detail with pledge panel and oracle rate |
| `/campaigns/[id]/close` | Settlement page with oracle proof |
| `/demo/oracle-proof` | Interactive oracle settlement demo |
| `/api/oracle` | Oracle price API (JSON) |

## Oracle integration

See [docs/oracle-notes.md](docs/oracle-notes.md) for the full integration path.

The oracle layer in `lib/oracle/`:

| File | Role |
|---|---|
| `config.ts` | Reads env vars, determines oracle mode |
| `types.ts` | OraclePrice, OracleResult, Kupo response types |
| `decode.ts` | Minimal Plutus CBOR decoder for datum extraction |
| `charli3.ts` | Kupo fetch, datum decode, price extraction |
| `client.ts` | Mode switching (live/mock) with graceful fallback |
| `mock.ts` | Static demo prices |
| `settlement.ts` | Bridges oracle output into domain settlement |

## Hackathon notes

This repository is a fresh build for the hackathon. It is not the existing
TSUNAGI node project. See [docs/hackathon-scope.md](docs/hackathon-scope.md)
for details on what is pre-existing background and what was built new.

## Next steps

1. Validate Charli3 datum decode against real preprod feed data
2. Add CIP-30 wallet connection for pledge transactions
3. Build escrow smart contract for holding and releasing pledged ADA
4. Persist campaigns to a database or on-chain state
