"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { fetchSectionProducts } from "@/services/product-services";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: () => fetchSectionProducts("Banner Section"),
  });

  useEffect(() => {
    if (!data.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  if (!data?.length) return null
 




  return (
    <div
      className="relative w-full overflow-hidden hero"
      style={{ height: "calc(100vh)" }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 dark-overlay"
        >
          {data?.[currentSlide]?.imageUrl && (
            <Image
              src={data[currentSlide].imageUrl ?? ""}
              alt={data[currentSlide].title || "Slide image"}
              fill
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center zIndex3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <div className="max-w-2xl mx-auto text-center text-white">
              <h1 className="text-5xl font-bold mb-6 tracking-tight">
                {data?.[currentSlide]?.title}
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                {data?.[currentSlide]?.title}
              </p>
              <Link
                href={`/boats/${data?.[currentSlide]?.slug || ""}/${
                  data[currentSlide]?.link || ""
                }`}
                passHref
                className="w-28"
              >
                <Button
                  variant="solidWhiteOnDark"
                  className="py-3"
                >
                  View Details
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white w-4" : "bg-white/50"
            )}
          />
        ))}
      </div> */}
    </div>
  );
}
