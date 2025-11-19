"use client";

import { useShowFiltersContext } from "@/app/_contexts/ShowFiltersContext";
import { LazyMotion, useReducedMotion } from "motion/react";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

function ProductsListWrapper({ children }) {
  // const { isOpen } = useShowFiltersContext();
  // const shouldReduce = useReducedMotion();

  return (
    // <LazyMotion features={loadFeatures}>
    <section
      aria-labelledby="product-results-heading"
      className={`relative col-span-full row-start-3 overflow-hidden sm:row-start-2 lg:col-start-2`}
      // className={`relative col-span-full row-start-3 overflow-hidden ${isOpen ? "lg:col-start-2" : "lg:col-span-full lg:col-start-1"}`}
    >
      {children}
    </section>
    // </LazyMotion>
  );
}

export default ProductsListWrapper;
