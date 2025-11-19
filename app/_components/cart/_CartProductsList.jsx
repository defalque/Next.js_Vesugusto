"use client";

import { getCartProd } from "@/app/_lib/data-service";
import CartProductCard from "./_CartProductCard";
import CartSummary from "./CartSummary";
import CartItems from "./CartItems";
import { useOptimistic } from "react";

// async function CartProductsList() {
function CartProductsList({ products }) {
  // const session = await auth();
  // const products = await getCartProd(session.user.cartId);

  const [optimisticProducts, optimisticDelete] = useOptimistic(
    products,
    (curProducts, productId) => {
      return curProducts.filter((product) => product.id !== productId);
    },
  );

  if (!Array.isArray(products)) {
    return <span>Errore: dati prodotti non validi.</span>;
  }

  if (products.length === 0) {
    return <span>Non hai nessun prodotto nel carrello.</span>;
  }

  const totalPrice = products.reduce((sum, val) => sum + val.cartItemPrice, 0);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
      <section aria-labelledby="cart-items-heading">
        <h2 id="cart-items-heading" className="sr-only">
          Prodotti nel carrello
        </h2>

        <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
          {/* {products.map((product) => (
            <li key={product.id}>
              <CartProductCard key={product.id} product={product.product} />
            </li>
          ))} */}
          <CartItems products={products} cartId={session.user.cartId} />
        </ul>
      </section>

      <section
        aria-labelledby="cart-summary-heading"
        className="flex h-max flex-col gap-5 rounded-md bg-gray-50 px-5 py-5 text-sm sm:text-base dark:bg-zinc-900/80"
      >
        <h2
          id="cart-summary-heading"
          className="mb-4 text-base font-medium sm:text-xl"
        >
          Riepilogo carrello
        </h2>

        <CartSummary products={products} totalPrice={totalPrice} />
      </section>
    </div>
  );
}

export default CartProductsList;
