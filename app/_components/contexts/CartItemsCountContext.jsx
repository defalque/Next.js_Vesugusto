"use client";

import { createContext, useContext, useState } from "react";

const CartItemsCountContext = createContext();

function CartItemsCountProvider({ children, initialCount }) {
  const [count, setCount] = useState(initialCount);

  function increment() {
    setCount((c) => c + 1);
  }
  function decrement() {
    setCount((c) => Math.max(0, c - 1));
  }

  return (
    <CartItemsCountContext.Provider
      value={{ count, setCount, increment, decrement }}
    >
      {children}
    </CartItemsCountContext.Provider>
  );
}

function useCartItemsCount() {
  const context = useContext(CartItemsCountContext);
  if (context === undefined)
    throw new Error(
      "CartItemsCountContext was used outside of HideFiltersProvider"
    );
  return context;
}

export { CartItemsCountProvider, useCartItemsCount };
