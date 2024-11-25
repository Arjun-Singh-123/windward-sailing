import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const fetchUserSelections = async (sectionId: any) => {
  const { data, error } = await supabase
    .from("user_selections")
    .select("*")
    .eq("section_id", sectionId);

  if (error) throw new Error(error.message);
  return data;
};

const updateUserSelection = async ({
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

const updateExternalImageStatus = async ({
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
const fetchBoatsNavItem = async () => {
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

  if (error) throw new Error(error.message);
  return data;
};

const SectionProducts = ({ sectionId, benefitsId }: any) => {
  const queryClient = useQueryClient();

  console.log("checking ids", sectionId, benefitsId, sectionId === benefitsId);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const { data: userSelections = [] } = useQuery({
    queryKey: ["userSelections", sectionId],
    queryFn: () => fetchUserSelections(sectionId),
  });

  const { data: boatsNavItem } = useQuery({
    queryKey: ["boatsNavItem"],
    queryFn: fetchBoatsNavItem,
  });

  const mutation = useMutation({
    mutationFn: updateUserSelection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSelections", sectionId],
      });
      toast.success("Selection updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating selection: ${error.message}`);
    },
  });
  const imageMutation = useMutation({
    mutationFn: updateExternalImageStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSelections", sectionId],
      });
      toast.success("Selection updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating selection: ${error.message}`);
    },
  });

  const handleCheckboxChange = (productId: any, isChecked: any) => {
    mutation.mutate({
      sectionId,
      productId,
      isSelected: isChecked,
      isExternalImage: false,
    });
  };

  const handleSwitchChange = (productId: any, isExternalImage: any) => {
    console.log("checking debugging", isExternalImage);
    imageMutation.mutate({ sectionId, productId, isExternalImage });
    // updateExternalImageStatus(sectionId, productId, isExternalImage);
    // mutation.mutate({
    //   sectionId,
    //   productId,
    //   isSelected: true,
    //   isExternalImage,
    // });
  };

  if (!boatsNavItem) return <div>Loading...</div>;

  return (
    <Accordion
      type="multiple"
      value={expandedSections}
      onValueChange={setExpandedSections}
      className="w-full"
    >
      {boatsNavItem?.nav_sections?.map((navSection) => (
        <AccordionItem key={navSection.id} value={navSection.id}>
          <AccordionTrigger>{navSection.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {navSection?.products?.map((product) => {
                const userSelection = userSelections?.find(
                  (s) => s.product_id === product.id
                );
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={!!userSelection}
                        onCheckedChange={(isChecked) =>
                          handleCheckboxChange(product.id, isChecked)
                        }
                      />
                      <span>{product.name}</span>
                    </div>
                    {sectionId === benefitsId && (
                      <input
                        type="checkbox"
                        title="Click to select an external image"
                        checked={userSelection?.is_external_image as boolean}
                        onChange={(e) => {
                          console.log(e.target.checked);
                          handleSwitchChange(product.id, e.target.checked);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SectionProducts;
