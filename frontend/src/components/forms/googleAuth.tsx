import React from "react";
import Image from "next/image";

export default function GoogleForm() {
  const handleGoogleSignIn = () => {
    // This hits your backend /auth/google
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="space-y-4 mt-6">

      <div className="flex flex-col items-center justify-center">
        <span className="mx-2 text-gray-500">OR</span>
      </div>

      <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="w-5 h-5 mr-2" />
        Sign in with Google
      </button>
      </div>
    </div>
  );
}
