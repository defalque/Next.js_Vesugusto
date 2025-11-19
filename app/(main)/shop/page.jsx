import { Suspense } from "react";

import { FiltersProvider } from "@/app/_contexts/FiltersContext";
import { ShowFiltersProvider } from "@/app/_contexts/ShowFiltersContext";

import {
  ProductsControlsSkeleton,
  ProductsResolverSkeleton,
} from "@/app/_components/ui/skeleton/Skeletons";
import ProductsResolver from "@/app/_components/shop/ProductsResolver";
import ProductsControls from "@/app/_components/shop/ProductsControls";

export const metadata = {
  title: "Shop",
  description:
    "Esplora il nostro ampio catalogo di prodotti. Utilizza i filtri per categoria e prezzo per trovare esattamente ciò che stai cercando. Ogni prodotto è descritto dettagliatamente per aiutarti nella tua scelta.",
};

export default function Page({ searchParams }) {
  const productsFilters = searchParams.then((sp) => ({
    category: sp.category,
    price: sp.price,
    sort: sp.sort,
    query: sp.query,
    page: sp.page,
  }));

  return (
    <div className="mx-auto mt-10 grid min-h-screen max-w-[95rem] grid-cols-1 grid-rows-[auto_auto_1fr] overflow-clip px-4 sm:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] sm:px-6 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] lg:px-10">
      <ShowFiltersProvider>
        <Suspense fallback={<ProductsControlsSkeleton />}>
          <FiltersProvider>
            <ProductsControls />
          </FiltersProvider>
        </Suspense>

        <Suspense fallback={<ProductsResolverSkeleton />}>
          <ProductsResolver productsFilters={productsFilters} />
        </Suspense>
      </ShowFiltersProvider>
    </div>
  );
}
