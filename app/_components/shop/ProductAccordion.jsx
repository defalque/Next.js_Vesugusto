"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

import { useState, useId } from "react";

function ProductAccordion({ productAttribute, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <m.div layout className={`flex w-full flex-col`}>
      <button
        aria-label={`Clicca per ${isOpen ? "nascondere" : "mostrare"} ${label} del prodotto`}
        aria-expanded={isOpen}
        aria-pressed={isOpen}
        aria-controls={contentId}
        className="focus-style group my-1 flex cursor-pointer items-center justify-between rounded py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{label}</span>
        <ChevronDown
          className={`size-5 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
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
              <p className="rounded-lg py-2 text-left text-sm/relaxed whitespace-pre-line text-black/80 sm:text-[15px] dark:text-white/85">
                {productAttribute}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export default ProductAccordion;
