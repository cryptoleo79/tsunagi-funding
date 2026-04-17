interface StatProps {
  label: string;
  value: string;
  sub?: string;
}

export function Stat({ label, value, sub }: StatProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-zinc-100">{value}</p>
      {sub && <p className="mt-0.5 text-sm text-zinc-400">{sub}</p>}
    </div>
  );
}
