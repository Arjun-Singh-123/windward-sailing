"use client";
// src/app/products/[id]/page.tsx
import React from "react";

import VesselAmenities from "@/components/sections/amenity";
import Heroo from "@/components/sections/heroo";
import YachtGallery, {
  SpecificationsSection,
} from "@/components/sections/specification";
// import { fetchProductDetails } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import * as z from "zod";
const mockData: any = {
  1: {
    title: "Product 1",
    description: "Description for Product 1",
    image: "/path/to/image1.jpg",
  },
  2: {
    title: "Product 2",
    description: "Description for Product 2",
    image: "/path/to/image2.jpg",
  },
  3: {
    title: "Product 1",
    description: "Description for Product 1",
    image: "/path/to/image1.jpg",
  },
  4: {
    title: "Product 2",
    description: "Description for Product 2",
    image: "/path/to/image2.jpg",
  },
  5: {
    title: "Product 1",
    description: "Description for Product 1",
    image: "/path/to/image1.jpg",
  },
  6: {
    title: "Product 2",
    description: "Description for Product 2",
    image: "/path/to/image2.jpg",
  },
};
interface PageProps {
  params: {
    id: string;
  };
}
// This function generates static parameters for each product
// export function generateStaticParams() {
//   return Object.keys(mockData).map((key) => ({
//     id: key, // Use the product ID as the slug
//   }));
// }

const ExternalImages = [
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4543.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4544.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4545.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4546.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4547.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4548.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4549.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4550.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4551.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4552.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4553.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4554.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
];

const InternalImages = [
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4629.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4630.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4631.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4632.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4633.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4634.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4635.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4636.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4637.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4638.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4639.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4640.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
];

// Fetch function
const fetchProductDetails = async () => {
  const { data, error } = await supabase.from("product_details").select("*");

  if (error) throw error;

  // Validate data with Zod
  // const validatedData = productDetailSchema.parse(data[0]);
  return data;
};
const ProductPage = ({ params }: PageProps) => {
  const { id } = params; // Get the product ID from the params

  const product = mockData[id]; // Fetch the product data based on the ID

  const { data } = useQuery({
    queryKey: ["product-details"],
    queryFn: fetchProductDetails,
  });

  // const validatedData = productDetailSchema.parse(data); // Zod ensures defaults
  // const {
  //   title,
  //   subtitle,
  //   description,
  //   hero_image,
  //   icon,
  //   images: { internal, external },
  //   amenities,
  //   specifications,
  // } = validatedData;

  // const {
  //   images: { internal = [], external = [] } = {},
  // } = data || {};

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }
  // const product = mockData[id as string];

  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  return (
    <div className="flex flex-col items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col items-center sm:items-start gap-4">
        <section className="w-full">
          <Heroo />
        </section>

        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl">
            <VesselAmenities />
          </div>
        </section>

        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl">
            <YachtGallery images={ExternalImages} title="Exterior Photos" />
          </div>
        </section>

        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl">
            {" "}
            <YachtGallery images={InternalImages} title="Interior Photos" />
          </div>
        </section>

        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl">
            {" "}
            <SpecificationsSection />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;

// import { fetchProductDetails } from "@/lib/services";
// import Image from "next/image";

// export default async function ProductPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const product = await fetchProductDetails(params.id);
//   console.log("checking detail page data", product);
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <Image
//             src={product.image_url ?? "/images/john.jpg"}
//             alt={product.name ?? "HELLO"}
//             width={600}
//             height={600}
//             className="w-full h-auto object-cover rounded-lg"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
//           <p className="text-gray-600 mb-6">{product.description}</p>
//           <h2 className="text-xl font-semibold mb-2">Specifications</h2>
//           <ul className="list-disc pl-5 mb-6">
//             {Object.entries(product.specifications ?? {}).map(
//               ([key, value]) => (
//                 <li key={key}>
//                   <span className="font-medium">{key}:</span>{" "}
//                   {JSON.stringify(value)} {/* Convert object to string */}
//                 </li>
//               )
//             )}
//           </ul>
//           <h2 className="text-xl font-semibold mb-2">Features</h2>
//           <ul className="list-disc pl-5">
//             {product?.features?.map((feature, index) => (
//               <li key={index}>{feature}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
