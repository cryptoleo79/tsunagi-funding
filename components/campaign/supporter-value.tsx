interface SupporterValueProps {
  perks: string[];
}

export function SupporterValue({ perks }: SupporterValueProps) {
  if (perks.length === 0) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-white">
        What supporters receive
      </h2>
      <ul className="mt-4 space-y-2.5">
        {perks.map((perk, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-zinc-300">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            {perk}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-zinc-500 leading-relaxed">
        If the campaign does not meet its USD goal at close, supporters are
        refunded automatically using the live oracle price.
      </p>
    </section>
  );
}
