import { Suspense } from "react";
import ProductsHandler from "../_components/ui/ProductsHandler";
import {
  getAllProductTypes,
  getFilteredProductsCount,
} from "../_lib/data-service";
import ProductsListWrapper from "../_components/ui/ProductListWrapper";
import Spinner from "../_components/ui/Spinner";

export const metadata = {
  title: "Prodotti",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filters = {
    type: params?.type ? params.type.split(",") : [],
    price: params?.price ? params.price.split(",") : [],
    page: Number(params?.page) || 0,
  };
  const filtersKey = `${filters.type}-${filters.price}`;

  const types = await getAllProductTypes();
  const productCount = await getFilteredProductsCount(filters);

  return (
    <ProductsHandler types={types} totalProducts={productCount.length}>
      <Suspense fallback={<Spinner></Spinner>} key={filtersKey}>
        <ProductsListWrapper
          filters={filters}
          totalProducts={productCount.length}
        />
      </Suspense>
    </ProductsHandler>
  );
}
