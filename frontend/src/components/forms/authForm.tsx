"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup, login } from "@/src/lib/api/api-v2/auth_v2"; // Adjust the import based on your auth functions
import { useAuth } from "@/src/lib/hooks/useAuth";
import GoogleForm from "./googleAuth";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { refetch } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    
    try {
      const endpoint = type === "login" ? login : signup;
      await endpoint({email, password});

      await refetch();

      if (type === "register") {
        router.push("/profile/create"); // Redirect to profile creation
        router.refresh(); // Refresh to ensure user data is updated
      } else {
        router.push("/"); // Redirect to homepage on login
      }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 dark:text-gray-300">Password</span>
          <div className="relative">
          <input
            type={show ? "text":"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
          {show ? "🙈" : "👁️"}
          </button>
          </div>
        </label>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
        >
          {loading ? "Please wait..." : type === "login" ? "Login" : "Register"}
        </button>

        <GoogleForm />

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          {type === "login" ? (
            <>Don’t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></>
          ) : (
            <>Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link></>
          )}
        </p>
      </form>
    </div>
  );
}
