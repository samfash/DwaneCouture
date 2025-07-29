"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";
import { useAuth } from "@/src/lib/hooks/useAuth";
import Link from "next/link";

type Order = {
  id: string | number;
  order_status: string;
  product_name?: string;
  product_id?: string | number;
  quantity: number;
  delivery_address: string;
  total_price: number;
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      try {
        const res = await fetcher("/api/orders", "GET");
        if (Array.isArray(res)) {
          setOrders(res);
        } else {
          setOrders([]);
          setError("Failed to fetch orders: unexpected response format.");
        }
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
  }, [user?.id]);

  if (loading) return <p className="text-center py-10">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600">You have not placed any orders yet.</p>
          <p className="text-gray-500 text-sm">
            Orders appear here after you check out items from the products page.
          </p>
          <Link
            href="/products"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.order_status}</p>
              <p><strong>Product:</strong> {order.product_name || order.product_id}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Delivery:</strong> {order.delivery_address}</p>
              <p><strong>Total:</strong> ${order.total_price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
