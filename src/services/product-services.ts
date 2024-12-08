// import { supabase } from "@/lib/supabase";

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// // // Fetch function
// // export const fetchProductDetails = async (): Promise<Product[]> => {
// //   const { data, error } = await supabase.from("product_details").select("*");

// //   if (error) throw error;

// //   // Validate data with Zod
// //   // const validatedData = productDetailSchema.parse(data[0]);
// //   return data;
// // };

// // Fetching product details using useQuery
// export const fetchProductDetails = async (): Promise<Product[]> => {
//   const { data, error } = await supabase.from("product_details").select("*");

//   if (error) throw error;

//   return data?.map((item: any) => ({
//     amenities: item.amenities,
//     created_at: item.created_at,
//     description: item.description,
//     hero_image: item.hero_image,
//     icon: item.icon,
//     id: item.id,
//     images: {
//       internal: item.images?.internal || [],
//       external: item.images?.external || [],
//     },
//     product_id: item.product_id,
//     specifications: item.specifications,
//     subtitle: item.subtitle,
//     title: item.title,
//     updated_at: item.updated_at,
//   }));
// };

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

export async function fetchBannerProducts() {
  const { data, error } = await supabase
    .from("user_selections")
    .select("product_id")
    .eq("section_id", "bd024ca4-e72a-499b-8237-c875f6429409");

  if (error) {
    console.error("Error fetching section:", error);
    return;
  }

  return data;
  // // Banner section ka ID lete hain
  // const { data: sectionData, error: sectionError } = await supabase
  //   .from("sections")
  //   .select("*")
  //   .eq("name", "Banner Section")
  //   .single();

  // if (sectionError) {
  //   console.error("Error fetching section:", sectionError);
  //   return;
  // }

  // const sectionId = sectionData.id;

  // // Ab products aur images lete hain
  // const { data: productsData, error: productsError } = await supabase
  //   .from("products")
  //   .select("*")
  //   .eq(
  //     "id",
  //     supabase
  //       .from("user_selections")
  //       .select("product_id")
  //       .eq("section_id", sectionId)
  //   );

  // if (productsError) {
  //   console.error("Error fetching products:", productsError);
  //   return;
  // }

  // console.log("Banner Products:", productsData);
}

export const fetchSectionProducts = async (sectionId: string) => {
  console.log(sectionId);
  const { data, error } = await supabase
    .from("user_selections")
    .select(
      `
      product_id,
      products (
        id,
        name  ,
        image_url  ,
        price,
        href, description,nav_sections(slug)
       
      ),
      sections (
        name ,
        id
      )
    `
    )
    .eq("section_id", sectionId);

  if (error) throw error;

  return (
    data?.map((item) => ({
      product_id: item.product_id,
      title: item?.products?.name,
      description: item?.products?.description,
      imageUrl: item?.products?.image_url,
      price: item?.products?.price,
      link: item?.products?.href,
      slug: item?.products?.nav_sections?.slug,
      sectionName: item.sections?.name,
    })) ?? []
  );
};

export async function fetchSingleProduct(productId: any) {
  console.log(productId);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Error fetching section:", error);
    return;
  }

  return data;
}

export const fetchContacts = async () => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data || [];
};

export async function fetchVesselsData() {
  const { data, error } = await supabase.from("vessels").select("*");
  if (error) {
    console.error("Error fetching vessels:", error);
    toast.error("Failed to fetch vessels");
    return [];
  } else {
    // setVessels(data as Vessel[]);
    return data;
  }
}

export const fetchBenefitSectionProducts = async (sectionId: string) => {
  const { data, error } = await supabase
    .from("user_selections")
    .select(
      `
      product_id,
      products (
        id,
        name  ,
        image_url  ,
        price,
        description,
        href,nav_sections(slug),
        product_details(images)
      ),
      sections (
        name 
      )
    `
    )
    .eq("section_id", sectionId);
  console.log(data);
  if (error) throw error;

  return data?.map((item) => ({
    product_id: item.product_id,
    title: item?.products?.name,
    imageUrl: item?.products?.image_url,
    price: item?.products?.price,
    link: item?.products?.href,
    slug: item?.products?.nav_sections?.slug,
    description: item.products?.description,
    images: item.products?.product_details,
  }));
};
