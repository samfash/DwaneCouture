"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { useEffect } from "react";

const menuItems = [
  { label: "Profile", href: "/dashboard/user/profile" },
  { label: "Orders", href: "/dashboard/user/orders" },
  { label: "Cart", href: "/dashboard/user/cart" },
  { label: "Notifications", href: "/dashboard/user/notification" },
];

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, error } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== "user")) {
      window.location.href = "/";
    }
  }, [user, loading]);

  if (loading) return <p className="text-center py-10">Loading dashboard...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">User Dashboard</h2>
        <nav className="space-y-2">
          {menuItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2 rounded-md transition text-sm font-medium ${
                pathname === href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">{children}</main>
    </div>
  );
}
