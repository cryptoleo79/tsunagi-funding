interface StatProps {
  label: string;
  value: string;
  sub?: string;
}

export function Stat({ label, value, sub }: StatProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
    </div>
  );
}
