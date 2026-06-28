import { prisma } from "@/lib/prisma";
import { dollarsToCents, slugify } from "@/lib/format";

export type ProductInput = {
  name: string;
  description: string;
  priceCents: number;
  compareAtCents: number | null;
  imageUrl: string | null;
  category: string | null;
  stock: number;
  comingSoon: boolean;
  featured: boolean;
  published: boolean;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function asBool(v: unknown): boolean {
  return v === true || v === "true" || v === "on" || v === 1;
}

function asInt(v: unknown): number {
  const n = typeof v === "number" ? v : parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/**
 * Validate and normalize a raw product payload. Returns either field errors or
 * the cleaned data ready for Prisma.
 */
export function parseProductInput(body: unknown):
  | { ok: false; errors: string[] }
  | { ok: true; data: ProductInput } {
  const b = (body ?? {}) as Record<string, unknown>;
  const errors: string[] = [];

  const name = asString(b.name);
  if (!name) errors.push("Name is required.");

  const priceCents = dollarsToCents(
    typeof b.price === "string" || typeof b.price === "number"
      ? b.price
      : 0
  );
  if (priceCents <= 0 && !asBool(b.comingSoon)) {
    errors.push("Price must be greater than zero.");
  }

  const compareRaw = b.compareAtPrice;
  const compareAtCents =
    compareRaw === "" || compareRaw == null
      ? null
      : dollarsToCents(compareRaw as string | number) || null;

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      description: asString(b.description),
      priceCents,
      compareAtCents,
      imageUrl: asString(b.imageUrl) || null,
      category: asString(b.category) || null,
      stock: asInt(b.stock),
      comingSoon: asBool(b.comingSoon),
      featured: asBool(b.featured),
      published: b.published === undefined ? true : asBool(b.published),
    },
  };
}

/** Generate a slug unique across products (optionally excluding one id). */
export async function uniqueSlug(
  name: string,
  excludeId?: string
): Promise<string> {
  const base = slugify(name) || "product";
  let slug = base;
  let n = 2;
  // Loop until we find a slug not used by a different product.
  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${n++}`;
  }
}
