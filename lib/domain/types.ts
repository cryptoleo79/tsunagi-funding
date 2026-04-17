export type CampaignStatus = "active" | "closed_success" | "closed_refund";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  goalUsd: number;
  pledgedAda: number;
  supporterCount: number;
  closesAt: Date;
  status: CampaignStatus;
  createdAt: Date;
}

export interface Pledge {
  id: string;
  campaignId: string;
  amountAda: number;
  walletAddress: string;
  timestamp: Date;
}

export interface SettlementInput {
  goalUsd: number;
  pledgedAda: number;
  adaUsdPrice: number;
  settledAt: Date;
  oracleSource: string;
}

export interface SettlementResult {
  outcome: "funded" | "refund";
  goalUsd: number;
  pledgedAda: number;
  adaUsdPrice: number;
  usdRaised: number;
  surplus: number;
  settledAt: Date;
  oracleSource: string;
}
