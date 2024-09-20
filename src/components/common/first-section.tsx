// import React from "react";

import Image from "next/image";

// const HeroSection1 = () => {
//   return (
//     <section className="relative w-full h-screen overflow-hidden   -top-20">
//       <img
//         src="/images/boat.jpeg"
//         alt="Hero Image"
//         className="object-cover w-full h-full"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
//       <div className="absolute inset-0 flex items-center justify-center text-white z-10">
//         <h1 className="text-4xl md:text-6xl font-bold text-center"></h1>
//       </div>
//     </section>
//   );
// };

// export default HeroSection1;
const HeroSection1 = () => {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-0 overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full">
        <section className="relative  w-full h-[40vh] sm:h-[50vh]  md:h-screen">
          <Image
            src="/images/hero-image.jpg"
            alt="Hero Image"
            // layout="fill"
            objectFit="cover"
            height={643}
            width={1500}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white z-10 p-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center">
              Your Heading Here
            </h1>
          </div>
        </section>
      </main>
    </div>

    // <section className="relative w-full h-screen  ">
    //   <img
    //     src="/images/hero-image.jpg"
    //     alt="Hero Image"
    //     className="object-cover w-full h-full"
    //   />
    //   <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
    //   <div className="absolute inset-0 flex items-center justify-center text-white z-10 p-4">
    //     <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center">
    //       {/* Your Heading Here */}
    //     </h1>
    //   </div>
    // </section>
  );
};

export default HeroSection1;
