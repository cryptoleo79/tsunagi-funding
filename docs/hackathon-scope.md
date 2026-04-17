# Hackathon Scope

## Pre-existing background

TSUNAGI ("to connect") is a broader project exploring Cardano infrastructure,
including a chain-following node written in Zig. That work is separate and
lives in its own repository.

The concept of oracle-native crowdfunding grew out of thinking about how
on-chain price data could mediate real-world funding outcomes, but the
implementation here is entirely new.

## New work built for this hackathon

Everything in this repository was built from scratch for the hackathon:

- Next.js application with TypeScript and Tailwind CSS
- Domain model for campaigns, pledges, and settlement
- Settlement logic using oracle price input to determine release or refund
- Live Charli3 ADA/USD oracle integration via Kupo with Plutus CBOR datum decoding
- Mock oracle layer with graceful fallback when the live feed is unavailable
- Five working pages: home, create campaign, campaign detail, settlement, oracle demo
- Oracle API endpoint serving live on-chain data
- Documentation and oracle integration notes

No code was carried over from other TSUNAGI repositories.
