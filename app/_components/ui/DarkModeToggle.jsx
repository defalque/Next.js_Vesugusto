"use client";

import { useDarkMode } from "../contexts/DarkModeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="cursor-pointer"
    >
      {isDarkMode ? (
        <SunIcon className="size-6 text-orange-950 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"></SunIcon>
      ) : (
        <MoonIcon className="size-6 text-orange-950 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"></MoonIcon>
      )}
    </button>
  );
}

export default DarkModeToggle;
