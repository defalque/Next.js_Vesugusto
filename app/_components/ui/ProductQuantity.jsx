"use client";

import { useState } from "react";

function ProductQuantity({ productQuantity }) {
  const [quantity, setQuantity] = useState(1);

  const handleLessClick = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleMoreClick = () =>
    setQuantity((prev) =>
      prev === productQuantity ? productQuantity : prev + 1
    );

  return (
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
          className="py-1 text-lg w-12 text-center outline-primary-950"
          value={quantity}
          readOnly
        />
        <QuantityButton
          type="more"
          quantity={quantity}
          value={productQuantity}
          onClick={handleMoreClick}
        >
          &#43;
        </QuantityButton>
      </div>
    </div>
  );
}

export default ProductQuantity;

function QuantityButton({ type, quantity, value, onClick, children }) {
  return (
    <button
      className={`px-3 py-1 ${
        type === "less" && "rounded-tl-md rounded-bl-md"
      } ${
        type === "more" && "rounded-tr-md rounded-br-md"
      } hover:bg-primary-800 text-primary-100 text-lg font-semibold transition-colors duration-300 ${
        quantity === value
          ? "bg-primary-700 cursor-not-allowed"
          : "bg-primary-950 cursor-pointer"
      }`}
      onClick={onClick}
      disabled={quantity === value}
    >
      {children}
    </button>
  );
}
