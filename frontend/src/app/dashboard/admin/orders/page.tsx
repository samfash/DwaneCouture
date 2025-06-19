"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";

interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  delivery_address: string;
  order_status: "pending" | "processing" | "completed" | "cancelled";
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetcher("/api/orders", "GET");
        setOrders(res as Order[]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const cancelOrder = async (id: string) => {
    try {
      await fetcher(`/api/orders/${id}`, "PATCH", { order_status: "cancelled" });
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, order_status: "cancelled" } : order))
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Failed to cancel order: " + err.message);
      } else {
        alert("Failed to cancel order: An unknown error occurred.");
      }
    }
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 text-left">User ID</th>
              <th className="p-2 text-left">Product ID</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Total Price</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b dark:border-gray-700">
                <td className="p-2">{order.user_id}</td>
                <td className="p-2">{order.product_id}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">${order.total_price}</td>
                <td className="p-2 capitalize">{order.order_status}</td>
                <td className="p-2">
                  {order.order_status !== "cancelled" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
