"use client";
import {
  ChevronDown,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  PinIcon as Pinterest,
  Settings,
  Twitter,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Pinterest, href: "#", label: "Pinterest" },
];

interface SocialLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

export default function SocialLinks() {
  return (
    <div className="flex gap-4 mb-6">
      {socialLinks?.map((social, index) => (
        <div
          key={index}
          className="transform transition duration-300 ease-in-out hover:scale-110"
        >
          <Link
            href={social.href}
            className="flex items-center justify-center w-10 h-10 rounded-full 
                       bg-white text-gray-700 
                       hover:bg-[#232323] hover:text-white 
                       transition-all duration-300"
            aria-label={social.label}
          >
            <social.icon className="h-5 w-5" />
          </Link>
        </div>
      ))}
    </div>
  );
}

// const SocialLinks = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredId, setHoveredId] = useState<number | null>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   return (
//     <div className="flex gap-4 mb-6">
//       {socialLinks?.map((social, index) => (
//         <motion.div
//           key={index}
//           initial={{ scale: 1 }}
//           animate={{ scale: hoveredId === index ? 1.1 : 1 }}
//           exit={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 500, damping: 30 }}
//         >
//           <Link
//             key={index}
//             href={social.href}
//             onMouseEnter={() => setHoveredId(index)}
//             onMouseLeave={() => setHoveredId(null)}
//             //   className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group"
//             className={`
//             flex items-center justify-center w-10 h-10 rounded-full
//             transition-all duration-300
//             ${
//               hoveredId === index
//                 ? "bg-[#232323] text-white"
//                 : "bg-white text-gray-700"
//             }
//           `}
//             aria-label={social.label}
//           >
//             <social.icon className="h-5 w-5  " />
//           </Link>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default SocialLinks;
