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
          <p className="mt-2 text-lg text-zinc-400">
            Connecting People Through ADA Funding
          </p>
          <p className="mt-6 max-w-2xl text-zinc-500 leading-relaxed">
            Oracle-native crowdfunding on Cardano. Creators set a goal in USD,
            supporters pledge in ADA, and at campaign close a live Charli3
            oracle rate determines whether the goal was met. Funded campaigns
            release to the creator. Missed targets refund backers automatically.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/campaigns/new"
              className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
            >
              Create a Campaign
            </Link>
            <Link
              href="/demo/oracle-proof"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              Oracle Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold text-zinc-100">
            How it works
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <Step
              number="1"
              title="Set a goal in USD"
              description="Creators define their funding target in USD. The amount is fixed regardless of ADA price fluctuations."
            />
            <Step
              number="2"
              title="Back with ADA"
              description="Supporters pledge ADA to campaigns they believe in. Pledges are held until the campaign closes."
            />
            <Step
              number="3"
              title="Oracle settles the outcome"
              description="At close, the Charli3 ADA/USD price determines if pledged ADA meets the USD goal. Release or refund."
            />
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="border-t border-zinc-800 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold text-zinc-100 mb-8">
            Active Campaigns
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
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
