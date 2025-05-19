import { getProductsWithPagination } from "@/app/_lib/data-service";
import ProductsList from "./ProductsList";
import { LIMIT } from "@/app/_lib/constants";
import PageRedirectHandler from "./PageRedirectHandler";

export default async function ProductsListWrapper({ filters, totalProducts }) {
  const products = await getProductsWithPagination(LIMIT, filters);

  const totalPages = Math.ceil(totalProducts / LIMIT);

  return (
    <>
      <PageRedirectHandler filters={filters} totalPages={totalPages} />
      <ProductsList products={products} totalProducts={totalProducts} />
    </>
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
