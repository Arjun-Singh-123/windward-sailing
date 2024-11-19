"use client";
import BoatFeatures from "@/components/common/boat-features";
import CommonMembershipAbout from "@/components/common/common-member-about";
import HeroFallback from "@/components/common/hero-slider-check";
import RentalFeesTable from "@/components/common/rental-fees";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const description =
  "Enjoy a day out on the waves—without owning your own boat! Our rental services are perfect for people looking to experience the joys of sailing without worrying about the upkeep, capital investment, and ownership of an expensive sailboat. All prices below include insurance and cleanup after your charter.";
const feeData = {
  member: [
    {
      name: "Evening Star",
      length: "28'",
      halfDay: "$105 + $25 Billed",
      weekday: "$155 + $25 Billed",
      weekend: "$180 + $25 Billed",
    },
    {
      name: "Sand Dollar",
      length: "30'",
      halfDay: "$130 + $35 Billed",
      weekday: "$165 + $35 Billed",
      weekend: "$200 + $35 Billed",
    },
    {
      name: "Teewinot",
      length: "30'",
      halfDay: "$150 + $40 Billed",
      weekday: "$180 + $40 Billed",
      weekend: "$210 + $40 Billed",
    },
    {
      name: "Renaissance",
      length: "33'",
      halfDay: "-",
      weekday: "$160 + $55 Billed",
      weekend: "$190 + $55 Billed",
    },
    {
      name: "Windward",
      length: "34'",
      halfDay: "-",
      weekday: "$160 + $55 Billed",
      weekend: "$200 + $55 Billed",
    },
    {
      name: "Tara",
      length: "36'",
      halfDay: "-",
      weekday: "$160 + $55 Billed",
      weekend: "$210 + $55 Billed",
    },
    {
      name: "Bliss",
      length: "40'",
      halfDay: "-",
      weekday: "$350 + $100 Billed",
      weekend: "$375 + $100 Billed",
    },
    {
      name: "Sea Renity",
      length: "40'",
      halfDay: "-",
      weekday: "$305 + $100 Billed",
      weekend: "$335 + $100 Billed",
    },
    {
      name: "Amore e Sole",
      length: "42'",
      halfDay: "-",
      weekday: "$400 + $105 Billed",
      weekend: "$ 450 + $105 Billed",
    },
  ],
  nonMember: [
    {
      name: "Evening Star",
      length: "28'",
      halfDay: "-",
      weekday: "$300",
      weekend: "$345",
    },
    {
      name: "Sand Dollar",
      length: "30'",
      halfDay: "-",
      weekday: "$350",
      weekend: "$400",
    },
    {
      name: "Teewinot",
      length: "30'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Renaissance",
      length: "33'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Windward",
      length: "34'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Tara",
      length: "36'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Bliss",
      length: "40'",
      halfDay: "-",
      weekday: "$600",
      weekend: "$650",
    },
    {
      name: "Sea Renity",
      length: "40'",
      halfDay: "-",
      weekday: "$550",
      weekend: "$600",
    },
    {
      name: "Amore e Sole",
      length: "42'",
      halfDay: "-",
      weekday: "$650",
      weekend: "$700",
    },
  ],
};

export default function RentalFees() {
  return (
    <div className=" w-full   ">
      <HeroFallback />
      <RentalFeesTable />
      <CommonMembershipAbout
        subtitle="Windward Sailing Club"
        title="Our Fleet"
        description={description}
        boatFeatures={true}
        imageUrl="/images/boat-features (1).jpg"
        image={true}
        rentalFeesBg={true}
      />
    </div>
  );
}
