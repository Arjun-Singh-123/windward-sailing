"use client";

import React from "react";
import StatItem from "../boat-section/boat-stats-item";
import { stats } from "@/constants";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
interface Destination {
  emoji: string;
  value: number;
  label: string;
  bgColor: string;
  isCenter: boolean;
}

export default function ContinuousStatsSlider() {
  const { containerRef, offset } = useInfiniteScroll({ speed: 50 });

  return (
    <div className="relative w-full bg-blue-600 bg-opacity-80 bg-custom overflow-hidden section-py-80">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative" ref={containerRef}>
          <div
            className="flex whitespace-nowrap"
            style={{
              transform: `translateX(${-offset}px)`,
            }}
          >
            {[...stats, ...stats].map((stat, index) => (
              <div
                key={index}
                className="inline-block px-4"
                style={{ minWidth: "300px" }}
              >
                <StatItem {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
