"use client";

import { createContext, useContext, useState } from "react";

const SelectedImageContext = createContext(null);

function SelectedImageContextProvider({ images, children }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex] || "";

  const value = {
    selectedIndex,
    setSelectedIndex,
    selectedImage,
  };

  return (
    <SelectedImageContext.Provider value={value}>
      {children}
    </SelectedImageContext.Provider>
  );
}

export default SelectedImageContextProvider;

export function useSelectedImage() {
  const context = useContext(SelectedImageContext);

  if (!context) {
    throw new Error(
      "useSelectedImage deve essere usato all'interno del suo provider!",
    );
  }

  return context;
}
