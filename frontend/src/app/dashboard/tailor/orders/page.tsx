"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";
import Image from "next/image";

interface Order {
  id: string;
  user_id: string;
  product_id: string;
  delivery_address: string;
  quantity: number;
  order_status: "pending" | "processing" | "completed";
  notes: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
}

interface Profile {
  full_name: string;
  delivery_address: string;
  gender: "male" | "female";
}

interface Measurements {
  [key: string]: number;
}

export default function TailorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [productMap, setProductMap] = useState<Record<string, Product>>({});
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [measurements, setMeasurements] = useState<Record<string, Measurements>>({});

  useEffect(() => {
    const fetchData = async () => {
      const orderRes = (await fetcher("/api/orders", "GET")) as Order[];
      setOrders(orderRes);

      const productRes = await fetcher("/api/products", "GET") as Product[];
      const map: Record<string, Product> = {};
      productRes.forEach(p => map[p.id] = p);
      setProductMap(map);
    };

    fetchData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order["order_status"]) => {
    try {
      await fetcher(`/api/orders/${orderId}`, "PATCH", { order_status: newStatus });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o)));
    } catch (err: unknown) {
      alert("Failed to update order status: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleViewProfile = async (userId: string, orderId: string) => {
    try {
      const res = await fetcher(`/api/profiles`, "GET", { users: { id: userId } }) as { profile: Profile; measurements: Measurements };
      setProfiles((prev) => ({ ...prev, [orderId]: res.profile }));
      setMeasurements((prev) => ({ ...prev, [orderId]: res.measurements }));
    } catch (err: unknown) {
      alert("Failed to load profile: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const product = productMap[order.product_id];
            const profile = profiles[order.id];
            const measurement = measurements[order.id];

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order #{order.id.slice(0, 6)}</p>
                    <p className="text-sm text-gray-500">{order.order_status.toUpperCase()}</p>
                  </div>
                  <select
                    value={order.order_status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order["order_status"])}
                    className="border p-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {product && (
                  <div className="flex gap-4 items-center">
                    <Image src={product.image_url} alt={product.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <p>{product.name}</p>
                      <p>Qty: {order.quantity}</p>
                      <p>Total: ${(order.quantity * product.price).toFixed(2)}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setExpandedOrder(order.id === expandedOrder ? null : order.id);
                    handleViewProfile(order.user_id, order.id);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  {expandedOrder === order.id ? "Hide Details" : "View Customer Details & Measurements"}
                </button>

                {expandedOrder === order.id && profile && (
                  <div className="mt-4 border-t pt-4 space-y-2 text-sm">
                    <p><strong>Name:</strong> {profile.full_name}</p>
                    <p><strong>Gender:</strong> {profile.gender}</p>
                    <p><strong>Delivery Address:</strong> {profile.delivery_address}</p>

                    <div className="mt-2">
                      <p className="font-semibold">Measurements:</p>
                      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mt-1">
                        {measurement &&
                          Object.entries(measurement).map(([key, val]) => (
                            <li key={key}>{key}: {val}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
