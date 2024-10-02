// "use client";

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// // You need to add these CSS files to your project
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Autoplay } from "swiper/modules";
// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/sarah.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
//   },
//   {
//     id: 2,
//     name: "Joseph Andrew",
//     image: "/images/emily.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht...",
//   },
//   {
//     id: 3,
//     name: "Milla Gabriel",
//     image: "/images/joseph.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels...",
//   },
//   {
//     id: 4,
//     name: "Alex Thompson",
//     image: "/images/john.jpg",
//     text: "The attention to detail on this yacht is simply outstanding...",
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     image: "/images/john.jpg",
//     text: "From the moment I stepped on board, I knew this would be an unforgettable experience...",
//   },
// ];
// export default function ResponsiveCarousel() {
//   const [images, setImages] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const imagePromises = Array(5)
//           .fill(0)
//           .map(() =>
//             fetch(
//               "https://fastly.picsum.photos/id/356/300/200.jpg?hmac=uvy_on5JQ9Bq8sHwcuVFCelljBkrvcHhByvWcRIPugk"
//             ).then((response) => response.url)
//           );
//         const fetchedImages = await Promise.all(imagePromises);
//         setImages(fetchedImages);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,

//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 3000,
//     autoplaySpeed: 5000,
//     cssEase: "linear",
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 m-6">
//       <Slider {...settings}>
//         {testimonials.map((testimonial) => (
//           <div key={testimonial.id} className="p-2">
//             <Card>
//               <CardContent className="p-0 text-center">
//                 <img
//                   src={testimonial.image}
//                   alt={`${testimonial.name}'s testimonial`}
//                   className="h-24 w-24 rounded-full object-cover mx-auto mt-4"
//                 />
//                 <p className="mt-2 font-semibold">{testimonial.name}</p>
//                 <span className="block px-4 pb-4 text-sm">
//                   {testimonial.text}
//                 </span>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </Slider>
//     </div>

//     // <div className="w-full max-w-4xl mx-auto px-4">
//     //   <Slider {...settings}>
//     //     {loading
//     //       ? Array(5)
//     //           .fill(0)
//     //           .map((_, index) => (
//     //             <div key={index} className="p-2">
//     //               <Card>
//     //                 <CardContent className="p-0">
//     //                   <Skeleton className="h-48 w-full" />
//     //                 </CardContent>
//     //               </Card>
//     //             </div>
//     //           ))
//     //       : images.map((image, index) => (
//     //           <div key={index} className="p-2">
//     //             <Card>
//     //               <CardContent className="p-0 text-center">
//     //                 <img
//     //                   src={image}
//     //                   alt={`Random image ${index + 1}`}
//     //                   className="  h-24 w-24 rounded-full  object-cover"
//     //                 />
//     //                 <p>Name: Appteg</p>
//     //                 <span>Images for test purpose only</span>
//     //               </CardContent>
//     //             </Card>
//     //           </div>
//     //         ))}
//     //   </Slider>
//     // </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

interface MemberProps {
  name: string;
  image: string;
  about?: string;
  email?: string;
  phone?: string;
  current?: number;
  index?: number;
}

const MemberCard: React.FC<MemberProps> = ({
  name,
  image,
  about,
  email,
  phone,
  current,
  index,
}) => (
  <Card
    className={`relative border-2 pt-20 ${
      current! + 1 === index && "border-blue-500"
    } h-[400px]`}
  >
    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
      <div className="w-32 h-32 rounded-full overflow-hidden  border-8 border-white shadow-lg">
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
        <h2 className="text-2xl font-semibold text-center mb-4">{name}</h2>
        <p className="text-sm mb-6 text-center">{about}</p>
      </div>
    </CardContent>
  </Card>
);

const members: MemberProps[] = [
  {
    name: "John Doe",
    image: "/images/sarah.jpg?height=128&width=128",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "john@example.com",
    phone: "+1234567890",
  },
  {
    name: "Jane Smith",
    image: "/images/sarah.jpg?height=128&width=128",
    about:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    email: "jane@example.com",
    phone: "+0987654321",
  },
  {
    name: "Bob Johnson",
    image: "/images/sarah.jpg?height=128&width=128",
    about:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    email: "bob@example.com",
    phone: "+1122334455",
  },
  {
    name: "Alice Brown",
    image: "/images/sarah.jpg?height=128&width=128",
    about:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    email: "alice@example.com",
    phone: "+5566778899",
  },
  {
    name: "Charlie Wilson",
    image: "/placeholder.svg?height=128&width=128",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "charlie@example.com",
    phone: "+9988776655",
  },
];

export default function MemberCarousel() {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16  ">
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
        <CarouselContent className="-ml-2 md:-ml-4 ">
          {members?.map((member, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div
                className={`${
                  index === current ? "scale-100" : "scale-100 opacity-70"
                } transition-all duration-300 h-full`}
              >
                <MemberCard {...member} current={current} index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </div>
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
