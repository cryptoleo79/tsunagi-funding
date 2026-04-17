let counter = 0;

export function generateId(prefix = "c"): string {
  counter++;
  const ts = Date.now().toString(36);
  const seq = counter.toString(36).padStart(3, "0");
  return `${prefix}-${ts}-${seq}`;
}
