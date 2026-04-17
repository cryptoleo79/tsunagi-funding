# Oracle Scripts

This directory will contain tooling for interacting with the Charli3 oracle.

## Planned workflow

### validate-config

Check that `config.yaml` has valid connection details for Ogmios/Kupo and
the correct Charli3 policy ID and oracle address for the target network.

### feeds

Query the current ADA/USD feed price from the on-chain oracle and display
the price, timestamp, and feed metadata.

### aggregate

For campaigns that span multiple oracle reads, aggregate price data over
the settlement window.

## Current state

These scripts are not yet implemented. The application uses the mock oracle
layer in `lib/oracle/mock.ts` for development and demo purposes.

Live execution will rely on the Charli3-supported query path via
Ogmios or Kupo to read on-chain feed data.
