"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
const AddFavoriteToCart = dynamic(() => import("./AddFavoriteToCart"), {
  ssr: false,
});
const DeleteFavoriteItem = dynamic(() => import("./DeleteFavoriteItem"), {
  ssr: false,
});
// import AddFavoriteToCart from "./AddFavoriteToCart";
// import DeleteFavoriteItem from "./DeleteFavoriteItem";

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
