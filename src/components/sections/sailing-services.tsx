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
const services = [
  {
    title: "Captain Your Own Boat",
    description:
      "Experienced sailors can select any boat from our fleet. Our mechanics keep the boats in top condition. Members rent boats for a day cruise or a trip to Catalina or other coastal ports. We will help you with how docking works, where to go and good places at the destinations. Show up, load up and go. We take care of all the boat preparation.",
  },
  {
    title: "Learn To Be The Captain",
    description:
      "At Windward Sailing Club, You are the Captain! All it takes to sail our boats is the successful completion of our thorough, private, and individualized instructional program or on-the-water certification ride. Before you know it, you'll be captaining one of our vessels as if it were your own.",
  },
  {
    title: "Everyone can Captain a Duffy Boat",
    description:
      "Renting a Duffy boat in Newport Beach Bay offers a relaxing and enjoyable way to explore the scenic waterfront. These electric boats glide smoothly across the calm waters, allowing you to take in the beauty of the surrounding homes, yachts, and nature at your own pace. Enjoy a tranquil experience as you cruise past charming waterfront homes, harbors, and the iconic Balboa Island. Whether you're with friends, family, work team building or on a romantic outing, a Duffy boat provides a cozy and intimate setting to enjoy a picnic, sip on drinks, and soak in the sunset over the bay. The ease of operation makes it accessible for all, adding to the carefree enjoyment of Newport Beach’s coastal charm.",
  },
  {
    title: "Your Cruise — With our Captain at the Helm ",
    description:
      "As soon as you board, you can customize your sailing charter to suit your preferences. One option is to swim, snorkel, and unwind on a Catalina. Alternatively, you can use Windward's vessels to entertain clients, mark special occasions, amuse your family, and then have dinner at one of the many establishments that offer guest docking. Our fleet consists of a wide range of boats that can hold 6-8 passengers overnight and range in size from 28-44 feet.",
  },
];

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
        description,
        href,nav_sections(slug)
        
      ),
      sections (
        name 
      )
    `
    )
    .eq("section_id", "8af6b308-d7a6-4f02-9f96-b11567aaa3b6");

  if (error) throw error;

  return data.map((item) => ({
    product_id: item?.product_id,
    title: item?.products?.name,
    imageUrl: item?.products?.image_url,
    price: item?.products?.price,
    link: item?.products?.href,
    slug: item?.products?.nav_sections?.slug,
    description: item.products?.description,
  }));
};

export default function SailingServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const { data } = useQuery({
    queryKey: ["cards-data"],
    queryFn: () => fetchSectionProducts("HIghlighted Cards") ?? [],
  });

  useEffect(() => {
    setShouldScroll((data || []).length >= 4);
  }, [data]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !shouldScroll) return;

    let animationId: number;
    let startTime: number | null = null;
    const totalDuration = 50000; // Total time to scroll through all cards (ms)

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (isScrolling && scrollContainer) {
        const progress = (elapsed % totalDuration) / totalDuration;
        const scrollAmount = progress * scrollContainer.scrollWidth;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset scroll position when reaching the end
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

  const cardWidth = 320; // Increased card width
  const cardHeight = 400; // Increased card height

  // useEffect(() => {
  //   if (data && data?.length > cardsToShow) {
  //     const timer = setInterval(() => {
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex + cardsToShow >= data?.length ? 0 : prevIndex + 1
  //       );
  //     }, 5000);

  //     return () => clearInterval(timer);
  //   }
  // }, [data?.length]);
  // const visibleBoats = data?.slice(currentIndex, currentIndex + cardsToShow);

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
    <div className="w-full py-16">
      <div className="">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl text-blue-900 font-bold text-center mb-12 ${cursiveHeadingFont.className}`}
        >
          Newport Sailing Club
        </h2>
        {shouldScroll ? (
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex     overflow-x-scroll space-x-6 pb-6 pt-2"
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
                      className="flex flex-col justify-between shrink-0 p-2 overflow-hidden bg-lightSky transition-all duration-300 hover:shadow-2xl hover:bg-darkBlue hover:text-white text-black  rounded-md"
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                      }}
                    >
                      <CardContent className="p-6 flex-grow">
                        <CardTitle className="text-2xl font-semibold mb-4">
                          <div className={`${contentFont.className}  `}>
                            <p className="text-xs uppercase font-regular400 tracking-widest  ">
                              {combinedName}
                            </p>
                            <p className=" font-regular400 ">{splashPart}</p>
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
                            className="w-full      text-lg py-3   hover:shadow-md"
                          >
                            View Details
                            <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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
                  className="flex flex-col justify-between shrink-0 p-2 overflow-hidden bg-lightSky transition-all duration-300 hover:shadow-2xl hover:bg-darkBlue hover:text-white text-black  rounded-md"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <CardContent className="p-6 flex-grow">
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

    // <div className="w-full px-4 py-8 bg-gray-50">
    //   <h2
    //     className={`text-4.5xl text-black font-bold text-center mb-8 ${cursiveHeadingFont.className}`}
    //   >
    //     Newport Sailing Club
    //   </h2>
    //   <div
    //     className="flex gap-4 transition-transform duration-1000 ease-in-out"
    //     // style={{
    //     //   transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
    //     // }}
    //   >
    //     {visibleBoats?.map((boat) => (
    //       <Card
    //         key={boat.product_id}
    //         className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 h-64 flex flex-col"
    //         // className="min-w-[calc(100%/4)] lg:min-w-[calc(100%/4)] overflow-hidden"
    //       >
    //         {/* <CardHeader className="p-0">
    //           <div className="relative h-48 w-full">
    //             <Image
    //               src={boat.imageUrl ?? ""}
    //               alt={boat.title}
    //               layout="fill"
    //               objectFit="cover"
    //             />
    //           </div>
    //         </CardHeader> */}
    //         <CardContent className="p-4 flex flex-col flex-grow">
    //           <CardTitle className="text-xl font-semibold mb-2 text-blue-800">
    //             {boat.title}
    //           </CardTitle>
    //           <p className="text-gray-600 text-sm mb-4 line-clamp-3">
    //             {boat.description}
    //           </p>
    //           <p className="text-lg font-bold text-green-600">
    //             {/* ${boat.price}/day */}
    //           </p>
    //         </CardContent>
    //         <CardFooter className="mt-auto">
    //           <Link
    //             href={`/boats/${boat.slug || ""}/${boat.link || ""}`}
    //             passHref
    //           >
    //             <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
    //               View Details
    //               <ChevronRight className="ml-2 h-4 w-4" />
    //             </Button>
    //           </Link>
    //         </CardFooter>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
  );
}
