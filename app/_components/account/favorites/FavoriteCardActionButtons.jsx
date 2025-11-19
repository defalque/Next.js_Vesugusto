"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
const AddFavoriteToCart = dynamic(() => import("./AddFavoriteToCart"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="order-4 h-7 w-full animate-pulse rounded-full bg-gray-200 dark:bg-zinc-700"
    />
  ),
});
const DeleteFavoriteItem = dynamic(() => import("./DeleteFavoriteItem"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="order-4 h-7 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-700"
    />
  ),
});

function FavoriteCardActionButtons({ productId, productQuantity, children }) {
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="order-4 flex w-full justify-between gap-3">
      <DeleteFavoriteItem
        productId={productId}
        disabled={isPending}
        setIsPending={setIsPending}
      >
        {children}
      </DeleteFavoriteItem>
      <AddFavoriteToCart
        productId={productId}
        disabled={productQuantity === 0 || isPending}
        setIsPending={setIsPending}
      />
    </div>
  );
}

export default FavoriteCardActionButtons;
