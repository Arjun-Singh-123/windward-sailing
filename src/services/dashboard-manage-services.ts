import { supabase } from "@/lib/supabase";

export const fetchDashBoardSectionsAndNavItems = async () => {
  const { data: sections, error: sectionsError } = await supabase
    .from("sections")
    .select("*")
    .order("display_order", { ascending: true });

  if (sectionsError) throw new Error(sectionsError.message);

  const { data: navItems, error: navItemsError } = await supabase
    .from("nav_items")
    .select(
      `
        id,
        name,
        href,
        status,
        nav_sections (
          id,
          name,
          href,
          status,
          products (
            id,
            name,
            href,
            product_details (*)
          )
        )
      `
    )
    .eq("name", "Boats")
    .order("priority", { ascending: true });

  if (navItemsError) throw new Error(navItemsError.message);

  return { sections, navItems };
};

export const updateDashBoardSectionStatus = async ({
  sectionId,
  status,
}: any) => {
  const { error } = await supabase
    .from("sections")
    .update({ status })
    .eq("id", sectionId);

  if (error) throw new Error(error.message);
};

export const fetchDashBoardUserSelections = async (sectionId: any) => {
  const { data, error } = await supabase
    .from("user_selections")
    .select("*")
    .eq("section_id", sectionId);

  if (error) throw new Error(error.message);
  return data;
};

export const fetchDashBoardBoatsNavItem = async () => {
  const { data, error } = await supabase
    .from("nav_items")
    .select(
      `
        id,
        name,
        nav_sections (
          id,
          name,
          products (
            id,
            name,
            product_details (
              images
            )
          )
        )
      `
    )
    .eq("name", "Boats")
    .single();

  console.log(data);
  if (error) throw new Error(error.message);
  return data;
};

export const updateDashBoardUserSelection = async ({
  sectionId,
  productId,
  isSelected,
  isExternalImage,
}: any) => {
  if (isSelected) {
    const { error } = await supabase.from("user_selections").upsert({
      section_id: sectionId,
      product_id: productId,
      is_external_image: isExternalImage,
    });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("user_selections")
      .delete()
      .match({ section_id: sectionId, product_id: productId });
    if (error) throw new Error(error.message);
  }
};

export const updateDashBoardExternalImageStatus = async ({
  sectionId,
  productId,
  isExternalImage,
}: any) => {
  try {
    const { error } = await supabase
      .from("user_selections")
      .update({ is_external_image: isExternalImage })
      .match({ section_id: sectionId, product_id: productId });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error updating external image status:", error);
    throw error;
  }
};
