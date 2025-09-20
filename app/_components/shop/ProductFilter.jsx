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
      <m.div className="flex flex-col">
        <button
          className="focus flex w-full cursor-pointer items-center rounded px-1 py-2 text-zinc-400 transition-all duration-200 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          aria-expanded={isOpen}
        >
          <span className="text-xl font-bold uppercase lg:text-sm">{name}</span>
          {!isOpen ? (
            <ChevronRightIcon
              className="ml-auto size-5 text-black dark:text-white"
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className="ml-auto size-5 text-black dark:text-white"
              aria-hidden="true"
            />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
              style={{ overflow: "hidden" }}
              animate={{ height: "auto", opacity: 1 }}
              initial={{ height: 0, opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
            >
              <div className="flex flex-wrap gap-x-4 gap-y-2 px-1 py-3">
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
