import { Suspense } from "react";
import { getFilteredProductsCount } from "../../_lib/data-service";
import { ProductListSkeleton } from "../../_components/ui/skeleton/Skeletons";
import Pagination from "../../_components/ui/Pagination";
import ProductsList from "../../_components/shop/ProductsList";
import ProductHeading from "../../_components/shop/ProductHeading";
import { PRODUCTS_LIMIT } from "../../_lib/constants";
import ProductsClients from "../../_components/shop/ProductsClients";

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

  const totalPages = Math.ceil(count / PRODUCTS_LIMIT);
  const isPageOutOfBounds = Number(filters.page) > totalPages;

  return (
    <div className="mx-auto mt-10 grid min-h-screen max-w-[95rem] grid-cols-1 grid-rows-[auto_auto_1fr] overflow-visible px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:px-10">
      <div
        aria-labelledby="heading-ecommerce"
        className="col-span-full row-start-1 lg:col-start-2"
      >
        <ProductHeading />
      </div>

      {/* Filtri prodotti e Ordinamento prodotti */}
      <ProductsClients />

      {/* Lista prodotti */}
      <section
        aria-labelledby="product-results-heading"
        className="col-span-full row-start-3 lg:col-start-2"
      >
        <div className="flex flex-col gap-10 pt-8 pb-15">
          <h2 id="product-results-heading" className="sr-only">
            Risultati prodotti
          </h2>

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

          <Suspense key={filtersKey} fallback={<ProductListSkeleton />}>
            <ProductsList filters={filters} limit={PRODUCTS_LIMIT} />
          </Suspense>

          {!isPageOutOfBounds && (
            <Pagination count={count ?? 0} limit={PRODUCTS_LIMIT} />
          )}
        </div>
      </section>
    </div>
  );
}
