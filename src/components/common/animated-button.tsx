import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AnimatedButton = ({ href, children }: any) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className=" 
        relative 
        overflow-hidden 
        rounded-full
        border-2 
        border-black 
        hover:bg-darkBlue
          
        px-8 
        py-3 
        text-lg 
        font-medium
        transition-all
        duration-700
        ease-in-out
        group
      "
    >
      <span
        className="
        absolute 
        top-0 
        left-0 
        h-0 
        w-full 
        bg-black 
        transition-all 
        duration-500 
        ease-in-out
        group-hover:h-full
     
       
        -z-10
      "
      />

      <span className="relative block">
        <span
          className="
          block 
          transform 
          translate-y-0 
          transition-all 
          duration-500 
          ease-in-out
          group-hover:-translate-y-full 
          group-hover:opacity-0
        "
        >
          <Link href={href}>{children}</Link>
        </span>

        <span
          className="
          absolute 
          top-0 
          left-0 
          h-full 
          w-full 
          transform 
           
          -translate-y-full 
          text-white
          transition-all 
          duration-500 
          ease-in-out
          group-hover:translate-y-0
        "
        >
          <Link href={href}>{children}</Link>
        </span>
      </span>
    </Button>
  );
};

export default AnimatedButton;

// <AnimatedButton href="/url">Stay in the loop</AnimatedButton>
