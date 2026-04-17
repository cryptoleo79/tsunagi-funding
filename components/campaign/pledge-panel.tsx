import { formatAdaUsd } from "@/lib/domain/format";
import { fetchAdaUsdPrice } from "@/lib/oracle/client";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";

interface PledgePanelProps {
  campaignId: string;
}

export async function PledgePanel({ campaignId }: PledgePanelProps) {
  const oracle = await fetchAdaUsdPrice();

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Live Oracle Rate
        </h3>
        <Chip
          label={oracle.status === "live" ? "Live" : oracle.status === "fallback" ? "Fallback" : "Mock"}
          variant={oracle.status === "live" ? "success" : "default"}
        />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-zinc-100">
          {formatAdaUsd(oracle.price.price)}
        </span>
        <span className="text-sm text-zinc-500">ADA/USD</span>
      </div>
      <p className="mt-1 text-xs text-zinc-600">
        {oracle.price.source}
      </p>
      {oracle.fallbackReason && (
        <p className="mt-1 text-xs text-amber-500/80">
          Fallback: {oracle.fallbackReason}
        </p>
      )}

      <div className="mt-6 space-y-3">
        <Link
          href={`/campaigns/${campaignId}/close`}
          className="block w-full rounded-lg bg-zinc-100 py-3 text-center text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
        >
          Settle Campaign
        </Link>
        <button
          disabled
          className="w-full rounded-lg border border-zinc-800 py-3 text-sm font-medium text-zinc-600 cursor-not-allowed"
        >
          Pledge ADA (demo mode)
        </button>
      </div>

      <p className="mt-5 text-xs text-zinc-600 leading-relaxed">
        At close, the live Charli3 ADA/USD price determines whether
        pledged ADA meets the campaign goal in USD.
      </p>
    </div>
  );
}
