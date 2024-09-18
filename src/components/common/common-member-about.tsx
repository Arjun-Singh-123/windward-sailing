import {
  contentFont,
  cursiveHeadingFont,
  mainHeadingFont,
} from "@/app/ui/fonts";
import DecoratorLine from "./decorator-icon-line";

import React from "react";
import BoatClubPricing from "./membership-tojoin";
interface AboutProps {
  subtitle: string;
  title: string;
  description: string;
  membership?: boolean;
}

const CommonMembershipAbout = ({
  subtitle,
  title,
  description,
  membership,
}: AboutProps) => {
  return (
    <>
      <div className="container mx-auto w-full">
        <section className="relative flex flex-col-reverse md:flex-row items-start w-full justify-between p-1">
          <div className="flex flex-col w-full md:max-w-[40.625rem] md:h-[43.06rem] p-4 overflow-y-auto">
            <h2
              className={`mt-10 text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
            >
              {subtitle && subtitle}
            </h2>
            <h3 className={`text-2xl ${mainHeadingFont.className}`}>
              {title && title}
            </h3>
            <DecoratorLine />
            <p className={`${contentFont.className}`}>
              {description && description}
            </p>
            {membership && <BoatClubPricing />}
          </div>

          <img
            src="/images/about.jpg"
            alt="Side"
            className="w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] object-cover"
          />
        </section>
      </div>
    </>
  );
};

export default CommonMembershipAbout;
