import type { OraclePrice } from "./types";
import type { SettlementInput } from "@/lib/domain/types";

// Bridges an oracle price reading into a settlement input for the domain layer.
export function buildSettlementInput(
  goalUsd: number,
  pledgedAda: number,
  oracle: OraclePrice,
): SettlementInput {
  return {
    goalUsd,
    pledgedAda,
    adaUsdPrice: oracle.price,
    settledAt: oracle.timestamp,
    oracleSource: oracle.source,
  };
}
