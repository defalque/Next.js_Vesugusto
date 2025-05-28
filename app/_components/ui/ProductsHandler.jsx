"use client";

import { useHideFilters } from "../contexts/HideFiltersContext";
import ProductsSideNavigation from "./ProductsSideNavigation";
import ProductsHeader from "./ProductsHeader";

function ProductsHandler({ totalProducts, types, children }) {
  const { isHidden } = useHideFilters();

  return (
    <div
      className={`grid h-full  ${
        isHidden ? "grid-cols-[1fr]" : "grid-cols-[12rem_1fr]"
      }`}
    >
      <ProductsSideNavigation types={types}></ProductsSideNavigation>
      <ProductsHeader totalProducts={totalProducts}>{children}</ProductsHeader>
    </div>
  );
}

export default ProductsHandler;
