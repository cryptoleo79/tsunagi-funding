import type { OraclePrice } from "./types";

// Realistic ADA/USD range for demo purposes.
// These values approximate recent market conditions.
const MOCK_ADA_USD = 0.6834;

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
