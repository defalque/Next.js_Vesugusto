"use client";

import { useOptimistic } from "react";
import CartProductCard from "./_CartProductCard";
import CartItemQuantity from "./CartItemQuantity";
import DeleteCartItem from "./DeleteCartItem";

function CartItems({ products, cartId }) {
  const [optimisticProducts, optimisticDelete] = useOptimistic(
    products,
    (curProducts, productId) => {
      return curProducts.filter((product) => product.id !== productId);
    },
  );

  return (
    <>
      {optimisticProducts.map((product) => (
        <li key={product.id}>
          <CartProductCard key={product.id} product={product.product}>
            <CartItemQuantity
              productId={product.id}
              cartId={cartId}
              cartItemQuantity={product.quantity}
              productQuantity={product.product.quantity}
            />

            <DeleteCartItem />
          </CartProductCard>
        </li>
      ))}
    </>
  );
}

export default CartItems;
