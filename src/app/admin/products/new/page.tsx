import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/admin"
          className="text-sm text-muted transition hover:text-forest"
        >
          ← Back to products
        </Link>
        <h1 className="mt-3 font-display text-3xl text-forest">New product</h1>
        <p className="mb-8 mt-1 text-sm text-muted">
          Add a product to your catalog. Enable “Coming Soon” to tease it before
          launch.
        </p>
        <ProductForm mode="create" />
      </main>
    </>
  );
}
