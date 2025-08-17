export function isEmptyString(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

export function isValidURL(str: string | null | undefined): boolean {
  if (!str) return false;
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
export function formatPrice(
  priceCents: number,
  currency: string = "USD"
): string {
  return (priceCents / 100)
    .toLocaleString("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/[^0-9.,]/g, "");
}
