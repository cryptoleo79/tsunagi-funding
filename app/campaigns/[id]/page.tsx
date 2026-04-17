import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CampaignHero } from "@/components/campaign/campaign-hero";
import { PledgePanel } from "@/components/campaign/pledge-panel";
import { getDemoCampaign } from "@/lib/domain/demo-data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CampaignPage({ params }: Props) {
  const { id } = await params;
  const campaign = getDemoCampaign(id);

  if (!campaign) {
    notFound();
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CampaignHero campaign={campaign} />
          </div>
          <div>
            <PledgePanel campaignId={campaign.id} />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
