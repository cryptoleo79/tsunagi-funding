import { SiteHeader } from "./site-header";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-zinc-800 py-10">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            TSUNAGI Funding
          </p>
          <p className="text-xs text-zinc-600">
            Oracle-native crowdfunding on Cardano
          </p>
        </div>
      </footer>
    </div>
  );
}
