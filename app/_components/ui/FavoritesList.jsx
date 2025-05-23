"use client";

import { useOptimistic } from "react";
import FavoriteCard from "./FavoriteCard";
import { deleteFavorite } from "@/app/_lib/actions";

function FavoritesList({ products, userId }) {
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

  if (optimisticProducts.length === 0) {
    return (
      <div>
        <p>Non hai nessun prodotto tra i preferiti.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-10">
      {optimisticProducts.map((product) => (
        <FavoriteCard
          key={product.id}
          product={product}
          userId={userId}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default FavoritesList;
