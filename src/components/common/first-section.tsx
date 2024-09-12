import React from "react";

const HeroSection1 = () => {
  return (
    <section className="relative w-full h-[400px] overflow-hidden   -top-20">
      <img
        src="/images/boat.jpeg"
        alt="Hero Image"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center"></h1>
      </div>
    </section>
  );
};

export default HeroSection1;
