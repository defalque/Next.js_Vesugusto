"use client";

import Button from "../ui/Button";
import { useProductQuantity } from "@/app/_contexts/ProductQuantityContext";

function ProductQuantityHandler({ productQuantity, minusIcon, plusIcon }) {
  const { quantity, setQuantity } = useProductQuantity();

  if (productQuantity <= 0) {
    return null;
  }

  const handleLessClick = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleMoreClick = () =>
    setQuantity((prev) =>
      prev === productQuantity ? productQuantity : prev + 1,
    );

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="quantity" className="font-semibold">
        Seleziona quantità:
      </label>
      <div className="flex items-center gap-2">
        <Button
          className="rounded-lg p-2"
          disabled={quantity === 1}
          onClick={handleLessClick}
          ariaLabel="Diminuisci quantità di 1"
        >
          {minusIcon}
        </Button>

        <input
          id="quantity"
          type="text"
          className="pointer-events-none h-8 w-10 rounded text-center text-lg leading-8"
          value={quantity}
          readOnly
          tabIndex={-1}
          min={1}
          max={productQuantity}
          aria-live="polite"
          aria-atomic="true"
        />

        <Button
          className="rounded-lg p-2"
          disabled={quantity === productQuantity}
          onClick={handleMoreClick}
          ariaLabel="Aumenta quantità di 1"
        >
          {plusIcon}
        </Button>
      </div>
    </div>
  );
}

export default ProductQuantityHandler;
