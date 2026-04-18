import type { SettlementResult } from "@/lib/domain/types";
import type { OracleStatus } from "@/lib/oracle/types";
import { formatAda, formatUsd, formatAdaUsd } from "@/lib/domain/format";
import { formatTimestamp } from "@/lib/utils/dates";
import { Chip } from "@/components/ui/chip";

interface SettlementProofProps {
  result: SettlementResult;
  campaignTitle: string;
  oracleStatus?: OracleStatus;
  fallbackReason?: string;
}

export function SettlementProof({
  result,
  campaignTitle,
  oracleStatus,
  fallbackReason,
}: SettlementProofProps) {
  const funded = result.outcome === "funded";

  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          Settlement Certificate
        </h3>
        {oracleStatus && (
          <Chip
            label={oracleStatus === "live" ? "Live" : oracleStatus === "mock" ? "Mock" : "Fallback"}
            variant={oracleStatus === "live" ? "success" : "default"}
          />
        )}
      </div>

      <div className="space-y-0">
        <Row label="Campaign" value={campaignTitle} />
        <Row label="Goal in USD" value={formatUsd(result.goalUsd)} />
        <Row label="Backed in ADA" value={formatAda(result.pledgedAda)} />
        <Divider />
        <Row label="Live ADA/USD" value={formatAdaUsd(result.adaUsdPrice)} />
        <Row label="Raw Integer" value={Math.round(result.adaUsdPrice * 1e6).toString()} />
        <Row label="Precision" value="1e6 (price = raw / 1,000,000)" />
        <Row label="Source" value={result.oracleSource} />
        <Row label="Timestamp" value={formatTimestamp(result.settledAt)} />
        <Divider />
        <Row
          label="USD Value at Close"
          value={formatUsd(result.usdRaised)}
          highlight
        />
        <Row
          label="Final Outcome"
          value={funded ? "Funds Released to Creator" : "ADA Returned to Supporters"}
          highlight
          variant={funded ? "success" : "warning"}
        />
      </div>

      {fallbackReason && (
        <div className="mt-6 rounded-lg bg-amber-950/30 border border-amber-900/30 p-3">
          <p className="text-xs text-amber-400">
            Using mock price: {fallbackReason}
          </p>
        </div>
      )}

      <div className="mt-6 rounded-lg bg-zinc-800/50 p-4">
        <p className="text-xs font-medium text-zinc-300 mb-2">
          Why this price is trustworthy
        </p>
        <ul className="space-y-1.5 text-xs text-zinc-400 leading-relaxed">
          <li className="flex gap-2">
            <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
            Fetched at close from the live Charli3 ADA/USD feed on Cardano preprod
          </li>
          <li className="flex gap-2">
            <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
            Normalized from the on-chain Plutus datum (integer / 1e6)
          </li>
          <li className="flex gap-2">
            <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
            Derived from decentralized oracle submissions and consensus
          </li>
          <li className="flex gap-2">
            <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
            Used as the sole settlement authority for this campaign
          </li>
        </ul>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
  variant,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  variant?: "success" | "warning";
}) {
  let valueClass = "text-zinc-200";
  if (highlight && variant === "success") valueClass = "text-emerald-400 font-medium";
  else if (highlight && variant === "warning") valueClass = "text-amber-400 font-medium";
  else if (highlight) valueClass = "text-white font-medium";

  return (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-zinc-400">{label}</span>
      <span className={`text-right ${valueClass}`}>{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-zinc-800 my-1" />;
}
