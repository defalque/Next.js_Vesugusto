"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

function DeleteCartItem({ handleDeleteCartItem, disabled, className }) {
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleDeleteCartItem}
        disabled={disabled}
        aria-label="Elimina prodotto dal carrello"
      >
        <XMarkIcon
          aria-hidden="true"
          className="size-5 transition-colors duration-200 hover:fill-zinc-500"
        ></XMarkIcon>
      </button>

      {/* <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {disabled
          ? "Eliminazione in corso"
          : `Il prodotto è stato eliminato dal carrello`}
      </p> */}
    </>
  );
}

export default DeleteCartItem;
