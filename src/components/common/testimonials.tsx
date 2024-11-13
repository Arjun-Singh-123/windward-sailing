"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cursiveHeadingFont } from "@/app/ui/fonts";
import DecoratorLine from "./decorator-icon-line";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    id: 1,
    name: "Emily Jackson",
    image: "/images/sarah.jpg",
    text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
  },
  {
    id: 2,
    name: "Joseph Andrew",
    image: "/images/emily.jpg",
    text: "I recently celebrated my anniversary on this incredible yacht...",
  },
  {
    id: 3,
    name: "Milla Gabriel",
    image: "/images/joseph.jpg",
    text: "As a seasoned yacht enthusiast, I have experienced various vessels...",
  },
  {
    id: 4,
    name: "Alex Thompson",
    image: "/images/john.jpg",
    text: "The attention to detail on this yacht is simply outstanding...",
  },
  {
    id: 5,
    name: "Sarah Lee",
    image: "/images/john.jpg",
    text: "From the moment I stepped on board, I knew this would be an unforgettable experience...",
  },
];

export default function ImprovedTestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    return [
      testimonials[currentIndex % testimonials.length],
      testimonials[(currentIndex + 1) % testimonials.length],
      testimonials[(currentIndex + 2) % testimonials.length],
    ];
  };
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  //autoplay by embla api
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    // max-w-[300px]
    <div className="  max-w-full overflow-hidden mt-96  ">
      <div className="text-center">
        <h3
          className={`${cursiveHeadingFont.className} text-2xl text-[#13afe2]`}
        >
          Our Testimonials
        </h3>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mt-2 mb-8">
        Client&apos;s Feedback
      </h2>

      <DecoratorLine showLines={true} />

      <div className="overflow-visible mt-16  " ref={emblaRef}>
        <div className="flex">
          {getVisibleTestimonials()?.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="relative border-2 pt-12 border-t-blue-500 mb-12 min-h-[300px]">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-blue-500 ">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          width={96}
                          height={96}
                        />
                      </div>
                    </div>
                    <CardContent>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 text-center">
                          {testimonial.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 mb-20">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-3 h-3 rounded-full mx-1 p-0 ${
              index === selectedIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
