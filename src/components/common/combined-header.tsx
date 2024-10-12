"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

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

let menuItems: any;
export default function CombinedNavigation() {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<any>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  useEffect(() => {
    menuItems = JSON.parse(localStorage.getItem("key") ?? "");

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    console.log("checking hovered item", hoveredItem);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav className="hidden lg:block bg-sky-100 text-[#00008b] py-2 sticky top-0 z-50 px-4">
        <ul className="flex justify-center space-x-8">
          {menuItems?.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`text-lg font-semibold transition-colors duration-300 px-3 py-2 rounded-md ${
                  isActive(item.href)
                    ? "bg-[#6edcfc] text-black"
                    : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onMouseEnter={() => setActiveItem(item.href)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {item.name}
              </Link>
              {item.categories && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                  {item.categories.map((category) => (
                    <div key={category.name} className="relative group/sub">
                      <span
                        // href={category.href}
                        className={`block px-4 py-2 text-sm ${
                          isActive(category.href)
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-800 hover:bg-blue-50"
                        }`}
                      >
                        {category.name}
                      </span>
                      {category.subcategories && (
                        <div className="absolute left-full top-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 invisible group-hover/sub:visible">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.name}
                              href={category.href}
                              className={`block px-4 py-2 text-sm ${
                                isActive(subcategory.href)
                                  ? "bg-blue-100 text-blue-600"
                                  : "text-gray-800 hover:bg-blue-50"
                              }`}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li>
            <button className="bg-[#00bfff] hover:bg-[#0080ff] text-white px-4 py-2 rounded-md transition-colors duration-300">
              BOOKING NOW
            </button>
          </li>
        </ul>
      </nav>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 sm:hidden hidden md:block lg:block",
          isSticky ? "bg-[#c5dfff] shadow-md" : "bg-transparent"
        )}
      >
        {isSticky && (
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex justify-center space-x-8">
              {menuItems?.map((item) => (
                <li key={item?.name} className="relative">
                  {item?.categories ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={cn(
                          "text-lg font-semibold transition-colors duration-300 px-3 rounded-md",
                          isActive(item.href)
                            ? "bg-[#6edcfc] text-black"
                            : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                        )}
                      >
                        {item.name}
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        {item.categories.map((category) => (
                          <DropdownMenuSub key={category.name}>
                            <DropdownMenuSubTrigger
                              className={cn(
                                isActive(category.href) &&
                                  "bg-blue-100 text-blue-600"
                              )}
                            >
                              {category.name}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {category.subcategories.map((subcategory) => (
                                <DropdownMenuItem
                                  key={subcategory.name}
                                  asChild
                                >
                                  <Link
                                    href={subcategory.href}
                                    className={cn(
                                      "w-full",
                                      isActive(subcategory.href) &&
                                        "bg-blue-100 text-blue-600"
                                    )}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-lg font-semibold transition-colors duration-300 px-3 py-2 rounded-md",
                        isActive(item.href)
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
