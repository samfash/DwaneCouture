// "use client";

// import { FaInstagram, FaTwitter, FaSnapchatGhost, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20 text-sm">
//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

//         {/* Brand & Social */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">DwaneCouture</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">
//             Elevating your fashion experience with custom fits, AI-driven suggestions, and seamless service.
//           </p>
//           <div className="flex space-x-4 text-xl text-gray-700 dark:text-gray-300">
//             <Link href="https://instagram.com" aria-label="Instagram"><FaInstagram className="hover:text-pink-500" /></Link>
//             <Link href="https://twitter.com" aria-label="Twitter"><FaTwitter className="hover:text-blue-500" /></Link>
//             <Link href="https://snapchat.com" aria-label="Snapchat"><FaSnapchatGhost className="hover:text-yellow-500" /></Link>
//           </div>
//         </motion.div>

//         {/* Contact Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Contact</h3>
//           <ul className="space-y-2 text-gray-600 dark:text-gray-400">
//             <li className="flex items-center gap-2"><FaPhone className="text-lg" /> +1 234 567 8900</li>
//             <li className="flex items-center gap-2"><FaEnvelope className="text-lg" /> support@DwaneCouture.com</li>
//             <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-lg" /> 123 Fashion Blvd, Lagos, Nigeria</li>
//           </ul>
//         </motion.div>

//         {/* Navigation */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//         >
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Explore</h3>
//           <ul className="space-y-2 text-gray-600 dark:text-gray-400">
//             <li><Link href="/men" className="hover:text-black dark:hover:text-white">Men</Link></li>
//             <li><Link href="/women" className="hover:text-black dark:hover:text-white">Women</Link></li>
//             <li><Link href="/how-it-works" className="hover:text-black dark:hover:text-white">How it Works</Link></li>
//             <li><Link href="/about" className="hover:text-black dark:hover:text-white">About</Link></li>
//             <li><Link href="/contact" className="hover:text-black dark:hover:text-white">Contact</Link></li>
//           </ul>
//         </motion.div>
//       </div>

//       <div className="text-center py-6 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
//         &copy; {new Date().getFullYear()} Dwanecouture. All rights reserved.
//       </div>
//     </footer>
//   );
// }

import { Scissors, Phone, Mail, MapPin} from "lucide-react";
import { FaInstagram, FaTwitter, FaSnapchatGhost } from "react-icons/fa";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scissors className="h-8 w-8 text-gold" />
              <span className="text-2xl font-playfair font-bold">Heritage Tailoring</span>
            </div>
            <p className="text-primary-foreground/80 font-inter leading-relaxed">
              Crafting exceptional garments, home textiles, and curtains with vintage techniques and timeless elegance since 1895.
            </p>
            <div className="flex gap-4">
              <div className="bg-primary-light p-2 rounded-lg hover:bg-gold transition-colors cursor-pointer">
                <Link href="https://snapchat.com" aria-label="Snapchat"><FaSnapchatGhost className="hover:text-yellow-500 h-5 w-5" /></Link>
              </div>
              <div className="bg-primary-light p-2 rounded-lg hover:bg-gold transition-colors cursor-pointer">
                <Link href="https://instagram.com" aria-label="Instagram"><FaInstagram className="hover:text-pink-500 h-5 w-5" /></Link>
              </div>
              <div className="bg-primary-light p-2 rounded-lg hover:bg-gold transition-colors cursor-pointer">
                <Link href="https://twitter.com" aria-label="Twitter"><FaTwitter className="hover:text-blue-500 h-5 w-5" /></Link>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold">Services</h3>
            <div className="space-y-2 font-inter">
              <a href="#" className="block text-primary-foreground/80 hover:text-gold transition-colors">Men&#39;s Bespoke</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-gold transition-colors">Women&#39;s Couture</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-gold transition-colors">Curtains & Drapes</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-gold transition-colors">Expert Alterations</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-gold transition-colors">Wedding Collection</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-gold transition-colors">Express Service</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold">Quick Links</h3>
            <div className="space-y-2 font-inter">
              <a href="#home" className="block text-primary-foreground/80 hover:text-gold transition-colors">Home</a>
              <a href="#services" className="block text-primary-foreground/80 hover:text-gold transition-colors">Services</a>
              <a href="#about" className="block text-primary-foreground/80 hover:text-gold transition-colors">About Us</a>
              <a href="#portfolio" className="block text-primary-foreground/80 hover:text-gold transition-colors">Portfolio</a>
              <a href="#contact" className="block text-primary-foreground/80 hover:text-gold transition-colors">Contact</a>
              <a href="#" className="block text-primary-foreground/80 hover:text-gold transition-colors">Privacy Policy</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold">Contact Info</h3>
            <div className="space-y-3 font-inter">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold mt-0.5" />
                <div className="text-primary-foreground/80">
                  123 Savile Row<br />
                  London, W1S 3PQ
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <span className="text-primary-foreground/80">+44 20 7123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <span className="text-primary-foreground/80">info@elitetailoring.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-light mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 font-inter text-sm">
            © 2024 Heritage Tailoring. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-inter">
            <a href="#" className="text-primary-foreground/60 hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="text-primary-foreground/60 hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary-foreground/60 hover:text-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;