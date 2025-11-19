"use client";

import { deleteFavoriteProduct } from "@/app/_lib/actions";
import { showCustomErrorToast } from "../../ui/CustomToast";

function DeleteFavoriteItem({ productId, disabled, setIsPending, children }) {
  return (
    <button
      type="button"
      className="focus touch-hitbox order-4 w-max cursor-pointer rounded-full border border-red-600 px-1.5 py-1.5 font-bold transition-colors duration-200 hover:bg-red-500/10 disabled:animate-pulse disabled:cursor-not-allowed dark:border-red-500 dark:bg-red-400/10 dark:hover:bg-red-400/25 dark:disabled:bg-red-400/25"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          setIsPending(true);
          await deleteFavoriteProduct(productId);
        } catch (err) {
          const toast = (await import("react-hot-toast")).default;
          showCustomErrorToast(toast, err);
        } finally {
          setIsPending(false);
        }
      }}
      disabled={disabled}
      aria-label="Elimina dai preferiti"
    >
      {children}
    </button>
  );
}

export default DeleteFavoriteItem;
