"use client";

import { addFavoriteToCartAndDeleteFavorite } from "@/app/_lib/actions";
import Button from "../../ui/Button";

function AddFavoriteToCart({
  userId,
  cartId,
  productId,
  disabled,
  setIsPending,
}) {
  return (
    <Button
      className="truncate rounded px-2 py-1 text-xs font-semibold uppercase"
      onClick={async () => {
        try {
          setIsPending(true);
          await addFavoriteToCartAndDeleteFavorite(userId, cartId, productId);
        } catch (err) {
          const toast = (await import("react-hot-toast")).default;
          toast.error(err.message);
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
