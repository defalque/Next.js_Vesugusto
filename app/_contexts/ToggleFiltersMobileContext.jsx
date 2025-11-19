"use client";

import { createContext, useContext, useState } from "react";

const ToggleFiltersMobileContext = createContext();

export function ToggleFiltersMobileProvider({ children }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <ToggleFiltersMobileContext.Provider
      value={{
        isOpenMobile,
        setIsOpenMobile,
      }}
    >
      {children}
    </ToggleFiltersMobileContext.Provider>
  );
}

export function useToggleFiltersMobileContext() {
  const context = useContext(ToggleFiltersMobileContext);
  if (!context) {
    throw new Error(
      "useToggleFiltersMobileContext must be used within a ToggleFiltersMobileProvider",
    );
  }
  return context;
}
