export function formatAda(amount: number): string {
  return `${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })} ADA`;
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(ratio: number): string {
  return `${(ratio * 100).toFixed(1)}%`;
}

export function formatAdaUsd(price: number): string {
  return `$${price.toFixed(4)}`;
}
