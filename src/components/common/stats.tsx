"use client";

import React, { useState, useEffect } from "react";

const stats = [
  { emoji: "🌍", value: 775, label: "DESTINATION", bgColor: "bg-blue-200" },
  { emoji: "😊", value: 5125, label: "SATISFIED", bgColor: "bg-green-200" },
  { emoji: "⛵", value: 100, label: "SKIPPERS", bgColor: "bg-yellow-200" },
  { emoji: "🚢", value: 200, label: "BOATS", bgColor: "bg-red-200" },
  { emoji: "🏴", value: 50, label: "COUNTRIES", bgColor: "bg-purple-200" },
];

export default function StatsSlider() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 1) % stats.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-blue-600 bg-opacity-80 overflow-hidden bg-custom">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative h-48 w-full mx-auto overflow-hidden">
          <div className="absolute inset-x-0 flex justify-between pointer-events-none">
            <div className="w-[100px] h-full bg-gradient-to-r from-blue-900" />
            <div className="w-[100px] h-full bg-gradient-to-l from-blue-900" />
          </div>
          <div
            className="flex items-center h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${offset * 33.33}%)` }}
          >
            {stats.concat(stats.slice(0, 2)).map((stat, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-1/3 flex gap-2 items-center justify-center px-4 transition-all duration-300 ${
                  index === offset + 1
                    ? "scale-110 z-10"
                    : "scale-100 opacity-70"
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-full ${stat.bgColor} bg-opacity-50 flex items-center justify-center mb-2`}
                >
                  <span className="text-4xl">{stat.emoji}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xl text-white">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";

// const stats = [
//   { image: "/images/senjal.jpg", value: 775, label: "DESTINATION" },
//   { image: "/images/sarah.jpg", value: 5125, label: "SATISFIED" },
//   { image: "/images/sarah.jpg", value: 100, label: "SKIPPERS" },
//   { image: "/images/sarah.jpg", value: 200, label: "BOATS" },
//   { image: "/images/sarah.jpg", value: 50, label: "COUNTRIES" },
// ];

// export default function StatsSlider() {
//   const [offset, setOffset] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setOffset((prevOffset) => (prevOffset + 1) % stats.length);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   const getVisibleStats = () => {
//     return [
//       stats[(offset - 1 + stats.length) % stats.length],
//       stats[offset],
//       stats[(offset + 1) % stats.length],
//     ];
//   };

//   return (
//     <div className="relative w-full bg-blue-600 bg-opacity-80 overflow-hidden bg-custom">
//       <div className="max-w-screen-xl mx-auto">
//         <div className="relative h-48 w-full mx-auto overflow-hidden">
//           <div className="absolute inset-x-0 flex justify-between pointer-events-none">
//             <div className="w-[100px] h-full bg-gradient-to-r from-blue-900" />
//             <div className="w-[100px] h-full bg-gradient-to-l from-blue-900" />
//           </div>
//           <div
//             className="flex items-center h-full transition-transform duration-500 ease-in-out"
//             style={{ transform: `translateX(-${offset * 33.33}%)` }}
//           >
//             {stats.concat(stats.slice(0, 2)).map((stat, index) => (
//               <div
//                 key={index}
//                 className={`flex-shrink-0 w-1/3 flex items-center justify-center px-4 transition-all duration-300 ${
//                   index === offset + 1
//                     ? "scale-110 z-10"
//                     : "scale-100 opacity-70"
//                 }`}
//               >
//                 <img
//                   src={stat.image}
//                   alt={stat.label}
//                   className="w-16 h-16 rounded-full object-cover mb-2"
//                 />
//                 <div className="flex flex-col items-center">
//                   <div className="text-4xl font-bold text-white">
//                     {stat.value}
//                   </div>
//                   <div className="text-xl text-white">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// const stats = [
//   { image: "/images/senjal.jpg", value: 775, label: "DESTINATION" },
//   { image: "/images/sarah.jpg", value: 5125, label: "SATISFIED" },
//   { image: "/images/sarah.jpg", value: 100, label: "SKIPPERS" },
//   { image: "/images/sarah.jpg", value: 200, label: "BOATS" },
//   { image: "/images/sarah.jpg", value: 50, label: "COUNTRIES" },
// ];

// export default function StatsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
//     }, 3000); // Har 3 second mein slide change hoga

//     return () => clearInterval(timer);
//   }, []);

//   const visibleStats = [
//     stats[currentIndex],
//     stats[(currentIndex + 1) % stats.length],
//     stats[(currentIndex + 2) % stats.length],
//   ];

//   return (
//     <div className="relative w-full bg-blue-600 bg-opacity-80 overflow-hidden bg-custom">
//       <div className="max-w-screen-xl mx-auto">
//         <div className="relative h-48 w-[500px] mx-auto overflow-hidden">
//           <div className="absolute inset-x-0 flex justify-between pointer-events-none">
//             <div className="w-[100px] h-full bg-gradient-to-r from-blue-900" />
//             <div className="w-[100px] h-full bg-gradient-to-l from-blue-900" />
//           </div>
//           <div className="flex items-center h-full transition-transform duration-500 ease-in-out">
//             {visibleStats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-8 w-1/3 text-center text-white px-4"
//               >
//                 <img
//                   src={stat.image}
//                   alt={stat.label}
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <div>
//                   <div className="text-4xl font-bold">{stat.value}</div>
//                   <div className="text-xl">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef } from "react";
// import { motion, useAnimation } from "framer-motion";

// const stats = [
//   { image: "/images/sarah.jpg", value: 5125, label: "SATISFIED" },
//   { image: "/images/emily.jpg", value: 100, label: "SKIPPERS" },
//   { image: "/images/joseph.jpg", value: 775, label: "DESTINATION" },
//   { image: "/images/senjal.jpg", value: 5125, label: "SATISFIED" },
//   { image: "/images/emily.jpg", value: 100, label: "SKIPPERS" },
// ];

// export default function StatsSlider() {
//   const controls = useAnimation();
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const animateSlider = async () => {
//       await controls.start({
//         x: "-33.33%",
//         transition: { duration: 10, ease: "linear" },
//       });
//       controls.set({ x: "0%" });
//       animateSlider();
//     };

//     animateSlider();
//   }, [controls]);

//   return (
//     <div className="relative w-full bg-blue-600 bg-opacity-80 overflow-hidden bg-custom">
//       <div className="max-w-screen-xl mx-auto">
//         <div className="relative h-48 w-[700px] mx-auto overflow-hidden">
//           <div className="absolute inset-x-0 flex justify-between pointer-events-none">
//             <div className="w-[100px] h-full bg-gradient-to-r from-blue-900" />
//             <div className="w-[100px] h-full bg-gradient-to-l from-blue-900" />
//           </div>
//           <motion.div
//             ref={containerRef}
//             className="flex items-center w-2 h-full"
//             animate={controls}
//             style={{ width: "150%" }}
//           >
//             {[...stats, ...stats]?.map((stat, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-8 w-1/3 text-center text-white px-4"
//               >
//                 <img
//                   src={stat.image}
//                   alt={stat.label}
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <div>
//                   <div className="text-4xl font-bold">{stat.value}</div>
//                   <div className="text-xl">{stat.label}</div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>

//     // <div className="relative  mx-auto h-48 bg-blue-900 w-[500px]  overflow-hidden">
//     //   <div className="relative z-10 h-full flex items-center">
//     //     <div className="absolute inset-x-0 flex justify-between pointer-events-none">
//     //       <div className="w-[200px] h-full bg-gradient-to-r from-blue-900" />
//     //       <div className="w-[200px] h-full bg-gradient-to-l from-blue-900" />
//     //     </div>
//     //     <motion.div
//     //       ref={containerRef}
//     //       className="flex"
//     //       animate={controls}
//     //       style={{ width: "150%" }}
//     //     >
//     //       {[...stats, ...stats].map((stat, index) => (
//     //         <div
//     //           key={index}
//     //           className="flex items-center gap-3 w-1/3 text-center text-white px-4"
//     //         >
//     //           <img
//     //             src={stat.image}
//     //             alt={stat.label}
//     //             className="w-16 h-16 rounded-full object-cover"
//     //           />
//     //           <div>
//     //             <div className="text-4xl font-bold">{stat.value}</div>
//     //             <div className="text-xl">{stat.label}</div>
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </motion.div>
//     //   </div>
//     // </div>
//   );
// }

// import React, { useEffect, useRef } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { MapPin, Smile, Users } from "lucide-react";

// const stats = [
//   { icon: MapPin, value: 775, label: "DESTINATION" },
//   { icon: Smile, value: 5125, label: "SATISFIED" },
//   { icon: Users, value: 100, label: "SKIPPERS" },
// ];

// export default function StatsSlider() {
//   const controls = useAnimation();
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const animateSlider = async () => {
//       await controls.start({
//         x: "-100%",
//         transition: { duration: 15, ease: "linear" },
//       });
//       controls.set({ x: "0%" });
//       animateSlider();
//     };

//     animateSlider();
//   }, [controls]);

//   return (
//     <div className="relative w-full h-48 bg-blue-900 overflow-hidden">
//       {/* <div className="absolute inset-0">
//         <img
//           src="/placeholder.svg?height=200&width=1920"
//           alt="Ocean background"
//           className="w-full h-full object-cover"
//         />
//       </div> */}
//       <div className="relative z-10 h-full flex items-center">
//         <motion.div
//           ref={containerRef}
//           className="flex"
//           animate={controls}
//           style={{ width: "200%" }}
//         >
//           {[...stats, ...stats].map((stat, index) => (
//             <div
//               key={index}
//               className="flex gap-3 w-1/6 text-center text-white  "
//             >
//               {React.createElement(stat.icon, {
//                 size: 48,
//                 // className: " ",
//               })}
//               <div>
//                 {" "}
//                 <div className="text-4xl font-bold">{stat.value}</div>
//                 <div className="text-xl">{stat.label}</div>
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
// import { MapPin, Smile, Users } from "lucide-react";

// const stats = [
//   { icon: MapPin, value: 775, label: "DESTINATION" },
//   { icon: Smile, value: 5125, label: "SATISFIED" },
//   { icon: Users, value: 100, label: "SKIPPERS" },
// ];

// export default function StatsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(1);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-48 bg-blue-900 overflow-hidden">
//       <div className="relative z-10 h-full flex items-center justify-center">
//         <div className="w-full max-w-4xl mx-auto overflow-hidden">
//           <div className="flex items-center justify-center">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className={`text-center text-white transition-all duration-300 ${
//                   index === currentIndex
//                     ? "scale-110 opacity-100"
//                     : "scale-90 opacity-50"
//                 }`}
//                 animate={{
//                   x: `${(index - currentIndex) * 100}%`,
//                 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 {React.createElement(stat.icon, {
//                   size: 48,
//                   className: "mx-auto mb-2",
//                 })}
//                 <div className="text-4xl font-bold">{stat.value}</div>
//                 <div className="text-xl">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MapPin, Smile, Users } from "lucide-react";

// const stats = [
//   { icon: MapPin, value: 775, label: "DESTINATION" },
//   { icon: Smile, value: 5125, label: "SATISFIED" },
//   { icon: Users, value: 100, label: "SKIPPERS" },
// ];

// export default function StatsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-48 bg-blue-900 overflow-hidden">
//       {/* <div className="absolute inset-0">
//         <img
//           src="/placeholder.svg?height=200&width=1920"
//           alt="Ocean background"
//           className="w-full h-full object-cover"
//         />
//       </div> */}
//       <div className="relative z-10 h-full flex items-center justify-center">
//         <div className="w-full overflow-hidden">
//           <AnimatePresence initial={false}>
//             <motion.div
//               key={currentIndex}
//               initial={{ x: 700 }}
//               animate={{ x: 0 }}
//               exit={{ x: -700 }}
//               transition={{ duration: 0.5 }}
//               className="flex items-center justify-center space-x-12"
//             >
//               {stats?.map((stat, index) => (
//                 <div key={index} className="text-center text-white">
//                   {React.createElement(stat.icon, {
//                     size: 48,
//                     className: "mx-auto mb-2",
//                   })}
//                   <div className="text-4xl font-bold">{stat.value}</div>
//                   <div className="text-xl">{stat.label}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MapPin, Smile, Users } from "lucide-react";

// const stats = [
//   { icon: MapPin, value: 775, label: "DESTINATION" },
//   { icon: Smile, value: 5125, label: "SATISFIED" },
//   { icon: Users, value: 100, label: "SKIPPERS" },
// ];

// export default function StatsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative h-48 bg-blue-900 overflow-hidden">
//       <div className="absolute inset-0">
//         <img
//           src="/placeholder.svg?height=200&width=1000"
//           alt="Ocean background"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="relative z-10 h-full flex items-center justify-center">
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.5 }}
//             className="text-center text-white"
//           >
//             {React.createElement(stats[currentIndex].icon, {
//               size: 48,
//               className: "mx-auto mb-2",
//             })}
//             <div className="text-4xl font-bold">
//               {stats[currentIndex].value}
//             </div>
//             <div className="text-xl">{stats[currentIndex].label}</div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { motion } from "framer-motion";

// const stats = [
//   { icon: "🗺️", value: "775", label: "DESTINATION" },
//   { icon: "😊", value: "5125", label: "SATISFIED" },
//   { icon: "👤", value: "100", label: "SKIPPERS" },
// ];

// const StatsSlider: React.FC = () => {
//   return (
//     <div className="bg-blue-900 text-white py-8">
//       <div className="container mx-auto">
//         <motion.div
//           className="flex justify-around"
//           initial={{ x: "-100%" }}
//           animate={{ x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center">
//               <div className="text-4xl mb-2">{stat.icon}</div>
//               <div className="text-3xl font-bold">{stat.value}</div>
//               <div className="text-sm">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default StatsSlider;

// import React, { useEffect, useRef } from 'react';
// import { motion, useAnimation } from 'framer-motion';

// const stats = [
//   { icon: '🗺️', value: '775', label: 'DESTINATION' },
//   { icon: '😊', value: '5125', label: 'SATISFIED' },
//   { icon: '👤', value: '100', label: 'SKIPPERS' },
//   // Duplicate stats for continuous loop
//   { icon: '🗺️', value: '775', label: 'DESTINATION' },
//   { icon: '😊', value: '5125', label: 'SATISFIED' },
//   { icon: '👤', value: '100', label: 'SKIPPERS' },
// ];

// const StatsSection: React.FC = () => {
//   const controls = useAnimation();
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const animateSlider = async () => {
//       await controls.start({ x: '-50%', transition: { duration: 20, ease: 'linear' } });
//       controls.set({ x: '0%' });
//       animateSlider();
//     };

//     animateSlider();
//   }, [controls]);

//   return (
//     <div className="bg-blue-900 text-white py-12 overflow-hidden">
//       <div className="max-w-[700px] mx-auto relative">
//         <motion.div
//           ref={containerRef}
//           className="flex"
//           animate={controls}
//           style={{ width: '200%' }}
//         >
//           {stats.map((stat, index) => (
//             <div key={index} className="flex-none w-1/6 text-center px-4">
//               <div className="text-4xl mb-2">{stat.icon}</div>
//               <div className="text-3xl font-bold">{stat.value}</div>
//               <div className="text-sm">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default StatsSection;
