"use client";

import { addFavoriteProduct, deleteFavoriteProduct } from "@/app/_lib/actions";
import { startTransition, useActionState } from "react";
import { showCustomPromiseToast } from "../ui/CustomToast";
import { Heart } from "lucide-react";

function FavoriteButton({
  className = "",
  iconSizes = "size-5 lg:size-6",
  productId,
  isFavorite,
  productQuantity,
}) {
  const handleFavorite = async () => {
    if (isFavorite) {
      const toast = (await import("react-hot-toast")).default;
      await showCustomPromiseToast(toast, deleteFavoriteProduct(productId), {
        loading: "Rimozione del prodotto dai tuoi preferiti...",
        success: "Il prodotto è stato rimosso dai tuoi preferiti.",
        error: (err) => `Errore: ${err?.message || "Errore imprevisto"}`,
      });
    } else {
      const toast = (await import("react-hot-toast")).default;
      await showCustomPromiseToast(toast, addFavoriteProduct(productId), {
        loading: "Aggiunta del prodotto ai tuoi preferiti...",
        success: "Il prodotto è stato aggiunto ai tuoi preferiti.",
        error: (err) => `Errore: ${err?.message || "Errore imprevisto"}`,
      });
    }
  };

  const [state, action, pending] = useActionState(handleFavorite, false);

  return (
    <button
      onClick={async () => {
        startTransition(action);
      }}
      className={`${className} focus-style rounded`}
      aria-label="Aggiungi ai preferiti"
      aria-pressed={isFavorite}
      disabled={pending || productQuantity === 0}
    >
      <Heart
        className={`flex ${productQuantity === 0 ? "cursor-not-allowed" : "cursor-pointer"} items-center transition-colors duration-300 ${pending ? "animate-pulse cursor-not-allowed" : ""} ${
          isFavorite
            ? "fill-primary-dark-200 text-primary-dark-200 dark:fill-primary-dark-100 dark:text-primary-dark-100"
            : "hover:fill-primary-dark-200 dark:hover:fill-primary-dark-100 dark:text-primary-dark-100 text-primary-dark-200"
        }`}
      />
    </button>
  );
}

export default FavoriteButton;
