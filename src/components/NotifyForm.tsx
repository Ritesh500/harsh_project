"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list. We'll be in touch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="reveal-fade mx-auto max-w-md rounded-2xl border border-sage/40 bg-white/60 px-6 py-5 text-center backdrop-blur-sm"
      >
        <p className="font-display text-2xl text-forest">Welcome to the table.</p>
        <p className="mt-1 text-sm text-muted">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email"
          aria-invalid={status === "error"}
          className="h-13 flex-1 rounded-full border border-forest/15 bg-white/70 px-6 py-3 text-forest placeholder:text-muted/70 outline-none backdrop-blur-sm transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative h-13 overflow-hidden rounded-full bg-forest px-7 py-3 font-medium text-ivory transition hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="relative z-10">
            {status === "loading" ? "Joining…" : "Notify Me"}
          </span>
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-center text-sm text-[#a85a4a]">
          {message}
        </p>
      )}
      <p className="mt-3 text-center text-xs text-muted/80">
        Be the first to know. No spam, ever.
      </p>
    </form>
  );
}
