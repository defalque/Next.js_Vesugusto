"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useOptimistic } from "react";
import FavoriteCard from "./FavoriteCard";
import { addCartItem, deleteFavorite } from "@/app/_lib/actions";

function FavoritesHandler({ products, userId, cartId }) {
  const [optimisticProducts, optimisticDelete] = useOptimistic(
    products,
    (curProducts, productId) => {
      return curProducts.filter((product) => product.id !== productId);
    }
  );

  async function handleDelete(userId, productId) {
    optimisticDelete(productId);
    await deleteFavorite(userId, productId);
  }

  async function handleAddToCart(cartId, userId, productId) {
    optimisticDelete(productId);
    const success = await addCartItem(cartId, productId, 1);
    if (success) {
      // setCartItems((prevItems) => {
      //   const existing = prevItems.find((item) => item.id === productId);
      //   if (!existing) {
      //     return [...prevItems, { id: productId }];
      //   }
      //   return prevItems;
      // });
    }
    await deleteFavorite(userId, productId);
  }

  return (
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
          exit={{ scale: 0.95, opacity: 0 }}
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
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FavoritesHandler;
