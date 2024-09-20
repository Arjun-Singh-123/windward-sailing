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

interface AboutProps {
  subtitle: string;
  title: string;
  description?: string;
  membership?: boolean;
  video?: boolean;
  boatFeatures?: boolean;
  image?: boolean; // New prop for video
  imageUrl?: string;
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
}: AboutProps) => {
  const { isMobile } = useMobileCheck();
  // console.log("image url", imageUrl);
  return (
    // <div className="w-full">
    //   <section
    //     className={`relative flex flex-col-reverse md:flex-row items-center justify-center w-full p-1 bg-lightSky ${
    //       video ? "md:mt-96" : ""
    //     }`}
    //   >
    //     <div className="flex flex-col w-full md:w-1/2 p-4 md:p-8">
    //       <h2
    //         className={`mt-4 md:mt-10 text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
    //       >
    //         {subtitle && subtitle}
    //       </h2>
    //       <h3 className={`text-2xl ${mainHeadingFont.className}`}>
    //         {title && title}
    //       </h3>
    //       <DecoratorLine />
    // <div
    //   className={`${contentFont.className} mb-4 ${
    //     video ? "md:h-[calc(100vh-24rem)]" : ""
    //   } overflow-y-auto`}
    // >
    //   <p>{description && description}</p>
    //   {membership && <BoatClubPricing />}
    // </div>
    //     </div>

    //     <div className="relative w-full md:w-1/2 h-[32.560rem] md:h-[50.06rem] overflow-visible">
    //       {video ? (
    //         <div className="relative w-full h-full">
    //           <video
    //             src="/images/Sailboat_Videos_2.mp4"
    //             autoPlay
    //             muted
    //             loop
    //             playsInline
    //             className="w-full h-full object-cover border-[30px] border-[#001135]"
    //           />
    //           <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-[#001135]"></div>
    //         </div>
    //       ) : (
    //         <img
    //           src="/images/about.jpg"
    //           alt="Side"
    //           className="w-full h-full object-cover border-spacing-12 border-blue-500"
    //         />
    //       )}
    //     </div>
    //   </section>
    // </div>

    <div className="   w-full">
      <section
        className={` flex flex-col-reverse md:flex-row items-center justify-center w-full p-1 bg-lightSky  `}
      >
        {/* <div className="flex flex-col w-full md:max-w-[32.625rem] md:h-[50.06rem] p-4 overflow-y-auto"> */}
        <div className=" relative flex flex-col w-full md:w-1/2 p-4 md:p-8">
          <h2
            className={`mt-4  md:mt-10   text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
          >
            {subtitle && subtitle}
          </h2>
          <h3 className={`text-2xl ${mainHeadingFont.className}`}>
            {title && title}
          </h3>
          <DecoratorLine />
          {/* <p className={`${contentFont.className} mb-4`}>
            {description && description}
          </p>
          {membership && <BoatClubPricing />} */}
          <div className={`${contentFont.className}  mb-4     `}>
            <p>{description && description}</p>
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
              <img
                src={imageUrl ?? ""}
                alt="Side"
                className=" w-full h-full object-cover border-spacing-12 border-blue-500"
              />
            )
          )}

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
        </div>
      </section>
    </div>

    // <div className="container mx-auto w-full">
    //   <section className="relative flex flex-col-reverse md:flex-row items-center justify-center w-full p-1 bg-lightSky">
    //     <div className="flex flex-col w-full md:max-w-[40.625rem] md:h-[50.06rem] p-4 overflow-y-auto">
    //       <h2
    //         className={`mt-10 text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
    //       >
    //         {subtitle && subtitle}
    //       </h2>
    //       <h3 className={`text-2xl ${mainHeadingFont.className}`}>
    //         {title && title}
    //       </h3>
    //       <div className="w-16 h-1 bg-blue-500 my-4"></div>{" "}
    //       {/* DecoratorLine */}
    //       <p className={`${contentFont.className} mb-4`}>
    //         {description && description}
    //       </p>
    //       {membership && <div>BoatClubPricing component would go here</div>}
    //     </div>

    //     <div className="relative w-full  md:max-w-[40.625rem] md:h-[50.06rem] overflow-visible">
    //       {video ? (
    //         <video
    //           src="/images/Sailboat_Videos_2.mp4"
    //           autoPlay
    //           muted
    //           loop
    //           playsInline
    //           className="w-full h-full object-cover border-[40px] border-[#001135]"
    //         />
    //       ) : (
    //         <img
    //           src="/images/about.jpg"
    //           alt="Side"
    //           className="w-full h-full object-cover border-spacing-12 border-blue-500"
    //         />
    //       )}
    //       <style jsx>{`
    //         div::before {
    //           content: "";
    //           position: absolute;
    //           top: -0px;
    //           left: -39px;
    //           border-left: 40px solid transparent;
    //           border-bottom: 40px solid #001135;
    //           width: 0;
    //           height: 0;
    //         }
    //       `}</style>
    //     </div>
    //   </section>
    // </div>

    // <div className="container mx-auto w-full">
    //   <section className="relative flex flex-col-reverse md:flex-row items-center justify-center w-full p-1">
    //     <div className="flex flex-col w-full md:max-w-[40.625rem] md:h-[50.06rem] p-4 overflow-y-auto">
    //       <h2
    //         className={`mt-10 text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
    //       >
    //         {subtitle && subtitle}
    //       </h2>
    //       <h3 className={`text-2xl ${mainHeadingFont.className}`}>
    //         {title && title}
    //       </h3>
    //       <DecoratorLine />
    //       <p className={` ${contentFont.className} mb-4`}>
    //         {description && description}
    //       </p>
    //       {membership && <BoatClubPricing />}
    //     </div>

    //     {video ? (
    //       <div className="relative w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] overflow-visible">
    //         <video
    //           src="/videos/Sailboat_Videos_2.mp4"
    //           controls
    //           className="w-full h-full object-cover border-8 border-blue-500"
    //           // className="w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] object-cover border-8 border-blue-500"
    //         />
    //         <style jsx>{`
    //           div::before {
    //             content: "";
    //             position: absolute;
    //             top: -0px;
    //             left: -39px;
    //             /* border-top: 40px solid rgb(0 0 0 / 0.1); */
    //             border-left: 40px solid transparent;
    //             /* border-right: 40px solid #394056; */
    //             border-bottom: 40px solid #00a3e0;
    //             width: 0;
    //             height: 0;
    //           }
    //         `}</style>
    //       </div>
    //     ) : (
    //       <img
    //         src="/images/about.jpg"
    //         alt="Side"
    //         className="w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] object-cover"
    //       />
    //     )}
    //   </section>
    // </div>

    // <div className="container mx-auto w-full">
    //   <section className="relative flex flex-col-reverse md:flex-row items-center justify-center w-full p-1">
    //     <div className="flex flex-col w-full md:max-w-[40.625rem] md:h-[50.06rem] p-4 overflow-y-auto">
    //       <h2
    //         className={`mt-10 text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
    //       >
    //         {subtitle && subtitle}
    //       </h2>
    //       <h3 className={`text-2xl ${mainHeadingFont.className}`}>
    //         {title && title}
    //       </h3>
    //       <DecoratorLine />
    //       <p className={` ${contentFont.className} mb-4`}>
    //         {description && description}
    //       </p>
    //       {membership && <BoatClubPricing />}
    //     </div>

    //     {/* {video && (
    //       <div
    //         className={`w-full  md:w-1/2 relative ${
    //           video && "border-[30px] border-slate-900"
    //         }`}
    //       >
    //         {video ? (
    //           <video
    //             src="/images/about.jpg"
    //             className="w-full h-full object-cover"
    //             autoPlay
    //             muted
    //             loop
    //             playsInline
    //           />
    //         ) : (
    //           <CustomImage
    //             src="/videos/Sailboat_Videos_2.mp4"
    //             alt="Sailing at Windward Sailing Club"
    //             width={460}
    //             height={689}
    //             // className="w-full h-auto object-cover"
    //           />
    //         )}
    //       </div>
    //     )} */}

    //     {/* {video ? (
    //       <video
    //         src="/videos/Sailboat_Videos_2.mp4"
    //         controls
    //         autoPlay
    //         muted
    //         loop
    //         playsInline
    //         className="w-full h-full object-cover"
    //         // className="w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] object-cover border-8 border-blue-500"
    //       />
    //     ) : (
    //       <img
    //         src="/images/about.jpg"
    //         alt="Side"
    //         className="w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] object-cover "
    //       />
    //     )} */}
    //   </section>
    // </div>
  );
};

export default CommonMembershipAbout;

// import {
//   contentFont,
//   cursiveHeadingFont,
//   mainHeadingFont,
// } from "@/app/ui/fonts";
// import DecoratorLine from "./decorator-icon-line";

// import React from "react";
// import BoatClubPricing from "./membership-tojoin";
// interface AboutProps {
//   subtitle: string;
//   title: string;
//   description: string;
//   membership?: boolean;
// }

// const CommonMembershipAbout = ({
//   subtitle,
//   title,
//   description,
//   membership,
// }: AboutProps) => {
//   return (
//     <>
//       <div className="container mx-auto w-full">
//         <section className="relative flex flex-col-reverse md:flex-row items-center justify-center w-full   p-1">
//           <div className="flex flex-col w-full md:max-w-[40.625rem] md:h-[50.06rem] p-4 overflow-y-auto">
//             <h2
//               className={`mt-10 text-2xl text-flatBlue ${cursiveHeadingFont.className}`}
//             >
//               {subtitle && subtitle}
//             </h2>
//             <h3 className={`text-2xl ${mainHeadingFont.className}`}>
//               {title && title}
//             </h3>
//             <DecoratorLine />
//             <p className={`  ${contentFont.className} mb-4`}>
//               {description && description}
//             </p>
//             {membership && <BoatClubPricing />}
//           </div>

//           <img
//             src="/images/about.jpg"
//             alt="Side"
//             className="w-full md:max-w-[28.75rem] h-auto md:max-h-[43.06rem] object-cover"
//           />
//         </section>
//       </div>
//     </>
//   );
// };

// export default CommonMembershipAbout;
