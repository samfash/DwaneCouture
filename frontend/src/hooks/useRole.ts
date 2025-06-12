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

export function useRoleChecks() {
  const { user} = useAuth();

  return {
    isAdmin: () => user?.role === "admin",
    isTailor: () => user?.role === "tailor",
    isUser: () => user?.role === "user",
  };
}