import { auth } from "@/auth";
import {
  getFavoriteProductIds,
  getPaginatedProducts,
} from "@/app/_lib/data-service";
import ProductCard from "./ProductCard";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

export async function ProductsList({ count, filters, limit }) {
  const session = await auth();
  const userId = session?.user?.userId;

  const [products, favorites] = await Promise.all([
    getPaginatedProducts(limit, filters),
    userId ? getFavoriteProductIds(userId) : Promise.resolve([]),
  ]);

  if (!Array.isArray(products)) {
    return (
      <div className="grid grid-cols-2 gap-x-14 gap-y-20 transition-all duration-3000 ease-in-out sm:grid-cols-3 lg:gap-y-30">
        <p role="alert" className="text-red-600">
          Errore: dati prodotti non validi.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-x-14 gap-y-20 transition-all duration-3000 ease-in-out sm:grid-cols-3 lg:gap-y-30">
        <p role="status" aria-live="polite">
          Nessun prodotto trovato.
        </p>
      </div>
    );
  }

  return (
    <>
      <p
        aria-live="polite"
        role="status"
        aria-atomic="true"
        className="sr-only"
      >
        {count === 0 && "Nessun prodotto trovato"}
        {count === 1 && "È stato trovato 1 prodotto"}
        {count > 1 && `Sono stati trovati ${count} prodotti`}
      </p>
      <div className="mx-auto grid w-full grid-cols-2 gap-x-6 gap-y-15 transition-all duration-3000 ease-in-out sm:grid-cols-2 md:grid-cols-3 lg:gap-y-18 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index <= 2}>
            {userId ? (
              <FavoriteButton
                className="ml-auto"
                iconSizes="size-7 sm:size-6.5"
                productId={product.id}
                userId={userId}
                isFavorite={favorites?.some(
                  (fav) => fav.productId === product.id,
                )}
              />
            ) : (
              <Link
                href="/credentials/login"
                className="focus ml-auto cursor-pointer rounded-md"
                aria-label="Accedi per aggiungere il prodotto ai preferiti"
              >
                <HeartIcon
                  className={`hover:fill-primary-dark-200 dark:hover:fill-primary-dark-600 dark:text-primary-dark-100 text-primary-dark-200 size-7 sm:size-6.5`}
                  aria-hidden
                />
              </Link>
            )}
          </ProductCard>
        ))}
      </div>
    </>
  );
}

export default ProductsList;
