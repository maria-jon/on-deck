export default function toNumberOrEmpty(value: string): number | "" {
  if (value.trim() === "") return "";
  const n = Number(value);
  return Number.isNaN(n) ? "" : n;
}