import React from "react";

interface ToJoinProps {
  text?: string;
  className?: string;
}

export default function ToJoin({
  text = "To Join",
  className = "",
}: ToJoinProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="bg-slate-900 text-white py-2 px-4 font-bold relative z-10">
        {text}
      </div>
      <div className="absolute top-0 right-0 h-full w-4 bg-slate-900 transform skew-x-[20deg] origin-top-left z-0"></div>
    </div>
  );
}

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function MembershipSection() {
//   return (
//     <div className="bg-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         <Card className="max-w-2xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">
//               Become a Windward Sailing Club Member
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-center mb-6">
//               Join our community and enjoy exclusive sailing opportunities.
//               Don't hesitate to contact us for more information.
//             </p>
//             <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//               <ToJoin />
//               <div>
//                 <p className="font-semibold">One-Time Initial Fee</p>
//                 <p className="text-2xl font-bold">$500</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
