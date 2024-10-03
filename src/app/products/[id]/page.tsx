"use client";
// src/app/products/[id]/page.tsx
import React from "react";

import { useParams } from "next/navigation";
import VesselAmenities from "@/components/sections/amenity";
import Heroo from "@/components/sections/heroo";
import YachtGallery, {
  SpecificationsSection,
} from "@/components/sections/specification";

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
};

const ProductPage = () => {
  const { id } = useParams();

  const product = mockData[id as string];

  if (!product) {
    return <div>Product not found</div>;
  }

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

        {/* Fixed Width Section 2 */}
        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl">
            <YachtGallery />
          </div>
        </section>

        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl">
            {" "}
            <YachtGallery />
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
