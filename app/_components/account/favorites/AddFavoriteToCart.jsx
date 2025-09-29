"use client";

import { addFavoriteToCartAndDeleteFavorite } from "@/app/_lib/actions";
import Button from "../../ui/Button";
import { showCustomErrorToast } from "../../ui/CustomToast";

function AddFavoriteToCart({
  userId,
  cartId,
  productId,
  disabled,
  setIsPending,
}) {
  return (
    <Button
      className="order-4 truncate rounded px-2 py-1.5 text-xs font-semibold uppercase"
      onClick={async () => {
        try {
          setIsPending(true);
          await addFavoriteToCartAndDeleteFavorite(userId, cartId, productId);
        } catch (err) {
          const toast = (await import("react-hot-toast")).default;

          // toast.error(err.message);
          showCustomErrorToast(toast, err);
        } finally {
          setIsPending(false);
        }
      }}
      aria-label="Aggiungi al carrello"
      disabled={disabled}
    >
      <span className="hidden sm:inline">Sposta nel carrello</span>
      <span className="inline sm:hidden">Aggiungi</span>
    </Button>
  );
}

export default AddFavoriteToCart;
