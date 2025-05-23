"use client";

import { createContext, useContext, useState } from "react";

const CartCountContext = createContext();

function CartCountProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Conta quanti ID unici ci sono nel carrello
  const cartCount = cartItems.reduce((uniqueIds, item) => {
    if (!uniqueIds.includes(item.id)) {
      uniqueIds.push(item.id);
    }
    return uniqueIds;
  }, []).length;

  return (
    <CartCountContext.Provider value={{ cartItems, setCartItems, cartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}

function useCartCount() {
  const context = useContext(CartCountContext);
  if (context === undefined)
    throw new Error("CartCountContext was used outside of CartCountProvider");
  return context;
}

export { CartCountProvider, useCartCount };
