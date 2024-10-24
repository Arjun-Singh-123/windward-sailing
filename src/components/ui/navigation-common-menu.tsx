import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { fetchNavItems } from "@/lib/services";
const NavigationCommonMenu = () => {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const { data: menuItems } = useQuery({
    queryKey: ["menuitems-data"],
    queryFn: fetchNavItems,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    // console.log("checking hovered item", hoveredItem);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={cn(
        "hidden lg:block py-2 sticky top-0 z-50 px-4 transition-all duration-300",
        isSticky ? "bg-[#c5dfff] shadow-md" : "bg-sky-100"
      )}
    >
      <ul className="flex justify-between items-center max-w-6xl mx-auto container">
        <div className="flex items-center">
          {menuItems?.map((item) => (
            <li key={item.id} className="relative group">
              <Link
                href={item?.name && item.name === "Boats" ? "#" : item.href}
                className={cn(
                  "block px-4 py-2 text-sm font-regular400 transition-colors duration-300",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black w-full"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-[#6edcfc] hover:to-[#4facfe] hover:text-black w-full"
                )}
                onMouseEnter={() => setActiveItem(item.href)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {item.name}
              </Link>
              {item.nav_sections && item.nav_sections.length > 0 && (
                <div className="absolute bg-[#c5dfff] z-40 left-0 mt-0 w-48 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                  <div className="py-2">
                    {item?.nav_sections?.map((section) => (
                      <div key={section.id} className="relative group/sub">
                        <Link
                          href={`/boats/${section.href}`}
                          className={cn(
                            "block px-4 py-2 text-sm w-full",
                            isActive(`/boats/${section.href}`)
                              ? "bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black w-full"
                              : "text-gray-800 hover:bg-gradient-to-r hover:from-[#6edcfc] hover:to-[#4facfe] hover:text-black w-full"
                          )}
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
              )}
            </li>
          ))}
        </div>
        <li>
          <button className="bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black font-bold px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            BOOKING NOW
          </button>
        </li>
      </ul>
    </nav>

    // <nav
    //   className={cn(
    //     "hidden lg:block py-2 sticky top-0 z-50 px-4 transition-all duration-300",
    //     isSticky ? "bg-[#c5dfff] shadow-md" : "bg-sky-100"
    //   )}
    // >
    //   <ul className="flex justify-between items-center max-w-6xl mx-auto container">
    //     <div className="flex items-center">
    //       {menuItems?.map((item) => (
    //         <li key={item.id} className="relative group">
    //           <Link
    //             href={item.href ?? " "}
    //             className={cn(
    //               "block px-4 py-2 text-sm font-regular400 transition-colors duration-300",
    //               isActive(item.href)
    //                 ? "bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black w-full"
    //                 : "text-gray-800 hover:bg-gradient-to-r hover:from-[#6edcfc] hover:to-[#4facfe] hover:text-black w-full"
    //             )}
    //             onMouseEnter={() => setActiveItem(item.href)}
    //             onMouseLeave={() => setActiveItem(null)}
    //           >
    //             {item.name}
    //           </Link>
    //           {item.nav_sections && item.nav_sections.length > 0 && (
    //             <div className="absolute bg-[#c5dfff]   z-40 left-0 mt-0 w-48   rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
    //               <div className="py-2">
    //                 {item?.nav_sections?.map((section) => (
    //                   <div key={section.id} className="relative group/sub ">
    //                     <Link
    //                       href={section.href}
    //                       className={cn(
    //                         "block px-4 py-2 text-sm w-full",
    //                         isActive(section.href)
    //                           ? "bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black w-full"
    //                           : "text-gray-800 hover:bg-gradient-to-r hover:from-[#6edcfc] hover:to-[#4facfe] hover:text-black w-full"
    //                       )}
    //                     >
    //                       {section.name}
    //                     </Link>
    //                     {section.products && section.products.length > 0 && (
    //                       <div className="absolute left-full border-t-flatBlue border-4   top-0 mt-0 w-64  bg-[#c5dfff]   rounded-md shadow-lg opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 invisible group-hover/sub:visible">
    //                         <div className="py-2">
    //                           {section?.products?.map((product) => (
    //                             <Link
    //                               key={product.id}
    //                               href={product.href ?? ""}
    //                               className={cn(
    //                                 "block px-4 py-2 text-sm  whitespace-nowrap w-full",
    //                                 isActive(product.href ?? "")
    //                                   ? "bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black w-full"
    //                                   : "text-gray-800 hover:bg-gradient-to-r hover:from-[#6edcfc] hover:to-[#4facfe] hover:text-black w-full"
    //                               )}
    //                             >
    //                               {product.name ?? ""}
    //                             </Link>
    //                           ))}
    //                         </div>
    //                       </div>
    //                     )}
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           )}
    //         </li>
    //       ))}
    //     </div>
    //     <li>
    //       <button className="bg-gradient-to-r from-[#6edcfc] to-[#4facfe] text-black font-bold px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    //         BOOKING NOW
    //       </button>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default NavigationCommonMenu;
