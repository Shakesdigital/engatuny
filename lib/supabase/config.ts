const publicSupabaseEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

const adminSupabaseEnvVars = [...publicSupabaseEnvVars, "SUPABASE_SERVICE_ROLE_KEY"] as const;

export function isSupabaseConfigured() {
  return publicSupabaseEnvVars.every((key) => Boolean(process.env[key]));
}

export function isSupabaseAdminConfigured() {
  return adminSupabaseEnvVars.every((key) => Boolean(process.env[key]));
}

export function getMissingSupabaseEnvVars(options?: { admin?: boolean }) {
  const required = options?.admin ? adminSupabaseEnvVars : publicSupabaseEnvVars;
  return required.filter((key) => !process.env[key]);
}
