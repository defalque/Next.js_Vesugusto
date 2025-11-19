"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ShowFiltersContext = createContext();

export function ShowFiltersProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const showFiltersContextValue = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen],
  );

  return (
    <ShowFiltersContext.Provider value={showFiltersContextValue}>
      {children}
    </ShowFiltersContext.Provider>
  );
}

export function useShowFiltersContext() {
  const context = useContext(ShowFiltersContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a ShowFiltersProvider",
    );
  }
  return context;
}
