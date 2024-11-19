import Link from "next/link";

import React, { useEffect, useState } from "react";
import IconComponent from "./icon-component";
import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "@/services/product-services";

const SocialMediaItems: React.FC = () => {
  const {
    data: contacts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading contacts.</div>;

  const emailItem = contacts?.find((item) => item.type === "support_email");
  const socialItems = contacts?.filter((item) => item.type === "social");

  return (
    <div className="container mx-auto mt-2  max-w-6xl  flex flex-col items-start space-y-4  ">
      {/* Email Section */}
      {emailItem && (
        <Link
          href={`mailto:${emailItem.value}`}
          className="flex items-center space-x-2 text-xl hover:underline  "
        >
          <IconComponent
            icon={emailItem.icon}
            className="text-black stroke-white stroke-2 w-6 h-6"
          />
          <span>{emailItem.value}</span>
        </Link>
      )}

      {/* Social Icons */}
      <SocialLinks />
      {/* <div className="flex   space-y-2 mt-4 gap-4   ">
        {socialItems.map((item) => (
          <Link
            key={item.id}
            href={item.value ?? ""}
            aria-label={item.label}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`
            flex items-center justify-center  w-fit  
            p-2 rounded-lg
            transition-all duration-300
            ${hoveredId === item.id ? "bg-[#232323]" : "bg-white"}
            hover:scale-110
          `}
          >
            <IconComponent
              icon={item.icon}
              className="w-6 h-6 text-gray-700 transition-colors duration-300 hover:text-white"
            />
          </Link>
        ))}
      </div> */}
    </div>
  );
};

// export default SocialMediaItems;

type ContactItem = {
  id: string;
  icon: string;
  label: string;
  value: string;
  type: string;
};

interface ContactItemsProps {
  contactItems: ContactItem[];
}

import {
  ChevronDown,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  PinIcon as Pinterest,
  Settings,
  Twitter,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userAgent } from "next/server";
import SocialLinks from "./social-links";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
// Helper function to get session from localStorage
const getSession = () => {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }
  return null;
};

const SettingsPanel = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const session = getSession();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const contactInfo = {
    email: "support@windwardsailingclub.com",
    phone: "(949) 675-9060",
    hours: "Monday — Sunday\n9:00 a.m. — 5:00 p.m.",
    address: "3300 Via Lido, Windward Beach, CA 92663",
  };

  const routes = [
    { name: "Member Dashboard", href: "/member-dashboard" },
    { name: "Boat Services", href: "/boat-services" },
    { name: "Vessel Amenity", href: "/vessel-amenity" },
    { name: "Boats Dashboard", href: "/boats-dashboard" },
  ];
  console.log(session);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="text-white h-20 w-24  rounded-none  md:border-l border-white/10 bg-transparent"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[400px] bg-[#052449] text-white p-0"
      >
        {session && (
          <SheetHeader className="p-6 pb-0">
            <SheetTitle className="text-white">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={session?.avatar}
                    alt={session?.username || "Guest"}
                  />
                  <AvatarFallback>
                    {session?.username?.charAt(0) || <User />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2">
                      <span className="font-semibold">
                        {session?.username?.charAt(0)?.toUpperCase() +
                          session?.username?.slice(1) || "Guest"}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#052449] text-white border-white/10">
                      {routes.map((route) => (
                        <DropdownMenuItem key={route.href} className=" ">
                          <Link href={route.href} className="w-full">
                            {route.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-sm text-gray-400">
                    {contactInfo.email}
                  </span>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
        )}

        <div className="p-6">
          {/* Social Links */}

          <Separator className="bg-white/10 my-6" />

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">CALL US</div>
                <div className="font-semibold">{contactInfo.phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-5 w-5 text-gray-400">⏰</div>
              <div>
                <div className="text-sm text-gray-400">HOURS OF OPERATION</div>
                {contactInfo.hours.split("\n").map((line, index) => (
                  <div key={index} className="font-semibold">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">COMPANY / LOCATION</div>
                <div className="font-semibold">{contactInfo.address}</div>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 my-6" />
          <SocialLinks />
          {/* Navigation Links */}
          {session ? (
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => {
                localStorage.removeItem("session");
                toast.success("You have been successfully logged out!", {
                  duration: 3000,
                });
                window.location.reload();
              }}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export { SettingsPanel, SocialMediaItems };
