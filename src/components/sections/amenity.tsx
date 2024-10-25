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

// const TableRow = ({ label, value }: { label: string; value: string }) => (
//   <div className="columns-1   md:columns-2 border-b border-gray-400">
//     <div className="py-1 px-2 font-semibold text-right">{label}:</div>
//     <div className="py-1 px-2">{value}</div>
//   </div>
// );

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

// const AmenitiesDisplay: React.FC<AmenitiesDisplayProps> = ({ amenities }) => {
//   const midpoint = Math.ceil(amenities.length / 2);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Amenities</h2>
//       <div className="md:columns-2 gap-8">
//         <div className="mb-6 md:mb-0">
//           {amenities.slice(0, midpoint).map((item, index) => (
//             <div
//               key={index}
//               className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
//             >
//               <span className="font-medium text-gray-700">{item.label}</span>
//               <span className="text-gray-600">{item.value}</span>
//             </div>
//           ))}
//         </div>
//         <div className="md:mt-0">
//           {amenities.slice(midpoint).map((item, index) => (
//             <div
//               key={index + midpoint}
//               className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
//             >
//               <span className="font-medium text-gray-700">{item.label}</span>
//               <span className="text-gray-600">{item.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

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

      {/* <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className={` ${amenities.length > 0 ? "w-full" : "md:w-1/2"} `}>
            <div className="text-start space-y-2 mb-6">
              <h1
                className={`text-start text-xl text-flatBlue ${cursiveHeadingFont.className}`}
                style={{ marginTop: "1.25rem" }}
              >
                Windward Sailing Club
              </h1>
              <h2 className={`text-4xl ${mainHeadingFont.className}`}>
                {title}
              </h2>
              <DecoratorLine />
            </div>
            <p className="text-sm mb-4  whitespace-pre-line">{description}</p>
            
          </div>
          {amenities && amenities.length > 0 && (
            <div className="md:w-1/2">
              <div className="max-w-4xl h-auto mx-auto bg-sky p-6 pb-20 rounded-lg shadow-lg relative">
                <LegendComponent text="Vessel Amenities" />
                <div className="bg-sky rounded-lg overflow-hidden gap-4">
                  <div>{<AmenitiesDisplay amenities={amenities} />} </div>
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
      </div> */}
    </section>
  );
}

// import Image from "next/image";
// import LegendComponent from "../common/left-triangle";

// const LegendComponent = ({ text }: { text: string }) => (
//   <div className="relative">
//     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-navy-800 text-white px-4 py-1 text-lg font-bold rounded-t-lg">
//       {text}
//     </div>
//   </div>
// );

// const LegendComponent = ({ text }: { text: string }) => {
//   return (
//     <div className="relative inline-block">
//       <legend className="inline-block p-2 -top- left-16 w-auto px-5 mb-0 ml-4 text-sm leading-normal text-white bg-darkBlue rounded-b-lg relative before:absolute before:top-0 before:left-[-10px] before:border-[5px] before:border-solid before:border-transparent before:border-r-[#8f8f8f] before:border-b-[#8f8f8f]">
//         {text}
//       </legend>
//     </div>
//   );
// };

// const LegendComponent = ({ text }: { text: string }) => {
//   return (
//     <div className="relative inline-block">
//       <legend
//         className="inline-block p-2 -top-8 left-16 md:left-[21.875rem] w-auto px-5 mb-0 ml-4 text-sm leading-normal text-white bg-darkBlue rounded-b-lg relative before:absolute before:top-0 before:left-[-10px] before:border-[5px] before:border-solid before:border-transparent before:border-r-[#8f8f8f] before:border-b-[#8f8f8f] after:absolute after:top-0 after:right-[-10px] after:border-[5px] after:border-solid after:border-transparent after:border-l-[#8f8f8f]
//        after:border-b-[#8f8f8f]"
//       >
//         {text}
//       </legend>
//     </div>
//   );
// };

// const TableRow = ({ label, value }: { label: string; value: string }) => (
//   <div className="grid grid-cols-2 border-b border-gray-400">
//     <div className="py-1 px-2 font-semibold text-right">{label}:</div>
//     <div className="py-1 px-2">{value}</div>
//   </div>
// );

// export default function VesselAmenities() {
//   const amenities = [
//     { label: "MFG.", value: "Catalina" },
//     { label: "Auto Pilot", value: "no" },
//     { label: "Bluetooth Stereo", value: "yes" },
//     { label: "Cockpit Table", value: "no" },
//     { label: "Dept/Knot", value: "no" },
//     { label: "GPS", value: "no" },
//     { label: "Ice Box", value: "no" },
//     { label: "Marine Radio", value: "no" },
//     { label: "Radar", value: "no" },
//     { label: "Stove", value: "yes" },
//     { label: "USB Charger", value: "yes" },
//     { label: "Rolling Furling", value: "yes" },
//     { label: "Max. Passangers", value: "10" },
//     { label: "Engine Mfg.", value: "Universal" },
//     { label: "Diesel Fuel", value: "21" },
//     { label: "Waste Tank", value: "1 Tank" },
//     { label: "Size", value: "30" },
//     { label: "Bimini", value: "yes" },
//     { label: "Cabins", value: "no" },
//     { label: "Charge Station", value: "no" },
//     { label: "Dodger", value: "no" },
//     { label: "Head & Shower", value: "yes" },
//     { label: "Microwave", value: "no" },
//     { label: "Perch Seats", value: "no" },
//     { label: "Salon Table Drop", value: "no" },
//     { label: "Swim Strip", value: "no" },
//     { label: "Windless", value: "no" },
//     { label: "Sleeps", value: "4" },
//     { label: "Year Manufactured", value: "1986" },
//     { label: "Engine Size", value: "no" },
//     { label: "Water Holding Tank", value: "43" },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto bg-sky p-6 rounded-lg shadow-lg relative">
//       <LegendComponent text="Vessel Amenities" />
//       <div className="mt-6 bg-sky rounded-lg overflow-hidden grid grid-cols-2 gap-4">
//         <div>
//           {amenities.slice(0, 16).map((item, index) => (
//             <TableRow key={index} label={item.label} value={item.value} />
//           ))}
//         </div>
//         <div>
//           {amenities.slice(16).map((item, index) => (
//             <TableRow key={index} label={item.label} value={item.value} />
//           ))}
//         </div>
//       </div>
//       <div className="absolute  bottom-4 right-4 w-28 h-28 transform rotate-[335deg]">
//         <Image
//           src="/images/spec-boat-icon.png?height=64&width=64"
//           alt="Sailboat logo"
//           width={64}
//           height={64}
//           className="rounded-full"
//         />
//       </div>
//     </div>
//   );
// }
