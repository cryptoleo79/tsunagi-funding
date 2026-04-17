"use client";

import { useState, useEffect, useCallback } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { SettlementProof } from "@/components/campaign/settlement-proof";
import { SettlementResultBanner } from "@/components/campaign/settlement-result";
import { getMockPriceAt } from "@/lib/oracle/mock";
import { buildSettlementInput } from "@/lib/oracle/settlement";
import { resolveCampaignSettlement } from "@/lib/domain/settlement";
import { formatAdaUsd } from "@/lib/domain/format";
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

const PRESETS = [
  { label: "ADA at $0.68 (goal met)", price: 0.68, ada: 25000, goal: 15000 },
  { label: "ADA at $0.45 (goal missed)", price: 0.45, ada: 25000, goal: 15000 },
  { label: "ADA at $1.20 (large surplus)", price: 1.2, ada: 25000, goal: 15000 },
  { label: "ADA at $0.59 (borderline)", price: 0.59, ada: 25000, goal: 15000 },
];

export default function OracleProofPage() {
  const [priceInput, setPriceInput] = useState("0.68");
  const [adaInput, setAdaInput] = useState("25000");
  const [goalInput, setGoalInput] = useState("15000");
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

  useEffect(() => { fetchLive(); }, [fetchLive]);

  const price = parseFloat(priceInput) || 0;
  const ada = parseFloat(adaInput) || 0;
  const goal = parseFloat(goalInput) || 0;

  const oracle = getMockPriceAt(price);
  const input = buildSettlementInput(goal, ada, oracle);
  const result = resolveCampaignSettlement(input);

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-zinc-100">
          Oracle Settlement Demo
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          Adjust the oracle price, pledged ADA, or goal to see how the
          settlement outcome changes. When live mode is configured, the
          current ADA/USD price is fetched from the Charli3 on-chain feed
          via Kupo.
        </p>

        {/* Live oracle status */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Oracle Status
            </h3>
            <button
              onClick={fetchLive}
              disabled={live.loading}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
            >
              {live.loading ? "Fetching..." : "Refresh"}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-500">Mode</p>
              <p className="mt-0.5 text-sm text-zinc-200">
                {live.status === "live" && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2" />
                )}
                {live.status === "live" ? "Live (Charli3)" : live.status === "fallback" ? "Fallback (mock)" : "Mock (demo)"}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Current Price</p>
              <p className="mt-0.5 text-sm text-zinc-200">
                {live.loading ? "..." : live.price > 0 ? formatAdaUsd(live.price) : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Source</p>
              <p className="mt-0.5 text-sm text-zinc-400 text-xs">
                {live.source || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Last Fetch</p>
              <p className="mt-0.5 text-sm text-zinc-400 text-xs">
                {live.timestamp ? new Date(live.timestamp).toLocaleTimeString() : "—"}
              </p>
            </div>
          </div>

          {live.fallbackReason && (
            <p className="mt-3 text-xs text-amber-500 border-t border-zinc-800 pt-3">
              Fallback reason: {live.fallbackReason}
            </p>
          )}
          {live.error && (
            <p className="mt-3 text-xs text-red-400 border-t border-zinc-800 pt-3">
              API error: {live.error}
            </p>
          )}

          {live.status === "live" && live.price > 0 && (
            <button
              onClick={() => setPriceInput(live.price.toString())}
              className="mt-3 text-xs text-emerald-500 hover:text-emerald-400 transition-colors border-t border-zinc-800 pt-3 block w-full text-left"
            >
              Use live price ({formatAdaUsd(live.price)}) in settlement calculator below
            </button>
          )}
        </div>

        {/* Presets */}
        <div className="mt-8 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setPriceInput(p.price.toString());
                setAdaInput(p.ada.toString());
                setGoalInput(p.goal.toString());
              }}
              className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <InputField
            label="ADA/USD Price"
            value={priceInput}
            onChange={setPriceInput}
            sub={`Settlement rate: ${formatAdaUsd(price)}`}
          />
          <InputField
            label="Pledged ADA"
            value={adaInput}
            onChange={setAdaInput}
          />
          <InputField
            label="Goal (USD)"
            value={goalInput}
            onChange={setGoalInput}
          />
        </div>

        {/* Result */}
        <div className="mt-8 space-y-6">
          <SettlementResultBanner result={result} />
          <SettlementProof result={result} />
        </div>
      </div>
    </SiteShell>
  );
}

function InputField({
  label,
  value,
  onChange,
  sub,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  sub?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        {label}
      </label>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 focus:border-zinc-600 focus:outline-none"
      />
      {sub && <p className="mt-1 text-xs text-zinc-600">{sub}</p>}
    </div>
  );
}
