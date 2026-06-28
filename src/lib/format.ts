/** Shared formatting + slug helpers. */

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Format a price stored in cents as a currency string, e.g. 2499 -> "$24.99". */
export function formatPrice(cents: number): string {
  return currency.format(cents / 100);
}

/** Parse a user-entered dollar string ("24.99") into integer cents. */
export function dollarsToCents(value: string | number): number {
  const n = typeof value === "number" ? value : parseFloat(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100);
}

/** Build a URL-safe slug from a product name. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
