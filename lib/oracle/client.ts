import type { OracleResult } from "./types";
import { getOracleConfig, isLiveConfigured } from "./config";
import { getMockPrice } from "./mock";
import { fetchCharli3Price } from "./charli3";

export async function fetchAdaUsdPrice(): Promise<OracleResult> {
  const config = getOracleConfig();

  if (!isLiveConfigured(config)) {
    return {
      price: getMockPrice(),
      status: "mock",
    };
  }

  const result = await fetchCharli3Price(config);

  // If live fetch failed, fall back to mock with the reason preserved
  if (result.status === "fallback") {
    return {
      price: getMockPrice(),
      status: "fallback",
      fallbackReason: result.fallbackReason,
    };
  }

  return result;
}
