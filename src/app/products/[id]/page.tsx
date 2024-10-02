"use client";
// src/app/products/[id]/page.tsx
import React from "react";

import { useParams } from "next/navigation";

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
    <div className="container mx-auto">
      {/* Hero Area */}
      <div className="hero bg-gray-200 p-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      </div>
      {/* Description Section */}
      <div className="description p-8">
        <p className="text-lg">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
