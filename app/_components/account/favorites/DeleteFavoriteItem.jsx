"use client";

import { deleteFavoriteProduct } from "@/app/_lib/actions";
import { showCustomErrorToast } from "../../ui/CustomToast";

import * as m from "motion/react-m";
import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
import { AnimatePresence, MotionConfig } from "motion/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

function DeleteFavoriteItem({ productId, disabled, isPending, setIsPending }) {
  const [buttonState, setButtonState] = useState("idle");
  const shouldReduce = useReducedMotion();
  const hoverVariants = {
    initial: { y: 0, x: 0, rotate: 0, scale: 1 },
    animate: { y: -3, x: 1, rotate: 18, scale: 1.1 },
  };

  const option = {
    idle: (
      <>
        <svg
          aria-hidden
          key="not-disabled"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash-icon lucide-trash size-5 overflow-visible text-red-600 sm:size-4 dark:text-red-500"
        >
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <m.path
            d="M3 6h18"
            variants={hoverVariants}
            transition={{ duration: shouldReduce ? 0 : 0.2 }}
          />
          <m.path
            d="M8 6V4a2 0 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            variants={hoverVariants}
            transition={{ duration: shouldReduce ? 0 : 0.2 }}
          />
        </svg>
      </>
    ),
    loading: (
      <>
        <span
          aria-hidden
          className="animate-spin-fast block h-3.5 w-3.5 rounded-full border-[1px] border-t-[1px] border-red-600 border-t-transparent duration-100 dark:border-red-500 dark:border-t-transparent"
        />
        <span className="block text-sm font-normal text-red-600 dark:text-red-500">
          Rimozione...
        </span>
      </>
    ),
    success: (
      <>
        <CheckIcon
          aria-hidden
          className="size-4 fill-transparent text-red-600 dark:text-red-500"
        />
        <span className="block text-sm font-normal text-red-600 dark:text-red-500">
          Rimosso
        </span>
      </>
    ),
  };

  return (
    <MotionConfig transition={{ duration: 0.2, ease: "easeOut" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        {isPending !== "add" && (
          <m.button
            type="button"
            whileTap={{ scale: 0.9 }}
            className={`focus-style touch-hitbox ${!disabled && "group"} flex cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent transition-colors duration-200 hover:border-red-500/10 disabled:cursor-not-allowed disabled:border-red-500/5 disabled:bg-red-500/10 dark:disabled:bg-red-400/15`}
            onClick={async () => {
              try {
                setButtonState("loading");
                setIsPending("delete");
                await deleteFavoriteProduct(productId);
              } catch (err) {
                const toast = (await import("react-hot-toast")).default;
                showCustomErrorToast(toast, err);
                setButtonState("idle");
                setIsPending("");
              } finally {
                setButtonState("success");
                setIsPending("delete");
              }

              // DEV Mode
              // setIsPending("delete");
              // setButtonState("loading");
              // setTimeout(() => {
              //   setIsPending("delete");
              //   setButtonState("success");
              // }, 1750);
              // setTimeout(() => {
              //   setIsPending("");
              //   setButtonState("idle");
              // }, 3500);
            }}
            animate={{ x: 0, width: disabled ? "100%" : 35 }}
            exit={{ x: "-100%", width: 0 }}
            disabled={disabled}
            aria-label="Elimina dai preferiti"
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
                  x: shouldReduce ? 0 : -20,
                }}
                animate={{ opacity: 1, blur: "0px", scale: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  blur: "4px",
                  scale: 0.8,
                  x: shouldReduce ? 0 : 20,
                }}
                className="flex h-full w-full items-center justify-center gap-2 rounded-full px-2.5 py-1.5 group-hover:bg-red-500/10 dark:group-hover:bg-red-400/15"
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

export default DeleteFavoriteItem;
