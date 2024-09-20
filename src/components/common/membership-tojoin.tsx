import { contentFont, mainHeadingFont } from "@/app/ui/fonts";
import React from "react";
import { ToJoinHeader } from "./to-join-header";

// Assume this data is coming from a database
const pricingData = {
  initialFee: 550,
  damageDeposit: 500,
  memberFee: 380,
  certificationRide: "Free",
  total: 1430,
  monthlyDues: {
    total: 190,
    administrationFee: 80,
    membershipFee: 110,
  },
};

const PricingItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div
    className={`flex text-xs justify-between py-2 border-b border-gray-200 ${contentFont.className}`}
  >
    <span>{label}</span>
    <span>{typeof value === "number" ? `$${value}` : value}</span>
  </div>
);

// const ToJoinHeader = () => (
//   <div className="relative overflow-visible">
//     <h3 className="relative inline-block -left-8 bg-[#00A3E0] text-white py-2 px-4 font-bold">
//       <span>To Join</span>
//       <span className="absolute left-full top-0 border-t-[20px] border-b-[20px] border-l-[20px] border-l-[#00A3E0] border-t-transparent border-b-transparent"></span>
//     </h3>
//     <span className="absolute bottom-0 left-0 w-2 h-2 bg-[#00A3E0]"></span>
//     <span className="absolute bottom-[-7px] left-[7px] w-0 h-0 border-t-[7px] border-l-[7px] border-t-black border-l-black"></span>
//   </div>
// );

export default function BoatClubPricing() {
  return (
    <div className="  w-full mx-auto  ">
      <div className="     overflow-visible bg-white border-2 border-black  w-full p-2 shadow-lg rounded-lg  ">
        <ToJoinHeader
          membershipFee={true}
          specification={false}
          text="To Join"
        />

        <div className="p-6">
          <PricingItem
            label="One-Time Initial Fee"
            value={pricingData.initialFee}
          />
          <PricingItem
            label="Damage Deposit"
            value={pricingData.damageDeposit}
          />
          <PricingItem
            label="One time member Fee (First & Last Months Required, membership fee that is applied towards boat use or charter)"
            value={pricingData.memberFee}
          />
          <PricingItem
            label="Certification Ride (2 Hours on the water)"
            value={pricingData.certificationRide}
          />
          <div className="flex justify-between py-2 font-bold">
            <span>Total</span>
            <span>${pricingData.total}</span>
          </div>
        </div>
        <div className="bg-[#00A3E0] text-white p-4 mt-4">
          <p className="font-bold mb-2">Note:</p>
          <p>
            Monthly dues total ${pricingData.monthlyDues.total} ($
            {pricingData.monthlyDues.administrationFee} per month administration
            fee plus the ${pricingData.monthlyDues.membershipFee} membership fee
            that is applied towards boat use or charter).
          </p>
        </div>
      </div>
    </div>
  );
}
