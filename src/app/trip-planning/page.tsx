import BoatReservation from "@/components/sections/boat-reservation";
import React from "react";
import { contentFont, cursiveHeadingFont, mainHeadingFont } from "../ui/fonts";
import DecoratorLine from "@/components/common/decorator-icon-line";

const Trip = () => {
  return (
    <div className="pt-20 bg-lightSky w-full">
      <div
        className={`    "w-full 
          container mx-auto   md:max-w-[1630px] px-[15px]  "
        `}
      >
        <section
          className={` flex flex-col-reverse md:flex-row    max-w-7xl  container mx-auto gap-6   p-1  
              `}
        >
          <div className=" relative flex flex-col w-full md:w-[68%] p-4 md:p-4 ">
            <h3 className={`text-4xl mb-4 ${mainHeadingFont.className} pt-6`}>
              {/* {title && title} */}
              Newport Sailing Club
            </h3>
            {/* <DecoratorLine /> */}

            <div className={`${contentFont.className}  mb-4     `}>
              <p className="mb-2">
                Windward takes care of filling fuel, propane, water, head toilet
                paper, and empty head tanks. We also take care of head pump-out
                when you return and cleaning. If something breaks or you lose
                something, not to stress over, we take care of it but you will
                be charged; otherwise if something breaks as normal maintenance,
                we take care of it.
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-auto md:h-auto overflow-visible">
            <BoatReservation />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trip;
