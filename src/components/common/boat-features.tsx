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
  return (
    <div className="w-full   ">
      <div className=" columns-1 md:columns-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="  flex  p-3 rounded-lg   ">
            <DotIcon />
            <span> {feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
