"use client";

import { useShowFiltersContext } from "@/app/_contexts/ShowFiltersContext";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

function ProductsAside({ shouldReduce, children }) {
  const { isOpen } = useShowFiltersContext();

  const variants = {
    initial: {
      marginLeft: isOpen ? -274 : 0,
      visibility: isOpen ? "hidden" : "visible",
    },
    active: {
      marginLeft: isOpen ? 0 : -274,
      visibility: isOpen ? "visible" : "hidden",
    },
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {/* {isOpen && ( */}
      <m.aside
        // initial={{ x: "-100%" }}
        // animate={{ x: 0 }}
        // exit={{ x: "-100%" }}
        variants={variants}
        initial="initial"
        animate="active"
        transition={
          shouldReduce
            ? { duration: 0 }
            : { type: "spring", duration: 0.5, bounce: 0 }
        }
        id="filters"
        aria-label="Filtri prodotti"
        className={`sticky top-20 col-span-1 col-start-1 row-start-3 mt-5 hidden h-fit overflow-y-auto lg:flex xl:row-start-2`}
      >
        {children}
      </m.aside>
      {/* )} */}
    </AnimatePresence>
  );
}

export default ProductsAside;
