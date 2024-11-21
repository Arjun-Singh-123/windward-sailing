"use client";
import BoatFeatures from "@/components/common/boat-features";
import CommonMembershipAbout from "@/components/common/common-member-about";
 import RentalFeesTable from "@/components/common/rental-fees";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const description =
  "Enjoy a day out on the waves—without owning your own boat! Our rental services are perfect for people looking to experience the joys of sailing without worrying about the upkeep, capital investment, and ownership of an expensive sailboat. All prices below include insurance and cleanup after your charter.";
  
export default function RentalFees() {
  return (
    <>
     
    <div className="w-full section-py-80">
      <RentalFeesTable />
    </div>
    <div className="w-full bg-lightSky section-py-80">
      <CommonMembershipAbout
        subtitle="Newport Sailing Club"
        title="Our Fleet"
        description={description}
        boatFeatures={true}
        imageUrl="/images/boat-features.jpg"
        image={true}
        rentalFeesBg={true}
      />
    </div>
    </>
  );
}
