import type { SettlementResult } from "@/lib/domain/types";
import type { OracleStatus } from "@/lib/oracle/types";
import { formatAdaUsd } from "@/lib/domain/format";
import { formatTimestamp } from "@/lib/utils/dates";
import { Chip } from "@/components/ui/chip";

interface SettlementProofProps {
  result: SettlementResult;
  oracleStatus?: OracleStatus;
  fallbackReason?: string;
}

export function SettlementProof({ result, oracleStatus, fallbackReason }: SettlementProofProps) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          Oracle Proof
        </h3>
        {oracleStatus && (
          <Chip
            label={oracleStatus === "live" ? "Live" : oracleStatus === "mock" ? "Mock" : "Fallback"}
            variant={oracleStatus === "live" ? "success" : "default"}
          />
        )}
      </div>

      <div className="space-y-3 text-sm">
        <Row label="Mode" value={oracleStatus === "live" ? "Live" : oracleStatus === "fallback" ? "Fallback" : "Mock"} />
        <Row label="Feed" value="ADA/USD" />
        <Row label="Source" value={result.oracleSource} />
        <Row label="Price" value={formatAdaUsd(result.adaUsdPrice)} />
        <Row label="Raw Integer" value={Math.round(result.adaUsdPrice * 1e6).toString()} />
        <Row label="Precision" value="1e6" />
        <Row label="Timestamp" value={formatTimestamp(result.settledAt)} />
      </div>

      {fallbackReason && (
        <div className="mt-5 rounded-lg bg-amber-950/30 border border-amber-900/30 p-3">
          <p className="text-xs text-amber-400">
            Using mock price: {fallbackReason}
          </p>
        </div>
      )}

      <p className="mt-5 text-xs text-zinc-500 leading-relaxed">
        Price sourced from the Charli3 ADA/USD feed on Cardano preprod
        via Kupo indexer. On-chain settlement transactions are planned.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className="text-zinc-200">{value}</span>
    </div>
  );
}
