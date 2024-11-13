// import { supabase } from "@/lib/supabase";

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
