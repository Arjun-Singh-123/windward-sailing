"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { contentFont, cursiveHeadingFont, mainHeadingFont } from "../ui/fonts";
import DecoratorLine from "@/components/common/decorator-icon-line";

interface MemberProps {
  name: string;
  image: string;
  about?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

const MemberCard: React.FC<MemberProps> = ({
  name,
  image,
  about,
  email,
  phone,

  isActive,
}) => {
  console.log("Rendering MemberCard:", { isActive });
  return (
    <Card
      className={`relative rounded-none border border-flatBlue pt-20 ${
        isActive ? "md:border-flatBlue" : "md:border-black"
      } h-[400px]`}
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div
          className={`w-20 h-20 rounded-full overflow-hidden  ${
            isActive ? "border-2 border-flatBlue" : "border-2 border-gray-300"
          }   shadow-lg`}
        >
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            width={128}
            height={128}
          />
        </div>
      </div>
      <CardContent className="flex flex-col justify-between h-full pt-4">
        <div>
          <h2
            className={`text-xl font-semibold  ${mainHeadingFont.className} text-center text-flatBlue mb-4`}
          >
            {name}
          </h2>
          <p
            className={`text-sm text-justify  ${contentFont.className} mb-6 text-center`}
          >
            {about}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const members: MemberProps[] = [
  {
    name: "John Doe",
    image: "/images/sarah.jpg?height=128&width=128",
    about:
      "Our family booked a week-long yacht charter and it exceeded all our expectations. The yacht was spacious and well-maintained, providing a comfortable and enjoyable experience for all of us. The crew was exceptional, going above and beyond to make sure we had everything we needed. We visited stunning destinations, indulged in delicious meals prepared by the onboard chef, and enjoyed various water sports activities. It was the perfect getaway, and we would definitely book this yacht again in the future.",
    email: "john@example.com",
    phone: "+1234567890",
  },
  {
    name: "Jane Smith",
    image: "/images/mic.jpg?height=128&width=128",
    about:
      "Our family booked a week-long yacht charter and it exceeded all our expectations. The yacht was spacious and well-maintained, providing a comfortable and enjoyable experience for all of us. The crew was exceptional, going above and beyond to make sure we had everything we needed. We visited stunning destinations, indulged in delicious meals prepared by the onboard chef, and enjoyed various water sports activities. It was the perfect getaway, and we would definitely book this yacht again in the future.",
    email: "jane@example.com",
    phone: "+0987654321",
  },
  {
    name: "Bob Johnson",
    image: "/images/emily.jpg?height=128&width=128",
    about:
      " Our family booked a week-long yacht charter and it exceeded all our expectations. The yacht was spacious and well-maintained, providing a comfortable and enjoyable experience for all of us. The crew was exceptional, going above and beyond to make sure we had everything we needed. We visited stunning destinations, indulged in delicious meals prepared by the onboard chef, and enjoyed various water sports activities. It was the perfect getaway, and we would definitely book this yacht again in the future.",
    email: "bob@example.com",
    phone: "+1122334455",
  },
  {
    name: "Alice Brown",
    image: "/images/sarah.jpg?height=128&width=128",
    about:
      " Our family booked a week-long yacht charter and it exceeded all our expectations. The yacht was spacious and well-maintained, providing a comfortable and enjoyable experience for all of us. The crew was exceptional, going above and beyond to make sure we had everything we needed. We visited stunning destinations, indulged in delicious meals prepared by the onboard chef, and enjoyed various water sports activities. It was the perfect getaway, and we would definitely book this yacht again in the future.",
    email: "alice@example.com",
    phone: "+5566778899",
  },
  {
    name: "Charlie Wilson",
    image: "/images/sarah.jpg?height=128&width=128",
    about:
      "Our family booked a week-long yacht charter and it exceeded all our expectations. The yacht was spacious and well-maintained, providing a comfortable and enjoyable experience for all of us. The crew was exceptional, going above and beyond to make sure we had everything we needed. We visited stunning destinations, indulged in delicious meals prepared by the onboard chef, and enjoyed various water sports activities. It was the perfect getaway, and we would definitely book this yacht again in the future.",
    email: "charlie@example.com",
    phone: "+9988776655",
  },
];

export default function MemberCarousel() {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrent(selectedIndex);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <div className="text-center mb-14">
          <h3
            className={`${cursiveHeadingFont.className} text-2xl text-[#13afe2]`}
          >
            Our Testimonials
          </h3>

          <h2
            className={`text-4xl sm:text-3xl ${mainHeadingFont.className}  text-center text-black    `}
          >
            Client&apos;s Feedback
          </h2>
          <DecoratorLine showLines={true} />
        </div>

        <CarouselContent className="-ml-2 md:-ml-4  ">
          {members?.map((member, index) => {
            console.log("scroll snap number", api?.selectedScrollSnap());
            console.log("index number", index);

            return (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className={`${
                    index === current ? "scale-100" : "scale-100   "
                  } transition-all duration-300 h-full`}
                >
                  <MemberCard {...member} isActive={current === index - 1} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* <div className="hidden md:block"> */}
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
        {/* </div> */}
      </Carousel>
      <div className="flex justify-center mt-8">
        {members.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-3 h-3 rounded-full mx-1 p-0 ${
              index === current ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
