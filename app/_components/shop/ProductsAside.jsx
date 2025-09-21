"use client";

import { useShowFiltersContext } from "@/app/_contexts/ShowFiltersContext";

function ProductsAside({ children }) {
  const { isOpen } = useShowFiltersContext();

  return (
    <aside
      aria-label="Filtri prodotti"
      className={`row-span-full hidden ${isOpen ? "lg:flex" : "lg:hidden"} _h-[calc(100vh-4.25rem)] _overflow-y-auto sticky top-18 h-fit`}
    >
      {children}
    </aside>
  );
}

export default ProductsAside;
