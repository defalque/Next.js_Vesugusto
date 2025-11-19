import { Suspense } from "react";

import { ProductsResolverSkeleton } from "../ui/skeleton/Skeletons";
import ProductsFetchResolver from "./ProductsFetchResolver";

async function ProductsResolver({ productsFilters }) {
  const params = await productsFilters;
  const filters = {
    category: params?.category ? params.category.split(",") : [],
    price: params?.price ? params.price.split(",") : [],
    sort: params?.sort || "default",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.category}-${filters.sort}-${filters.price}-${filters.query}-${filters.page}`;

  return (
    <Suspense fallback={<ProductsResolverSkeleton />} key={filtersKey}>
      <ProductsFetchResolver filters={filters} />
    </Suspense>
  );
}

export default ProductsResolver;
