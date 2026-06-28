import { prisma } from "@/lib/prisma";
import type { Product } from "@/generated/prisma";

export type { Product };

/** All published products for the storefront, coming-soon items last. */
export function getStorefrontProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: [{ comingSoon: "asc" }, { createdAt: "desc" }],
  });
}

export function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findFirst({ where: { slug, published: true } });
}

/** Every product, for the admin dashboard. */
export function getAllProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}
