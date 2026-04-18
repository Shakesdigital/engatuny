import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseServerEnv } from "@/lib/supabase/config";

export async function createSupabaseServerClient() {
  const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabaseServerEnv();

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Ignored in render contexts where cookie writes are not available.
        }
      },
    },
  });
}
