import CommonMembershipAbout from "@/components/common/common-member-about";
import Detail from "@/components/common/details";
import StatsSlider from "@/components/common/stats";

import {
  Bath,
  Bed,
  ChefHat,
  CookingPot,
  Music,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchSectionProducts } from "@/services/product-services";
import {
  fetchFooterContent,
  fetchNavItems,
} from "@/services/header-footer-services";
import BannerSection from "@/components/sections/hero-section";
import HighlightedCards from "@/components/sections/sailing-cards";
import BenefitSection from "@/components/common/benefit-detail-images";
import DynamicHeader from "@/components/common/header";
import FooterBottom from "@/components/common/footer";
type Section = {
  id: number;
  section_name: string;
  is_visible: boolean;
  page: string;
};

const description =
  "Since 1972, Newport's has been Newport Beach's first choice for sailing. Over more than 50 years, we've earned an excellent reputation under the same family management. Our goal is to meet the needs of all sailing enthusiasts, from the novice to the seasoned skipper—all while remaining affordable.  With affordable vessels, we’re proud to offer a sailing experience you can trust. Let our boats take you on a journey where passion meets the open sea!";
function Home() {
  const iconStyle = { width: "40px", height: "40px" };

  return (
    <div className="flex flex-col items-center min-h-screen p-0 home-page   ">
      <BannerSection />
      <HighlightedCards />

      <section className="w-full bg-lightSky section-py-80">
        <div className="container mx-auto w-full max-w-[1630px] px-[15px]">
          <BenefitSection
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

      <StatsSlider />

      <section className="w-full bg-lightSky section-py-80">
        <CommonMembershipAbout
          subtitle="What We Do"
          title="Welcome to Windward Sailing Club"
          description={description}
          imageUrl="/images/about.jpg"
          image={true}
          isHomePage={true}
          // video={true}
        />
      </section>
    </div>
  );
}

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hero-banner-images"],
    queryFn: () => fetchSectionProducts("Banner Section"),
  });

  await queryClient.prefetchQuery({
    queryKey: ["cards-data"],
    queryFn: () => fetchSectionProducts("HIghlighted Cards") ?? [],
  });
  await queryClient.prefetchQuery({
    queryKey: ["benefit-images"],
    queryFn: () => fetchSectionProducts("Benefits"),
  });
  await queryClient.prefetchQuery({
    queryKey: ["menuitems-data"],
    queryFn: fetchNavItems,
  });
  await queryClient.prefetchQuery({
    queryKey: ["footer-data"],
    queryFn: fetchFooterContent,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
};

export default Page;
