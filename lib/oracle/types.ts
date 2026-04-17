export interface OraclePrice {
  feed: string;
  price: number;
  timestamp: Date;
  source: string;
}

export interface OracleFeedConfig {
  feedName: string;
  policyId: string;
  oracleAddress: string;
}
