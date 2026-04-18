import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SettlementProof } from "@/components/campaign/settlement-proof";
import { SettlementResultBanner } from "@/components/campaign/settlement-result";
import { getDemoCampaign, demoCampaigns } from "@/lib/domain/demo-data";
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

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-white">
          {campaign.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          Settlement determined by the live Charli3 ADA/USD oracle on
          Cardano preprod. The outcome below was calculated at the moment
          this page loaded.
        </p>

        <div className="mt-10 space-y-6">
          <SettlementResultBanner
            result={result}
            oracleStatus={oracle.status}
          />
          <SettlementProof
            result={result}
            campaignTitle={campaign.title}
            oracleStatus={oracle.status}
            fallbackReason={oracle.fallbackReason}
          />
        </div>

        {/* Demo navigation */}
        <div className="mt-10 border-t border-zinc-800 pt-8">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
            Try another settlement
          </p>
          <div className="flex flex-wrap gap-3">
            {demoCampaigns
              .filter((c) => c.id !== campaign.id)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/campaigns/${c.id}/close`}
                  className="rounded-lg border border-zinc-700/50 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                >
                  {c.title}
                </Link>
              ))}
            <Link
              href="/demo/oracle-proof"
              className="rounded-lg border border-zinc-700/50 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
            >
              Live Oracle Proof
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
