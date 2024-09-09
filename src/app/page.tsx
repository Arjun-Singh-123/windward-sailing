import HeroSection1 from "@/components/common/first-section";
import { HeroSection } from "@/components/common/hero-section";
import ImageGallery from "@/components/common/image-gallery";
import {
  ExteriorPhotos,
  SpecificationsSection,
  VesselOverview,
  VirtualTour,
} from "@/components/sections/specification";
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
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <HeroSection1 />
        <HeroSection />

        <ImageGallery images={images} title="virtual tour" />
        <ImageGallery images={images} title="ExteriorPhotos" />

        {/* <ExteriorPhotos /> */}
        <SpecificationsSection />
      </main>
    </div>
  );
}
