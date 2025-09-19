"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

function DeleteCartItem({ handleDeleteCartItem, disabled, className }) {
  return (
    <button
      className={className}
      onClick={handleDeleteCartItem}
      disabled={disabled}
      aria-label="Elimina"
    >
      <XMarkIcon
        aria-hidden="true"
        className="size-5 transition-colors duration-200 hover:fill-zinc-500"
      ></XMarkIcon>
    </button>
  );
}

export default DeleteCartItem;
