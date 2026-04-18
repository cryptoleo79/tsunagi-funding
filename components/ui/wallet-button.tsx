"use client";

import { useState } from "react";

export function WalletButton() {
  const [connected, setConnected] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  if (connected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowTooltip((s) => !s)}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs transition-colors hover:border-zinc-600"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-300">addr_test1qp...demo</span>
        </button>
        {showTooltip && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-zinc-700 bg-zinc-900 p-4 shadow-xl z-50">
            <p className="text-xs font-medium text-zinc-200">
              Demo wallet connected
            </p>
            <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
              Transactions are simulated for this demo. No real ADA is moved.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setConnected(true)}
      className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
    >
      Connect Wallet (Demo)
    </button>
  );
}
