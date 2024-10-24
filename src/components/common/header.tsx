"use client";
import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { usePathname } from "next/navigation";

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

const Header = () => {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // const [product, setProduct] = useState<any[]>(menuItems);
  const [isHovered, setIsHovered] = useState(false);
  const { data: menuItems } = useQuery({
    queryKey: ["menuitems-data"],
    queryFn: fetchNavItems,
  });

  console.log("menu data", menuItems);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleOverlayClick = () => {
    setIsDetailsOpen(false);
  };
  useEffect(() => {
    setIsSheetOpen(false);
    setIsDetailsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={` ${
        isSticky ? "fixed md:sticky" : "sticky"
      }  top-0 z-50 lg:relative md:top-auto bg-[#c5dfff] shadow-md`}
    >
      {/* First Row */}
      {!isDetailsOpen && (
        <div className="     sm:hidden md:hidden lg:block">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex justify-between items-center  ">
              <Link
                href="mailto:support@windwardsailingclub.com"
                className="text-xl hover:underline hidden md:block"
              >
                <span
                  className={` gap-1 flex items-center justify-center ${contentFont.className}`}
                >
                  <MailIcon
                    className="text-black stroke-white stroke-2"
                    fill="#232323"
                  />
                  support@windwardsailingclub.com
                </span>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex space-x-2">
                  <div className="flex items-center space-x-4">
                    <div
                      className="hidden md:flex space-x-2 "
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Link
                        href="#"
                        aria-label="Facebook"
                        className=" hover:bg-[#232323] hover:text-white transition-colors duration-300"
                      >
                        <Facebook
                          size={25}
                          className={`hover:text-[#4267B2] transition-colors duration-300 text-black  ${
                            isHovered && "stroke-white "
                          } `}
                          fill={`${isHovered} ? '#FFFFFF' : '	#FFFFFF'`}
                        />
                      </Link>
                      <Link
                        href="#"
                        aria-label="Twitter"
                        className=" hover:bg-[#232323] hover:text-white transition-colors duration-300"
                      >
                        <Twitter
                          size={25}
                          fill={`${isHovered} ? '#232323' : '	#FFFFFF'`}
                          className={`hover:text-[#4267B2] transition-colors duration-300 text-black    ${
                            isHovered && "stroke-white "
                          } `}
                        />
                      </Link>
                      <Link
                        href="#"
                        aria-label="Instagram"
                        className=" hover:bg-[#232323] hover:text-white transition-colors duration-300"
                      >
                        <Instagram
                          size={25}
                          className={`hover:text-[#4267B2] transition-colors duration-300 text-black    
                            
                           `}
                        />
                      </Link>
                      <Link href="#" aria-label="Pinterest">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
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
                  size="lg"
                  className="bg-flatBlue hover:bg-flatBlue text-lg text-white hover:text-black hidden md:block rounded-none"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isDetailsOpen && (
        <div className="bg-[#052449] text-white py-2">
          <div className="container mx-auto px-4 max-w-6xl md:min-h-[8.25rem]">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center   z-20">
                <Image
                  src="/images/logoo.png"
                  alt="Windward Sailing Club"
                  // className="h-16 w-auto"
                  className="h-[85px] w-[288px]"
                  width={377.75}
                  height={100.984}
                  onClick={() => setIsDetailsOpen(false)}
                />
              </Link>
              <div className=" hidden md:flex flex-col gap-2">
                <div className="hidden md:hidden lg:flex items-center space-x-6">
                  {/* Contact Info Section */}
                  <div className="flex items-center space-x-2">
                    <Phone className="w-10 h-10" />
                    <div>
                      <div className="text-sm text-gray-400">CALL US</div>
                      <div className="font-bold">(949) 675-9060</div>
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-16 bg-gray-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Clock className="w-10 h-10" />
                    <div>
                      <div className="text-sm text-gray-400">
                        HOURS OF OPERATION
                      </div>
                      <div className="font-bold">Monday — Sunday</div>
                      <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
                    </div>
                  </div>
                </div>

                <Separator orientation="horizontal" className="  bg-gray-500" />
                <div className="flex items-center space-x-2">
                  <MapPin className="w-10 h-10" />
                  <div>
                    <div className="text-sm text-gray-400">
                      COMPANY / LOCATION
                    </div>
                    <div className="font-bold">
                      3300 Via Lido, Windward Beach, CA 92663
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Hamburger Menu */}

              {/* <div className="md:hidden flex items-center space-x-4">
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
                      {menuItems?.map((item) => (
                        <React.Fragment key={item.name}>
                          {item?.nav_sections ? (
                            <Collapsible>
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                                {item.name && (
                                  <Link
                                    href={`/${item.name
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                  >
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
                                  </Link>
                                )}
                                <ChevronRight className="h-4 w-4" />
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                {item?.nav_sections?.map((category) => (
                                  <Collapsible key={category.name}>
                                    <CollapsibleTrigger className="flex items-center font-bold justify-between w-full p-4 pl-8 text-left">
                                      <Link
                                        href={`/category/${
                                          category.name || ""
                                        } `}
                                      >
                                        <span
                                          className={cn(
                                            "text-base font-bold",
                                            isActive(category.href)
                                              ? "text-[#00bfff]"
                                              : "text-black"
                                          )}
                                        >
                                          {category.name}
                                        </span>
                                      </Link>
                                      <ChevronRight className="h-4 w-4" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                      <Link
                                        // href={category.href}
                                        href={`/category/${category.id || ""} `}
                                        className="block p-4 pl-12 text-sm font-medium"
                                        onClick={() => setIsSheetOpen(false)}
                                      >
                                        All {category.name}
                                      </Link>
                                      {category?.nav_subsections?.map(
                                        (subcategory) => (
                                          <Link
                                            key={subcategory.name}
                                            // href={subcategory.href}
                                            href={`/${(
                                              category.name || ""
                                            ).toLowerCase()}/${subcategory.name.toLowerCase()} ?? " " `}
                                            onClick={() =>
                                              setIsSheetOpen(false)
                                            }
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
                    </nav>
                    <Button className="flex justify-center mt-8 items-center  w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue hover:opacity-60  rounded-full">
                      Booking Now
                    </Button>{" "}
                  </SheetContent>
                </Sheet>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsDetailsOpen(!isDetailsOpen);
                  }}
                >
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </div> */}

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
                    <SheetHeader className="p-4 border-b text-black">
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col">
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
                                            "block p-4 pl-12 text-sm",
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
                    </nav>
                    <Button className="flex justify-center mt-8 items-center w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue hover:opacity-60 rounded-full">
                      Booking Now
                    </Button>
                  </SheetContent>
                </Sheet>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsDetailsOpen(!isDetailsOpen);
                  }}
                >
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Section for Mobile View */}
      {isDetailsOpen && (
        <div className="md:block relative   lg:hidden bg-sky text-black py-4">
          <button
            className="absolute -top-4 -right-4 m-4 rounded-full    text-white   shadow-md bg-red-600"
            onClick={handleOverlayClick}
          >
            <X />
          </button>
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <div className="">
                <Button className="flex justify-center items-center w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue  rounded-lg">
                  <Link href="/login">Login</Link>
                </Button>{" "}
                <Link
                  href="mailto:support@windwardsailingclub.com"
                  className="text-xl hover:underline flex justify-center items-center mt-4 "
                >
                  <Mail className="mr-2" /> support@windwardsailingclub.com
                </Link>
                <div className="flex  justify-center items-center w-full p-2 space-x-4  border-2 rounded-full mt-2 shadow-sm">
                  <Facebook className="w-6 h-6" />
                  <Twitter className="w-6 h-6" />
                  <Instagram className="w-6 h-6" />
                  <Youtube className="w-6 h-6" />
                </div>
              </div>
              <Separator className="bg-white/20" />

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
          className="fixed top-[27.4375rem] inset-0 bg-black opacity-20 z-10" // Semi-transparent overlay
          onClick={handleOverlayClick}
        />
      )}

      {/* Main Navigation Bar */}

      <CombinedNavigation />
    </header>
  );
};

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

const DynamicFooter = () => {
  // const [footerContent, setFooterContent] = useState<FooterContent | null>(
  //   null
  // );
  const [currentYear] = useState(new Date().getFullYear());

  // useEffect(() => {
  //   fetchFooterContent();
  // }, []);

  const fetchFooterContent = async () => {
    const { data, error } = await supabase
      .from("footer_contentsa")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching footer content:", error.message);
    } else if (data) {
      // setFooterContent(data as any);
      return data;
    }
  };

  // if (!footerContent) return null;

  const { data: footerContent } = useQuery({
    queryKey: ["footer-data"],
    queryFn: fetchFooterContent,
  });

  const renderField = (field: FooterField) => {
    switch (field.type || field) {
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
          <div className="columns-2 md:columns-3 text-xs whitespace-nowrap">
            {(field?.value as { text: string; url: string }[])?.map(
              (link, index) => (
                <Link
                  key={index}
                  href={link.url ?? ""}
                  className="hover:underline flex gap-1"
                >
                  <ChevronsRight /> {link?.text}
                </Link>
              )
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getFieldByLabel = (label: string) =>
    Object.values(footerContent?.content ?? {}).find(
      (field) => field.label.toLowerCase() === label.toLowerCase()
    );

  const logoField = getFieldByLabel("Logo");
  const backgroundField = getFieldByLabel("Background Image");
  const boatField = getFieldByLabel("boat");
  const boatImageUrl = boatField?.value ?? "";
  console.log(`Boat Image Url : ${boatImageUrl} :: boatfiled is ${boatField}`);

  return (
    <footer
      className="relative py-8 text-white"
      style={{
        position: "relative",
        // background: `linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(${
        //   backgroundField?.value || "/images/footer-bg.jpg"
        // })`,

        background: `linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(${
          backgroundField?.value || "/images/footer-bg.jpg"
        }) center / cover`, // Combine backgroundPosition and backgroundSize into shorthand
        // backgroundSize: "cover",
        // backgroundPosition: "center",
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

        <div className="absolute -top-[180px] left-5 lg:left-20 bottom-4 z-[3] w-[14.1875rem] h-[24.625rem] overflow-hidden hidden md:hidden 4xl:block">
          {boatImageUrl && (
            <Image
              src={(boatImageUrl as string) ?? "/images/sarah.jpg"}
              alt="Footer decoration"
              className="object-cover w-full h-full"
              height={227}
              width={394}
            />
          )}
        </div>

        <section className="w-full p-4  ">
          <div className=" container mx-auto   max-w-6xl md:flex md:justify-center gap-4">
            <div className="flex-1">
              {logoField && (
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  {renderField(logoField)}
                </Link>
              )}
              {Object.values(footerContent?.content ?? {}).map(
                (field) =>
                  // if any field is added in hte code pelase do add that label so that it wont render in the footer
                  field.type !== "links" &&
                  field.label !== "Copyright" &&
                  field.label !== "Logo" &&
                  field.label !== "boat" &&
                  field.label !== "Background Image" && (
                    <div key={field.label} className="mb-4">
                      <h3 className="text-xl font-bold mb-2">{field.label}</h3>
                      {renderField(field)}
                    </div>
                  )
              )}
            </div>
            {/* <div className="mt-2">
            {Object.values(footerContent.content).filter(
              (field) => field.type === "links"
            ) &&


            
              renderField(
                Object.values(footerContent.content).filter(
                  (field) => field.type === "links"
                )!
              )
              
              
              
              
              }
          </div> */}

            <div className="flex-1 mt-2">
              {footerContent?.content &&
                Object.values(footerContent.content)
                  .filter((field) => field.type === "links")
                  .map((field, index) => (
                    <div key={index}>{renderField(field)} </div>
                  ))}

              <div className="mt-8">
                <Separator className="my-4 bg-black" />
                <div className="text-justify">
                  <p>
                    {getFieldByLabel("Copyright")
                      ?.value.toString()
                      .replace("{year}", currentYear.toString())}
                  </p>
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
