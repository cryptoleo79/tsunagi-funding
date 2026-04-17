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
frontend are functional. The oracle layer currently uses mock data, with
the integration surface prepared for Charli3.

What works:
- Homepage with campaign listings
- Campaign creation form (demo mode)
- Campaign detail page with oracle rate panel
- Settlement page with outcome and proof display
- Interactive oracle demo page with adjustable parameters

What is planned:
- Live Charli3 ADA/USD feed via Ogmios/Kupo
- Cardano wallet connection (CIP-30)
- On-chain pledge and settlement transactions
- Smart contract for escrow logic

## Local setup

```bash
git clone <repo-url>
cd tsunagi-funding
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

| Route | Description |
|---|---|
| `/` | Homepage with campaign cards and product overview |
| `/campaigns/new` | Create a new campaign (demo mode) |
| `/campaigns/[id]` | Campaign detail with pledge panel and oracle rate |
| `/campaigns/[id]/close` | Settlement page with oracle proof |
| `/demo/oracle-proof` | Interactive oracle settlement demo |

## Oracle integration

See [docs/oracle-notes.md](docs/oracle-notes.md) for the integration plan.

The oracle surface is in `lib/oracle/`:
- `types.ts` — oracle price types
- `mock.ts` — demo price data
- `client.ts` — abstraction over mock and live sources
- `charli3.ts` — placeholder for the live Charli3 adapter
- `settlement.ts` — bridges oracle data into domain settlement

## Hackathon notes

This repository is a fresh build for the hackathon. It is not the existing
TSUNAGI node project. See [docs/hackathon-scope.md](docs/hackathon-scope.md)
for details on what is pre-existing background and what was built new.

## Next steps

1. Connect Charli3 ADA/USD on-chain feed
2. Add CIP-30 wallet connection for pledge transactions
3. Build escrow smart contract for holding and releasing pledged ADA
4. Persist campaigns to a database or on-chain state
