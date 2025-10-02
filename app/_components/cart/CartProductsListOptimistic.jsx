"use client";

import { useOptimistic, useTransition } from "react";
import CartSummary from "./CartSummary";
import Button from "../ui/Button";
import {
  deleteCartItem,
  simulateOrder,
  updateCartItem,
} from "@/app/_lib/actions";

import { LazyMotion, AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features.js").then((res) => res.default);

import dynamic from "next/dynamic";
import { CartProductCardSkeleton } from "../ui/skeleton/Skeletons";
import { SHIPPING_COST } from "@/app/_lib/constants";
import {
  showCustomErrorToast,
  showCustomPromiseToast,
} from "../ui/CustomToast";
import { useRouter } from "next/navigation";

const CartItemQuantity = dynamic(() => import("./CartItemQuantity"), {
  ssr: false,
});
const DeleteCartItem = dynamic(() => import("./DeleteCartItem"), {
  ssr: false,
});
const CartProductCard = dynamic(() => import("./CartProductCard"), {
  loading: () => <CartProductCardSkeleton />,
});

function CartProductsListOptimistic({
  products,
  userId,
  userName,
  userEmail,
  cartId,
}) {
  const router = useRouter();

  const [optimisticProducts, optimisticDelete] = useOptimistic(
    products,
    (curProducts, productId) => {
      return curProducts.filter((product) => product.id !== productId);
    },
  );
  const [isPending, startTransition] = useTransition();

  if (!Array.isArray(optimisticProducts)) {
    return (
      <p role="alert" className="text-red-600">
        Errore: dati prodotti del carrello non validi.
      </p>
    );
  }

  if (optimisticProducts.length === 0) {
    return (
      <section
        role="region"
        aria-labelledby="empty-cart"
        className="flex flex-col items-center justify-center gap-8 py-30"
      >
        <div className="space-y-5 text-center">
          <h2 id="empty-cart" className="xs:text-3xl text-2xl sm:text-4xl">
            Ops! Il tuo carrello è vuoto.
          </h2>
          <p className="max-w-xl text-sm text-zinc-700 dark:text-gray-300">
            Sembra che tu non abbia ancora scelto nulla. Hai bisogno di
            ispirazione? Dai un’occhiata ai nostri prodotti più amati.
          </p>
        </div>
        <Button
          href="/shop"
          className="mt-2 rounded-full px-4 py-1 text-base font-semibold sm:text-lg"
        >
          Visita i nostri prodotti
        </Button>
      </section>
    );
  }

  const totalPrice = optimisticProducts.reduce(
    (sum, val) => sum + val.cartItemPrice,
    0,
  );

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-x-10 gap-y-8 lg:grid-cols-[1.5fr_1fr] lg:grid-rows-[auto] lg:pb-10">
      <LazyMotion features={loadFeatures}>
        <section aria-labelledby="cart-items-heading">
          <h2 id="cart-items-heading" className="sr-only">
            Prodotti nel carrello
          </h2>

          <p
            aria-live="polite"
            role="status"
            aria-atomic="true"
            className="sr-only"
          >
            {`Prodotti attualmente nel carrello: ${optimisticProducts.length}`}
          </p>

          <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
            <AnimatePresence mode="popLayout">
              {optimisticProducts.map((cartItemProduct) => (
                <m.li
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "tween" }}
                  key={cartItemProduct.id}
                >
                  <CartProductCard
                    key={cartItemProduct.id}
                    product={cartItemProduct.product}
                  >
                    <CartItemQuantity
                      productId={cartItemProduct.product.id}
                      productName={cartItemProduct.product.name}
                      cartItemQuantity={cartItemProduct.quantity}
                      productQuantity={cartItemProduct.product.quantity}
                      handleUpdateCartItemQuantity={(newQuantity) => {
                        startTransition(async () => {
                          try {
                            await updateCartItem(
                              cartId,
                              cartItemProduct.product.id,
                              Number(newQuantity),
                            );
                          } catch (err) {
                            const toast = (await import("react-hot-toast"))
                              .default;

                            // toast.error(err.message);
                            showCustomErrorToast(toast, err);
                          }
                        });
                      }}
                      disabled={isPending}
                    />

                    <div className="-col-start-1 row-start-1">
                      <DeleteCartItem
                        className="focus ml-auto cursor-pointer self-center rounded-full p-1 transition-colors duration-300 hover:bg-gray-200/80 active:bg-gray-200/80 disabled:animate-pulse disabled:cursor-not-allowed dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
                        handleDeleteCartItem={() => {
                          startTransition(async () => {
                            try {
                              optimisticDelete(cartItemProduct.id);
                              await deleteCartItem(
                                cartId,
                                cartItemProduct.product.id,
                              );
                            } catch (err) {
                              const toast = (await import("react-hot-toast"))
                                .default;

                              // toast.error(err.message);
                              showCustomErrorToast(toast, err);
                            }
                          });
                        }}
                        disabled={isPending}
                      />
                    </div>
                  </CartProductCard>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>

        <AnimatePresence mode="wait">
          <m.section
            layout
            aria-labelledby="cart-summary-heading"
            className="sticky top-25 flex flex-col gap-5 self-baseline rounded-md bg-gray-50 px-5 py-5 text-sm sm:text-base dark:bg-zinc-900/80"
          >
            <h2
              id="cart-summary-heading"
              className={`mb-4 text-lg font-semibold sm:text-xl`}
            >
              Riepilogo carrello
            </h2>

            <CartSummary
              products={optimisticProducts}
              totalPrice={totalPrice + SHIPPING_COST}
              isPending={isPending}
            >
              <Button
                href="/cart/checkout"
                className="justify-center rounded py-3 text-sm font-bold uppercase sm:text-base"
                ariaLabel="Vai alla pagina di finalizzazione dell'acquisto"
                disabled={isPending}
              >
                Vai al checkout
              </Button>

              <Button
                className="justify-center rounded py-3 text-sm font-bold uppercase sm:text-base"
                aria-label="Simula ordine"
                onClick={() => {
                  startTransition(async () => {
                    const toast = (await import("react-hot-toast")).default;

                    await showCustomPromiseToast(
                      toast,
                      simulateOrder(
                        userId,
                        cartId,
                        userName,
                        userEmail,
                        totalPrice + SHIPPING_COST,
                      ),
                      {
                        loading:
                          "Simulazione del pagamento e creazione dell'ordine in corso...",
                        success: "Ordine creato con successo!",
                        error: (err) =>
                          `Errore: ${err?.message || "Errore imprevisto"}`,
                      },
                    );

                    router.push("/account/orders");
                  });
                }}
                disabled={isPending}
              >
                Simula acquisto
              </Button>
            </CartSummary>
          </m.section>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}

export default CartProductsListOptimistic;
