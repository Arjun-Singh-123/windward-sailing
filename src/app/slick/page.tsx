"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// You need to add these CSS files to your project
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Autoplay } from "swiper/modules";
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
export default function ResponsiveCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = Array(5)
          .fill(0)
          .map(() =>
            fetch(
              "https://fastly.picsum.photos/id/356/300/200.jpg?hmac=uvy_on5JQ9Bq8sHwcuVFCelljBkrvcHhByvWcRIPugk"
            ).then((response) => response.url)
          );
        const fetchedImages = await Promise.all(imagePromises);
        setImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,

    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 m-6">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-2">
            <Card>
              <CardContent className="p-0 text-center">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s testimonial`}
                  className="h-24 w-24 rounded-full object-cover mx-auto mt-4"
                />
                <p className="mt-2 font-semibold">{testimonial.name}</p>
                <span className="block px-4 pb-4 text-sm">
                  {testimonial.text}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>

    // <div className="w-full max-w-4xl mx-auto px-4">
    //   <Slider {...settings}>
    //     {loading
    //       ? Array(5)
    //           .fill(0)
    //           .map((_, index) => (
    //             <div key={index} className="p-2">
    //               <Card>
    //                 <CardContent className="p-0">
    //                   <Skeleton className="h-48 w-full" />
    //                 </CardContent>
    //               </Card>
    //             </div>
    //           ))
    //       : images.map((image, index) => (
    //           <div key={index} className="p-2">
    //             <Card>
    //               <CardContent className="p-0 text-center">
    //                 <img
    //                   src={image}
    //                   alt={`Random image ${index + 1}`}
    //                   className="  h-24 w-24 rounded-full  object-cover"
    //                 />
    //                 <p>Name: Appteg</p>
    //                 <span>Images for test purpose only</span>
    //               </CardContent>
    //             </Card>
    //           </div>
    //         ))}
    //   </Slider>
    // </div>
  );
}
