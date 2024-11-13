"use client";
import { cursiveHeadingFont, mainHeadingFont } from "@/app/ui/fonts";
import Image from "next/image";
import DecoratorLine from "../common/decorator-icon-line";

interface Amenity {
  feature: string;
  value: string;
}

interface AmenitiesDisplayProps {
  amenities: Amenity[];
}
const LegendComponent = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <legend className="inline-block p-2 -top-8 left-16 md:left-[10.875rem] w-auto px-5 mb-0 ml-4 text-sm leading-normal text-white bg-darkBlue rounded-b-lg relative before:absolute before:top-0 before:left-[-10px] before:border-[5px] before:border-solid before:border-transparent before:border-r-[#8f8f8f] before:border-b-[#8f8f8f] after:absolute after:top-0 after:right-[-10px] after:border-[5px] after:border-solid after:border-transparent after:border-l-[#8f8f8f] after:border-b-[#8f8f8f]">
        {text}
      </legend>
    </div>
  );
};

const AmenitiesDisplay: React.FC<AmenitiesDisplayProps> = ({ amenities }) => {
  return (
    <div className="  p-6 rounded-lg shadow-md">
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">Amenities</h2> */}
      <div className="columns-1 md:columns-2 space-y-4">
        {amenities?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b border-gray-400 last:border-b-0"
          >
            <span className="font-medium text-gray-700">{item.feature}</span>
            <span className="text-gray-600">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function YachtDescription({
  title,
  description,
  amenities,
}: any) {
  console.log("checking ameniteis", amenities);
  // const amenities = [
  //   { label: "MFG.", value: "Catalina" },
  //   { label: "Auto Pilot", value: "no" },
  //   { label: "Bluetooth Stereo", value: "yes" },
  //   { label: "Cockpit Table", value: "no" },
  //   { label: "Dept/Knot", value: "no" },
  //   { label: "GPS", value: "no" },
  //   { label: "Ice Box", value: "no" },
  //   { label: "Marine Radio", value: "no" },
  //   { label: "Radar", value: "no" },
  //   { label: "Stove", value: "yes" },
  //   { label: "USB Charger", value: "yes" },
  //   { label: "Rolling Furling", value: "yes" },
  //   { label: "Max. Passangers", value: "10" },
  //   { label: "Engine Mfg.", value: "Universal" },
  //   { label: "Diesel Fuel", value: "21" },
  //   { label: "Waste Tank", value: "1 Tank" },
  //   { label: "Size", value: "30" },
  //   { label: "Bimini", value: "yes" },
  //   { label: "Cabins", value: "no" },
  //   { label: "Charge Station", value: "no" },
  //   { label: "Dodger", value: "no" },
  //   { label: "Head & Shower", value: "yes" },
  //   { label: "Microwave", value: "no" },
  //   { label: "Perch Seats", value: "no" },
  //   { label: "Salon Table Drop", value: "no" },
  //   { label: "Swim Strip", value: "no" },
  //   { label: "Windless", value: "no" },
  //   { label: "Sleeps", value: "4" },
  //   { label: "Year Manufactured", value: "1986" },
  //   { label: "Engine Size", value: "no" },
  //   { label: "Water Holding Tank", value: "43" },
  // ];

  return (
    <section className="w-full p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-cols-fr">
          <div className={`${!amenities?.length && "md:col-span-2"}`}>
            <div className="text-start space-y-2 mb-6">
              <h1 className="text-start text-xl text-flatBlue">
                Windward Sailing Club
              </h1>
              <h2 className="text-4xl">{title}</h2>
              <DecoratorLine />
            </div>
            <p className="text-sm mb-4 whitespace-pre-line">{description}</p>
          </div>

          {/* Amenities Section - only renders if amenities exist */}
          {amenities?.length > 0 && (
            <div className="h-full">
              <div className="bg-sky p-6 pb-20 rounded-lg shadow-lg relative h-full">
                <LegendComponent text="Vessel Amenities" />
                <div className="bg-sky rounded-lg overflow-hidden gap-4">
                  <AmenitiesDisplay amenities={amenities} />
                </div>
                <div className="absolute md:-bottom-7 md:right-4 bottom-0 right-4 w-28 h-28 transform rotate-[335deg]">
                  <Image
                    src="/images/spec-boat-icon.png"
                    alt="Sailboat logo"
                    width={84}
                    height={84}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
