import { supabase } from "@/lib/supabase";

export const fetchProductDetails = async (productSlug: string) => {
  // Add leading slash if not present
  const slugToCompare = productSlug.startsWith("/")
    ? productSlug
    : `/${productSlug}`;
  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("id")
    .eq("href", slugToCompare)
    .single();

  if (productError || !productData) {
    throw new Error("Product not found");
  }
  // console.log("product data", productData);
  const { data, error } = await supabase
    .from("product_details")
    .select("*")
    .eq("product_id", productData.id)
    .single();

  if (error) {
    throw error;
  }

  return data as any;
};
