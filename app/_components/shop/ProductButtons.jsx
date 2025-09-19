"use client";

import { ProductQuantityProvider } from "@/app/_contexts/ProductQuantityContext";
import ProductQuantityHandler from "./ProductQuantityHandler";
// import AddToCartButton from "./AddToCartButton";
const AddToCartButton = dynamic(() => import("./AddToCartButton"), {
  ssr: false,
  loading: () => (
    <div className="h-12 w-36 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
  ),
});
// import FavoriteButton from "./FavoriteButton";
const FavoriteButton = dynamic(() => import("./FavoriteButton"), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-700" />
  ),
});

import dynamic from "next/dynamic";

function ProductButtons({
  userId,
  cartId,
  productId,
  isFavorite,
  productQuantity,
}) {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-center gap-6">
      <ProductQuantityProvider>
        <div className="col-span-full">
          <ProductQuantityHandler productQuantity={productQuantity} />
        </div>
        <div className="self-stretch">
          <AddToCartButton
            userId={userId}
            productId={productId}
            cartId={cartId}
          />
        </div>
      </ProductQuantityProvider>

      <div className="dark:bg-primary-950/30 bg-primary-100/70 inline-flex items-center rounded-full p-3">
        <FavoriteButton
          iconSizes="size-8 md:size-6"
          productId={productId}
          userId={userId}
          isFavorite={isFavorite}
        />
      </div>
    </div>
  );
}

export default ProductButtons;
