"use client";
// import React, { cache, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
// import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicleAmenities } from "@/lib/services";
import Image from "next/image";
import { SkeletonCard } from "@/components/skeleton";
import MemberCard from "@/components/common/member-card";

// const members = [
//   {
//     name: "Randy Treas",
//     role: "CEO/ADMINISTRATOR",
//     image: "/images/randy.jpg?height=200&width=200",
//     about:
//       "With a distinguished career spanning over two decades in the world of premium cigars and luxury lifestyle, Randy Treas stands as the visionary leader steering the Eldorado Cigar Club to unparalleled heights. His dynamic approach to business and a deep-seated passion for cigars have not only propelled the club's success but have also left an indelible mark on the industry.",
//     email: "randyt@lkousa.com",
//     phone: "413-822-9996",
//     borderColor: "border-green-500",
//   },
//   {
//     name: "John Schaaf",
//     role: "ADMINISTRATOR",
//     image: "/images/john.jpg?height=200&width=200",
//     about:
//       "As the Executive Administrator, John Schaaf is the linchpin of our organization's administrative team. With over a decade of experience in managing high-level executives, she orchestrates seamless operations, oversees critical projects, and ensures all administrative processes align with the company's strategic goals.",
//     email: "john.schaaf@praxus.com",
//     phone: "413-822-9997",
//     borderColor: "border-blue-500",
//   },
//   {
//     name: "Senjalkumar",
//     role: "ADMINISTRATOR",
//     image: "/images/senjal.jpg?height=200&width=200",
//     about:
//       "Senjalkumar is the Human Resources Administrator with a passion for fostering a positive and inclusive work environment. With a background in HR management, he oversees recruitment, benefits administration, and employee relations, ensuring our team members are supported and engaged.",
//     email: "senjal.india@gmail.com",
//     phone: "9824298242",
//     borderColor: "border-blue-500",
//   },
//   {
//     name: "Randy Treas",
//     role: "CEO/ADMINISTRATOR",
//     image: "/images/randy.jpg?height=200&width=200",
//     about:
//       "With a distinguished career spanning over two decades in the world of premium cigars and luxury lifestyle, Randy Treas stands as the visionary leader steering the Eldorado Cigar Club to unparalleled heights. His dynamic approach to business and a deep-seated passion for cigars have not only propelled the club's success but have also left an indelible mark on the industry.",
//     email: "randyt@lkousa.com",
//     phone: "413-822-9996",
//     borderColor: "border-green-500",
//   },
//   {
//     name: "John Schaaf",
//     role: "ADMINISTRATOR",
//     image: "/images/john.jpg?height=200&width=200",
//     about:
//       "As the Executive Administrator, John Schaaf is the linchpin of our organization's administrative team. With over a decade of experience in managing high-level executives, she orchestrates seamless operations, oversees critical projects, and ensures all administrative processes align with the company's strategic goals.",
//     email: "john.schaaf@praxus.com",
//     phone: "413-822-9997",
//     borderColor: "border-blue-500",
//   },
//   {
//     name: "Senjalkumar",
//     role: "ADMINISTRATOR",
//     image: "/images/senjal.jpg?height=200&width=200",
//     about:
//       "Senjalkumar is the Human Resources Administrator with a passion for fostering a positive and inclusive work environment. With a background in HR management, he oversees recruitment, benefits administration, and employee relations, ensuring our team members are supported and engaged.",
//     email: "senjal.india@gmail.com",
//     phone: "9824298242",
//     borderColor: "border-blue-500",
//   },
// ];

export default function Members() {
  //   const [members, setMembers] = useState<any[]>([]);
  // const [boatData, setBoatData] = useState<any>({});

  const { data: members } = useQuery({
    queryKey: ["members-info"],
    queryFn: () => fetchVehicleAmenities(),
  });

  // console.log("members data", members);
  //   useEffect(() => {
  //     fetchVehicleAmenities();
  //   }, []);

  // Define the cached function

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#00008b] mb-8">Members</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {members ? (
          members.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              image={member.image ?? ""}
              about={member?.about ?? ""}
              email={member?.email}
              phone={member?.phone ?? ""}
            />
          ))
        ) : (
          <SkeletonCard />
        )}
        {/* {members ? (
          members?.map((member, index) => (
            <Card
              key={index}
              // className={`relative pt-12 ${member.borderColor} mb-12`}
              className={`relative border-2 pt-12   border-t-blue-500 mb-12 min-h-[300px]`}
            >
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden border-b-8 border-b-blue-500  `}
                >
                  <Image
                    src={member?.image ?? ""}
                    alt={member?.name}
                    className="w-full h-full object-cover "
                    width={96}
                    height={96}
                  />
                </div>
              </div>
              <CardContent>
                <h2 className="text-2xl font-semibold text-center mb-2">
                  {member.name}
                </h2>
                {/* <p className="text-gray-500 text-center mb-4">{member.role}</p> */}
        {/* <p className="text-sm mb-4">{member.about}</p>
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    <span className="text-sm">{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    <span className="text-sm">{member.phone}</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <SkeletonCard />
        )}  */}
      </div>
    </div>
  );
}
