"use client";
import React, { useEffect, useState } from "react";
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
  const [amenitiesData, setAmenitiesData] = useState<any[]>([]);
  const [boatData, setBoatData] = useState<any>({});

  useEffect(() => {
    fetchVehicleAmenities();
  }, []);

  async function fetchVehicleAmenities() {
    console.log("in the fetchVehicle function");
    const { data, error } = await supabase
      .from("vehicle_details_new ")
      .select("content ")
      .single();

    if (error) {
      console.error("Error fetching vehicle:", error);
    } else {
      // // Initialize state variables
      // let amenitiesData1: any = [];
      // let boatData = {};

      // // Process the fetched data
      // if (data) {
      //   data.forEach((record) => {
      //     if (record.section_type === "amenities") {
      //       amenitiesData1 = record.content.amenities ?? [];
      //     } else if (record.section_type === "boat-details") {
      //       boatData = record.content ?? {};
      //     }
      //   });
      // }

      // Set state with processed data
      setAmenitiesData(data?.content?.amenities);
      setBoatData(data?.content?.boat_details);
    }
  }
  console.log("specification , boatData", amenitiesData, boatData);
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold text-[#1e40af] mb-4">
              {boatData?.title}
            </h1>
            <p className="mb-4 text-gray-700">{boatData?.description}</p>
            <p className="mb-4 text-gray-700"></p>
            <p className="mb-4 text-gray-700"></p>
            <p className="mb-4 text-gray-700"></p>
            <p className="text-gray-700"></p>
          </div>

          <div className="lg:w-1/3">
            <KeyValueGrid
              title="Vessel Amenities"
              data={amenitiesData}
              maxHeight="300px"
              columns={2}
            />
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
