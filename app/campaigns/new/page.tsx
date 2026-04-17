import { SiteShell } from "@/components/layout/site-shell";
import { CampaignForm } from "@/components/campaign/campaign-form";

export default function NewCampaignPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-zinc-100">
          Create a Campaign
        </h1>
        <p className="mt-2 text-sm text-zinc-500 max-w-md leading-relaxed">
          Set your funding goal in USD. Supporters back your campaign in ADA.
          At close, the live Charli3 ADA/USD oracle determines whether
          the goal was met.
        </p>
        <div className="mt-10">
          <CampaignForm />
        </div>
      </div>
    </SiteShell>
  );
}
