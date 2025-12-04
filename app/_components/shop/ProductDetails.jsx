import { formatCurrency } from "@/app/_lib/formatCurrency";
import { getFavorites } from "@/app/_lib/data-service";

import { ProductQuantityProvider } from "@/app/_contexts/ProductQuantityContext";
import AddToCartButton from "./AddToCartButton";
import ProductQuantityHandler from "./ProductQuantityHandler";
import FavoriteButton from "./FavoriteButton";
import ProductAccordion from "./ProductAccordion";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Heart, Minus, Plus } from "lucide-react";

// import dynamic from "next/dynamic";
// const AddToCartButton = dynamic(() => import("./AddToCartButton"));
// const FavoriteButton = dynamic(() => import("./FavoriteButton"));
// const ProductQuantityHandler = dynamic(
//   () => import("./ProductQuantityHandler"),
// );
// const ProductAccordion = dynamic(() => import("./ProductAccordion"), {
//   loading: () => <div>Loading...</div>,
// });

async function ProductDetails({ product }) {
  const { userId } = await auth();

  const favorites = userId ? await getFavorites() : [];
  const isFavorite = favorites?.some((fav) => fav.productId.id === product.id);

  return (
    <section
      aria-label={`Informazioni e azioni prodotto ${product.name}`}
      className="flex flex-col gap-8"
    >
      <span className="text-3xl tracking-tighter">
        {formatCurrency(product.regularPrice)}
      </span>

      <p className="text-sm text-black/90 sm:text-base dark:text-white/85">
        {product.description}
      </p>

      <div
        role="group"
        aria-label="Gestione quantità del prodotto, aggiunta al carrello e ai preferiti"
        className="grid grid-cols-[1fr_2.5rem] grid-rows-2 items-center gap-6"
      >
        <ProductQuantityProvider>
          <div className="col-span-full mb-2">
            <ProductQuantityHandler
              productQuantity={product.quantity}
              minusIcon={<Minus className="size-5" />}
              plusIcon={<Plus className="size-5" />}
            />
          </div>

          <>
            {userId ? (
              <AddToCartButton
                userId={userId}
                productId={product.id}
                productQuantity={product.quantity}
              />
            ) : (
              <Link
                href="/sign-in"
                className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 dark:bg-primary-950/80 hover:bg-primary-dark-200/75 disabled:hover:bg-primary-dark-200/90 dark:disabled:hover:bg-primary-950/80 focus-style-button block w-full cursor-pointer gap-2 rounded-full py-2 text-center font-medium text-white shadow-sm transition-colors duration-200 disabled:cursor-not-allowed"
              >
                Accedi per aggiungere
              </Link>
            )}
          </>
        </ProductQuantityProvider>

        <div className="dark:bg-primary-950/80 bg-primary-dark-200/90 inline-flex items-center rounded-full p-2">
          {userId ? (
            <FavoriteButton
              iconStyle={`text-white ${isFavorite ? "fill-white" : "group-hover:fill-white"}`}
              productId={product.id}
              userId={userId}
              isFavorite={isFavorite}
              productQuantity={product.quantity}
            />
          ) : (
            <Link
              href="/sign-in"
              className="focus group touch-hitbox cursor-pointer rounded-full"
              aria-label="Accedi per aggiungere il prodotto ai preferiti"
            >
              <Heart
                className={`text-primary-50 group-hover:fill-primary-50`}
                aria-hidden
              />
            </Link>
          )}
        </div>
      </div>

      <div
        role="group"
        aria-label="Informazioni sul prodotto"
        className="flex flex-col divide-y divide-gray-200 dark:divide-zinc-800"
      >
        <ProductAccordion productAttribute={product.details} label="Dettagli" />
        <ProductAccordion
          productAttribute={product.ingredients}
          label="Ingredienti"
        />
        <ProductAccordion
          productAttribute={product.info}
          label="Informazioni nutrizionali"
        />
      </div>
    </section>
  );
}

export default ProductDetails;
