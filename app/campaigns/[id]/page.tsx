import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CampaignHero } from "@/components/campaign/campaign-hero";
import { PledgePanel } from "@/components/campaign/pledge-panel";
import { CampaignStory } from "@/components/campaign/campaign-story";
import { CampaignUpdates } from "@/components/campaign/campaign-updates";
import { SupporterMessages } from "@/components/campaign/supporter-messages";
import { UseOfFunds } from "@/components/campaign/use-of-funds";
import { CampaignFaq } from "@/components/campaign/campaign-faq";
import { SupporterValue } from "@/components/campaign/supporter-value";
import { getDemoCampaign } from "@/lib/domain/demo-data";
import { getCampaignContent } from "@/lib/domain/demo-content";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CampaignPage({ params }: Props) {
  const { id } = await params;
  const campaign = getDemoCampaign(id);

  if (!campaign) {
    notFound();
  }

  const content = getCampaignContent(id);

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-12">
            <CampaignHero campaign={campaign} />

            {content && (
              <>
                <div className="border-t border-zinc-800/60" />
                <CampaignStory
                  story={content.story}
                  creatorBio={content.creatorBio}
                  creatorName={campaign.creatorName}
                />

                <div className="border-t border-zinc-800/60" />
                <SupporterValue perks={content.supporterPerks} />

                <div className="border-t border-zinc-800/60" />
                <UseOfFunds allocations={content.useOfFunds} />

                <div className="border-t border-zinc-800/60" />
                <CampaignUpdates updates={content.updates} />

                <div className="border-t border-zinc-800/60" />
                <SupporterMessages messages={content.supporters} />

                <div className="border-t border-zinc-800/60" />
                <CampaignFaq entries={content.faq} />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="lg:sticky lg:top-8">
              <PledgePanel campaignId={campaign.id} />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
