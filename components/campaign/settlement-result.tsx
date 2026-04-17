import type { SettlementResult } from "@/lib/domain/types";
import type { OracleStatus } from "@/lib/oracle/types";
import { formatAda, formatUsd, formatAdaUsd } from "@/lib/domain/format";
import { Chip } from "@/components/ui/chip";

interface SettlementResultBannerProps {
  result: SettlementResult;
  oracleStatus?: OracleStatus;
}

export function SettlementResultBanner({ result, oracleStatus }: SettlementResultBannerProps) {
  const funded = result.outcome === "funded";
  const fillPercent = result.goalUsd > 0
    ? Math.min((result.usdRaised / result.goalUsd) * 100, 100)
    : 0;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Settlement Decision
        </h2>
        {oracleStatus && (
          <Chip
            label={oracleStatus === "live" ? "Live" : oracleStatus === "fallback" ? "Fallback" : "Mock"}
            variant={oracleStatus === "live" ? "success" : "default"}
          />
        )}
      </div>

      {/* Step 1–3: Inputs */}
      <div className="space-y-4">
        <MathRow step="1" label="Goal" value={formatUsd(result.goalUsd)} />
        <MathRow step="2" label="Backed" value={formatAda(result.pledgedAda)} />
        <MathRow step="3" label="Live ADA/USD" value={formatAdaUsd(result.adaUsdPrice)} />
      </div>

      <div className="my-6 border-t border-zinc-800" />

      {/* Step 4: Calculation */}
      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-zinc-400">USD Value at Close</span>
          <span className="text-2xl font-semibold text-zinc-100">
            {formatUsd(result.usdRaised)}
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-600">
          = {result.pledgedAda.toLocaleString("en-US")} ADA &times; {formatAdaUsd(result.adaUsdPrice)}
        </p>
      </div>

      {/* Threshold bar */}
      <div className="mt-6 mb-2">
        <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className={`h-full rounded-full ${
              funded ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${fillPercent.toFixed(1)}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-xs">
          <span className={funded ? "text-emerald-500" : "text-amber-500"}>
            {formatUsd(result.usdRaised)} raised
          </span>
          <span className="text-zinc-500">
            {formatUsd(result.goalUsd)} goal
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-zinc-800" />

      {/* Step 5: Verdict */}
      <div
        className={`rounded-xl p-5 ${
          funded
            ? "bg-emerald-950/40 border border-emerald-800/40"
            : "bg-amber-950/40 border border-amber-800/40"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${
              funded ? "bg-emerald-900/60 text-emerald-300" : "bg-amber-900/60 text-amber-300"
            }`}
          >
            {funded ? "\u2713" : "\u21A9"}
          </div>
          <div>
            <h3
              className={`text-xl font-bold tracking-tight ${
                funded ? "text-emerald-300" : "text-amber-300"
              }`}
            >
              {funded ? "Funds Released" : "Supporters Refunded"}
            </h3>
            <p className="mt-0.5 text-sm text-zinc-400">
              {formatUsd(result.usdRaised)}{" "}
              {funded ? "\u2265" : "<"}{" "}
              {formatUsd(result.goalUsd)}
              {funded
                ? " — goal met, funds released to creator"
                : " — goal not met, ADA returned to supporters"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MathRow({
  step,
  label,
  value,
}: {
  step: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 text-xs text-zinc-500">
          {step}
        </span>
        <span className="text-sm text-zinc-400">{label}</span>
      </div>
      <span className="text-sm font-medium text-zinc-200">{value}</span>
    </div>
  );
}
