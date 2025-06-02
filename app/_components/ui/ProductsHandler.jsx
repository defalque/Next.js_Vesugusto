"use client";

import { useHideFilters } from "../contexts/HideFiltersContext";
import ProductsSideNavigation from "./ProductsSideNavigation";
import ProductsHeader from "./ProductsHeader";

function ProductsHandler({ totalProducts, types, currentSort, children }) {
  const { isHidden } = useHideFilters();

  return (
    <div
      className={`grid h-full  ${
        isHidden
          ? "grid-cols-[1fr]"
          : "grid-cols-1 md:grid-cols-[9rem_1fr] lg:grid-cols-[12rem_1fr]"
      }`}
    >
      <ProductsSideNavigation types={types}></ProductsSideNavigation>
      <ProductsHeader totalProducts={totalProducts} currentSort={currentSort}>
        {children}
      </ProductsHeader>
    </div>
  );
}

export default ProductsHandler;
