export function calculateUsdRaised(pledgedAda: number, adaUsdPrice: number): number {
  return pledgedAda * adaUsdPrice;
}

export function calculateProgress(goalUsd: number, usdRaised: number): number {
  if (goalUsd <= 0) return 0;
  return Math.min(usdRaised / goalUsd, 1);
}

export function isCampaignExpired(closesAt: Date): boolean {
  return new Date() >= closesAt;
}
