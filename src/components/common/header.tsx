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
  Cross,
  X,
  ChevronsRight,
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
import { fetchCategories, getFooterContent } from "@/lib/services";
// import { FooterContent } from "../sections/admin-footer";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ModeToggle } from "../toggle-mode";

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

const desiredOrder = [
  "Home",
  "Membership Fees",
  "Rental Fees",
  "Boats",
  "Members",
];

export const fetchNavItems = async () => {
  const { data, error } = await supabase.from("nav_items").select(`
      id,
      name,
      href,
      status,
      nav_sections (
        id,
        name,
        href,
        status,
        nav_subsections (
          id,
          name,
          href,
          status
        )
      )
    `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // const [product, setProduct] = useState<any[]>(menuItems);

  const { data: menuItems } = useQuery({
    queryKey: ["menu-items"],
    queryFn: fetchNavItems,
  });

  console.log("menu data", menuItems);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // const { data: menu } = useQuery({
  //   queryKey: ["menuitems-data"],
  //   queryFn: fetchCategories,
  // });

  // const sortData = (data) => {
  //   return data?.sort((a, b) => {
  //     return desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name);
  //   });
  // };

  // const sortedData = sortData(menu);

  // console.log(sortedData);
  // const data1 = menuItemss(menuItems);
  // console.log(data1, "menu data");
  // setProduct(data1 as any);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = () => {
    setIsDetailsOpen(false);
  };
  // Close the sheet when the route changes
  useEffect(() => {
    setIsSheetOpen(false);
    setIsDetailsOpen(false);
  }, [pathname]);

  // useEffect(() => {
  //   async function fetchCategories() {
  //     const { data, error } = await supabase
  //       .from("categories")
  //       .select(
  //         `
  //         id,
  //         name,
  //         menu_name,
  //         is_product_category,
  //         icon_name,
  //         subcategories (
  //           id,
  //           name
  //         )
  //       `
  //       )
  //       .order("is_product_category", { ascending: false });

  //     let { data: product_details, error: product_error } = await supabase
  //       .from("product_details")
  //       .select("*");
  //     console.log("product details", product_details);

  //     if (data) {
  //       const data1 = menuItemss(data);
  //       console.log(data1, "menu data");
  //       setProduct(data1 as any);
  //       localStorage.setItem("key", JSON.stringify(data1));
  //     }
  //     if (error) console.error("Error fetching categories:", error);
  //   }
  //   fetchCategories();
  // }, []);

  return (
    <header className={`sticky top-0 z-50 lg:relative md:top-auto`}>
      {/* <ModeToggle /> */}
      {/* First Row */}
      {!isDetailsOpen && (
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
      )}

      {!isDetailsOpen && (
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
                      {menuItems?.map((item) => (
                        <React.Fragment key={item.name}>
                          {item?.nav_sections ? (
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
                                {item?.nav_sections?.map((category) => (
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
                                      {category?.nav_subsections?.map(
                                        (subcategory) => (
                                          <Link
                                            key={subcategory.name}
                                            href={subcategory.href}
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
          onClick={handleOverlayClick} // Close on click
        />
      )}

      {/* Main Navigation Bar */}

      <CombinedNavigation />
    </header>
  );
};

// export default Header;

// const Footer: React.FC = () => {
//   const [footerContent, setFooterContent] = useState<FooterContent | null>(
//     null
//   );

//   const currentYear = new Date().getFullYear(); // Get the current year

//   useEffect(() => {
//     async function fetchFooterContent() {
//       try {
//         const content = await getFooterContent();
//         setFooterContent(content as any);
//       } catch (error) {
//         console.error("Error fetching footer content:", error);
//       }
//     }
//     fetchFooterContent();
//   }, []);

//   console.log("footer data...............", footerContent);
//   if (!footerContent) return null;

//   return (
//     // <footer
//     //   className="relative py-8 text-white"
//     //   style={{
//     //     position: "relative",
//     //     background:
//     //       "linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(/images/footer-bg.jpg)",
//     //     backgroundSize: "cover",
//     //     backgroundPosition: "center",
//     //     fontSize: "18px",
//     //     padding: "15px 0",
//     //   }}
//     // >
//     //   <div className="container mx-auto px-4">
//     //     <div
//     //       className="absolute inset-0"
//     //       style={{
//     //         background:
//     //           "linear-gradient(to top, #00008b, #00008b, transparent)",
//     //         zIndex: -1,
//     //       }}
//     //     />

//     //     {/* Iterate through footerContents */}
//     //     {footerContent?.map((footerContent) => (
//     //       <div key={footerContent.id} className="relative z-10">
//     //         <div
//     //           className="absolute inset-0 bg-cover bg-center"
//     //           style={{
//     //             backgroundImage: `url(${footerContent.footer_data.footer_image_url})`,
//     //             zIndex: -2,
//     //           }}
//     //         />
//     //         <div className="absolute -top-[180px] left-5 lg:left-20 bottom-4 z-[3] w-[14.1875rem] h-[24.625rem] overflow-hidden hidden md:hidden 4xl:block">
//     //           <Image
//     //             src="/images/footer-boat.png"
//     //             alt="Footer decoration"
//     //             className="object-cover w-full h-full"
//     //             height={227}
//     //             width={394}
//     //           />
//     //         </div>

//     //         <div className="">
//     //           <div className="md:flex md:justify-center">
//     //             <div>
//     //               <div>
//     //                 <Link href="/" className="flex items-center space-x-2 mb-4">
//     //                   <Image
//     //                     src={footerContent?.footer_data.logo_url}
//     //                     alt={footerContent?.footer_data.club_name}
//     //                     className="h-[5.3125rem] w-auto"
//     //                     width={277.75}
//     //                     height={84.984}
//     //                   />
//     //                 </Link>
//     //               </div>
//     //               <h3 className="text-xl font-bold mb-4">
//     //                 {footerContent?.footer_data.club_name}
//     //               </h3>
//     //               <p>{footerContent?.footer_data.footer_data?.address}</p>
//     //               <p className="mt-4">
//     //                 <strong>Service Area:</strong>
//     //                 <br />
//     //                 {footerContent?.footer_data.footer_data?.service_area}
//     //               </p>
//     //             </div>
//     //             <div className="mt-2 columns-2 md:columns-auto">
//     //               {footerContent?.footer_data?.footer_data?.navigation_links?.map(
//     //                 (link) => (
//     //                   <Link
//     //                     key={link.url}
//     //                     href={link.url}
//     //                     className="hover:underline flex gap-1"
//     //                   >
//     //                     <ChevronsRight /> {link.title}
//     //                   </Link>
//     //                 )
//     //               )}
//     //             </div>
//     //           </div>
//     //           <Separator className="my-8 bg-black" />
//     //           <div className="text-justify">
//     //             <p>{footerContent?.footer_data.footer_data?.copyright_text}</p>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </footer>

//     <footer
//       className="relative py-8 text-white    "
//       style={{
//         position: "relative",
//         background:
//           "linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(/images/footer-bg.jpg)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
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
//         <div
//           className="absolute inset-0 bg-cover bg-center  "
//           style={{
//             backgroundImage: `url(${footerContent?.footer_image_url})`,
//             zIndex: -2,
//           }}
//         />
//         <div
//           className="absolute -top-[180px] left-5 lg:left-20 bottom-4 z-[3] w-[14.1875rem] h-[24.625rem] overflow-hidden  hidden   md:hidden 4xl:block   "
//           // style={{
//           //   width: "227px",
//           //   height: "394px",
//           //   overflow: "hidden",
//           //   display: "none",
//           // }}
//         >
//           <Image
//             src="/images/footer-boat.png"
//             alt="Footer decoration"
//             className="object-cover w-full h-full  "
//             height={227}
//             width={394}
//           />
//         </div>

//         <div className="    ">
//           <div className="md:flex md:justify-center ">
//             <div>
//               <div>
//                 <Link href="/" className="flex items-center space-x-2 mb-4">
//                   <Image
//                     src={footerContent.logo_url}
//                     alt={footerContent.club_name}
//                     className="h-[5.3125rem] w-auto"
//                     width={277.75}
//                     height={84.984}
//                   />
//                 </Link>
//               </div>
//               <h3 className="text-xl font-bold mb-4">
//                 {footerContent?.club_name}
//               </h3>
//               <p>{footerContent.address}</p>
//               <p className="mt-4">
//                 <strong>Service Area:</strong>
//                 <br />
//                 {footerContent.service_area}
//               </p>
//             </div>
//             <div className=" mt-2 columns-2 md:columns-auto ">
//               {footerContent?.navigation_links?.map((link) => (
//                 <Link
//                   key={link.text}
//                   href={link.url}
//                   className="hover:underline flex gap-1"
//                 >
//                   <ChevronsRight /> {link.text}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <Separator className="my-8 bg-black" />
//           <div className="text-justify">
//             <p>
//               {footerContent?.copyright_text?.replace(
//                 "{year}",
//                 currentYear.toString()
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// interface FooterField {
//   id: string;
//   type: "text" | "textarea" | "image" | "links";
//   label: string;
//   value: string | { text: string; url: string }[];
// }

// interface FooterContent {
//   id: string;
//   fields: FooterField[];
// }

// const DynamicFooter = () => {
//   const [footerContent, setFooterContent] = useState<FooterContent | null>(
//     null
//   );
//   const [currentYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     fetchFooterContent();
//   }, []);

//   const fetchFooterContent = async () => {
//     const { data, error } = await supabase.from("footer_contentn").select("*");

//     if (error) {
//       console.error("Error fetching footer content:", error.message);
//     } else if (data) {
//       console.log("data of the content , is ", data);
//       setFooterContent(data);
//     }
//   };

//   if (!footerContent) return null;

//   const renderField = (field: FooterField) => {
//     switch (field.type) {
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
//           <div className="columns-2 md:columns-auto">
//             {(field?.value as { text: string; url: string }[]).map(
//               (link, index) => (
//                 <Link
//                   key={index}
//                   href={link.url}
//                   className="hover:underline flex gap-1"
//                 >
//                   <ChevronsRight /> {link.text}
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
//     footerContent?.fields?.find(
//       (field) => field.label.toLowerCase() === label.toLowerCase()
//     );

//   const logoField = getFieldByLabel("Logo");
//   const backgroundField = getFieldByLabel("Background Image");

//   return (
//     <footer
//       className="relative py-8 text-white"
//       style={{
//         position: "relative",
//         background: `linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(${
//           backgroundField?.value || "/images/footer-bg.jpg"
//         })`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
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
//         <div className="md:flex md:justify-between">
//           <div>
//             {logoField && (
//               <Link href="/" className="flex items-center space-x-2 mb-4">
//                 {renderField(logoField)}
//               </Link>
//             )}
//             {footerContent?.fields?.map(
//               (field) =>
//                 field.type !== "links" &&
//                 field.label !== "Logo" &&
//                 field.label !== "Background Image" && (
//                   <div key={field.id} className="mb-4">
//                     <h3 className="text-xl font-bold mb-2">{field.label}</h3>
//                     {renderField(field)}
//                   </div>
//                 )
//             )}
//           </div>
//           <div className="mt-2">
//             {footerContent?.fields?.find((field) => field.type === "links") &&
//               renderField(
//                 footerContent?.fields?.find((field) => field.type === "links")!
//               )}
//           </div>
//         </div>
//         <Separator className="my-8 bg-black" />
//         <div className="text-justify">
//           <p>
//             {getFieldByLabel("Copyright")
//               ?.value.toString()
//               .replace("{year}", currentYear.toString())}
//           </p>
//         </div>
//       </div>
//     </footer>
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
          <div className="columns-2 md:columns-auto text-xs whitespace-nowrap">
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
        background: `linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%), url(${
          backgroundField?.value || "/images/footer-bg.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          <Image
            src={boatImageUrl as string}
            alt="Footer decoration"
            className="object-cover w-full h-full"
            height={227}
            width={394}
          />
        </div>

        <div className="md:flex md:justify-center">
          <div>
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

          <div className="mt-2">
            {footerContent?.content &&
              Object.values(footerContent.content)
                .filter((field) => field.type === "links")
                .map((field, index) => (
                  <div key={index}>{renderField(field)} </div>
                ))}
          </div>
        </div>
        <Separator className="my-8 bg-black" />
        <div className="text-justify">
          <p>
            {getFieldByLabel("Copyright")
              ?.value.toString()
              .replace("{year}", currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Header, DynamicFooter };
