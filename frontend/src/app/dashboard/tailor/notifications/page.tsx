"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetcher } from "@/src/lib/api";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
}

export default function TailorNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const searchParams = useSearchParams();
  const targetUserId = searchParams.get("user_id");

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    // type: "alert" as "alert" | "reminder",
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetcher("/api/notifications", "GET");
        setNotifications((res as { notifications: Notification[] }).notifications);
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

    fetchNotifications();
  }, []);

  const handleCreate = async () => {
     const payload = {
      ...newNotification,
      ...(targetUserId ? { user_id: targetUserId } : {}),
    };
    try {
      const res = await fetcher("/api/notifications", "POST", payload);
      const { notification } = res as { notification: Notification };

      console.log("Notification created:", res);
      setNotifications((prev) => [notification, ...prev]);
      setNewNotification({ title: "", message: "" });
      alert(`Notification sent ${targetUserId ? `to user ${targetUserId}` : 'to yourself'}`);
    } catch (err: unknown) {
      alert(
        "Failed to create notification: " +
          (err instanceof Error ? err.message : "An unknown error occurred.")
      );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tailor Notifications</h1>

      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Create New Notification</h2>
        {targetUserId && (
          <p className="text-sm text-gray-600">
            This notification will be sent to user: <span className="font-mono">{targetUserId}</span>
          </p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            value={newNotification.title}
            onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          {/* <select
            value={newNotification.type}
            onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as "alert" | "reminder" })}
            className="px-4 py-2 border rounded"
          >
            <option value="alert">Alert</option>
            <option value="reminder">Reminder</option>
          </select> */}
          <textarea
            placeholder="Message"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
            className="px-4 py-2 border rounded col-span-full"
          />
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Notification
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note.id}
              className="p-4 border rounded bg-white dark:bg-gray-900 shadow"
            >
              <p className="text-sm text-gray-500">
                {new Date(note.created_at).toLocaleDateString()} 
                {/* | <span className="uppercase">{note.type}</span> */}
              </p>
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p>{note.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
