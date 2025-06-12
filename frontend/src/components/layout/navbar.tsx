"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter} from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/src/hooks/useAuth";
import { logout } from "@/src/lib/auth";

const sections = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "How it Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
   const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
   const { user, refetch} = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
   const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkQuery.addEventListener("change", listener);
    return () => darkQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

    // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-2xl backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/10 dark:border-white/20 shadow-lg px-6 py-3 flex justify-between items-center transition-all">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-extrabold text-gray-800 dark:text-white"
      >
        <Link href="/">DwaneCouture</Link>
      </motion.div>

      {/* Navigation Links */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="hidden md:flex gap-6"
      >
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className={clsx(
              "text-sm font-semibold px-4 py-1.5 rounded-full transition-colors",
              pathname === section.href
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            )}
          >
            {section.name}
          </Link>
        ))}
      </motion.div>

      {/* Theme Toggle */}
     <div className="flex gap-3 items-center relative">
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-gray-800 dark:text-gray-100 transition-colors"
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      {/* Auth logic */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm hover:opacity-90 transition">
                {/* <Image
                  src="https://via.placeholder.com/30"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-gray-300"
                /> */}
                <span className="hidden sm:inline">{user.email}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async() => {
                      console.log("User before logout", user);
                      await logout();
                      await refetch();
                      console.log("User after logout", user);
                      router.push("/");} // Redirect to login after logout
                    }
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/register"
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          )}

       {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-full text-gray-800 dark:text-gray-100 hover:bg-black/10 dark:hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 rounded-b-2xl border-t border-gray-300 dark:border-gray-700 mt-2 shadow-md md:hidden"
          >
            <div className="flex flex-col items-center py-4">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "w-full text-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    pathname === section.href &&
                      "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  )}
                >
                  {section.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
