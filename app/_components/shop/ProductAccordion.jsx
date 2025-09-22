"use client";

import { LazyMotion, AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features.js").then((res) => res.default);

import { useState } from "react";

function ProductAccordion({ productAttribute, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LazyMotion features={loadFeatures}>
      <m.div layout className={`flex w-full flex-col`}>
        <button
          aria-expanded={isOpen}
          className="focus my-1 flex cursor-pointer items-center rounded py-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-medium">{label}</span>

          {/* Icon */}
          <span className="relative mr-2 ml-auto h-3.5 w-3.5 lg:h-5 lg:w-5">
            <span className="bg-primary-dark-900 absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 transform transition-all duration-300 dark:bg-gray-200"></span>
            <span
              aria-hidden="true"
              className={`bg-primary-dark-900 absolute top-0 bottom-0 left-1/2 w-[2px] origin-center -translate-x-1/2 transform transition-transform duration-300 dark:bg-gray-200 ${
                isOpen ? "-rotate-90" : "rotate-0"
              }`}
            ></span>
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <m.div
              role="region"
              style={{ overflow: "hidden" }}
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <p className="_bg-zinc-200/40 _dark:bg-zinc-900/80 _lg:text-base/8 rounded-lg py-2 text-left text-sm/6 tracking-wide whitespace-pre-line text-zinc-800 dark:text-gray-50">
                  {productAttribute}
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </LazyMotion>
  );
}

export default ProductAccordion;
