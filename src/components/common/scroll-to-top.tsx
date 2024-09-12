// "use client";

// import { useState, useEffect } from "react";
// import { BedIcon, ChevronUp } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function ScrollToTop() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);

//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   if (!isVisible) return null;

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       className="fixed   bottom-14 right-14 rounded-full shadow-lg"
//       onClick={scrollToTop}
//       aria-label="Scroll to top"
//     >
//       <ChevronUp className=" rounded-full h-14 w-14 bg-black text-white " />{" "}
//     </Button>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-14 right-14 rounded-full shadow-lg bg-black text-white hover:bg-gray-800 hover:text-yellow-300 transition duration-300 ease-in-out"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-8 w-8" />
    </Button>
  );
}
