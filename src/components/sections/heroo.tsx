"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
const carouselItems = [
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1672280727393-ab6f0b26f527?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Explore Nature",
    description: "Discover the beauty of the natural world",
    link: "/nature",
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1672280727393-ab6f0b26f527?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Urban Adventures",
    description: "Experience the excitement of city life",
    link: "/city",
  },
  {
    imageUrl: "https://source.unsplash.com/random/1600x800?food",
    title: "Culinary Delights",
    description: "Savor the flavors of exquisite cuisine",
    link: "/food",
  },
  {
    imageUrl: "https://source.unsplash.com/random/1600x800?technology",
    title: "Tech Innovations",
    description: "Explore the latest in cutting-edge technology",
    link: "/technology",
  },
  {
    imageUrl: "https://source.unsplash.com/random/1600x800?art",
    title: "Artistic Wonders",
    description: "Immerse yourself in the world of art",
    link: "/art",
  },
];

async function fetchBannerProducts() {
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

export const fetchSectionProducts = async (sectionName: string) => {
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
        href,nav_sections(slug)
      ),
      sections (
        name 
      )
    `
    )
    .eq("sections.name", sectionName);

  if (error) throw error;

  return data.map((item) => ({
    product_id: item.product_id,
    title: item?.products?.name,
    imageUrl: item?.products?.image_url,
    price: item?.products?.price,
    link: item?.products?.href,
    slug: item?.products?.nav_sections?.slug,
  }));
};

export default function Heroo() {
  const { data } = useQuery({
    queryKey: ["banner"],
    queryFn: () => fetchSectionProducts("Banner Section"),
  });

  return (
    <Carousel className="">
      <CarouselContent>
        {data?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="flex   items-center justify-center   relative w-full">
                  <Image
                    src={item.imageUrl ?? ""}
                    alt="default"
                    width={1600}
                    height={800}
                    className="w-full h-auto md:h-[57rem] object-cover "
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4"> */}
                  <div className="absolute top-62 left-152 bg-gray-100   bg-opacity-15   flex flex-col items-center justify-center  text-black p-8 rounded-md">
                    <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
                    {/* <p className="text-xl mb-4">{item?.description}</p> */}
                    <Link href={`/boats/${item.slug || ""}/${item.link || ""}`}>
                      <Button variant="default" size="lg">
                        View More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
