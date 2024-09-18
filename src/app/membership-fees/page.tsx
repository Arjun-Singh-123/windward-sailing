import DecoratorLine from "@/components/common/decorator-icon-line";
import Detail from "@/components/common/details";
import MembershipSection from "@/components/common/to-join";
import { contentFont, cursiveHeadingFont, mainHeadingFont } from "../ui/fonts";
import BoatClubPricing from "@/components/common/membership-tojoin";
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
      />

      {/* <div className="container mx-auto w-full">
        <section className=" flex flex-col-reverse md:flex-row items-start     p-1">
          <div className="flex flex-col w-full md:max-w-[40.625rem] md:h-[47.06rem] p-4 overflow-y-auto">
            <h2
              className={`mt-10 text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
            >
              Windward Sailing Club
            </h2>
            <h3 className={`text-4xl ${mainHeadingFont.className}`}>
              Member Fees
            </h3>
            <DecoratorLine />
            <p className={`mb-4 text-sm  ${contentFont.className}`}>
              Become a Windward Sailing Club member to take advantage of all our
              great Sailing opportunities. Don't hesitate to contact us with any
              questions about membership.
            </p>
            <BoatClubPricing />
          </div>

          <img
            src="/images/about.jpg"
            alt="Side"
            className="w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] object-cover"
          />
        </section>
      </div> */}

      {/* <MembershipSection /> */}
      {/* <Detail
        title="Member Fees"
        heading=" Windward Sailing Club"
        description={description}
        membershipFees={membershipFees}
        mediaUrl="/images/about.jpg"
      /> */}
    </>
  );
}
