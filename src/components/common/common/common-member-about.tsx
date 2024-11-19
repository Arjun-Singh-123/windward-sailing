"use client";
import React from "react";
import DecoratorLine from "./decorator-icon-line";
import {
  contentFont,
  cursiveHeadingFont,
  mainHeadingFont,
} from "@/app/ui/fonts";
import BoatClubPricing from "./membership-tojoin";
import CustomImage from "../custom-image";
import useMobileCheck from "@/hooks/mobile-check";
import BoatFeatures from "./boat-features";
import Image from "next/image";

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
}: AboutProps) => {
  const { isMobile } = useMobileCheck();
  return (
    <div
      className={`   ${
        rentalFeesBg
          ? "container w-full max-w-[1630px] px-[15px] mx-auto  bg-lightSky  "
          : "container w-full max-w-[1630px] px-[15px] mx-auto"
      }  `}
    >
      <section className={` flex flex-col-reverse md:flex-row           `}>
        <div className=" relative flex flex-col w-full md:w-[68%] p-4 md:p-4">
          {/* <h2
            className={`mt-4  md:mt-10    text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
          >
            {subtitle && subtitle}
          </h2> */}

          <h3 className={`text-4xl ${mainHeadingFont.className}`}>
            {title && title}
          </h3>
          {/* <DecoratorLine /> */}
          <br />
          <div className={`${contentFont.className}  mb-4     `}>
            <p className="mb-2">{description && description}</p>
            {membership && <BoatClubPricing />}
            {boatFeatures && <BoatFeatures />}
          </div>
        </div>

        <div className="relative w-full md:w-auto md:h-auto overflow-visible">
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
            image && (
              <Image
                src={imageUrl ?? ""}
                alt="Side"
                className=" w-full h-full object-cover border-spacing-12 border-blue-500"
                height={863}
                width={576}
              />
            )
          )}

          {!image && (
            <style jsx>{`
            div::before {
              content: "";
              position: absolute;
              top: -3.875rem; /* Position at the top */
              left: -40px; /* Move it to the left */
              border-left: 40px solid transparent; /* Transparent left border */
              border-bottom: 40px solid #001135; /* Bottom border color */
              width: 0; /* No width */
              height: 0; /* No height */
              z-index: 2; /* Ensure it appears above the video */
              display:   ${isMobile} ? "block" : "none"};
            }
          `}</style>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommonMembershipAbout;
