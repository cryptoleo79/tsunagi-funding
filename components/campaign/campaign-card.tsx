import Link from "next/link";
import type { Campaign } from "@/lib/domain/types";
import { calculateUsdRaised, calculateProgress } from "@/lib/domain/campaign";
import { formatAda, formatUsd, formatPercent } from "@/lib/domain/format";
import { daysUntil } from "@/lib/utils/dates";
import { getMockPrice } from "@/lib/oracle/mock";
import { Chip } from "@/components/ui/chip";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const oracle = getMockPrice();
  const usdRaised = calculateUsdRaised(campaign.pledgedAda, oracle.price);
  const progress = calculateProgress(campaign.goalUsd, usdRaised);
  const remaining = daysUntil(campaign.closesAt);

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="group flex flex-col rounded-xl border border-zinc-700/50 bg-zinc-900 p-6 transition-all hover:border-zinc-600/50 hover:bg-zinc-900/90"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-zinc-50 leading-snug group-hover:text-white">
            {campaign.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            by {campaign.creatorName}
          </p>
        </div>
        <Chip
          label={campaign.status === "active" ? "Active" : "Closed"}
          variant={campaign.status === "active" ? "success" : "default"}
        />
      </div>

      <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-2">
        {campaign.description}
      </p>

      <div className="mt-auto pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-200">
            {formatUsd(usdRaised)} <span className="text-zinc-500">of {formatUsd(campaign.goalUsd)}</span>
          </span>
          <span className="text-zinc-400">{formatPercent(progress)}</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${Math.min(progress * 100, 100).toFixed(1)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
          <span>{formatAda(campaign.pledgedAda)} pledged</span>
          <span>
            {remaining > 0 ? `${remaining} days left` : "Campaign ended"}
          </span>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          {campaign.supporterCount} supporters
        </p>
      </div>
    </Link>
  );
}
