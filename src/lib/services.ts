import { supabase } from "./supabase";

export async function getAmenities() {
  const { data, error } = await supabase
    .from("vehicle_details")
    .select("content")
    .eq("section_type", "amenities")
    .single();

  if (error) throw error;
  return data.content.amenities;
}

export async function getAmenitiess() {
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
