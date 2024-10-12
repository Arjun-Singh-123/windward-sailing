import { FooterContent } from "@/components/sections/admin-footer";
import { Tables } from "../../database.types";
import { supabase } from "./supabase";
import { menuItemss } from "@/components/common/header";
import { toast } from "sonner";

export async function getAmenities() {
  const { data, error } = await supabase
    .from("vehicle_details")
    .select("content")
    .eq("section_type", "amenities")
    .single();

  if (error) throw error;
  return data?.content;
}

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

export async function getFooterContent() {
  const { data, error } = await supabase
    .from("footer_content")
    .select("*")
    .single();

  if (error) throw error;
  if (data && Object.keys(data).length === 0) {
    console.log("No footer content found in the database");
    // Handle the case when no data is found
    return {};
  }
  return data;
}

export async function updateFooterContent(content: Partial<FooterContent>) {
  const { data, error } = await supabase
    .from("footer_content")
    .update(content as any)
    .eq("id", content.id ?? "")
    .single();

  if (error) throw error;
  return data;
}

export async function fetchCategories() {
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
    .order("is_product_category", { ascending: true });

  let { data: product_details, error: product_error } = await supabase
    .from("product_details")
    .select("*");
  console.log("product details", product_details);
  if (product_error)
    toast.error("error occured fetching data from the server ");

  if (data) {
    const data1 = menuItemss(data);
    console.log(data1, "menu data");
    // setProduct(data1 as any);
    return data1;
  }
  if (error) console.error("Error fetching categories:", error);
}
