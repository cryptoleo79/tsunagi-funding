# Demo Script

Target length: 3–4 minutes. This is a prototype demonstration. Campaigns,
pledges, supporters and outcomes are sample data; no ADA is held or moved.

## 1. Intro (30 seconds)

TSUNAGI Funding represents ADA pledge amounts against USD campaign goals.
A Charli3 ADA/USD preprod lookup, when available, or a labeled mock fallback
feeds a simulated release or refund outcome. The app does not submit pledges,
operate escrow, or execute release/refund transactions.

## 2. The question (30 seconds)

An ADA/USD price changes the USD value of a fixed ADA amount. This prototype
shows how a reported oracle price could be used in a campaign threshold
calculation. Price freshness checks and on-chain settlement are future work.

## 3. Campaign flow (60 seconds)

Open the homepage and explain its sample campaign values. Open
`/campaigns/demo-1`. Point out the fictional story, sample pledge amounts,
perks and the price-input panel. The panel labels a preprod reading as
`Live`, or reports `Mock` / `Fallback` and the fallback reason.

Click **Calculate Demo Outcome**. The close page calculates a result when
it loads; it is not a transfer receipt.

## 4. Outcome (60 seconds)

The **Simulated Outcome** card compares the sample ADA amount and USD goal.
The **Demo Outcome Inputs** panel shows price, source, timestamp, reported
mode and the release/refund scenario. It does not carry the original raw datum.
Use `/campaigns/demo-2/close` for another sample calculation. Its outcome
can vary with the price input; do not promise a particular verdict.

## 5. Oracle price demo (30 seconds)

Open `/demo/oracle-proof`. Inspect the source, timestamp and mode. Click
**Refresh** to request a new report. The linked campaign pages make their
own lookup, so they may show a different value or fallback state.

Optionally run `curl http://localhost:3000/api/oracle` and inspect `status`:
`live` indicates a reported Charli3 preprod lookup; `mock` and `fallback`
indicate demo data. The API does not return a raw datum or execute settlement.

## 6. Wrap-up (30 seconds)

The implemented boundary is price lookup plus simulated domain math.
Wallet pledge transactions, escrow, price-age rejection and on-chain
release/refund transactions remain unimplemented.
