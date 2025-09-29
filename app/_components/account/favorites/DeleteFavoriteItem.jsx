"use client";

import { deleteFavorite } from "@/app/_lib/actions";

function DeleteFavoriteItem({
  userId,
  productId,
  disabled,
  setIsPending,
  children,
}) {
  return (
    <button
      type="button"
      className="bg-primary-50/60 dark:text-primary-dark-950 focus absolute top-1 right-1 z-100 order-1 w-max cursor-pointer rounded-full px-1 py-1 font-bold transition-colors duration-200 hover:bg-gray-50 disabled:animate-pulse disabled:cursor-not-allowed"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          setIsPending(true);
          await deleteFavorite(userId, productId);
        } catch (err) {
          const toast = (await import("react-hot-toast")).default;
          toast.error(err.message);
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
