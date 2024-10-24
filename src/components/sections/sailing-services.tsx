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
    description:
      "Renting a Duffy boat in Newport Beach Bay offers a relaxing and enjoyable way to explore the scenic waterfront. These electric boats glide smoothly across the calm waters, allowing you to take in the beauty of the surrounding homes, yachts, and nature at your own pace. Enjoy a tranquil experience as you cruise past charming waterfront homes, harbors, and the iconic Balboa Island. Whether you're with friends, family, work team building or on a romantic outing, a Duffy boat provides a cozy and intimate setting to enjoy a picnic, sip on drinks, and soak in the sunset over the bay. The ease of operation makes it accessible for all, adding to the carefree enjoyment of Newport Beach’s coastal charm.",
  },
  {
    title: "Your Cruise — With our Captain at the Helm ",
    description:
      "As soon as you board, you can customize your sailing charter to suit your preferences. One option is to swim, snorkel, and unwind on a Catalina. Alternatively, you can use Windward's vessels to entertain clients, mark special occasions, amuse your family, and then have dinner at one of the many establishments that offer guest docking. Our fleet consists of a wide range of boats that can hold 6-8 passengers overnight and range in size from 28-44 feet.",
  },
];

export default function SailingServices() {
  return (
    <div className="    mx-auto px-4 py-8">
      <h1
        className={`text-4.5xl text-black font-bold text-center mb-8 ${cursiveHeadingFont.className}`}
      >
        Windward Sailing Club
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services?.map((service, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-lg border-2 border-black flex flex-col"
          >
            <div className="flex-grow p-6">
              <ToJoinHeader
                text={service.title}
                specification={true}
                membershipFee={false}
              />

              <p
                className={`mt-4 font-light tracking-[0.0625rem] text-[0.875rem] text-gray-600 ${contentFont.className}`}
              >
                {service.description}
              </p>
            </div>

            {service.description.split(" ").length > 3 && (
              <button className="bg-buttonGrd1 hover:bg-buttonGrd2 text-darkBlue text-xs font-bold py-1 px-2 rounded-full self-end m-6 mt-auto">
                LEARN MORE
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
