import { Vessel } from "@/app/vessel-amenity/page";
import { supabase } from "@/lib/supabase";

// API functions
export const fetchVessels = async (): Promise<Vessel[]> => {
  const { data, error } = await supabase.from("vessels").select("*");
  if (error) throw error;
  return data;
};

export const createVessel = async (
  vessel: Omit<Vessel, "id">
): Promise<Vessel> => {
  const { data, error } = await supabase
    .from("vessels")
    .insert([vessel])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateVessel = async (vessel: Vessel): Promise<Vessel> => {
  const { data, error } = await supabase
    .from("vessels")
    .update(vessel)
    .eq("id", vessel.id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteVessel = async (id: string): Promise<void> => {
  const { error } = await supabase.from("vessels").delete().eq("id", id);
  if (error) throw error;
};
