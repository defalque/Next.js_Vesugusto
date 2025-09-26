"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import ProductFilter from "./ProductFilter";
import Button from "../ui/Button";

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
  const { router, pathname, searchParams, query, setQuery } =
    useFilterContext();

  const handleReset = () => {
    router.push(pathname);
    setQuery("");
  };

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    <div className="flex max-h-fit w-full flex-col overflow-y-auto pr-2 pb-3 pl-1 lg:w-60 lg:overflow-hidden lg:pr-1">
      <ProductFilter name="Categoria" items={category} filterField="category" />
      <ProductFilter name="Prezzo" items={price} filterField="price" />

      <button
        onClick={handleReset}
        disabled={!hasFilters}
        className="custom-focus mt-3 ml-2 cursor-pointer self-start rounded-full bg-black px-4 py-2.5 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/60 active:bg-black/70 disabled:cursor-not-allowed disabled:hover:bg-black md:text-base dark:bg-white dark:text-black dark:hover:bg-zinc-500 dark:hover:text-white dark:active:bg-zinc-500 dark:active:text-white dark:disabled:text-black dark:disabled:hover:bg-white"
      >
        Reset
      </button>
    </div>
  );
}

export default ProductFilters;
