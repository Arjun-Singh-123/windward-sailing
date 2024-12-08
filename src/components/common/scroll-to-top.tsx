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
import { ArrowUp, ChevronUp } from "lucide-react";
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
    <button
      className={`fixed z-10 bottom-10 right-10 bg-gray-800 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
