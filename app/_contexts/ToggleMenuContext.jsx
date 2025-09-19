"use client";

import { createContext, useContext, useState } from "react";

const ToggleMenuContext = createContext();

export function ToggleMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ToggleMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ToggleMenuContext.Provider>
  );
}

export function useToggleMenuContext() {
  const context = useContext(ToggleMenuContext);
  if (!context) {
    throw new Error(
      "useToggleMenuContext must be used within a ToggleMenuProvider",
    );
  }
  return context;
}
