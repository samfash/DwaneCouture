"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";

interface User {
  id: string;
  email: string;
  role: "admin" | "tailor" | "user";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetcher("/api/users", "GET");
        setUsers(res as User[]);
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
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetcher(`/api/users/${id}`, "DELETE");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Failed to delete user: " + err.message);
      } else {
        alert("Failed to delete user: An unknown error occurred.");
      }
    }
  };

  const handleRoleChange = async (id: string, newRole: User["role"]) => {
    try {
      await fetcher(`/api/users/role/${id}`, "PATCH", { role: newRole });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Failed to update role: " + err.message);
      } else {
        alert("Failed to update role: An unknown error occurred.");
      }
    }
  };

  if (loading) return <p className="text-center py-10">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b dark:border-gray-700">
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as User["role"])}
                    className="bg-white dark:bg-gray-800 border px-2 py-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="tailor">Tailor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
