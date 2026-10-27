"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { formatAdaUsd } from "@/lib/domain/format";
import type { OracleStatus } from "@/lib/oracle/types";

interface OracleData {
  price: number;
  source: string;
  timestamp: string;
  status: OracleStatus;
  fallbackReason: string | null;
}

interface OracleProofClientProps {
  initialData: OracleData;
}

export function OracleProofClient({ initialData }: OracleProofClientProps) {
  const [data, setData] = useState<OracleData>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch("/api/oracle", {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData({
        price: json.price ?? 0,
        source: json.source ?? "",
        timestamp: json.timestamp ?? "",
        status: json.status ?? "mock",
        fallbackReason: json.fallbackReason ?? null,
      });
    } catch (err) {
      clearTimeout(timeout);
      setError(
        err instanceof DOMException && err.name === "AbortError"
          ? "Request timed out"
          : err instanceof Error
            ? err.message
            : "Fetch failed",
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  const isLive = data.status === "live";

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-white">
            Oracle Price Demo
          </h1>
          <LiveChip status={data.status} />
        </div>
        <p className="mt-3 text-sm text-zinc-400 max-w-xl leading-relaxed">
          This page displays a Charli3 ADA/USD preprod lookup when available,
          or a labeled mock fallback. Demo campaign outcomes use the price
          as an input; no ADA is released or refunded.
        </p>

        {/* Oracle price card */}
        <div className="mt-10 rounded-xl border border-zinc-700 bg-zinc-900 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Reported ADA/USD Price
            </h3>
            <button
              onClick={refresh}
              disabled={refreshing}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-semibold text-white tabular-nums tracking-tight">
              {data.price > 0 ? formatAdaUsd(data.price) : "—"}
            </span>
            <span className="text-sm font-medium text-zinc-300">
              ADA/USD{isLive ? " (Live)" : ""}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 text-sm">
            <Row label="Mode" value={isLive ? "Live" : data.status === "fallback" ? "Fallback" : "Mock"} />
            <Row label="Feed" value="ADA/USD" />
            <Row label="Source" value={data.source || "—"} />
            <Row
              label="Timestamp"
              value={data.timestamp ? new Date(data.timestamp).toLocaleString() : "—"}
            />
          </div>

          {error && (
            <div className="mt-6 rounded-lg bg-red-950/30 border border-red-900/30 p-3">
              <p className="text-xs text-red-400">
                Refresh failed: {error}
              </p>
            </div>
          )}

          {data.fallbackReason && (
            <div className="mt-6 rounded-lg bg-amber-950/30 border border-amber-900/30 p-3">
              <p className="text-xs text-amber-400">
                Fallback: {data.fallbackReason}
              </p>
            </div>
          )}

          <p className="mt-6 text-xs text-zinc-500 leading-relaxed border-t border-zinc-800 pt-5">
            This reported price feeds a simulated threshold calculation. The API
            does not return the raw datum and this page is not proof of a
            settlement transaction or transfer.
          </p>
        </div>

        {/* Try demo outcomes */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
            See it in action
          </p>
          <p className="text-sm text-zinc-400 mb-5">
            The linked pages calculate demo outcomes using their own preprod lookup or labeled mock fallback.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/campaigns/demo-1/close"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
            >
              Demo 1 outcome
            </Link>
            <Link
              href="/campaigns/demo-2/close"
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
            >
              Demo 2 outcome
            </Link>
          </div>
        </div>

        {/* Technical details */}
        <details className="mt-12 group">
          <summary className="cursor-pointer text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors">
            Technical Details
          </summary>
          <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-5">
            {isLive ? (
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <Row label="Live-path decoder format" value="Plutus CBOR (ODV)" mono />
                <Row label="Lookup network" value="Cardano preprod" mono />
                <Row label="Lookup indexer" value="Kupo REST API" mono />
                <Row label="Oracle provider" value="Charli3" mono />
              </div>
            ) : (
              <p className="text-sm text-zinc-400">
                This reading is mock data. The preprod lookup, Kupo indexer,
                Charli3 provider and datum decoder did not supply this price.
              </p>
            )}
          </div>
        </details>
      </div>
    </SiteShell>
  );
}

function LiveChip({ status }: { status: OracleStatus }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-700/50 bg-emerald-950/40 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live
      </span>
    );
  }
  if (status === "fallback") {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-700/50 bg-amber-950/40 px-2.5 py-0.5 text-xs font-medium text-amber-400">
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

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between py-0.5">
      <span className="text-zinc-400">{label}</span>
      <span className={`text-zinc-100 ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
