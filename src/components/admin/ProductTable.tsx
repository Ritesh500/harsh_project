"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

function Toggle({
  on,
  label,
  onToggle,
  disabled,
}: {
  on: boolean;
  label: string;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition disabled:opacity-50 ${
        on ? "bg-forest" : "bg-forest/20"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function patch(id: string, data: Record<string, boolean>) {
    setBusyId(id);
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setBusyId(null);
    startTransition(() => router.refresh());
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setBusyId(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setBusyId(null);
    startTransition(() => router.refresh());
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-forest/20 bg-white/50 px-6 py-16 text-center">
        <p className="text-muted">No products yet.</p>
        <Link
          href="/admin/products/new"
          className="mt-4 inline-block rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-ivory transition hover:bg-forest-soft"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white/70">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-forest/10 bg-ivory-deep/40 text-xs uppercase tracking-[0.12em] text-muted">
          <tr>
            <th className="px-5 py-3 font-medium">Product</th>
            <th className="px-3 py-3 font-medium">Price</th>
            <th className="px-3 py-3 font-medium">Stock</th>
            <th className="px-3 py-3 text-center font-medium">Coming&nbsp;Soon</th>
            <th className="px-3 py-3 text-center font-medium">Featured</th>
            <th className="px-3 py-3 text-center font-medium">Published</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/8">
          {products.map((p) => (
            <tr
              key={p.id}
              className={`transition ${
                busyId === p.id && pending ? "opacity-50" : ""
              }`}
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-ivory-deep">
                    {p.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </span>
                  <div>
                    <div className="font-medium text-forest">{p.name}</div>
                    <div className="text-xs text-muted">
                      {p.category ?? "Uncategorized"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-3 text-forest">
                {formatPrice(p.priceCents)}
              </td>
              <td className="px-3 py-3 text-muted">{p.stock}</td>
              <td className="px-3 py-3 text-center">
                <Toggle
                  on={p.comingSoon}
                  label="Toggle coming soon"
                  disabled={busyId === p.id}
                  onToggle={() => patch(p.id, { comingSoon: !p.comingSoon })}
                />
              </td>
              <td className="px-3 py-3 text-center">
                <Toggle
                  on={p.featured}
                  label="Toggle featured"
                  disabled={busyId === p.id}
                  onToggle={() => patch(p.id, { featured: !p.featured })}
                />
              </td>
              <td className="px-3 py-3 text-center">
                <Toggle
                  on={p.published}
                  label="Toggle published"
                  disabled={busyId === p.id}
                  onToggle={() => patch(p.id, { published: !p.published })}
                />
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-forest underline-offset-2 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(p.id, p.name)}
                    disabled={busyId === p.id}
                    className="text-[#a85a4a] hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
