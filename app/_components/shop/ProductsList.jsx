import ProductCard from "./ProductCard";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Heart } from "lucide-react";

export function ProductsList({ products, favorites, count }) {
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
      <div className="">
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
      <div className="relative mx-auto grid w-full grid-cols-2 gap-x-6 gap-y-8 overflow-hidden px-1 py-3 pb-15 sm:grid-cols-2 md:grid-cols-3 md:gap-y-15 lg:gap-y-18 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index <= 1}>
            {favorites ? (
              <FavoriteButton
                iconStyle={`text-primary-dark-200 ${favorites?.some((fav) => fav === product.id) ? "fill-primary-dark-200" : "group-hover:fill-primary-dark-200"}`}
                className="ml-auto"
                productId={product.id}
                productQuantity={product.quantity}
                isFavorite={favorites?.some((fav) => fav === product.id)}
              />
            ) : (
              <Link
                href="/sign-in"
                className="focus-style group touch-hitbox block rounded"
                aria-label="Accedi per aggiungere il prodotto ai preferiti"
              >
                <Heart
                  aria-hidden
                  className="group-hover:fill-primary-dark-200 text-primary-dark-200"
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
