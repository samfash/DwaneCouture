"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";

interface Notification {
  id: string;
  message: string;
  created_at: string;
}

interface NotificationsAPIResponse {
  notifications: Notification[];
}

interface CreateNotificationResponse {
  notification: Notification;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetcher("/api/notifications", "GET");

        let data: Notification[] = [];

        if (Array.isArray(res)) {
          data = res as Notification[];
        } else if (res && typeof res === "object" && "notifications" in res) {
          data = (res as NotificationsAPIResponse).notifications;
        } else {
          throw new Error("Invalid response format");
        }

        setNotifications(data);
      } catch (err) {
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

  const handleSubmit = async () => {
    try {
      const payload = { title: newTitle, message: newMessage };
      const res = await fetcher("/api/notifications", "POST", payload);

      let newNotification: Notification;

      if (res && typeof res === "object" && "notification" in res) {
        newNotification = (res as CreateNotificationResponse).notification;
      } else {
        newNotification = res as Notification;
      }

      setNotifications((prev) => [newNotification, ...prev]);
      setNewTitle("");
      setNewMessage("");
    } catch (err) {
      alert(
        "Failed to create notification: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetcher(`/api/notifications/${id}`, "DELETE");
      setNotifications((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      alert(
        "Failed to delete notification: " +
          (err instanceof Error ? err.message : "Unknown error")
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
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter notification title"
          className="flex-1 px-4 py-2 border rounded"
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter notification message"
          className="flex-1 px-4 py-2 border rounded"
        />
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
            <li
              key={note.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="mt-2 text-gray-700 dark:text-gray-200">{note.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
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
