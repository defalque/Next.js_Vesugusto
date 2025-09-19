import { auth } from "@/auth";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import { getFavoriteProductIds } from "@/app/_lib/data-service";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

import { ProductQuantityProvider } from "@/app/_contexts/ProductQuantityContext";
import AddToCartButton from "./AddToCartButton";
import ProductQuantityHandler from "./ProductQuantityHandler";
import FavoriteButton from "./FavoriteButton";
import ProductAccordion from "./ProductAccordion";

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
      aria-label={`Informazioni prodotto ${product.name}`}
      className="flex flex-col gap-8"
    >
      <span className="text-2xl font-semibold">
        {formatCurrency(product.regularPrice)}
      </span>

      <p className="_lg:text-lg/7.5 text-base/7.5 text-zinc-500 dark:text-gray-300">
        {product.description}
      </p>

      <div className="grid w-fit grid-cols-[auto_auto] items-center gap-6">
        <ProductQuantityProvider>
          <div className="col-span-full">
            <ProductQuantityHandler
              productQuantity={product.quantity}
              minusIcon={<MinusIcon className="size-5" />}
              plusIcon={<PlusIcon className="size-5" />}
            />
          </div>
          <div className="self-stretch">
            <AddToCartButton
              userId={userId}
              productId={product.id}
              cartId={cartId}
              productQuantity={product.quantity}
            />
          </div>
        </ProductQuantityProvider>

        <div className="dark:bg-primary-950/30 bg-primary-100/70 inline-flex items-center rounded-full p-3">
          <FavoriteButton
            iconSizes="size-8 md:size-6"
            productId={product.id}
            userId={userId}
            isFavorite={isFavorite}
            productQuantity={product.quantity}
          />
        </div>
      </div>

      <div className="flex flex-col divide-y divide-gray-200 dark:divide-zinc-800">
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
