"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import AutoPlay from "embla-carousel-autoplay";
interface Destination {
  emoji: string;
  value: number;
  label: string;
  bgColor: string;
  isCenter: boolean;
}
const stats = [
  { emoji: "🌍", value: 775, label: "DESTINATION", bgColor: "bg-blue-200" },
  { emoji: "😊", value: 5125, label: "SATISFIED", bgColor: "bg-green-200" },
  { emoji: "⛵", value: 100, label: "SKIPPERS", bgColor: "bg-yellow-200" },
  { emoji: "🚢", value: 200, label: "BOATS", bgColor: "bg-red-200" },
  { emoji: "🏴", value: 50, label: "COUNTRIES", bgColor: "bg-purple-200" },
];

const StatItem = ({ emoji, value, label, bgColor, isCenter }: Destination) => (
  <div
    className={`flex gap-3  items-center justify-center transition-all duration-300 ${
      isCenter ? "scale-150" : "scale-100 opacity-70"
    }`}
  >
    <div
      className={`w-20 h-20 rounded-full ${bgColor} bg-opacity-50 flex items-center justify-center mb-2`}
    >
      <span className="text-4xl">{emoji}</span>
    </div>

    <div>
      <div className="text-4xl font-bold text-white">
        {value.toLocaleString()}
      </div>
      <div className="text-xl text-white">{label}</div>
    </div>
  </div>
);

export default function StatsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [WheelGesturesPlugin(), AutoPlay({ delay: 3000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full bg-blue-600 bg-opacity-80 overflow-hidden  bg-custom p-8  ">
      <div className="max-w-screen-xl mx-auto py-8 overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container  flex ">
            {[...stats, ...stats, ...stats].map((stat, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-4"
              >
                <StatItem
                  {...stat}
                  isCenter={index % stats.length === selectedIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-blue-600 to-transparent pointer-events-none" /> */}
    </div>
  );
}
