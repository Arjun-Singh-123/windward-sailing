"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ProductDetail from "./components/product-details";

type Category = {
  id: number;
  name: string;
  menu_name: string;
  is_product_category: boolean;
  icon_name: string;
  subcategories?: Subcategory[];
};

type Subcategory = {
  id: number;
  name: string;
};

// Transform the data
export const menuItems = (items: any) => {
  return items.map((category) => {
    if (category.is_product_category) {
      return {
        name: category.menu_name,
        href: `/${category.name.toLowerCase()}`,
        categories: [
          {
            name: category.name,
            href: `/${category.name.toLowerCase()}`,
            subcategories: category.subcategories.map((sub) => ({
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
        href: `/${category.name.toLowerCase().replace(/\s+/g, "-")}`,
      };
    }
  });
};

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select(
          `
          id,
          name,
          menu_name,
          is_product_category,
          icon_name,
          subcategories (
            id,
            name
          )
        `
        )
        .order("is_product_category", { ascending: false });

      let { data: product_details, error: product_error } = await supabase
        .from("product_details")
        .select("*");
      console.log("product details", product_details);
      setProduct(product_details);
      if (data) {
        setCategories(data);
        const data1 = menuItems(data);
        console.log(data1, "menu data");
        localStorage.setItem("key", JSON.stringify(data1));
      }
      if (error) console.error("Error fetching categories:", error);
    }
    fetchCategories();
  }, []);

  const DynamicIcon = ({ name, ...props }: LucideProps & { name: string }) => {
    const LucideIcon = dynamic(() =>
      import("lucide-react").then((mod) => mod[name])
    );
    return <LucideIcon {...props} />;
  };

  return (
    <ProductDetail product={product} />
    // <nav className="bg-gray-800 text-white p-4">
    //   <ul className="flex justify-center space-x-6">
    //     {categories.map((category) => (
    //       <li key={category.id} className="relative group">
    //         <Link
    //           href={
    //             category.is_product_category
    //               ? "#"
    //               : `/${category.name.toLowerCase()}`
    //           }
    //         >
    //           <span className="cursor-pointer text-lg font-semibold flex items-center">
    //             <DynamicIcon
    //               name={category.icon_name}
    //               className="w-5 h-5 mr-2"
    //             />
    //             {category.menu_name}
    //           </span>
    //         </Link>
    //         {category.is_product_category && category.subcategories && (
    //           <ul className="absolute hidden group-hover:block bg-gray-700 mt-2 py-2 rounded-md shadow-lg">
    //             {category.subcategories.map((subcategory) => (
    //               <li key={subcategory.id}>
    //                 <Link href={`/subcategory/${subcategory.id}`}>
    //                   <span className="block px-4 py-2 hover:bg-gray-600 whitespace-nowrap">
    //                     {subcategory.name}
    //                   </span>
    //                 </Link>
    //               </li>
    //             ))}
    //           </ul>
    //         )}
    //       </li>
    //     ))}
    //   </ul>

    //   {/* Visualization of data mapping */}
    //   <div className="mt-8 bg-gray-900 p-4 rounded-lg">
    //     <h2 className="text-xl font-bold mb-4">Data Mapping Visualization</h2>
    //     {categories.map((category) => (
    //       <div key={category.id} className="mb-4">
    //         <h3 className="text-lg font-semibold">
    //           <DynamicIcon
    //             name={category.icon_name}
    //             className="w-5 h-5 inline mr-2"
    //           />
    //           {category.menu_name}{" "}
    //           {category.is_product_category ? "(Product Category)" : ""}
    //         </h3>
    //         {category.is_product_category && category.subcategories && (
    //           <ul className="ml-4">
    //             {category.subcategories.map((subcategory) => (
    //               <li key={subcategory.id} className="text-gray-300">
    //                 {subcategory.name}
    //               </li>
    //             ))}
    //           </ul>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </nav>
  );
}
