import React from "react";

const LegendComponent = ({ text }: { text: string }) => {
  return (
    <div className="legend-container -top-2     ">
      <legend className="absolute styled-legend -mt-16 whitespace-nowrap">
        {text}
      </legend>
    </div>
  );
};

export default LegendComponent;
