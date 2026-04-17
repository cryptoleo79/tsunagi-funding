interface ChipProps {
  label: string;
  variant?: "default" | "success" | "warning";
}

const variantStyles = {
  default: "border-zinc-700 bg-zinc-800/80 text-zinc-300",
  success: "border-emerald-800/50 bg-emerald-950/40 text-emerald-400",
  warning: "border-amber-800/50 bg-amber-950/40 text-amber-400",
};

export function Chip({ label, variant = "default" }: ChipProps) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
