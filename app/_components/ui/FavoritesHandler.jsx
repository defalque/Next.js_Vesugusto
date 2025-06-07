"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useOptimistic, useState, useTransition } from "react";
import FavoriteCard from "./FavoriteCard";
import { addCartItem, deleteFavorite } from "@/app/_lib/actions";
import Spinner from "./Spinner";

function FavoritesHandler({ products, userId, cartId }) {
  const [optimisticProducts, optimisticDelete] = useOptimistic(
    products,
    (curProducts, productId) => {
      return curProducts.filter((product) => product.id !== productId);
    }
  );

  const [isPending, startTransition] = useTransition();

  async function handleDelete(userId, productId) {
    optimisticDelete(productId);
    await deleteFavorite(userId, productId);
  }

  async function handleAddToCart(cartId, userId, productId) {
    console.log("Loading start");
    await addCartItem(cartId, productId, 1);
    await deleteFavorite(userId, productId);
    optimisticDelete(productId);
    console.log("Loading end");
  }

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-1000 bg-transparent backdrop-blur-sm flex items-center justify-center">
          <Spinner />
        </div>
      )}

      <AnimatePresence mode="wait">
        {optimisticProducts.length === 0 && (
          <motion.p
            key="fallback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="-mt-5 text-sm md:text-base"
          >
            Non hai nessun prodotto tra i preferiti.
          </motion.p>
        )}

        {optimisticProducts.length > 0 && (
          <motion.div
            key="list"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 sm:gap-x-20 gap-y-20"
          >
            <AnimatePresence>
              {optimisticProducts.map((product) => (
                <FavoriteCard
                  key={product.id}
                  product={product}
                  userId={userId}
                  cartId={cartId}
                  onDelete={handleDelete}
                  onAdd={handleAddToCart}
                  startTransition={startTransition}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FavoritesHandler;
