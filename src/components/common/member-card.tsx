"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { contentFont, mainHeadingFont } from "@/app/ui/fonts";

interface MemberProps {
  name: string;
  image: string;
  about?: string;
  email?: string;
  phone?: string;
  index?: number;
}

const MemberCard: React.FC<MemberProps> = ({
  name,
  image,
  about,
  email,
  phone,
  index,
}) => {
  return (
    <Card
      className={`relative border-t-[0.625rem] pt-12 m-2 mt-6 ${
        index === 0
          ? "border-t-green-500 border-green-500"
          : index === 1
          ? "border-t-blue-500 border-blue-500"
          : "border-t-black border-black"
      } mb-12 min-h-[300px]`}
    >
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <div
          className={`w-44 h-44 rounded-full overflow-hidden border-[0.625rem] ${
            index === 0
              ? "border-b-green-500 border-r-green-500"
              : index === 1
              ? "border-b-blue-500 border-r-blue-500"
              : "border-b-black border-r-black"
          } transform rotate-45 -mt-[3.125rem]`}
        >
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover -rotate-45"
            width={96}
            height={96}
          />
        </div>
      </div>
      <CardContent className="flex flex-col items-center text-center mt-10">
        <h2
          className={`text-2xl font-semibold mb-1 text-flatBlue ${mainHeadingFont.className}`}
        >
          Amanda Martin
        </h2>
        <small className=" uppercase font-medium text-muted-foreground mb-4">
          SAFETY OFFICER
        </small>
        <p className="text-sm mb-6 px-4 text-justify">
          <span className={`font-semibold ${contentFont.className}`}>
            About:{" "}
          </span>
          With a distinguished career spanning over two decades in the world of
          premium cigars and luxury lifestyle, Randy Treas stands as the
          visionary leader steering the Eldorado Cigar Club to unparalleled
          heights. His dynamic approach to business and a deep-seated passion
          for cigars have not only propelled the club's success but have also
          left an indelible mark on the industry.
        </p>
        <div className="flex flex-col gap-2 items-start w-full px-4">
          <a
            href="mailto:amanda.martin@example.com"
            className="flex items-center text-primary hover:underline"
          >
            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">Email: amanda.martin@example.com</span>
          </a>
          <a
            href="tel:(555) 234-5678"
            className="flex items-center text-primary hover:underline"
          >
            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">Phone: (555) 234-5678</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
