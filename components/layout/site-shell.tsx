import { SiteHeader } from "./site-header";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <SiteHeader />
      <div className="border-b border-amber-900/40 bg-amber-950/30 px-6 py-2 text-center text-xs text-amber-200">
        Prototype demo: campaigns, pledges and outcomes are simulated. No ADA is held, released or refunded. Oracle data may be preprod or mock fallback.
      </div>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-zinc-800 py-10">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            TSUNAGI Funding
          </p>
          <p className="text-xs text-zinc-600">
            Cardano crowdfunding prototype · simulated outcomes
          </p>
        </div>
      </footer>
    </div>
  );
}
