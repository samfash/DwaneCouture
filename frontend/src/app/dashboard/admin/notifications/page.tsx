"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";

interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
  created_at: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [type, setType] = useState<Notification["type"]>("info");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetcher("/api/notifications", "GET");
        setNotifications(res as Notification[]);
      } catch (err: unknown) {
        if (err && typeof err === "object" && "message" in err) {
          setError((err as { message: string }).message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = { message: newMessage, type };
      const res = await fetcher("/api/notifications", "POST", payload);
      setNotifications((prev) => [res as Notification, ...prev]);
      setNewMessage("");
    } catch (err: unknown) {
      alert(
        "Failed to create notification: " +
          (err && typeof err === "object" && "message" in err
            ? (err as { message: string }).message
            : "An unknown error occurred.")
      );
    }
  };

   const handleDelete = async (id: string) => {
    try {
      await fetcher(`/api/notifications/${id}`, "DELETE");
      setNotifications((prev) => prev.filter((note) => note.id !== id));
    } catch (err: unknown) {
      alert(
        "Failed to delete notification: " +
          (err && typeof err === "object" && "message" in err
            ? (err as { message: string }).message
            : "An unknown error occurred.")
      );
    }
  };

  if (loading) return <p className="text-center py-10">Loading notifications...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Notifications</h1>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter notification message"
          className="flex-1 px-4 py-2 border rounded"
        />
        <select value={type} onChange={(e) => setType(e.target.value as Notification["type"])} className="px-2 py-1 rounded border">
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="success">Success</option>
        </select>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li key={note.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                <span className="text-sm font-medium capitalize">{note.type}</span>
                <p className="mt-2 text-gray-700 dark:text-gray-200">{note.message}</p>
                <p className="text-xs text-gray-500">{new Date(note.created_at).toLocaleString()}</p>
              </div>
               <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
