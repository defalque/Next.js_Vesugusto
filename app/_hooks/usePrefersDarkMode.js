"use client";

import { useEffect, useState } from "react";

export default function usePrefersDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial value
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (event) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDarkMode;
}
