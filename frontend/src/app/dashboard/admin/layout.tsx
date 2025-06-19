"use client";

import Link from "next/link";
import { useRole } from "@/src/hooks/useRole";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const adminLinks = [
  { label: "Dashboard", href: "/dashboard/admin" },
  { label: "Manage Users", href: "/dashboard/admin/users" },
  { label: "Manage Products", href: "/dashboard/admin/products" },
  { label: "Orders", href: "/dashboard/admin/orders" },
  { label: "Notifications", href: "/dashboard/admin/notifications" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

 const isAdmin = useRole(["admin"]);
  useEffect(() => {
  if (!isAdmin) router.push("/");
  }, [isAdmin, router]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            {link.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}
