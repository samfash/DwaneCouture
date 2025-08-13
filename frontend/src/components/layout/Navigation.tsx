"use client";


import { Button } from "@/src/components/ui/button";
import { Scissors} from "lucide-react";
import { useEffect, useState, useRef  } from "react";
import { Moon, Sun, Menu} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter} from "next/navigation";
import { useAuth } from "@/src/lib/hooks/useAuth";
import { logout } from "@/src/lib/api/api-v2/auth_v2";

const sections = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "How it Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
];

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, refetch} = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

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


  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      await refetch();      router.push("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Please try again.");
    }
  };

  if (!mounted) return null;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
           className="flex items-center gap-2">
            <Scissors className="h-8 w-8 -rotate-90 text-primary" />
            <span className="text-2xl font-playfair font-bold text-primary">
              <Link href="/">DwaneCouture</Link>
            </span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2, duration: 0.5 }}
         className="hidden md:flex items-center gap-8"
       >
         {sections.map((section) => (
           <Link
             key={section.name}
             href={section.href}
             className={clsx(
               "font-inter font-medium py-1.5 rounded-full transition-colors",
               pathname === section.href
                 ? " text-foreground bg-gold dark:bg-gold dark:text-foreground"
                 : "text-foreground dark:text-foreground hover:text-gold dark:hover:text-gold"
             )}
           >
             {section.name}
           </Link>
         ))}
       </motion.div>

          {/* CTA Button */}
          {/* <Button variant="gold" size="lg" className="hidden md:flex">
            Book Consultation
          </Button> */}

          
          {/* Theme Toggle */}
      <div className="flex gap-3 items-center relative">
       <motion.button
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.3, duration: 0.4 }}
         onClick={toggleTheme}
         className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-colors"
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
                     onClick={() => setDropdownOpen(false)}
                     className="block px-4 py-2 text-sm text-primary-light dark:text-primary-lighter hover:bg-popover dark:hover:bg-popover"
                   >
                     Dashboard
                   </Link>
                   <button
                     onClick={()=>{
                       handleLogout();
                       setDropdownOpen(false);}}
                     className="block w-full text-left px-4 py-2 text-sm text-primary-light hover:bg-popover dark:hover:bg-popover"
                   >
                     Logout
                   </button>
                 </div>
               )}
             </div>
           ) : (
             <Link
               href="/auth/login"
               className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm hover:opacity-90 transition"
             >
               Log in
             </Link>
           )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <Scissors className="h-5 w-5" /> : <Menu size={20} />}   
          </Button>
       </div>

       {/* Mobile Menu */}
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="absolute top-full left-0 w-full bg-background dark:bg-background rounded-b-2xl border-t border-background dark:border-background mt-2 shadow-md md:hidden"
           >
             <div className="flex flex-col items-center py-4">
               {sections.map((section) => (
                 <Link
                   key={section.name}
                   href={section.href}
                   onClick={() => setIsOpen(false)}
                   className={clsx(
                     "w-full text-center py-2 px-4 text-primary-light dark:text-sidebar-primary-lighter hover:bg-popover dark:hover:bg-popover",
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;