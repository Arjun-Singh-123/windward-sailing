import { Tables } from "../../database.types";
import { supabase } from "./supabase";
import { cache } from "react";

export async function getAmenities() {
  const { data, error } = await supabase
    .from("vehicle_details")
    .select("content")
    .eq("section_type", "amenities")
    .single();

  if (error) throw error;
  return data.content.amenities;
}

export async function getAmenitiess(): Promise<Tables<'vehicle_details_new'>['content']['amenities']>  {
  const { data, error } = await supabase
    .from("vehicle_details")
    .select("content")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching vehicle:", error);
    return [];
  }

  return data?.content?.amenities ?? [];
}

export const fetchVehicleAmenities = async () => {
  console.log("Fetching vehicle amenities");

  try {
    // Perform the asynchronous operation to fetch data
    const { data, error } = await supabase.from("members").select("*");

    // Handle errors

    console.log("members data", data);
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
