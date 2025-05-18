import { Suspense } from "react";
import ProductsHandler from "../_components/ui/ProductsHandler";
import { getAllProductFlavors, getAllProductTypes } from "../_lib/data-service";
import ProductsListWrapper from "../_components/ui/ProductListWrapper";
import Spinner from "../_components/ui/Spinner";

export const metadata = {
  title: "Prodotti",
};

export default async function Page({ searchParams }) {
  const types = await getAllProductTypes();

  const params = await searchParams;
  const filter = params?.type ?? "all";

  return (
    <ProductsHandler types={types}>
      <Suspense fallback={<Spinner></Spinner>} key={filter}>
        <ProductsListWrapper filter={filter} />
      </Suspense>
    </ProductsHandler>
  );
}
