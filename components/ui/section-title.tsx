interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-zinc-100">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-zinc-400 max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}
