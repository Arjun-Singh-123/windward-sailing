import CommonMembershipAbout from "@/components/common/common-member-about";

const description =
  " Become a Newport Sailing Club member to take advantage of all our great Sailing opportunities. Don't hesitate to contact us with any questions about membership.";
let membershipFees = true;
export default function MemberShipFees() {
  return (
    <>
      <div className="w-full section-py-80">
        <CommonMembershipAbout
          subtitle="Newport Sailing Club"
          title="Membership Fees"
          description={description}
          membership={true}
          imageUrl="/images/membership-fee.png"
          image={true}
          />
        </div>
    </>
  );
}
