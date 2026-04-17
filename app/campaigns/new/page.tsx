import { SiteShell } from "@/components/layout/site-shell";
import { CampaignForm } from "@/components/campaign/campaign-form";

export default function NewCampaignPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-zinc-100">
          Create a Campaign
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Set your funding goal in USD. Backers will pledge in ADA, and the
          oracle determines the outcome at close.
        </p>
        <div className="mt-10">
          <CampaignForm />
        </div>
      </div>
    </SiteShell>
  );
}
