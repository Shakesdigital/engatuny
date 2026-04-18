const publicSupabaseEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

const serverSupabaseUrlEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_URL",
] as const;

const serverSupabaseAnonEnvVars = [
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_ANON_KEY",
] as const;

const adminSupabaseKeyEnvVars = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SECRET_KEY",
] as const;

type EnvKey = string;

function readFirstEnv(keys: readonly EnvKey[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return "";
}

function hasAnyEnv(keys: readonly EnvKey[]) {
  return Boolean(readFirstEnv(keys));
}

function formatEnvOptions(keys: readonly EnvKey[]) {
  return keys.join(" or ");
}

export function getSupabaseServerEnv() {
  return {
    url: readFirstEnv(serverSupabaseUrlEnvVars),
    anonKey: readFirstEnv(serverSupabaseAnonEnvVars),
  };
}

export function getSupabaseAdminEnv() {
  return {
    url: readFirstEnv(serverSupabaseUrlEnvVars),
    adminKey: readFirstEnv(adminSupabaseKeyEnvVars),
  };
}

export function getSupabaseAdminEnvRequirementMessage() {
  return [
    formatEnvOptions(serverSupabaseUrlEnvVars),
    formatEnvOptions(adminSupabaseKeyEnvVars),
  ].join("; ");
}

export function isSupabaseConfigured() {
  return publicSupabaseEnvVars.every((key) => Boolean(process.env[key]));
}

export function isSupabaseAdminConfigured() {
  return hasAnyEnv(serverSupabaseUrlEnvVars) && hasAnyEnv(adminSupabaseKeyEnvVars);
}

export function getMissingSupabaseEnvVars(options?: { admin?: boolean }) {
  if (!options?.admin) {
    return publicSupabaseEnvVars.filter((key) => !process.env[key]);
  }

  const missing: string[] = [];

  if (!hasAnyEnv(serverSupabaseUrlEnvVars)) {
    missing.push(formatEnvOptions(serverSupabaseUrlEnvVars));
  }

  if (!hasAnyEnv(adminSupabaseKeyEnvVars)) {
    missing.push(formatEnvOptions(adminSupabaseKeyEnvVars));
  }

  return missing;
}
