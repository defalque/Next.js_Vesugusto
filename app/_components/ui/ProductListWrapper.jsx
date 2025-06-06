import {
  getProductsCount,
  getProductsWithPagination,
} from "@/app/_lib/data-service";
import ProductsList from "./ProductsList";
import { LIMIT } from "@/app/_lib/constants";
import PageRedirectHandler from "./PageRedirectHandler";
import ProductsHeader from "./ProductsHeader";

export default async function ProductsListWrapper({ filters }) {
  const productCount = await getProductsCount(filters);
  const products = await getProductsWithPagination(LIMIT, filters);

  const totalPages = Math.ceil(productCount.length / LIMIT);

  return (
    <ProductsHeader products={products}>
      <PageRedirectHandler filters={filters} totalPages={totalPages} />
      <ProductsList products={products} count={productCount.length} />
    </ProductsHeader>
  );
}

// import { getAllProducts, getProducts } from "@/app/_lib/data-service";
// import ProductsListV3 from "./ProductsListV3";

// export default async function ProductsListWrapper({ filter }) {
//   const productsCount = await getProducts(filter);
//   return (
//     <ProductsListV3 productsCount={productsCount.length} filter={filter} />
//   );
// }
