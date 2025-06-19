"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";

interface Order {
  id: string;
  order_status: "pending" | "processing" | "completed";
  created_at: string;
  total_price: number;
}

export default function TailorDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetcher("/api/orders", "GET");
        setOrders(res as Order[]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const thisMonthOrders = orders.filter((order) => {
    const created = new Date(order.created_at);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  });

  const statusCount = {
    pending: thisMonthOrders.filter((o) => o.order_status === "pending").length,
    processing: thisMonthOrders.filter((o) => o.order_status === "processing").length,
    completed: thisMonthOrders.filter((o) => o.order_status === "completed").length,
  };

  const totalRevenue = thisMonthOrders.reduce((sum, o) => sum + Number(o.total_price || 0), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, Tailor 👋</h1>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="text-sm text-gray-500">Pending Orders</h3>
            <p className="text-2xl font-semibold">{statusCount.pending}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="text-sm text-gray-500">Processing Orders</h3>
            <p className="text-2xl font-semibold">{statusCount.processing}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="text-sm text-gray-500">Completed Orders</h3>
            <p className="text-2xl font-semibold">{statusCount.completed}</p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="text-sm text-gray-500">Revenue This Month</h3>
            <p className="text-2xl font-semibold">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}

      <p className="text-gray-600 dark:text-gray-400 text-sm">
        This dashboard gives you a quick overview of your tailoring workflow. Navigate to <strong>Orders</strong> to manage requests or <strong>Products</strong> to adjust your catalog.
      </p>
    </div>
  );
}
