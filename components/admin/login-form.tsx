"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_ADMIN_EMAIL, resolveAdminLogin } from "@/lib/admin-credentials";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "admin"
      ? "This account is not marked as an admin in Supabase."
      : null,
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: resolveAdminLogin(identifier),
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-md p-8">
      <div className="flex flex-col items-center text-center">
        <img src="/engatuny-logo.png" alt="Engatuny logo" className="h-20 w-20 rounded-full object-cover" />
        <h1 className="mt-5 font-heading text-4xl text-brand-900">Engatuny Admin</h1>
      </div>
      <div className="mt-6 space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-charcoal-700">Email address</span>
          <input
            type="text"
            required
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="admin@engatuny.com"
            className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none focus:border-brand-900"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-charcoal-700">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-[1rem] border border-brand-900/10 bg-white px-4 py-3 outline-none focus:border-brand-900"
          />
        </label>
      </div>
      {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}
      <button type="submit" className="btn-primary mt-6 w-full">
        {submitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
