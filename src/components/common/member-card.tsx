import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

interface MemberProps {
  name: string;
  image: string;
  about?: string;
  email?: string;
  phone?: string;
}

const MemberCard: React.FC<MemberProps> = ({
  name,
  image,
  about,
  email,
  phone,
}) => (
  <Card className="relative border-t-[0.625rem] pt-12 border-t-blue-500 mb-12 min-h-[300px]">
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
      <div className="w-44 h-44 rounded-full overflow-hidden border-[0.625rem] border-r-blue-500 border-b-blue-500 transform rotate-45 -mt-[3.125rem] ">
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
      <h2 className="text-2xl font-semibold mb-1">Amanda Martin</h2>
      <h4 className="text-lg font-medium text-muted-foreground mb-4">
        SAFETY OFFICER
      </h4>
      <p className="text-sm mb-6 px-4">
        <span className="font-semibold">About: </span>
        Ensures adherence to safety protocols and conducts safety briefings for
        members.
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
export default MemberCard;
