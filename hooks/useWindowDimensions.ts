// credit https://stackoverflow.com/a/36862446

import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { visualViewport: width, innerHeight: height } = typeof window !== 'undefined' ? window : global;
    return {
      width,
      height
    }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      global.addEventListener('resize', handleResize);
      return () => global.removeEventListener('resize', handleResize);
    }

  }, []);

  return windowDimensions;
}