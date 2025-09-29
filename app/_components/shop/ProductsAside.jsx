"use client";

import { useShowFiltersContext } from "@/app/_contexts/ShowFiltersContext";

function ProductsAside({ children }) {
  const { isOpen } = useShowFiltersContext();

  return (
    <aside
      id="filters"
      aria-label="Filtri prodotti"
      className={`row-span-full hidden ${isOpen ? "mr-5 lg:flex" : "mr-0 lg:hidden"} _h-[calc(100vh-4.25rem)] sticky top-15 mr-2 h-fit overflow-y-auto`}
    >
      {children}
    </aside>
  );
}

export default ProductsAside;
