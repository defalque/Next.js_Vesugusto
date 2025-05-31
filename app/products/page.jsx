import { Suspense } from "react";
import ProductsHandler from "../_components/ui/ProductsHandler";
import {
  getAllProductTypes,
  getFilteredProductsCount,
  getFilteredProductsWithPagination,
} from "../_lib/data-service";
import Spinner from "../_components/ui/Spinner";
import ProductsList from "../_components/ui/ProductsList";
import { LIMIT } from "../_lib/constants";

export const metadata = {
  title: "Prodotti",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filters = {
    type: params?.type ? params.type.split(",") : [],
    price: params?.price ? params.price.split(",") : [],
    sort: params?.sort || "default",
    page: Number(params?.page) || 0,
  };
  const filtersKey = `${filters.type}-${filters.price}-${filters.sort}`;

  const types = await getAllProductTypes();
  const productCount = await getFilteredProductsCount(filters);
  const products = await getFilteredProductsWithPagination(LIMIT, filters);
  // const typesData = getAllProductTypes();
  // const productCountData = getFilteredProductsCount(filters);
  // const productsData = getFilteredProductsWithPagination(LIMIT, filters);

  // const [types, productCount, products] = await Promise.all([
  //   typesData,
  //   productCountData,
  //   productsData,
  // ]);

  return (
    <ProductsHandler
      types={types}
      totalProducts={productCount.length}
      currentSort={filters.sort}
    >
      <Suspense
        fallback={<Spinner label="Caricamento prodotti..."></Spinner>}
        key={filtersKey}
      >
        <ProductsList products={products} totalProducts={productCount.length} />
      </Suspense>
    </ProductsHandler>
  );
}
