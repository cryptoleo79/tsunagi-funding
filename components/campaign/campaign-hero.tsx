import type { Campaign } from "@/lib/domain/types";
import { calculateUsdRaised, calculateProgress } from "@/lib/domain/campaign";
import { formatAda, formatUsd, formatPercent } from "@/lib/domain/format";
import { formatDate, daysUntil } from "@/lib/utils/dates";
import { getMockPrice } from "@/lib/oracle/mock";
import { Stat } from "@/components/ui/stat";
import { Chip } from "@/components/ui/chip";

interface CampaignHeroProps {
  campaign: Campaign;
}

export function CampaignHero({ campaign }: CampaignHeroProps) {
  const oracle = getMockPrice();
  const usdRaised = calculateUsdRaised(campaign.pledgedAda, oracle.price);
  const progress = calculateProgress(campaign.goalUsd, usdRaised);
  const remaining = daysUntil(campaign.closesAt);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Chip
          label={campaign.status === "active" ? "Active" : "Closed"}
          variant={campaign.status === "active" ? "success" : "default"}
        />
        <span className="text-sm text-zinc-500">
          by {campaign.creatorName}
        </span>
      </div>

      <h1 className="text-3xl font-semibold text-zinc-100">
        {campaign.title}
      </h1>

      <p className="mt-4 text-zinc-400 max-w-2xl leading-relaxed">
        {campaign.description}
      </p>

      <div className="mt-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-300">
            {formatUsd(usdRaised)} of {formatUsd(campaign.goalUsd)}
          </span>
          <span className="text-zinc-500">{formatPercent(progress)}</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${Math.min(progress * 100, 100).toFixed(1)}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Stat label="Goal" value={formatUsd(campaign.goalUsd)} />
        <Stat label="Pledged" value={formatAda(campaign.pledgedAda)} />
        <Stat label="Supporters" value={campaign.supporterCount.toString()} />
        <Stat
          label="Closes"
          value={remaining > 0 ? `${remaining} days` : "Ended"}
          sub={formatDate(campaign.closesAt)}
        />
      </div>

      <div className="mt-8 rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          At campaign close, the live Charli3 ADA/USD oracle price on Cardano
          preprod determines the USD equivalent of pledged ADA. If the goal is
          met, funds are released to the creator. Otherwise, supporters are
          refunded.
        </p>
      </div>
    </div>
  );
}
