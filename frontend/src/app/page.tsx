"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// import Image from "next/image";

export default function Home() {
  return (
     <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          Tailoring Redefined<br /> for You.
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-8">
          Discover perfectly-fitted fashion, powered by AI and personal craftsmanship.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Get Started
            </span>
          </Link>
          <Link href="/how-it-works">
            <span className="inline-block border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              How It Works
            </span>
          </Link>
        </div>
      </motion.div>

      {/* CTA or Teaser */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-20 text-gray-500 dark:text-gray-400 text-sm"
      >
        <p>Experience precision. Embrace your style. Join the SAMFASH evolution.</p>
      </motion.div>
    </div>
  );
}
