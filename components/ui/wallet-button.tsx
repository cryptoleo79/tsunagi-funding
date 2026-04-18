"use client";

import { useState } from "react";

export function WalletButton() {
  const [connected, setConnected] = useState(false);

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-xs text-zinc-400">
          addr_test1qp...demo
        </span>
        <span className="text-xs text-zinc-600">(demo)</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConnected(true)}
      className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
    >
      Connect Wallet (Demo)
    </button>
  );
}
