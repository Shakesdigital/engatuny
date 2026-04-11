import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,is_admin")
    .eq("id", user.id)
    .maybeSingle();

  return { supabase, user, profile };
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session.user) {
    redirect("/admin/login");
  }

  if (!session.profile?.is_admin) {
    redirect("/admin/login?error=admin");
  }

  return session;
}
