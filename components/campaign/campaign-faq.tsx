import type { FaqEntry } from "@/lib/domain/types";

interface CampaignFaqProps {
  entries: FaqEntry[];
}

export function CampaignFaq({ entries }: CampaignFaqProps) {
  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-zinc-100">FAQ</h2>
      <div className="mt-4 space-y-5">
        {entries.map((entry, i) => (
          <div key={i}>
            <h3 className="text-sm font-medium text-zinc-200">
              {entry.question}
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
              {entry.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
