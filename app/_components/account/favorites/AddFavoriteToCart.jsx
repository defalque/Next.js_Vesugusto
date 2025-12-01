"use client";

import { addFavoriteToCartAndDeleteFavorite } from "@/app/_lib/actions";
import { showCustomErrorToast } from "../../ui/CustomToast";

import * as m from "motion/react-m";
import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
import { AnimatePresence, MotionConfig } from "motion/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

function AddFavoriteToCart({ productId, disabled, isPending, setIsPending }) {
  const [buttonState, setButtonState] = useState("idle");
  const shouldReduce = useReducedMotion();
  const hoverVariants = {
    initial: { x: 0 },
    animate: { x: shouldReduce ? 0 : [null, 6, -6, 0] },
  };

  const option = {
    idle: (
      <>
        <m.svg
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shopping-cart-icon lucide-shopping-cart size-4 overflow-visible sm:size-4"
          variants={hoverVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 1 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </m.svg>

        <span className="block text-sm font-normal">Aggiungi</span>
      </>
    ),
    loading: (
      <>
        <span
          aria-hidden
          className="animate-spin-fast block h-3.5 w-3.5 rounded-full border-[1px] border-t-[1px] border-green-800 border-t-transparent duration-100 dark:border-green-200 dark:border-t-transparent"
        />
        <span className="block text-sm font-normal">Aggiunta...</span>
      </>
    ),
    success: (
      <>
        <CheckIcon
          aria-hidden
          className="size-4 fill-transparent text-green-600 dark:text-green-500"
        />
        <span className="block text-sm font-normal text-green-600 dark:text-green-400">
          Aggiunto
        </span>
      </>
    ),
  };

  return (
    <MotionConfig transition={{ duration: 0.2, ease: "easeOut" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        {isPending !== "delete" && (
          <m.button
            // layout
            type="button"
            whileTap={{ scale: 0.9 }}
            className={`focus-style touch-hitbox ${!disabled && "group"} _group flex cursor-pointer items-center justify-center gap-2 rounded-full border border-black/10 text-xs text-black shadow-xs transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-green-600/10 disabled:text-green-800 dark:border-white/15 dark:text-white/90 dark:disabled:bg-green-500/10 dark:disabled:text-green-200`}
            onClick={async () => {
              try {
                setButtonState("loading");
                setIsPending("add");
                await addFavoriteToCartAndDeleteFavorite(productId);
              } catch (err) {
                const toast = (await import("react-hot-toast")).default;
                showCustomErrorToast(toast, err);
                setButtonState("idle");
                setIsPending("");
              } finally {
                setButtonState("success");
                setIsPending("add");
              }

              //DEV MODE
              // setIsPending("add");
              // setButtonState("loading");
              // setTimeout(() => {
              //   setIsPending("add");
              //   setButtonState("success");
              // }, 1750);
              // setTimeout(() => {
              //   setIsPending("");
              //   setButtonState("idle");
              // }, 3500);
            }}
            animate={{ x: 0, flex: disabled ? "none" : 1, width: "100%" }}
            exit={{ x: "100%", width: 0 }}
            disabled={disabled}
            aria-label="Aggiungi al carrello"
            whileHover="animate"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={buttonState}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                initial={{
                  opacity: 0,
                  blur: "4px",
                  scale: 0.8,
                  x: shouldReduce ? 0 : 20,
                }}
                animate={{ opacity: 1, blur: "0px", scale: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  blur: "4px",
                  scale: 0.8,
                  x: shouldReduce ? 0 : -20,
                }}
                className="_group-disabled:bg-green-600/10 _dark:group-disabled:bg-green-500/10 _group-hover:bg-green-600/10 _dark:group-hover:bg-green-500/10 flex h-full w-full items-center justify-center gap-2 rounded-full px-2.5 py-1.5 group-hover:text-green-800 dark:group-hover:text-green-200"
              >
                {option[buttonState]}
              </m.div>
            </AnimatePresence>
          </m.button>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

export default AddFavoriteToCart;
