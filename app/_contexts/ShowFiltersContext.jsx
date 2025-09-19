"use client";

import { createContext, useContext, useState } from "react";

const ShowFiltersContext = createContext();

export function ShowFiltersProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ShowFiltersContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
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
