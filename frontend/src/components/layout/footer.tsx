"use client";

import { FaInstagram, FaTwitter, FaSnapchatGhost, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand & Social */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">DwaneCouture</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Elevating your fashion experience with custom fits, AI-driven suggestions, and seamless service.
          </p>
          <div className="flex space-x-4 text-xl text-gray-700 dark:text-gray-300">
            <Link href="https://instagram.com" aria-label="Instagram"><FaInstagram className="hover:text-pink-500" /></Link>
            <Link href="https://twitter.com" aria-label="Twitter"><FaTwitter className="hover:text-blue-500" /></Link>
            <Link href="https://snapchat.com" aria-label="Snapchat"><FaSnapchatGhost className="hover:text-yellow-500" /></Link>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2"><FaPhone className="text-lg" /> +1 234 567 8900</li>
            <li className="flex items-center gap-2"><FaEnvelope className="text-lg" /> support@DwaneCouture.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-lg" /> 123 Fashion Blvd, Lagos, Nigeria</li>
          </ul>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Explore</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link href="/men" className="hover:text-black dark:hover:text-white">Men</Link></li>
            <li><Link href="/women" className="hover:text-black dark:hover:text-white">Women</Link></li>
            <li><Link href="/how-it-works" className="hover:text-black dark:hover:text-white">How it Works</Link></li>
            <li><Link href="/about" className="hover:text-black dark:hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-black dark:hover:text-white">Contact</Link></li>
          </ul>
        </motion.div>
      </div>

      <div className="text-center py-6 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Dwanecouture. All rights reserved.
      </div>
    </footer>
  );
}
