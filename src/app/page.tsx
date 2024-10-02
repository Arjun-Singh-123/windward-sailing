import CommonMembershipAbout from "@/components/common/common-member-about";
import Detail from "@/components/common/details";
import { HeroSection } from "@/components/common/hero-section";
import StatsSlider from "@/components/common/stats";

import Heroo from "@/components/sections/heroo";
import SailingServices from "@/components/sections/sailing-services";
import { SpecificationsSection } from "@/components/sections/specification";
import { Bath, Bed } from "lucide-react";
import ResponsiveCarousel from "./slick/page";

const images = [
  "d.jpg",
  "e.jpg",
  "f.jpeg",
  "c.jpg",
  "d.jpg",
  "e.jpg",
  "f.jpeg",
  "c.jpg",
];

const description =
  "Since 1972, Windward's has been Windward Beach's first choice for sailing. Over more than 40 years, we've earned an excellent reputation under the same management. Our goal is to meet the needs of all sailing enthusiasts, from the novice to the seasoned skipper—all while remaining affordable. Boat ownership with a lease to the club is also a possibility. We are proud of the high-quality sailing vessels we offer our members and constantly strive to maintain the personalized service that has always distinguished our club.At Windwards, we know that quality personnel and good management are vital to a successful operation. Our extensive industry experience gives us the confidence and skills to meet all your sailing needs.";
export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    // grid-rows-[20px_1fr_20px]
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-0 gap-16 font-[family-name:var(--font-geist-sans)]">
    <div className="flex flex-col items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]  ">
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start "> */}
      {/* <main className="w-full flex flex-col items-center sm:items-start gap-4"> */}
      {/* <HeroSection1 /> */}
      <Heroo />
      <SailingServices />
      <HeroSection />

      {/* <ImageGallery images={images} title="virtual tour" /> */}
      {/* <ImageGallery images={images} title="ExteriorPhotos" /> */}
      {/* <YachtGallery /> */}
      {/* <YachtGallery /> */}

      {/* <ExteriorPhotos /> */}
      {/* <SpecificationsSection /> */}

      <section className="w-full p-4">
        <div className="container mx-auto max-w-6xl">
          <SpecificationsSection />
        </div>
      </section>

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
                icon: <Bed />,
                title: "Double bed",
                description:
                  "There were 1 double beds and common facility available with attached toilets.",
              },
              {
                icon: <Bath />,
                title: "Bathroom",
                description:
                  "There were 2 bathrooms available with attached toilets.",
              },
              {
                icon: <Bed />,
                title: "Double bed",
                description:
                  "There were 1 double beds and common facility available with attached toilets.",
              },
              {
                icon: <Bath />,
                title: "Bathroom",
                description:
                  "There were 2 bathrooms available with attached toilets.",
              },
              {
                icon: <Bed />,
                title: "Double bed",
                description:
                  "There were 1 double beds and common facility available with attached toilets.",
              },

              {
                icon: <Bath />,
                title: "Bathroom",
                description:
                  "There were 2 bathrooms available with attached toilets.",
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

      {/* <StatsSlider /> */}
      {/* <TestimonialSlider /> */}
      {/* <Detail
          title="About Us"
          heading="What We Do"
          description={description}
          video={video}
        /> */}

      {/* <Detail
          title="What We Do "
          heading="Welcome to Windward Sailing Club"
          description={description}
          // membershipFees={true}
          mediaUrl="/images/Sailboat_Videos_2.mp4"
          isVideo={true}
        /> */}

      {/* <TestimonialsCarousel /> */}
      {/* <CommonMembershipAbout
          subtitle="What We Do"
          title="Welcome to Windward Sailing Club"
          description={description}
          video={true}
        /> */}
      <StatsSlider />
      {/* <ResponsiveCarousel /> */}
      <section className="w-full p-4">
        <div className="container mx-auto max-w-6xl">
          <ResponsiveCarousel />
        </div>
      </section>
      <section className="w-full p-4 bg-lightSky ">
        {/* <div className="container mx-auto max-w-6xl"> */}
        <CommonMembershipAbout
          subtitle="What We Do"
          title="Welcome to Windward Sailing Club"
          description={description}
          video={true}
        />
        {/* </div> */}
      </section>

      {/* <ImageCarousel /> */}
      {/* <Swipe /> */}
      {/* <YachtGallery/> */}
      {/* <Test /> */}
      {/* </main> */}
    </div>
  );
}
