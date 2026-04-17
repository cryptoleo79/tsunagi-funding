interface ChipProps {
  label: string;
  variant?: "default" | "success" | "warning";
}

const variantStyles = {
  default: "bg-zinc-800 text-zinc-300",
  success: "bg-emerald-900/50 text-emerald-400",
  warning: "bg-amber-900/50 text-amber-400",
};

export function Chip({ label, variant = "default" }: ChipProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
