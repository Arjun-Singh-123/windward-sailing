"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchVehicleAmenities } from "@/lib/services";
import { SkeletonCard } from "@/components/skeleton";
import MemberCard from "@/components/common/member-card";
import DecoratorLine from "@/components/common/decorator-icon-line";
import { cursiveHeadingFont, mainHeadingFont } from "../ui/fonts";

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
const desiredOrder = [
  "Randy Treas",
  "John Schaaf",
  "Senjalkumar",
  "Amanda Martin",
  "Brian Taylor",
  "Christopher Brown",
  "Daniel Davis",
  "David Thompson",
  "Emily Turner",
  "Jason Wilson",
  "Jennifer Smith",
  "Jessica Martinez",
  "Jessica Turner",
  "John Williams",
  "Kevin Davis",
  "Laura Hernandez",
  "Lisa Baker",
  "Melissa Jackson",
  "Member1",
  "Member2",
  "Michael Davis",
  "Robert Johnson",
  "Sarah Anderson",
];
export default function Members() {
  const { data: members } = useQuery({
    queryKey: ["members-info"],
    queryFn: () => fetchVehicleAmenities(),
  });

  const orderedMembers = desiredOrder
    .map((name) => {
      return members?.find((member) => member.name === name);
    })
    .filter((member) => member !== undefined);

  console.log("member memeber", members);
  return (
    <section className="w-full p-4 max-w-6xl mx-auto">
      <div className="container mx-auto  py-12">
        <div className="text-start space-y-2 px-4  ">
          <h1
            className={` text-start  text-[1.375rem] text-flatBlue ${cursiveHeadingFont.className}`}
            style={{ marginTop: "1.25rem" }}
          >
            Windward Sailing Club
          </h1>
          <h2 className={`text-4xl ${mainHeadingFont.className}`}>Members</h2>
          <DecoratorLine />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr mt-20">
          {members ? (
            orderedMembers?.map((member, index) => (
              <MemberCard
                key={index}
                name={member.name}
                image={member.image ?? ""}
                profession={member.profession ?? ""}
                about={member?.about ?? ""}
                email={member?.email}
                phone={member?.phone ?? ""}
                index={index}
              />
            ))
          ) : (
            <SkeletonCard />
          )}
        </div>
      </div>
    </section>
  );
}
