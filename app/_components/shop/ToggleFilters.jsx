"use client";

import { useShowFiltersContext } from "@/app/_contexts/ShowFiltersContext";

function ToggleFilters({ children }) {
  const { isOpen, setIsOpen } = useShowFiltersContext();

  return (
    <button
      type="button"
      aria-label={isOpen ? "Nascondi filtri" : "Mostra filtri"}
      aria-pressed={isOpen}
      aria-expanded={isOpen}
      aria-controls="filters"
      className="focus-style hidden cursor-pointer items-center justify-center gap-2 self-stretch rounded-xl px-2 py-1 text-base backdrop-blur-xs transition-colors duration-200 hover:bg-black/5 active:bg-black/5 lg:inline-flex dark:hover:dark:bg-white/10 dark:active:dark:bg-white/10"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{isOpen ? "Nascondi filtri" : "Mostra filtri"}</span>
      {children}
    </button>
  );
}

export default ToggleFilters;
