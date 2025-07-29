"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";
import {MetricCard} from "@/src/components/ui/metricCard";

type Metrics = {
  totalUsers?: number;
  totalTailors?: number;
  totalOrders?: number;
  totalRevenue?: number;
};

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const res = await fetcher("/api/admin/metrics", "GET");
        setMetrics(res as Metrics);
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

    fetchDashboardMetrics();
  }, []);

  if (loading) return <p className="text-center py-10">Loading dashboard metrics...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Users" value={metrics.totalUsers || 0} />
        <MetricCard label="Tailors" value={metrics.totalTailors || 0} />
        <MetricCard label="Orders" value={metrics.totalOrders || 0} />
        <MetricCard label="Revenue" value={`$${metrics.totalRevenue || 0}`} />
      </div>
    </div>
  );
}
