"use client";

import Button from "../ui/Button";
import { startTransition, useActionState } from "react";
import { addCartItem } from "@/app/_lib/actions";
import { useProductQuantity } from "@/app/_contexts/ProductQuantityContext";
import { showCustomPromiseToast } from "../ui/CustomToast";

function AddToCartButton({ userId, productId, productQuantity }) {
  const { quantity, setQuantity } = useProductQuantity();

  const handleAddToCart = async () => {
    const toast = (await import("react-hot-toast")).default;
    await showCustomPromiseToast(toast, addCartItem(productId, quantity), {
      loading: "Inserimento del prodotto nel carrello...",
      success: "Prodotto aggiunto nel carrello!",
      error: (err) => `Errore: ${err?.message || "Errore imprevisto"}`,
    });

    setQuantity(1);
  };

  const [state, action, pending] = useActionState(handleAddToCart, false);

  return (
    <Button
      className={`rounded px-3 py-4 font-bold uppercase ${pending ? "animate-pulse" : ""} md:py-3`}
      onClick={async () => {
        if (!userId) {
          return;
        }
        startTransition(action);
      }}
      disabled={productQuantity === 0 || pending}
    >
      {productQuantity === 0 ? "Fuori scorta" : "Aggiungi al carrello"}
    </Button>
  );
}

export default AddToCartButton;
