import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import ProductTable from "@/components/admin/ProductTable";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await getAllProducts();
  const stats = {
    total: products.length,
    live: products.filter((p) => p.published && !p.comingSoon).length,
    comingSoon: products.filter((p) => p.comingSoon).length,
    drafts: products.filter((p) => !p.published).length,
  };

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl text-forest">Products</h1>
            <p className="mt-1 text-sm text-muted">
              Manage your catalog and toggle “Coming Soon” per product.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-ivory transition hover:bg-forest-soft"
          >
            + Add product
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total", value: stats.total },
            { label: "Live", value: stats.live },
            { label: "Coming Soon", value: stats.comingSoon },
            { label: "Drafts", value: stats.drafts },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-forest/10 bg-white/70 px-5 py-4"
            >
              <div className="font-display text-3xl text-forest">{s.value}</div>
              <div className="text-xs uppercase tracking-[0.12em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <ProductTable products={products} />
        </div>
      </main>
    </>
  );
}
