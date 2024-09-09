"use client";

// src/components/ImageSlider.tsx
// import React, { useState, useRef } from "react";

// interface ImageSliderProps {
//   images: string[];
// }

// const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
//     const touchStartX = useRef<number>(0);
//     const touchEndX = useRef<number>(0);

//     if (event.type === "touchstart") {
//       touchStartX.current = event.touches[0].clientX;
//     } else if (event.type === "touchend") {
//       touchEndX.current = event.changedTouches[0].clientX;
//       const diff = touchStartX.current - touchEndX.current;

//       if (diff > 50) {
//         handleNext();
//       } else if (diff < -50) {
//         handlePrev();
//       }
//     }
//   };

//   return (
//     <div
//       className="relative overflow-hidden"
//       onTouchStart={handleSwipe}
//       onTouchEnd={handleSwipe}
//     >
//       <div
//         className="flex transition-transform duration-500"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         ref={sliderRef}
//       >
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-2"
//           >
//             <img
//               src={`/images/${image}`}
//               alt={`Slide ${index}`}
//               className="w-full h-auto object-cover rounded-lg shadow-md"
//             />
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handlePrev}
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
//       >
//         &lt;
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
//       >
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  title: string;
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ title, images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= images.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 4 < 0 ? Math.max(images.length - 4, 0) : prevIndex - 4
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">{title}</h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-hidden">
          {images.slice(currentIndex, currentIndex + 4).map((image, index) => (
            <Card key={index} className="border-[#1e40af] flex-shrink-0 w-1/4">
              <CardContent className="p-0">
                <img
                  src={`/images/${image}`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImageGallery;

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface ImageGalleryProps {
//   title: string;
//   images: string[];
// }

// export const ImageGallery: React.FC<ImageGalleryProps> = ({
//   title,
//   images,
// }) => {
//   const [currentIndex, setCurrentIndex] = React.useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + 1 >= images.length ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex < 0 ? Math.max(images.length, 0) : prevIndex
//     );
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">{title}</h2>
//       <div className="relative">
//         <div className="flex space-x-4 overflow-hidden">
//           {images.slice(currentIndex, currentIndex + 4).map((image, index) => (
//             <Card key={index} className="border-[#1e40af] flex-shrink-0 w-1/4">
//               <CardContent className="p-0">
//                 <img
//                   src={`/images/${image}`}
//                   alt={`Gallery image ${index + 1}`}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
//           onClick={prevSlide}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
//           onClick={nextSlide}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface ImageGalleryProps {
//   title: string;
//   images: string[];
// }

// export const ImageGallery: React.FC<ImageGalleryProps> = ({
//   title,
//   images,
// }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">{title}</h2>
//       <div className="relative">
//         <Swiper
//           modules={[Navigation, Pagination, Scrollbar, A11y]}
//           spaceBetween={20}
//           slidesPerView={1}
//           navigation={{
//             prevEl: ".swiper-button-prev",
//             nextEl: ".swiper-button-next",
//           }}
//           pagination={{ clickable: true }}
//           scrollbar={{ draggable: true }}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             768: {
//               slidesPerView: 3,
//             },
//             1024: {
//               slidesPerView: 4,
//             },
//           }}
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={index}>
//               <Card className="border-[#1e40af]">
//                 <CardContent className="p-0">
//                   <img
//                     src={image}
//                     alt={`Gallery image ${index + 1}`}
//                     className="w-full h-64 object-cover rounded-lg"
//                   />
//                 </CardContent>
//               </Card>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <Button
//           variant="outline"
//           size="icon"
//           className="swiper-button-prev absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           className="swiper-button-next absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// };
