import CommonMembershipAbout from "@/components/common/common-member-about";

const description =
  " Become a Windward Sailing Club member to take advantage of all our great Sailing opportunities. Don't hesitate to contact us with any questions about membership.";
let membershipFees = true;
export default function MemberShipFees() {
  return (
    <>
      <CommonMembershipAbout
        subtitle=" Windward Sailing Club"
        title="About Us"
        description={description}
        membership={true}
        imageUrl="/images/membership-fee.png"
        image={true}
      />
    </>
  );
}
