import CommonMembershipAbout from "@/components/common/common-member-about";
import Detail from "@/components/common/details";
import { HeroSection } from "@/components/common/hero-section";
import StatsSlider from "@/components/common/stats";

import Heroo from "@/components/sections/heroo";
import SailingServices from "@/components/sections/sailing-services";
import {
  Bath,
  Bed,
  ChefHat,
  CookingPot,
  Music,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import ResponsiveCarousel from "./slick/page";

const description =
  "Since 1972, Windward's has been Windward Beach's first choice for sailing. Over more than 50 years, we've earned an excellent reputation under the same family management. Our goal is to meet the needs of all sailing enthusiasts, from the novice to the seasoned skipper—all while remaining affordable.  With affordable vessels, we’re proud to offer a sailing experience you can trust. Let our boats take you on a journey where passion meets the open sea!";
export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]  ">
      <Heroo />
      <SailingServices />
      {/* <HeroSection /> */}

      <section className="w-full p-4 bg-[#ebf8fc]">
        <div className="container mx-auto max-w-6xl">
          <Detail
            benefits={false}
            benefitsData={[
              {
                icon: <Bath />,
                title: "Bathroom",
                description:
                  "There were 2 bathrooms available with attached toilets.",
              },
              {
                icon: <Music />,
                title: "Music",
                description:
                  "There were TV and Music system available in the common sitting area.",
              },
              {
                icon: <ChefHat />,
                title: "Kitchen",
                description:
                  "There were 2 bathrooms available with attached toilets.",
              },
              {
                icon: <Wifi />,
                title: "Maps, radios and safety equipment",
                description:
                  "There were Fre WiFi available in the entire yacht.",
              },
              {
                icon: <Bath />,
                title: "Maps, radios and safety equipment",
                description:
                  "There were 2 bathrooms available with attached toilets.",
              },
              {
                icon: <CookingPot />,
                title: "Additional options",
                description:
                  "There were 3 meals per day with your desired choices from the menu.",
              },

              {
                icon: <ShieldCheck />,
                title: "Boat Owners",
                description:
                  "There were a safe ficility available so you have no worries for your cards and cash or devices.",
              },
              {
                icon: <Bed />,
                title: "Double bed",
                description:
                  "There were 1 double beds and common facility available with attached toilets.",
              },
              // ... other benefits
            ]}
          />
        </div>
      </section>

      <StatsSlider />
      {/* <section className="w-full p-4">
        <div className="container mx-auto max-w-6xl">
          <ResponsiveCarousel />
        </div>
      </section> */}
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
    </div>
  );
}
