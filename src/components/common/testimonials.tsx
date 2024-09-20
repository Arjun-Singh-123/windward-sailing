"use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     name: "Emily Jackson",
//     image: "/placeholder.svg?height=100&width=100",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest. The attention to detail and level of luxury onboard were truly impressive. The interior design was elegant, combining modern elements with a classic touch. The amenities were top-notch, including a spa, gym, and even a cinema room. The crew was exceptional, providing impeccable service throughout the journey.",
//   },
//   {
//     name: "Joshep Andrew",
//     image: "/placeholder.svg?height=100&width=100",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true. The yacht had a romantic and intimate ambiance, perfect for a special occasion. The crew decorated the yacht beautifully, and we were welcomed with champagne and a personalized cake. We enjoyed a gourmet dinner on the deck while watching the sunset, creating unforgettable memories.",
//   },
//   {
//     name: "Milla Gabrial",
//     image: "/placeholder.svg?height=100&width=100",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best. The craftsmanship and design were exceptional, showcasing the finest materials and attention to detail. The yacht offered a perfect balance of indoor and outdoor spaces, allowing us to enjoy the stunning surroundings. The crew was knowledgeable and professional, ensuring our every need was met.",
//   },
// ];

// export default function TestimonialSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     let startX: number;
//     let scrollLeft: number;

//     const onMouseDown = (e: MouseEvent) => {
//       startX = e.pageX - container.offsetLeft;
//       scrollLeft = container.scrollLeft;
//       container.style.cursor = "grabbing";
//     };

//     const onMouseUp = () => {
//       container.style.cursor = "grab";
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       if (!startX) return;
//       const x = e.pageX - container.offsetLeft;
//       const walk = (x - startX) * 2;
//       container.scrollLeft = scrollLeft - walk;
//     };

//     container.addEventListener("mousedown", onMouseDown);
//     container.addEventListener("mouseup", onMouseUp);
//     container.addEventListener("mousemove", onMouseMove);

//     return () => {
//       container.removeEventListener("mousedown", onMouseDown);
//       container.removeEventListener("mouseup", onMouseUp);
//       container.removeEventListener("mousemove", onMouseMove);
//     };
//   }, []);

//   return (
//     <div className="bg-gray-100 py-12">
//       <h2 className="text-3xl font-bold text-center mb-8">Client's Feedback</h2>
//       <div className="relative max-w-4xl mx-auto">
//         <div
//           ref={containerRef}
//           className="flex overflow-x-hidden cursor-grab"
//           style={{ scrollSnapType: "x mandatory" }}
//         >
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               className="w-full flex-shrink-0 px-4"
//               style={{ scrollSnapAlign: "center" }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-24 h-24 rounded-full mx-auto mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-center mb-2">
//                   {testimonial.name}
//                 </h3>
//                 <p className="text-gray-600 text-center">{testimonial.text}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <button
//           onClick={prevTestimonial}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//         >
//           <ChevronLeft />
//         </button>
//         <button
//           onClick={nextTestimonial}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//         >
//           <ChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     name: "Emily Jackson",
//     image: "/images/senjal.jpg?height=100&width=100",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest. The attention to detail and level of luxury onboard were truly impressive. The interior design was elegant, combining modern elements with a classic touch. The amenities were top-notch, including a spa, gym, and even a cinema room. The crew was exceptional, providing impeccable service throughout the journey.",
//   },
//   {
//     name: "Joshep Andrew",
//     image: "/images/senjal.jpg?height=100&width=100",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true. The yacht had a romantic and intimate ambiance, perfect for a special occasion. The crew decorated the yacht beautifully, and we were welcomed with champagne and a personalized cake. We enjoyed a gourmet dinner on the deck while watching the sunset, creating unforgettable memories.",
//   },
//   {
//     name: "Milla Gabrial",
//     image: "/images/senjal.jpg?height=100&width=100",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best. The craftsmanship and design were exceptional, showcasing the finest materials and attention to detail. The yacht offered a perfect balance of indoor and outdoor spaces, allowing us to enjoy the stunning surroundings. The crew was knowledgeable and professional, ensuring our every need was met.",
//   },
// ];

// export default function TestimonialSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     let startX: number;
//     let scrollLeft: number;

//     const onMouseDown = (e: MouseEvent) => {
//       startX = e.pageX - container.offsetLeft;
//       scrollLeft = container.scrollLeft;
//       container.style.cursor = "grabbing";
//     };

//     const onMouseUp = () => {
//       container.style.cursor = "grab";
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       if (!startX) return;
//       const x = e.pageX - container.offsetLeft;
//       const walk = (x - startX) * 2;
//       container.scrollLeft = scrollLeft - walk;
//     };

//     container.addEventListener("mousedown", onMouseDown);
//     container.addEventListener("mouseup", onMouseUp);
//     container.addEventListener("mousemove", onMouseMove);

//     return () => {
//       container.removeEventListener("mousedown", onMouseDown);
//       container.removeEventListener("mouseup", onMouseUp);
//       container.removeEventListener("mousemove", onMouseMove);
//     };
//   }, []);

//   return (
//     <div className="bg-gray-100 py-12 w-full">
//       <h2 className="text-3xl font-bold text-center mb-8">Client's Feedback</h2>
//       <div className="relative max-w-4xl mx-auto">
//         <div
//           ref={containerRef}
//           className="flex overflow-x-hidden cursor-grab"
//           style={{ scrollSnapType: "x mandatory" }}
//         >
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               className="w-full flex-shrink-0 px-4"
//               style={{ scrollSnapAlign: "center" }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-24 h-24 rounded-full mx-auto mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-center mb-2">
//                   {testimonial.name}
//                 </h3>
//                 <p className="text-gray-600 text-center">{testimonial.text}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <button
//           onClick={prevTestimonial}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//         >
//           <ChevronLeft />
//         </button>
//         <button
//           onClick={nextTestimonial}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//         >
//           <ChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const testimonials = [
//   {
//     name: "Emily Jackson",
//     image: "/images/senjal.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
//   },
//   {
//     name: "Joshep Andrew",
//     image: "/images/senjal.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true...",
//   },
//   {
//     name: "Milla Gabrial",
//     image: "/images/senjal.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best...",
//   },
// ];

// const TestimonialsSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="bg-gray-100 py-16">
//       <div className="max-w-[700px] mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
//           Client's Feedback
//         </h2>
//         <div className="relative">
//           <AnimatePresence initial={false}>
//             <motion.div
//               key={currentIndex}
//               className="flex    "
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, y: -50 }}
//               transition={{ duration: 0.5 }}
//             >
//               <img
//                 src={testimonials[currentIndex].image}
//                 alt={testimonials[currentIndex].name}
//                 className="w-20 h-20 rounded-full mb-4 border-4 border-blue-500"
//               />
//               <h3 className="text-xl font-semibold mb-2 text-blue-800">
//                 {testimonials[currentIndex].name}
//               </h3>
//               <p className="text-center text-gray-600">
//                 {testimonials[currentIndex].text}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialsSection;
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/senjal.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
//   },
//   {
//     id: 2,
//     name: "Joshep Andrew",
//     image: "/images/senjal.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true...",
//   },
//   {
//     id: 3,
//     name: "Milla Gabrial",
//     image: "/images/senjal.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best...",
//   },
//   {
//     id: 4,
//     name: "Alex Thompson",
//     image: "/images/senjal.jpg",
//     text: "The attention to detail on this yacht is simply outstanding. Every aspect of the journey was perfect...",
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     image: "/images/senjal.jpg",
//     text: "From the moment I stepped on board, I knew this would be an unforgettable experience...",
//   },
// ];

// export default function TestimonialsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(1);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full py-16 bg-gray-100 overflow-hidden">
//       <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
//         Client's Feedback
//       </h2>
//       <div className="relative z-10 flex items-center justify-center">
//         <div className="w-full max-w-6xl mx-auto overflow-hidden">
//           <div className="flex items-center justify-center">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={testimonial.id}
//                 className={`bg-white rounded-lg shadow-lg p-6 mx-4 transition-all duration-300 ${
//                   index === currentIndex
//                     ? "scale-105 opacity-100"
//                     : "scale-90 opacity-50"
//                 }`}
//                 style={{
//                   width: "300px",
//                   height: "400px",
//                 }}
//                 animate={{
//                   x: `${(index - currentIndex) * 320}px`,
//                 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 <div className="relative -mt-16 mb-4">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-20 h-20 rounded-full border-4 border-blue-500 mx-auto"
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 text-blue-800">
//                   {testimonial.name}
//                 </h3>
//                 <p className="text-gray-600">{testimonial.text}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef } from "react";
// import { motion, useAnimation } from "framer-motion";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/senjal.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
//   },
//   {
//     id: 2,
//     name: "Joshep Andrew",
//     image: "/images/senjal.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true...",
//   },
//   {
//     id: 3,
//     name: "Milla Gabrial",
//     image: "/images/senjal.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best...",
//   },
// ];

// export default function TestimonialsSlider() {
//   const controls = useAnimation();
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const animateSlider = async () => {
//       await controls.start({
//         x: "-100%",
//         transition: { duration: 25, ease: "linear" },
//       });
//       controls.set({ x: "0%" });
//       animateSlider();
//     };

//     animateSlider();
//   }, [controls]);

//   return (
//     <div className="relative m-auto w-[800px] py-16   overflow-hidden">
//       <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
//         Client's Feedback
//       </h2>
//       <div className="relative z-10   ">
//         <motion.div
//           ref={containerRef}
//           className="flex"
//           animate={controls}
//           style={{ width: "150%" }}
//         >
//           {[...testimonials, ...testimonials].map((testimonial, index) => (
//             <div key={index} className="flex-none w-[300px] h-[500px] px-4">
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <div className="relative -mt-16 mb-4">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-20 h-20 rounded-full border-4 border-blue-500 mx-auto"
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 text-blue-800">
//                   {testimonial.name}
//                 </h3>
//                 <p className="text-gray-600">{testimonial.text}</p>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/senjal.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
//   },
//   {
//     id: 2,
//     name: "Joshep Andrew",
//     image: "/images/senjal.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true...",
//   },
//   {
//     id: 3,
//     name: "Milla Gabrial",
//     image: "/images/senjal.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best...",
//   },
//   {
//     id: 4,
//     name: "Alex Thompson",
//     image: "/images/senjal.jpg",
//     text: "The attention to detail on this yacht is simply outstanding. Every aspect of the journey was perfect...",
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     image: "/images/senjal.jpg",
//     text: "From the moment I stepped on board, I knew this would be an unforgettable experience...",
//   },
// ];

// export default function TestimonialsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative max-w-[800px] mx-auto py-16 px-4 overflow  overflow-visible">
//       <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
//         Client's Feedback
//       </h2>
//       <div className="relative h-[400px]  ">
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={currentIndex}
//             className="absolute w-full h-full"
//             initial={{ opacity: 0, x: 300 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -300 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div
//               className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between border-4"
//               style={{ borderColor: `hsl(${currentIndex * 60}, 70%, 60%)` }}
//             >
//               <div>
//                 <div className="relative -mt-16 mb-4">
//                   <img
//                     src={testimonials[currentIndex].image}
//                     alt={testimonials[currentIndex].name}
//                     className="w-20 h-20 rounded-full border-4 mx-auto"
//                     style={{
//                       borderColor: `hsl(${currentIndex * 60}, 70%, 60%)`,
//                     }}
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 text-blue-800">
//                   {testimonials[currentIndex].name}
//                 </h3>
//                 <p className="text-gray-600">
//                   {testimonials[currentIndex].text}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//       <div className="flex justify-center mt-4">
//         {testimonials?.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
//               index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import { cursiveHeadingFont } from "@/app/ui/fonts";
// import DecoratorLine from "./decorator-icon-line";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/sarah.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
//   },
//   {
//     id: 2,
//     name: "Joshep Andrew",
//     image: "/images/emily.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true...",
//   },
//   {
//     id: 3,
//     name: "Milla Gabrial",
//     image: "/images/joseph.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best...",
//   },
//   {
//     id: 4,
//     name: "Alex Thompson",
//     image: "/images/john.jpg",
//     text: "The attention to detail on this yacht is simply outstanding. Every aspect of the journey was perfect...",
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     image: "/images/john.jpg",
//     text: "From the moment I stepped on board, I knew this would be an unforgettable experience...",
//   },
// ];

// export default function TestimonialsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const getVisibleTestimonials = () => {
//     return [
//       testimonials[currentIndex % testimonials.length],
//       testimonials[(currentIndex + 1) % testimonials.length],
//       testimonials[(currentIndex + 2) % testimonials.length],
//     ];
//   };

//   // const getVisibleTestimonials = () => {
//   //   const visibleIndices = [
//   //     (currentIndex - 1 + testimonials.length) % testimonials.length,
//   //     currentIndex,
//   //     (currentIndex + 1) % testimonials.length,
//   //   ];

//   //   // console.log(
//   //   //   "visible indices",
//   //   //   visibleIndices,
//   //   //   visibleIndices.map((index) => testimonials[index])
//   //   // );
//   //   return visibleIndices.map((index) => testimonials[index]);
//   // };

//   return (
//     // <div className="relative max-w-[800px] mx-auto py-8 sm:py-16 px-4 overflow-hidden">
//     <div className=" relative max-w-[1200px] mx-auto py-8 sm:py-16 px-4 overflow-hidden">
//       <div className="text-center">
//         <h3
//           className={`${cursiveHeadingFont.className} text-2xl   text-[#13afe2]`}
//         >
//           Our Testimonials
//         </h3>
//       </div>
//       <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mt-2">
//         Client&apos;s Feedback
//       </h2>

//       <DecoratorLine showLines={true} />
//       {/* <div className="flex items-center mb-8 sm:mb-16 relative mt-4">
//         <div
//           className="flex-grow border-t-2 border-black mr-2"
//           style={{ maxWidth: "100px" }}
//         ></div>
//         <Image
//           src="/images/Logo-Icon.png"
//           alt="icon"
//           width={32}
//           height={32}
//           className="text-sky-500 mr-4"
//         />
//         <div
//           className="flex-grow border-t-2 border-black"
//           style={{ maxWidth: "100px" }}
//         ></div>
//       </div> */}
//       <div className=" relative md:w-full  h-[400px] sm:h-[300px]">
//         <AnimatePresence initial={false}>
//           {getVisibleTestimonials().map((testimonial, index) => (
//             <motion.div
//               key={testimonial.id}
//               className="absolute w-full sm:w-[250px] h-full mx-auto sm:mx-4"
//               initial={{
//                 opacity: 0,
//                 x: index === 2 ? 300 : index === 0 ? -300 : 0,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: index === 1 ? "0%" : index === 0 ? "-110%" : "110%",
//                 y: index === 1 ? 0 : 20,
//                 scale: index === 1 ? 1 : 0.9,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: index === 0 ? -300 : index === 2 ? 300 : 0,
//               }}
//               transition={{ duration: 0.5 }}
//             >
//               <div
//                 className={`bg-white rounded-sm shadow-lg p-6 h-full flex flex-col justify-between border-2 ${
//                   index === 1 ? "border-blue-500" : "border-gray-300"
//                 }`}
//               >
//                 <div>
//                   <div className="relative -mt-16 mb-4">
//                     <Image
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       width={80}
//                       height={80}
//                       className={`w-20 h-20 rounded-full border-2 mx-auto ${
//                         index === 1 ? "border-blue-500" : "border-gray-300"
//                       }`}
//                     />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2 text-blue-800">
//                     {testimonial.name}
//                   </h3>
//                   <p className="text-gray-600">{testimonial.text}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//       <div className="flex justify-center mt-4">
//         {testimonials.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
//               index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//     // <div className="relative max-w-[800px] mx-auto py-16 px-4 overflow-visible">
//     //   <div className="text-center">
//     //     <h3 className="text-xl font-script text-blue-900">Our Testimonials</h3>
//     //   </div>
//     //   <h2 className="text-3xl font-bold text-center text-blue-900">
//     //     Client's Feedback
//     //   </h2>
//     //   <div className="flex items-center mb-16 relative">
//     //     <div
//     //       className="flex-grow border-t-2 border-black mr-2"
//     //       style={{ maxWidth: "100px" }}
//     //     ></div>
//     //     <img
//     //       src="/images/Logo-Icon.png"
//     //       alt="icon"
//     //       className="h-8 w-8 text-sky-500 mr-4"
//     //     />
//     //     <div
//     //       className="flex-grow border-t-2 border-black"
//     //       style={{ maxWidth: "100px" }}
//     //     ></div>
//     //   </div>

//     //   <div className="relative h-[400px]">
//     //     {getVisibleTestimonials().map((testimonial, index) => (
//     //       <motion.div
//     //         key={testimonial.id}
//     //         className={`absolute h-full ${
//     //           index === 1
//     //             ? "w-full sm:w-[250px] mx-0 sm:mx-4"
//     //             : "w-0 sm:w-[250px] mx-0 sm:mx-4"
//     //         }`}
//     //         initial={{
//     //           opacity: 0,
//     //           x: index === 2 ? "100%" : index === 0 ? "-100%" : 0,
//     //         }}
//     //         animate={{
//     //           opacity: 1,
//     //           x: 0,
//     //         }}
//     //         exit={{
//     //           opacity: 0,
//     //           x: index === 0 ? "-100%" : index === 2 ? "100%" : 0,
//     //         }}
//     //         transition={{ duration: 0.5 }}
//     //       >
//     //         <div
//     //           className={`bg-white rounded-sm shadow-lg p-6 h-full flex flex-col justify-between border-2 ${
//     //             index === 1 ? "border-blue-500" : "border-gray-300"
//     //           }`}
//     //         >
//     //           <div>
//     //             <div className="relative -mt-16 mb-4">
//     //               <img
//     //                 src={testimonial.image}
//     //                 alt={testimonial.name}
//     //                 className={`w-20 h-20 rounded-full border-2 mx-auto ${
//     //                   index === 1 ? "border-blue-500" : "border-gray-300"
//     //                 }`}
//     //               />
//     //             </div>
//     //             <h3 className="text-xl font-semibold mb-2 text-blue-800">
//     //               {testimonial.name}
//     //             </h3>
//     //             <p className="text-gray-600">{testimonial.text}</p>
//     //           </div>
//     //         </div>
//     //       </motion.div>
//     //     ))}
//     //   </div>

//     //   <div className="flex justify-center mt-4">
//     //     {testimonials?.slice(0, 5)?.map((_, index) => (
//     //       <button
//     //         key={index}
//     //         className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
//     //           index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//     //         }`}
//     //         onClick={() => setCurrentIndex(index)}
//     //       />
//     //     ))}
//     //   </div>
//     // </div>

//     // <div className="relative max-w-[800px] mx-auto py-16 px-4 overflow-visible  ">
//     //   <div className="text-center ">
//     //     <h3 className="text-xl great-vibes-regular  text-blue-900">
//     //       Our Testimonials
//     //     </h3>
//     //   </div>
//     //   <h2 className="text-3xl font-bold text-center  text-blue-900">
//     //     Client&apos;s Feedback
//     //   </h2>
//     //   <div className="flex items-center  mb-16 relative">
//     //     {/* <div className="flex-grow border-t-2 absolute border-black w-[50px] left-10"></div> */}
//     //     <div
//     //       className="flex-grow border-t-2 border-black mr-2"
//     //       style={{ maxWidth: "100px" }}
//     //     ></div>

//     //     <img
//     //       src="/images/Logo-Icon.png"
//     //       alt="icon"
//     //       className="h-8 w-8 text-sky-500 mr-4"
//     //     />
//     //     <div
//     //       className="flex-grow border-t-2 border-black "
//     //       style={{ maxWidth: "100px" }}
//     //     ></div>

//     //     {/* <div className="flex-grow border-t-2 absolute border-black w-[50px] left-10"></div> */}
//     //   </div>
//     //   <div className="relative h-[400px]  ">
//     //     {/* <AnimatePresence initial={false}> */}
//     //     {getVisibleTestimonials().map((testimonial, index) => (
//     //       <motion.div
//     //         key={testimonial.id}
//     //         className="absolute w-[250px]   h-full mx-4 "
//     //         initial={{
//     //           opacity: 0,
//     //           x: index === 2 ? 300 : index === 0 ? -300 : 0,
//     //         }}
//     //         animate={{ opacity: 1, x: (index - 1) * 110 + "%" }}
//     //         exit={{
//     //           opacity: 0,
//     //           x: index === 0 ? -300 : index === 2 ? 300 : 0,
//     //         }}
//     //         transition={{ duration: 0.5 }}
//     //       >
//     //         <div
//     //           className={`bg-white rounded-sm shadow-lg p-6 h-full flex flex-col justify-between border-2 ${
//     //             index === 1 ? "border-blue-500" : "border-gray-300"
//     //           }`}
//     //         >
//     //           <div>
//     //             <div className="relative -mt-16 mb-4">
//     //               <img
//     //                 src={testimonial.image}
//     //                 alt={testimonial.name}
//     //                 className={`w-20 h-20 rounded-full border-2 mx-auto ${
//     //                   index === 1 ? "border-blue-500" : "border-gray-300"
//     //                 }`}
//     //               />
//     //             </div>
//     //             <h3 className="text-xl font-semibold mb-2 text-blue-800">
//     //               {testimonial.name}
//     //             </h3>
//     //             <p className="text-gray-600">{testimonial.text}</p>
//     //           </div>
//     //         </div>
//     //       </motion.div>
//     //     ))}
//     //     {/* </AnimatePresence> */}
//     //   </div>
//     //   <div className="flex justify-center mt-4">
//     //     {testimonials?.slice(0, 5)?.map((_, index) => (
//     //       <button
//     //         key={index}
//     //         className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
//     //           index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//     //         }`}
//     //         onClick={() => setCurrentIndex(index)}
//     //       />
//     //     ))}
//     //   </div>
//     // </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface MemberProps {
//   name: string;
//   image: string;
//   description: string;
// }

// const MemberCard: React.FC<MemberProps & { isActive: boolean }> = ({
//   name,
//   image,
//   description,
//   isActive,
// }) => (
//   <Card
//     className={`relative border-2 pt-12 ${
//       isActive ? "border-blue-500" : "border-gray-200"
//     } mb-12 min-h-[300px] transition-all duration-300 transform ${
//       isActive ? "scale-105" : "scale-95"
//     }`}
//   >
//     <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
//       <div
//         className={`w-24 h-24 rounded-full overflow-hidden ${
//           isActive ? "border-b-8 border-b-blue-500" : ""
//         }`}
//       >
//         <Image
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//           width={96}
//           height={96}
//         />
//       </div>
//     </div>
//     <CardContent className="text-center">
//       <h2 className="text-2xl font-semibold mb-2">{name}</h2>
//       <p className="text-sm mb-4">{description}</p>
//     </CardContent>
//   </Card>
// );

// const MemberCarousel: React.FC<{ members: MemberProps[] }> = ({ members }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [members.length]);

//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + members.length) % members.length
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
//   };

//   const getVisibleMembers = () => {
//     const prev = (currentIndex - 1 + members.length) % members.length;
//     const next = (currentIndex + 1) % members.length;
//     return [prev, currentIndex, next];
//   };

//   return (
//     <div className="relative w-full max-w-6xl mx-auto px-4">
//       <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
//       <div className="flex items-center justify-center space-x-4 mb-8">
//         <Button variant="outline" size="icon" onClick={handlePrev}>
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <div className="flex-1 overflow-hidden">
//           <div
//             className="flex transition-transform duration-300 ease-in-out"
//             style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
//           >
//             {getVisibleMembers().map((index) => (
//               <div
//                 key={index}
//                 className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
//               >
//                 <MemberCard
//                   {...members[index]}
//                   isActive={index === currentIndex}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <Button variant="outline" size="icon" onClick={handleNext}>
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//       <div className="flex justify-center space-x-2">
//         {members.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onClick={() => handleDotClick(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function Component() {
//   const members: MemberProps[] = [
//     {
//       name: "John Doe",
//       image: "/placeholder.svg?height=96&width=96",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       name: "Jane Smith",
//       image: "/placeholder.svg?height=96&width=96",
//       description:
//         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       name: "Bob Johnson",
//       image: "/placeholder.svg?height=96&width=96",
//       description:
//         "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
//     },
//     {
//       name: "Alice Brown",
//       image: "/placeholder.svg?height=96&width=96",
//       description:
//         "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
//     },
//     {
//       name: "Charlie Wilson",
//       image: "/placeholder.svg?height=96&width=96",
//       description:
//         "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
//     },
//   ];

//   return <MemberCarousel members={members} />;
// }
// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import { cursiveHeadingFont } from "@/app/ui/fonts";
// import DecoratorLine from "./decorator-icon-line";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/sarah.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
//   },
//   {
//     id: 2,
//     name: "Joshep Andrew",
//     image: "/images/emily.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true...",
//   },
//   {
//     id: 3,
//     name: "Milla Gabrial",
//     image: "/images/joseph.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best...",
//   },
//   {
//     id: 4,
//     name: "Alex Thompson",
//     image: "/images/john.jpg",
//     text: "The attention to detail on this yacht is simply outstanding. Every aspect of the journey was perfect...",
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     image: "/images/john.jpg",
//     text: "From the moment I stepped on board, I knew this would be an unforgettable experience...",
//   },
// ];

// export default function TestimonialsCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative max-w-[1200px] mx-auto py-8 sm:py-16 px-4 overflow-hidden">
//       <div className="text-center">
//         <h3
//           className={`${cursiveHeadingFont.className} text-2xl text-[#13afe2]`}
//         >
//           Our Testimonials
//         </h3>
//       </div>
//       <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mt-2">
//         Client&apos;s Feedback
//       </h2>

//       <DecoratorLine showLines={true} />

//       <Carousel
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//         className="w-full mt-8"
//         setActiveIndex={setCurrentIndex}
//       >
//         <CarouselContent className="-ml-2 md:-ml-4">
//           {testimonials.map((testimonial, index) => (
//             <CarouselItem
//               key={testimonial.id}
//               className="pl-2 md:pl-4 md:basis-1/3"
//             >
//               <AnimatePresence initial={false}>
//                 <motion.div
//                   key={testimonial.id}
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Card
//                     className={`h-full ${
//                       index === currentIndex % testimonials.length
//                         ? "border-blue-500"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <CardContent className="flex flex-col justify-between p-6">
//                       <div>
//                         <div className="relative -mt-16 mb-4">
//                           <Image
//                             src={testimonial.image}
//                             alt={testimonial.name}
//                             width={80}
//                             height={80}
//                             className={`w-20 h-20 rounded-full border-2 mx-auto ${
//                               index === currentIndex % testimonials.length
//                                 ? "border-blue-500"
//                                 : "border-gray-300"
//                             }`}
//                           />
//                         </div>
//                         <h3 className="text-xl font-semibold mb-2 text-blue-800">
//                           {testimonial.name}
//                         </h3>
//                         <p className="text-gray-600">{testimonial.text}</p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </AnimatePresence>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>

//       <div className="flex justify-center mt-4">
//         {testimonials.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
//               index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { cursiveHeadingFont } from "@/app/ui/fonts";
// import DecoratorLine from "./decorator-icon-line";
// import useEmblaCarousel from "embla-carousel-react";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/sarah.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest. The attention to detail, the luxurious amenities, and the impeccable service made my journey unforgettable. It was truly a five-star experience on the sea.",
//   },
//   {
//     id: 2,
//     name: "Joseph Andrew",
//     image: "/images/emily.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true. The crew went above and beyond to create a romantic atmosphere, and the gourmet meals were simply exquisite. It was the perfect way to make lasting memories.",
//   },
//   {
//     id: 3,
//     name: "Milla Gabriel",
//     image: "/images/joseph.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best. The state-of-the-art technology seamlessly blends with classic luxury. The smooth sailing and stunning views made every moment picture-perfect.",
//   },
//   {
//     id: 4,
//     name: "Alex Thompson",
//     image: "/images/john.jpg",
//     text: "The attention to detail on this yacht is simply outstanding. Every aspect of the journey was perfect, from the plush bedding to the top-notch entertainment systems. It's evident that no expense was spared in creating this floating paradise.",
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     image: "/images/john.jpg",
//     text: "From the moment I stepped on board, I knew this would be an unforgettable experience. The yacht's design is breathtaking, and the crew's professionalism is unmatched. Whether relaxing on the sun deck or enjoying water sports, every minute was pure bliss.",
//   },
// ];

// export default function ImprovedTestimonialsCarousel() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const scrollTo = useCallback(
//     (index) => emblaApi && emblaApi.scrollTo(index),
//     [emblaApi]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelectedIndex(emblaApi.selectedScrollSnap());
//   }, [emblaApi, setSelectedIndex]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     onSelect();
//     emblaApi.on("select", onSelect);
//     emblaApi.on("reInit", onSelect);
//   }, [emblaApi, onSelect]);

//   useEffect(() => {
//     const autoplay = setInterval(() => {
//       if (emblaApi) emblaApi.scrollNext();
//     }, 5000);
//     return () => clearInterval(autoplay);
//   }, [emblaApi]);

//   return (
//     <div className="relative max-w-[1200px] mx-auto py-8 sm:py-16 px-4 overflow-hidden">
//       <div className="text-center">
//         <h3
//           className={`${cursiveHeadingFont.className} text-2xl text-[#13afe2]`}
//         >
//           Our Testimonials
//         </h3>
//       </div>
//       <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mt-2 mb-8">
//         Client&apos;s Feedback
//       </h2>

//       <DecoratorLine showLines={true} />

//       <div className="overflow-hidden" ref={emblaRef}>
//         <div className="flex">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={testimonial.id}
//               className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
//             >
//               <AnimatePresence initial={false}>
//                 <motion.div
//                   key={testimonial.id}
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -50 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Card
//                     className={`h-full ${
//                       index === selectedIndex
//                         ? "border-blue-500"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <CardContent className="flex flex-col justify-between p-6 h-[400px] sm:h-[450px]">
//                       <div>
//                         <div className="relative mb-4">
//                           <Image
//                             src={testimonial.image}
//                             alt={testimonial.name}
//                             width={80}
//                             height={80}
//                             className={`w-20 h-20 rounded-full border-2 mx-auto ${
//                               index === selectedIndex
//                                 ? "border-blue-500"
//                                 : "border-gray-300"
//                             }`}
//                           />
//                         </div>
//                         <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
//                           {testimonial.name}
//                         </h3>
//                         <p className="text-gray-600 text-center">
//                           {testimonial.text}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center mt-6">
//         {testimonials.map((_, index) => (
//           <Button
//             key={index}
//             variant="outline"
//             size="sm"
//             className={`w-3 h-3 rounded-full mx-1 p-0 ${
//               index === selectedIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onClick={() => scrollTo(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import Image from "next/image";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import { Card, CardContent } from "@/components/ui/card";

// const testimonials = [
//   {
//     id: 1,
//     name: "Emily Jackson",
//     image: "/images/sarah.jpg",
//     text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest. The attention to detail, the luxurious amenities, and the impeccable service made my journey unforgettable.",
//   },
//   {
//     id: 2,
//     name: "Joseph Andrew",
//     image: "/images/emily.jpg",
//     text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true. The crew went above and beyond to create a romantic atmosphere, and the gourmet meals were simply exquisite.",
//   },
//   {
//     id: 3,
//     name: "Milla Gabriel",
//     image: "/images/joseph.jpg",
//     text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best. The state-of-the-art technology seamlessly blends with classic luxury.",
//   },
//   {
//     id: 4,
//     name: "Alex Thompson",
//     image: "/images/john.jpg",
//     text: "The attention to detail on this yacht is simply outstanding. Every aspect of the journey was perfect, from the plush bedding to the top-notch entertainment systems.",
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     image: "/images/john.jpg",
//     text: "From the moment I stepped on board, I knew this would be an unforgettable experience. The yacht's design is breathtaking, and the crew's professionalism is unmatched.",
//   },
// ];

// const TestimonialCard = ({ testimonial }) => (
//   <Card className="h-full">
//     <CardContent className="p-6 flex flex-col justify-between h-full">
//       <div>
//         <div className="mb-4 flex justify-center">
//           <Image
//             src={testimonial.image}
//             alt={testimonial.name}
//             width={80}
//             height={80}
//             className="rounded-full border-4 border-blue-500"
//           />
//         </div>
//         <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
//           {testimonial.name}
//         </h3>
//         <p className="text-gray-600 text-center">{testimonial.text}</p>
//       </div>
//     </CardContent>
//   </Card>
// );

// const ResponsiveTestimonialsCarousel = () => {
//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     { loop: true, align: "start" },
//     [Autoplay()]
//   );
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scrollSnaps, setScrollSnaps] = useState([]);

//   const scrollTo = useCallback(
//     (index) => emblaApi && emblaApi.scrollTo(index),
//     [emblaApi]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelectedIndex(emblaApi.selectedScrollSnap());
//   }, [emblaApi, setSelectedIndex]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     onSelect();
//     setScrollSnaps(emblaApi.scrollSnapList());
//     emblaApi.on("select", onSelect);
//     emblaApi.on("reInit", onSelect);
//   }, [emblaApi, onSelect]);

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-16">
//       <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
//         Client Testimonials
//       </h2>
//       <div className="overflow-hidden" ref={emblaRef}>
//         <div className="flex">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}
//               className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
//             >
//               <TestimonialCard testimonial={testimonial} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center mt-6">
//         {scrollSnaps.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full mx-1 ${
//               index === selectedIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onClick={() => scrollTo(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ResponsiveTestimonialsCarousel;
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cursiveHeadingFont } from "@/app/ui/fonts";
import DecoratorLine from "./decorator-icon-line";
import useEmblaCarousel from "embla-carousel-react";

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

export default function ImprovedTestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    return [
      testimonials[currentIndex % testimonials.length],
      testimonials[(currentIndex + 1) % testimonials.length],
      testimonials[(currentIndex + 2) % testimonials.length],
    ];
  };
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  //autoplay by embla api
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    // max-w-[300px]
    <div className="  max-w-full overflow-hidden mt-96  ">
      <div className="text-center">
        <h3
          className={`${cursiveHeadingFont.className} text-2xl text-[#13afe2]`}
        >
          Our Testimonials
        </h3>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mt-2 mb-8">
        Client&apos;s Feedback
      </h2>

      <DecoratorLine showLines={true} />

      <div className="overflow-visible mt-16  " ref={emblaRef}>
        <div className="flex">
          {getVisibleTestimonials()?.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="relative border-2 pt-12 border-t-blue-500 mb-12 min-h-[300px]">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-blue-500 ">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          width={96}
                          height={96}
                        />
                      </div>
                    </div>
                    <CardContent>
                      <div>
                        {/* <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-b-8  mx-auto">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              width={96}
                              height={96}
                            />
                          </div>
                        </div> */}
                        <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 text-center">
                          {testimonial.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* <Card
                    className={`h-full ${
                      index === selectedIndex
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <CardContent className="relative flex flex-col justify-between p-6 h-[400px] sm:h-[450px]">
                      <div>
                        <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-b-8  mx-auto">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              width={96}
                              height={96}
                            />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 text-center">
                          {testimonial.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card> */}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 mb-20">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`w-3 h-3 rounded-full mx-1 p-0 ${
              index === selectedIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>

    // <div className="relative max-w-[300px] md:max-w-[900px] mx-auto py-8 sm:py-16 px-4  ">
    //   <div className="text-center">
    //     <h3
    //       className={`${cursiveHeadingFont.className} text-2xl text-[#13afe2]`}
    //     >
    //       Our Testimonials
    //     </h3>
    //   </div>
    //   <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mt-2 mb-8">
    //     Client&apos;s Feedback
    //   </h2>

    //   <DecoratorLine showLines={true} />

    //   <div className="overflow-hidden" ref={emblaRef}>
    //     <div className="flex">
    //       {testimonials.map((testimonial, index) => (
    //         <div
    //           key={testimonial.id}
    //           className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
    //         >
    //           <AnimatePresence initial={false}>
    //             <motion.div
    //               key={testimonial.id}
    //               initial={{ opacity: 0, y: 50 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               exit={{ opacity: 0, y: -50 }}
    //               transition={{ duration: 0.5 }}
    //             >
    //               <Card
    //                 className={`h-full ${
    //                   index === selectedIndex
    //                     ? "border-blue-500"
    //                     : "border-gray-300"
    //                 }`}
    //               >
    //                 <CardContent className="relative flex flex-col justify-between p-6 h-[400px] sm:h-[450px]">
    //                   <div>
    //                     <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
    //                       <div className="w-24 h-24 rounded-full overflow-hidden border-b-8 border-b-blue-500">
    //                         <Image
    //                           src={testimonial.image}
    //                           alt={testimonial.name}
    //                           className="w-full h-full object-cover"
    //                           width={96}
    //                           height={96}
    //                         />
    //                       </div>
    //                     </div>

    //                     {/* <div className="relative -mt-19  mb-4 overflow-visible">
    //                       <Image
    //                         src={testimonial.image}
    //                         alt={testimonial.name}
    //                         width={80}
    //                         height={80}
    //                         className={`w-20 h-20 rounded-full border-2 mx-auto ${
    //                           index === selectedIndex
    //                             ? "border-blue-500"
    //                             : "border-gray-300"
    //                         }`}
    //                       />
    //                     </div> */}
    //                     <h3 className="text-xl font-semibold mb-2 text-blue-800 text-center">
    //                       {testimonial.name}
    //                     </h3>
    //                     <p className="text-gray-600 text-center">
    //                       {testimonial.text}
    //                     </p>
    //                   </div>
    //                 </CardContent>
    //               </Card>
    //             </motion.div>
    //           </AnimatePresence>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="flex justify-center mt-6">
    //     {testimonials.map((_, index) => (
    //       <Button
    //         key={index}
    //         variant="outline"
    //         size="sm"
    //         className={`w-3 h-3 rounded-full mx-1 p-0 ${
    //           index === selectedIndex ? "bg-blue-500" : "bg-gray-300"
    //         }`}
    //         onClick={() => scrollTo(index)}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
}
