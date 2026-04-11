import { AdminLoginForm } from "@/components/admin/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <section className="section">
      <div className="layout max-w-xl">
        {configured ? (
          <AdminLoginForm />
        ) : (
          <div className="card p-8 text-center">
            <img
              src="/engatuny-logo.png"
              alt="Engatuny logo"
              className="mx-auto h-20 w-20 rounded-full object-cover"
            />
            <h1 className="mt-5 font-heading text-4xl text-brand-900">Engatuny Admin</h1>
            <p className="mt-4 text-base leading-8 text-charcoal-600">
              Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
              to activate the admin login.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
