"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { useRoleChecks } from "@/src/hooks/useRole";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, error } = useAuth();
  const { isAdmin, isTailor, isUser } = useRoleChecks();

  useEffect(() => {
    if (loading || !user) return;

    if (isAdmin()) {
      router.push("/dashboard/admin");
    } else if (isTailor()) {
      router.push("/dashboard/tailor");
    } else if (isUser()) {
      router.push("/dashboard/user");
    } else {
      router.push("/"); // fallback
    }
  }, [user, loading, isAdmin, isTailor, isUser, router]);

  if (loading) return <p className="text-center py-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return null;
}
