"use client";

import { useHideFilters } from "../contexts/HideFiltersContext";
import ProductsSideNavigation from "./ProductsSideNavigation";
import ProductsHeader from "./ProductsHeader";

function ProductsHandler({ totalProducts, types, currentSort, children }) {
  const { isHidden } = useHideFilters();

  return (
    <div
      className={`grid h-full ${
        isHidden
          ? "grid-cols-[1fr]"
          : "grid-cols-1 md:grid-cols-[9rem_1fr] lg:grid-cols-[12rem_1fr]"
      }`}
    >
      <ProductsSideNavigation types={types} />

      <ProductsHeader totalProducts={totalProducts} currentSort={currentSort}>
        {children}
      </ProductsHeader>
    </div>
  );
}

export default ProductsHandler;

// return (
//   <motion.div className="flex h-full w-full">
//     <motion.div
//       animate={{
//         width: isHidden ? 0 : "12rem",
//         opacity: isHidden ? 0 : 1,
//         visibility: isHidden ? "hidden" : "visible",
//       }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="invisible md:flex flex-shrink-0 overflow-hidden"
//     >
//       <ProductsSideNavigation types={types} />
//     </motion.div>

//     <div className="flex-1 flex flex-col">
//       <ProductsHeader totalProducts={totalProducts} currentSort={currentSort}>
//         {children}
//       </ProductsHeader>
//     </div>
//   </motion.div>
// );
