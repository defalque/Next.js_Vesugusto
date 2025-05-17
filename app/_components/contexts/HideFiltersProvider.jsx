"use client";

import { createContext, useContext, useState } from "react";

const HideFiltersContext = createContext();

function HideFiltersProvider({ children }) {
  // Impostiamo un valore di default (false), poi lo aggiorneremo con matchMedia nel client
  const [isHidden, setIsHidden] = useState(false);

  return (
    <HideFiltersContext.Provider value={{ isHidden, setIsHidden }}>
      {children}
    </HideFiltersContext.Provider>
  );
}

function useHideFilters() {
  const context = useContext(HideFiltersContext);
  if (context === undefined)
    throw new Error(
      "HideFiltersContext was used outside of HideFiltersProvider"
    );
  return context;
}

export { HideFiltersProvider, useHideFilters };
