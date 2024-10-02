"use client";
// src/app/products/[id]/page.tsx
import React from "react";

import { useParams } from "next/navigation";
import VesselAmenities from "@/components/sections/amenity";
import Heroo from "@/components/sections/heroo";
import YachtGallery, {
  SpecificationsSection,
} from "@/components/sections/specification";
// src/components/common/hero-image.tsx

const HeroImage = () => {
  return (
    <div
      className="w-full h-64 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
    >
      <h2 className="text-3xl text-white text-center pt-24">
        Welcome to Our Club
      </h2>
    </div>
  );
};

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
  // Add more mock products as needed
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

    // <div className="container mx-auto">
    //   {/* Hero Area */}
    //   <div className="hero bg-gray-200 p-8">
    //     <img
    //       src={product.image}
    //       alt={product.title}
    //       className="w-full h-64 object-cover"
    //     />
    //     <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
    //   </div>

    //   <VesselAmenities />
    //   {/* Description Section */}
    //   <div className="description p-8">
    //     <p className="text-lg">{product.description}</p>
    //   </div>
    // </div>
  );
};

export default ProductPage;
