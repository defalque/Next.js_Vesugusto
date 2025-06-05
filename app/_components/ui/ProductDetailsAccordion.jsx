"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function ProductDetailsAccordion({ productAttribute, label, isLast }) {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`flex flex-col gap-5 py-3 border-t border-t-gray-300 dark:border-t-dark-200 ${
        isLast ? "border-b border-gray-300 dark:border-dark-200" : ""
      }`}
    >
      {/* <div className="flex flex-col gap-3"> */}
      <button
        className="flex items-center cursor-pointer"
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
      {open && (
        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-5 font-light text-sm lg:text-base pr-5 leading-relaxed cursor-default"
        >
          {productAttribute}
        </motion.p>
      )}
      {/* </div> */}
    </div>
  );
}

export default ProductDetailsAccordion;
