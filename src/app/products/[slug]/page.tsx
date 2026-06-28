import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/storefront/SiteHeader";
import SiteFooter from "@/components/storefront/SiteFooter";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160) || undefined,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const soldOut = !product.comingSoon && product.stock <= 0;
  const onSale =
    !product.comingSoon &&
    product.compareAtCents != null &&
    product.compareAtCents > product.priceCents;

  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, #fdfbf7 0%, var(--color-ivory) 60%, var(--color-ivory-deep) 100%)",
        }}
      />
      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <Link
          href="/#shop"
          className="text-sm text-muted transition hover:text-forest"
        >
          ← Back to collection
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl border border-forest/8 bg-ivory-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                product.imageUrl ??
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'/>"
              }
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
            {product.comingSoon && (
              <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-ivory backdrop-blur">
                Coming Soon
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {product.category && (
              <span className="text-xs uppercase tracking-[0.25em] text-gold">
                {product.category}
              </span>
            )}
            <h1 className="mt-3 font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
              {product.name}
            </h1>

            {!product.comingSoon && (
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl text-forest">
                  {formatPrice(product.priceCents)}
                </span>
                {onSale && (
                  <span className="text-lg text-muted/70 line-through">
                    {formatPrice(product.compareAtCents!)}
                  </span>
                )}
              </div>
            )}

            <p className="mt-6 leading-relaxed text-muted">
              {product.description || "Details coming soon."}
            </p>

            <div className="mt-10">
              {product.comingSoon ? (
                <div className="rounded-2xl border border-gold/30 bg-white/50 p-6">
                  <p className="font-display text-2xl text-forest">
                    Launching soon
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    This product isn&apos;t available yet. Join the list and
                    we&apos;ll let you know the moment it drops.
                  </p>
                  <Link
                    href="/#notify"
                    className="mt-4 inline-block rounded-full bg-forest px-7 py-3 font-medium text-ivory transition hover:bg-forest-soft"
                  >
                    Notify me
                  </Link>
                </div>
              ) : soldOut ? (
                <button
                  disabled
                  className="cursor-not-allowed rounded-full bg-muted/40 px-8 py-3.5 font-medium text-ivory"
                >
                  Sold out
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-full bg-forest px-10 py-3.5 font-medium text-ivory transition hover:bg-forest-soft"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
