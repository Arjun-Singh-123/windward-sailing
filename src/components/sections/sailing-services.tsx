"use client";
import { contentFont, cursiveHeadingFont } from "@/app/ui/fonts";
import { ToJoinHeader } from "../common/to-join-header";

const services = [
  {
    title: "Captain Your Own Boat",
    description:
      "Experienced sailors can select any boat from our fleet. Our mechanics keep the boats in top condition. Members rent boats for a day cruise or a trip to Catalina or other coastal ports. We will help you with how docking works, where to go and good places at the destinations. Show up, load up and go. We take care of all the boat preparation.",
  },
  {
    title: "Learn To Be The Captain",
    description:
      "At Windward Sailing Club, You are the Captain! All it takes to sail our boats is the successful completion of our thorough, private, and individualized instructional program or on-the-water certification ride. Before you know it, you'll be captaining one of our vessels as if it were your own.",
  },
  {
    title: "Everyone can Captain a Duffy Boat",
    description: "Members",
  },
  {
    title: "Your Cruise — With our Captain at the Helm ",
    description:
      "As soon as you board, you can customize your sailing charter to suit your preferences. One option is to swim, snorkel, and unwind on a Catalina. Alternatively, you can use Windward's vessels to entertain clients, mark special occasions, amuse your family, and then have dinner at one of the many establishments that offer guest docking. Our fleet consists of a wide range of boats that can hold 6-8 passengers overnight and range in size from 28-44 feet.",
  },
];

export default function SailingServices() {
  return (
    <div className="  w-screen mx-auto px-4 py-8">
      <h1
        className={`text-4.5xl text-black font-bold text-center mb-8 ${cursiveHeadingFont.className}`}
      >
        Windward Sailing Club
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services?.map((service, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-lg border-2 border-black "
          >
            <div className="  p-6">
              <ToJoinHeader
                text={service.title}
                specification={true}
                membershipFee={false}
              />

              <p
                className={`mt-4 text-xs text-gray-600 ${contentFont.className}`}
              >
                {service.description}
              </p>

              {service.description.split(" ").length > 3 && (
                <button className="mt-4 bg-buttonGrd1 hover:bg-buttonGrd2 text-darkBlue text-xs font-bold py-1 px-2 rounded-full">
                  LEARN MORE
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
