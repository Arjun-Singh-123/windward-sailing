"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Clock,
  MapPin,
  Youtube,
  Mail,
  X,
  ChevronsRight,
  MailIcon,
  Globe,
  Settings,
  VoicemailIcon,
  CalendarDays,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MoreHorizontal, ChevronRight } from "lucide-react";
import Image from "next/image";
import CombinedNavigation from "./combined-header";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";
// import { FooterContent } from "../sections/admin-footer";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { contentFont } from "@/app/ui/fonts";
import MobileOverlay from "./mobile-overlay";
import AnimatedButton from "./animated-button";
// import useHeaderStore from "@/store/header-height";
// import MainNav from "../sections/main-nav";
// import TopBar from "../sections/top-nav";
import { clearSession, getSession } from "@/lib/auth";
import { useHeaderState } from "@/hooks/user-header-state";
import { EXCLUDED_LABELS, EXCLUDED_PATHNAMES } from "@/constants";
import { SettingsPanel, SocialMediaItems } from "./footer-contact-items";

export const fetchNavItems = async () => {
  const { data: navItems, error: navItemsError } = await supabase
    .from("nav_items")
    .select(
      `
      id,
      name,
      href,
      status,
      nav_sections (
        id,
        name,
        href,
        status,
        products (
          id,
          name,
          href
        )
      )
    `
    )
    .order("priority", { ascending: true });

  if (navItemsError) {
    throw new Error(navItemsError.message);
  }

  return navItems;
};

export const menuItemss = (items: any) => {
  console.log("item of nav", items);
  return items?.map((category: any) => {
    if (category.is_product_category) {
      return {
        name: category.menu_name,
        href: `/${category.name.toLowerCase()}`,
        categories: [
          {
            name: category.name,
            href: `/${category.name.toLowerCase()}`,
            subcategories: category.subcategories.map((sub: any) => ({
              name: sub.name,
              href: `/${category.name.toLowerCase()}/${sub.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`,
            })),
          },
        ],
      };
    } else {
      return {
        name: category.menu_name,
        href:
          category.name === "Home"
            ? "/"
            : `/${category.name.toLowerCase().replace(/\s+/g, "-")}`,
      };
    }
  });
};

const IconComponent = ({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) => {
  const props = { className: className || "w-10 h-10" };
  switch (icon) {
    case "phone":
      return <Phone {...props} />;
    case "clock":
      return <Clock {...props} />;
    case "map-pin":
      return <MapPin {...props} />;
    case "email":
      return <Mail {...props} />;
    case "facebook":
      return <Facebook {...props} />;
    case "twitter":
      return <Twitter {...props} />;
    case "instagram":
      return <Instagram {...props} />;
    default:
      return null;
  }
};

interface ContactItem {
  id: string;
  icon: string;
  label: string;
  value: any;
  type: string;
  display_order: number;
}

interface ContactHeaderProps {
  contacts: ContactItem[];
  setIsDetailsOpen: (isOpen: boolean) => void;
}

const IconComponent1: React.FC<{ icon: string; className?: string }> = ({
  icon,
  className,
}) => {
  const props = { className: className || "w-10 h-10" };
  const icons = {
    phone: Phone,
    clock: Clock,
    "map-pin": MapPin,
    email: Mail,
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
  };

  const IconElement = icons[icon as keyof typeof icons];
  return IconElement ? <IconElement {...props} /> : null;
};

const formatHours = (hours: { [key: string]: string }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days.map((day) => `${day}: ${hours[day]}`).join("\n");
};

const darkHeaderPaths = [
  "/member-dashboard",
  "/boat-services",
  "/vessel-amenity",
  "/members",
  "/about-us",
  "/rental-fees",
  "/membership-fees",
];

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const headerRef = useRef(null);
  const [session, setSession] = useState(false);

  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data: menuItems } = useQuery({
    queryKey: ["menuitems-data"],
    queryFn: fetchNavItems,
  });

  const { isHidden, isTransparent, isDark } = useHeaderState(pathname);

  useEffect(() => {
    const session = getSession();

    if (session) {
      setSession(session);
    }
  }, []);
  useEffect(() => {
    setIsSettingsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // useEffect(() => {
  //   // Define an async function inside the useEffect
  //   const fetchSession = async () => {
  //     try {
  //       ("use server");
  //       const sessionData = await getSession();
  //       setSession(sessionData);
  //     } catch (error) {
  //       console.error("Error fetching session:", error);
  //     }
  //   };

  //   fetchSession();
  // }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        {
          "-translate-y-full": isHidden,
          "translate-y-0": !isHidden,
          "bg-transparent": isTransparent,
          "bg-[#052449]/90 backdrop-blur-sm": !isTransparent || isDark,
        }
      )}

      // className={cn(
      //   "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ",
      //   hideHeader
      //     ? "-translate-y-full"
      //     : "translate-y-0 bg-[#052449]/90 backdrop-blur-sm",

      //   darkHeaderPaths.includes(pathname) || isScrolled // Dark background for specific routes or scrolled state
      //     ? "bg-[#052449]/90 backdrop-blur-sm"
      //     : pathname === "/" && !isScrolled // Home page and no scroll
      //     ? "bg-transparent" // Transparent on home page
      //     : "bg-[#052449]/90 backdrop-blur-sm" // Fallback
      // )}
    >
      {/* Top Navigation Bar */}
      <div className=" border-b border-white/10">
        <div className="flex items-center justify-between  ">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 pl-8">
              <Image
                src="/images/Logo_black.png"
                alt="Logo"
                width={140}
                height={40}
                className="h-auto w-auto"
              />
            </Link>
            <Separator
              orientation="vertical"
              className="hidden md:block h-20 mx-8 "
            />
          </div>

          {/* <Separator orientation="vertical" /> */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems?.map((item) => (
              <div key={item.id} className="relative group">
                {item.nav_sections.length > 0 ? (
                  <div className="relative">
                    <span className="text-white cursor-pointer py-2 group-hover:border-b-2 border-white transition-all duration-200">
                      {item.name}
                    </span>
                    <div className="absolute top-full left-0 hidden group-hover:block min-w-[200px] bg-white shadow-lg rounded-md p-2 mt-2">
                      {item.nav_sections.map((section) => (
                        <div key={section.id} className="relative group/sub">
                          <Link
                            href={`/boats/${section.href}`}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                          >
                            {section.name}
                          </Link>
                          {section.products && section.products.length > 0 && (
                            <div className="absolute left-full border-t-flatBlue border-4 top-0 mt-0 w-64 bg-[#c5dfff] rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 invisible group-hover/sub:visible">
                              <div className="py-2">
                                {section?.products?.map((product) => (
                                  <Link
                                    key={product.id}
                                    href={`/boats/${section.href}/${product.href}`}
                                    className={cn(
                                      "block px-4 py-2 text-sm whitespace-nowrap w-full",
                                      isActive(
                                        `/boats/${section.href}/${product.href}`
                                      )
                                        ? "bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black w-full"
                                        : "text-gray-800 hover:bg-gradient-to-r hover:from-[#6edcfc] hover:to-[#4facfe] hover:text-black w-full"
                                    )}
                                  >
                                    {product?.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href ?? ""}
                    className={cn(
                      "text-white py-2 border-b-2 border-transparent transition-all duration-200",
                      isActive(item.href)
                        ? "border-white"
                        : "hover:border-white"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center  ">
            <SettingsPanel />

            {/* <div className="lg:hidden flex items-center space-x-4">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="bg-[#052449] w-64 p-0">
                    <SheetHeader className="p-4 border-b border-white/10">
                      <SheetTitle className="text-white">Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
                      <div className="overflow-y-auto flex-1">
                        {menuItems?.map((item) => (
                          <React.Fragment key={item.id}>
                            {item.nav_sections.length > 0 ? (
                              <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                                  <span
                                    className={cn(
                                      "text-lg font-semibold text-white",
                                      isActive(item.href)
                                        ? "border-b-2 border-white"
                                        : ""
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                  <ChevronRight className="h-4 w-4 text-white" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  {item.nav_sections.map((section) => (
                                    <div key={section.id} className="pl-4">
                                      <Link
                                        href={`/boats/${section.href}`}
                                        className="block p-4 text-white/80 hover:text-white hover:bg-white/10"
                                        onClick={() => setIsSheetOpen(false)}
                                      >
                                        {section.name}
                                      </Link>
                                    </div>
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            ) : (
                              <Link
                                href={item.href ?? ""}
                                className={cn(
                                  "flex items-center justify-between p-4 text-lg font-semibold text-white",
                                  isActive(item.href)
                                    ? "border-b-2 border-white"
                                    : ""
                                )}
                                onClick={() => setIsSheetOpen(false)}
                              >
                                {item.name}
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </nav>
                    <div className="p-4">
                      <AnimatedButton
                        href="/trip-planning"
                        className="w-full justify-center"
                      >
                        Booking Now
                      </AnimatedButton>
                    </div>
                  </SheetContent>
                </Sheet>
              </div> */}

            <div className="  lg:hidden flex items-center space-x-4">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-transparent"
                    // onClick={() => setIsDetailsOpen(false)}
                  >
                    <Menu className="h-6 w-6 bg-transparent" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="bg-[#052449] w-64 p-0">
                  <SheetHeader className="p-4 border-b text-black">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
                    <div className="overflow-y-auto flex-1">
                      {menuItems?.map((item) => (
                        <React.Fragment key={item.id}>
                          {item.nav_sections.length > 0 ? (
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
                                {item?.nav_sections?.map((section) => (
                                  <Collapsible key={section.id}>
                                    <CollapsibleTrigger className="flex items-center font-bold justify-between w-full p-4 pl-8 text-left">
                                      <span
                                        className={cn(
                                          "text-base font-bold",
                                          isActive(`/boats/${section.href}`)
                                            ? "text-[#00bfff]"
                                            : "text-black"
                                        )}
                                      >
                                        {section.name}
                                      </span>

                                      <ChevronRight className="h-4 w-4 text-black" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                      <Link
                                        // href={section.href ?? ""}

                                        href={`/boats/${section.href}`}
                                        className="block p-4 pl-12 text-sm font-medium text-black"
                                        onClick={() => setIsSheetOpen(false)}
                                      >
                                        All {section.name}
                                      </Link>
                                      {section?.products?.map((product) => (
                                        <Link
                                          key={product.id}
                                          // href={product.href ?? "#"}
                                          href={`/boats/${section.href}/${product.href}`}
                                          onClick={() => setIsSheetOpen(false)}
                                          className={cn(
                                            "block p-4 pl-12 text-sm  ",
                                            isActive(product.href ?? "")
                                              ? "text-[#00bfff]"
                                              : "text-black"
                                          )}
                                        >
                                          {product.name}
                                        </Link>
                                      ))}
                                    </CollapsibleContent>
                                  </Collapsible>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <Link
                              href={item.href ?? ""}
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
                    </div>
                    <Button className="flex justify-center   items-center w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue hover:opacity-60 rounded-full">
                      Booking Now
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              {/* <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // setIsDetailsOpen(!isDetailsOpen);
                  }}
                >
                  <MoreHorizontal className="h-6 w-6" />
                </Button> */}
            </div>

            {/* <Button className="hidden text-white bg-gray-700 lg:inline-flex bg-white/10   hover:bg-white hover:text-black rounded-none   h-20 border-l   border-white/10">
              <Link
                href="/trip-planning"
                className={cn(
                  "flex items-center justify-between p-4 text-lg font-semibold "
                )}
              >
                Book Now
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button> */}

            <Button className="hidden lg:flex   px-14 rounded-none border-l border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
              <CalendarDays className="h-5 w-5" />
              <Link
                href="/trip-planning"
                className={cn(
                  "flex items-center justify-between p-4 text-lg font-semibold "
                )}
              >
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// const Header = () => {
//   const pathname = usePathname();
//   const [isSticky, setIsSticky] = useState(false);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   // const [product, setProduct] = useState<any[]>(menuItems);
//   const [hoveredId, setHoveredId] = useState<string | null>(null);
//   const headerRef = useRef(null);
//   const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);
//   const { data: menuItems } = useQuery({
//     queryKey: ["menuitems-data"],
//     queryFn: fetchNavItems,
//   });

//   const { data: contacts = [] } = useQuery({
//     queryKey: ["contacts"],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("contacts")
//         .select("*")
//         .order("created_at", { ascending: false });
//       if (error) throw error;
//       return data;
//     },
//   });
//   console.log("menu data", menuItems);

//   const isActive = (href: string) => {
//     return pathname === href || pathname.startsWith(`${href}/`);
//   };

//   const handleOverlayClick = () => {
//     setIsDetailsOpen(false);
//   };
//   useEffect(() => {
//     setIsSheetOpen(false);
//     setIsDetailsOpen(false);
//   }, [pathname]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     // Function to update header height
//     const updateHeaderHeight = () => {
//       if (headerRef.current) {
//         setHeaderHeight(headerRef.current.offsetHeight);
//       }
//     };

//     // Initial height calculation
//     updateHeaderHeight();

//     // Add event listener for window resize
//     window.addEventListener("resize", updateHeaderHeight);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", updateHeaderHeight);
//     };
//   }, []);

//   const IconComponent = ({
//     icon,
//     className,
//   }: {
//     icon: string;
//     className?: string;
//   }) => {
//     const props = { className: className || "w-10 h-10" };
//     switch (icon) {
//       case "phone":
//         return <Phone {...props} />;
//       case "clock":
//         return <Clock {...props} />;
//       case "map-pin":
//         return <MapPin {...props} />;
//       case "email":
//         return <Mail {...props} />;
//       case "facebook":
//         return <Facebook {...props} fill="black" />;
//       case "twitter":
//         return <Twitter {...props} fill="black" />;
//       case "instagram":
//         return <Instagram {...props} />;
//       default:
//         return null;
//     }
//   };
//   const order = ["phone", "hours", "location"];
//   const emailItem = contacts?.find((item) => item.type === "support_email");
//   const socialItems = contacts?.filter((item) => item.type === "social");
//   const loginItem = contacts?.find((item) => item.type === "login");
//   const contactItems = contacts
//     ?.filter((item) => ["phone", "hours", "location"].includes(item.type))
//     .sort((a, b) => a.display_order - b.display_order);

//   return (
//     <header
//       ref={headerRef}
//       className={` ${
//         isSticky && "fixed   w-full"
//       }  top-0 z-50 lg:relative md:top-auto bg-[#c5dfff] shadow-md`}
//     >
//       {/* first row  */}
//       {!isDetailsOpen && (
//         <div className="hidden  lg:block">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="flex justify-between items-center">
//               {emailItem && (
//                 <Link
//                   href={`mailto:${emailItem?.value}`}
//                   className="text-xl hover:underline hidden md:block"
//                 >
//                   <span className="gap-1 flex items-center justify-center">
//                     <IconComponent
//                       icon={emailItem?.icon as string}
//                       className="text-black stroke-white stroke-2"
//                     />
//                     {emailItem.value}
//                   </span>
//                 </Link>
//               )}
//               <div className="hidden md:flex space-x-2">
//                 <div className="flex items-center space-x-4">
//                   <div className=" flex space-x-2">
//                     {socialItems?.map((item) => (
//                       <Link
//                         key={item.id}
//                         href={item.value ?? ""}
//                         aria-label={item.label}
//                         onMouseEnter={() => setHoveredId(item.id as string)}
//                         onMouseLeave={() => setHoveredId(null)}
//                         className={`
//                           p-2
//                           rounded-lg
//                           transition-all
//                           duration-300
//                           ${
//                             hoveredId === item.id
//                               ? "bg-[#232323]"
//                               : "bg-transparent"
//                           }
//                           hover:scale-110
//                         `}
//                       >
//                         <IconComponent
//                           icon={item.icon as string}
//                           className={`
//                             w-6
//                             h-6
//                             transition-colors
//                             duration-300
//                             ${
//                               hoveredId === item.id
//                                 ? "text-white"
//                                 : "text-gray-700"
//                             }
//                           `}
//                         />
//                       </Link>
//                     ))}
//                   </div>

//                   <Separator
//                     orientation="vertical"
//                     className="h-6 hidden md:block"
//                   />
//                   {loginItem && (
//                     <AnimatedButton href={loginItem.value}>
//                       {loginItem.label}
//                     </AnimatedButton>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {!isDetailsOpen && (
//         <div className="bg-[#052449] text-white py-2    ">
//           <div className="container mx-auto px-4 max-w-6xl md:min-h-[8.25rem]">
//             <div className="flex justify-between items-center">
//               <Link href="/" className="flex items-center z-20">
//                 <Image
//                   src="/images/Logo_black.png"
//                   alt="Windward Sailing Club"
//                   className="h-[85px] w-[288px]"
//                   width={377.75}
//                   height={100.984}
//                   onClick={() => setIsDetailsOpen(false)}
//                 />
//               </Link>
//               <div className="hidden     lg:flex flex-col gap-2">
//                 <div className="hidden md:hidden lg:flex items-center space-x-6">
//                   {contactItems?.slice(0, 2).map((item, index) => (
//                     <React.Fragment key={item.id}>
//                       {index > 0 && (
//                         <Separator
//                           orientation="vertical"
//                           className="h-16 bg-gray-500"
//                         />
//                       )}
//                       <div className="flex items-center space-x-2">
//                         <IconComponent icon={item.icon as string} />
//                         <div>
//                           <div className="text-sm text-gray-400">
//                             {item.label}
//                           </div>
//                           {item.type === "hours" ? (
//                             <>
//                               {/* <div className="font-bold">
//                                 {item.value.split("\\n")[0]}
//                               </div>

//                               <div className="text-sm">
//                                 {item.value.split("\\n")[1]}
//                               </div> */}

//                               {item.value.split("\\n").map((line, index) => (
//                                 <div
//                                   key={index}
//                                   className={
//                                     index === 0 ? "font-bold" : "text-sm"
//                                   }
//                                 >
//                                   {line}
//                                   {index <
//                                     item.value.split("\\n").length - 1 && (
//                                     <br />
//                                   )}
//                                 </div>
//                               ))}
//                             </>
//                           ) : (
//                             <div className="font-bold">{item.value}</div>
//                           )}
//                         </div>
//                       </div>
//                     </React.Fragment>
//                   ))}
//                 </div>
//                 <Separator orientation="horizontal" className="bg-gray-500" />
//                 {contactItems?.slice(2, 3).map((item) => {
//                   return (
//                     <div key={item.id} className="flex items-center space-x-2">
//                       <IconComponent icon={item.icon as string} />
//                       <div>
//                         <div className="text-sm text-gray-400">
//                           {item.label}
//                         </div>
//                         <div className="font-bold">{item.value}</div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="  lg:hidden flex items-center space-x-4">
//                 <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//                   <SheetTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="bg-transparent"
//                       onClick={() => setIsDetailsOpen(false)}
//                     >
//                       <Menu className="h-6 w-6 bg-transparent" />
//                     </Button>
//                   </SheetTrigger>
//                   <SheetContent side="left" className="bg-[#c5dfff] w-64 p-0">
//                     <SheetHeader className="p-4 border-b text-black">
//                       <SheetTitle>Menu</SheetTitle>
//                     </SheetHeader>
//                     <nav className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
//                       <div className="overflow-y-auto flex-1">
//                         {menuItems?.map((item) => (
//                           <React.Fragment key={item.id}>
//                             {item.nav_sections.length > 0 ? (
//                               <Collapsible>
//                                 <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
//                                   <span
//                                     className={cn(
//                                       "text-lg font-semibold",
//                                       isActive(item.href)
//                                         ? "text-[#00bfff]"
//                                         : "text-black"
//                                     )}
//                                   >
//                                     {item.name}
//                                   </span>

//                                   <ChevronRight className="h-4 w-4" />
//                                 </CollapsibleTrigger>
//                                 <CollapsibleContent>
//                                   {item?.nav_sections?.map((section) => (
//                                     <Collapsible key={section.id}>
//                                       <CollapsibleTrigger className="flex items-center font-bold justify-between w-full p-4 pl-8 text-left">
//                                         <span
//                                           className={cn(
//                                             "text-base font-bold",
//                                             isActive(`/boats/${section.href}`)
//                                               ? "text-[#00bfff]"
//                                               : "text-black"
//                                           )}
//                                         >
//                                           {section.name}
//                                         </span>

//                                         <ChevronRight className="h-4 w-4 text-black" />
//                                       </CollapsibleTrigger>
//                                       <CollapsibleContent>
//                                         <Link
//                                           // href={section.href ?? ""}

//                                           href={`/boats/${section.href}`}
//                                           className="block p-4 pl-12 text-sm font-medium text-black"
//                                           onClick={() => setIsSheetOpen(false)}
//                                         >
//                                           All {section.name}
//                                         </Link>
//                                         {section?.products?.map((product) => (
//                                           <Link
//                                             key={product.id}
//                                             // href={product.href ?? "#"}
//                                             href={`/boats/${section.href}/${product.href}`}
//                                             onClick={() =>
//                                               setIsSheetOpen(false)
//                                             }
//                                             className={cn(
//                                               "block p-4 pl-12 text-sm  ",
//                                               isActive(product.href ?? "")
//                                                 ? "text-[#00bfff]"
//                                                 : "text-black"
//                                             )}
//                                           >
//                                             {product.name}
//                                           </Link>
//                                         ))}
//                                       </CollapsibleContent>
//                                     </Collapsible>
//                                   ))}
//                                 </CollapsibleContent>
//                               </Collapsible>
//                             ) : (
//                               <Link
//                                 href={item.href ?? ""}
//                                 onClick={() => setIsSheetOpen(false)}
//                                 className={cn(
//                                   "flex items-center justify-between p-4 text-lg font-semibold",
//                                   isActive(item.href)
//                                     ? "text-[#00bfff]"
//                                     : "text-black"
//                                 )}
//                               >
//                                 {item.name}
//                                 <ChevronRight className="h-4 w-4" />
//                               </Link>
//                             )}
//                           </React.Fragment>
//                         ))}
//                       </div>
//                     </nav>
//                     <Button className="flex justify-center mt-8 items-center w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue hover:opacity-60 rounded-full">
//                       Booking Now
//                     </Button>
//                   </SheetContent>
//                 </Sheet>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => {
//                     setIsDetailsOpen(!isDetailsOpen);
//                   }}
//                 >
//                   <MoreHorizontal className="h-6 w-6" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {isDetailsOpen && (
//         <MobileOverlay
//           contacts={contacts}
//           onClose={() => setIsDetailsOpen(false)}
//         />
//       )}

//       {isDetailsOpen && (
//         <div
//           className="fixed top-[27.4375rem] inset-0 bg-black opacity-20 z-10"
//           onClick={handleOverlayClick}
//         />
//       )}

//       {/* Main Navigation Bar */}

//       <CombinedNavigation />
//     </header>
//   );
// };

type FieldType = "text" | "textarea" | "image" | "links";

interface FooterField {
  type: FieldType;
  label: string;
  value: string | { text: string; url: string }[];
}

interface FooterContent {
  id?: string;
  content: {
    [key: string]: FooterField;
  };
}

// Components
const FooterLink = ({ text, url }: { text: string; url: string }) => (
  <Link href={url} className="hover:underline flex gap-1">
    <ChevronsRight /> {text}
  </Link>
);

const FooterField = ({ field }: { field: FooterField }) => {
  switch (field.type) {
    case "text":
    case "textarea":
      return <p>{field.value as string}</p>;
    case "image":
      return (
        <Image
          src={field.value as string}
          alt={field.label}
          width={200}
          height={100}
          className="h-[5.3125rem] w-auto"
        />
      );
    case "links":
      return (
        <div className="columns-2 md:columns-2 text-xs whitespace-nowrap">
          {(field.value as { text: string; url: string }[]).map(
            (link, index) => (
              <FooterLink key={index} {...link} />
            )
          )}
        </div>
      );
    default:
      return null;
  }
};

const BoatImage = ({ url }: { url: string }) => {
  console.log(url);
  return (
    <div className="absolute -top-[180px] left-5 lg:left-20 bottom-4 z-[3] w-[14.1875rem] h-[24.625rem] overflow-hidden hidden md:hidden 4xl:block">
      <Image
        src={url ?? "/"}
        alt="Footer decoration"
        className="object-cover w-full h-full"
        height={227}
        width={394}
      />
    </div>
  );
};

// Main Component
const DynamicFooter = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const fetchFooterContent = async () => {
    const { data, error } = await supabase
      .from("footer_contentsa")
      .select("*")
      .single();

    if (error) throw error;
    return data;
  };

  const { data: footerContent } = useQuery({
    queryKey: ["footer-data"],
    queryFn: fetchFooterContent,
  });

  const getFieldByLabel = (label: string) =>
    Object.values(footerContent?.content ?? {}).find(
      (field) => field.label.toLowerCase() === label.toLowerCase()
    );

  const logoField = getFieldByLabel("Logo");
  const backgroundField = getFieldByLabel("Background Image");
  const boatField = getFieldByLabel("boat");

  return (
    <footer
      className="relative py-8 text-white"
      style={{
        background: `linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(${
          backgroundField?.value || "/images/footer-bg.jpg"
        }) center / cover`,
        fontSize: "18px",
        padding: "15px 0",
      }}
    >
      <div className="container mx-auto px-4">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #00008b, #00008b, transparent)",
            zIndex: -1,
          }}
        />

        {!EXCLUDED_PATHNAMES.includes(pathname) && (
          <BoatImage url={boatField?.value as string} />
        )}

        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl md:flex md:justify-center gap-4">
            {/* Left Column */}
            <div className="flex-1">
              {logoField && (
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <FooterField field={logoField} />
                </Link>
              )}

              {Object.values(footerContent?.content ?? {}).map(
                (field) =>
                  !EXCLUDED_LABELS.includes(field.label) &&
                  field.type !== "links" && (
                    <div key={field.label} className="mb-4">
                      <h3 className="text-xl font-bold mb-2">{field.label}</h3>
                      <FooterField field={field} />
                    </div>
                  )
              )}
            </div>

            {/* Right Column */}
            <div className="flex-1 mt-2">
              {Object.values(footerContent?.content ?? {})
                .filter((field) => field.type === "links")
                .map((field, index) => (
                  <div key={index}>
                    <FooterField field={field} />
                  </div>
                ))}

              <div className="mt-8">
                <Separator className="my-4 bg-black" />
                {/* Copyright Section */}
                <div className="text-start">
                  <p>
                    {getFieldByLabel("Copyright")
                      ?.value.toString()
                      .replace("{year}", currentYear.toString())}
                  </p>
                  {/* Static Content Below Copyright */}
                  {/* <div className="mt-4 text-sm">
                    <p>Additional static content can go here</p>
                    <ul className="mt-2">
                      <li>Static Link 1</li>
                      <li>Static Link 2</li>
                      <li>Static Link 3</li>
                    </ul>
                  </div> */}

                  <SocialMediaItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

// const DynamicFooter = () => {
//   // const [footerContent, setFooterContent] = useState<FooterContent | null>(
//   //   null
//   // );
//   const pathname = usePathname();
//   const [currentYear] = useState(new Date().getFullYear());

//   const fetchFooterContent = async () => {
//     const { data, error } = await supabase
//       .from("footer_contentsa")
//       .select("*")
//       .single();

//     if (error) {
//       console.error("Error fetching footer content:", error.message);
//     } else if (data) {
//       // setFooterContent(data as any);
//       return data;
//     }
//   };

//   const { data: footerContent } = useQuery({
//     queryKey: ["footer-data"],
//     queryFn: fetchFooterContent,
//   });

//   const renderField = (field: FooterField) => {
//     switch (field.type || field) {
//       case "text":
//       case "textarea":
//         return <p>{field.value as string}</p>;
//       case "image":
//         return (
//           <Image
//             src={field.value as string}
//             alt={field.label}
//             width={200}
//             height={100}
//             className="h-[5.3125rem] w-auto"
//           />
//         );
//       case "links":
//         return (
//           <div className="columns-2 md:columns-2 text-xs whitespace-nowrap">
//             {(field?.value as { text: string; url: string }[])?.map(
//               (link, index) => (
//                 <Link
//                   key={index}
//                   href={link.url ?? ""}
//                   className="hover:underline flex gap-1"
//                 >
//                   <ChevronsRight /> {link?.text}
//                 </Link>
//               )
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const getFieldByLabel = (label: string) =>
//     Object.values(footerContent?.content ?? {}).find(
//       (field) => field.label.toLowerCase() === label.toLowerCase()
//     );

//   const logoField = getFieldByLabel("Logo");
//   const backgroundField = getFieldByLabel("Background Image");
//   const boatField = getFieldByLabel("boat");
//   const boatImageUrl = boatField?.value ?? "";
//   const excludedPathnames = [
//     "/member-dashboard",
//     "/vessel-amenity",
//     "/boat-services",
//   ];
//   return (
//     <footer
//       className="relative py-8 text-white"
//       style={{
//         position: "relative",

//         background: `linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(${
//           backgroundField?.value || "/images/footer-bg.jpg"
//         }) center / cover`,

//         fontSize: "18px",
//         padding: "15px 0",
//       }}
//     >
//       <div className="container mx-auto px-4">
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(to top, #00008b, #00008b, transparent)",
//             zIndex: -1,
//           }}
//         />

//         {!excludedPathnames.includes(pathname) && (
//           <div className="absolute -top-[180px] left-5 lg:left-20 bottom-4 z-[3] w-[14.1875rem] h-[24.625rem] overflow-hidden hidden md:hidden 4xl:block">
//             {boatImageUrl && (
//               <Image
//                 src={(boatImageUrl as string) ?? "/images/sarah.jpg"}
//                 alt="Footer decoration"
//                 className="object-cover w-full h-full"
//                 height={227}
//                 width={394}
//               />
//             )}
//           </div>
//         )}

//         <section className="w-full p-4  ">
//           <div className=" container mx-auto   max-w-6xl md:flex md:justify-center gap-4">
//             <div className="flex-1">
//               {logoField && (
//                 <Link href="/" className="flex items-center space-x-2 mb-4">
//                   {renderField(logoField)}
//                 </Link>
//               )}
//               {Object.values(footerContent?.content ?? {}).map(
//                 (field) =>
//                   // if any field is added in the code please do add that label so that it wont render in the footer
//                   field.type !== "links" &&
//                   field.label !== "Copyright" &&
//                   field.label !== "Logo" &&
//                   field.label !== "boat" &&
//                   field.label !== "Background Image" && (
//                     <div key={field.label} className="mb-4">
//                       <h3 className="text-xl font-bold mb-2">{field.label}</h3>
//                       {renderField(field)}
//                     </div>
//                   )
//               )}
//             </div>

//             <div className={`flex-1 mt-2 ${contentFont.className}`}>
//               {footerContent?.content &&
//                 Object.values(footerContent.content)
//                   .filter((field) => field.type === "links")
//                   .map((field, index) => (
//                     <div key={index}>{renderField(field)} </div>
//                   ))}

//               <div className="mt-8">
//                 <Separator className="my-4 bg-black" />
//                 <div className="text-justify">
//                   <p>
//                     {getFieldByLabel("Copyright")
//                       ?.value.toString()
//                       .replace("{year}", currentYear.toString())}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </footer>
//   );
// };

export { Header, DynamicFooter };
