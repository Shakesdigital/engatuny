import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseAdminEnv,
  getSupabaseAdminEnvRequirementMessage,
} from "@/lib/supabase/config";

export function createSupabaseAdminClient() {
  const { url: supabaseUrl, adminKey } = getSupabaseAdminEnv();

  if (!supabaseUrl || !adminKey) {
    throw new Error(
      `Missing Supabase admin environment variables. Expected ${getSupabaseAdminEnvRequirementMessage()}.`,
    );
  }

  return createClient(supabaseUrl, adminKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
