"use client";
import CommonMembershipAbout from "@/components/common/common-member-about";
import Detail from "@/components/common/details";
import ResponsiveImageCarousel from "@/components/common/image-slider";
import StatsSlider from "@/components/common/stats";

import Heroo from "@/components/sections/heroo";
import SailingServices from "@/components/sections/sailing-services";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import {
  Bath,
  Bed,
  ChefHat,
  CookingPot,
  Music,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { useMemo } from "react";
import MemberCarousel from "./slick/page";

type Section = {
  id: number;
  section_name: string;
  is_visible: boolean;
  page: string;
};

const fetchSections = async (): Promise<Section[]> => {
  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .eq("page", "home")
    .order("id");
  if (error) throw error;
  return data as Section[];
};
const description =
  "Since 1972, Newport's has been Newport Beach's first choice for sailing. Over more than 50 years, we've earned an excellent reputation under the same family management. Our goal is to meet the needs of all sailing enthusiasts, from the novice to the seasoned skipper—all while remaining affordable.  With affordable vessels, we’re proud to offer a sailing experience you can trust. Let our boats take you on a journey where passion meets the open sea!";
export default function Home() {
  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchSections,
  });

  const visibilityMap: Record<string, boolean> = (sections || []).reduce(
    (acc: Record<string, boolean>, section: Section) => {
      if (
        section &&
        section.section_name &&
        typeof section.is_visible === "boolean"
      ) {
        acc[section.section_name] = section.is_visible;
      }
      return acc;
    },
    {}
  );

  const iconStyle = { width: "40px", height: "40px" };

  return (
    <div className="flex flex-col items-center min-h-screen p-0 home-page   ">
      {visibilityMap["hero-image"] && <Heroo />}
      {visibilityMap["sailing-services"] && <SailingServices />}
      {/* <HeroSection /> */}

      {visibilityMap["benefits-section"] && (
        <section className="w-full bg-lightSky section-py-80">
          <div className="container mx-auto w-full max-w-[1630px] px-[15px]">
            <Detail
              benefits={false}
              benefitsData={[
                {
                  icon: <Bath style={iconStyle} />,
                  title: "Bathroom",
                  description: "Pumped out and ready for your adventure",
                },
                {
                  icon: <Music style={iconStyle} />,
                  title: "Music",
                  description:
                    "Many boats have music with Bluetooth connection. ",
                },
                {
                  icon: <ChefHat style={iconStyle} />,
                  title: "Kitchen",
                  description:
                    "Stocked with cooking utensils, silverware, plates, cups and more.  Some boats have stove, oven, ice box or fridge, and a kitchen sink.",
                },
                {
                  icon: <Wifi style={iconStyle} />,
                  title: "Maps, radios and safety equipment",
                  description:
                    "All the equipment to have a safe adventure is already onboard.",
                },

                {
                  icon: <CookingPot style={iconStyle} />,
                  title: "Additional options",
                  description:
                    "Add a rail mounted charcoal grill and a dinghy for a small charge.",
                },

                {
                  icon: <ShieldCheck style={iconStyle} />,
                  title: "Boat Owners",
                  description:
                    " Add your boat to our fleet and turn it into a source of income. ",
                },
                {
                  icon: <Bed style={iconStyle} />,
                  title: "bed",
                  description:
                    "Select the size boat you need. Boats choices are up to 3 cabins and a table that drops down to a bed at largest.",
                },
              ]}
            />
          </div>
        </section>
      )}

      {visibilityMap["statistics"] && <StatsSlider />}
      {visibilityMap["testimonials"] && (
        <section className="w-full p-4">
          <div className="container mx-auto w-full max-w-[1630px] px-[15px]">
            <MemberCarousel />
          </div>
        </section>
      )}
      {visibilityMap["membership"] && (
        <section className="w-full bg-lightSky section-py-80">
          <CommonMembershipAbout
            subtitle="What We Do"
            title="Welcome to Newport Sailing Club"
            description={description}
            imageUrl="/images/about.jpg"
            image={true}
            // video={true}
          />
        </section>
      )}
    </div>
  );
}
