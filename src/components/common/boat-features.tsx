// "use client";
// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

import { DotIcon } from "lucide-react";

// interface BoatFeaturesProps {
//   features: string[]
// }
const features = [
  "Inboard Engines",
  "VHF Radio",
  "Blue-tooth Stereo",
  "Showers",
  "Ice Box",
  "Stoves",
  "Compass",
  "Bow Anchor",
  "Radar/Chart Plotters",
  "Roller Furling Headsails",
  "Biminis/Dodgers",
  "Auto Pilot",
];

export default function BoatFeatures() {
  //   const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* <h3 className="text-2xl font-bold mb-4">Boat Features</h3> */}

      {/* Desktop view */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="  flex  p-3 rounded-lg shadow-sm">
            <DotIcon />
            <span> {feature}</span>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      {/* <div className="sm:hidden">
        <button
          className="flex items-center justify-between w-full bg-gray-200 p-3 rounded-lg mb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="font-semibold">View Features</span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {isExpanded && (
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                {feature}
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
}
