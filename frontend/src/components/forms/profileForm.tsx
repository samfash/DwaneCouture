"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@/src/lib/api";

export default function ProfileForm() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    full_name: "",
    gender: "male",
    delivery_address: "",
  });

  const [measurements, setMeasurements] = useState<Record<string, number | undefined>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const requiredFields = profile.gender === "male"
    ? ["neck", "chest", "waist", "hips"]
    : ["burst", "waist", "hips", "full_length"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const body = { profile, measurements };
      await fetcher("/api/profiles", "POST", body);
      router.push("/");
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

  const handleMeasurementChange = (key: string, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: parseFloat(value) || undefined }));
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow border dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Create Your Profile</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            value={profile.full_name}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
          <select
            value={profile.gender}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value as "male" | "female" })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
          <textarea
            value={profile.delivery_address}
            onChange={(e) => setProfile({ ...profile, delivery_address: e.target.value })}
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
                required
                onChange={(e) => handleMeasurementChange(field, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
