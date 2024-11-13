"use client";

import React from "react";

interface KeyValuePair {
  name: string;
  value: string | number;
}

interface KeyValueGridProps {
  title: string;
  data: KeyValuePair[];
  maxHeight?: string;
  columns?: number;
}

const KeyValueGrid: React.FC<KeyValueGridProps> = ({
  title,
  data,
  maxHeight = "400px",
  columns = 2,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-[#1e40af] text-white p-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className={`p-4 overflow-auto`} style={{ maxHeight: maxHeight }}>
        <div
          className={`grid gap-4`}
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridAutoFlow: "column",
            gridTemplateRows: `repeat(${Math.ceil(
              data.length / columns
            )}, auto)`,
          }}
        >
          {data?.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="font-medium text-[#1e40af]">{item.name}:</span>
              <span className="text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyValueGrid;
