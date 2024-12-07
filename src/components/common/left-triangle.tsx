import React from "react";

const LegendComponent = ({ text }: { text: string }) => {
  return (
    <div className="legend-container relative">
      <legend className="absolute styled-legend post-10 whitespace-nowrap">
        {text}
      </legend>
    </div>
  );
};

export default LegendComponent;
