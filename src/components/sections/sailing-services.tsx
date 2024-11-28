"use client";
import { contentFont, cursiveHeadingFont } from "@/app/ui/fonts";
import { ToJoinHeader } from "../common/to-join-header";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { titleFormatter } from "@/lib/utils";
import { fetchSectionProducts } from "@/services/product-services";

// export const fetchSectionProducts = async (sectionName: string) => {
//   const { data, error } = await supabase
//     .from("user_selections")
//     .select(
//       `
//       product_id,
//       products (
//         id,
//         name  ,
//         image_url  ,
//         price,
//         description,
//         href,nav_sections(slug)

//       ),
//       sections (
//         name
//       )
//     `
//     )
//     .eq("section_id", "8af6b308-d7a6-4f02-9f96-b11567aaa3b6");

//   if (error) throw error;

//   return data.map((item) => ({
//     product_id: item?.product_id,
//     title: item?.products?.name,
//     imageUrl: item?.products?.image_url,
//     price: item?.products?.price,
//     link: item?.products?.href,
//     slug: item?.products?.nav_sections?.slug,
//     description: item.products?.description,
//   }));
// };

export default function SailingServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const { data } = useQuery({
    queryKey: ["cards-data"],
    queryFn: () =>
      fetchSectionProducts("8af6b308-d7a6-4f02-9f96-b11567aaa3b6") ?? [],
  });

  useEffect(() => {
    setShouldScroll((data || []).length >= 4);
  }, [data]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !shouldScroll) return;

    let animationId: number;
    let startTime: number | null = null;
    const totalDuration = 50000;

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (isScrolling && scrollContainer) {
        const progress = (elapsed % totalDuration) / totalDuration;
        const scrollAmount = progress * scrollContainer.scrollWidth;
        scrollContainer.scrollLeft = scrollAmount;

        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          startTime = timestamp;
          scrollContainer.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isScrolling, shouldScroll, (data || []).length]);

  const cardWidth = 320;
  const cardHeight = 400;

  // Auto-move the slider
  useEffect(() => {
    if (data && data?.length) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [data?.length]);

  const visibleBoats = [
    ...(data || []),
    ...(data || []),
    ...(data || []).slice(0, cardsToShow),
  ].slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="w-full section-py-80">
      <div className="">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl text-darkBlue font-bold text-center mb-4 ${cursiveHeadingFont.className}`}
        >
          Newport Sailing Club
        </h2>
        {shouldScroll ? (
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex overflow-x-scroll space-x-6 py-2"
              style={{
                width: "100%",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onMouseEnter={() => setIsScrolling(false)}
              onMouseLeave={() => setIsScrolling(true)}
            >
              {[...(data || []), ...(data || []), ...(data || [])]?.map(
                (boat, index) => {
                  return (
                    <Card
                      key={`${boat.product_id}-${index}`}
                      className="flex flex-col justify-between shrink-0 p-2 overflow-hidden bg-lightSky transition-all duration-300 hover:shadow-2xl hover:bg-darkBlue hover:text-white text-darkBlue rounded-md relative cardbox"
                      style={{
                        width: `${cardWidth}px`,
                        // height: `${cardHeight}px`,
                        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Link
                        href={`/boats/${boat.slug || ""}/${boat.link || ""}`}
                        passHref
                        className="box-link"
                      ></Link>
                      <CardContent className="p-6 pb-0 flex-grow">
                        <CardTitle className="text-2xl font-semibold mb-4">
                          <div className={`${contentFont.className}  `}>
                            <p className="text-xs uppercase font-regular400 tracking-widest  ">
                              {titleFormatter(boat?.title as string)?.firstPart}
                            </p>
                            <p className="uppercase font-regular400 ">
                              {
                                titleFormatter(boat?.title as string)
                                  ?.secondPart
                              }
                            </p>
                          </div>
                        </CardTitle>
                        <p className="text-base line-clamp-6">
                          {boat.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6">
                        <Link
                          href={`/boats/${boat.slug || ""}/${boat.link || ""}`}
                          passHref
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            className="w-full text-lg py-3 rounded-full hover:shadow-md"
                          >
                            View Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                }
              )}
            </div>
          </div>
        ) : (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
            {data?.map((boat, index) => {
              console.log("object", boat?.title?.split(" "));
              const titleParts = boat?.title
                ?.split(" ")
                .map((part) => part.replace(/\\/g, "").replace(/'/g, ""));

              console.log(titleParts);
              // const titleParts = boat?.title?.split(" ");
              const manufacturer = titleParts?.[0];
              // Combine first two parts and store the last part separately
              const combinedName = `${titleParts?.[0]}${titleParts?.[1]}`; // 'Duffield 18'
              const splashPart = titleParts?.[2]; // 'SPLASH'
              console.log(combinedName);
              // const model = titleParts?.slice(1, -1).join(" ");
              // console.log(model);
              const length = titleParts?.[titleParts.length - 1];
              return (
                <Card
                  key={`${boat.product_id}-${index}`}
                  className="flex flex-col justify-between shrink-0 p-2 overflow-hidden bg-lightSky transition-all duration-300 hover:shadow-2xl hover:bg-darkBlue hover:text-white text-black rounded-md relative"
                  style={{
                    width: `${cardWidth}px`,
                    // height: `${cardHeight}px`,
                    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <Link
                    href={`/boats/${boat.slug || ""}/${boat.link || ""}`}
                    passHref
                    className="box-link"
                  ></Link>
                  <CardContent className="p-6 pb-0 flex-grow">
                    <CardTitle className="text-2xl   mb-4">
                      <div className={`${contentFont.className}  `}>
                        <p className="text-xs uppercase font-regular400 tracking-widest  ">
                          {combinedName}
                        </p>
                        <p className=" font-regular400 ">{splashPart}</p>
                      </div>
                    </CardTitle>
                    <p className="text-base line-clamp-6">{boat.description}</p>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Link
                      href={`/boats/${boat.slug || ""}/${boat.link || ""}`}
                      passHref
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full     text-lg py-3 hover:shadow-md"
                      >
                        View Details
                        <ChevronRight className="ml-2 h-5 w-5    " />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
