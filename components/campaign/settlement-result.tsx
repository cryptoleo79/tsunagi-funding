import type { SettlementResult } from "@/lib/domain/types";
import { formatUsd } from "@/lib/domain/format";

interface SettlementResultBannerProps {
  result: SettlementResult;
}

export function SettlementResultBanner({ result }: SettlementResultBannerProps) {
  const funded = result.outcome === "funded";

  return (
    <div
      className={`rounded-xl border p-6 ${
        funded
          ? "border-emerald-800/50 bg-emerald-950/30"
          : "border-amber-800/50 bg-amber-950/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
            funded ? "bg-emerald-900/50" : "bg-amber-900/50"
          }`}
        >
          {funded ? "\u2713" : "\u21A9"}
        </div>
        <div>
          <h3
            className={`text-lg font-semibold ${
              funded ? "text-emerald-300" : "text-amber-300"
            }`}
          >
            {funded ? "Campaign Funded" : "Campaign Refunded"}
          </h3>
          <p className="text-sm text-zinc-400">
            {funded
              ? `The campaign raised ${formatUsd(result.usdRaised)}, meeting its ${formatUsd(result.goalUsd)} goal. Funds will be released to the creator.`
              : `The campaign raised ${formatUsd(result.usdRaised)}, falling short of the ${formatUsd(result.goalUsd)} goal. Pledges will be returned to backers.`}
          </p>
        </div>
      </div>
    </div>
  );
}
