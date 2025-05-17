import ProductsHandler from "../_components/ui/ProductsHandler";
import {
  getAllProductFlavors,
  getAllProducts,
  getAllProductTypes,
} from "../_lib/data-service";

export const metadata = {
  title: "Prodotti",
};

export default async function Page({ searchParams }) {
  const products = await getAllProducts();
  const types = await getAllProductTypes();
  const flavors = await getAllProductFlavors();

  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <ProductsHandler
      products={products}
      types={types}
      flavors={flavors}
    ></ProductsHandler>
  );
}
