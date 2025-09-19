import { Suspense } from "react";
import { getFilteredProductsCount } from "../_lib/data-service";
import { ProductListSkeleton } from "../_components/ui/skeleton/Skeletons";
import Pagination from "../_components/ui/Pagination";
import ProductsList from "../_components/shop/ProductsList";
import ProductHeading from "../_components/shop/ProductHeading";
import { PRODUCTS_LIMIT } from "../_lib/constants";
import ProductsClients from "../_components/shop/ProductsClients";

export const metadata = {
  title: "Shop",
  description:
    "Esplora il nostro ampio catalogo di prodotti. Utilizza i filtri per categoria e prezzo per trovare esattamente ciò che stai cercando. Ogni prodotto è descritto dettagliatamente per aiutarti nella tua scelta.",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filters = {
    category: params?.category ? params.category.split(",") : [],
    price: params?.price ? params.price.split(",") : [],
    sort: params?.sort || "default",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.category}-${filters.sort}-${filters.price}-${filters.query}-${filters.page}`;

  const count = await getFilteredProductsCount(filters);

  const totalPages = Math.ceil(count / 6);
  const isPageOutOfBounds = Number(filters.page) > totalPages;

  return (
    <div className="my-5 grid min-h-screen grid-cols-1 grid-rows-[auto_auto_1fr] overflow-visible lg:grid-cols-[auto_1fr]">
      <section
        aria-labelledby="heading-ecommerce"
        className="col-span-full col-start-2 row-start-1 bg-white px-4 xl:px-20 dark:bg-black"
      >
        <ProductHeading />
      </section>

      {/* Filtri prodotti e Ordinamento prodotti */}
      <ProductsClients />

      {/* Lista prodotti */}
      <section
        aria-labelledby="product-results-heading"
        className="col-span-full col-start-2 row-start-3"
      >
        <div className="flex flex-col gap-10 px-4 pt-5 pb-15 xl:px-20">
          <h2 id="product-results-heading" className="sr-only">
            Risultati prodotti
          </h2>

          <div
            aria-live="polite"
            role="status"
            aria-atomic="true"
            className="sr-only"
          >
            {`Sono stati trovati ${count ?? 0} prodotti`}
          </div>

          <Suspense key={filtersKey} fallback={<ProductListSkeleton />}>
            <ProductsList filters={filters} />
          </Suspense>

          {!isPageOutOfBounds && (
            <Pagination count={count ?? 0} limit={PRODUCTS_LIMIT} />
          )}
        </div>
      </section>
    </div>
  );
}
