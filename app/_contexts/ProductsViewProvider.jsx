"use client";

import { createContext, useContext, useState } from "react";

const ProductsViewContext = createContext();

export function ProductsViewProvider({ children }) {
  const [view, setView] = useState("grid");

  return (
    <ProductsViewContext.Provider value={{ view, setView }}>
      {children}
    </ProductsViewContext.Provider>
  );
}

export function useProductsView() {
  const context = useContext(ProductsViewContext);
  if (!context) {
    throw new Error(
      "useProductsView must be used within a ProductsViewProvider",
    );
  }
  return context;
}
