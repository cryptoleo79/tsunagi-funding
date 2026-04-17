import type { SettlementInput, SettlementResult } from "./types";
import { calculateUsdRaised } from "./campaign";

export function resolveCampaignSettlement(input: SettlementInput): SettlementResult {
  const usdRaised = calculateUsdRaised(input.pledgedAda, input.adaUsdPrice);
  const funded = usdRaised >= input.goalUsd;

  return {
    outcome: funded ? "funded" : "refund",
    goalUsd: input.goalUsd,
    pledgedAda: input.pledgedAda,
    adaUsdPrice: input.adaUsdPrice,
    usdRaised,
    surplus: funded ? usdRaised - input.goalUsd : 0,
    settledAt: input.settledAt,
    oracleSource: input.oracleSource,
  };
}
