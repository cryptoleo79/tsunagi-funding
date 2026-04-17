import { formatAdaUsd } from "@/lib/domain/format";
import { getMockPrice } from "@/lib/oracle/mock";
import Link from "next/link";

interface PledgePanelProps {
  campaignId: string;
}

export function PledgePanel({ campaignId }: PledgePanelProps) {
  const oracle = getMockPrice();

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Oracle Rate
      </h3>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-zinc-100">
          {formatAdaUsd(oracle.price)}
        </span>
        <span className="text-sm text-zinc-500">ADA/USD</span>
      </div>
      <p className="mt-1 text-xs text-zinc-600">
        Source: {oracle.source}
      </p>

      <div className="mt-6 space-y-3">
        <button
          disabled
          className="w-full rounded-lg bg-zinc-800 py-3 text-sm font-medium text-zinc-500 cursor-not-allowed"
        >
          Pledge ADA (wallet not connected)
        </button>
        <Link
          href={`/campaigns/${campaignId}/close`}
          className="block w-full rounded-lg border border-zinc-700 py-3 text-center text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          Settle Campaign
        </Link>
      </div>

      <p className="mt-4 text-xs text-zinc-600 leading-relaxed">
        Wallet integration is planned. Settlement uses oracle-verified
        ADA/USD pricing to determine whether the campaign goal was met.
      </p>
    </div>
  );
}
