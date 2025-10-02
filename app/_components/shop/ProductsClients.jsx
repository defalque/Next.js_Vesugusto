"use client";

import { FiltersProvider } from "@/app/_contexts/FiltersContext";
import { ShowFiltersProvider } from "@/app/_contexts/ShowFiltersContext";
import ProductsAside from "./ProductsAside";
import ToggleFilters from "./ToggleFilters";
import ToggleFiltersMobile from "./ToggleFiltersMobile";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import dynamic from "next/dynamic";
import Search from "../ui/Search";
import { shimmer } from "../ui/skeleton/Skeletons";

const SortBy = dynamic(() => import("../ui/SortBy"), {
  ssr: false,
  loading: () => (
    <div
      className={`${shimmer} relative h-10 w-50 animate-pulse self-stretch overflow-hidden rounded-lg bg-gray-200 md:h-full dark:bg-zinc-700`}
    />
  ),
});
// const ToggleFiltersMobile = dynamic(() => import("./ToggleFiltersMobile"), {
//   ssr: false,
//   loading: () => (
//     <div
//       className={`${shimmer} relative h-10 w-20 animate-pulse overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700`}
//     />
//   ),
// });

const ProductFilters = dynamic(() => import("./ProductFilters"), {
  ssr: false,
  // loading: () => <ProductFiltersSkeleton />,
  loading: () => (
    <div className="flex h-full w-60 flex-col items-center justify-center gap-3">
      {/* <div className="spinner" /> */}
      <div className="h-23 w-23 animate-spin rounded-full border-8 border-t-8 border-zinc-100 border-t-zinc-700 dark:border-zinc-800 dark:border-t-white/85" />
      <p className="animate-pulse text-black/65 dark:text-white/85">
        Caricamento filtri...
      </p>
    </div>
  ),
});

function ProductsClients() {
  return (
    <FiltersProvider>
      <ShowFiltersProvider>
        <ProductsAside>
          <ProductFilters />
        </ProductsAside>

        <section
          aria-label="Opzioni di ordinamento e azioni filtri"
          className="bgColor _top-12 z-10 col-span-full row-start-2 flex w-full flex-col flex-wrap justify-end gap-x-5 gap-y-2 py-3 sm:sticky sm:top-12 sm:flex-row md:top-13 lg:top-13 lg:col-start-2"
        >
          <Search placeholder="Cerca prodotto per nome..." />

          <div className="flex items-center justify-end gap-5 self-stretch">
            <SortBy />

            <ToggleFilters>
              <AdjustmentsHorizontalIcon className="size-5" />
            </ToggleFilters>

            <ToggleFiltersMobile>
              <ProductFilters />
            </ToggleFiltersMobile>
          </div>
        </section>
      </ShowFiltersProvider>
    </FiltersProvider>
  );
}

export default ProductsClients;
