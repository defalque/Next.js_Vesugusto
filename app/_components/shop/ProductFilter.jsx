"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import FilterInput from "./FilterInput";
import { useState } from "react";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ChevronRight } from "lucide-react";

function ProductFilter({ name, items, filterField }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <m.div
      role="region"
      aria-label={`Sezione filtri ${name}`}
      className="flex w-full flex-col py-1"
    >
      <button
        className="focus-style group flex w-full cursor-pointer items-center rounded py-2 text-black transition-all duration-200 dark:text-white"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        aria-expanded={isOpen}
        aria-controls={`filter-panel-${filterField}`}
      >
        <p className="text-lg font-medium md:text-base">{name}</p>

        <ChevronRight
          className={`${isOpen ? "" : "rotate-90"} ml-auto size-5.5 text-black transition-discrete duration-300 dark:text-white`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={`filter-panel-${filterField}`}
            role="group"
            aria-label={`Filtri ${name}`}
            style={{ overflow: "hidden" }}
            animate={{ height: "auto", opacity: 1 }}
            initial={{ height: 0, opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
          >
            <div className="flex flex-wrap gap-x-4 gap-y-2.5 px-2 py-5 font-semibold">
              {items.map((item) => (
                <FilterInput
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  filterField={filterField}
                />
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export default ProductFilter;
