import type { FundAllocation } from "@/lib/domain/types";

interface UseOfFundsProps {
  allocations: FundAllocation[];
}

export function UseOfFunds({ allocations }: UseOfFundsProps) {
  if (allocations.length === 0) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-white">Use of funds</h2>
      <div className="mt-4 space-y-3">
        {allocations.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-zinc-300">{item.category}</span>
              <span className="text-zinc-200 tabular-nums">{item.percentage}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-zinc-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
