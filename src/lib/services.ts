"use server";
import { RawSpecificationData } from "@/components/sections/specification";
import { supabase } from "./supabase";
import { convertSpecificationData } from "./utils";
import { VehicleContent } from "@/components/common/hero-section";

// export async function getAmenities() {
//   const { data, error } = await supabase
//     .from("vehicle_details")
//     .select("content")
//     .eq("section_type", "amenities")
//     .single();

//   if (error) throw error;
//   return data?.content?.amenities ?? [];
// }

// export async function getAmenitiess() {
//   const { data, error } = await supabase
//     .from("vehicle_details")
//     .select("content")
//     .eq("id", 1)
//     .single();

//   if (error) {
//     console.error("Error fetching vehicle:", error);
//     return [];
//   }

//   return data?.content?.amenities ?? [];
// }

export const fetchVehicleAmenities = async () => {
  // console.log("Fetching vehicle amenities");

  try {
    // Perform the asynchronous operation to fetch data
    const { data, error } = await supabase.from("members").select("*");

    // Handle errors

    // console.log("members data", data);
    if (error) {
      console.error("Error fetching vehicle:", error);
      throw new Error("Failed to fetch vehicle amenities");
    }
    return data;
    // Process and return the data
  } catch (error) {
    // Log the error and rethrow it to be handled by the caller
    console.error("Error in fetchVehicleAmenities:", error);
    throw error;
  }
};

export async function fetchVehicleAmenitiesSpec() {
  // console.log("in the fetchVehicle function");

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
    return convertedData;
    // setSpecificationData(convertedData);
  }
}

// Define the cached function
export const fetchVehicleAmenitiesA = async () => {
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
      return content;
    }
    // if (Array.isArray(content.amenities)) {
    //   setAmenitiesData(content.amenities);
    // } else {
    //   console.error("Amenities is not an array");
    //   setAmenitiesData([]);
    // }

    //   if (content.boat_details) {
    //     setBoatData(content.boat_details);
    //   } else {
    //     setBoatData(null);
    //   }
    // }

    // else {
    //   setAmenitiesData([]);
    //   setBoatData(null);
    // }

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
};
