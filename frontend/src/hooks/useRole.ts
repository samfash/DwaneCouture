import { useAuth } from "./useAuth";

/**
 * Returns true if the user has one of the allowed roles.
 * Use in UI, routes, or component guards.
 */
export function useRole(allowedRoles: ("admin" | "tailor" | "user")[]) {
  const { user, loading } = useAuth();

  if (loading || !user) return false;

  return allowedRoles.includes(user.role);
}
