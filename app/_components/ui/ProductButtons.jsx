"use client";

import { useState } from "react";
import HeartBurstButton from "./HeartBurstButton";
import { addCartItem } from "@/app/_lib/actions";
import { toast, ToastContainer } from "react-toastify";
import { useDarkMode } from "../contexts/DarkModeContext";

function ProductButtons({ cartId, userId, product }) {
  const [quantity, setQuantity] = useState(1);
  const { isDarkMode } = useDarkMode();

  const handleLessClick = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleMoreClick = () =>
    setQuantity((prev) =>
      prev === product.quantity ? product.quantity : prev + 1
    );

  const handleClick = async () => {
    if (userId) {
      try {
        const succes = await addCartItem(cartId, product.id, quantity);
        if (succes) {
          setQuantity(1);
          toast.success(<span>Prodotto aggiunto al carrello</span>);
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else
      toast.warning(
        <span>
          Accedi o registrati per aggiungere questo prodotto al carrello
        </span>
      );
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme={isDarkMode ? "light" : "dark"}
        />
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
