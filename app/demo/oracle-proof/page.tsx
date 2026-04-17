"use client";

import { useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { SettlementProof } from "@/components/campaign/settlement-proof";
import { SettlementResultBanner } from "@/components/campaign/settlement-result";
import { getMockPriceAt } from "@/lib/oracle/mock";
import { buildSettlementInput } from "@/lib/oracle/settlement";
import { resolveCampaignSettlement } from "@/lib/domain/settlement";
import { formatAdaUsd } from "@/lib/domain/format";

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
          This page demonstrates the settlement logic. Adjust the oracle
          price, pledged ADA, or goal to see how the outcome changes.
          In production, the price comes from the Charli3 ADA/USD on-chain
          feed at the moment of settlement.
        </p>

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
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <InputField
            label="ADA/USD Price"
            value={priceInput}
            onChange={setPriceInput}
            sub={`Oracle rate: ${formatAdaUsd(price)}`}
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

        {/* Info bar */}
        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 flex items-center gap-4 text-xs text-zinc-500">
          <span>Feed: ADA/USD</span>
          <span className="text-zinc-700">|</span>
          <span>Provider: Charli3 (mock)</span>
          <span className="text-zinc-700">|</span>
          <span>Live integration in progress</span>
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
