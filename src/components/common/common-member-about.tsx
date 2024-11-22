import React from "react";
import { mainHeadingFont } from "@/app/ui/fonts";
import BoatClubPricing from "./membership-tojoin";

import BoatFeatures from "./boat-features";
import Link from "next/link";
import { Button } from "../ui/button";

interface AboutProps {
  subtitle: string;
  title: string;
  description?: string;
  membership?: boolean;
  video?: boolean;
  boatFeatures?: boolean;
  image?: boolean; // New prop for video
  imageUrl?: string;
  rentalFeesBg?: boolean;
  isHomePage?: boolean;
}

const CommonMembershipAbout = ({
  subtitle,
  title,
  description,
  membership,
  video,
  boatFeatures,
  image,
  imageUrl,
  rentalFeesBg = false,
  isHomePage = false,
}: AboutProps) => {
  console.log(isHomePage);
  return (
    <div className="w-full">
      <div className="container max-w-[1630px] px-[15px] mx-auto">
        <h3
          className={`text-4xl ${mainHeadingFont.className} space-mb-30 m-only`}
        >
          {title && title}
        </h3>
        <div className={`flex flex-col-reverse md:flex-row gap-6`}>
          <div className=" relative flex flex-col w-full md:w-[68%]">
            <h3 className={`text-4xl ${mainHeadingFont.className} mb-4 d-only`}>
              {title && title}
            </h3>
            <p>{description && description}</p>
            <div>
              {isHomePage && (
                <Button variant="outlineDarkblue">
                  <Link href="/about-us">About us</Link>
                </Button>
              )}
            </div>
            {membership && <BoatClubPricing />}
            {boatFeatures && <BoatFeatures />}
          </div>

          <div
            className="relative w-full flex-1 md:w-auto md:h-auto overflow-visible mob-minh300"
            style={
              imageUrl
                ? {
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: "right center",
                    backgroundSize: "cover",
                  }
                : undefined
            }
          >
            {video ? (
              <div className="relative w-full h-full">
                <video
                  src="/images/Sailboat_Videos_2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  // className="w-[29rem] h-[32.560rem] object-cover border-[30px] border-[#001135] absolute -top-[40px]"
                  // className="w-full h-full object-cover border-[30px] border-[#001135]"
                  className="w-full h-full object-cover border-[30px] border-[#001135] 
              "
                />
              </div>
            ) : (
              // : (
              // image && (
              //   <Image
              //     src={imageUrl ?? ""}
              //     alt="Side"
              //     className=" w-full h-full object-cover border-spacing-12 border-blue-500"
              //     height={863}
              //     width={576}
              //   />
              // )
              // )
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonMembershipAbout;
// {!image && (
//   <style jsx>{`
// div::before {
//   content: "";
//   position: absolute;
//   top: -3.875rem; /* Position at the top */
//   left: -40px; /* Move it to the left */
//   border-left: 40px solid transparent; /* Transparent left border */
//   border-bottom: 40px solid #001135; /* Bottom border color */
//   width: 0; /* No width */
//   height: 0; /* No height */
//   z-index: 2; /* Ensure it appears above the video */
//   display:   ${isMobile} ? "block" : "none"};
// }
// `}</style>
// )}
