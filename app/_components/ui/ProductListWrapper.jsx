import {
  getProducts,
  getProductsCount,
  getProductsWithoutFilter,
  getProductsWithPagination,
} from "@/app/_lib/data-service";
import ProductsList from "./ProductsList";
import ProductsListV2 from "./ProductsListV2";

const LIMIT = 3;

export default async function ProductsListWrapper({ filter, filters, page }) {
  // const products = await getProductsWithoutFilter();
  const productCount = await getProductsCount(filters);
  const products = await getProductsWithPagination(page, LIMIT, filters);
  return (
    <ProductsList
      products={products}
      count={productCount.length}
      filter={filter}
      filters={filters}
      page={page}
    />
  );
  // return <ProductsListV2 filter={filter} />;
}

// import { getAllProducts, getProducts } from "@/app/_lib/data-service";
// import ProductsListV3 from "./ProductsListV3";

// export default async function ProductsListWrapper({ filter }) {
//   const productsCount = await getProducts(filter);
//   return (
//     <ProductsListV3 productsCount={productsCount.length} filter={filter} />
//   );
// }
