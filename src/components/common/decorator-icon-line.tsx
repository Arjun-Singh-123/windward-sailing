import React from "react";

// const DecoratorLine = () => {
//   return (
//     <div className="flex items-center mb-2">
//       <img
//         src="/images/Logo-Icon.png"
//         alt="icon"
//         className="h-8 w-8 text-sky-500 mr-4"
//       />
//       <div
//         className="flex-grow border-t-2 border-black"
//         style={{ maxWidth: "40px" }}
//       ></div>
//     </div>
//   );
// };

// export default DecoratorLine;
// LineWithIcon.js
import Image from "next/image";

const DecoratorLine = ({ showLines = false }) => {
  return (
    <div
      className={`flex ${showLines && "justify-center"} items-center  
        mb-8 sm:mb-16 relative mt-1`}
    >
      {showLines && (
        <div
          className="flex-grow border-t-2 border-black mr-2 "
          style={{ maxWidth: "40px" }}
        ></div>
      )}
      <Image
        src="/images/Logo-Icon.png"
        alt="icon"
        width={32}
        height={32}
        className="text-sky-500 mr-4"
      />

      <div
        className="flex-grow border-t-2 border-black"
        style={{ maxWidth: "40px" }}
      ></div>
    </div>
  );
};

export default DecoratorLine;
