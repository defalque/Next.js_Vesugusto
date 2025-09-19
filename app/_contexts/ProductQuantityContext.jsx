"use client";

import { createContext, useContext, useState } from "react";

const ProductQuantityContext = createContext();

function ProductQuantityProvider({ children }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <ProductQuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </ProductQuantityContext.Provider>
  );
}

function useProductQuantity() {
  const context = useContext(ProductQuantityContext);
  if (context === undefined)
    throw new Error(
      "ProductQuantityContext was used outside of ProductQuantityProvider",
    );
  return context;
}

export { ProductQuantityProvider, useProductQuantity };
