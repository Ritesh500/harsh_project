import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-3xl border border-forest/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(36,53,40,0.10)] backdrop-blur">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-display text-xl text-gold">
            y
          </span>
          <h1 className="mt-4 font-display text-2xl text-forest">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted">
            Sign in to manage your products.
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
