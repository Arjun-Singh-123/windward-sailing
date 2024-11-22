import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const useHeaderState = () => {
  const pathname = usePathname();

  const lastScrollY = useRef(0);
  const SCROLL_THRESHOLD = 50;

  const [state, setState] = useState({
    isHidden: false,
    isTransparent: true,
    hasPageSlider: false,
  });

  const checkSlider = useRef(() => {
    if (typeof window === "undefined") return false;
    return !!document.querySelector(".slider-section");
  });

  const handleScroll = useRef(() => {
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasSliderNow = checkSlider.current();

      setState((prev) => {
        const newTransparent =
          hasSliderNow && currentScrollY <= SCROLL_THRESHOLD;
        const newHidden = isScrollingDown && currentScrollY > SCROLL_THRESHOLD;

        if (
          prev.isTransparent === newTransparent &&
          prev.isHidden === newHidden &&
          prev.hasPageSlider === hasSliderNow
        ) {
          return prev;
        }

        return {
          isHidden: newHidden,
          isTransparent: newTransparent,
          hasPageSlider: hasSliderNow,
        };
      });

      lastScrollY.current = currentScrollY;
    });
  }).current;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSlider = checkSlider.current();
    setState({
      isHidden: false,
      isTransparent: hasSlider && window.scrollY <= SCROLL_THRESHOLD,
      hasPageSlider: hasSlider,
    });

    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [pathname]);

  return state;
};
// import { useState, useEffect } from "react";
// import { DARK_HEADER_PATHS, SCROLL_THRESHOLD } from "../constants";

// const calculateHeaderState = (pathname: string, scrollY: number) => ({
//   isHidden: scrollY > SCROLL_THRESHOLD,
//   isTransparent: pathname === "/" && scrollY <= SCROLL_THRESHOLD,
//   isDark:
//     DARK_HEADER_PATHS.includes(pathname as any) || scrollY > SCROLL_THRESHOLD,
// });

// export function useHeaderState(pathname: string) {
//   const [state, setState] = useState(() => {
//     const initialScrollY = typeof window !== "undefined" ? window.scrollY : 0;
//     return calculateHeaderState(pathname, 0);
//   });

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     // Immediately update state on route change
//     setState(calculateHeaderState(pathname, window.scrollY));

//     let lastScrollY = window.scrollY;
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const isScrollingDown = currentScrollY > lastScrollY;

//       setState({
//         isHidden: isScrollingDown && currentScrollY > SCROLL_THRESHOLD,
//         isTransparent: pathname === "/" && currentScrollY <= SCROLL_THRESHOLD,
//         isDark:
//           DARK_HEADER_PATHS.includes(pathname as any) ||
//           currentScrollY > SCROLL_THRESHOLD,
//       });

//       lastScrollY = currentScrollY;
//     };

//     // Initial check
//     handleScroll();

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [pathname]);

//   return state;
// }

// export function useHeaderState(pathname: string) {
//   const [state, setState] = useState<HeaderState>({
//     isHidden: false,
//     isTransparent: pathname === "/",
//     isDark: DARK_HEADER_PATHS.includes(pathname),
//   });

//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const isScrollingDown = currentScrollY > lastScrollY;
//       const hasScrolledPastThreshold = currentScrollY > SCROLL_THRESHOLD;

//       setState((prev) => ({
//         isHidden: isScrollingDown && hasScrolledPastThreshold,
//         isTransparent: pathname === "/" && !hasScrolledPastThreshold,
//         isDark:
//           DARK_HEADER_PATHS.includes(pathname) || hasScrolledPastThreshold,
//       }));

//       lastScrollY = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [pathname]);

//   return state;
// }
