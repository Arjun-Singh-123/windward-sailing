"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MoreHorizontal, ChevronRight } from "lucide-react";
import Image from "next/image";
import Theme from "./theme";
import CombinedNavigation from "./combined-header";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

// const navItems = [
//   { label: "Home", path: "/" },
//   { label: "About Us", path: "/about-us" },
//   { label: "Membership Fees", path: "/membership-fees" },
//   { label: "Rental Fees", path: "/rental-fees" },
//   { label: "Boats", path: "/boats" },
//   { label: "Members", path: "/members" },
// ];

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

const Header = () => {
  const pathname = usePathname();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = () => {
    setIsDetailsOpen(false);
  };
  // Close the sheet when the route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);



  
  return (
    <header className="sticky top-0 z-50 lg:relative md:top-auto  ">
      {/* First Row */}
      <div className="bg-[#f0f8ff] text-[#00008b] sm:hidden md:hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center md:py-2">
            <Link
              href="mailto:support@windwardsailingclub.com"
              className="text-sm hover:underline hidden md:block"
            >
              support@windwardsailingclub.com
            </Link>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-2">
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex space-x-2">
                    <Link href="#" aria-label="Facebook">
                      <Facebook
                        size={20}
                        className="text-[#00008b] hover:text-[#4267B2] transition-colors"
                      />
                    </Link>
                    <Link href="#" aria-label="Twitter">
                      <Twitter
                        size={20}
                        className="text-[#00008b] hover:text-[#1DA1F2] transition-colors"
                      />
                    </Link>
                    <Link href="#" aria-label="Instagram">
                      <Instagram
                        size={20}
                        className="text-[#00008b] hover:text-[#E1306C] transition-colors"
                      />
                    </Link>
                    <Link href="#" aria-label="Pinterest">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#00008b] hover:text-[#E60023] transition-colors"
                      >
                        <path d="M8 12a4 4 0 1 0 8 0a4 4 0 0 0-8 0"></path>
                        <path d="M12 2v6"></path>
                        <path d="M12 22v-6"></path>
                        <path d="M6 12H2"></path>
                        <path d="M22 12h-4"></path>
                      </svg>
                    </Link>
                  </div>
                  {/* <Separator
                    orientation="vertical"
                    className="h-6 hidden md:block"
                  /> */}
                  {/* <Button
                    variant="default"
                    size="sm"
                    className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
                  >
                    Login
                  </Button> */}
                </div>
                {/* Social Media Icons */}
                {/* ... your existing social media links ... */}
              </div>
              <Separator
                orientation="vertical"
                className="h-6 hidden md:block"
              />
              <Button
                variant="default"
                size="sm"
                className="bg-[#00bfff] hover:bg-[#0080ff] text-white hidden md:block"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="bg-[#052449] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 z-20">
              <Image
                src="/images/logoo.png"
                alt="Windward Sailing Club"
                className="h-16 w-auto"
                width={277.75}
                height={84.984}
                onClick={() => setIsDetailsOpen(false)}
              />
            </Link>
            <div className="hidden md:hidden lg:flex items-center space-x-6">
              {/* Contact Info Section */}
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6" />
                <div>
                  <div className="text-sm">CALL US</div>
                  <div className="font-bold">(949) 675-9060</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6" />
                <div>
                  <div className="text-sm">HOURS OF OPERATION</div>
                  <div className="font-bold">Monday — Sunday</div>
                  <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <div>
                  <div className="text-sm">COMPANY / LOCATION</div>
                  <div className="font-bold">
                    3300 Via Lido, Windward Beach, CA 92663
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Menu */}

            <div className="md:hidden flex items-center space-x-4">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-transparent"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    <Menu className="h-6 w-6 bg-transparent" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#c5dfff] w-64 p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col">
                    {menuItems.map((item) => (
                      <React.Fragment key={item.name}>
                        {item.categories ? (
                          <Collapsible>
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                              <span
                                className={cn(
                                  "text-lg font-semibold",
                                  isActive(item.href)
                                    ? "text-[#00bfff]"
                                    : "text-black"
                                )}
                              >
                                {item.name}
                              </span>
                              <ChevronRight className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              {item.categories.map((category) => (
                                <Collapsible key={category.name}>
                                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 pl-8 text-left">
                                    <span
                                      className={cn(
                                        "text-base font-medium",
                                        isActive(category.href)
                                          ? "text-[#00bfff]"
                                          : "text-black"
                                      )}
                                    >
                                      {category.name}
                                    </span>
                                    <ChevronRight className="h-4 w-4" />
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    {category.subcategories.map(
                                      (subcategory) => (
                                        <Link
                                          key={subcategory.name}
                                          href={subcategory.href}
                                          onClick={() => setIsSheetOpen(false)}
                                          className={cn(
                                            "block p-4 pl-12 text-sm",
                                            isActive(subcategory.href)
                                              ? "text-[#00bfff]"
                                              : "text-black"
                                          )}
                                        >
                                          {subcategory.name}
                                        </Link>
                                      )
                                    )}
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsSheetOpen(false)}
                            className={cn(
                              "flex items-center justify-between p-4 text-lg font-semibold",
                              isActive(item.href)
                                ? "text-[#00bfff]"
                                : "text-black"
                            )}
                          >
                            {item.name}
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              >
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section for Mobile View */}
      {isDetailsOpen && (
        <div className="md:block lg:hidden bg-[#052449] text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6" />
                <div>
                  <div className="text-sm">CALL US</div>
                  <div className="font-bold">(949) 675-9060</div>
                </div>
              </div>
              <Separator className="bg-white/20" />
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6" />
                <div>
                  <div className="text-sm">HOURS OF OPERATION</div>
                  <div className="font-bold">Monday — Sunday</div>
                  <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
                </div>
              </div>
              <Separator className="bg-white/20" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <div>
                  <div className="text-sm">COMPANY / LOCATION</div>
                  <div className="font-bold">
                    3300 Via Lido, Windward Beach, CA 92663
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDetailsOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-10" // Semi-transparent overlay
          onClick={handleOverlayClick} // Close on click
        />
      )}

      {/* Main Navigation Bar */}

      <CombinedNavigation />
      {/* <nav className="hidden fixed  md:hidden lg:block bg-sky text-[#00008b] py-2 md:sticky md:top-0 md:z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {navItems?.map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  className={`hover:underline   px-3 py-2 rounded font- ${
                    pathname === path ? "bg-[#00bfff] text-white" : ""
                  }`}
                >
                  {label}
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
      {/* <Theme /> */}
    </header>
  );
};

// export default Header;

const Footer: React.FC = () => {
  return (
    <footer
      className="relative py-8 text-white "
      style={{
        position: "relative",
        background:
          "linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(/images/footer-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontSize: "18px",
        padding: "15px 0",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, #00008b, #00008b, transparent)",
          zIndex: -1,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center  "
        style={{
          backgroundImage: 'url("/images/footer-bg.jpg")',
          zIndex: -2,
        }}
      />
      <div
        className="absolute -top-[180px] left-5 lg:left-20 bottom-4 z-[3] w-[14.1875rem] h-[24.625rem] overflow-hidden  hidden   md:hidden 4xl:block   "
        // style={{
        //   width: "227px",
        //   height: "394px",
        //   overflow: "hidden",
        //   display: "none",
        // }}
      >
        <Image
          src="/images/footer-boat.png"
          alt="Footer decoration"
          className="object-cover w-full h-full  "
          height={227}
          width={394}
        />
      </div>
      <div className="container mx-auto px-4 relative lg:left-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4  ">
                <Image
                  src="/images/logoo.png"
                  alt="Windward Sailing Club"
                  className="h-[85px] w-auto"
                  width={277.75}
                  height={84.984}
                />
              </Link>
            </div>
            <h3 className="text-xl font-bold mb-4">WINDWARD SAILING CLUB</h3>
            <p>3300 Via Lido, Windward Beach, CA 92663</p>
            <p className="mt-4">
              <strong>Service Area:</strong>
              <br />
              Windward Beach, California, and the Surrounding Areas
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Home",
              "About Us",
              "Membership Fees",
              "Rental Fees",
              "Boats",
              "Basic Sailing Certificate",
              "Advanced Sailing",
              "Coastal Navigation",
              "Privacy Policy",
              "Terms of Conditions",
            ]?.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:underline"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <Separator className="my-8 bg-white/20" />
        <div className="text-center">
          <p>Copyright © 2023 Windward Sailing Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export { Header, Footer };

// old mobile header

// <div className="md:block lg:hidden flex items-center space-x-4">
// <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//   <SheetTrigger asChild>
//     <Button
//       variant="ghost"
//       size="icon"
//       className="bg-transparent"
//       onClick={() => setIsDetailsOpen(false)}
//     >
//       <Menu className="h-6 w-6 bg-transparent" />
//     </Button>
//   </SheetTrigger>
//   <SheetContent side="left" className="bg-[#c5dfff] w-64">
//     <SheetHeader className="flex items-center justify-between">
//       <SheetTitle>Menu</SheetTitle>
//        <SheetClose asChild>
//         <Button variant="ghost" size="icon">
//           <X className="h-6 w-6" />
//         </Button>
//       </SheetClose>
//     </SheetHeader>
//     <nav className="flex flex-col space-y-4 mt-4">
//       {navItems?.map(({ label, path }) => (
//         <Link
//           key={label}
//           href={path}
//           onClick={() => {
//             setIsSheetOpen(false);
//           }}
//           className={`flex items-center justify-between py-2 px-4 ${
//             pathname === path ? "text-[#00bfff]" : "text-black"
//           }`}
//         >
//           {label}
//           <ChevronRight className="h-4 w-4 " />
//         </Link>
//       ))}
//     </nav>
//   </SheetContent>
// </Sheet>
// <Button
//   variant="ghost"
//   size="icon"
//   onClick={() => setIsDetailsOpen(!isDetailsOpen)}
// >
//   <MoreHorizontal className="h-6 w-6 " />
// </Button>
// </div>
