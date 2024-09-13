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
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Emily Jackson",
    image: "/images/sarah.jpg",
    text: "I've been fortunate enough to sail on many yachts, but this one stands out from the rest...",
  },
  {
    id: 2,
    name: "Joshep Andrew",
    image: "/images/emily.jpg",
    text: "I recently celebrated my anniversary on this incredible yacht, and it was a dream come true...",
  },
  {
    id: 3,
    name: "Milla Gabrial",
    image: "/images/joseph.jpg",
    text: "As a seasoned yacht enthusiast, I have experienced various vessels, and this yacht ranks among the best...",
  },
  {
    id: 4,
    name: "Alex Thompson",
    image: "/images/john.jpg",
    text: "The attention to detail on this yacht is simply outstanding. Every aspect of the journey was perfect...",
  },
  {
    id: 5,
    name: "Sarah Lee",
    image: "/images/john.jpg",
    text: "From the moment I stepped on board, I knew this would be an unforgettable experience...",
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    const visibleIndices = [
      (currentIndex - 1 + testimonials.length) % testimonials.length,
      currentIndex,
      (currentIndex + 1) % testimonials.length,
    ];

    // console.log(
    //   "visible indices",
    //   visibleIndices,
    //   visibleIndices.map((index) => testimonials[index])
    // );
    return visibleIndices.map((index) => testimonials[index]);
  };

  return (
    // <div className="relative max-w-[800px] mx-auto py-16 px-4 overflow-visible">
    //   <div className="text-center">
    //     <h3 className="text-xl font-script text-blue-900">Our Testimonials</h3>
    //   </div>
    //   <h2 className="text-3xl font-bold text-center text-blue-900">
    //     Client's Feedback
    //   </h2>
    //   <div className="flex items-center mb-16 relative">
    //     <div
    //       className="flex-grow border-t-2 border-black mr-2"
    //       style={{ maxWidth: "100px" }}
    //     ></div>
    //     <img
    //       src="/images/Logo-Icon.png"
    //       alt="icon"
    //       className="h-8 w-8 text-sky-500 mr-4"
    //     />
    //     <div
    //       className="flex-grow border-t-2 border-black"
    //       style={{ maxWidth: "100px" }}
    //     ></div>
    //   </div>

    //   <div className="relative h-[400px]">
    //     {getVisibleTestimonials().map((testimonial, index) => (
    //       <motion.div
    //         key={testimonial.id}
    //         className={`absolute h-full ${
    //           index === 1
    //             ? "w-full sm:w-[250px] mx-0 sm:mx-4"
    //             : "w-0 sm:w-[250px] mx-0 sm:mx-4"
    //         }`}
    //         initial={{
    //           opacity: 0,
    //           x: index === 2 ? "100%" : index === 0 ? "-100%" : 0,
    //         }}
    //         animate={{
    //           opacity: 1,
    //           x: 0,
    //         }}
    //         exit={{
    //           opacity: 0,
    //           x: index === 0 ? "-100%" : index === 2 ? "100%" : 0,
    //         }}
    //         transition={{ duration: 0.5 }}
    //       >
    //         <div
    //           className={`bg-white rounded-sm shadow-lg p-6 h-full flex flex-col justify-between border-2 ${
    //             index === 1 ? "border-blue-500" : "border-gray-300"
    //           }`}
    //         >
    //           <div>
    //             <div className="relative -mt-16 mb-4">
    //               <img
    //                 src={testimonial.image}
    //                 alt={testimonial.name}
    //                 className={`w-20 h-20 rounded-full border-2 mx-auto ${
    //                   index === 1 ? "border-blue-500" : "border-gray-300"
    //                 }`}
    //               />
    //             </div>
    //             <h3 className="text-xl font-semibold mb-2 text-blue-800">
    //               {testimonial.name}
    //             </h3>
    //             <p className="text-gray-600">{testimonial.text}</p>
    //           </div>
    //         </div>
    //       </motion.div>
    //     ))}
    //   </div>

    //   <div className="flex justify-center mt-4">
    //     {testimonials?.slice(0, 5)?.map((_, index) => (
    //       <button
    //         key={index}
    //         className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
    //           index === currentIndex ? "bg-blue-500" : "bg-gray-300"
    //         }`}
    //         onClick={() => setCurrentIndex(index)}
    //       />
    //     ))}
    //   </div>
    // </div>

    <div className="relative max-w-[800px] mx-auto py-16 px-4 overflow-visible  ">
      <div className="text-center ">
        <h3 className="text-xl great-vibes-regular  text-blue-900">
          Our Testimonials
        </h3>
      </div>
      <h2 className="text-3xl font-bold text-center  text-blue-900">
        Client&apos;s Feedback
      </h2>
      <div className="flex items-center  mb-16 relative">
        {/* <div className="flex-grow border-t-2 absolute border-black w-[50px] left-10"></div> */}
        <div
          className="flex-grow border-t-2 border-black mr-2"
          style={{ maxWidth: "100px" }}
        ></div>

        <img
          src="/images/Logo-Icon.png"
          alt="icon"
          className="h-8 w-8 text-sky-500 mr-4"
        />
        <div
          className="flex-grow border-t-2 border-black "
          style={{ maxWidth: "100px" }}
        ></div>

        {/* <div className="flex-grow border-t-2 absolute border-black w-[50px] left-10"></div> */}
      </div>
      <div className="relative h-[400px]   ">
        {/* <AnimatePresence initial={false}> */}
        {getVisibleTestimonials().map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="absolute w-[250px]   h-full mx-4 "
            initial={{
              opacity: 0,
              x: index === 2 ? 300 : index === 0 ? -300 : 0,
            }}
            animate={{ opacity: 1, x: (index - 1) * 110 + "%" }}
            exit={{
              opacity: 0,
              x: index === 0 ? -300 : index === 2 ? 300 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`bg-white rounded-sm shadow-lg p-6 h-full flex flex-col justify-between border-2 ${
                index === 1 ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <div>
                <div className="relative -mt-16 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={`w-20 h-20 rounded-full border-2 mx-auto ${
                      index === 1 ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {/* </AnimatePresence> */}
      </div>
      <div className="flex justify-center mt-4">
        {testimonials?.slice(0, 5)?.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
