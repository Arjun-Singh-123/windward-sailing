"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  title: string;
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ title, images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= images.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 4 < 0 ? Math.max(images.length - 4, 0) : prevIndex - 4
    );
  };

  return (
    <div className="mb-8 px-4 py-2 w-full">
      <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">{title}</h2>
      <div className="relative w-full">
        <div className="flex space-x-4 overflow-hidden w-full px-2">
          {images.slice(currentIndex, currentIndex + 4).map((image, index) => (
            <Card key={index} className="border-[#1e40af] flex-shrink-0 w-1/4">
              <CardContent className="p-0">
                <img
                  src={`/images/${image}`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImageGallery;
