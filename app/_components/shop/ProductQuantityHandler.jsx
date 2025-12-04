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

        <button
          type="button"
          className="touch-hitbox bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 order-1 cursor-pointer rounded-l-md p-2 text-white transition-colors duration-200 disabled:cursor-not-allowed dark:text-white"
          disabled={quantity === 1}
          onClick={handleLessClick}
          aria-label="Diminuisci quantità di 1"
        >
          {minusIcon}
        </button>

        <button
          type="button"
          className="touch-hitbox bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 order-3 cursor-pointer rounded-r-md p-2 text-white transition-colors duration-200 disabled:cursor-not-allowed"
          disabled={quantity === productQuantity}
          onClick={handleMoreClick}
          aria-label="Aumenta quantità di 1"
        >
          {plusIcon}
        </button>
      </div>
    </div>
  );
}

export default ProductQuantityHandler;
