"use client";
import { useState } from "react";

function ProductQuantity({ productQuantity }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mb-7 flex flex-col gap-1.5">
      <label htmlFor="quantity">Quantità</label>
      <div className="w-max flex gap-0.5">
        <button
          className="px-3 py-1 rounded-tl-md rounded-bl-md bg-primary-950 hover:bg-primary-800 text-primary-100 cursor-pointer text-lg font-semibold transition-colors duration-300"
          onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
          disabled={quantity === 1}
        >
          &#45;
        </button>
        <input
          type="text"
          className="py-1 text-lg w-12 text-center outline-primary-950"
          defaultValue={quantity}
          readOnly
        />
        <button
          className="px-3 py-1 rounded-tr-md rounded-br-md bg-primary-950  hover:bg-primary-800 text-primary-100 cursor-pointer text-lg font-semibold transition-colors duration-300"
          onClick={() =>
            setQuantity((prev) =>
              prev === productQuantity ? productQuantity : prev + 1
            )
          }
        >
          &#43;
        </button>
      </div>
    </div>
  );
}

export default ProductQuantity;
