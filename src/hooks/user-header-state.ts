"use client";

import { useState, useEffect } from "react";
import { DARK_HEADER_PATHS, SCROLL_THRESHOLD } from "../constants";

const calculateHeaderState = (pathname: string, scrollY: number) => ({
  isHidden: scrollY > SCROLL_THRESHOLD,
  isTransparent: pathname === "/" && scrollY <= SCROLL_THRESHOLD,
  isDark:
    DARK_HEADER_PATHS.includes(pathname as any) || scrollY > SCROLL_THRESHOLD,
});

export function useHeaderState(pathname: string) {
  const [state, setState] = useState(() => {
    const initialScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    return calculateHeaderState(pathname, 0);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Immediately update state on route change
    setState(calculateHeaderState(pathname, window.scrollY));

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setState({
        isHidden: isScrollingDown && currentScrollY > SCROLL_THRESHOLD,
        isTransparent: pathname === "/" && currentScrollY <= SCROLL_THRESHOLD,
        isDark:
          DARK_HEADER_PATHS.includes(pathname as any) ||
          currentScrollY > SCROLL_THRESHOLD,
      });

      lastScrollY = currentScrollY;
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return state;
}

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
