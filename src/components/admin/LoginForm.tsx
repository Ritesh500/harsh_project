"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const from = params.get("from") || "/admin";
      router.push(from);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.message ?? "Login failed.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <label
        htmlFor="password"
        className="mb-2 block text-sm font-medium text-forest"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-12 w-full rounded-xl border border-forest/15 bg-white px-4 text-forest outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        placeholder="Enter admin password"
      />
      {error && <p className="mt-2 text-sm text-[#a85a4a]">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 h-12 w-full rounded-xl bg-forest font-medium text-ivory transition hover:bg-forest-soft disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
