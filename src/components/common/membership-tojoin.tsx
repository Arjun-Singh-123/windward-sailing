import { contentFont, mainHeadingFont } from "@/app/ui/fonts";
import React from "react";
import { ToJoinHeader } from "./to-join-header";
import LegendComponent from "./left-triangle";

// const pricingData = {
//   initialFee: 600,
//   damageDeposit: 500,
//   memberFee: 380,
//   certificationRide: "Free",
//   total: 1500,
//   monthlyDues: {
//     total: 200,
//     administrationFee: 90,
//     membershipFee: 110,
//   },
// };

const membershipFeeData = {
  initialMembershipFee: 600,
  damageDeposit: 500,
  monthlyMembershipFee: 400,
  certificationRide: "Free",
  initialMembershipTotal: 1500,
  monthlyDuesTotal: {
    amount: 200,
    administrationFee: 90,
    membershipFee: 110,
  },
  checkRide: 300,
};

const PricingItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div
    className={`flex text-[0.875rem] justify-between py-2 border-b border-gray-200 ${contentFont.className}`}
  >
    <span>{label}</span>
    <span>{typeof value === "number" ? `$${value}` : value}</span>
  </div>
);

export default function BoatClubPricing() {
  return (
    <div className="w-full pt-3">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md">
        <LegendComponent text="To Join" />
        <div className="p-6">
          <PricingItem
            label="Initial Membership Fee - (No yearly renewal)"
            value={membershipFeeData.initialMembershipFee}
          />
          <PricingItem
            label="Damage/Use Deposit"
            value={membershipFeeData.damageDeposit}
          />
          <PricingItem
            label="Monthly (Membership Fee of $200.00 per month. First & Last required, applies to sailing, accumulates if unused.)"
            value={membershipFeeData.monthlyMembershipFee}
          />
          <PricingItem
            label="Certification Ride - 4 hours on the water"
            value={membershipFeeData.certificationRide}
          />
          <div
            className={`flex text-[0.875rem] justify-between py-2 border-b border-gray-200 ${contentFont.className} font-bold`}
          >
            <span>Initial Membership Total</span>
            <span>${membershipFeeData.initialMembershipTotal}</span>
          </div>
          <PricingItem
            label="Monthly Dues Total ($90 Admin + $110 Membership Credits)"
            value={membershipFeeData.monthlyDuesTotal.amount}
          />
          <PricingItem
            label="Check Ride: $300 (Charge required if not sailed in 6 months)"
            value={membershipFeeData.checkRide}
          />
        </div>
        <div className="bg-lightSky text-darkBlue p-4">
          <p className="mb-0">
            <strong>Note: </strong>
            <small>
              Monthly dues total ${membershipFeeData.monthlyDuesTotal.amount} ($
              {membershipFeeData.monthlyDuesTotal.administrationFee} per month
              administration fee plus the $
              {membershipFeeData.monthlyDuesTotal.membershipFee} membership fee
              that is applied towards boat use or charter).
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

// const membershipFeeData = {
//   initialMembershipFee: 600,
//   damageDeposit: 500,
//   monthlyMembershipFee: 400,
//   certificationRide: "Free",
//   initialMembershipTotal: 1500,
//   monthlyDuesTotal: {
//     amount: 200,
//     administrationFee: 90,
//     membershipFee: 110,
//   },
//   checkRide: 300,
// };

// const PricingItem = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) => (
//   <div
//     className={`flex text-[0.875rem] justify-between py-2 border-b border-gray-200 ${contentFont.className}`}
//   >
//     <span>{label}</span>
//     <span>{typeof value === "number" ? `$${value}` : value}</span>
//   </div>
// );

// export default function BoatClubPricing() {
//   return (
//     <div className="w-full pt-3">
//       <div className="bg-white border border-gray-200 rounded-lg shadow-md">
//         <div className="p-6">
//           <PricingItem
//             label="Initial Membership Fee - (No yearly renewal)"
//             value={membershipFeeData.initialMembershipFee}
//           />
//           <PricingItem
//             label="Damage/Use Deposit"
//             value={membershipFeeData.damageDeposit}
//           />
//           <PricingItem
//             label="Monthly (Membership Fee of $200.00 per month. First & Last required, applies to sailing, accumulates if unused.)"
//             value={membershipFeeData.monthlyMembershipFee}
//           />
//           <PricingItem
//             label="Certification Ride - 4 hours on the water"
//             value={membershipFeeData.certificationRide}
//           />
//           <div
//             className={`flex text-[0.875rem] justify-between py-2 border-b border-gray-200 ${contentFont.className} font-bold`}
//           >
//             <span>Initial Membership Total</span>
//             <span>${membershipFeeData.initialMembershipTotal}</span>
//           </div>
//           <PricingItem
//             label="Monthly Dues Total ($90 Admin + $110 Membership Credits)"
//             value={membershipFeeData.monthlyDuesTotal.amount}
//           />
//           <PricingItem
//             label="Check Ride: $300 (Charge required if not sailed in 6 months)"
//             value={membershipFeeData.checkRide}
//           />
//           <div
//             className={`flex text-[0.875rem] justify-between py-2 border-b border-gray-200 ${contentFont.className}`}
//           >
//             <span>
//               Some Boats have a Billed amount - NOT OUT OF SAIL BANK - Some
//               Boats have a Billed amount - NOT OUT OF SAIL BANK
//             </span>
//             <span></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
