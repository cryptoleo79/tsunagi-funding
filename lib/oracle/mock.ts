import type { OraclePrice } from "./types";

// Preprod-aligned ADA/USD for demo display.
// Matches the approximate range of the live Charli3 preprod feed.
const MOCK_ADA_USD = 0.26;

export function getMockPrice(): OraclePrice {
  return {
    feed: "ADA/USD",
    price: MOCK_ADA_USD,
    timestamp: new Date(),
    source: "mock (demo)",
  };
}

export function getMockPriceAt(price: number, timestamp?: Date): OraclePrice {
  return {
    feed: "ADA/USD",
    price,
    timestamp: timestamp ?? new Date(),
    source: "mock (demo)",
  };
}
