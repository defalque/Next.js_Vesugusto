"use client";

import { LazyMotion } from "motion/react";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

import ProductsAside from "./ProductsAside";
import ToggleFilters from "./ToggleFilters";
import ToggleFiltersMobile from "./ToggleFiltersMobile";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import {
  ProductFiltersSkeleton,
  SearchInputSkeleton,
  // SearchSkeleton,
  SortBySkeleton,
} from "../ui/skeleton/Skeletons";

import { useReducedMotion } from "@/app/_hooks/useReducedMotion";

import dynamic from "next/dynamic";
import { ToggleFiltersMobileProvider } from "@/app/_contexts/ToggleFiltersMobileContext";

const SearchInput = dynamic(() => import("../ui/SearchInput"), {
  ssr: false,
  loading: () => <SearchInputSkeleton />,
});

const SortBy = dynamic(() => import("../ui/SortBy"), {
  ssr: false,
  loading: () => <SortBySkeleton />,
});

const ProductFilters = dynamic(() => import("./ProductFilters"), {
  ssr: false,
  loading: () => <ProductFiltersSkeleton />,
});

function ProductsControls() {
  const shouldReduce = useReducedMotion();

  return (
    <LazyMotion features={loadFeatures}>
      <ProductsAside shouldReduce={shouldReduce}>
        <ProductFilters />
      </ProductsAside>

      <section
        aria-label="Opzioni di ordinamento e azioni filtri"
        className={`_bgColor _mb-5 _sm:mb-5 relative z-10 row-start-2 mt-5 mb-2 flex h-10 w-full items-center justify-center gap-x-5 gap-y-2 pl-0 sm:col-span-full sm:mb-5 sm:flex-row sm:justify-end lg:col-span-full lg:pl-2 xl:col-start-3 xl:row-start-1`}
      >
        <ToggleFilters>
          <AdjustmentsHorizontalIcon className="size-5" />
        </ToggleFilters>

        {/* <Search
          placeholder="Cerca"
          buttonId="productsOpen"
          placeholderId="productsSearch"
        /> */}
        <SearchInput placeholder="Cerca prodotto..." type="text" />

        <div className="hidden lg:flex">
          <SortBy />
        </div>

        <ToggleFiltersMobileProvider>
          <ToggleFiltersMobile>
            <div className="mb-5 flex lg:hidden">
              <SortBy />
            </div>
            <ProductFilters />
          </ToggleFiltersMobile>
        </ToggleFiltersMobileProvider>
      </section>
    </LazyMotion>
  );
}

export default ProductsControls;
