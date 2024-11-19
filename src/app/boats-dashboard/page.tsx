"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/lib/supabase";
// import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import SectionProducts from "./components/section-products-dashboard";
import AboutEditor from "./components/about-section-editor";
import StatsEditor from "./components/stats-section-editor";

const fetchSectionsAndNavItems = async () => {
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
const updateSectionStatus = async ({ sectionId, status }: any) => {
  const { error } = await supabase
    .from("sections")
    .update({ status })
    .eq("id", sectionId);

  if (error) throw new Error(error.message);
};

function Dashboard() {
  const queryClient = useQueryClient();
  const [benefitsId, setBenefitsId] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["sectionsAndNavItems"],
    queryFn: fetchSectionsAndNavItems,
    placeholderData: keepPreviousData,

    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["sectionsAndNavItems"])?.dataUpdatedAt,
  });

  const statusMutation = useMutation({
    mutationFn: updateSectionStatus,
    // onMutate: async ({ sectionId, status }) => {
    //   // Optimistically update the status
    //   await queryClient.cancelQueries({ queryKey: ["sections"] });

    //   const previousSections = queryClient.getQueryData(["sections"]);

    //   queryClient.setQueryData(["sections"], (old) =>
    //     old?.map((section) =>
    //       section.id === sectionId ? { ...section, status } : section
    //     )
    //   );

    //   return { previousSections };
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectionsAndNavItems"] });

      toast.success("Section status updated successfully");
    },
    onError: (error, variables, context) => {
      // Rollback to previous state on error
      // queryClient.setQueryData(["sections"], context?.previousSections);
      toast.error(`Error updating section status: ${error.message}`);
    },
  });

  useEffect(() => {
    if (data) {
      const id =
        data?.sections?.find((item) => item.name === "Benefits")?.id || null;
      setBenefitsId(id as any);
    }
  }, [data]); // Only runs when data changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  //   const { sections , navItems } = data;

  const handleStatusChange = (sectionId: any, status: any) => {
    statusMutation.mutate({ sectionId, status });
  };

  const dynamicSections = data?.sections.filter(
    (section: any) => section.type === "dynamic"
  );
  const staticSections = data?.sections.filter(
    (section: any) => section.type === "static"
  );

  return (
    <Accordion type="single" collapsible className="w-full pt-40 px-8  ">
      {dynamicSections?.map((section: any) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="text-xl font-bold">
            <div className="flex items-center justify-between w-full">
              <span>{section.name}</span>
              {/* <div className="flex items-center space-x-2">
                <span className="text-sm font-normal">Publish</span>
                <Switch
                  checked={section.status === "published"}
                  className="switch"
                  onCheckedChange={(isPublished) =>
                    handleStatusChange(
                      section.id,
                      isPublished ? "published" : "draft"
                    )
                  }
                />
              </div> */}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SectionProducts
              sectionId={section.id}
              benefitsId={benefitsId}
              //   navItems={navItems}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
      {staticSections?.map((section: any) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="text-xl font-bold">
            <span className=" ">{section.name}</span>
          </AccordionTrigger>

          <AccordionContent>
            {/* <StaticSectionEditor key={section.id} section={section} /> */}

            {section.name === "About Yachts" && (
              <AboutEditor
              // sectionId={section.id}
              // initialData={section.content || {}}
              />
            )}
            {section.name === "Statistics" && (
              <StatsEditor
              // sectionId={section.id}
              // initialData={section.content || { stats: [] }}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Dashboard;
