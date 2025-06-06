"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function ProductDetailsAccordion({ productAttribute, label, isLast }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      layout
      className={`flex flex-col border-t border-t-gray-300 dark:border-t-dark-200 ${
        isLast ? "border-b border-gray-300 dark:border-dark-200" : ""
      }`}
    >
      <button
        className="flex items-center py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-base lg:text-lg">{label}</span>
        <span className="ml-auto mr-2 relative w-3.5 h-3.5 lg:w-5 lg:h-5">
          <span className="absolute top-1/2 left-0 right-0 h-[2px] bg-primary-dark-900 dark:bg-gray-200 transform -translate-y-1/2 transition-all duration-300"></span>
          <span
            className={`absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary-dark-900 dark:bg-gray-200 transform -translate-x-1/2 transition-transform duration-300 origin-center ${
              open ? "-rotate-90" : "rotate-0"
            }`}
          ></span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-light py-3 text-sm lg:text-base text-left alig cursor-default">
              {productAttribute}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProductDetailsAccordion;
