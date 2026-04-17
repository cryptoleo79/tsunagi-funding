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

export type OracleStatus = "live" | "mock" | "fallback";

export interface OracleResult {
  price: OraclePrice;
  status: OracleStatus;
  fallbackReason?: string;
}

// Kupo API response shapes

export interface KupoMatch {
  transaction_id: string;
  output_index: number;
  address: string;
  value: {
    coins: number;
    assets?: Record<string, number>;
  };
  datum_hash: string | null;
  datum_type: "hash" | "inline" | null;
  script_hash: string | null;
  created_at: {
    slot_no: number;
    header_hash: string;
  };
}

export interface KupoDatum {
  hash: string;
  datum: string;
}
