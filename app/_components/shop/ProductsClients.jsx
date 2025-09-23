"use client";

import { FiltersProvider } from "@/app/_contexts/FiltersContext";
import { ShowFiltersProvider } from "@/app/_contexts/ShowFiltersContext";
import ProductsAside from "./ProductsAside";
import SortBy from "../ui/SortBy";
import ToggleFilters from "./ToggleFilters";
import ToggleFiltersMobile from "./ToggleFiltersMobile";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import dynamic from "next/dynamic";
import ProductFiltersSkeleton from "../ui/skeleton/Skeletons";
import Search from "../ui/Search";
const ProductFilters = dynamic(() => import("./ProductFilters"), {
  ssr: false,
  loading: () => <ProductFiltersSkeleton />,
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
          className="sticky top-12 z-10 col-span-full col-start-2 row-start-2 flex w-full flex-col justify-end gap-x-5 gap-y-2 bg-white px-(--sm-page-padding-x) py-3 sm:top-12 sm:flex-row md:top-14 lg:top-14 xl:px-(--page-padding-x) dark:bg-black"
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
