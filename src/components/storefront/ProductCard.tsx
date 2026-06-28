import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const soldOut = !product.comingSoon && product.stock <= 0;
  const onSale =
    !product.comingSoon &&
    product.compareAtCents != null &&
    product.compareAtCents > product.priceCents;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-forest/8 bg-white/60 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(36,53,40,0.12)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            product.imageUrl ??
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'/>"
          }
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
            product.comingSoon ? "opacity-90" : ""
          }`}
        />

        {/* Status badge */}
        {product.comingSoon ? (
          <span className="absolute left-3 top-3 rounded-full bg-forest/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-ivory backdrop-blur">
            Coming Soon
          </span>
        ) : soldOut ? (
          <span className="absolute left-3 top-3 rounded-full bg-muted/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-ivory">
            Sold Out
          </span>
        ) : onSale ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-ivory">
            Sale
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {product.category && (
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted/80">
            {product.category}
          </span>
        )}
        <h3 className="mt-1 font-display text-xl leading-snug text-forest">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-4">
          {product.comingSoon ? (
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-gold">
              Launching soon
            </span>
          ) : (
            <span className="flex items-baseline gap-2">
              <span className="font-display text-lg text-forest">
                {formatPrice(product.priceCents)}
              </span>
              {onSale && (
                <span className="text-sm text-muted/70 line-through">
                  {formatPrice(product.compareAtCents!)}
                </span>
              )}
            </span>
          )}
          <span className="text-sm text-muted transition group-hover:text-forest">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
