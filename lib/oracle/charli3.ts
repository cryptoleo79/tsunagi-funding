// Charli3 oracle adapter.
//
// The live integration will:
// 1. Connect to a Cardano node via Ogmios or Kupo
// 2. Query the Charli3 ADA/USD feed UTxO by policy ID
// 3. Decode the inline datum to extract the price and timestamp
// 4. Return a validated OraclePrice for settlement
//
// This file will hold that adapter once the on-chain query path is wired.

import type { OraclePrice } from "./types";

export async function fetchCharli3Price(): Promise<OraclePrice> {
  throw new Error(
    "Charli3 live feed is not yet connected. Use the mock client for demo.",
  );
}
