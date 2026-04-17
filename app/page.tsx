import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { demoCampaigns } from "@/lib/domain/demo-data";

export default function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            TSUNAGI Funding
          </h1>
          <p className="mt-1 text-lg text-zinc-500">
            Connecting People Through ADA Funding
          </p>
          <p className="mt-8 max-w-2xl text-sm text-zinc-400 leading-relaxed sm:text-base">
            Crowdfunding on Cardano where the outcome is decided by a live
            on-chain oracle. Creators set a goal in USD, supporters back it
            in ADA, and at campaign close the Charli3 ADA/USD price determines
            whether funds are released or supporters are refunded.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/campaigns/demo-1"
              className="rounded-lg bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
            >
              View a Campaign
            </Link>
            <Link
              href="/demo/oracle-proof"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
            >
              Live Oracle Proof
            </Link>
            <Link
              href="/campaigns/demo-1/close"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
            >
              Settlement Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800/60 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-semibold text-zinc-100">
            How it works
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Three steps from campaign creation to oracle-based settlement.
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            <Step
              number="1"
              title="Set a goal in USD"
              description="Creators define their funding target in USD. The goal is fixed — it doesn't move with the ADA price."
            />
            <Step
              number="2"
              title="Supporters back in ADA"
              description="Supporters pledge ADA to campaigns they believe in. Pledges are held until the campaign closes."
            />
            <Step
              number="3"
              title="Oracle settles at close"
              description="The live Charli3 ADA/USD oracle determines if the pledged ADA meets the USD goal. Funds are released or supporters are refunded."
            />
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="border-t border-zinc-800/60 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-xl font-semibold text-zinc-100">
              Active Campaigns
            </h2>
            <Link
              href="/campaigns/new"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Create a campaign &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demoCampaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 text-sm font-medium text-zinc-400">
        {number}
      </div>
      <h3 className="mt-4 text-sm font-medium text-zinc-200">{title}</h3>
      <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
