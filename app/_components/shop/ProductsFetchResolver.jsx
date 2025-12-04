import { PRODUCTS_LIMIT } from "@/app/_lib/constants";

import {
  getFavoriteProductIds,
  getFavorites,
  getFilteredProductsCount,
  getPaginatedProducts,
} from "@/app/_lib/data-service";

import { notoSerif } from "@/app/_lib/font";

import LazyDisplay from "./LazyDisplay";
import ProductsList from "./ProductsList";
import Pagination from "../ui/Pagination";

async function ProductsFetchResolver({ filters }) {
  const [count, products, favorites] = await Promise.all([
    getFilteredProductsCount(filters),
    getPaginatedProducts(PRODUCTS_LIMIT, filters),
    getFavorites(),
  ]);

  const totalPages = Math.ceil(count / PRODUCTS_LIMIT);
  const isPageOutOfBounds = Number(filters.page) > totalPages;

  let favoritesIds;
  if (favorites) {
    favoritesIds = favorites.map((favorite) => favorite.productId.id);
  }

  return (
    <>
      <section className="_bgColor relative z-10 col-span-full col-start-1 row-start-1 mt-3 mb-5 sm:col-span-3 sm:mt-5 lg:col-span-2">
        <LazyDisplay
          count={count}
          categories={filters.category}
          font={notoSerif}
        />
      </section>

      <section
        aria-labelledby="product-results-heading"
        className={`relative col-span-full row-start-3 mt-5 overflow-hidden lg:col-start-2 xl:row-start-2`}
      >
        <h2 id="product-results-heading" className="sr-only">
          Risultati prodotti
        </h2>

        <ProductsList
          products={products}
          favorites={favoritesIds}
          count={count}
        />

        {!isPageOutOfBounds && (
          <Pagination count={count ?? 0} limit={PRODUCTS_LIMIT} />
        )}
      </section>
    </>
  );
}

export default ProductsFetchResolver;
