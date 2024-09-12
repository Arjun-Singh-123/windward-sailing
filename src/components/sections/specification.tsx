"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Anchor } from "lucide-react";
import { supabase } from "@/lib/supabase";
// types/vehicle.ts

export type Specification = {
  name: string;
  value: string;
};

export type SpecificationCategory = {
  title: string;
  specs: Specification[];
};

export type RawSpecificationData = {
  [key: string]: Specification[];
};

export type VehicleContent = {
  specifications: RawSpecificationData;
  // ... other properties like amenities, boat_details, etc.
};

export type VehicleDetails = {
  id: number;
  content: VehicleContent;
  section_type: string;
};

// const specificationData = [
//   {
//     title: "General Dimensions",
//     specs: [
//       { name: "Length Overall", value: "44' 5\"" },
//       { name: "Length of Hull", value: "43' 3\"" },
//       { name: "Length at Waterline", value: "38' 4\"" },
//       { name: "Beam", value: "13' 7\"" },
//       { name: "Distance from Waterline to Masthead", value: "63' 10\"" },
//     ],
//   },
//   {
//     title: "Wing Keel",
//     specs: [
//       { name: "Draft", value: "5' 0\"" },
//       { name: "Ballast", value: "8,200 lbs" },
//       { name: "Basic Weight", value: "24,500 lbs" },
//     ],
//   },
//   {
//     title: "Fin Keel",
//     specs: [
//       { name: "Draft", value: "6' 8\"" },
//       { name: "Ballast", value: "7,200 lbs" },
//       { name: "Basic Weight", value: "23,500 lbs" },
//     ],
//   },
// ];
function convertSpecificationData(
  data: RawSpecificationData
): SpecificationCategory[] {
  return Object.entries(data).map(([title, specs]) => ({
    title,
    specs: Array.isArray(specs) ? specs : [],
  }));
}
const SpecificationsSection = async () => {
  const [specificationData, setSpecificationData] = useState<
    SpecificationCategory[]
  >([]);
  useEffect(() => {
    fetchVehicleAmenities();
  }, []);

  async function fetchVehicleAmenities() {
    console.log("in the fetchVehicle function");
    const { data, error } = await supabase
      .from("vehicle_details")
      .select("content")
      .eq("section_type", "specifications")

      .single();

    if (error) {
      console.error("Error fetching vehicle:", error);
    } else {
      // console.log("checking data in else", data.id);
      const convertedData = convertSpecificationData(
        data.content as RawSpecificationData
      );

      setSpecificationData(convertedData);
    }
  }
  console.log("specification", specificationData);
  return (
    <div className="mb-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">
        Specifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specificationData?.map((section, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-black dark:bg-gray-900 text-white p-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="p-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {section?.specs?.map((spec, specIndex) => (
                    <tr
                      key={specIndex}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {spec.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-300">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>

    // <div className="mb-8 px-[300px]">
    //   <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">Specifications</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {specificationData?.map((section, index) => (
    //       <Card key={index} className="border-[#1e40af]">
    //         <CardHeader className="bg-[#1e40af] text-white">
    //           <CardTitle>{section.title}</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <Table>
    //             <TableBody>
    //               {section?.specs?.map((spec, specIndex) => (
    //                 <TableRow key={specIndex}>
    //                   <TableCell className="font-medium text-[#1e40af]">
    //                     {spec.name}
    //                   </TableCell>
    //                   <TableCell>{spec.value}</TableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
  );
};

const VesselOverview = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold text-[#00008b] mb-2">
              Windward 28 - EVENING STAR
            </h1>
            <div className="border-b-2 border-[#00008b] w-16 mb-4"></div>
            <p className="mb-4">
              The Windward 28 - EVENING STAR is a charming embodiment of
              maritime excellence, bringing together classic elegance and
              seafaring adventure. At 28 feet in length, this yacht offers an
              inviting blend of intimacy and exploration. Its sleek hull design
              ensures a steady and pleasurable journey, whether you&apos;re
              gliding through calm waters or embracing the exhilaration of the
              open sea.
            </p>
            <p className="mb-4">
              Stepping on board, you&apos;re welcomed into a world of
              sophistication. The interior is a testament to Windward
              Yachts&apos; unwavering dedication to quality, with carefully
              chosen materials and meticulous craftsmanship that exude an
              ambiance of refined opulence. Plush seating, fine finishes, and
              attention to every detail underscore the brand&apos;s commitment
              to both comfort and style.
            </p>
            <p className="mb-4">
              Despite its modest size, the EVENING STAR comes equipped with a
              range of contemporary amenities. An efficiently designed galley is
              perfect for onboard dining, and the open deck invites you to soak
              up the sun and enjoy the sea breeze.
            </p>
            <p>
              This yacht is more than a vessel; it&apos;s an open invitation to
              a world of adventure. With its responsive controls and exceptional
              handling, the EVENING STAR promises an exhilarating ride suitable
              for seasoned sailors and newcomers alike.
            </p>
          </div>
          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="bg-[#00008b] text-white p-2 rounded">
                  Vessel Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">MFG.:</TableCell>
                      <TableCell>Windward</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Size:</TableCell>
                      <TableCell>28</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Auto Pilot:</TableCell>
                      <TableCell>no</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bimini:</TableCell>
                      <TableCell>no</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Bluetooth Stereo:
                      </TableCell>
                      <TableCell>yes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cabins:</TableCell>
                      <TableCell>2</TableCell>
                    </TableRow>
                    {/* Add more rows for other amenities */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// const VirtualTour = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const images = [
//     "d.jpg",
//     "e.jpg",
//     "f.jpeg",
//     "c.jpg",
//     "d.jpg",
//     "e.jpg",
//     "f.jpeg",
//     "c.jpg",
//     "d.jpg",
//     "e.jpg",
//     "f.jpeg",
//     "c.jpg",
//   ];
//   const totalImages = images.length;

//   const slideLeft = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? totalImages - 1 : prevIndex - 1
//     );
//   };

//   const slideRight = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === totalImages - 1 ? 0 : prevIndex + 1
//     );
//   };
//   return (
//     <div className="bg-[#f0f8ff] py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center justify-center">
//           <span className="mr-2">📸</span> Virtual Tour
//         </h2>
//         <div className="relative">
//           {/* Slider Container */}
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//             >
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   className="flex-shrink-0 w-full lg:w-1/4 aspect-w-16 aspect-h-9"
//                 >
//                   <img
//                     src={`/images/${img}`}
//                     alt={`Virtual tour image ${index + 1}`}
//                     className="object-cover w-full h-full rounded-lg shadow-lg"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Navigation Buttons */}
//           <button
//             className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
//             onClick={slideLeft}
//           >
//             &lt;
//           </button>
//           <button
//             className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
//             onClick={slideRight}
//           >
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>

//     // <div className="bg-[#f0f8ff] py-8">
//     //   <div className="container mx-auto px-4">
//     //     <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center justify-center">
//     //       <span className="mr-2">📸</span> Virtual Tour
//     //     </h2>
//     //     <div className="relative">
//     //       {/* Slider Container */}
//     //       <div className="overflow-hidden">
//     //         <div className="flex space-x-4 transition-transform duration-500 ease-in-out">
//     //           {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
//     //             <div
//     //               key={index}
//     //               className="flex-shrink-0 w-full lg:w-1/4 aspect-w-16 aspect-h-9"
//     //             >
//     //               <img
//     //                 src={`/images/${img}`}
//     //                 alt={`Virtual tour image ${index + 1}`}
//     //                 className="object-cover w-full h-full rounded-lg shadow-lg"
//     //               />
//     //             </div>
//     //           ))}
//     //         </div>
//     //       </div>
//     //       {/* Navigation Buttons */}
//     //       <button
//     //         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
//     //         onClick={() => {
//     //           // Logic to slide left
//     //         }}
//     //       >
//     //         &lt;
//     //       </button>
//     //       <button
//     //         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
//     //         onClick={() => {
//     //           // Logic to slide right
//     //         }}
//     //       >
//     //         &gt;
//     //       </button>
//     //     </div>
//     //   </div>
//     // </div>

//     // <div className="bg-[#f0f8ff] py-8">
//     //   <div className="container mx-auto px-4">
//     //     <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//     //       <Anchor className="mr-2" />
//     //       Virtual Tour
//     //     </h2>
//     //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//     //       {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
//     //         <div key={index} className="relative aspect-w-16 aspect-h-9">
//     //           <img
//     //             src={`/images/${img} `}
//     //             alt={`Virtual tour image ${index + 1}`}
//     //             // className="object-cover rounded-lg"
//     //           />
//     //           {/* <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//     //             {img}
//     //           </div> */}
//     //         </div>
//     //       ))}
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// #######

// import React, { useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
// import "swiper/swiper-bundle.min.css"; // Swiper styles

const VirtualTour = () => {
  const images = [
    "d.jpg",
    "e.jpg",
    "f.jpeg",
    "c.jpg",
    "d.jpg",
    "e.jpg",
    "f.jpeg",
    "c.jpg",
    "d.jpg",
    "e.jpg",
    "f.jpeg",
    "c.jpg",
  ];

  return (
    <div className="bg-[#f0f8ff] py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center justify-center">
          <span className="mr-2">📸</span> Virtual Tour
        </h2>
        <div className="relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation
            className="mySwiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`/images/${img}`}
                  alt={`Virtual tour image ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const ExteriorPhotos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "d.jpg",
    "e.jpg",
    "f.jpeg",
    "c.jpg",
    "d.jpg",
    "e.jpg",
    "f.jpeg",
    "c.jpg",
    "d.jpg",
    "e.jpg",
    "f.jpeg",
    "c.jpg",
  ];
  const totalImages = images.length;

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="bg-[#f0f8ff] py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center justify-center">
          <span className="mr-2">📸</span> Virtual Tour
        </h2>
        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full lg:w-1/4 aspect-w-16 aspect-h-9"
                >
                  <img
                    src={`/images/${img}`}
                    alt={`Virtual tour image ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
            onClick={slideLeft}
          >
            &lt;
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
            onClick={slideRight}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    // <div className="bg-[#f0f8ff] py-8">
    //   <div className="container mx-auto px-4">
    //     <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center justify-center">
    //       <span className="mr-2">📸</span> Virtual Tour
    //     </h2>
    //     <div className="relative">
    //       {/* Slider Container */}
    //       <div className="overflow-hidden">
    //         <div className="flex space-x-4 transition-transform duration-500 ease-in-out">
    //           {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
    //             <div
    //               key={index}
    //               className="flex-shrink-0 w-full lg:w-1/4 aspect-w-16 aspect-h-9"
    //             >
    //               <img
    //                 src={`/images/${img}`}
    //                 alt={`Virtual tour image ${index + 1}`}
    //                 className="object-cover w-full h-full rounded-lg shadow-lg"
    //               />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       {/* Navigation Buttons */}
    //       <button
    //         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
    //         onClick={() => {
    //           // Logic to slide left
    //         }}
    //       >
    //         &lt;
    //       </button>
    //       <button
    //         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg focus:outline-none"
    //         onClick={() => {
    //           // Logic to slide right
    //         }}
    //       >
    //         &gt;
    //       </button>
    //     </div>
    //   </div>
    // </div>

    // <div className="bg-white py-8">
    //   <div className="container mx-auto px-4">
    //     <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
    //       <Anchor className="mr-2" />
    //       Exterior Photos
    //     </h2>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    //       {[
    //         "WINDWARD_28_EVENING_STAR1",
    //         "WINDWARD_28_EVENING_STAR2",
    //         "WINDWARD_28_EVENING_STAR3",
    //         "WINDWARD_28_EVENING_S",
    //       ].map((img, index) => (
    //         <div
    //           key={index}
    //           className="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"
    //         >
    //           <div className="absolute inset-0 flex items-center justify-center text-gray-500">
    //             {img}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

import Image from "next/image";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR1",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "/images/sarah.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR2",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "/images/emily.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR3",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR4",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR1",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR2",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR3",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR4",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR1",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR2",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "/images/benefits.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR3",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "/images/about.jpg?height=300&width=400&text=CATALINA_30_SAND_DOLLAR4",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
];

// const images = [
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR1",
//     caption: "CATALINA_30_SAND_DOLLAR1",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR2",
//     caption: "CATALINA_30_SAND_DOLLAR2",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR3",
//     caption: "CATALINA_30_SAND_DOLLAR3",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR4",
//     caption: "CATALINA_30_SAND_DOLLAR4",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR5",
//     caption: "CATALINA_30_SAND_DOLLAR5",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR6",
//     caption: "CATALINA_30_SAND_DOLLAR6",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR7",
//     caption: "CATALINA_30_SAND_DOLLAR7",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR8",
//     caption: "CATALINA_30_SAND_DOLLAR8",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR9",
//     caption: "CATALINA_30_SAND_DOLLAR9",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR10",
//     caption: "CATALINA_30_SAND_DOLLAR10",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR11",
//     caption: "CATALINA_30_SAND_DOLLAR11",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR12",
//     caption: "CATALINA_30_SAND_DOLLAR12",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR13",
//     caption: "CATALINA_30_SAND_DOLLAR13",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR14",
//     caption: "CATALINA_30_SAND_DOLLAR14",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR15",
//     caption: "CATALINA_30_SAND_DOLLAR15",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cVQSYRfmi0DYG1iQnzxPxLoJtulM7s.png",
//     alt: "CATALINA 30 SAND DOLLAR16",
//     caption: "CATALINA_30_SAND_DOLLAR16",
//   },
// ];

export default function YachtGallery() {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % (images.length - 3));
  };

  const prevSlide = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + (images.length - 3)) % (images.length - 3)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-[#1e3a8a] flex items-center">
        <Compass className="mr-2" />
        Exterior Photos
      </h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-hidden">
          {images.slice(startIndex, startIndex + 4).map((image, index) => (
            <div key={index} className="flex-none w-1/4">
              <div className="relative aspect-[4/3] mb-2">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm text-center text-gray-600">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
export { SpecificationsSection, VesselOverview, VirtualTour, ExteriorPhotos };

// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Anchor } from "lucide-react";

// const SpecificationsSection = () => {
//   return (
//     <div className="bg-[#f0f8ff] py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//           <Anchor className="mr-2" />
//           Specifications
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="bg-[#00bfff] text-white p-2 rounded">
//                 General Dimensions
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Length Overall:
//                     </TableCell>
//                     <TableCell>44' 5"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Length of Hull:
//                     </TableCell>
//                     <TableCell>43' 3"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Length at Waterline:
//                     </TableCell>
//                     <TableCell>38' 4"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Beam:</TableCell>
//                     <TableCell>13' 7"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Distance from Waterline to Masthead:
//                     </TableCell>
//                     <TableCell>63' 10"</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="bg-[#00bfff] text-white p-2 rounded">
//                 Wing Keel
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">Draft:</TableCell>
//                     <TableCell>5' 0"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Ballast:</TableCell>
//                     <TableCell>8,200 lbs</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Basic Weight:</TableCell>
//                     <TableCell>24,500 lbs</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="bg-[#00bfff] text-white p-2 rounded">
//                 Fin Keel
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">Draft:</TableCell>
//                     <TableCell>6' 8"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Ballast:</TableCell>
//                     <TableCell>7,200 lbs</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Basic Weight:</TableCell>
//                     <TableCell>23,500 lbs</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           {/* Add more cards for other specification sections */}
//         </div>
//       </div>
//     </div>
//   );
// };

// const VesselOverview = () => {
//   return (
//     <div className="bg-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="lg:w-2/3">
//             <h1 className="text-4xl font-bold text-[#00008b] mb-2">
//               Windward 28' - EVENING STAR
//             </h1>
//             <div className="border-b-2 border-[#00008b] w-16 mb-4"></div>
//             <p className="mb-4">
//               The Windward 28' - EVENING STAR is a charming embodiment of
//               maritime excellence, bringing together classic elegance and
//               seafaring adventure. At 28 feet in length, this yacht offers an
//               inviting blend of intimacy and exploration. Its sleek hull design
//               ensures a steady and pleasurable journey, whether you're gliding
//               through calm waters or embracing the exhilaration of the open sea.
//             </p>
//             <p className="mb-4">
//               Stepping on board, you're welcomed into a world of sophistication.
//               The interior is a testament to Windward Yachts' unwavering
//               dedication to quality, with carefully chosen materials and
//               meticulous craftsmanship that exude an ambiance of refined
//               opulence. Plush seating, fine finishes, and attention to every
//               detail underscore the brand's commitment to both comfort and
//               style.
//             </p>
//             <p className="mb-4">
//               Despite its modest size, the EVENING STAR comes equipped with a
//               range of contemporary amenities. An efficiently designed galley is
//               perfect for onboard dining, and the open deck invites you to soak
//               up the sun and enjoy the sea breeze.
//             </p>
//             <p>
//               This yacht is more than a vessel; it's an open invitation to a
//               world of adventure. With its responsive controls and exceptional
//               handling, the EVENING STAR promises an exhilarating ride suitable
//               for seasoned sailors and newcomers alike.
//             </p>
//           </div>
//           <div className="lg:w-1/3">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="bg-[#00008b] text-white p-2 rounded">
//                   Vessel Amenities
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell className="font-medium">MFG.:</TableCell>
//                       <TableCell>Windward</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Size:</TableCell>
//                       <TableCell>28</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Auto Pilot:</TableCell>
//                       <TableCell>no</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Bimini:</TableCell>
//                       <TableCell>no</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">
//                         Bluetooth Stereo:
//                       </TableCell>
//                       <TableCell>yes</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Cabins:</TableCell>
//                       <TableCell>2</TableCell>
//                     </TableRow>
//                     {/* Add more rows for other amenities */}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const VirtualTour = () => {
//   return (
//     <div className="bg-[#f0f8ff] py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//           <Anchor className="mr-2" />
//           Virtual Tour
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
//             <div key={index} className="relative aspect-w-16 aspect-h-9">
//               <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                 {img}
//               </div>
//               <img
//                 src={`/images/${img}`}
//                 alt={`Virtual tour image ${index + 1}`}
//                 className="object-cover rounded-lg"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExteriorPhotos = () => {
//   return (
//     <div className="bg-white py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//           <Anchor className="mr-2" />
//           Exterior Photos
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
//             <div
//               key={index}
//               className="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"
//             >
//               <img
//                 src={`/images/${img}`}
//                 alt={`Virtual tour image ${index + 1}`}
//                 className="object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 flex items-center justify-center text-gray-500">
//                 {img}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export { SpecificationsSection, VesselOverview, VirtualTour, ExteriorPhotos };
