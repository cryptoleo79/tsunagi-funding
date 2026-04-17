import type { SettlementResult } from "@/lib/domain/types";
import { formatAda, formatUsd, formatAdaUsd } from "@/lib/domain/format";
import { formatTimestamp } from "@/lib/utils/dates";

interface SettlementProofProps {
  result: SettlementResult;
}

export function SettlementProof({ result }: SettlementProofProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-4">
        Settlement Proof
      </h3>

      <div className="space-y-3 text-sm">
        <Row label="Oracle Feed" value="ADA/USD" />
        <Row label="Oracle Source" value={result.oracleSource} />
        <Row label="ADA/USD Price" value={formatAdaUsd(result.adaUsdPrice)} />
        <Row label="Settlement Time" value={formatTimestamp(result.settledAt)} />
        <Divider />
        <Row label="Pledged ADA" value={formatAda(result.pledgedAda)} />
        <Row label="USD Equivalent" value={formatUsd(result.usdRaised)} />
        <Row label="Campaign Goal" value={formatUsd(result.goalUsd)} />
        {result.surplus > 0 && (
          <Row label="Surplus" value={formatUsd(result.surplus)} />
        )}
        <Divider />
        <div className="flex justify-between pt-1">
          <span className="text-zinc-400">Outcome</span>
          <span
            className={`font-medium ${
              result.outcome === "funded"
                ? "text-emerald-400"
                : "text-amber-400"
            }`}
          >
            {result.outcome === "funded" ? "Funds Released" : "Backers Refunded"}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-zinc-800/50 p-4">
        <p className="text-xs text-zinc-500 font-mono break-all">
          tx: (pending on-chain settlement)
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-200">{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-zinc-800" />;
}
