"use client";
import { mainHeadingFont } from "@/app/ui/fonts";
import React, { useEffect, useRef, useState } from "react";

export const ToJoinHeader = ({
  text,
  membershipFee,
  specification,
}: {
  text: string;
  membershipFee?: boolean;
  specification?: boolean;
}) => {
  const divRef = useRef<HTMLHeadingElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(40);
  const [isHovered, setIsHovered] = useState(false);

  const displayText = (text: string) => {
    const words = text.split(" ");
    return words.length <= 7 ? text : words.slice(0, 7).join(" ") + "...";
  };

  return (
    <div
      className={`relative   overflow-visible ${specification && "-left-10"} ${
        membershipFee && "-left-6"
      }`}
      ref={divRef}
    >
      <h3
        className={`${mainHeadingFont.className} relative   inline-block bg-[#00A3E0] text-white py-2 px-2 font-bold
                       before:content-[''] before:absolute before:bottom-[-14px] before:left-0 before:border-[7px]
                      before:z-10 before:border-t-black before:border-r-black before:border-b-transparent before:border-l-transparent
                       after:content-[''] after:absolute after:top-0 after:right-[-40px] after:border-[20px]
                       after:border-t-transparent after:border-b-transparent after:border-r-transparent  after:border-l-[#00A3E0] after:z-10`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className=" text-[1rem]">{displayText(text)}</span>
        {/* <span className="whitespace-nowrap ">{text}</span> */}
      </h3>

      {isHovered && text.split(" ").length >= 7 && (
        <div className="absolute bg-white text-black p-2 rounded shadow-lg z-20">
          {text}
        </div>
      )}
    </div>
  );
};
