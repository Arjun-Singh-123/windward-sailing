"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
// import { fetchNavItems } from "./header";
import NavigationCommonMenu from "../ui/navigation-common-menu";
export const dynamic = "force-dynamic";
// const menuItems = [
//   { name: "Home", href: "/" },
//   { name: "Membership Fees", href: "/membership-fees" },
//   { name: "Rental Fees", href: "/rental-fees" },
//   {
//     name: "Boats",
//     href: "/boats",
//     categories: [
//       {
//         name: "Sedan",
//         href: "/boats ",
//         subcategories: [
//           { name: "Compact", href: "/boats" },
//           { name: "Mid-size", href: "/boats" },
//           { name: "Full-size", href: "/boats" },
//         ],
//       },
//       {
//         name: "SUV",
//         href: "/boats ",
//         subcategories: [
//           { name: "Compact", href: "/boats " },
//           { name: "Mid-size", href: "/boats " },
//           { name: "Full-size", href: "/boats " },
//         ],
//       },
//       {
//         name: "Sports Car",
//         href: "/boats ",
//         subcategories: [
//           { name: "Coupe", href: "/boats " },
//           { name: "Convertible", href: "/boats " },
//           { name: "Supercar", href: "/boats " },
//         ],
//       },
//     ],
//   },
//   { name: "About Us", href: "/about-us" },
//   { name: "Members", href: "/members" },
// ];

export default function CombinedNavigation() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavigationCommonMenu />

      {isSticky && (
        <header
          className={cn(
            "fixed top-0 left-0 right-0 z-50    transition-all duration-300 sm:hidden hidden md:block lg:block",
            isSticky ? "bg-[#c5dfff] shadow-md" : "bg-transparent"
          )}
        >
          <NavigationCommonMenu />
        </header>
      )}
    </>
  );
}
