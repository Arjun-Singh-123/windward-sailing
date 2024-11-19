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
// import { fetchVehicleAmenitiesA } from "@/lib/services";

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
const amenitiesData = [
  { name: "MFG.", value: "Windward" },
  { name: "Size", value: "28" },
  { name: "Auto Pilot", value: "no" },
  { name: "Bimini", value: "no" },
  { name: "Bluetooth Stereo", value: "yes" },
  { name: "Cabins", value: "2" },
  { name: "Cockpit Table", value: "no" },
  { name: "Charge Station", value: "no" },
  { name: "Dept/Knot", value: "no" },
  { name: "Dodger", value: "no" },
  { name: "GPS", value: "no" },
  { name: "Head & Shower", value: "yes" },
  { name: "Ice Box", value: "no" },
  { name: "Microwave", value: "no" },
  { name: "Marine Radio", value: "no" },
  { name: "Perch Seats", value: "no" },
  { name: "Radar", value: "no" },
  { name: "Salon Table Drop", value: "no" },
  { name: "Stove", value: "Alcohol" },
  { name: "Swim Strip", value: "yes" },
  { name: "USB Charger", value: "no" },
  { name: "Windless", value: "no" },
  { name: "Rolling Furling", value: "yes" },
  { name: "Sleeps", value: "4" },
  { name: "Max. Passangers", value: "8" },
  { name: "Year Manufactured", value: "1988" },
  { name: "Engine Mfg.", value: "Universal" },
  { name: "Engine Size", value: "no" },
  { name: "Diesel Fuel", value: "22" },
  { name: "Water Holding Tank", value: "25" },
  { name: "Waste Tank", value: "1 Tank" },
];

export const HeroSection = () => {
  const [data, setAmenitiesData] = useState<any>(amenitiesData);
  const [boatData, setBoatData] = useState<any>({});

  const fetchVehicleAmenities = cache(async () => {
    try {
      const { data, error } = await supabase
        .from("vehicle_details_new")
        .select("content")

        .single();

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
    } catch (error) {
      console.error("Error in fetchVehicleAmenities:", error);
      throw error;
    }
  });

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold text-[#1e40af] mb-4">
              {data?.boat_details?.title}
            </h1>
            <p className="line-clamp-5 mb-4 text-gray-700">
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
        </div>
      </div>
    </div>
  );
};
