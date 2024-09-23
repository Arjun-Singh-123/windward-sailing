"use client";

// import React, { useState, useEffect, useCallback } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { EmblaOptionsType } from "embla-carousel";
// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";

// const mockImages = [
//   {
//     id: 1,
//     url: "https://picsum.photos/200/300",
//   },
//   {
//     id: 2,
//     url: "https://utfs.io/f/0Sb6USnWZbDH8M2Zfr7TuTZgCe8XvYlVxiD5jaNHyP60LdoI",
//   },
//   {
//     id: 3,
//     url: "https://utfs.io/f/0Sb6USnWZbDH5t0l3hXlP8b9rnxfTQOAd4SuZyHB13gjURve",
//   },
//   {
//     id: 4,
//     url: "https://utfs.io/f/0Sb6USnWZbDHThSVHNA5O1xF7CSR8oep0wmAycUQLhtqNvu9",
//   },
//   {
//     id: 5,
//     url: "https://utfs.io/f/0Sb6USnWZbDH4P8V1qJ5SrlXE4Vkd967ZDyGj0KbeLJv1pCH",
//   },
// ];
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

// const options: EmblaOptionsType = {
//   loop: true,
//   slidesToScroll: 1,
//   startIndex: 0,
// };

// const autoplayOptions = {
//   delay: 4000,
//   rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
// };

// export default function EmblaCarousel() {
//   const [emblaRef, emblaApi] = useEmblaCarousel(options, [
//     Autoplay(autoplayOptions),
//   ]);
//   const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
//   const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

//   const scrollPrev = useCallback(
//     () => emblaApi && emblaApi.scrollPrev(),
//     [emblaApi]
//   );
//   const scrollNext = useCallback(
//     () => emblaApi && emblaApi.scrollNext(),
//     [emblaApi]
//   );
//   const scrollTo = useCallback(
//     (index: number) => emblaApi && emblaApi.scrollTo(index),
//     [emblaApi]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelectedIndex(emblaApi.selectedScrollSnap());
//     setPrevBtnEnabled(emblaApi.canScrollPrev());
//     setNextBtnEnabled(emblaApi.canScrollNext());
//   }, [emblaApi, setSelectedIndex]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     onSelect();
//     setScrollSnaps(emblaApi.scrollSnapList());
//     emblaApi.on("select", onSelect);
//     emblaApi.on("reInit", onSelect);
//   }, [emblaApi, setScrollSnaps, onSelect]);

//   return (
//     // <div className="embla relative max-w-6xl mx-auto px-4 py-8">
//     //   <div className="embla__viewport overflow-hidden" ref={emblaRef}>
//     //     <div className="embla__container flex">
//     //       {testimonials.map((testimonial) => (
//     //         <div
//     //           className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
//     //           key={testimonial.id}
//     //         >
//     //           <div className="bg-white shadow-lg rounded-lg p-6 h-full flex flex-col items-center">
//     //             <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
//     //               <Image
//     //                 src={testimonial.image}
//     //                 alt={testimonial.name}
//     //                 width={96}
//     //                 height={96}
//     //                 className="object-cover w-full h-full"
//     //               />
//     //             </div>
//     //             <h3 className="text-lg font-semibold mb-2 text-center">
//     //               {testimonial.name}
//     //             </h3>
//     //             <p className="text-gray-600 text-center">{testimonial.text}</p>
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   </div>
//     //   <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
//     //   <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
//     //   <div className="embla__dots flex justify-center mt-4">
//     //     {scrollSnaps.map((_, index) => (
//     //       <DotButton
//     //         key={index}
//     //         selected={index === selectedIndex}
//     //         onClick={() => scrollTo(index)}
//     //       />
//     //     ))}
//     //   </div>
//     // </div>

//     <div className="embla relative max-w-6xl mx-auto px-4 py-8">
//       <div className="embla__viewport overflow-hidden" ref={emblaRef}>
//         <div className="embla__container flex">
//           {mockImages.map((image) => (
//             <div
//               className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
//               key={image.id}
//             >
//               <img
//                 className="embla__slide__img block h-80 w-full object-cover rounded-lg"
//                 src={image.url}
//                 alt={`Slide ${image.id}`}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
//       <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
//       <div className="embla__dots flex justify-center mt-4">
//         {scrollSnaps.map((_, index) => (
//           <DotButton
//             key={index}
//             selected={index === selectedIndex}
//             onClick={() => scrollTo(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// const DotButton: React.FC<{
//   selected: boolean;
//   onClick: () => void;
// }> = (props) => {
//   const { selected, onClick } = props;

//   return (
//     <button
//       className={`embla__dot w-3 h-3 rounded-full mx-1 ${
//         selected ? "bg-blue-500" : "bg-gray-300"
//       }`}
//       type="button"
//       onClick={onClick}
//     />
//   );
// };

// const PrevButton: React.FC<{
//   enabled: boolean;
//   onClick: () => void;
// }> = (props) => {
//   const { enabled, onClick } = props;

//   return (
//     <button
//       className="embla__button embla__button--prev absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2"
//       onClick={onClick}
//       disabled={!enabled}
//     >
//       <svg
//         className="w-6 h-6"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M15 19l-7-7 7-7"
//         />
//       </svg>
//     </button>
//   );
// };

// const NextButton: React.FC<{
//   enabled: boolean;
//   onClick: () => void;
// }> = (props) => {
//   const { enabled, onClick } = props;

//   return (
//     <button
//       className="embla__button embla__button--next absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2"
//       onClick={onClick}
//       disabled={!enabled}
//     >
//       <svg
//         className="w-6 h-6"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M9 5l7 7-7 7"
//         />
//       </svg>
//     </button>
//   );
// };
