"use client";

import { useHideFilters } from "../contexts/HideFiltersProvider";
import ProductsSideNavigation from "./ProductsSideNavigation";
import ProductsHeader from "./ProductsHeader";
import SpinnerMini from "./SpinnerMini";
import { Suspense } from "react";

function ProductsHandler({ totalProducts, types, children }) {
  const { isHidden } = useHideFilters();

  return (
    <div
      className={`grid h-full  ${
        isHidden ? "grid-cols-[1fr]" : "grid-cols-[12rem_1fr]"
      }`}
    >
      <Suspense fallback={<SpinnerMini />}>
        <ProductsSideNavigation types={types}></ProductsSideNavigation>
      </Suspense>
      <ProductsHeader totalProducts={totalProducts}>{children}</ProductsHeader>
    </div>
  );
}

export default ProductsHandler;
