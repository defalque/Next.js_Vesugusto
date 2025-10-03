"use client";

import { addFavorite, deleteFavorite } from "@/app/_lib/actions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { startTransition, useActionState } from "react";
import {
  showCustomErrorToast,
  showCustomPromiseToast,
} from "../ui/CustomToast";

function FavoriteButton({
  className = "",
  iconSizes = "size-5 lg:size-6",
  productId,
  userId,
  isFavorite,
  productQuantity,
}) {
  const handleFavorite = async () => {
    if (isFavorite) {
      const toast = (await import("react-hot-toast")).default;
      await showCustomPromiseToast(toast, deleteFavorite(userId, productId), {
        loading: "Rimozione del prodotto dai tuoi preferiti...",
        success: "Il prodotto è stato rimosso dai tuoi preferiti.",
        error: (err) => `Errore: ${err?.message || "Errore imprevisto"}`,
      });
      // try {
      //   await deleteFavorite(userId, productId);
      // } catch (err) {
      //   const toast = (await import("react-hot-toast")).default;

      //   // toast.error(err.message);
      //   showCustomErrorToast(toast, err);
      // }
    } else {
      const toast = (await import("react-hot-toast")).default;
      await showCustomPromiseToast(toast, addFavorite(userId, productId), {
        loading: "Aggiunta del prodotto ai tuoi preferiti...",
        success: "Il prodotto è stato aggiunto ai tuoi preferiti.",
        error: (err) => `Errore: ${err?.message || "Errore imprevisto"}`,
      });
      // try {
      //   await addFavorite(userId, productId);
      // } catch (err) {
      //   const toast = (await import("react-hot-toast")).default;

      //   // toast.error(err.message);
      //   showCustomErrorToast(toast, err);
      // }
    }
  };
  const [state, action, pending] = useActionState(handleFavorite, false);

  return (
    <button
      onClick={async () => {
        if (!userId) {
          // const toast = (await import("react-hot-toast")).default;
          // return toast(
          //   "Accedi o registrati per aggiungere questo prodotto tra i preferiti.",
          // );
          return;
        }
        startTransition(action);
      }}
      className={`${className} focus rounded`}
      aria-label="Aggiungi ai preferiti"
      aria-pressed={isFavorite}
      disabled={pending || productQuantity === 0}
    >
      <HeartIcon
        className={`inline-flex ${iconSizes} ${productQuantity === 0 ? "cursor-not-allowed" : "cursor-pointer"} items-center transition-colors duration-300 ${pending ? "animate-pulse cursor-not-allowed" : ""} ${
          isFavorite
            ? "fill-primary-dark-200 text-primary-dark-200 dark:fill-primary-dark-100 dark:text-primary-dark-100"
            : "hover:fill-primary-dark-200 dark:hover:fill-primary-dark-100 dark:text-primary-dark-100 text-primary-dark-200"
        }`}
      />
    </button>
  );
}

export default FavoriteButton;
