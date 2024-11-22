import { useRef, useState, useEffect } from "react";

interface InfiniteScrollOptions {
  speed?: number;
}

interface InfiniteScrollReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  offset: number;
}

// /**
//  * Custom hook for creating an infinite horizontal scroll effect
//  * @param options Configuration options for the scroll behavior
//  * @returns Object containing containerRef and current offset
//  */
const useInfiniteScroll = (
  options: InfiniteScrollOptions = {}
): InfiniteScrollReturn => {
  const { speed = 50 } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.scrollWidth;
    const viewportWidth = container.offsetWidth;

    let lastTime: number | null = null;
    let animationFrameId: number;

    const animate = (time: number) => {
      if (lastTime === null) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;

      setOffset((prevOffset) => {
        let newOffset = prevOffset + (speed * delta) / 1000;

        if (newOffset >= totalWidth / 2) {
          newOffset -= totalWidth / 2;
        }
        return newOffset;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return { containerRef, offset };
};

export default useInfiniteScroll;
