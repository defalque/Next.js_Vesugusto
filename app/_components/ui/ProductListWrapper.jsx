// import { getProducts } from "@/app/_lib/data-service";
// import ProductsList from "./ProductsList";
// import ProductsListV2 from "./ProductsListV2";

// export default async function ProductsListWrapper({ filter }) {
//   //   const products = await getProducts();
//   //   return <ProductsList products={products} filter={filter} />;
//   return <ProductsListV2 filter={filter} />;
// }

import { getAllProducts, getProducts } from "@/app/_lib/data-service";
import ProductsListV3 from "./ProductsListV3";

export default async function ProductsListWrapper({ filter }) {
  const productsCount = await getProducts(filter);
  return (
    <ProductsListV3 productsCount={productsCount.length} filter={filter} />
  );
}
