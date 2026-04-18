import { AdminLoginForm } from "@/components/admin/login-form";
import { getMissingSupabaseEnvVars, isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured();
  const missingAdminVars = getMissingSupabaseEnvVars({ admin: true });

  return (
    <section className="section">
      <div className="layout max-w-xl">
        {configured ? (
          <div className="space-y-6">
            {!missingAdminVars.length ? null : (
              <div className="card border border-amber-300 bg-amber-50 p-6">
                <h2 className="font-heading text-2xl text-brand-900">
                  Admin setup is incomplete
                </h2>
                <p className="mt-3 text-sm leading-7 text-charcoal-700">
                  Login can work, but media uploads and some admin actions require these missing
                  environment variables:
                </p>
                <p className="mt-3 font-mono text-sm text-charcoal-800">
                  {missingAdminVars.join(", ")}
                </p>
              </div>
            )}
            <AdminLoginForm />
          </div>
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
              to activate the admin login. For media uploads in the CMS, also add
              `SUPABASE_SERVICE_ROLE_KEY`.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
