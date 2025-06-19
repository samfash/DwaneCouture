"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";

const navLinks = [
  { href: "/dashboard/tailor", label: "Dashboard" },
  { href: "/dashboard/tailor/products", label: "Products" },
  { href: "/dashboard/tailor/orders", label: "Orders" },
  { href: "/dashboard/tailor/notifications", label: "Notifications" },
];

export default function TailorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white dark:bg-gray-900 shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-6">Tailor Panel</h2>
        <nav className="flex flex-col space-y-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
                pathname === href &&
                  "bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
