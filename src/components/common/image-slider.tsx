"use client";

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const images = [
  "/images/emily.jpg",
  "/images/emily.jpg",
  "/images/sarah.jpg",
  "/images/sarah.jpg",
  "/images/sarah.jpg",
  "/images/sarah.jpg",
  "/images/sarah.jpg",
  "/images/emily.jpg",
];

export default function ResponsiveImageCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div className="w-full max-w-full overflow-hidden mx-auto px-4 py-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setApi}
        onSelect={onSelect}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>

    // <div className="w-full max-w-6xl mx-auto px-4 py-16">
    //   <Carousel
    //     opts={{
    //       align: "start",
    //       loop: true,
    //     }}
    //     className="w-full"
    //     setApi={setApi}
    //     onSelect={onSelect}
    //   >
    //     <CarouselContent className="-ml-2 md:-ml-4">
    //       {images.map((image, index) => (
    //         <CarouselItem
    //           key={index}
    //           className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
    //         >
    //           <Card>
    //             <CardContent className="p-2">
    //               <Image
    //                 src={image}
    //                 alt={`Image ${index + 1}`}
    //                 width={300}
    //                 height={200}
    //                 className="w-full h-48 object-cover rounded"
    //               />
    //             </CardContent>
    //           </Card>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //     <CarouselPrevious />
    //     <CarouselNext />
    //   </Carousel>
    //   <div className="flex justify-center mt-4 space-x-2">
    //     <Button
    //       variant="outline"
    //       size="icon"
    //       onClick={scrollPrev}
    //       className="rounded-full"
    //     >
    //       <ChevronLeft className="h-4 w-4" />
    //     </Button>
    //     <Button
    //       variant="outline"
    //       size="icon"
    //       onClick={scrollNext}
    //       className="rounded-full"
    //     >
    //       <ChevronRight className="h-4 w-4" />
    //     </Button>
    //   </div>
    // </div>
  );
}

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const images = [
//   "/images/emily.jpg",
//   "/images/emily.jpg",
//   "/images/sarah.jpg",
//   "/images/sarah.jpg",
//   "/images/sarah.jpg",
//   "/images/sarah.jpg",
//   "/images/sarah.jpg",
//   "/images/emily.jpg",
// ];

// export default function ResponsiveImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-16">
//       <Carousel
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//         className="w-full"
//         setActiveIndex={setCurrentIndex}
//       >
//         <CarouselContent className="-ml-2 md:-ml-4">
//           {images.map((image, index) => (
//             <CarouselItem
//               key={index}
//               className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
//             >
//               <Card>
//                 <CardContent className="p-2">
//                   <Image
//                     src={image}
//                     alt={`Image ${index + 1}`}
//                     width={300}
//                     height={200}
//                     className="w-full h-48 object-cover rounded"
//                   />
//                 </CardContent>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//       {/* <div className="flex justify-center mt-4">
//         {Array.from({ length: Math.ceil(images.length / 4) }).map(
//           (_, index) => (
//             <Button
//               key={index}
//               variant="outline"
//               size="sm"
//               className={`mx-1 ${
//                 Math.floor(currentIndex / 4) === index
//                   ? "bg-primary text-primary-foreground"
//                   : ""
//               }`}
//               onClick={() => setCurrentIndex(index * 4)}
//             >
//               {index + 1}
//             </Button>
//           )
//         )}
//       </div> */}
//     </div>
//   );
// }

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const images = [
//   "/images/emily.jpg?height=200&width=300",
//   "/images/emily.jpg?height=200&width=300",
//   "/images/sarah.jpg?height=200&width=300",
//   "/images/sarah.jpg?height=200&width=300",
//   "/images/sarah.jpg?height=200&width=300",
//   "/images/sarah.jpg?height=200&width=300",
//   "/images/sarah.jpg?height=200&width=300",
//   "/images/emily.jpg?height=200&width=300",
// ];

// export default function ImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + 4 >= images.length ? 0 : prevIndex + 4
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex - 4 < 0 ? Math.max(images.length - 4, 0) : prevIndex - 4
//     );
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-16">
//       <div className="relative">
//         <div className="flex space-x-4">
//           {images.slice(currentIndex, currentIndex + 4).map((image, index) => (
//             <Card key={currentIndex + index} className="flex-none w-1/4">
//               <CardContent className="p-2">
//                 <img
//                   src={image}
//                   alt={`Image ${currentIndex + index + 1}`}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2"
//           onClick={prevSlide}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2"
//           onClick={nextSlide}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }
