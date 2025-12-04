"use client";

import { useState } from "react";

import { addCartItem } from "@/app/_lib/actions";
import { useProductQuantity } from "@/app/_contexts/ProductQuantityContext";
import { showCustomErrorToast } from "../ui/CustomToast";

import { CheckIcon } from "lucide-react";

import { LazyMotion, AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features.js").then((res) => res.default);

function AddToCartButton({ userId, productId, productQuantity }) {
  const { quantity, setQuantity } = useProductQuantity();
  const [buttonState, setButtonState] = useState("idle");

  const option = {
    idle:
      productQuantity === 0 ? (
        <span>Fuori scorta</span>
      ) : (
        <span>Aggiugi al carrello</span>
      ),
    loading: (
      <>
        <span
          aria-hidden
          className="animate-spin-fast block h-4 w-4 rounded-full border-2 border-t-2 border-white border-t-transparent duration-100"
        />
        <span>Aggiunta in corso...</span>
      </>
    ),
    success: (
      <>
        <CheckIcon aria-hidden className="size-4 fill-transparent text-white" />
        <span>Aggiunto con successo</span>
      </>
    ),
  };

  const handleAddToCart = async () => {
    try {
      setButtonState("loading");
      await addCartItem(productId, quantity);
      setButtonState("success");
      setQuantity(1);
      setTimeout(() => setButtonState("idle"), 1750);
    } catch (err) {
      const toast = (await import("react-hot-toast")).default;
      showCustomErrorToast(toast, err);
      setButtonState("idle");
      setQuantity(1);
    }

    //DEV MODE
    // setButtonState("loading");
    // setTimeout(() => {
    //   setButtonState("success");
    //   setQuantity(1);
    // }, 1750);
    // setTimeout(() => {
    //   setButtonState("idle");
    // }, 3500);

    // const toast = (await import("react-hot-toast")).default;
    // await showCustomPromiseToast(toast, addCartItem(productId, quantity), {
    //   loading: "Inserimento del prodotto nel carrello...",
    //   success: "Prodotto aggiunto nel carrello!",
    //   error: (err) => `Errore: ${err?.message || "Errore imprevisto"}`,
    // });
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.button
        whileTap={{ scale: 0.96 }}
        type="button"
        className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full py-2 text-center font-medium text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed"
        onClick={async () => {
          if (!userId) {
            return;
          }
          await handleAddToCart();
        }}
        disabled={
          productQuantity === 0 ||
          buttonState === "loading" ||
          buttonState === "success"
        }
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            className="flex items-center gap-2"
            key={buttonState}
            initial={{ opacity: 0, scale: 0.9, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
          >
            {option[buttonState]}
          </m.div>
        </AnimatePresence>
      </m.button>
    </LazyMotion>
  );
}

export default AddToCartButton;
