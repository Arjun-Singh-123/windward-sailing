"use client";
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import JoinMembership from "./join-membership";
// import { Compass } from "lucide-react";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// import CustomImage from "../custom-image";

// export default function Detail({
//   title,
//   heading,
//   description,
//   membershipFees,
//   video
// }: any) {
//   const DynamicJoinMembership = dynamic(() => import("./join-membership"), {
//     loading: () => <p>Loading...</p>,
//   });
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-2xl font-bold text-sky-800 font-great-vibes">
//         Windward Sailing Club
//       </h1>
//       <h1 className="text-4xl font-bold text-[#00008b] mb-8   first-line">
//         {title}
//       </h1>
//       <Compass className="h-8 w-8 text-sky-500 mr-4" />

//       {/* <div className="before:content-[''] before:w-25px before:h-25px before:mr-2.5 before:bg-logoIcon before:bg-no-repeat before:bg-cover after:content-[''] after:w-40px after:h-1px after:bg-darkBlue prataHeadingDesign">
//         hello
//       </div> */}
//       <div className="ml-4 flex-grow border-t-2 border-black border w-[100px] -top-6"></div>
//       <Card className="overflow-hidden">
//         <CardContent className="p-0">
//           <div className="flex flex-col md:flex-row">
//             <div className="md:w-1/2 p-8">
//               <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
//               <p className="mb-4">{description}</p>
//               {membershipFees && <DynamicJoinMembership />}
//             </div>
//             <div className="md:w-1/2">
//               {/* <Image
//                 src="/images/about.jpg "
//                 alt="Sailing at Windward Sailing Club"
//                 className="w-full h-full object-cover"
//                 height={689}
//                 width={460}
//                 loading="eager"
//               /> */}

//               {/* <Image
//                 src="/images/about.jpg"
//                 alt="Sailing at Windward Sailing Club"
//                 className="w-full h-full object-cover"
//                 width={460}
//                 height={689}
//                 placeholder="blur"
//                 blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAADBAUCAQYA/8QALRAAAgIBAwIEBQQDAAAAAAAAAQIAAxEEEiExQRMiUWEFMnGBkRQjQqEVUrH/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAhEQACAgICAgMBAAAAAAAAAAAAAQIRAyESMRNBBCJRYf/aAAwDAQACEQMRAD8A9hVQqjAA+0KqgdoNWwIZWnJZ1pDCrBhFEMqzNmiQdVhVWDVYdVmbNREVYRVglWHVZrNxGFWEVYNVhVWZs3EYVYRVglWFVZrDxGFWEVYJVhVWGwcRhVhFWDVYVVhsHEYVYRVgVWFVYbBxGFWFVYFVhVWGwcSXr9Dp9TqHe5A2DgHGQPaIaXSaGnWMlFKEgZyF6/meh8IHqIrZpKXYs1a5PXiI5UVcLPLawaY6l1qCrWeoz3jlWn09f7ddagegUCOHTVD+I/M5ZXXWMswHoOsm5bKKOiQdNWdS6KuWc4AHeVKvgtm3UvqAGU8onT7nrFPhXhHWMa8ZwcH2npFAA4GIOTZOWJL0IaX4bpNOc11Dc3djyTHlrVRhQAPYQ4EKqxXJsmoJdCyrCqsKqwirDYvEXVYVVhVWEVYbDxF1WFVYRVP8ePrONqtOgy9yAerCGzeM9Bp9JRTnwkVc9cDrOajTafUArdWrqfURFviGmP8AAnPcYMWs+KtniuoEHsYjcn6OiMYx7PQHEGywVOqS5Qytyp6ESRqNZqLNaaNI7IFXLsOCTFUnLoq4JK2Wg0KrTzTeNeuXJZvU5MeSwMoZWBB6ERBK0FRYdWmRYdWmNQwrQqtFlaFVobFoZVp1Wi6tCq0NgoZVp1Wi6tCq0xqDahLbKyK8ZHXPSQdX8Pu0zM1OGQ/xPUfSegrYMMg5ELuJ6yUoWVhNxPHV2kHzDB9Y1XqD3lPX6GvVAsvlcfK3f6SLZp7aWKupBHrIyi4s64TUkMrZCK8QSwjrDLYR3ibLKRRXhFeJLYR1MYS5T2hFsHrJ0cRhlaFVoutghFaGxaGVaFVoqrQqtDYtDKtOq0XVp1WmNQyrTqtF1aFVpjUf/9k="
//               /> */}

//               <CustomImage
//                 src="/images/about.jpg"
//                 alt="Sailing at Windward Sailing Club"
//                 width={460}
//                 height={689}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { Compass } from "lucide-react";
// import { Span } from "next/dist/trace";
// import CustomImage from "../custom-image";

// interface MediaCardProps {
//   title: string;
//   heading: string;
//   description: string;
//   membershipFees?: boolean;
//   mediaUrl: string;
//   isVideo: boolean;
// }

// const MediaCard: React.FC<MediaCardProps> = ({
//   title,
//   heading,
//   description,
//   membershipFees = false,
//   mediaUrl,
//   isVideo,
// }) => {
//   const [showVideo, setShowVideo] = useState(false);

//   useEffect(() => {
//     if (isVideo) {
//       setShowVideo(true);
//     }
//   }, [isVideo]);

//   return (
//     <div className="  mx-auto px-4 py-12 bg-[#ebf8fc] w-full">
//       <div className=" container  mx-auto  px-4 py-12 bg-[#ebf8fc] max-w-screen-xl ">
//         <h1
//           className={`text-2xl font-bold
//             text-sky-800
//            font-great-vibes `}
//         >
//           {!isVideo ? (
//             <span>Windward Sailing Club</span>
//           ) : (
//             <span>About Us</span>
//           )}
//         </h1>
//         <h1
//           className={`text-4xl font-bold mb-8 first-line
//             "text-black
//           `}
//         >
//           {title}
//         </h1>
//         <div className="flex items-center mb-4 relative">
//           {/* <Compass className="h-8 w-8 text-sky-500 mr-4" /> */}
//           <img
//             src="/images/favicon.ico"
//             alt="icon"
//             className="h-8 w-8 text-sky-500 mr-4"
//           />
//           <div className="flex-grow border-t-2 absolute border-black w-[50px] left-10"></div>
//         </div>
//         <Card className="overflow-hidden">
//           <CardContent className="p-0">
//             <div className="flex flex-col md:flex-row">
//               <div className="md:w-1/2 p-8">
//                 <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
//                 <p className="mb-4">{description}</p>
//                 {membershipFees && <Button>Join Membership</Button>}
//               </div>

//               <div
//                 className={`md:w-1/2 relative ${
//                   isVideo && "border-[30px] border-slate-900"
//                 }`}
//               >
//                 {isVideo && showVideo ? (
//                   <video
//                     src={mediaUrl}
//                     className="w-full h-full object-cover"
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                   />
//                 ) : (
//                   // <Image
//                   //   src={mediaUrl}
//                   //   alt={heading}
//                   //   className="w-full h-full object-cover"
//                   //   width={460}
//                   //   height={689}
//                   //   placeholder="blur"
//                   //   blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAADBAUCAQYA/8QALRAAAgIBAwIEBQQDAAAAAAAAAQIAAxEEEiExQRMiUWEFMnGBkRQjQqEVUrH/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAhEQACAgICAgMBAAAAAAAAAAAAAQIRAyESMRNBBCJRYf/aAAwDAQACEQMRAD8A9hVQqjAA+0KqgdoNWwIZWnJZ1pDCrBhFEMqzNmiQdVhVWDVYdVmbNREVYRVglWHVZrNxGFWEVYNVhVWZs3EYVYRVglWFVZrDxGFWEVYJVhVWGwcRhVhFWDVYVVhsHEYVYRVgVWFVYbBxGFWFVYFVhVWGwcRhVhFWDVYVVhsHEYVYRVgVWFVYbBxGFWFVYFVhVWGwcSXr9Dp9TqHe5A2DgHGQPaIaXSaGnWMlFKEgZyF6/meh8IHqIrZpKXYs1a5PXiI5UVcLPLawaY6l1qCrWeoz3jlWn09f7ddagegUCOHTVD+I/M5ZXXWMswHoOsm5bKKOiQdNWdS6KuWc4AHeVKvgtm3UvqAGU8onT7nrFPhXhHWMa8ZwcH2npFAA4GIOTZOWJL0IaX4bpNOc11Dc3djyTHlrVRhQAPYQ4EKqxXJsmoJdCyrCqsKqwirDYvEXVYVVhVWEVYbDxF1WFVYRVP8ePrONqtOgy9yAerCGzeM9Bp9JRTnwkVc9cDrOajTafUArdWrqfURFviGmP8AnPcYMWs+KtniuoEHsYjcn6OiMYx7PQHEGywVOqS5Qytyp6ESRqNZqLNaaNI7IFXLsOCTFUnLoq4JK2Wg0KrTzTeNeuXJZvU5MeSwMoZWBB6ERBK0FRYdWmRYdWmNQwrQqtFlaFVobFoZVp1Wi6tCq0NgoZVp1Wi6tCq0xqDahLbKyK8ZHXPSQdX8Pu0zM1OGQ/xPUfSegrYMMg5ELuJ6yUoWVhNxPHV2kHzDB9Y1XqD3lPX6GvVAsvlcfK3f6SLZp7aWKupBHrIyi4s64TUkMrZCK8QSwjrDLYR3ibLKRRXhFeJLYR1MYS5T2hFsHrJ0cRhlaFVoutghFaGxaGVaFVoqrQqtDYtDKtOq0XVp1WmNQyrTqtF1aFVpjUf/9k="
//                   // />

//                   <CustomImage
//                     src="/images/about.jpg"
//                     alt="Sailing at Windward Sailing Club"
//                     width={460}
//                     height={689}
//                   />
//                 )}
//               </div>
//               <div className="triangle"></div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default MediaCard;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import CustomImage from "../custom-image";
import { cursiveHeadingFont, mainHeadingFont } from "@/app/ui/fonts";
import DecoratorLine from "./decorator-icon-line";

interface Specification {
  name: string;
  value: string;
}

interface SpecificationCategory {
  title: string;
  specs: Specification[];
}

interface Benefit {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface DetailProps {
  title?: string;
  heading?: string;
  description?: string;
  membershipFees?: boolean;
  mediaUrl?: string;
  isVideo?: boolean;
  specificationData?: SpecificationCategory[];
  benefitsData?: Benefit[];
  benefits?: boolean;
}

const Detail: React.FC<DetailProps> = ({
  title,
  heading,
  description,
  membershipFees = false,
  mediaUrl,
  isVideo = false,
  specificationData,
  benefitsData,
  benefits = true,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isVideo) {
      setShowVideo(true);
    }
  }, [isVideo]);

  useEffect(() => {
    // Function to detect if the screen width is mobile size (typically 768px and below)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Run the function on mount and on resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // return (
  //   <div>
  //     {isMobile ? (
  //       <p>You are on a mobile device!</p>
  //     ) : (
  //       <p>You are on a desktop version!</p>
  //     )}
  //   </div>
  // );

  return (
    // <div className="container mx-auto px-4 py-12 bg-[#ebf8fc]">
    <div className={`  container mx-auto  bg-[#ebf8fc]`}>
      {/* {isMobile ? (
        ""
      ) : (
        <>
          <h1
            className={`text-4xl font-bold text-[#00008b] mb-8 ${cursiveHeadingFont.className}`}
          >
            About Us
          </h1>
          <h1 className="text-4xl font-bold text-[#00008b] mb-8">{title}</h1>

          <DecoratorLine />
        </>
      )} */}

      {(heading || description || mediaUrl) && (
        <>
          <Card className="mb-8      overflow-hidden bg-[#ebf8fc] border-none">
            <CardContent className="p-1 ">
              <div className="flex   flex-col-reverse md:flex-row ">
                {isMobile ? (
                  ""
                ) : (
                  <div className="flex flex-col">
                    <h1
                      className={`text-4xl font-bold text-[#00008b] mb-8 ${cursiveHeadingFont.className}`}
                    >
                      {heading && heading}
                    </h1>
                    <h1 className="text-4xl font-bold text-[#00008b] mb-8">
                      {title}
                    </h1>

                    <DecoratorLine />

                    {description && <p className="mb-4">{description}</p>}
                  </div>
                )}
                {!isMobile && (heading || description) && (
                  <div className="w-full md:w-1/2 p-8">
                    {/* {heading && (
                      <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
                    )} */}
                    {/* {description && <p className="mb-4">{description}</p>} */}
                    {membershipFees && (
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Join Membership
                      </button>
                    )}
                  </div>
                )}
                {mediaUrl && (
                  <div
                    className={`w-full  md:w-1/2 relative ${
                      isVideo && "border-[30px] border-slate-900"
                    }`}
                  >
                    {isVideo ? (
                      <video
                        src={mediaUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <CustomImage
                        src={mediaUrl}
                        alt="Sailing at Windward Sailing Club"
                        width={460}
                        height={689}
                        // className="w-full h-auto object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
              {!isMobile ? (
                ""
              ) : (
                <>
                  <h1
                    className={`text-4xl font-bold text-[#00008b] mt-10 mb-1 ${cursiveHeadingFont.className}`}
                  >
                    About Us
                  </h1>
                  <h1 className="text-4xl font-bold text-[#00008b] mb-2">
                    {title}
                  </h1>

                  <DecoratorLine />
                  {(heading || description) && (
                    <div className="w-full md:w-1/2 p-2">
                      {heading && (
                        <h2 className="text-2xl font-semibold mb-1">
                          {heading}
                        </h2>
                      )}
                      {description && <p className="mb-2">{description}</p>}
                      {membershipFees && (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                          Join Membership
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {specificationData && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specificationData.map((section, index) => (
              <Card key={index} className="border-[#1e40af]">
                <CardHeader className="bg-[#1e40af] text-white">
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {section.specs.map((spec, specIndex) => (
                        <TableRow key={specIndex}>
                          <TableCell className="font-medium text-[#1e40af]">
                            {spec.name}
                          </TableCell>
                          <TableCell>{spec.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {benefitsData && (
        <div className="mb-8">
          {/* <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">
            What You Get
          </h2> */}

          <div className="text-start space-y-2">
            <h1
              className={` text-start  text-xl text-flatBlue ${cursiveHeadingFont.className}`}
              style={{ marginTop: "1.25rem" }}
            >
              Benefits
            </h1>
            <h2 className={`text-4xl ${mainHeadingFont.className}`}>
              What You Get
            </h2>
            <DecoratorLine />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 bg-[#bfdbfe] rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefitsData.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <span>{benefit.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e40af] mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
              <Image
                src="/images/benefits.jpg"
                alt="benefits"
                layout="responsive"
                width={500}
                height={500}
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>

    // <div className="container mx-auto px-4 py-12">
    //   <h1 className="text-4xl font-bold text-[#00008b] mb-8">{title}</h1>

    //   <div className="flex items-center mb-4 relative">
    //     {/* <div className="flex-grow border-t-2 absolute border-black w-[50px] left-10"></div> */}
    //     {/* <div
    //       className="flex-grow border-t-2 border-black mr-2"
    //       style={{ maxWidth: "100px" }}
    //     ></div> */}

    //     <img
    //       src="/images/Logo-Icon.png"
    //       alt="icon"
    //       className="h-8 w-8 text-sky-500 mr-4"
    //     />
    //     <div
    //       className="flex-grow border-t-2 border-black "
    //       style={{ maxWidth: "100px" }}
    //     ></div>

    //     {/* <div className="flex-grow border-t-2 absolute border-black w-[50px] left-10"></div> */}
    //   </div>

    //   {(heading || description || mediaUrl) && (
    //     <Card className="mb-8 overflow-hidden">
    //       <CardContent className="p-0">
    //         <div className="flex flex-col md:flex-row">
    //           {(heading || description) && (
    //             <div className="md:w-1/2 p-8">
    //               {heading && (
    //                 <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
    //               )}
    //               {description && <p className="mb-4">{description}</p>}
    //               {membershipFees && (
    //                 <button className="bg-blue-500 text-white px-4 py-2 rounded">
    //                   Join Membership
    //                 </button>
    //               )}
    //             </div>
    //           )}
    //           {mediaUrl && (
    //             <div
    //               className={`md:w-1/2 relative ${
    //                 isVideo && "border-[30px] border-slate-900"
    //               }`}
    //             >
    //               {isVideo ? (
    //                 <video
    //                   src={mediaUrl}
    //                   className="w-full h-full object-cover"
    //                   autoPlay
    //                   muted
    //                   loop
    //                   playsInline
    //                 />
    //               ) : (
    //                 <CustomImage
    //                   src={mediaUrl}
    //                   alt="Sailing at Windward Sailing Club"
    //                   width={460}
    //                   height={689}
    //                 />
    //               )}
    //             </div>
    //           )}
    //         </div>
    //       </CardContent>
    //     </Card>
    //   )}

    //   {specificationData && (
    //     <div className="mb-8">
    //       <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">
    //         Specifications
    //       </h2>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //         {specificationData.map((section, index) => (
    //           <Card key={index} className="border-[#1e40af]">
    //             <CardHeader className="bg-[#1e40af] text-white">
    //               <CardTitle>{section.title}</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //               <Table>
    //                 <TableBody>
    //                   {section.specs.map((spec, specIndex) => (
    //                     <TableRow key={specIndex}>
    //                       <TableCell className="font-medium text-[#1e40af]">
    //                         {spec.name}
    //                       </TableCell>
    //                       <TableCell>{spec.value}</TableCell>
    //                     </TableRow>
    //                   ))}
    //                 </TableBody>
    //               </Table>
    //             </CardContent>
    //           </Card>
    //         ))}
    //       </div>
    //     </div>
    //   )}

    //   {benefitsData && (
    //     <div className="mb-8">
    //       <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">
    //         What You Get
    //       </h2>
    //       <div className="flex flex-wrap">
    //         <div className="flex-1 p-8 bg-[#bfdbfe] rounded-lg">
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //             {benefitsData.map((benefit, index) => (
    //               <div key={index} className="flex items-start space-x-4">
    //                 <div className="flex-shrink-0">
    //                   <span>{benefit.icon}</span>
    //                 </div>
    //                 <div>
    //                   <h3 className="text-lg font-semibold text-[#1e40af] mb-2">
    //                     {benefit.title}
    //                   </h3>
    //                   <p className="text-sm text-gray-600">
    //                     {benefit.description}
    //                   </p>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //         <div className="flex-1">
    //           <Image
    //             src="/images/benefits.jpg"
    //             alt="benefits"
    //             layout="responsive"
    //             width={500}
    //             height={500}
    //             className="object-cover h-full"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default Detail;
