import { auth } from "@/auth";
import {
  getFavoriteProductIds,
  getPaginatedProducts,
} from "@/app/_lib/data-service";
import ProductCard from "./ProductCard";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

export async function ProductsList({ filters }) {
  const session = await auth();
  const userId = session?.user?.userId;

  const [products, favorites] = await Promise.all([
    getPaginatedProducts(6, filters),
    userId ? getFavoriteProductIds(userId) : Promise.resolve([]),
  ]);

  if (!Array.isArray(products)) {
    return (
      <div className="grid grid-cols-2 gap-x-14 gap-y-20 transition-all duration-3000 ease-in-out sm:grid-cols-3 lg:gap-y-30">
        <span>Errore: dati prodotti non validi.</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-x-14 gap-y-20 transition-all duration-3000 ease-in-out sm:grid-cols-3 lg:gap-y-30">
        <span>Nessun prodotto trovato.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-14 gap-y-15 transition-all duration-3000 ease-in-out sm:grid-cols-3 lg:gap-y-25">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index <= 2}>
          {userId ? (
            <FavoriteButton
              className="ml-auto"
              iconSizes="size-7 sm:size-5 lg:size-6"
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
                className={`hover:fill-primary-950 dark:text-primary-50 dark:hover:fill-primary-50 text-primary-950 size-7 sm:size-5 lg:size-6`}
                aria-hidden
              />
            </Link>
          )}
        </ProductCard>
      ))}
    </div>
  );
}

export default ProductsList;
