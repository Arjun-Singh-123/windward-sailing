"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Anchor } from "lucide-react";
import { supabase } from "@/lib/supabase";

// const specificationData = [
//   {
//     title: "General Dimensions",
//     specs: [
//       { name: "Length Overall", value: "44' 5\"" },
//       { name: "Length of Hull", value: "43' 3\"" },
//       { name: "Length at Waterline", value: "38' 4\"" },
//       { name: "Beam", value: "13' 7\"" },
//       { name: "Distance from Waterline to Masthead", value: "63' 10\"" },
//     ],
//   },
//   {
//     title: "Wing Keel",
//     specs: [
//       { name: "Draft", value: "5' 0\"" },
//       { name: "Ballast", value: "8,200 lbs" },
//       { name: "Basic Weight", value: "24,500 lbs" },
//     ],
//   },
//   {
//     title: "Fin Keel",
//     specs: [
//       { name: "Draft", value: "6' 8\"" },
//       { name: "Ballast", value: "7,200 lbs" },
//       { name: "Basic Weight", value: "23,500 lbs" },
//     ],
//   },
// ];
function convertSpecificationData(data: any) {
  return Object.entries(data).map(([title, specs]) => ({
    title,
    specs: Array.isArray(specs) ? specs : [],
  }));
}
const SpecificationsSection = async () => {
  const [specificationData, setSpecificationData] = useState<any[]>([]);
  useEffect(() => {
    fetchVehicleAmenities();
  }, []);

  async function fetchVehicleAmenities() {
    console.log("in the fetchVehicle function");
    const { data, error } = await supabase
      .from("vehicle_details")
      .select("content")
      .eq("section_type", "specifications")
      .single();

    if (error) {
      console.error("Error fetching vehicle:", error);
    } else {
      // console.log("checking data in else", data.id);
      const convertedData = convertSpecificationData(data.content);

      setSpecificationData(convertedData);
    }
  }
  console.log("specification", specificationData);
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-[#1e40af]">Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specificationData?.map((section, index) => (
          <Card key={index} className="border-[#1e40af]">
            <CardHeader className="bg-[#1e40af] text-white">
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {section.specs.map((spec: any, specIndex: number) => (
                    <TableRow key={specIndex}>
                      <TableCell className="font-medium text-[#1e40af]">
                        {spec.name}
                      </TableCell>
                      <TableCell>{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const VesselOverview = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold text-[#00008b] mb-2">
              Windward 28' - EVENING STAR
            </h1>
            <div className="border-b-2 border-[#00008b] w-16 mb-4"></div>
            <p className="mb-4">
              The Windward 28' - EVENING STAR is a charming embodiment of
              maritime excellence, bringing together classic elegance and
              seafaring adventure. At 28 feet in length, this yacht offers an
              inviting blend of intimacy and exploration. Its sleek hull design
              ensures a steady and pleasurable journey, whether you're gliding
              through calm waters or embracing the exhilaration of the open sea.
            </p>
            <p className="mb-4">
              Stepping on board, you're welcomed into a world of sophistication.
              The interior is a testament to Windward Yachts' unwavering
              dedication to quality, with carefully chosen materials and
              meticulous craftsmanship that exude an ambiance of refined
              opulence. Plush seating, fine finishes, and attention to every
              detail underscore the brand's commitment to both comfort and
              style.
            </p>
            <p className="mb-4">
              Despite its modest size, the EVENING STAR comes equipped with a
              range of contemporary amenities. An efficiently designed galley is
              perfect for onboard dining, and the open deck invites you to soak
              up the sun and enjoy the sea breeze.
            </p>
            <p>
              This yacht is more than a vessel; it's an open invitation to a
              world of adventure. With its responsive controls and exceptional
              handling, the EVENING STAR promises an exhilarating ride suitable
              for seasoned sailors and newcomers alike.
            </p>
          </div>
          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="bg-[#00008b] text-white p-2 rounded">
                  Vessel Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">MFG.:</TableCell>
                      <TableCell>Windward</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Size:</TableCell>
                      <TableCell>28</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Auto Pilot:</TableCell>
                      <TableCell>no</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bimini:</TableCell>
                      <TableCell>no</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Bluetooth Stereo:
                      </TableCell>
                      <TableCell>yes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cabins:</TableCell>
                      <TableCell>2</TableCell>
                    </TableRow>
                    {/* Add more rows for other amenities */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const VirtualTour = () => {
  return (
    <div className="bg-[#f0f8ff] py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
          <Anchor className="mr-2" />
          Virtual Tour
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
            <div key={index} className="relative aspect-w-16 aspect-h-9">
              <img
                src={`/images/${img} `}
                alt={`Virtual tour image ${index + 1}`}
                // className="object-cover rounded-lg"
              />
              {/* <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                {img}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExteriorPhotos = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
          <Anchor className="mr-2" />
          Exterior Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "WINDWARD_28_EVENING_STAR1",
            "WINDWARD_28_EVENING_STAR2",
            "WINDWARD_28_EVENING_STAR3",
            "WINDWARD_28_EVENING_S",
          ].map((img, index) => (
            <div
              key={index}
              className="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                {img}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SpecificationsSection, VesselOverview, VirtualTour, ExteriorPhotos };

// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Anchor } from "lucide-react";

// const SpecificationsSection = () => {
//   return (
//     <div className="bg-[#f0f8ff] py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//           <Anchor className="mr-2" />
//           Specifications
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="bg-[#00bfff] text-white p-2 rounded">
//                 General Dimensions
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Length Overall:
//                     </TableCell>
//                     <TableCell>44' 5"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Length of Hull:
//                     </TableCell>
//                     <TableCell>43' 3"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Length at Waterline:
//                     </TableCell>
//                     <TableCell>38' 4"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Beam:</TableCell>
//                     <TableCell>13' 7"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       Distance from Waterline to Masthead:
//                     </TableCell>
//                     <TableCell>63' 10"</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="bg-[#00bfff] text-white p-2 rounded">
//                 Wing Keel
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">Draft:</TableCell>
//                     <TableCell>5' 0"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Ballast:</TableCell>
//                     <TableCell>8,200 lbs</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Basic Weight:</TableCell>
//                     <TableCell>24,500 lbs</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="bg-[#00bfff] text-white p-2 rounded">
//                 Fin Keel
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">Draft:</TableCell>
//                     <TableCell>6' 8"</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Ballast:</TableCell>
//                     <TableCell>7,200 lbs</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">Basic Weight:</TableCell>
//                     <TableCell>23,500 lbs</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           {/* Add more cards for other specification sections */}
//         </div>
//       </div>
//     </div>
//   );
// };

// const VesselOverview = () => {
//   return (
//     <div className="bg-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="lg:w-2/3">
//             <h1 className="text-4xl font-bold text-[#00008b] mb-2">
//               Windward 28' - EVENING STAR
//             </h1>
//             <div className="border-b-2 border-[#00008b] w-16 mb-4"></div>
//             <p className="mb-4">
//               The Windward 28' - EVENING STAR is a charming embodiment of
//               maritime excellence, bringing together classic elegance and
//               seafaring adventure. At 28 feet in length, this yacht offers an
//               inviting blend of intimacy and exploration. Its sleek hull design
//               ensures a steady and pleasurable journey, whether you're gliding
//               through calm waters or embracing the exhilaration of the open sea.
//             </p>
//             <p className="mb-4">
//               Stepping on board, you're welcomed into a world of sophistication.
//               The interior is a testament to Windward Yachts' unwavering
//               dedication to quality, with carefully chosen materials and
//               meticulous craftsmanship that exude an ambiance of refined
//               opulence. Plush seating, fine finishes, and attention to every
//               detail underscore the brand's commitment to both comfort and
//               style.
//             </p>
//             <p className="mb-4">
//               Despite its modest size, the EVENING STAR comes equipped with a
//               range of contemporary amenities. An efficiently designed galley is
//               perfect for onboard dining, and the open deck invites you to soak
//               up the sun and enjoy the sea breeze.
//             </p>
//             <p>
//               This yacht is more than a vessel; it's an open invitation to a
//               world of adventure. With its responsive controls and exceptional
//               handling, the EVENING STAR promises an exhilarating ride suitable
//               for seasoned sailors and newcomers alike.
//             </p>
//           </div>
//           <div className="lg:w-1/3">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="bg-[#00008b] text-white p-2 rounded">
//                   Vessel Amenities
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell className="font-medium">MFG.:</TableCell>
//                       <TableCell>Windward</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Size:</TableCell>
//                       <TableCell>28</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Auto Pilot:</TableCell>
//                       <TableCell>no</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Bimini:</TableCell>
//                       <TableCell>no</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">
//                         Bluetooth Stereo:
//                       </TableCell>
//                       <TableCell>yes</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Cabins:</TableCell>
//                       <TableCell>2</TableCell>
//                     </TableRow>
//                     {/* Add more rows for other amenities */}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const VirtualTour = () => {
//   return (
//     <div className="bg-[#f0f8ff] py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//           <Anchor className="mr-2" />
//           Virtual Tour
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
//             <div key={index} className="relative aspect-w-16 aspect-h-9">
//               <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                 {img}
//               </div>
//               <img
//                 src={`/images/${img}`}
//                 alt={`Virtual tour image ${index + 1}`}
//                 className="object-cover rounded-lg"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExteriorPhotos = () => {
//   return (
//     <div className="bg-white py-8">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-[#00008b] mb-6 flex items-center">
//           <Anchor className="mr-2" />
//           Exterior Photos
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {["d.jpg", "e.jpg", "f.jpeg", "c.jpg"].map((img, index) => (
//             <div
//               key={index}
//               className="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"
//             >
//               <img
//                 src={`/images/${img}`}
//                 alt={`Virtual tour image ${index + 1}`}
//                 className="object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 flex items-center justify-center text-gray-500">
//                 {img}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export { SpecificationsSection, VesselOverview, VirtualTour, ExteriorPhotos };
