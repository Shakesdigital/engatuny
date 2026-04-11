export const DEFAULT_ADMIN_USERNAME = "Admin";
export const DEFAULT_ADMIN_EMAIL = "admin@engatuny.com";

export function resolveAdminLogin(identifier: string) {
  const normalized = identifier.trim();

  if (normalized.toLowerCase() === DEFAULT_ADMIN_USERNAME.toLowerCase()) {
    return DEFAULT_ADMIN_EMAIL;
  }

  return normalized;
}
