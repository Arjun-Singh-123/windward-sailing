"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchVehicleAmenities } from "@/lib/services";
import { SkeletonCard } from "@/components/skeleton";
import MemberCard from "@/components/common/member-card";
import DecoratorLine from "@/components/common/decorator-icon-line";
import { mainHeadingFont } from "@/app/ui/fonts";
import { MembersdDesiredOrder } from "@/constants";

export default function Members() {
  const { data: members } = useQuery({
    queryKey: ["members-info"],
    queryFn: () => fetchVehicleAmenities(),
  });

  const orderedMembers = MembersdDesiredOrder.map((name) => {
    return members?.find((member) => member.name === name);
  }).filter((member) => member !== undefined);

  return (
    <section className="p-4 container mx-auto w-full max-w-[1630px] px-[15px]">
      <div className="container mx-auto  py-12">
        <div className="text-start space-y-2 px-4  ">
          {/* <h1
            className={` text-start  text-[1.375rem] text-flatBlue ${cursiveHeadingFont.className}`}
            style={{ marginTop: "1.25rem" }}
          >
            Newport Sailing Club
          </h1> */}
          <h2 className={`text-4xl ${mainHeadingFont.className}`}>Members</h2>
          {/* <DecoratorLine /> */}
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
