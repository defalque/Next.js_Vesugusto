"use client";

import { useState } from "react";
import HeartBurstButton from "./HeartBurstButton";
import toast from "react-hot-toast";
import { addCartItem } from "@/app/_lib/actions";
import { useCartCount } from "../contexts/CartCountContext";

function ProductButtons({ cartId, userId, product }) {
  const [quantity, setQuantity] = useState(1);
  const { setCartItems } = useCartCount();

  const handleLessClick = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleMoreClick = () =>
    setQuantity((prev) =>
      prev === product.quantity ? product.quantity : prev + 1
    );

  const handleClick = async () => {
    if (userId) {
      const succes = await addCartItem(cartId, product.id, quantity);
      if (succes) {
        setCartItems((prevItems) => {
          const existing = prevItems.find((item) => item.id === product.id);
          if (!existing) {
            return [...prevItems, { id: product.id }];
          }
          return prevItems;
        });
        setQuantity(1);
        toast.success("Prodotto aggiunto al carrello");
      }
    } else
      toast("Accedi o registrati per aggiungere questo prodotto al carrello", {
        icon: "🛒",
      });
  };

  return (
    <div>
      {product.quantity > 0 && (
        <div className="mb-7 flex flex-col gap-1.5">
          <label htmlFor="quantity">Quantità</label>
          <div className="w-max flex gap-0.5">
            <QuantityButton
              type="less"
              quantity={quantity}
              value={1}
              onClick={handleLessClick}
            >
              &#45;
            </QuantityButton>
            <input
              type="text"
              className="h-8 text-md w-10 text-center outline-primary-950"
              value={quantity}
              readOnly
            />
            <QuantityButton
              type="more"
              quantity={quantity}
              value={product.quantity}
              onClick={handleMoreClick}
            >
              &#43;
            </QuantityButton>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <button
          className="bg-primary-950 hover:bg-primary-800 text-primary-100 px-4 py-3 uppercase font-bold cursor-pointer rounded-sm transition-colors duration-300 disabled:bg-primary-800 disabled:cursor-not-allowed"
          onClick={handleClick}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? "Fuori scorta" : "Aggiungi al carrello"}
        </button>

        <HeartBurstButton
          userId={userId}
          productId={product.id}
        ></HeartBurstButton>
      </div>
    </div>
  );
}

export default ProductButtons;

function QuantityButton({ type, quantity, value, onClick, children }) {
  return (
    <button
      className={`px-3 py-1 bg-primary-950 cursor-pointer rounded-full hover:bg-primary-800 text-primary-100 text-md font-semibold transition-colors duration-300 disabled:bg-primary-700 disabled:cursor-not-allowed shadow-sm`}
      onClick={onClick}
      disabled={quantity === value}
    >
      {children}
    </button>
  );
}
