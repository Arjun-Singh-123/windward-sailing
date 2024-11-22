import { supabase } from "@/lib/supabase";

export const fetchRentals = async () => {
  const { data, error } = await supabase.from("rentals").select("*").single();

  if (error) {
    console.error("Error fetching rentals:", error);
    return [];
  }

  console.log(data);
  return data || [];
};
