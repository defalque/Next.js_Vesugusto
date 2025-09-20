"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import ProductFilter from "./ProductFilter";

const category = [
  { value: "food", label: "Food" },
  { value: "drink", label: "Drink" },
];

const price = [
  { value: "10", label: "Fino a 10€" },
  { value: "10-20", label: "Da 10€ a 20€" },
  { value: "20-30", label: "Da 20€ a 30€" },
  { value: "30-50", label: "Da 30€ a 50€" },
];

function ProductFilters() {
  const { router, pathname, searchParams } = useFilterContext();

  const handleReset = () => {
    router.push(pathname);
  };

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    <div className="flex w-full flex-col px-4 lg:w-60">
      <ProductFilter name="Categoria" items={category} filterField="category" />
      <ProductFilter name="Prezzo" items={price} filterField="price" />

      <button
        onClick={handleReset}
        disabled={!hasFilters}
        className="focus-visible:ring-primary-950 bg-primary-950 border-primary-950 mt-3 ml-2 cursor-pointer self-start rounded-2xl border px-6 py-1 text-lg font-semibold text-gray-100 transition-colors duration-200 hover:border-gray-200 hover:bg-transparent hover:text-black focus:ring-offset-2 focus:outline-none focus-visible:ring-3 disabled:cursor-not-allowed dark:border-gray-100 dark:bg-gray-100 dark:text-black dark:hover:text-gray-100"
      >
        Reset
      </button>
    </div>
  );
}

export default ProductFilters;
