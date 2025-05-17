"use client";

import { useHideFilters } from "../contexts/HideFiltersProvider";
import ProductsList from "./ProductsList";
import ProductsSideNavigation from "./ProductsSideNavigation";

function ProductsHandler({ types, flavors, products }) {
  const { isHidden } = useHideFilters();
  return (
    <div
      className={`grid h-full transition-all duration-3000 ease-in-out ${
        isHidden ? "grid-cols-[1fr]" : "grid-cols-[12rem_1fr]"
      }`}
    >
      <ProductsSideNavigation
        types={types}
        flavors={flavors}
      ></ProductsSideNavigation>
      <ProductsList products={products}></ProductsList>
    </div>
  );
}

export default ProductsHandler;
