import { useState, useEffect, useRef } from "react";
import { DARK_HEADER_PATHS, SCROLL_THRESHOLD } from "../constants";

const calculateHeaderState = (
  pathname: string,
  scrollY: number,
  hasSliderNow: boolean
) => {
  return {
    isHidden: scrollY > SCROLL_THRESHOLD,
    isTransparent: hasSliderNow && scrollY <= SCROLL_THRESHOLD,
    isDark:
      DARK_HEADER_PATHS.includes(pathname as any) || scrollY > SCROLL_THRESHOLD,
  };
};

export function useHeaderState(pathname: string) {
  const [state, setState] = useState(() => {
    const initialScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    return calculateHeaderState(pathname, initialScrollY, true);
  });

  const hasSliderRef = useRef(false);

  console.log(state);

  useEffect(() => {
    if (typeof window === "undefined" && typeof document === "undefined")
      return;

    hasSliderRef.current =
      typeof document !== "undefined" &&
      !!document.querySelector(".slider-section");

    setState(
      calculateHeaderState(pathname, window.scrollY, hasSliderRef.current)
    );

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setState({
        isHidden: isScrollingDown && currentScrollY > SCROLL_THRESHOLD,
        isTransparent:
          hasSliderRef.current && currentScrollY <= SCROLL_THRESHOLD,
        isDark:
          DARK_HEADER_PATHS.includes(pathname as any) ||
          currentScrollY > SCROLL_THRESHOLD,
      });

      lastScrollY = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return state;
}
