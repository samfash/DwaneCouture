"use client";

import ProfileUpdateForm from "@/src/components/forms/profileUpdateForm";
import { getProfile } from '@/src/lib/profile'; // Example helper to fetch from DB
import { useAuth } from "@/src/hooks/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";

type ProfileType = {
  id: string;
  full_name: string;
  gender: string;
  delivery_address: string;
};

export default function EditProfilePage() {
    const { user, loading: authLoading} = useAuth();
    const [profile, setProfile] = useState<ProfileType | null>(null);
      
     useEffect(() => {
    if (!user || authLoading) return;

    const fetchProfile = async () => {
      try {
        const res = await getProfile(user.id) as { profile?: typeof profile};
        if(res?.profile){
          setProfile(res.profile);
        };
      } catch (error) {
          const errMsg = error instanceof Error ? error.message : "An unexpected error occurred.";
          console.log("Error fetching profile:", errMsg);}
          setProfile(null);
    };

    fetchProfile();
  }, [user, authLoading]);

    if (!profile) {
       return (
      <div className="max-w-lg mx-auto text-center mt-10">
        <h2 className="text-xl font-semibold mb-2">No profile found</h2>
        <p className="mb-4">
          You don&#39;t have a profile yet. Please create one to get started.
        </p>
        <Link
          href="/profile/create"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Profile
        </Link>
      </div>
      );
    }
    
  return (
    <div className="pt-0">
      <ProfileUpdateForm initProf={profile} />
    </div>
  );
}
