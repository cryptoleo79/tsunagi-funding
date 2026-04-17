export type OracleMode = "live" | "mock";

export interface OracleConfig {
  mode: OracleMode;
  kupoUrl: string;
  ogmiosUrl: string;
  feed: string;
  charli3Address: string;
  charli3PolicyId: string;
}

export function getOracleConfig(): OracleConfig {
  const mode = (process.env.NEXT_PUBLIC_ORACLE_MODE || "mock") as OracleMode;
  return {
    mode: mode === "live" ? "live" : "mock",
    kupoUrl: process.env.NEXT_PUBLIC_KUPO_URL || "",
    ogmiosUrl: process.env.NEXT_PUBLIC_OGMIOS_URL || "",
    feed: process.env.NEXT_PUBLIC_ORACLE_FEED || "ADA/USD",
    charli3Address: process.env.NEXT_PUBLIC_CHARLI3_ADDRESS || "",
    charli3PolicyId: process.env.NEXT_PUBLIC_CHARLI3_POLICY_ID || "",
  };
}

export function isLiveConfigured(config: OracleConfig): boolean {
  return config.mode === "live" && config.kupoUrl !== "" && config.charli3Address !== "";
}
