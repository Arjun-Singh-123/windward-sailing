import Detail from "@/components/common/details";

const description =
  " At Windward Sailing Club, we pride ourselves on providing exceptional sailing experience for all our members and guests.Our commitment to excellence is reflected in every aspect of our operations, from our meticulously maintained vessels to our professional and attentive staff.";

export default function AboutUsA() {
  return (
    <>
      <Detail
        title="About Us"
        heading=" Windward Sailing Club"
        description={description}
        mediaUrl="/images/about.jpg"
      />
    </>
  );
}
// import { Card, CardContent } from "@/components/ui/card";
// import { Compass } from "lucide-react";

// export default function AboutUs() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="flex items-center mb-8">
//         <Compass className="h-8 w-8 text-sky-500 mr-4" />
//         <h1 className="text-4xl font-bold text-sky-800 font-great-vibes">
//           Windward Sailing Club
//         </h1>
//         <div className="ml-4 flex-grow border-t-2 border-sky-300 border-dashed"></div>
//       </div>
//       <h2 className="text-3xl font-semibold text-sky-700 mb-6">About Us</h2>
//       <Card className="overflow-hidden">
//         <CardContent className="p-0">
//           <div className="flex flex-col md:flex-row">
//             <div className="md:w-1/2 p-8">
//               <p className="mb-4">
//                 You and your guests will appreciate the attention to detail our
//                 professional maintenance crew gives each vessel. The yachts we
//                 offer are clean and beautifully appointed.
//               </p>
//               <p>
//                 At Windward Sailing Club, we're dedicated to providing an
//                 exceptional sailing experience for all our members. Whether
//                 you're a seasoned sailor or just starting out, our club offers
//                 the perfect environment to enjoy the beauty of the open water.
//               </p>
//             </div>
//             <div className="md:w-1/2">
//               <img
//                 src="/placeholder.svg?height=689&width=460"
//                 alt="Sailing at Windward Sailing Club"
//                 className="w-full h-full object-cover rounded-r-lg"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
