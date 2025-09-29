import { auth } from "@/auth";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import { getFavoriteProductIds } from "@/app/_lib/data-service";
import { PlusIcon, MinusIcon, HeartIcon } from "@heroicons/react/24/outline";

import { ProductQuantityProvider } from "@/app/_contexts/ProductQuantityContext";
import AddToCartButton from "./AddToCartButton";
import ProductQuantityHandler from "./ProductQuantityHandler";
import FavoriteButton from "./FavoriteButton";
import ProductAccordion from "./ProductAccordion";
import Link from "next/link";
import Button from "../ui/Button";

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
  const session = await auth();
  const userId = session?.user?.userId;
  const cartId = session?.user?.cartId;

  const favorites = userId ? await getFavoriteProductIds(userId) : [];
  const isFavorite = favorites?.some((fav) => fav.productId === product.id);

  return (
    <section
      aria-label={`Informazioni e azioni prodotto ${product.name}`}
      className="flex flex-col gap-8"
    >
      <span className="text-2xl font-semibold">
        {formatCurrency(product.regularPrice)}
      </span>

      <p className="text-sm/relaxed text-black/65 sm:text-base/6 dark:text-white/85">
        {product.description}
      </p>

      <div
        role="group"
        aria-label="Gestione quantità del prodotto, aggiunta al carrello e ai preferiti"
        className="grid w-fit grid-cols-[auto_auto] items-center gap-6"
      >
        <ProductQuantityProvider>
          <div className="col-span-full">
            <ProductQuantityHandler
              productQuantity={product.quantity}
              minusIcon={<MinusIcon className="size-5" />}
              plusIcon={<PlusIcon className="size-5" />}
            />
          </div>
          <div className="self-stretch">
            {userId ? (
              <AddToCartButton
                userId={userId}
                productId={product.id}
                cartId={cartId}
                productQuantity={product.quantity}
              />
            ) : (
              <Button
                href="/credentials/login"
                className="rounded px-3 py-4 font-bold uppercase md:py-3"
              >
                Accedi per aggiungere
              </Button>
            )}
          </div>
        </ProductQuantityProvider>

        <div className="dark:bg-primary-950/30 bg-primary-100/70 inline-flex items-center rounded-full p-3">
          {userId ? (
            <FavoriteButton
              iconSizes="size-8 md:size-6"
              productId={product.id}
              userId={userId}
              isFavorite={isFavorite}
              productQuantity={product.quantity}
            />
          ) : (
            <Link
              href="/credentials/login"
              className="focus cursor-pointer rounded-md"
              aria-label="Accedi per aggiungere il prodotto ai preferiti"
            >
              <HeartIcon
                className={`hover:fill-primary-950 dark:text-primary-50 dark:hover:fill-primary-50 text-primary-950 size-8 md:size-6`}
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
