"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import CartProductCard from "./CartProductCard";
import { useOptimistic, useState } from "react";
import Spinner from "./Spinner";
import { deleteCartItem } from "@/app/_lib/actions";
import Link from "next/link";
import { useCartCount } from "../contexts/CartCountContext";

function CartProductsList({
  products,
  cartId,
  totalPrice,
  shippingCost,
  total,
}) {
  const { setCartItems } = useCartCount();
  const [optimisticProducts, optimisticDelete] = useOptimistic(
    products,
    (curProducts, productId) => {
      return curProducts.filter((product) => product.id !== productId);
    }
  );

  async function handleDelete(cartId, productId) {
    optimisticDelete(productId);
    const success = await deleteCartItem(cartId, productId);
    if (success) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-1000 bg-transparent backdrop-blur-sm flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="grid grid-cols-[1.5fr_1fr] gap-10">
        {optimisticProducts.length > 0 ? (
          <div className="flex flex-col">
            {optimisticProducts.map((product) => (
              <CartProductCard
                product={product}
                cartId={cartId}
                setIsLoading={setIsLoading}
                onDelete={handleDelete}
                key={product.id}
              ></CartProductCard>
            ))}
          </div>
        ) : (
          <div className="pt-8 border-t border-t-zinc-200">
            <p>Non hai nessun prodotto nel carrello.</p>
          </div>
        )}

        {optimisticProducts.length > 0 && (
          <div className="flex flex-col gap-6 bg-slate-50 h-max px-5 py-5 rounded-md">
            <h1 className="text-xl font-medium mb-4">Riepilogo</h1>
            <div className="flex items-center pb-2 border-b border-b-zinc-200">
              <span className="font-light">Subtotale</span>
              <span className="ml-auto font-semibold text-lg">
                {Number.isInteger(totalPrice)
                  ? `${totalPrice},00`
                  : totalPrice.toFixed(2).replace(".", ",")}{" "}
                &euro;
              </span>
            </div>
            <div className="flex items-center pb-2 border-b border-b-zinc-200">
              <span className="font-light mr-2">Spese di spedizione</span>
              <QuestionMarkCircleIcon className="size-5 fill-primary-50"></QuestionMarkCircleIcon>
              <span className="ml-auto font-semibold text-lg">
                {Number.isInteger(shippingCost)
                  ? `${shippingCost},00`
                  : shippingCost.toFixed(2).replace(".", ",")}{" "}
                &euro;
              </span>
            </div>
            <div className="flex items-center pb-2">
              <span className="font-medium text-lg">Totale ordine</span>
              <span className="ml-auto font-semibold text-lg">
                {Number.isInteger(total)
                  ? `${total},00`
                  : total.toFixed(2).replace(".", ",")}{" "}
                &euro;
              </span>
            </div>
            <Link
              href="/cart/checkout"
              className="py-3 uppercase text-center bg-primary-950 hover:bg-primary-800 text-primary-100 font-bold w-3xs mx-auto mt-3 cursor-pointer rounded-md"
            >
              Procedi all'acqusto
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default CartProductsList;
