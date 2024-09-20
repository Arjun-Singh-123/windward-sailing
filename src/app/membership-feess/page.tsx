import BoatFeatures from "@/components/common/boat-features";
import Detail from "@/components/common/details";
import MembershipSection from "@/components/common/to-join";

const description =
  " Become a Windward Sailing Club member to take advantage of all our great Sailing opportunities. Don't hesitate to contact us with any questions about membership.";
let membershipFees = true;
export default function MemberShipFees() {
  return (
    <>
      {/* <MembershipSection /> */}
      <Detail
        title="Member Fees"
        heading=" Windward Sailing Club"
        description={description}
        membershipFees={membershipFees}
      />
      <BoatFeatures />
    </>
  );
}
