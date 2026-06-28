"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-forest/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-display text-gold">
            M
          </span>
          <span className="font-display text-lg text-forest">
            Mekhas <span className="text-muted">/ admin</span>
          </span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/"
            target="_blank"
            className="text-muted transition hover:text-forest"
          >
            View store ↗
          </Link>
          <button
            onClick={logout}
            className="rounded-full border border-forest/15 px-4 py-1.5 text-forest transition hover:border-forest/40"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
