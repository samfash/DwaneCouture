"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/src/lib/api/api-v1/profile";
import { useAuth } from "@/src/lib/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState({
    id: "",
    full_name: "",
    gender: "male",
    delivery_address: "",
  });

  const [measurements, setMeasurements] = useState<Record<string, number | undefined>>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

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
  }, [user?.id]);

  if (loading) return <p className="text-center py-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!profile) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-600">No profile found.</p>
        <a
          href="/profile/create"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Profile
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4">
        <div>
          <p><strong>Full Name:</strong> {profile.full_name}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Address:</strong> {profile.delivery_address}</p>
        </div>

        {measurements && (
          <div className="border-t pt-4">
            <h2 className="font-medium mb-2">Measurements</h2>
            <ul className="list-disc pl-6 text-sm">
              {Object.entries(measurements).slice(2).map(([key, value]) => (
                <li key={key} className="capitalize">
                  {key.replace(/_/g, " ")}: {String(value)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
