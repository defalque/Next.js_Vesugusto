"use client";

import { useOptimistic } from "react";
import FavoriteCard from "./FavoriteCard";
import { addCartItem, deleteFavorite } from "@/app/_lib/actions";

function FavoritesList({ products, userId, cartId }) {
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

  if (optimisticProducts.length === 0) {
    return (
      <div>
        <p>Non hai nessun prodotto tra i preferiti.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-x-20 gap-y-20">
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
    </div>
  );
}

export default FavoritesList;
