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
