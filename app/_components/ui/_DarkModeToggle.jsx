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
        <SunIcon className="text-primary-dark-900 hover:text-primary-dark-100 size-6"></SunIcon>
      ) : (
        <MoonIcon className="dark:text-primary-50 dark:hover:text-primary-950 size-6"></MoonIcon>
      )}
    </button>
  );
}

export default DarkModeToggle;
