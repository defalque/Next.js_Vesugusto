"use client";

import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import SelectCartQuantity from "./SelectCartQuantity";
import { useTransition } from "react";
import { formatPrice } from "@/app/_lib/formatPrice";
import { AnimatePresence, motion } from "framer-motion";

function CartProducts({ product, cartId, setIsLoading, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => onDelete(cartId, product.id));
  }

  return (
    <motion.li
      layout
      exit={{ x: -70, opacity: 0 }}
      className="list-none py-6 border-t border-t-zinc-200 dark:border-dark-200 last:border-b last:border-b-zinc-200 dark:last:border-dark-200"
    >
      <article
        // initial={{ x: -10, scale: 0.95 }}
        // animate={{ x: 0, scale: 1 }}
        // exit={{ x: -10, scale: 0.95 }}
        // transition={{ duration: 0.5 }}
        className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] gap-x-4 xs:gap-x-5 items-start  "
      >
        <div className="h-40 sm:h-50 aspect-2/3 relative">
          <Image
            src={product.image?.at(0)}
            fill
            alt={product.name}
            className="object-cover rounded-lg dark:shadow-sm dark:shadow-dark-100"
          />
        </div>

        <div className="flex flex-col h-full gap-2">
          <h1 className="text-lg text-zinc-500 dark:text-gray-300">
            {product.name}
          </h1>
          <span className="text-md font-semibold">
            {formatPrice(product.regularPrice)}
          </span>
          <p className="hidden xs:block text-xs lg:text-sm font-light mt-1 text-zinc-500 dark:text-gray-300">
            {product.details}
          </p>
          {product.productQuantity > 0 ? (
            <span className="flex items-center gap-1 text-xs lg:text-sm font-light mt-auto mb-0.5">
              <CheckIcon
                className={`size-5 ${
                  product.productQuantity > 10
                    ? "text-lime-500 font-bold"
                    : "text-yellow-500 font-medium"
                }`}
              />
              {product.productQuantity > 10 ? (
                "Disponibile"
              ) : product.productQuantity > 1 ? (
                <>
                  <span className="hidden md:inline">
                    Disponibilità limitata:{" "}
                  </span>
                  {product.productQuantity} disponibili
                </>
              ) : product.productQuantity === 1 ? (
                <>
                  <span className="hidden md:inline">
                    Disponibilità limitata:{" "}
                  </span>
                  1 disponibile
                </>
              ) : (
                "Non disponibile"
              )}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm font-light mt-auto mb-0.5">
              <XMarkIcon className="size-5 text-red-600" />
              Esaurito
            </span>
          )}
        </div>

        <SelectCartQuantity
          cartId={cartId}
          cartQuantity={product.cartQuantity}
          product={product}
          setIsLoading={setIsLoading}
        />

        <button
          className="ml-auto cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-950"
          onClick={handleDelete}
        >
          <XMarkIcon className="size-4.5 lg:size-5 hover:fill-zinc-500 transition-colors duration-200"></XMarkIcon>
        </button>
      </article>
    </motion.li>
  );
}

export default CartProducts;
