import type { OraclePrice } from "./types";
import { getMockPrice } from "./mock";

// Oracle client abstraction.
// Currently returns mock data. The live implementation will query
// Charli3 on-chain feed data via Ogmios/Kupo.
export async function fetchAdaUsdPrice(): Promise<OraclePrice> {
  return getMockPrice();
}
