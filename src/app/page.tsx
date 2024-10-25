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
  "Since 1972, Windward's has been Windward Beach's first choice for sailing. Over more than 50 years, we've earned an excellent reputation under the same family management. Our goal is to meet the needs of all sailing enthusiasts, from the novice to the seasoned skipper—all while remaining affordable.  With affordable vessels, we’re proud to offer a sailing experience you can trust. Let our boats take you on a journey where passion meets the open sea!";
export default function Home() {
  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchSections,
  });

  // console.log("section data", sections);

  // // Memoize the visibility map to avoid recalculating on every render
  // const visibilityMap: Record<string, boolean> = useMemo(() => {
  //   return (sections || [])?.reduce((acc, section) => {
  //     acc[section.section_name] = section.is_visible;
  //     return acc;
  //   }, {});
  // }, [sections]);

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
    <div className="flex flex-col items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]  ">
      {visibilityMap["hero-image"] && <Heroo />}
      {visibilityMap["sailing-services"] && <SailingServices />}
      {/* <HeroSection /> */}

      {visibilityMap["benefits-section"] && (
        <section className="w-full p-4 bg-lightSky">
          <div className="container mx-auto max-w-6xl">
            <Detail
              benefits={false}
              benefitsData={[
                {
                  icon: <Bath style={iconStyle} />,
                  title: "Bathroom",
                  description:
                    "There were 2 bathrooms available with attached toilets.",
                },
                {
                  icon: <Music style={iconStyle} />,
                  title: "Music",
                  description:
                    "There were TV and Music system available in the common sitting area.",
                },
                {
                  icon: <ChefHat style={iconStyle} />,
                  title: "Kitchen",
                  description:
                    "There were 2 bathrooms available with attached toilets.",
                },
                {
                  icon: <Wifi style={iconStyle} />,
                  title: "Maps, radios and safety equipment",
                  description:
                    "There were Fre WiFi available in the entire yacht.",
                },
                {
                  icon: <Bath style={iconStyle} />,
                  title: "Maps, radios and safety equipment",
                  description:
                    "There were 2 bathrooms available with attached toilets.",
                },
                {
                  icon: <CookingPot style={iconStyle} />,
                  title: "Additional options",
                  description:
                    "There were 3 meals per day with your desired choices from the menu.",
                },

                {
                  icon: <ShieldCheck style={iconStyle} />,
                  title: "Boat Owners",
                  description:
                    "There were a safe ficility available so you have no worries for your cards and cash or devices.",
                },
                {
                  icon: <Bed style={iconStyle} />,
                  title: "Double bed",
                  description:
                    "There were 1 double beds and common facility available with attached toilets.",
                },
                // ... other benefits
              ]}
            />
          </div>
        </section>
      )}

      {visibilityMap["statistics"] && <StatsSlider />}
      {visibilityMap["testimonials"] && (
        <section className="w-full p-4">
          <div className="container mx-auto max-w-6xl">
            <MemberCarousel />
          </div>
        </section>
      )}
      {visibilityMap["membership"] && (
        <section className="w-full p-4 bg-lightSky ">
          <CommonMembershipAbout
            subtitle="What We Do"
            title="Welcome to Windward Sailing Club"
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
