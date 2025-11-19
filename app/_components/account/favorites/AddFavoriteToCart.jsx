"use client";

import { addFavoriteToCartAndDeleteFavorite } from "@/app/_lib/actions";
import Button from "../../ui/Button";
import {
  showCustomErrorToast,
  showCustomPromiseToast,
} from "../../ui/CustomToast";

function AddFavoriteToCart({ productId, disabled, setIsPending }) {
  return (
    <button
      type="button"
      className="bg-primary-dark-200 hover:bg-primary-dark-100 order-4 w-full cursor-pointer truncate rounded-full px-2 py-1.5 text-xs font-bold text-white uppercase transition-colors duration-200 disabled:animate-pulse disabled:cursor-not-allowed"
      onClick={async () => {
        setIsPending(true);
        const toast = (await import("react-hot-toast")).default;
        await showCustomPromiseToast(
          toast,
          addFavoriteToCartAndDeleteFavorite(productId),
          {
            loading: "Aggiunta del prodotto nel carrello...",
            success: "Prodotto aggiunto nel carrello!",
            error: (err) => `Errore: ${err?.message || "Errore imprevisto"}`,
          },
        );
        setIsPending(false);
      }}
      aria-label="Aggiungi al carrello"
      disabled={disabled}
    >
      <span className="hidden sm:inline">Sposta nel carrello</span>
      <span className="inline sm:hidden">Aggiungi</span>
    </button>
  );
}

export default AddFavoriteToCart;
