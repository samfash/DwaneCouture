import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";

export interface AuthUser {
  id: string;
  email: string;
  role: "user" | "admin" | "tailor";
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(): AuthState & { refetch: () => Promise<void> } {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
      try {
        const userData = await fetcher("/auth/me", "GET");
        setUser(userData as AuthUser);
      } catch (err) {
        setUser(null);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetch: fetchUser };
}
