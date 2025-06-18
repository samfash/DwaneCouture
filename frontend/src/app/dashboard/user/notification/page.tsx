"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { fetchNotifications } from "@/src/lib/notifications";

type Notification = {
  id: string;
  title?: string;
  message: string;
  created_at: string;
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotificationsData = async () => {
      try {
        // Replace this with your actual API call to fetch notifications
        const res = await fetchNotifications();
        console.log("Fetching notifications for user:", res);
        // setNotifications(res || []);
        if (Array.isArray(res.notifications)) {
         setNotifications(res.notifications);
        } else {
         throw new Error("Unexpected response format");
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

    fetchNotificationsData();
  }, [user?.id]);

  if (loading) return <p className="text-center py-10">Loading notifications...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600">You currently have no notifications.</p>
          <p className="text-gray-500 text-sm">Updates about your orders or system messages will appear here.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
            >
              <p className="font-medium text-gray-800 dark:text-white">{note.title || "Notification"}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{note.message}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date(note.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
