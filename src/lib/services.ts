import { Tables } from "../../database.types";
import { supabase } from "./supabase";
// export async function getAmenities() {
//   const { data, error } = await supabase
//     .from("vehicle_details")
//     .select("content")
//     .eq("section_type", "amenities")
//     .single();

//   if (error) throw error;
//   return data?.content;
// }

export async function getAmenitiess(): Promise<
  Tables<"vehicle_details_new">["content"]
> {
  const { data, error } = await supabase
    .from("vehicle_details_new")
    .select("content")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching vehicle:", error);
    return [];
  }

  return data;
}

export const fetchVehicleAmenities = async () => {
  console.log("Fetching vehicle amenities");

  try {
    // Perform the asynchronous operation to fetch data
    const { data, error } = await supabase.from("members").select("*");

    // Handle errors

    console.log("members data", data);
    if (error) {
      console.error("Error fetching vehicle:", error);
      throw new Error("Failed to fetch vehicle amenities");
    }
    return data;
    // Process and return the data
  } catch (error) {
    // Log the error and rethrow it to be handled by the caller
    console.error("Error in fetchVehicleAmenities:", error);
    throw error;
  }
};

// export async function getFooterContent() {
//   const { data, error } = await supabase
//     .from("footer_content")
//     .select("*")
//     .single();

//   if (error) throw error;
//   if (data && Object.keys(data).length === 0) {
//     console.log("No footer content found in the database");
//     // Handle the case when no data is found
//     return {};
//   }
//   return data;
// }

// export async function updateFooterContent(content: Partial<FooterContent>) {
//   const { data, error } = await supabase
//     .from("footer_content")
//     .update(content as any)
//     .eq("id", content.id ?? "")
//     .single();

//   if (error) throw error;
//   return data;
// }

// export async function fetchCategories() {
//   const { data, error } = await supabase
//     .from("categories")
//     .select(
//       `
//       id,
//       name,
//       menu_name,
//       is_product_category,
//       icon_name,
//       subcategories (
//         id,
//         name
//       )
//     `
//     )
//     .order("is_product_category", { ascending: true });

//   let { data: product_details, error: product_error } = await supabase
//     .from("product_details")
//     .select("*");
//   console.log("product details", product_details);
//   if (product_error)
//     toast.error("error occured fetching data from the server ");

//   if (data) {
//     const data1 = menuItemss(data);
//     console.log(data1, "menu data");
//     // setProduct(data1 as any);
//     return data1;
//   }
//   if (error) console.error("Error fetching categories:", error);
// }
export async function fetchProductDetails(productId: string) {
  console.log("hellllllo checking data");
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (productError) throw productError;

  const { data: details, error: detailsError } = await supabase
    .from("product_details")
    .select("*")
    .eq("product_id", productId)
    .single();

  if (detailsError) throw detailsError;

  return { ...product, ...details };
}
// export async function fetchCategoriest() {
//   const { data, error } = await supabase
//     .from("products")
//     .select("category, subcategory")
//     .order("category", { ascending: true });

//   if (error) throw error;

//   const categories = data.reduce((acc, item) => {
//     if (!acc[item.category]) {
//       acc[item.category] = { name: item.category, subcategories: [] };
//     }
//     if (
//       item.subcategory &&
//       !acc[item.category].subcategories.includes(item.subcategory)
//     ) {
//       acc[item.category].subcategories.push(item.subcategory);
//     }
//     return acc;
//   }, {});

//   return Object.values(categories);
// }

// export async function fetchProductsByCategory(id: number) {
//   const { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .eq("category", id);

//   if (error) throw error;
//   return data;
// }

export const fetchProductsByCategory = async (categoryId: string) => {
  console.log("getting categoriy id is ,,,,,,.............. ", categoryId);

  console.log("Getting category ID:", categoryId);

  const { data, error } = await supabase
    .from("nav_sections")
    .select(
      `
      id, 
     
      nav_subsections (
        id,
        name,
      section_id,

         products (

         id,
         name,
         price,   
         description,
         image_url
         )
        
      )
    `
    )
    .eq("id", categoryId);

  if (error) {
    console.log("getting categoriy id is ,,,,,,.............. ", categoryId);
    // console.error("Error fetching products: hhhhhhhhh", error, categoryId);
    return null;
  }

  return data;
};

export async function fetchProductsBySubcategory(subcategory: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    // .eq("category", category)
    .eq("nav_subsection_id", subcategory);

  if (error) throw error;
  return data;
}

// lib/fetchSheetData.js

// export const fetchSheetData = async (sheetId, gid) => {
//   const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const csvData = await response.text();
//     const parsedData = Papa.parse(csvData, {
//       header: true, // Use the first row as headers
//       skipEmptyLines: true, // Skip empty lines
//     });

//     return parsedData.data; // Return the parsed data
//   } catch (error) {
//     console.error("Error fetching or parsing data:", error);
//     throw error; // Rethrow the error for handling in the calling function
//   }
// };

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

export const fetchProductsNavsection = async (sectionSlug: string) => {
  // Add leading slash if not present
  console.log("chceckingsection slug ", sectionSlug);
  const slugToCompare = sectionSlug.startsWith("/")
    ? sectionSlug
    : `/${sectionSlug}`;
  const { data: sectionData, error: sectionError } = await supabase
    .from("nav_sections")
    .select("id")
    .eq("href", slugToCompare)
    .single();

  if (sectionError || !sectionData) {
    throw new Error("Section not found");
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("nav_section_id", sectionData.id);

  if (error) {
    throw error;
  }

  return data as any;
};
