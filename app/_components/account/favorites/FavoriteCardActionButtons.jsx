"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
const AddFavoriteToCart = dynamic(() => import("./AddFavoriteToCart"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="flex h-7 w-full flex-1 animate-pulse cursor-not-allowed rounded-full bg-gray-100 dark:bg-zinc-800"
    />
  ),
});
const DeleteFavoriteItem = dynamic(() => import("./DeleteFavoriteItem"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="flex h-7 w-7 animate-pulse cursor-not-allowed rounded-full bg-gray-100 dark:bg-zinc-800"
    />
  ),
});

function FavoriteCardActionButtons({ productId, productQuantity }) {
  const [isPending, setIsPending] = useState("");

  return (
    <div className="order-4 flex justify-between gap-1.5 overflow-hidden p-0.5">
      <DeleteFavoriteItem
        productId={productId}
        disabled={isPending === "delete"}
        isPending={isPending}
        setIsPending={setIsPending}
      />
      <AddFavoriteToCart
        productId={productId}
        disabled={productQuantity === 0 || isPending === "add"}
        isPending={isPending}
        setIsPending={setIsPending}
      />
    </div>
  );
}

export default FavoriteCardActionButtons;
