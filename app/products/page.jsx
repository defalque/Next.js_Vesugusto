import ProductsSideNavigation from "../_components/ui/ProductsSideNavigation";
import { getAllProductFlavors, getAllProductTypes } from "../_lib/data-service";

export const metadata = {
  title: "Prodotti",
};

export default async function Page({ searchParams }) {
  const types = await getAllProductTypes();
  const flavors = await getAllProductFlavors();

  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <div className="grid grid-cols-[12rem_1fr] h-full">
      <ProductsSideNavigation
        types={types}
        flavors={flavors}
      ></ProductsSideNavigation>
      <p className="text-orange-950 dark:text-orange-100">Prodotti</p>
    </div>
  );
}
