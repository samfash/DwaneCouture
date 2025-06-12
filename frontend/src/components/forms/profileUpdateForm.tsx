"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@/src/lib/api";
import { getProfile } from "@/src/lib/profile";
import { useAuth } from "@/src/hooks/useAuth";

export default function ProfileUpdateForm() {
  const router = useRouter();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);


  const [profile, setProfile] = useState({
    id: "",
    full_name: "",
    gender: "male",
    delivery_address: "",
  });

  const [measurements, setMeasurements] = useState<Record<string, number | undefined>>({});

  useEffect(() => {
    if (!user || authLoading) return;

    const fetchProfile = async () => {
      try {
        const res = await getProfile(user.id) as { profile: typeof profile, measurements?: Record<string, number> };
        setProfile(res.profile);
        setMeasurements(res.measurements || {});
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading]);

  const requiredFields = profile.gender === "male"
    ? ["neck", "chest", "waist", "hips"]
    : ["burst", "waist", "hips", "full_length"];

  const handleMeasurementChange = (key: string, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: parseFloat(value) || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await fetcher(`/api/profiles/${profile.id}`, "PATCH", { profile, measurements });
        setEditing(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
    if (!confirm) return;
    try {
      setLoading(true);
      await fetcher(`/api/profiles/${profile.id}`, "DELETE");
      router.push("/profile/create");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred."); 
        }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;
  if (authError || error) return <div className="text-center py-12 text-red-500">{authError || error}</div>;

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow border dark:border-gray-700">
         <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{editing ? "Edit Profile" : "Your Profile"}</h2>
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="text-sm font-medium text-blue-500 hover:underline"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            value={profile.full_name}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
          <textarea
            value={profile.delivery_address}
            onChange={(e) => setProfile({ ...profile, delivery_address: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Measurements</h3>
          {requiredFields.map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1 capitalize">{field.replace("_", " ")}</label>
              <input
                type="number"
                step="0.01"
                value={measurements[field] ?? ""}
                onChange={(e) => handleMeasurementChange(field, e.target.value)}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {editing && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Update Profile"}
          </button>
        )}

        <button
          type="button"
          onClick={handleDelete}
          className="w-full mt-2 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete Profile
        </button>
      </form>
    </div>
  );
}
