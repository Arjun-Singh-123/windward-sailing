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

  const { isHidden, isTransparent } = useHeaderState();

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

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        {
          "-translate-y-full": isHidden,
          "translate-y-0": !isHidden,
          "bg-transparent": isTransparent,
          "bg-fontColor backdrop-blur-sm": !isTransparent,
        }
      )}
    >
      <div className="h-24 border-b border-white/10">
        <div className="flex  justify-between h-24">
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
              className="hidden md:block h-24 mx-8 "
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {menuItems?.map((item) => (
              <div key={item.id} className="relative group flex ">
                {item.nav_sections.length > 0 ? (
                  <div className="relative flex z-200 ">
                    <span className="text-white cursor-pointer py-2     transition-all duration-200 flex items-center border-transparent border-b-2 hover:border-white">
                      {item.name}
                    </span>

                    <div className="absolute  left-0 hidden group-hover:block min-w-[200px] top-[5.5rem]  shadow-lg rounded-md border-t-flatBlue  bg-[#c5dfff]  mt-2   ">
                      {item.nav_sections.map((section) => (
                        <div key={section.id} className="relative group/sub   ">
                          <Link
                            href={`/boats/${section.href}`}
                            className={cn(
                              "block px-4 py-2 text-sm w-full",
                              isActive(`/boats/${section.href}`)
                                ? "bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black w-full"
                                : "text-gray-800 hover:bg-gradient-to-b hover:from-[#6edcfc] hover:to-[#4facfe] hover:text-black w-full"
                            )}
                          >
                            {section.name}
                          </Link>
                          {section.products && section.products.length > 0 && (
                            <div className="absolute left-full border-t-flatBlue transform rotate-45 border-4 top-0 mt-0 w-64 bg-[#c5dfff] rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 invisible group-hover/sub:visible">
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
                      "text-white py-2 border-b-2 border-transparent transition-all duration-200 flex items-center",
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

          <div className="flex items-center  ">
            <SettingsPanel />

            <div className="  lg:hidden flex items-center space-x-4">
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
                    !isTransparent
                      ? "bg-fontColor backdrop-blur-sm text-white"
                      : "md:border-l border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                  } hidden lg:flex h-24 btnplr-50 rounded-none`}
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
      </div>
    </header>
  );
}

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

                <div className="text-start">
                  <p>
                    {getFieldByLabel("Copyright")
                      ?.value.toString()
                      .replace("{year}", currentYear.toString())}
                  </p>

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

export { Header, DynamicFooter };
