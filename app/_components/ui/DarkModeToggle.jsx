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
        <SunIcon className="size-6 text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"></SunIcon>
      ) : (
        <MoonIcon className="size-6 text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"></MoonIcon>
      )}
    </button>
  );
}

export default DarkModeToggle;
