import { useState, useEffect, RefObject } from "react";

export const useResizeObserver = (targetRef: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    const obs = new ResizeObserver((e) => {
      setWidth(e[0].contentRect.width);
      setHeight(e[0].contentRect.height);
    });
    if (targetRef.current) {
      obs.observe(targetRef.current);
    }
    return () => {
      obs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { width, height };
};
