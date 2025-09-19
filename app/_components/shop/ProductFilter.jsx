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
          className="focus flex w-full cursor-pointer items-center rounded px-1 py-2 hover:bg-gray-100 dark:hover:bg-zinc-600/20"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          aria-expanded={isOpen}
        >
          <span className="text-xl lg:text-base">{name}</span>
          {!isOpen ? (
            <ChevronRightIcon className="ml-auto size-5" aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="ml-auto size-5" aria-hidden="true" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
              animate={{ height: "auto", opacity: 1 }}
              initial={{ height: 0, opacity: 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
            >
              <div className="pb-3">
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
