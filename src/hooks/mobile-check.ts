// import { useState, useEffect } from "react";
// type MobileCheckResult = {
//   isMobile: boolean;
// };
// const useMobileCheck = (): MobileCheckResult => {
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   useEffect(() => {
//     // Check if window is defined
//     if (typeof window !== "undefined") {
//       const handleResize = () => {
//         setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
//       };

//       handleResize(); // Set the initial state

//       window.addEventListener("resize", handleResize);

//       // Cleanup on unmount
//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   return isMobile;
// };

// export default useMobileCheck;
import { useState, useEffect } from "react";

type MobileCheckResult = {
  isMobile: boolean;
};

const useMobileCheck = (): MobileCheckResult => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
      };

      handleResize(); // Set the initial state

      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { isMobile };
};

export default useMobileCheck;
