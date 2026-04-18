"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { formatAda, formatUsd, formatAdaUsd } from "@/lib/domain/format";
import type { OracleStatus } from "@/lib/oracle/types";

interface LiveOracleState {
  price: number;
  source: string;
  timestamp: string;
  status: OracleStatus;
  fallbackReason: string | null;
  loading: boolean;
  error: string | null;
}

export default function OracleProofPage() {
  const [live, setLive] = useState<LiveOracleState>({
    price: 0,
    source: "",
    timestamp: "",
    status: "mock",
    fallbackReason: null,
    loading: true,
    error: null,
  });

  const fetchLive = useCallback(async () => {
    setLive((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch("/api/oracle");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLive({
        price: data.price,
        source: data.source,
        timestamp: data.timestamp,
        status: data.status,
        fallbackReason: data.fallbackReason,
        loading: false,
        error: null,
      });
    } catch (err) {
      setLive((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "fetch failed",
      }));
    }
  }, []);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-white">
            Live Oracle Proof
          </h1>
          <StatusChip status={live.status} loading={live.loading} />
        </div>
        <p className="mt-3 text-sm text-zinc-400 max-w-xl leading-relaxed">
          The live Charli3 ADA/USD oracle on Cardano preprod determines
          whether funds are released to the creator or returned to
          supporters at campaign close.
        </p>

        {/* Oracle price card */}
        <div className="mt-10 rounded-xl border border-zinc-700/50 bg-zinc-900 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Current Oracle Price
            </h3>
            <button
              onClick={fetchLive}
              disabled={live.loading}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50"
            >
              {live.loading ? "Fetching..." : "Refresh"}
            </button>
          </div>

          {live.loading ? (
            <p className="text-sm text-zinc-400">Fetching live price...</p>
          ) : (
            <div className="space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-white tabular-nums">
                  {live.price > 0 ? formatAdaUsd(live.price) : "—"}
                </span>
                <span className="text-sm text-zinc-400">ADA/USD</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <Row label="Mode" value={live.status === "live" ? "Live" : live.status === "fallback" ? "Fallback" : "Mock"} />
                <Row label="Feed" value="ADA/USD" />
                <Row label="Source" value={live.source || "—"} />
                <Row
                  label="Raw Integer"
                  value={live.price > 0 ? Math.round(live.price * 1e6).toString() : "—"}
                  mono
                />
                <Row
                  label="Precision"
                  value={live.status === "live" ? "1e6" : "—"}
                  mono
                />
                <Row
                  label="Timestamp"
                  value={live.timestamp ? new Date(live.timestamp).toLocaleString() : "—"}
                />
              </div>
            </div>
          )}

          {live.error && (
            <p className="mt-4 text-xs text-red-400">
              Error: {live.error}
            </p>
          )}

          <p className="mt-6 text-xs text-zinc-500 leading-relaxed border-t border-zinc-800 pt-5">
            This price is the settlement authority — not a display widget.
            At campaign close it determines whether funds are released or
            supporters are refunded.
          </p>
        </div>

        {/* Outcome examples */}
        <h2 className="mt-16 text-lg font-semibold text-white">
          Settlement Outcomes
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Same campaign, different ADA/USD rates — two possible outcomes.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <OutcomeCard
            outcome="funded"
            oraclePrice={0.68}
            pledgedAda={25000}
            goalUsd={15000}
          />
          <OutcomeCard
            outcome="refund"
            oraclePrice={0.45}
            pledgedAda={25000}
            goalUsd={15000}
          />
        </div>

        {/* Try live settlements */}
        <div className="mt-16 border-t border-zinc-800 pt-8">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
            See it in action
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/campaigns/demo-1/close"
              className="rounded-lg border border-zinc-700/50 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Funded Settlement
            </Link>
            <Link
              href="/campaigns/demo-2/close"
              className="rounded-lg border border-zinc-700/50 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Refund Settlement
            </Link>
          </div>
        </div>

        {/* Technical details */}
        <details className="mt-16 group">
          <summary className="cursor-pointer text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors">
            Technical Details
          </summary>
          <div className="mt-4 rounded-xl border border-zinc-700/50 bg-zinc-900/60 p-5">
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <Row label="Datum Format" value="Plutus CBOR (ODV)" mono />
              <Row label="Network" value="Cardano preprod" mono />
              <Row label="Indexer" value="Kupo REST API" mono />
              <Row label="Oracle Provider" value="Charli3" mono />
            </div>
            {live.fallbackReason && (
              <p className="mt-4 text-xs text-amber-400 border-t border-zinc-800 pt-3">
                Fallback reason: {live.fallbackReason}
              </p>
            )}
          </div>
        </details>
      </div>
    </SiteShell>
  );
}

function StatusChip({
  status,
  loading,
}: {
  status: OracleStatus;
  loading: boolean;
}) {
  if (loading) {
    return (
      <span className="inline-flex items-center rounded-full border border-zinc-600 px-2.5 py-0.5 text-xs text-zinc-400">
        Loading
      </span>
    );
  }
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/50 bg-emerald-950/40 px-2.5 py-0.5 text-xs text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live
      </span>
    );
  }
  if (status === "fallback") {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-700/50 bg-amber-950/40 px-2.5 py-0.5 text-xs text-amber-400">
        Fallback
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-600 px-2.5 py-0.5 text-xs text-zinc-400">
      Mock
    </span>
  );
}

function OutcomeCard({
  outcome,
  oraclePrice,
  pledgedAda,
  goalUsd,
}: {
  outcome: "funded" | "refund";
  oraclePrice: number;
  pledgedAda: number;
  goalUsd: number;
}) {
  const usdRaised = pledgedAda * oraclePrice;
  const funded = outcome === "funded";

  return (
    <div
      className={`rounded-xl border p-5 ${
        funded
          ? "border-emerald-800/40 bg-emerald-950/30"
          : "border-amber-800/40 bg-amber-950/30"
      }`}
    >
      <h3
        className={`text-sm font-semibold ${
          funded ? "text-emerald-300" : "text-amber-300"
        }`}
      >
        {funded ? "Funds Released" : "Supporters Refunded"}
      </h3>
      <p className="mt-1 text-xs text-zinc-400">
        {funded
          ? "Goal met — ADA released to creator"
          : "Goal not met — ADA returned to supporters"}
      </p>
      <div className="mt-4 space-y-2 text-sm">
        <Row label="Oracle Price" value={formatAdaUsd(oraclePrice)} />
        <Row label="Backed" value={formatAda(pledgedAda)} />
        <Row label="USD Value" value={formatUsd(usdRaised)} />
        <Row label="Goal" value={formatUsd(goalUsd)} />
        <div className="border-t border-zinc-800 pt-2 flex justify-between">
          <span className="text-zinc-400">Outcome</span>
          <span
            className={`font-medium ${
              funded ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {funded ? "Release" : "Refund"}
          </span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className={`text-zinc-200 ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
