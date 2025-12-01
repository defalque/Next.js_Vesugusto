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
      <label htmlFor="quantity" className="sr-only font-semibold">
        Seleziona quantità:
      </label>
      <div className="flex items-center gap-2">
        <input
          id="quantity"
          type="text"
          role="spinbutton"
          className="pointer-events-none order-2 h-8 w-10 rounded text-center text-lg leading-8"
          value={quantity}
          readOnly
          min={1}
          max={productQuantity}
          aria-label="Quantità selezionata"
          aria-valuemin={1}
          aria-valuemax={productQuantity}
          aria-valuenow={quantity}
        />

        <span
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Quantità selezionata: {quantity}
        </span>

        <Button
          className="touch-hitbox order-1 rounded-full p-2"
          disabled={quantity === 1}
          onClick={handleLessClick}
          ariaLabel="Diminuisci quantità di 1"
        >
          {minusIcon}
        </Button>

        <Button
          className="touch-hitbox order-3 rounded-full p-2"
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
