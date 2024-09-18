"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Membership Fees", href: "/membership-fees" },
  { name: "Rental Fees", href: "/rental-fees" },
  {
    name: "Boats",
    href: "/cars",
    categories: [
      {
        name: "Sedan",
        href: "/cars/sedan",
        subcategories: [
          { name: "Compact", href: "/cars/sedan/compact" },
          { name: "Mid-size", href: "/cars/sedan/mid-size" },
          { name: "Full-size", href: "/cars/sedan/full-size" },
        ],
      },
      {
        name: "SUV",
        href: "/cars/suv",
        subcategories: [
          { name: "Compact", href: "/cars/suv/compact" },
          { name: "Mid-size", href: "/cars/suv/mid-size" },
          { name: "Full-size", href: "/cars/suv/full-size" },
        ],
      },
      {
        name: "Sports Car",
        href: "/cars/sports",
        subcategories: [
          { name: "Coupe", href: "/cars/sports/coupe" },
          { name: "Convertible", href: "/cars/sports/convertible" },
          { name: "Supercar", href: "/cars/sports/supercar" },
        ],
      },
    ],
  },
  { name: "About Us", href: "/about-us" },
  { name: "members", href: "/members" },
];

export default function StickyHeader() {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    isSticky && (
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isSticky ? "bg-[#c5dfff] shadow-md" : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-center space-x-8">
            {menuItems?.map((item) => (
              <li key={item.name} className="relative">
                {item.categories ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(
                        "text-lg font-semibold transition-colors duration-300 px-3   rounded-md",
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
                              <DropdownMenuItem key={subcategory.name} asChild>
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
      </header>
    )
  );
}

// import React, { useState, useEffect } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";

// const menuItems = [
//   { name: "Home", href: "/" },
//   {
//     name: "Boats",
//     href: "#",
//     categories: [
//       {
//         name: "Sedan",
//         subcategories: ["Compact", "Mid-size", "Full-size"],
//       },
//       {
//         name: "SUV",
//         subcategories: ["Compact", "Mid-size", "Full-size"],
//       },
//       {
//         name: "Sports Car",
//         subcategories: ["Coupe", "Convertible", "Supercar"],
//       },
//     ],
//   },
//   { name: "About Us", href: "/about-us" },
//   { name: "Membership Fees", href: "membership-fees" },
//   { name: "Rental Fees", href: "rental-fees" },
//   { name: "Members", href: "members" },
// ];

// export default function StickyHeader() {
//   const [isSticky, setIsSticky] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         isSticky ? "bg-white shadow-md" : "bg-transparent"
//       )}
//     >
//       {isSticky && (
//         <nav className="container mx-auto px-4 py-4">
//           <ul className="flex justify-center space-x-8">
//             {menuItems?.map((item, index) => (
//               <li key={item.name} className="relative">
//                 {item.categories ? (
//                   <DropdownMenu>
//                     <DropdownMenuTrigger
//                       className={`hover:underline px-3 py-2 rounded ${
//                         pathname === item ? "bg-[#00bfff] text-white" : ""
//                       }`}
//                     >
//                       {item.name}
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                       {item.categories.map((category) => (
//                         <DropdownMenuSub key={category.name}>
//                           <DropdownMenuSubTrigger>
//                             {category.name}
//                           </DropdownMenuSubTrigger>
//                           <DropdownMenuSubContent>
//                             {category.subcategories.map((subcategory) => (
//                               <DropdownMenuItem key={subcategory}>
//                                 {subcategory}
//                               </DropdownMenuItem>
//                             ))}
//                           </DropdownMenuSubContent>
//                         </DropdownMenuSub>
//                       ))}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 ) : (
//                   <a
//                     href={item.href}
//                     className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
//                   >
//                     {item.name}
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// }
