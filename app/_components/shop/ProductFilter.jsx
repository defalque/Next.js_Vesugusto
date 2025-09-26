"use client";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import FilterInput from "./FilterInput";
import { useState } from "react";

import { LazyMotion, AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features.js").then((res) => res.default);

function ProductFilter({ name, items, filterField }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <LazyMotion features={loadFeatures}>
      <m.div role="region" className="flex w-full flex-col py-1">
        <button
          role="heading"
          className="category-focus group flex w-full cursor-pointer items-center rounded py-2 text-zinc-500 transition-all duration-200 hover:text-black active:text-black dark:text-white/80 dark:hover:text-white dark:active:text-white"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          aria-expanded={isOpen}
        >
          <p className="text-lg font-semibold uppercase md:text-sm">{name}</p>
          {!isOpen ? (
            <ChevronRightIcon
              className="ml-auto size-4 text-zinc-500 group-hover:text-black dark:text-white dark:group-hover:text-white"
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className="ml-auto size-4 text-zinc-500 group-hover:text-black dark:text-white dark:group-hover:text-white"
              aria-hidden="true"
            />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
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
    </LazyMotion>
  );
}

export default ProductFilter;
