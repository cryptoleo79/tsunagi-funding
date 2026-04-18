import type { CampaignUpdate } from "@/lib/domain/types";

interface CampaignUpdatesProps {
  updates: CampaignUpdate[];
}

export function CampaignUpdates({ updates }: CampaignUpdatesProps) {
  if (updates.length === 0) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-zinc-100">
        Updates
        <span className="ml-2 text-xs font-normal text-zinc-600">{updates.length}</span>
      </h2>
      <div className="mt-4 space-y-6">
        {updates.map((update, i) => (
          <div key={i} className="relative pl-5 border-l border-zinc-800">
            <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-zinc-700" />
            <p className="text-xs text-zinc-600">
              {update.date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <h3 className="mt-1 text-sm font-medium text-zinc-200">
              {update.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              {update.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
