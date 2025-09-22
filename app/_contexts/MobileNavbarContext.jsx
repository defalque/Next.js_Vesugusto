"use client";

import { createContext, useContext, useState } from "react";

const MobileNavbarContext = createContext();

export function MobileNavbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileNavbarContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </MobileNavbarContext.Provider>
  );
}

export function useMobileNavbarContext() {
  const context = useContext(MobileNavbarContext);
  if (!context) {
    throw new Error(
      "useMobileNavbarContext must be used within a MobileNavbarProvider",
    );
  }
  return context;
}
