"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type ProductFormValues = {
  name: string;
  description: string;
  price: string; // dollars
  compareAtPrice: string; // dollars
  category: string;
  stock: string;
  imageUrl: string;
  comingSoon: boolean;
  featured: boolean;
  published: boolean;
};

const EMPTY: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  compareAtPrice: "",
  category: "",
  stock: "0",
  imageUrl: "",
  comingSoon: false,
  featured: false,
  published: true,
};

export default function ProductForm({
  mode,
  productId,
  initial,
}: {
  mode: "create" | "edit";
  productId?: string;
  initial?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<ProductFormValues>({
    ...EMPTY,
    ...initial,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    setUploading(false);
    if (res.ok && data.url) {
      set("imageUrl", data.url);
    } else {
      setError(data.message ?? "Upload failed.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url =
      mode === "create" ? "/api/products" : `/api/products/${productId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.message ?? "Could not save the product.");
      setSaving(false);
    }
  }

  const field =
    "h-11 w-full rounded-xl border border-forest/15 bg-white px-4 text-forest outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";
  const labelCls = "mb-1.5 block text-sm font-medium text-forest";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      {/* Main column */}
      <div className="space-y-5 lg:col-span-2">
        <div>
          <label className={labelCls} htmlFor="name">
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={field}
            placeholder="e.g. Turmeric (Haldi) Powder"
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            rows={5}
            className={`${field} h-auto py-3`}
            placeholder="What makes this product special?"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="price">
              Price (USD)
            </label>
            <input
              id="price"
              inputMode="decimal"
              value={values.price}
              onChange={(e) => set("price", e.target.value)}
              className={field}
              placeholder="5.99"
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="compareAtPrice">
              Compare-at price
            </label>
            <input
              id="compareAtPrice"
              inputMode="decimal"
              value={values.compareAtPrice}
              onChange={(e) => set("compareAtPrice", e.target.value)}
              className={field}
              placeholder="7.99"
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="category">
              Category
            </label>
            <input
              id="category"
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
              className={field}
              placeholder="Ground Spices"
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              inputMode="numeric"
              value={values.stock}
              onChange={(e) => set("stock", e.target.value)}
              className={field}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Image */}
        <div className="rounded-2xl border border-forest/10 bg-white/70 p-5">
          <span className={labelCls}>Image</span>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-forest/10 bg-ivory-deep">
            {values.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={values.imageUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted">
                No image
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="mt-3 w-full rounded-xl border border-forest/15 py-2.5 text-sm font-medium text-forest transition hover:border-forest/40 disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Upload image"}
          </button>
          <input
            value={values.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            className={`${field} mt-3 text-xs`}
            placeholder="…or paste an image URL"
          />
        </div>

        {/* Visibility */}
        <div className="space-y-4 rounded-2xl border border-forest/10 bg-white/70 p-5">
          <span className={labelCls}>Visibility</span>

          <label className="flex items-center justify-between gap-3 rounded-xl bg-ivory-deep/40 px-4 py-3">
            <span>
              <span className="block text-sm font-medium text-forest">
                Coming Soon
              </span>
              <span className="block text-xs text-muted">
                Show with a “Coming Soon” label, not purchasable.
              </span>
            </span>
            <input
              type="checkbox"
              checked={values.comingSoon}
              onChange={(e) => set("comingSoon", e.target.checked)}
              className="h-5 w-5 accent-[#243528]"
            />
          </label>

          <label className="flex items-center justify-between gap-3 px-1">
            <span className="text-sm text-forest">Featured</span>
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-5 w-5 accent-[#243528]"
            />
          </label>

          <label className="flex items-center justify-between gap-3 px-1">
            <span className="text-sm text-forest">Published</span>
            <input
              type="checkbox"
              checked={values.published}
              onChange={(e) => set("published", e.target.checked)}
              className="h-5 w-5 accent-[#243528]"
            />
          </label>
        </div>
      </div>

      {/* Footer actions span full width */}
      <div className="lg:col-span-3">
        {error && (
          <p className="mb-3 rounded-xl bg-[#fbeae6] px-4 py-3 text-sm text-[#a85a4a]">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-full bg-forest px-8 py-3 font-medium text-ivory transition hover:bg-forest-soft disabled:opacity-60"
          >
            {saving
              ? "Saving…"
              : mode === "create"
                ? "Create product"
                : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-full border border-forest/15 px-8 py-3 font-medium text-forest transition hover:border-forest/40"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
