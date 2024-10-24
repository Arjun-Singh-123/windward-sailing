"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Anchor, AnchorIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
// types/vehicle.ts
// function flattenData(data:any) {
//   const flattenedData:any = [];

//   Object.keys(data).forEach(key => {
//       data[key].forEach(item => {
//           flattenedData.push({
//               category: key,
//               name: item.name,
//               value: item.value
//           });
//       });
//   });

//   return flattenedData;
// }

interface SpecificationData {
  content: {
    amenities: { name: string; value: string }[];
    boat_details: {
      title: string;
      subtitle: string;
      description: string;
    };
    specifications: {
      "Fin Keel": { name: string; value: string }[];
      "Wing Keel": { name: string; value: string }[];
      "General Dimensions": { name: string; value: string }[];
    };
  };
}

function convertToSpecificationData(data: any) {
  console.log("getting convertible data", data);
  // Check if 'data' and 'content' exist
  if (!data || typeof data !== "object") {
    console.error("Invalid data provided.");
    return []; // Return empty if the data is invalid
  }

  // Now we can safely access 'data.content'
  const specificationData = Object.keys(data).map((section) => ({
    title: section,
    specs: data[section].map((spec: any) => ({
      name: spec.name,
      value: spec.value,
    })),
  }));

  console.log("finished data", specificationData);
  return specificationData;
}

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

// Function to check if `specificationData.content.specifications` exists and is valid
function hasValidSpecifications(data: any): boolean {
  return (
    data &&
    typeof data === "object" &&
    "content" in data &&
    data.content &&
    typeof data.content === "object" &&
    "specifications" in data.content &&
    Array.isArray(data.content.specifications)
  );
}

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
// function convertSpecificationData(
//   data: RawSpecificationData
// ): SpecificationCategory[] {
//   return Object.entries(data).map(([title, specs]) => ({
//     title,
//     specs: Array.isArray(specs) ? specs : [],
//   }));
// }
const SpecificationsSection = () => {
  // const [specificationData, setSpecificationData] = useState<
  //   SpecificationCategory[]
  // >([]);
  // useEffect(() => {
  //   fetchVehicleAmenitiesSpec();
  // }, []);

  const { data: specificationData } = useQuery({
    queryKey: ["specification-details"],
    queryFn: () => getAmenitiess(),
  });

  console.log("spec data", specificationData);
  // async function fetchVehicleAmenities() {
  //   // console.log("in the fetchVehicle function");

  //   const { data, error } = await supabase
  //     .from("vehicle_details")
  //     .select("content")
  //     .eq("section_type", "specifications")

  //     .single();

  //   if (error) {
  //     console.error("Error fetching vehicle:", error);
  //   } else {
  //     // console.log("checking data in else", data.id);
  //     const convertedData = convertSpecificationData(
  //       data.content as RawSpecificationData
  //     );

  //     setSpecificationData(convertedData);
  //   }
  // }
  // console.log("specification", specificationData);
  return (
    <div className="mb-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-black dark:text-white">
        Specifications
      </h2>
      <DecoratorLine />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specificationData &&
          typeof specificationData === "object" &&
          "content" in specificationData &&
          specificationData.content &&
          typeof specificationData.content === "object" &&
          "specifications" in specificationData.content &&
          convertToSpecificationData(
            specificationData?.content?.specifications
          )?.map((section, index) => (
            <div
              key={index}
              className=" bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg  "
            >
              <LegendComponent text={section.title} />

              {/* <div className="bg-black dark:bg-gray-900 text-white p-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div> */}
              <div className="p-4 overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {section?.specs?.map((spec: any, specIndex: any) => (
                      <tr
                        key={specIndex}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className=" text-sm">
                          <AnchorIcon className="text-flatBlue" />
                        </td>

                        <td className=" px-2    py-2 sm:px-2 sm:py-3 text-sm font-medium text-gray-900 dark:text-white">
                          {spec.name}
                        </td>

                        <td className="  py-2 sm:px-6 sm:py-3 text-sm text-gray-500 dark:text-gray-300">
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

    // <div className="mb-8 px-4 sm:px-6 lg:px-8">
    //   <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black dark:text-white">
    //     Specifications
    //   </h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {specificationData?.map((section, index) => (
    //       <div
    //         key={index}
    //         className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
    //       >
    //         <div className="bg-black dark:bg-gray-900 text-white p-4">
    //           <h3 className="text-lg font-semibold">{section.title}</h3>
    //         </div>
    //         <div className="p-4 overflow-x-auto">
    //           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    //             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
    //               {section?.specs?.map((spec, specIndex) => (
    //                 <tr
    //                   key={specIndex}
    //                   className="hover:bg-gray-100 dark:hover:bg-gray-700"
    //                 >
    //                   <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
    //                     {spec.name}
    //                   </td>
    //                   <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-300">
    //                     {spec.value}
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    // <div className="mb-8 px-4 sm:px-6 lg:px-8">
    //   <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">
    //     Specifications
    //   </h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {specificationData?.map((section, index) => (
    //       <div
    //         key={index}
    //         className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
    //       >
    //         <div className="bg-black dark:bg-gray-900 text-white p-4">
    //           <h3 className="text-lg font-semibold">{section.title}</h3>
    //         </div>
    //         <div className="p-4">
    // <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    //   <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
    //     {section?.specs?.map((spec, specIndex) => (
    //       <tr
    //         key={specIndex}
    //         className="hover:bg-gray-100 dark:hover:bg-gray-700"
    //       >
    //         <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
    //           {spec.name}
    //         </td>
    //         <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-300">
    //           {spec.value}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

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

// import { SwiperSlide, Swiper } from "swiper/react";
// import "swiper/swiper-bundle.min.css"; // Swiper styles

// const VirtualTour = () => {
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

//   return (
//     <div className="bg-[#f0f8ff] py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center justify-center">
//           <span className="mr-2">📸</span> Virtual Tour
//         </h2>
//         <div className="relative">
//           <Swiper
//             spaceBetween={30}
//             slidesPerView={1}
//             loop={true}
//             pagination={{ clickable: true }}
//             navigation
//             className="mySwiper"
//           >
//             {images.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <img
//                   src={`/images/${img}`}
//                   alt={`Virtual tour image ${index + 1}`}
//                   className="object-cover w-full h-full rounded-lg shadow-lg"
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExteriorPhotos = () => {
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

//     // <div className="bg-white py-8">
//     //   <div className="container mx-auto px-4">
//     //     <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//     //       <Anchor className="mr-2" />
//     //       Exterior Photos
//     //     </h2>
//     //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//     //       {[
//     //         "WINDWARD_28_EVENING_STAR1",
//     //         "WINDWARD_28_EVENING_STAR2",
//     //         "WINDWARD_28_EVENING_STAR3",
//     //         "WINDWARD_28_EVENING_S",
//     //       ].map((img, index) => (
//     //         <div
//     //           key={index}
//     //           className="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"
//     //         >
//     //           <div className="absolute inset-0 flex items-center justify-center text-gray-500">
//     //             {img}
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

import { fetchVehicleAmenities, getAmenitiess } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import LegendComponent from "../common/left-triangle";
import DecoratorLine from "../common/decorator-icon-line";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const images = [
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4543.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4544.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4545.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4546.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4547.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4548.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4549.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4550.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4551.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4552.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4553.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4554.jpg",
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

const ImageModal = ({ isOpen, onClose, image }: any) => {
  if (!isOpen) return null;

  console.log("image in modal compoennt", image);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          &times;
        </button>
        <Image
          src="https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4546.jpg"
          alt={image.alt}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

// export default function YachtGallery() {
//   // const [api, setApi] = React.useState<any>();

//   // const scrollPrev = React.useCallback(() => {
//   //   api?.scrollPrev();
//   // }, [api]);

//   // const scrollNext = React.useCallback(() => {
//   //   api?.scrollNext();
//   // }, [api]);

//   const [startIndex, setStartIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const nextSlide = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % (images.length - 3));
//   };

//   const prevSlide = () => {
//     setStartIndex(
//       (prevIndex) => (prevIndex - 1 + (images.length - 3)) % (images.length - 3)
//     );
//   };

//   const openModal = (image) => {
//     console.log("iamge before setting it ", image);
//     setSelectedImage(image.src);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//   };

//   return (
//     // <div className="container mx-auto px-4 py-8">
//     //   <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-primary flex items-center">
//     //     <Compass className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
//     //     Exterior Photos
//     //   </h2>
//     //   <div className="relative">
//     //     <Carousel setApi={setApi} className="w-full">
//     //       <CarouselContent>
//     //         {images.map((image, index) => (
//     //           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//     //             <div className="p-1">
//     //               <div className="relative aspect-[4/3] mb-2">
//     //                 <Image
//     //                   src={image.src}
//     //                   alt={image.alt}
//     //                   layout="fill"
//     //                   objectFit="cover"
//     //                   className="rounded-lg"
//     //                 />
//     //               </div>
//     //               <p className="text-sm text-center text-muted-foreground">
//     //                 {image.caption}
//     //               </p>
//     //             </div>
//     //           </CarouselItem>
//     //         ))}
//     //       </CarouselContent>
//     //       <CarouselPrevious className="hidden sm:flex -left-4 bg-background/80 hover:bg-background" />
//     //       <CarouselNext className="hidden sm:flex -right-4 bg-background/80 hover:bg-background" />
//     //     </Carousel>
//     //   </div>
//     //   <div className="flex justify-center space-x-4 mt-4 sm:hidden">
//     //     <Button
//     //       variant="outline"
//     //       size="sm"
//     //       onClick={scrollPrev}
//     //       aria-label="Previous slide"
//     //     >
//     //       <ChevronLeft className="h-4 w-4 mr-2" />
//     //       Previous
//     //     </Button>
//     //     <Button
//     //       variant="outline"
//     //       size="sm"
//     //       onClick={scrollNext}
//     //       aria-label="Next slide"
//     //     >
//     //       Next
//     //       <ChevronRight className="h-4 w-4 ml-2" />
//     //     </Button>
//     //   </div>
//     // </div>

//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1e3a8a] flex items-center">
//         <Compass className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
//         Exterior Photos
//       </h2>
//       <div className="relative">
//         <div className="flex  sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 overflow-hidden">
//           {images.slice(startIndex, startIndex + 4).map((image, index) => (
//             <div
//               key={index}
//               className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
//               onClick={() => openModal(image)} // Open modal on click
//             >
//               <div className="relative aspect-[4/3] mb-2">
//                 <Image
//                   src={image.src}
//                   alt={image.alt}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               </div>
//               <p className="text-sm text-center text-gray-600">
//                 {image.caption}
//               </p>
//             </div>
//           ))}
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white hidden sm:flex"
//           onClick={prevSlide}
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white hidden sm:flex"
//           onClick={nextSlide}
//           aria-label="Next slide"
//         >
//           <ChevronRight className="h-6 w-6" />
//         </Button>
//       </div>
//       <div className="flex justify-center space-x-4 mt-4 sm:hidden">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={prevSlide}
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="h-4 w-4 mr-2" />
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={nextSlide}
//           aria-label="Next slide"
//         >
//           Next
//           <ChevronRight className="h-4 w-4 ml-2" />
//         </Button>
//       </div>

//       {/* Modal for displaying the image */}
//       <ImageModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         image={selectedImage}
//       />
//     </div>
//   );
// }

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
  is360?: boolean;
}

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
  is360?: boolean;
}

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  ZoomIn,
  ZoomOut,
  Rotate3D,
  Maximize,
  Minimize,
} from "lucide-react";

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
  is360?: boolean;
}

export default function YachtGallery({
  images = [],
  title = "External",
}: {
  images: ImageProps[];
  title: string;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCardboardView, setIsCardboardView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % (images.length - 3));
  };

  const prevSlide = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + (images.length - 3)) % (images.length - 3)
    );
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setScale(1);
    setRotation(0);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsFullScreen(false);
    setIsCardboardView(false);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const handle360Rotation = (e: React.MouseEvent<HTMLImageElement>) => {
    if (
      selectedImageIndex !== null &&
      images[selectedImageIndex].is360 &&
      imageRef.current
    ) {
      const { left, width } = imageRef.current.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const rotationDegree = (mouseX / width) * 360;
      setRotation(rotationDegree);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const toggleCardboardView = () => {
    setIsCardboardView(!isCardboardView);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => ((prevIndex as number) + 1) % images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) =>
          ((prevIndex as number) - 1 + images.length) % images.length
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        setIsCardboardView(false);
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1e3a8a] flex items-center">
        <Compass className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
        {title}
      </h2>
      <div className="relative">
        <div className="flex sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 overflow-hidden">
          {images.slice(startIndex, startIndex + 4).map((image, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <div
                className="relative aspect-[4/3] mb-2 cursor-pointer"
                onClick={() => openModal(startIndex + index)}
              >
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
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white text-black hover:bg-white hidden sm:flex"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white hover:bg-white hidden sm:flex"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex justify-center space-x-4 mt-4 sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={closeModal}>
        <DialogContent className="max-w-full w-full h-[90vh] p-0 bg-transparent border-none shadow-none">
          <div
            className="fixed inset-0 bg-black opacity-80"
            onClick={closeModal}
          ></div>
          <DialogTitle></DialogTitle>
          <div
            ref={containerRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImageIndex !== null && (
              <div
                className={`relative w-full h-full ${
                  isCardboardView ? "flex" : ""
                }`}
              >
                <Image
                  ref={imageRef}
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].alt}
                  layout="fill"
                  objectFit="contain"
                  className={`rounded-lg ${
                    isCardboardView ? "w-1/2" : "w-full"
                  }`}
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseMove={handle360Rotation}
                />
                {isCardboardView && (
                  <Image
                    src={images[selectedImageIndex].src}
                    alt={images[selectedImageIndex].alt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg w-1/2 ml-1/2"
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s ease-in-out",
                    }}
                  />
                )}
              </div>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomIn}
                className="bg-white/20 hover:bg-white/40 text-white"
              >
                <ZoomIn className="h-4 w-4 mr-2" />
                Zoom In
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomOut}
                className="bg-white/20 hover:bg-white/40 text-white"
              >
                <ZoomOut className="h-4 w-4 mr-2" />
                Zoom Out
              </Button>
              {selectedImageIndex !== null &&
                images[selectedImageIndex].is360 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={toggleCardboardView}
                    className="bg-white/20 hover:bg-white/40 text-white"
                  >
                    <Rotate3D className="h-4 w-4 mr-2" />
                    {isCardboardView ? "Normal View" : "Cardboard View"}
                  </Button>
                )}
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleFullScreen}
                className="bg-white/20 hover:bg-white/40 text-white"
              >
                {isFullScreen ? (
                  <>
                    <Minimize className="h-4 w-4 mr-2" />
                    Exit Full Screen
                  </>
                ) : (
                  <>
                    <Maximize className="h-4 w-4 mr-2" />
                    Full Screen
                  </>
                )}
              </Button>
            </div>

            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white hover:bg-gray/40 text-black"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white hover:bg-white/40 text-black"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// export default function YachtGallery() {
//   const [startIndex, setStartIndex] = useState(0);

//   const nextSlide = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % (images.length - 3));
//   };

//   const prevSlide = () => {
//     setStartIndex(
//       (prevIndex) => (prevIndex - 1 + (images.length - 3)) % (images.length - 3)
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-4 text-[#1e3a8a] flex items-center">
//         <Compass className="mr-2" />
//         Exterior Photos
//       </h2>
//       <div className="relative">
//         <div className="flex space-x-4 overflow-hidden">
//           {images.slice(startIndex, startIndex + 4).map((image, index) => (
//             <div key={index} className="flex-none w-1/4">
//               <div className="relative aspect-[4/3] mb-2">
//                 <Image
//                   src={image.src}
//                   alt={image.alt}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-lg"
//                 />
//               </div>
//               <p className="text-sm text-center text-gray-600">
//                 {image.caption}
//               </p>
//             </div>
//           ))}
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
//           onClick={prevSlide}
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
//           onClick={nextSlide}
//           aria-label="Next slide"
//         >
//           <ChevronRight className="h-6 w-6" />
//         </Button>
//       </div>
//     </div>
//   );
// }
export { SpecificationsSection, VesselOverview };
// , VirtualTour, ExteriorPhotos

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
