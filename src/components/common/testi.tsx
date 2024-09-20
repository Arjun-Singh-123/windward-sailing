"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cursiveHeadingFont } from "@/app/ui/fonts";
import DecoratorLine from "./decorator-icon-line";

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

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef(null);
  const controls = useAnimation();

  const visibleTestimonials = 3;
  const totalWidth = testimonials.length * 100; // Total width in percentage
  const slideWidth = 100 / visibleTestimonials; // Width of each slide

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const dragEndHandler = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    if (Math.abs(offset) > 50) {
      if (offset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    controls.start({ x: -currentIndex * slideWidth + "%" });
  };

  useEffect(() => {
    controls.start({ x: -currentIndex * slideWidth + "%" });
  }, [currentIndex, controls, slideWidth]);

  return (
    <div className="w-full overflow-hidden mb-0 pb-0">
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

      <div className="mt-16 relative" ref={constraintsRef}>
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: -totalWidth + 100, right: 0 }}
          dragElastic={0.1}
          onDragEnd={dragEndHandler}
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`flex flex-col md:flex-row w-full  px-4`}
              style={{ width: `${slideWidth}%` }}
            >
              <Card
                className={`relative border-2 pt-12 mb-12 min-h-[300px] transition-colors duration-300 ${
                  index === currentIndex
                    ? "border-t-blue-500"
                    : "border-t-gray-300"
                }`}
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {testimonial.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-6">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-3 h-3 rounded-full mx-1 p-0 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              controls.start({ x: -index * slideWidth + "%" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
