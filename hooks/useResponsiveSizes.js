import { useState, useEffect } from "react";

const useResponsiveSizes = (breakpoints) => {
  const [size, setSize] = useState({
    width: window?.innerWidth || 0,
    height: window?.innerHeigh || 0,
  });

  const handleResize = () => {
    setSize({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  };

  useEffect(() => {
    window?.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to return width/height based on input breakpoints
  const getResponsiveSize = () => {
    const currentWidth = size.width;
    for (let i = 0; i < breakpoints.length; i++) {
      const { minWidth, maxWidth, width, height } = breakpoints[i];
      if (currentWidth >= minWidth && currentWidth < maxWidth) {
        return { width, height };
      }
    }
    // Fallback: if no specific breakpoint matches, return default or last defined size
    return breakpoints[breakpoints.length - 1];
  };

  return getResponsiveSize();
};

export default useResponsiveSizes;
