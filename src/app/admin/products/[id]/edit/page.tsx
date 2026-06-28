import Link from "next/link";
import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import ProductForm, {
  type ProductFormValues,
} from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const toDollars = (cents: number | null | undefined) =>
  cents == null ? "" : (cents / 100).toFixed(2);

export default async function EditProductPage({ params }: Params) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const initial: ProductFormValues = {
    name: product.name,
    description: product.description,
    price: toDollars(product.priceCents),
    compareAtPrice: toDollars(product.compareAtCents),
    category: product.category ?? "",
    stock: String(product.stock),
    imageUrl: product.imageUrl ?? "",
    comingSoon: product.comingSoon,
    featured: product.featured,
    published: product.published,
  };

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
        <h1 className="mt-3 font-display text-3xl text-forest">
          Edit product
        </h1>
        <p className="mb-8 mt-1 text-sm text-muted">{product.name}</p>
        <ProductForm mode="edit" productId={product.id} initial={initial} />
      </main>
    </>
  );
}
