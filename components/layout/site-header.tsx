import Link from "next/link";
import { WalletButton } from "@/components/ui/wallet-button";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-zinc-100">
            TSUNAGI
          </span>
          <span className="text-sm text-zinc-500">Funding</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/campaigns/new"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Create
          </Link>
          <Link
            href="/demo/oracle-proof"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Oracle Demo
          </Link>
          <WalletButton />
        </nav>
      </div>
    </header>
  );
}
