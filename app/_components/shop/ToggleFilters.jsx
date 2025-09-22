"use client";

import { useShowFiltersContext } from "@/app/_contexts/ShowFiltersContext";

function ToggleFilters({ children }) {
  const { isOpen, setIsOpen } = useShowFiltersContext();

  return (
    <>
      <button
        className="focus hidden cursor-pointer items-center justify-center gap-2 self-stretch rounded-xl bg-white/80 px-2 py-1 text-base backdrop-blur-xs transition-colors duration-200 hover:bg-gray-200/80 active:bg-gray-200/80 lg:inline-flex dark:bg-black/80 dark:hover:dark:bg-zinc-700/50 dark:active:dark:bg-zinc-700/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-pressed={isOpen}
        aria-label={isOpen ? "Nascondi filtri" : "Mostra filtri"}
      >
        <span>{isOpen ? "Nascondi filtri" : "Mostra filtri"}</span>
        {children}
      </button>
    </>
  );
}

export default ToggleFilters;
