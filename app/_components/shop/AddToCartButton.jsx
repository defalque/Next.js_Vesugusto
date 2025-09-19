"use client";

import Button from "../ui/Button";
import { startTransition, useActionState } from "react";
import { addCartItem } from "@/app/_lib/actions";
import { useProductQuantity } from "@/app/_contexts/ProductQuantityContext";

function AddToCartButton({ userId, productId, cartId, productQuantity }) {
  const { quantity, setQuantity } = useProductQuantity();

  const handleAddToCart = async () => {
    try {
      await addCartItem(cartId, productId, quantity);
      setQuantity(1);
    } catch (err) {
      const toast = (await import("react-hot-toast")).default;
      toast.error(err.message);
    }
  };

  const [state, action, pending] = useActionState(handleAddToCart, false);

  return (
    <Button
      className={`rounded px-3 py-4 font-bold uppercase ${pending ? "animate-pulse" : ""} md:py-3`}
      onClick={async () => {
        if (!userId) {
          const toast = (await import("react-hot-toast")).default;
          return toast(
            "Accedi o registrati per aggiungere questo prodotto al carrello.",
          );
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
