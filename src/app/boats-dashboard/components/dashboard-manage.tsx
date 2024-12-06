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

import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import SectionProducts from "./section-products-dashboard";
import {
  fetchDashBoardSectionsAndNavItems,
  updateDashBoardSectionStatus,
} from "@/services/dashboard-manage-services";

function Dashboard() {
  const queryClient = useQueryClient();
  const [benefitsId, setBenefitsId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
    }
  }, []);
  const { data, isLoading, error } = useQuery({
    queryKey: ["sectionsAndNavItems"],
    queryFn: fetchDashBoardSectionsAndNavItems,
    placeholderData: keepPreviousData,

    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["sectionsAndNavItems"])?.dataUpdatedAt,
  });

  const statusMutation = useMutation({
    mutationFn: updateDashBoardSectionStatus,

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
  }, [data]);

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
              <span>{section?.name}</span>
              {/* <div className="flex items-center space-x-2">
                <span className="text-sm font-normal">Publish</span>
                <input
                  type="checkbox"
                  checked={section.status === "published"}
                  className="switch"
                  onChange={(e) =>
                    handleStatusChange(
                      section.id,
                      e.target.checked ? "published" : "draft"
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
      {/* {  staticSections?.map((section: any) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="text-xl font-bold">
            <span className=" ">{section.name}</span>
          </AccordionTrigger>

          <AccordionContent>
 
            {section.name === "About Yachts" && (
              <AboutEditor
              
              />
            )}
            {section.name === "Statistics" && (
              <StatsEditor
               
              />
            )}
          </AccordionContent>
        </AccordionItem>
      ))} */}
    </Accordion>
  );
}

export default Dashboard;
