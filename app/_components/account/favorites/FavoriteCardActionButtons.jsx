"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
const AddFavoriteToCart = dynamic(() => import("./AddFavoriteToCart"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="order-4 h-7 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-700"
    />
  ),
});
const DeleteFavoriteItem = dynamic(() => import("./DeleteFavoriteItem"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="absolute top-1 right-1 z-100 order-1 h-7 w-7 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-700"
    />
  ),
});

function FavoriteCardActionButtons({
  userId,
  cartId,
  productId,
  productQuantity,
  children,
}) {
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <AddFavoriteToCart
        userId={userId}
        cartId={cartId}
        productId={productId}
        disabled={productQuantity === 0 || isPending}
        setIsPending={setIsPending}
      />
      <DeleteFavoriteItem
        userId={userId}
        productId={productId}
        disabled={isPending}
        setIsPending={setIsPending}
      >
        {children}
      </DeleteFavoriteItem>
    </>
  );
}

export default FavoriteCardActionButtons;
