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
      className="group block rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-zinc-100 group-hover:text-white">
          {campaign.title}
        </h3>
        <Chip
          label={campaign.status === "active" ? "Active" : "Closed"}
          variant={campaign.status === "active" ? "success" : "default"}
        />
      </div>

      <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
        {campaign.description}
      </p>

      <div className="mt-5">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">
            {formatUsd(usdRaised)} raised of {formatUsd(campaign.goalUsd)}
          </span>
          <span className="text-zinc-500">{formatPercent(progress)}</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${(progress * 100).toFixed(1)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
        <span>{formatAda(campaign.pledgedAda)} pledged</span>
        <span>
          {remaining > 0 ? `${remaining} days left` : "Campaign ended"}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-zinc-600">
        <span>{campaign.supporterCount} supporters</span>
        <span>&middot;</span>
        <span>by {campaign.creatorName}</span>
      </div>
    </Link>
  );
}
