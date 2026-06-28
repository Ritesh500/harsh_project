import Link from "next/link";
import SiteHeader from "@/components/storefront/SiteHeader";
import SiteFooter from "@/components/storefront/SiteFooter";
import ProductCard from "@/components/storefront/ProductCard";
import { getStorefrontProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getStorefrontProducts();
  const available = products.filter((p) => !p.comingSoon);
  const comingSoon = products.filter((p) => p.comingSoon);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, #fdfbf7 0%, var(--color-ivory) 50%, var(--color-ivory-deep) 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <span
          className="orb"
          style={{
            top: "2%",
            left: "-8%",
            width: "38vw",
            height: "38vw",
            background:
              "radial-gradient(circle at 30% 30%, var(--color-sage-soft), transparent 70%)",
          }}
        />
        <span
          className="orb"
          style={{
            top: "30%",
            right: "-10%",
            width: "34vw",
            height: "34vw",
            background:
              "radial-gradient(circle at 60% 40%, var(--color-blush), transparent 70%)",
            animationDelay: "-9s",
          }}
        />
      </div>

      <SiteHeader />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center sm:pt-28">
          <p
            className="reveal text-xs uppercase tracking-[0.4em] text-gold"
            style={{ animationDelay: "0.05s" }}
          >
            Pure · Aromatic · Freshly Ground
          </p>
          <h1
            className="reveal mx-auto mt-6 max-w-4xl font-display text-5xl font-light leading-[1.05] text-forest sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "0.15s" }}
          >
            Spice as a
            <br />
            <span className="gold-text font-medium italic">daily ritual</span>
          </h1>
          <div
            className="divider-line mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden
          />
          <p
            className="reveal mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "0.3s" }}
          >
            Thoughtfully sourced, freshly ground spices that let every dish
            taste its best. Discover the collection — with new blends on the
            way.
          </p>
          <div
            className="reveal mt-10 flex items-center justify-center gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              href="#shop"
              className="rounded-full bg-forest px-8 py-3.5 font-medium text-ivory transition hover:bg-forest-soft"
            >
              Shop the collection
            </Link>
            <Link
              href="#coming-soon"
              className="rounded-full border border-forest/20 px-8 py-3.5 font-medium text-forest transition hover:border-gold hover:text-gold"
            >
              See what&apos;s coming
            </Link>
          </div>
        </section>

        {/* Shop */}
        <section id="shop" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                The Collection
              </p>
              <h2 className="mt-2 font-display text-4xl font-light text-forest">
                Shop now
              </h2>
            </div>
            <span className="text-sm text-muted">{available.length} products</span>
          </div>

          {available.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-forest/15 bg-white/40 px-6 py-16 text-center text-muted">
              The shelves are being stocked. Check the Coming Soon collection
              below.
            </p>
          )}
        </section>

        {/* Coming Soon */}
        {comingSoon.length > 0 && (
          <section
            id="coming-soon"
            className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12"
          >
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                On the horizon
              </p>
              <h2 className="mt-2 font-display text-4xl font-light text-forest">
                Coming Soon
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted">
                A first look at what&apos;s launching next. Join the list to be
                notified the moment they drop.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoon.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
