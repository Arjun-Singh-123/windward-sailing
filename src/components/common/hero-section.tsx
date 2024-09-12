"use client";
import React, { useEffect, useState } from "react";
import { cache } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import KeyValueGrid from "./key-value-grid";
import { Json, Tables } from "../../../database.types";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicleAmenitiesA } from "@/lib/services";

// types/vehicle.ts
export type AmenityItem = {
  name: string;
  value: string;
};

export type BoatDetails = {
  title: string;
  subtitle: string;
  description: string;
};

export type VehicleContent = {
  amenities: AmenityItem[];
  boat_details: BoatDetails;
  specifications: {
    [key: string]: { name: string; value: string }[];
  };
};

export type VehicleDetailsNew = {
  id: number;
  content: VehicleContent;
};
// const amenitiesData = [
//   { name: "MFG.", value: "Windward" },
//   { name: "Size", value: "28" },
//   { name: "Auto Pilot", value: "no" },
//   { name: "Bimini", value: "no" },
//   { name: "Bluetooth Stereo", value: "yes" },
//   { name: "Cabins", value: "2" },
//   { name: "Cockpit Table", value: "no" },
//   { name: "Charge Station", value: "no" },
//   { name: "Dept/Knot", value: "no" },
//   { name: "Dodger", value: "no" },
//   { name: "GPS", value: "no" },
//   { name: "Head & Shower", value: "yes" },
//   { name: "Ice Box", value: "no" },
//   { name: "Microwave", value: "no" },
//   { name: "Marine Radio", value: "no" },
//   { name: "Perch Seats", value: "no" },
//   { name: "Radar", value: "no" },
//   { name: "Salon Table Drop", value: "no" },
//   { name: "Stove", value: "Alcohol" },
//   { name: "Swim Strip", value: "yes" },
//   { name: "USB Charger", value: "no" },
//   { name: "Windless", value: "no" },
//   { name: "Rolling Furling", value: "yes" },
//   { name: "Sleeps", value: "4" },
//   { name: "Max. Passangers", value: "8" },
//   { name: "Year Manufactured", value: "1988" },
//   { name: "Engine Mfg.", value: "Universal" },
//   { name: "Engine Size", value: "no" },
//   { name: "Diesel Fuel", value: "22" },
//   { name: "Water Holding Tank", value: "25" },
//   { name: "Waste Tank", value: "1 Tank" },
// ];

export const HeroSection = () => {
  const [amenitiesData, setAmenitiesData] = useState<AmenityItem[]>([]);
  const [boatData, setBoatData] = useState<any>({});

  const { data } = useQuery({
    queryKey: ["amenities-details"],
    queryFn: () => fetchVehicleAmenitiesA(),
  });

  // useEffect(() => {
  //   fetchVehicleAmenities();
  // }, []);

  // Define the cached function
  const fetchVehicleAmenities = cache(async () => {
    // console.log("Fetching vehicle amenities");

    try {
      // Perform the asynchronous operation to fetch data
      const { data, error } = await supabase
        .from("vehicle_details_new")
        .select("content")

        .single();
      // console.log("data of new vehicle ", data);
      // Handle errors
      if (error) {
        console.error("Error fetching vehicle:", error);
        throw new Error("Failed to fetch vehicle amenities");
      }

      if (data?.content) {
        const content = data.content as VehicleContent;

        if (Array.isArray(content.amenities)) {
          setAmenitiesData(content.amenities);
        } else {
          console.error("Amenities is not an array");
          setAmenitiesData([]);
        }

        if (content.boat_details) {
          setBoatData(content.boat_details);
        } else {
          setBoatData(null);
        }
      } else {
        setAmenitiesData([]);
        setBoatData(null);
      }

      // if (
      //   data?.content &&
      //   typeof data.content === "object" &&
      //   "amenities" in data.content
      // ) {
      //   // Now TypeScript knows data.content is of type Content
      //   setAmenitiesData(data.content.amenities);
      //   setBoatData(data.content.boat_details);
      // } else {
      //   // Handle unexpected types or structure
      //   setAmenitiesData([]);
      //   setBoatData({});
      // }
      // setAmenitiesData(data?.content?.amenities ?? []);
      // setBoatData(data?.content?.boat_details ?? {});
      // Process and return the data
      // return {
      //   amenities: data?.content?.amenities ?? [],
      //   boatDetails: data?.content?.boat_details ?? {},
      // };
    } catch (error) {
      // Log the error and rethrow it to be handled by the caller
      console.error("Error in fetchVehicleAmenities:", error);
      throw error;
    }
  });

  // async function fetchVehicleAmenities() {
  //   console.log("in the fetchVehicle function");
  //   const { data, error } = await supabase
  //     .from("vehicle_details_new ")
  //     .select("content ")
  //     .single();

  //   if (error) {
  //     console.error("Error fetching vehicle:", error);
  //   } else {
  //     // // Initialize state variables
  //     // let amenitiesData1: any = [];
  //     // let boatData = {};

  //     // // Process the fetched data
  //     // if (data) {
  //     //   data.forEach((record) => {
  //     //     if (record.section_type === "amenities") {
  //     //       amenitiesData1 = record.content.amenities ?? [];
  //     //     } else if (record.section_type === "boat-details") {
  //     //       boatData = record.content ?? {};
  //     //     }
  //     //   });
  //     // }

  //     // Set state with processed data
  //     setAmenitiesData(data?.content?.amenities);
  //     setBoatData(data?.content?.boat_details);
  //   }
  // }
  // console.log("specification , boatData", amenitiesData, boatData);
  return (
    // <div className="bg-white py-12">
    //   <div className="container mx-auto px-4">
    //     <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
    //       {/* Main Content Section */}
    //       <div className="lg:w-2/3 max-w-xl text-center lg:text-left">
    //         <h1 className="text-3xl lg:text-4xl font-bold text-[#1e40af] mb-4 lg:mb-6">
    //           {boatData?.title}
    //         </h1>
    //         <p className="text-base lg:text-lg text-gray-700 mb-4 leading-relaxed">
    //           {boatData?.description}
    //         </p>
    //         {/* Additional paragraphs (if needed) */}
    //         <p className="text-base lg:text-lg text-gray-700 mb-4">
    //           Additional content here.
    //         </p>
    //         <p className="text-base lg:text-lg text-gray-700 mb-4">
    //           Another paragraph here.
    //         </p>
    //         <p className="text-base lg:text-lg text-gray-700 mb-4">
    //           More details here.
    //         </p>
    //         <p className="text-base lg:text-lg text-gray-700">
    //           Final content here.
    //         </p>
    //       </div>

    //       {/* Amenities Section */}
    //       <div className="lg:w-1/3 relative max-w-[525px] max-h-[649px]">
    //         {amenitiesData && (
    //           <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-[#1e40af] h-full">
    //             <h2 className="text-xl font-semibold text-[#1e40af] mb-4 text-center">
    //               Vessel Amenities
    //             </h2>
    //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //               {amenitiesData.map((item, index) => (
    //                 <div
    //                   key={index}
    //                   className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0"
    //                 >
    //                   <span className="font-medium text-gray-900">
    //                     {item.name}
    //                   </span>
    //                   <span className="text-gray-700">{item.value}</span>
    //                 </div>
    //               ))}
    //             </div>
    //             <div className="absolute bottom-4 right-4 w-24 h-24">
    //               <Image
    //                 src="/images/newport.png" // Replace with your image path
    //                 alt="Vessel"
    //                 layout="fill"
    //                 objectFit="cover"
    //                 className="rounded-lg border border-gray-300"
    //               />
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="bg-white py-12">
    //   <div className="container mx-auto px-4">
    //     <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
    //       {/* Main Content Section */}
    //       <div className="lg:w-2/3 text-center lg:text-left">
    //         <h1 className="text-4xl lg:text-5xl font-bold text-[#1e40af] mb-6">
    //           {boatData?.title}
    //         </h1>
    //         <p className="text-lg text-gray-700 mb-6 leading-relaxed">
    //           {boatData?.description}
    //         </p>
    //         {/* Additional paragraphs (if needed) */}
    //         <p className="text-lg text-gray-700 mb-4">
    //           Additional content here.
    //         </p>
    //         <p className="text-lg text-gray-700 mb-4">
    //           Another paragraph here.
    //         </p>
    //         <p className="text-lg text-gray-700 mb-4">More details here.</p>
    //         <p className="text-lg text-gray-700">Final content here.</p>
    //       </div>

    //       {/* Amenities Section */}
    //       <div className="lg:w-1/3 max-w-lg mx-auto">
    //         {amenitiesData && (
    //           <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-[#1e40af]">
    //             <h2 className="text-2xl font-semibold text-[#1e40af] mb-6 text-center">
    //               Vessel Amenities
    //             </h2>
    //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    //               {amenitiesData.map((item, index) => (
    //                 <div
    //                   key={index}
    //                   className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-b-0"
    //                 >
    //                   <span className="font-medium text-gray-900">
    //                     {item.name}
    //                   </span>
    //                   <span className="text-gray-700">{item.value}</span>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="bg-white py-12">
    //   <div className="container mx-auto px-4">
    //     <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
    //       {/* Main Content Section */}
    //       <div className="lg:w-2/3 text-center lg:text-left">
    //         <h1 className="text-4xl lg:text-5xl font-bold text-[#1e40af] mb-6">
    //           {boatData?.title}
    //         </h1>
    //         <p className="text-lg text-gray-700 mb-6 leading-relaxed">
    //           {boatData?.description}
    //         </p>
    //         {/* Additional paragraphs (if needed) */}
    //         <p className="text-lg text-gray-700 mb-4">
    //           Additional content here.
    //         </p>
    //         <p className="text-lg text-gray-700 mb-4">
    //           Another paragraph here.
    //         </p>
    //         <p className="text-lg text-gray-700 mb-4">More details here.</p>
    //         <p className="text-lg text-gray-700">Final content here.</p>
    //       </div>

    //       {/* Amenities Section */}
    //       <div className="lg:w-1/3">
    //         {amenitiesData && (
    //           <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-[#1e40af]">
    //             <h2 className="text-2xl font-semibold text-[#1e40af] mb-4">
    //               Vessel Amenities
    //             </h2>
    //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //               {amenitiesData.map((item, index) => (
    //                 <div
    //                   key={index}
    //                   className="flex justify-between border-b border-gray-200 pb-2 last:border-b-0"
    //                 >
    //                   <span className="font-medium text-gray-900">
    //                     {item.name}
    //                   </span>
    //                   <span className="text-gray-700">{item.value}</span>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="bg-white py-12">
    //   <div className="container mx-auto px-4">
    //     <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
    //       {/* Main Content Section */}
    //       <div className="lg:w-2/3 text-center lg:text-left">
    //         <h1 className="text-4xl lg:text-5xl font-bold text-[#1e40af] mb-6">
    //           {boatData?.title}
    //         </h1>
    //         <p className="text-lg text-gray-700 mb-6 leading-relaxed">
    //           {boatData?.description}
    //         </p>
    //         {/* Additional paragraphs (if needed) */}
    //         <p className="text-lg text-gray-700 mb-4">
    //           Additional content here.
    //         </p>
    //         <p className="text-lg text-gray-700 mb-4">
    //           Another paragraph here.
    //         </p>
    //         <p className="text-lg text-gray-700 mb-4">More details here.</p>
    //         <p className="text-lg text-gray-700">Final content here.</p>
    //       </div>

    //       {/* Amenities Section */}
    //       <div className="lg:w-1/3">
    //         {amenitiesData && (
    //           <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-[#1e40af]">
    //             <h2 className="text-2xl font-semibold text-[#1e40af] mb-4">
    //               Vessel Amenities
    //             </h2>
    //             <ul className="list-disc list-inside space-y-2 text-gray-700">
    //               {amenitiesData.map((item, index) => (
    //                 <li key={index} className="flex justify-between">
    //                   <span className="font-medium">{item.name}</span>
    //                   <span>{item.value}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold text-[#1e40af] mb-4">
              {data?.boat_details?.title}
            </h1>
            <p className="mb-4 text-gray-700">
              {data?.boat_details?.description}
            </p>
            <p className="mb-4 text-gray-700"></p>
            <p className="mb-4 text-gray-700"></p>
            <p className="mb-4 text-gray-700"></p>
            <p className="text-gray-700"></p>
          </div>

          <div className="lg:w-1/3">
            {data?.amenities && (
              <KeyValueGrid
                title="Vessel Amenities"
                data={data?.amenities}
                maxHeight="300px"
                columns={2}
              />
            )}
          </div>

          {/* <div className="lg:w-1/3">
            <Card className="border-[#1e40af]">
              <CardHeader className="bg-[#1e40af] text-white">
                <CardTitle>Vessel Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {amenitiesData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-[#1e40af]">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// Dummy data for demonstration
// const amenitiesData = [
//   { name: "Cabins", value: "2" },
//   { name: "Bathrooms", value: "1" },
//   { name: "Engine", value: "Inboard" },
//   { name: "Length", value: "28 ft" },
//   { name: "Beam", value: "8 ft" },
//   { name: "Draft", value: "3 ft" },
//   // Add more items if needed
// ];

// Components (assuming these are defined elsewhere or use Tailwind classes directly)
