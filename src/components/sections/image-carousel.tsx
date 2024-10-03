"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR1",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "/images/sarah.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR2",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "/images/emily.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR3",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR4",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR1",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR2",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR3",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR4",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR1",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR2",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR3",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "/images/about.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR4",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
];

export default function Component() {
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent className="-ml-2 md:-ml-4">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={`pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/${itemsPerView}`}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-medium text-center">
                    {image.caption}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4 space-x-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
