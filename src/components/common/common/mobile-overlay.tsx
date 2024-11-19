"use client";
import React from "react";
import Link from "next/link";
import {
  X,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ContactItem {
  id: string;
  icon: string | null;
  label: string;
  value: string;
  type: string;
  platform: string | null;
  status: string;
  position: string;
  button_style?: string | null;
}

interface MobileOverlayProps {
  contacts: ContactItem[];
  onClose: () => void;
}

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "phone":
      return <Phone className="w-6 h-6" />;
    case "clock":
      return <Clock className="w-6 h-6" />;
    case "map-pin":
      return <MapPin className="w-6 h-6" />;
    case "email":
      return <Mail className="w-6 h-6" />;
    case "facebook":
      return <Facebook className="w-6 h-6" />;
    case "twitter":
      return <Twitter className="w-6 h-6" />;
    case "instagram":
      return <Instagram className="w-6 h-6" />;
    default:
      return null;
  }
};

export default function MobileOverlay({
  contacts,
  onClose,
}: MobileOverlayProps) {
  const loginItem = contacts.find((item) => item.type === "login");
  const supportEmailItem = contacts.find(
    (item) => item.type === "support_email"
  );
  const socialItems = contacts.filter((item) => item.type === "social");
  const contactItems = contacts.filter((item) =>
    ["phone", "hours", "location"].includes(item.type)
  );

  return (
    <div className="md:block fixed inset-0 z-50 lg:hidden bg-sky text-black py-4 overflow-y-auto">
      <button
        className="absolute top-4 right-4 rounded-full text-white shadow-md bg-red-600 p-2"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4">
          <div className="">
            {loginItem && (
              <Button className="flex justify-center items-center w-full px-4 py-2 text-white bg-flatBlue hover:bg-flatBlue rounded-lg">
                <Link href={loginItem.value}>{loginItem.label}</Link>
              </Button>
            )}
            {supportEmailItem && (
              <Link
                href={`mailto:${supportEmailItem.value}`}
                className="text-xl hover:underline flex justify-center items-center mt-4"
              >
                <Mail className="mr-2" /> {supportEmailItem.value}
              </Link>
            )}
            <div className="flex justify-center items-center w-full p-2 space-x-4 border-2 rounded-full mt-2 shadow-sm">
              {socialItems?.map((item) => (
                <Link
                  key={item.id}
                  href={item.value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent icon={item?.icon as string} />
                </Link>
              ))}
              <Youtube className="w-6 h-6" />
            </div>
          </div>
          {contactItems?.map((item, index) => (
            <React.Fragment key={item.id}>
              <Separator className="bg-white/20" />
              <div className="flex items-center space-x-2">
                <IconComponent icon={item?.icon as string} />
                <div>
                  <div className="text-sm">{item.label}</div>
                  {item.type === "hours" ? (
                    <>
                      <div className="font-bold">
                        {item.value.split("\\n")[0]}
                      </div>
                      <div className="text-sm">
                        {item.value.split("\\n")[1]}
                      </div>
                    </>
                  ) : (
                    <div className="font-bold">{item.value}</div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
