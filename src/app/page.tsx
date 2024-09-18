import Component from "@/components/common/corner";
import Detail from "@/components/common/details";
import HeroSection1 from "@/components/common/first-section";
import { HeroSection } from "@/components/common/hero-section";
import ImageGallery from "@/components/common/image-gallery";
import ImageCarousel from "@/components/common/image-slider";
import StatsSlider from "@/components/common/stats";
import TestimonialSlider from "@/components/common/testimonials";
import YachtGallery, {
  SpecificationsSection,
} from "@/components/sections/specification";
import Swipe from "@/components/sections/swiper";
import { Bath, Bed } from "lucide-react";

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
    <div className=" grid  items-center justify-items-center min-h-screen p-0 overflow-hidden  font-[family-name:var(--font-geist-sans)]">
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start "> */}
      <main className="flex flex-col   row-start-2 items-center sm:items-start">
        <HeroSection1 />
        <HeroSection />

        {/* <ImageGallery images={images} title="virtual tour" /> */}
        {/* <ImageGallery images={images} title="ExteriorPhotos" /> */}
        <YachtGallery />
        <YachtGallery />

        {/* <ExteriorPhotos /> */}
        <SpecificationsSection />

        <Detail
          title="Yacht Amenities"
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
        {/* <StatsSlider /> */}
        <TestimonialSlider />
        {/* <Detail
          title="About Us"
          heading="What We Do"
          description={description}
          video={video}
        /> */}

        <Detail
          title="What We Do "
          heading="Welcome to Windward Sailing Club"
          description={description}
          // membershipFees={true}
          mediaUrl="/images/Sailboat_Videos_2.mp4"
          isVideo={true}
        />
        <ImageCarousel />
        {/* <Swipe /> */}
        {/* <YachtGallery/> */}
      </main>
    </div>
  );
}
