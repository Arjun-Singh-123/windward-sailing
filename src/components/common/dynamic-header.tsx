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
import BoatReservation from "../sections/boat-reservation";
import { ScrollArea } from "../ui/scroll-area";
import {
  fetchFooterContent,
  fetchNavItems,
} from "@/services/header-footer-services";

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

  const { isHidden, isTransparent, hasPageSlider } = useHeaderState();

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

  console.log(isHidden, isTransparent, hasPageSlider);
  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        {
          "-translate-y-full": isHidden,
          "translate-y-0": !isHidden,
          "bg-transparent": true,
          "bg-fontColor backdrop-blur-sm": !isTransparent,
          "bg-fontColor": !hasPageSlider,
        }
      )}
    >
      <div className="flex flex-1 justify-between">
        <div className="flex items-center btnplr-30tb15">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/Logo_black.png"
              alt="Logo"
              width={140}
              height={40}
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {menuItems?.map((item) => (
            <div key={item.id} className="group flex ">
              {item.nav_sections.length > 0 ? (
                <div className="flex z-200 ">
                  <span className="text-white cursor-pointer py-2 transition-all duration-200 flex items-center border-transparent border-b-2 hover:border-white group-hover:border-white">
                    {item.name}
                  </span>

                  <div className="absolute left-0 w-full overflow-hidden menu-hani menuh-0 top-full group-hover:menuh-auto duration-500 shadow-lg bg-[#ffffff] rounded-b-lg">
                    <div className="container mx-auto max-w-[1630px] px-[15px]">
                      <div className="flex justify-center gap-8 py-4">
                        {item.nav_sections.map((section) => (
                          <div key={section.id} className="group/sub   ">
                            <div className="py-2 flex">
                              <Link
                                href={`/boats/${section.href}`}
                                className={cn(
                                  "block text-sm font-bold w-full",
                                  isActive(`/boats/${section.href}`)
                                    ? "text-flatBlue"
                                    : "text-darkBlue hover:text-flatBlue"
                                )}
                              >
                                {section.name}
                              </Link>
                            </div>
                            {section.products &&
                              section.products.length > 0 && (
                                <div className="py-1">
                                  {section?.products?.map((product) => (
                                    <div className="py-1 flex">
                                      <Link
                                        key={product.id}
                                        href={`/boats/${section.href}/${product.href}`}
                                        className={cn(
                                          "block text-sm whitespace-nowrap w-full",
                                          isActive(
                                            `/boats/${section.href}/${product.href}`
                                          )
                                            ? "text-flatBlue"
                                            : "text-darkBlue hover:text-flatBlue"
                                        )}
                                      >
                                        {product?.name}
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href ?? ""}
                  className={cn(
                    "text-white py-2 border-b-2 border-transparent transition-all duration-200 flex items-center",
                    isActive(item.href) ? "border-white" : "hover:border-white"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex">
          <SettingsPanel />

          <div className="lg:hidden flex items-center space-x-4">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  className="bg-transparent text-white"
                >
                  <Menu className="h-6 w-6 bg-transparent" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="bg-[#c5dfff] w-64 p-0">
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

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          onClick={(e) => e.stopPropagation()}
                          className="flex justify-center mt-8  items-center w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue hover:opacity-60 rounded-full"
                        >
                          <span
                            className={cn(
                              "flex items-center h-full justify-between p-4 text-lg font-semibold "
                            )}
                          >
                            Booking Now
                          </span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="right"
                        className="w-full sm:max-w-[740px]  bg-white"
                      >
                        <ScrollArea className="h-full">
                          <div className="h-full flex flex-col">
                            <BoatReservation />
                          </div>
                        </ScrollArea>
                      </SheetContent>
                    </Sheet>
                  </div>
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

          <Sheet>
            <SheetTrigger asChild>
              <Button
                className={`${
                  !isTransparent ? "backdrop-blur-sm" : ""
                } hidden lg:flex btnplr-30 h100 noshadow noborder bg-transparent hover:bg-white text-white hover:text-darkBlue rounded-none`}
                // onClick={() => setIsOpen(true)}
              >
                <CalendarDays className="h-5 w-5" />
                <span className="flex items-center h-full justify-between p-4 text-lg font-semibold">
                  Book Now
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-[740px]  bg-white"
            >
              <ScrollArea className="h-full">
                <div className="h-full flex flex-col">
                  <BoatReservation />
                  {/* <Button
                    className="flex justify-center mt-8 items-center w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue hover:opacity-60 rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="flex items-center h-full justify-between p-4 text-lg font-semibold">
                      Booking Now
                    </span>
                  </Button> */}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* <Button
            className={`${
              !isTransparent || isDark
                ? "bg-fontColor backdrop-blur-sm text-white"
                : " md:border-l border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
            } hidden lg:flex h-24  btnplr-50 rounded-none`}
          >
            <CalendarDays className="h-5 w-5" />
            <Link
              href="/trip-planning"
              className={cn(
                "flex items-center h-full justify-between p-4 text-lg font-semibold "
              )}
            >
              Book Now
            </Link>
          </Button> */}
        </div>
      </div>
    </header>
  );
}
