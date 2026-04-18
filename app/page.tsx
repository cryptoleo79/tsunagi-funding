import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { demoCampaigns } from "@/lib/domain/demo-data";
import { daysUntil } from "@/lib/utils/dates";
import { calculateUsdRaised, calculateProgress } from "@/lib/domain/campaign";
import { getMockPrice } from "@/lib/oracle/mock";
import { formatUsd, formatAda } from "@/lib/domain/format";

export default function Home() {
  const featured = demoCampaigns[0];
  const closingSoon = [...demoCampaigns]
    .filter((c) => daysUntil(c.closesAt) > 0)
    .sort((a, b) => daysUntil(a.closesAt) - daysUntil(b.closesAt));
  const oracle = getMockPrice();
  const featuredRaised = calculateUsdRaised(featured.pledgedAda, oracle.price);
  const featuredProgress = calculateProgress(featured.goalUsd, featuredRaised);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            TSUNAGI Funding
          </h1>
          <p className="mt-1 text-lg text-zinc-400">
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
              className="rounded-lg border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              Live Oracle Proof
            </Link>
            <Link
              href="/campaigns/demo-1/close"
              className="rounded-lg border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              Settlement Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Campaign */}
      <section className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Featured Campaign
          </h2>
          <Link
            href={`/campaigns/${featured.id}`}
            className="group mt-6 block rounded-xl border border-zinc-700/50 bg-zinc-900 p-6 sm:p-8 transition-all hover:border-zinc-600/50"
          >
            <div className="sm:flex sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-semibold text-white group-hover:text-white sm:text-2xl">
                  {featured.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">by {featured.creatorName}</p>
                <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xl">
                  {featured.description}
                </p>
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-200">
                      {formatUsd(featuredRaised)} raised
                    </span>
                    <span className="text-zinc-400">
                      {(featuredProgress * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${Math.min(featuredProgress * 100, 100).toFixed(1)}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-400">
                  <span>{formatAda(featured.pledgedAda)} pledged</span>
                  <span>{featured.supporterCount} supporters</span>
                  <span>{daysUntil(featured.closesAt)} days left</span>
                </div>
              </div>
              <div className="mt-6 sm:mt-0 sm:text-right shrink-0">
                <p className="text-2xl font-semibold text-white tabular-nums">
                  {formatUsd(featured.goalUsd)}
                </p>
                <p className="text-xs text-zinc-500">goal</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-semibold text-white">
            How it works
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
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

      {/* Why oracle-native crowdfunding */}
      <section className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-semibold text-white">
            Why oracle-native crowdfunding
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400 leading-relaxed">
            ADA fluctuates. A campaign that looks fully funded today might fall
            short tomorrow. Without a trusted on-chain price, neither creators
            nor supporters can agree on the outcome.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Principle
              title="ADA in, USD goal"
              description="Supporters pledge in ADA. Creators set their target in stable USD. The oracle bridges both at settlement."
            />
            <Principle
              title="Live settlement"
              description="At campaign close, the Charli3 ADA/USD price is fetched live from Cardano to determine the outcome."
            />
            <Principle
              title="Fair release or refund"
              description="Goal met? Funds go to the creator. Goal not met? Every supporter gets their ADA back. No ambiguity."
            />
            <Principle
              title="Transparent proof"
              description="Every settlement includes the oracle price, raw datum, source, and timestamp — fully verifiable on-chain."
            />
          </div>
        </div>
      </section>

      {/* Closing Soon */}
      {closingSoon.length > 0 && (
        <section className="border-t border-zinc-800 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Closing Soon
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Back these campaigns before settlement.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {closingSoon.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Campaigns */}
      <section className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-xl font-semibold text-white">
              All Campaigns
            </h2>
            <Link
              href="/campaigns/new"
              className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
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
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-600 text-sm font-medium text-zinc-300">
        {number}
      </div>
      <h3 className="mt-4 text-sm font-medium text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function Principle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-800 p-5">
      <h3 className="text-sm font-medium text-zinc-100">{title}</h3>
      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
