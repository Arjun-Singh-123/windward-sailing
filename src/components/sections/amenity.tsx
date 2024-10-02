import { cursiveHeadingFont, mainHeadingFont } from "@/app/ui/fonts";
import Image from "next/image";
import DecoratorLine from "../common/decorator-icon-line";

const LegendComponent = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <legend className="inline-block p-2 -top-8 left-16 md:left-[10.875rem] w-auto px-5 mb-0 ml-4 text-sm leading-normal text-white bg-darkBlue rounded-b-lg relative before:absolute before:top-0 before:left-[-10px] before:border-[5px] before:border-solid before:border-transparent before:border-r-[#8f8f8f] before:border-b-[#8f8f8f] after:absolute after:top-0 after:right-[-10px] after:border-[5px] after:border-solid after:border-transparent after:border-l-[#8f8f8f] after:border-b-[#8f8f8f]">
        {text}
      </legend>
    </div>
  );
};

const TableRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-2 border-b border-gray-400">
    <div className="py-1 px-2 font-semibold text-right">{label}:</div>
    <div className="py-1 px-2">{value}</div>
  </div>
);

export default function YachtDescription() {
  const amenities = [
    { label: "MFG.", value: "Catalina" },
    { label: "Auto Pilot", value: "no" },
    { label: "Bluetooth Stereo", value: "yes" },
    { label: "Cockpit Table", value: "no" },
    { label: "Dept/Knot", value: "no" },
    { label: "GPS", value: "no" },
    { label: "Ice Box", value: "no" },
    { label: "Marine Radio", value: "no" },
    { label: "Radar", value: "no" },
    { label: "Stove", value: "yes" },
    { label: "USB Charger", value: "yes" },
    { label: "Rolling Furling", value: "yes" },
    { label: "Max. Passangers", value: "10" },
    { label: "Engine Mfg.", value: "Universal" },
    { label: "Diesel Fuel", value: "21" },
    { label: "Waste Tank", value: "1 Tank" },
    { label: "Size", value: "30" },
    { label: "Bimini", value: "yes" },
    { label: "Cabins", value: "no" },
    { label: "Charge Station", value: "no" },
    { label: "Dodger", value: "no" },
    { label: "Head & Shower", value: "yes" },
    { label: "Microwave", value: "no" },
    { label: "Perch Seats", value: "no" },
    { label: "Salon Table Drop", value: "no" },
    { label: "Swim Strip", value: "no" },
    { label: "Windless", value: "no" },
    { label: "Sleeps", value: "4" },
    { label: "Year Manufactured", value: "1986" },
    { label: "Engine Size", value: "no" },
    { label: "Water Holding Tank", value: "43" },
  ];

  return (
    <section className="w-full p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="text-start space-y-2 mb-6">
              <h1
                className={`text-start text-xl text-flatBlue ${cursiveHeadingFont.className}`}
                style={{ marginTop: "1.25rem" }}
              >
                Windward Sailing Club
              </h1>
              <h2 className={`text-4xl ${mainHeadingFont.className}`}>
                Catalina 30' - SAND DOLLAR
              </h2>
              <DecoratorLine />
            </div>
            <p className="text-sm mb-4">
              The Catalina 30' - SAND DOLLAR is a distinguished vessel that
              beautifully marries style with seafaring serenity. With a length
              of 30 feet, this yacht provides an expansive platform for nautical
              exploration. Its well-crafted hull design guarantees a smooth and
              stable voyage, ensuring that every journey, whether a relaxing
              coastal cruise or an exciting offshore adventure, is characterized
              by ease and comfort.
            </p>
            <p className="text-sm mb-4">
              Upon boarding, you'll immediately appreciate the yacht's tasteful
              design. The interior is adorned with thoughtfully selected
              materials, fostering an atmosphere of refined comfort. Plush
              seating, exquisite finishes, and meticulous detailing underscore
              Catalina Yachts' dedication to both luxury and practicality.
            </p>
            <p className="text-sm mb-4">
              Despite its moderate size, SAND DOLLAR is equipped with a host of
              contemporary amenities. A well-appointed galley beckons for
              onboard dining, and the spacious deck invites you to unwind in the
              sun or under the starlit night sky.
            </p>
            <p className="text-sm">
              This yacht is more than a vessel; it's an invitation to seafaring
              tranquility. With responsive controls and impressive handling,
              SAND DOLLAR offers an idyllic voyage for both experienced sailors
              and those taking their first steps into the world of yachting.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="max-w-4xl mx-auto bg-sky p-6 rounded-lg shadow-lg relative">
              <LegendComponent text="Vessel Amenities" />
              <div className=" bg-sky rounded-lg overflow-hidden grid grid-cols-2 gap-4">
                <div>
                  {amenities.slice(0, 16).map((item, index) => (
                    <TableRow
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
                <div>
                  {amenities.slice(16).map((item, index) => (
                    <TableRow
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute md:-bottom-7 md:right-4 -bottom-6 -right-4 w-28 h-28 transform rotate-[335deg]">
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
        </div>
      </div>
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
