import { supabase } from "@/lib/supabase";

export const fetchNavItems = async () => {
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
            href
          )
        )
      `
    )
    .order("priority", { ascending: true });

  if (navItemsError) {
    throw new Error(navItemsError.message);
  }

  return navItems;
};

export const fetchFooterContent = async () => {
  const { data, error } = await supabase
    .from("footer_contentsa")
    .select("*")
    .single();

  if (error) throw error;
  return data;
};
