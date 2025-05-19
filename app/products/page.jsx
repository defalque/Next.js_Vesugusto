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
  const filters = {
    type: params?.type ?? "all",
    price: params?.price ?? 0,
  };
  const filter = params?.type ?? "all";
  const page = Number(params?.page) || 1;

  return (
    <ProductsHandler types={types}>
      <Suspense fallback={<Spinner></Spinner>} key={filter}>
        <ProductsListWrapper filter={filter} filters={filters} page={page} />
      </Suspense>
    </ProductsHandler>
  );
}
