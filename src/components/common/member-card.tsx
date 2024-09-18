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
  <Card className="relative border-2 pt-12 border-t-blue-500 mb-12 min-h-[300px]">
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
      <div className="w-24 h-24 rounded-full overflow-hidden border-b-8 border-b-blue-500">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          width={96}
          height={96}
        />
      </div>
    </div>
    <CardContent>
      <h2 className="text-2xl font-semibold text-center mb-2">{name}</h2>
      <p className="text-sm mb-4">{about}</p>
      <div className="flex items-center justify-center space-x-4">
        <a
          href={`mailto:${email}`}
          className="flex items-center text-blue-500 hover:underline"
        >
          <Mail className="w-4 h-4 mr-1" />
          <span className="text-sm">{email}</span>
        </a>
        <a
          href={`tel:${phone}`}
          className="flex items-center text-blue-500 hover:underline"
        >
          <Phone className="w-4 h-4 mr-1" />
          <span className="text-sm">{phone}</span>
        </a>
      </div>
    </CardContent>
  </Card>
);
export default MemberCard;
