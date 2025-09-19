"use client";

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
  return (
    <div className="flex w-full flex-col px-4 lg:w-60">
      <ProductFilter name="Categoria" items={category} filterField="category" />
      <ProductFilter name="Prezzo" items={price} filterField="price" />
    </div>
  );
}

export default ProductFilters;
