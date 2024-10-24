"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import CustomImage from "../custom-image";
import {
  contentFont,
  cursiveHeadingFont,
  mainHeadingFont,
} from "@/app/ui/fonts";
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

  return (
    <div className={`  container mx-auto  `}>
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
        <div className="  mb-8">
          <div className="text-start space-y-2 mb-6">
            <h1
              className={` text-start  text-xl text-flatBlue  `}
              style={{ marginTop: "1.25rem" }}
            >
              Benefits
            </h1>
            <h2 className={`text-4xl ${mainHeadingFont.className}`}>
              What You Get
            </h2>
            <DecoratorLine />
          </div>
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <div className="w-full md:w-1/2 mt-2   rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefitsData?.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <span>{benefit.icon}</span>
                    </div>
                    <div>
                      <h3
                        className={`text-[1.375rem] font-semibold text-darkBlue mb-2 ${contentFont.className}`}
                      >
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
            <div className="w-full   md:w-1/2 mt-8 md:mt-0 md:ml-8">
              <Image
                src="/images/features.png"
                alt="benefits"
                width={500}
                height={800}
                className="object-cover w-full h-full rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
