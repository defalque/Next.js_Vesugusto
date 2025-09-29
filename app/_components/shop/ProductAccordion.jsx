"use client";

import { LazyMotion, AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features.js").then((res) => res.default);

import { useState, useId } from "react";

function ProductAccordion({ productAttribute, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <LazyMotion features={loadFeatures}>
      <m.div layout className={`flex w-full flex-col`}>
        <button
          aria-label={`Clicca per ${isOpen ? "nascondere" : "mostrare"} ${label} del prodotto`}
          aria-expanded={isOpen}
          aria-pressed={isOpen}
          aria-controls={contentId}
          className="focus my-1 flex cursor-pointer items-center rounded py-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            // id={`${contentId}-label`}
            className="text-lg font-medium"
          >
            {label}
          </span>

          {/* Icon */}
          <span
            aria-hidden
            className="relative mr-2 ml-auto h-3.5 w-3.5 lg:h-5 lg:w-5"
          >
            <span
              aria-hidden
              className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 transform bg-black transition-all duration-300 dark:bg-white"
            ></span>
            <span
              aria-hidden
              className={`absolute top-0 bottom-0 left-1/2 w-[2px] origin-center -translate-x-1/2 transform bg-black transition-transform duration-300 dark:bg-white ${
                isOpen ? "-rotate-90" : "rotate-0"
              }`}
            ></span>
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <m.div
              id={contentId}
              role="region"
              // aria-labelledby={`${contentId}-label`}
              style={{ overflow: "hidden" }}
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <p className="rounded-lg py-2 text-left text-sm/relaxed whitespace-pre-line text-black/65 sm:text-base/6 dark:text-white/85">
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
