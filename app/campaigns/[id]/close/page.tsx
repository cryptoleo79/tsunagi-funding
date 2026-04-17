import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SettlementProof } from "@/components/campaign/settlement-proof";
import { SettlementResultBanner } from "@/components/campaign/settlement-result";
import { getDemoCampaign } from "@/lib/domain/demo-data";
import { fetchAdaUsdPrice } from "@/lib/oracle/client";
import { buildSettlementInput } from "@/lib/oracle/settlement";
import { resolveCampaignSettlement } from "@/lib/domain/settlement";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CloseCampaignPage({ params }: Props) {
  const { id } = await params;
  const campaign = getDemoCampaign(id);

  if (!campaign) {
    notFound();
  }

  const oracle = await fetchAdaUsdPrice();
  const input = buildSettlementInput(
    campaign.goalUsd,
    campaign.pledgedAda,
    oracle.price,
  );
  const result = resolveCampaignSettlement(input);

  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href={`/campaigns/${campaign.id}`}
          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          &larr; Back to campaign
        </Link>

        <h1 className="mt-6 text-2xl font-semibold text-zinc-100">
          {campaign.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Settlement determined by the live Charli3 ADA/USD oracle on
          Cardano preprod.
        </p>

        <div className="mt-8 space-y-6">
          <SettlementResultBanner result={result} />
          <SettlementProof
            result={result}
            oracleStatus={oracle.status}
            fallbackReason={oracle.fallbackReason}
          />
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-4">
            <p className="text-xs text-zinc-500 leading-relaxed">
              Campaign display values are estimated for readability. Final
              settlement is determined at close using the live Charli3 oracle.
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
