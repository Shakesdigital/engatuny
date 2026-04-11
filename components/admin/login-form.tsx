"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
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
        email,
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
    <form onSubmit={handleSubmit} className="card p-8">
      <h1 className="font-heading text-4xl text-forest-900">CMS Login</h1>
      <p className="mt-3 text-sm leading-7 text-charcoal-600">
        Sign in with a Supabase user account that has `profiles.is_admin = true`.
      </p>
      <div className="mt-6 space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-charcoal-700">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[1rem] border border-forest-900/10 bg-white px-4 py-3 outline-none focus:border-forest-900"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-charcoal-700">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-[1rem] border border-forest-900/10 bg-white px-4 py-3 outline-none focus:border-forest-900"
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
