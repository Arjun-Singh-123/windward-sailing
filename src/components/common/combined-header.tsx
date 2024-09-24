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
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Membership Fees", href: "/membership-fees" },
  { name: "Rental Fees", href: "/rental-fees" },
  {
    name: "Boats",
    href: "/boats",
    categories: [
      {
        name: "Sedan",
        href: "/boats/sedan",
        subcategories: [
          { name: "Compact", href: "/boats/sedan" },
          { name: "Mid-size", href: "/boats/sedan" },
          { name: "Full-size", href: "/boats/sedan" },
        ],
      },
      {
        name: "SUV",
        href: "/boats/suv",
        subcategories: [
          { name: "Compact", href: "/boats/suv" },
          { name: "Mid-size", href: "/boats/suv" },
          { name: "Full-size", href: "/boats/suv" },
        ],
      },
      {
        name: "Sports Car",
        href: "/boats/sports",
        subcategories: [
          { name: "Coupe", href: "/boats/spor" },
          { name: "Convertible", href: "/boats/sports" },
          { name: "Supercar", href: "/boats/sports" },
        ],
      },
    ],
  },
  { name: "About Us", href: "/about-us" },
  { name: "Members", href: "/members" },
];

export default function CombinedNavigation() {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<any>(null);

  useEffect(() => {
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
      {/* Main Navigation Bar */}
      {/* <nav className="hidden lg:block bg-sky-100 text-[#00008b] py-2 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "hover:underline px-3 py-2 rounded font-semibold",
                    isActive(item.href) ? "bg-[#00bfff] text-white" : ""
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button
              variant="default"
              className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
            >
              BOOKING NOW
            </Button>
          </div>
        </div>
      </nav> */}

      <nav className="hidden lg:block bg-sky-100 text-[#00008b] py-2 sticky top-0 z-50   px-4  ">
        <ul className="flex justify-center space-x-8">
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              {item.categories ? (
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

          <div className="flex justify-end">
            <Button
              variant="default"
              className="bg-[#00bfff] hover:bg-[#0080ff] text-white  "
            >
              BOOKING NOW
            </Button>
          </div>
        </ul>
      </nav>

      {/* Sticky Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 sm:hidden hidden md:block lg:block",
          isSticky ? "bg-[#c5dfff] shadow-md" : "bg-transparent"
        )}
      >
        {isSticky && (
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex justify-center space-x-8">
              {menuItems.map((item) => (
                <li
                  key={item?.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item?.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
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
                      {hoveredItem === item?.name && (
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
                      )}
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

// "use client"

// import React, { useState } from 'react'
// import { usePathname } from 'next/navigation'
// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { ChevronRight, Menu, MoreHorizontal } from 'lucide-react'
// import { cn } from "@/lib/utils"

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
//         href: "/boats/sedan",
//         subcategories: [
//           { name: "Compact", href: "/boats/sedan/compact" },
//           { name: "Mid-size", href: "/boats/sedan/mid-size" },
//           { name: "Full-size", href: "/boats/sedan/full-size" },
//         ],
//       },
//       {
//         name: "SUV",
//         href: "/boats/suv",
//         subcategories: [
//           { name: "Compact", href: "/boats/suv/compact" },
//           { name: "Mid-size", href: "/boats/suv/mid-size" },
//           { name: "Full-size", href: "/boats/suv/full-size" },
//         ],
//       },
//       {
//         name: "Sports Car",
//         href: "/boats/sports",
//         subcategories: [
//           { name: "Coupe", href: "/boats/sports/coupe" },
//           { name: "Convertible", href: "/boats/sports/convertible" },
//           { name: "Supercar", href: "/boats/sports/supercar" },
//         ],
//       },
//     ],
//   },
//   { name: "About Us", href: "/about-us" },
//   { name: "Members", href: "/members" },
// ]

// export default function MobileMenu() {
//   const [isSheetOpen, setIsSheetOpen] = useState(false)
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false)
//   const pathname = usePathname()

//   const isActive = (href: string) => {
//     return pathname === href || pathname.startsWith(`${href}/`)
//   }

//   return (
//     <div className="md:hidden flex items-center space-x-4">
//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         <SheetTrigger asChild>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="bg-transparent"
//             onClick={() => setIsDetailsOpen(false)}
//           >
//             <Menu className="h-6 w-6 bg-transparent" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="bg-[#c5dfff] w-64 p-0">
//           <SheetHeader className="p-4 border-b">
//             <SheetTitle>Menu</SheetTitle>
//           </SheetHeader>
//           <nav className="flex flex-col">
//             {menuItems.map((item) => (
//               <React.Fragment key={item.name}>
//                 {item.categories ? (
//                   <Collapsible>
//                     <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
//                       <span className={cn(
//                         "text-lg font-semibold",
//                         isActive(item.href) ? "text-[#00bfff]" : "text-black"
//                       )}>
//                         {item.name}
//                       </span>
//                       <ChevronRight className="h-4 w-4" />
//                     </CollapsibleTrigger>
//                     <CollapsibleContent>
//                       {item.categories.map((category) => (
//                         <Collapsible key={category.name}>
//                           <CollapsibleTrigger className="flex items-center justify-between w-full p-4 pl-8 text-left">
//                             <span className={cn(
//                               "text-base font-medium",
//                               isActive(category.href) ? "text-[#00bfff]" : "text-black"
//                             )}>
//                               {category.name}
//                             </span>
//                             <ChevronRight className="h-4 w-4" />
//                           </CollapsibleTrigger>
//                           <CollapsibleContent>
//                             {category.subcategories.map((subcategory) => (
//                               <Link
//                                 key={subcategory.name}
//                                 href={subcategory.href}
//                                 onClick={() => setIsSheetOpen(false)}
//                                 className={cn(
//                                   "block p-4 pl-12 text-sm",
//                                   isActive(subcategory.href) ? "text-[#00bfff]" : "text-black"
//                                 )}
//                               >
//                                 {subcategory.name}
//                               </Link>
//                             ))}
//                           </CollapsibleContent>
//                         </Collapsible>
//                       ))}
//                     </CollapsibleContent>
//                   </Collapsible>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     onClick={() => setIsSheetOpen(false)}
//                     className={cn(
//                       "flex items-center justify-between p-4 text-lg font-semibold",
//                       isActive(item.href) ? "text-[#00bfff]" : "text-black"
//                     )}
//                   >
//                     {item.name}
//                     <ChevronRight className="h-4 w-4" />
//                   </Link>
//                 )}
//               </React.Fragment>
//             ))}
//           </nav>
//         </SheetContent>
//       </Sheet>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => setIsDetailsOpen(!isDetailsOpen)}
//       >
//         <MoreHorizontal className="h-6 w-6" />
//       </Button>
//     </div>
//   )
// }
