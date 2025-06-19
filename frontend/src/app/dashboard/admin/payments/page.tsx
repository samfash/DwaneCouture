"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";

interface Payment {
  id: string;
  user_id: string;
  order_id: string;
  payment_method: string;
  payment_status: "pending" | "paid";
  payment_reference: string;
  amount: number;
  currency: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetcher("/api/payments", "GET");
        setPayments(res as Payment[]);
      } catch (err: unknown) {
        if (err && typeof err === "object" && "message" in err) {
          setError((err as { message: string }).message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetcher("/api/users", "GET");
        const map: Record<string, User> = {};
        (res as User[]).forEach((u) => (map[u.id] = u));
        setUsers(map);
      } catch {
        // soft fail if user info can't be retrieved
      }
    };

    Promise.all([fetchPayments(), fetchUsers()]).finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (order_id: string, method: string, newStatus: string) => {
    try {
      await fetcher(`/api/payments/${order_id}?method=${method}`, "PATCH", {
        payment_status: newStatus,
      });
      setPayments((prev) =>
        prev.map((p) =>
          p.order_id === order_id
            ? { ...p, payment_status: newStatus as Payment["payment_status"] }
            : p
        )
      );
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        alert("Failed to update status: " + (err as { message: string }).message);
      } else {
        alert("Failed to update status: Unknown error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments Overview</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map((pay) => (
            <div
              key={pay.id}
              className="p-4 border rounded shadow bg-white dark:bg-gray-900 space-y-2"
            >
              <p className="text-sm text-gray-500">
                {new Date(pay.created_at).toLocaleDateString()} | {pay.currency.toUpperCase()} {pay.amount}
              </p>
              <p><strong>Customer:</strong> {users[pay.user_id]?.email || "Unknown"}</p>
              <p><strong>Method:</strong> {pay.payment_method}</p>
              <p><strong>Status:</strong> {pay.payment_status.toUpperCase()}</p>
              <p><strong>Reference:</strong> {pay.payment_reference}</p>

              <select
                value={pay.payment_status}
                onChange={(e) => handleStatusUpdate(pay.order_id, pay.payment_method, e.target.value)}
                className="border p-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
