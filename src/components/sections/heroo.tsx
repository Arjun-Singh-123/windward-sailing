"use client";
import { titleFormatter } from "@/lib/utils";
import { fetchSectionProducts } from "@/services/product-services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import Swiper, { SwiperOptions } from "swiper";
import "swiper/dist/css/swiper.min.css";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  const { data = [] } = useQuery({
    queryKey: ["hero-banner-images"],
    queryFn: () => fetchSectionProducts("Banner Section"),
  });

  const swiperRef = useRef<any>(null); // Ref to store Swiper instance

  // const slides = (data || []).filter((slide) => slide && slide.imageUrl);

  // Function to update the counter
  function slidedashfilled(ele: string, autoplayduration: number) {
    const interval = autoplayduration;
    const startTime = Date.now();
    animHelper(ele, interval, startTime);
  }

  // Helper function to handle animation
  function animHelper(ele: string, interval: number, startTime: number) {
    setTimeout(() => {
      const element = document.querySelector(ele) as HTMLElement;
      if (element) {
        element.style.setProperty("--pagination-dash-width", "0%");
        element.classList.add("animate");

        const timer = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          element.classList.add("animate");

          if (elapsedTime >= interval) {
            clearInterval(timer);
            element.classList.remove("animate");
          } else {
            const percentage = (elapsedTime / interval) * 100;
            element.style.setProperty(
              "--pagination-dash-width",
              `${percentage.toFixed(2)}%`
            );
          }
        }, 100); // Update every 100ms
      } else {
        animHelper(ele, interval, startTime);
      }
    }, 10);
  }

  useEffect(() => {
    console.log("useEffect: Initializing Swiper...");

    if (typeof window !== "undefined") {
      // Enforcing proper initialization without the conditional
      swiperRef.current = new Swiper(".swiper-container", {
        loop: true, // Ensure the slider loops
        autoplay: {
          delay: 5000, // Delay between slides
          disableOnInteraction: false, // Allow autoplay to continue even after user interaction
        },
        speed: 1000, // Slide transition speed
        parallax: true,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        pagination: {
          el: ".hero-slider .swiper-pagination",
          clickable: true,
          type: "fraction",
          formatFractionCurrent: function (number: number) {
            return ("0" + number).slice(-2);
          },
          formatFractionTotal: function (number: number) {
            return ("0" + number).slice(-2);
          },
        },

        on: {
          init() {
            const swiper: any = this;
            console.log("Swiper Initialized");
            var autoplayduration = swiper?.params?.autoplay.delay;
            slidedashfilled(
              ".hero-slider .swiper-pagination-current",
              autoplayduration
            );
          },
          slideChange() {
            const swiper: any = this;
            console.log("Slide Changed");
            var autoplayduration = swiper.params?.autoplay.delay;
            slidedashfilled(
              ".hero-slider .swiper-pagination-current",
              autoplayduration
            );
          },

          progress() {
            console.log("Swiper Progress Event Triggered");
            const swiper: any = this;
            var swiperSlides = Array.from(swiper?.slides);
            swiperSlides.forEach((slide: any) => {
              var slideProgress = slide.progress;
              var innerOffset = swiper.width * 0.5;
              var innerTranslate = slideProgress * innerOffset;
              slide.querySelector(
                ".slide-inner"
              )!.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
            });
          },

          touchStart() {
            console.log("Swiper Touch Started");
            const swiper: any = this;
            var swiperSlides = Array.from(swiper.slides);
            swiperSlides.forEach((slide: any) => {
              slide.style.transition = "";
            });
          },

          setTransition(speed: number) {
            console.log("Setting Swiper Transition Speed");
            const swiper: any = this;
            var swiperSlides = Array.from(swiper.slides);
            swiperSlides.forEach((slide: any) => {
              slide.style.transition = `${speed}ms`;
              slide.querySelector(
                ".slide-inner"
              )!.style.transition = `${speed}ms`;
            });
          },
        },
      });

      // Cleanup on component unmount
      return () => {
        console.log("Destroying Swiper instance");
        (swiperRef?.current as any)?.destroy();
      };
    }
  }, [data]);

  return (
    <div className="swiper hero-slider slider-section">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {data?.map((slide, index) => (
            <div className="swiper-slide" key={index}>
              <div className="slide-inner dark-overlay">
                <Image
                  src={slide.imageUrl ?? " "}
                  alt={`Slide ${index}`}
                  fill
                  loading="lazy"
                />
              </div>
              <div className="info">
                <p className="text-5xl text-white font-bold mb-6 tracking-tight">
                  {titleFormatter(slide?.title as string).firstPart}
                </p>
                <h1 className="text-xl mb-8 text-gray-200">
                  {titleFormatter(slide?.title as string).secondPart}
                </h1>
                <Button variant="solidWhiteOnDark">
                  <Link href={`/boats/${slide.slug || ""}/${slide.link || ""}`}>
                    {" "}
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Hero;
